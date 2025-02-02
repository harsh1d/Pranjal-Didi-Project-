let model = null; // Placeholder for the model variable

async function loadModel() {
    model = await tf.loadGraphModel('https://tfhub.dev/google/imagenet/mobilenet_v2_130_224/classification/5/model.json');
    console.log("Model loaded successfully");
}

async function handleCheck() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload an image first.");
        return;
    }

    const reader = new FileReader();
    reader.onload = async function(event) {
        const img = new Image();
        img.onload = async function() {
            const tensor = preprocessImage(img);
            const predictions = await model.predict(tensor);
            const pomegranateClassIndex = 941; // Index for 'pomegranate' class in ImageNet
            const predictionScore = predictions.dataSync()[pomegranateClassIndex];

            displayResult(predictionScore);
        };
        img.src = event.target.result;
        document.getElementById('preview').src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function displayResult(score) {
    const resultContainer = document.getElementById('result-container');
    if (score > 0.5) {
        resultContainer.textContent = "YES";
    } else {
        resultContainer.textContent = "NO";
    }
}

function preprocessImage(img) {
    return tf.browser.fromPixels(img)
        .resizeNearestNeighbor([224, 224]) // Resize to match model's expected sizing
        .toFloat()
        .expandDims();
}

// Load the model immediately when the script is executed
loadModel();
