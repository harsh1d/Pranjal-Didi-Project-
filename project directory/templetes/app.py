from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import io
from PIL import Image

app = Flask(__name__)

# Load your pre-trained model
model = load_model('C:\Users\ndevr\OneDrive\Desktop\project directory\templetes\model.py')

def prepare_image(img):
    img = img.resize((224, 224))  # Resize the image to match model's expected input size
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    img = img / 255.0  # Normalize the image
    return img

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/detect', methods=['POST'])
def detect_disease():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        img = Image.open(io.BytesIO(file.read()))
        prepared_image = prepare_image(img)
        prediction = model.predict(prepared_image)
        
        # Assuming the model outputs a single prediction value where 0 is healthy and 1 is diseased
        result = 'Diseased' if prediction[0][0] > 0.5 else 'Healthy'
        
        return jsonify({'result': result})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
