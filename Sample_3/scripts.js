document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.getElementById('uploaded-image');
            img.src = e.target.result;
            img.style.display = 'block';
            
            // Simulate disease detection
            detectDisease(file, function(result) {
                const resultText = document.getElementById('result-text');
                if (result) {
                    resultText.textContent = "The pomegranate contains a disease.";
                    resultText.style.color = '#ff4e42';
                } else {
                    resultText.textContent = "The pomegranate is healthy.";
                    resultText.style.color = '#28a745';
                }
            });
        };
        
        reader.readAsDataURL(file);
    }
});

function detectDisease(file, callback) {
    // Placeholder for disease detection logic
    // For example, you could send the image to a server for processing
    // Here, we'll just randomly decide if the image has a disease or not
    
    setTimeout(function() {
        const hasDisease = Math.random() > 0.5;
        callback(hasDisease);
    }, 2000);
}
