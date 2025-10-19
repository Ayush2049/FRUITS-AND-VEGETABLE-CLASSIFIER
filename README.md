# 🍎 Fruits & Vegetables Image Classifier

A simple **image classification project** that recognizes fruits and vegetables using a **TensorFlow Keras model**, a **Flask backend**, and a **React frontend**.


## Instances
    
![Project Screenshot](https://github.com/Ayush2049/FRUITS-AND-VEGETABLE-CLASSIFIER/raw/1c8fcaa8109090d4a0f0a10e4700627470c8cf49/Project-Instances/Screenshot%202025-10-19%20014753.png)

![Project Screenshot](https://github.com/Ayush2049/FRUITS-AND-VEGETABLE-CLASSIFIER/blob/0beb3baebf30a53fc7297add2c7d0efe0cb12b0a/Project-Instances/Screenshot%202025-10-19%20014836.png
)

---

## 🗂️ Project Structure

- `app.py` – Flask API for predictions, health check, and categories.  
- `multiple-image-classification.keras` – Trained Keras model.  
- `Fruits_Vegetables/` – Dataset split into `train/`, `validation/`, `test/`.  
- `frontend/image-clasi/` – React frontend for image upload and results.  
- `requirements.txt` – Python dependencies.  

---

## ⚡ Features

- Multi-class classification of fruits and vegetables  
- Flask backend serving `/predict`, `/health`, `/categories`  
- React frontend with image upload, preview, and prediction display  
- Returns top predictions with confidence scores  

---

## 🧠 How It Works

1. **Input:** Image uploaded via React frontend  
2. **Preprocessing:** Convert to RGB → Resize to 180x180 → Expand dims  
3. **Model:** `multiple-image-classification.keras` predicts class probabilities  
4. **Output:** Frontend displays predicted class and top predictions  

---

## ⚙️ Setup & Installation

**Backend (Flask):**
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py


## Quick start
1. Clone:
   git clone https://github.com/Ayush2049/FRUITS-AND-VEGETABLE-CLASSIFIER.git
2. Python env and deps:
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
3. Train:
   python train.py --data-dir ./data --epochs 20 --batch-size 32
4. Predict:
   python predict.py --model ./checkpoints/best.pth --image examples/apple.jpg
5. Web demo:
   Open web/index.html or run the Node demo in web/ (npm install && npm start) if present.
---
## Contributing
Fork, add a focused change, and open a PR. Add a short note in the README for new scripts or features.

## License
all rights reserved by @Ayush2049
---
## 📬 Contact Me

I'm always open to connecting, collaborating, or answering questions about my projects.  

- **Name:** Ayush Sharma
- **Email:** [dm.ayushsharma@gmail.com](mailto:dm.ayushsharma@gmail.com)  
- **GitHub:** [Ayush2049](https://github.com/Ayush2049)  
- **LinkedIn:** [linkedin.com/in/ayush](https://in.linkedin.com/in/ayush-sharma-8805842ba)  
