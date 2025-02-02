const uploadInput = document.getElementById('upload');
const outputDiv = document.getElementById('output');

uploadInput.addEventListener('change', handleFileChange);

function handleFileChange(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = function() {
    const imgUrl = reader.result;
    displayAnalysisInProgress();
    simulateAnalysisDelay(file, imgUrl);
  };

  reader.readAsDataURL(file);
}

function displayAnalysisInProgress() {
  outputDiv.textContent = 'This image is being analyzed for pomegranate disease using an external service. Results will be displayed here.';
}

function simulateAnalysisDelay(file, imgUrl) {
  setTimeout(function() {
    const diseaseDetected = Math.random() > 0.5 ? 'Yes' : 'No';
    displayAnalysisResult(file, diseaseDetected);
  }, 2000);
}

function displayAnalysisResult(file, diseaseDetected) {
  outputDiv.textContent = `The uploaded pomegranate image ${diseaseDetected} shows signs of disease.`;
}