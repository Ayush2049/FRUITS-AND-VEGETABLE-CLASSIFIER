# Fruits and Vegetables Classifier

A compact image classification project with training scripts (Python) and a simple web demo (HTML/CSS/JS). Designed for quick experiments and easy extension.

## Instances
    ![Sample Image](images/sample.png)

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

## Requirements
- Python 3.8+
- pip (and Node.js for the web demo)
- GPU recommended for training

## Project layout (typical)
- data/          dataset (not included)
- models/        saved checkpoints
- src/ or app/   training & inference code
- web/           front-end demo
- examples/      sample images
- train.py, predict.py, requirements.txt

## Notes on improving accuracy
- Use transfer learning (ResNet, EfficientNet, MobileNet).
- Apply augmentations, class balancing, and LR schedules.
- Increase input resolution if resources allow.

## Contributing
Fork, add a focused change, and open a PR. Add a short note in the README for new scripts or features.

## License
all rights reserved by @Ayush2049
