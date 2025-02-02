const imageUpload = document.getElementById('imageUpload');
const imageDisplay = document.getElementById('imageDisplay');
const analyzeButton = document.getElementById('analyzeButton');
const result = document.getElementById('result');

let uploadedImage;
let base64Image;

imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage = new Image();
      uploadedImage.src = e.target.result;
      uploadedImage.onload = () => {
        imageDisplay.innerHTML = '';
        imageDisplay.appendChild(uploadedImage);
        base64Image = e.target.result.split(',')[1];  // Extract base64 part of the image
      };
    };
    reader.readAsDataURL(file);
  }
});

analyzeButton.addEventListener('click', () => {
  if (!uploadedImage) {
    alert('Please upload an image first!');
    return;
  }

  analyzeImageWithGoogleVision(base64Image).then(diseaseDetected => {
    result.innerText = diseaseDetected ? 'Result: Diseased' : 'Result: Healthy';
    result.style.color = diseaseDetected ? 'red' : 'green';
  }).catch(error => {
    console.error('Error analyzing image:', error);
    result.innerText = 'Error analyzing image.';
    result.style.color = 'red';
  });
});

async function analyzeImageWithGoogleVision(base64Image) {
  const apiKey = 'YOUR_GOOGLE_CLOUD_VISION_API_KEY';  // Replace with your actual API key
  const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  const requestBody = {
    requests: [{
      image: {
        content: base64Image
      },
      features: [{
        type: 'LABEL_DETECTION',
        maxResults: 10
      }]
    }]
  };

  const response = await fetch(visionApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  const result = await response.json();
  const labels = result.responses[0].labelAnnotations;

  // Check if any of the labels indicate disease
  const diseaseLabels = ['disease', 'rot', 'mold', 'fungus'];
  return labels.some(label => diseaseLabels.includes(label.description.toLowerCase()));
}
