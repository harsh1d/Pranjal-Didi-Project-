document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    const result = document.getElementById('result');
    const uploadedImage = document.getElementById('uploaded-image');
    const resultText = document.getElementById('result-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            result.classList.remove('hidden');
            uploadedImage.style.display = 'none';
            resultText.textContent = '';
            loadingSpinner.classList.remove('hidden');
            
            uploadedImage.src = e.target.result;
            
            // Simulate disease detection
            setTimeout(function() {
                loadingSpinner.classList.add('hidden');
                uploadedImage.style.display = 'block';
                
                detectDisease(file, function(hasDisease) {
                    if (hasDisease) {
                        resultText.textContent = "The pomegranate contains a disease.";
                        resultText.style.color = '#ff4e42';
                    } else {
                        resultText.textContent = "The pomegranate is healthy.";
                        resultText.style.color = '#28a745';
                    }
                });
            }, 2000);
        };
        
        reader.readAsDataURL(file);
    }
});

function detectDisease(file, callback) {
    // Placeholder for disease detection logic
    // For example, you could send the image to a server for processing
    // Here, we'll just randomly decide if the image has a disease or not
    
    const hasDisease = Math.random() > 0.5;
    callback(hasDisease);
}
