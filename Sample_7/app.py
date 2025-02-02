# app.py

from flask import Flask, request, render_template, redirect, url_for
import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import os

app = Flask(__name__)

# Load the pre-trained model (replace 'model.h5' with your model's filename)
MODEL_PATH = 'model.h5'
model = load_model(MODEL_PATH)

def model_predict(img_path, model):
    # Preprocess the image
    img = cv2.imread(img_path)
    img = cv2.resize(img, (224, 224))  # Resize to the input size of the model
    img = img.astype('float32') / 255.0
    img = np.expand_dims(img, axis=0)  # Add batch dimension

    # Predict using the model
    preds = model.predict(img)
    return preds

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def upload():
    if request.method == 'POST':
        # Get the file from the POST request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(basepath, 'uploads', f.filename)
        f.save(file_path)

        # Make prediction
        preds = model_predict(file_path, model)

        # Process the result
        if preds[0][0] > 0.5:
            result = "Diseased"
        else:
            result = "Healthy"

        return result
    return None

if __name__ == '__main__':
    app.run(debug=True)
