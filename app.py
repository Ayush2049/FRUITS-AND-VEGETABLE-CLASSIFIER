from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load model once at startup
print("Loading model...")
model = load_model("C:\\Users\\nitin\\images\\image_classification\\multiple-image-classification.keras")
print("Model loaded successfully!")

data_cat = ['apple', 'banana', 'beetroot', 'bell pepper', 'cabbage', 
            'capsicum', 'carrot', 'cauliflower', 'chilli pepper', 'corn',
            'cucumber', 'eggplant', 'garlic', 'ginger', 'grapes', 
            'jalepeno', 'kiwi', 'lemon', 'lettuce', 'mango', 'onion', 
            'orange', 'paprika', 'pear', 'peas', 'pineapple', 
            'pomegranate', 'potato', 'raddish', 'soy beans', 'spinach',
            'sweetcorn', 'sweetpotato', 'tomato', 'turnip', 'watermelon']

img_height = 180
img_width = 180

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get image from request
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        print(f"Received file: {file.filename}")
        
        # Read image using PIL
        img = Image.open(file.stream)
        print(f"Original image size: {img.size}, mode: {img.mode}")
        
        # Convert to RGB if necessary (in case of RGBA or grayscale)
        if img.mode != 'RGB':
            img = img.convert('RGB')
            print(f"Converted to RGB")
        
        # Resize image to target size
        img = img.resize((img_width, img_height))
        print(f"Resized to: {img.size}")
        
        # Convert to array - EXACTLY like in Streamlit
        img_array = tf.keras.utils.img_to_array(img)
        print(f"Image array shape: {img_array.shape}, dtype: {img_array.dtype}")
        print(f"Image array range: [{img_array.min()}, {img_array.max()}]")
        
        # Add batch dimension - EXACTLY like in Streamlit
        img_batch = tf.expand_dims(img_array, 0)
        print(f"Batch shape: {img_batch.shape}")
        
        # Make prediction
        print("Making prediction...")
        predictions = model.predict(img_batch, verbose=0)
        print(f"Raw predictions shape: {predictions.shape}")
        print(f"Raw predictions: {predictions[0][:5]}...")  # Print first 5 values
        
        # Apply softmax - EXACTLY like in Streamlit
        score = tf.nn.softmax(predictions[0])
        score_numpy = score.numpy()
        print(f"Softmax scores: {score_numpy[:5]}...")  # Print first 5 values
        
        # Get prediction
        predicted_idx = np.argmax(score_numpy)
        predicted_class = data_cat[predicted_idx]
        confidence = float(np.max(score_numpy) * 100)
        
        print(f"Predicted: {predicted_class} with {confidence:.2f}% confidence")
        
        # Convert image to base64 for preview
        img_io = io.BytesIO()
        img.save(img_io, 'PNG')
        img_io.seek(0)
        img_base64 = base64.b64encode(img_io.getvalue()).decode()
        
        # Get all predictions sorted by confidence
        all_predictions = [
            {
                'class': data_cat[i], 
                'confidence': float(score_numpy[i] * 100)
            }
            for i in range(len(data_cat))
        ]
        all_predictions.sort(key=lambda x: x['confidence'], reverse=True)
        
        print(f"Top 5 predictions: {all_predictions[:5]}")
        
        return jsonify({
            'success': True,
            'prediction': predicted_class,
            'confidence': round(confidence, 2),
            'image': f'data:image/png;base64,{img_base64}',
            'all_predictions': all_predictions
        })
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

@app.route('/categories', methods=['GET'])
def get_categories():
    return jsonify({'categories': data_cat})

if __name__ == '__main__':
    print("\n" + "="*50)
    print("🚀 Flask API Server Starting...")
    print("="*50)
    print(f"📊 Model supports {len(data_cat)} categories")
    print(f"📐 Image size: {img_width}x{img_height}")
    print(f"🌐 Server will run on: http://localhost:5000")
    print("="*50 + "\n")
    app.run(debug=True, host='0.0.0.0', port=5000)