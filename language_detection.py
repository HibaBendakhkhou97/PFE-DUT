from flask import Flask, request, jsonify
from joblib import load
import re
import sys

app = Flask(__name__)

def preprocess_text(text):
    text = re.sub(r'[!@#$(),n"%^*?:;~`0-9]', '', text)
    text = re.sub(r'\[|\]', ' ', text)  # Properly escape square brackets
    text = text.lower()
    return text

def predict_language(text):
    # Load the model and CountVectorizer
    model, cv, le = load('language_detection_model.joblib')
    
    # Preprocess the text
    processed_text = preprocess_text(text)
    
    # Transform the preprocessed text using CountVectorizer
    transformed_text = cv.transform([processed_text])
    
    # Predict the language using the loaded model
    predicted_language_index = model.predict(transformed_text)[0]
    
    # Decode the predicted language index
    predicted_language = le.inverse_transform([predicted_language_index])[0]
    
    return predicted_language

if __name__ == "__main__":
    text = sys.stdin.readline().strip()  # Read text from stdin
    predicted_language = predict_language(text)
    print(predicted_language)  # Print the language prediction
