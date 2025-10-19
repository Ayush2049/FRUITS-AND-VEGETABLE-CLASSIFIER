# 🍎 Fruits & Vegetables Image Classifier

A simple **image classification project** that recognizes fruits and vegetables using a **TensorFlow Keras model**, a **Flask backend**, and a **React frontend**.

---

## Instances

![Project Screenshot](https://github.com/Ayush2049/FRUITS-AND-VEGETABLE-CLASSIFIER/raw/1c8fcaa8109090d4a0f0a10e4700627470c8cf49/Project-Instances/Screenshot%202025-10-19%20014753.png)

![Project Screenshot](https://github.com/Ayush2049/FRUITS-AND-VEGETABLE-CLASSIFIER/blob/0beb3baebf30a53fc7297add2c7d0efe0cb12b0a/Project-Instances/Screenshot%202025-10-19%20014836.png)

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
