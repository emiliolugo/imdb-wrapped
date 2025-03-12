from flask import Flask, request, jsonify, json
from flask_cors import CORS
import os
import tempfile
from analyze import analyze  
import numpy as np

def convert_np(obj):
    if isinstance(obj, np.generic):
        return obj.item()
    elif isinstance(obj, dict):
        return {k: convert_np(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_np(v) for v in obj]
    elif isinstance(obj, tuple):
        return tuple(convert_np(v) for v in obj)
    return obj
    
app = Flask(__name__)
@app.before_request
def log_request():
    print(f"Received {request.method} request for {request.path}")

@app.route('/upload-file', methods=['POST'])
def analyze_route():
    print("Received request:", request.files, type(request.files))
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".csv") as tmp:
            file.save(tmp.name)
            temp_path = tmp.name

        result = analyze(temp_path)
        
        result = convert_np(result)
        for key, value in result.items():
            if isinstance(value, np.int64):
                print(f"{key}: {value}","is an int 64 \n")
        os.remove(temp_path)

        return jsonify(result) 

    except Exception as e:
        print("app error")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


