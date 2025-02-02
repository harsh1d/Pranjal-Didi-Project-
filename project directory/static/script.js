function uploadImage() {
    const fileInput = document.getElementById('image-upload');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const reader = new FileReader();

    reader.onload = function(e) {
        const imgElement = document.getElementById('preview');
        imgElement.src = e.target.result;

        document.getElementById('result').style.display = 'block';
        document.getElementById('message').innerText = 'Image uploaded successfully!';

        // Send the image to the backend server for disease detection
        fetch('/detect', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('message').innerText = `Error: ${data.error}`;
            } else {
                document.getElementById('message').innerText = `Detection result: ${data.result}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').innerText = 'An error occurred during the upload.';
        });
    };

    reader.readAsDataURL(file);
}
