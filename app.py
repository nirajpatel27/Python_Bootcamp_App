from flask import Flask, render_template, request
import json
import os

app = Flask(__name__)

# Load the extracted data
def load_content():
    if os.path.exists('content.json'):
        with open('content.json', 'r') as f:
            return json.load(f)
    return []

@app.route('/')
def index():
    data = load_content()
    # Calculate progress (mock data for now, usually handled by JS/LocalStorage)
    return render_template('dashboard.html', chapters=data, total_chapters=len(data))

@app.route('/read/<slug>')
def read(slug):
    data = load_content()
    chapter = next((item for item in data if item['slug'] == slug), None)
    if not chapter:
        return "Chapter not found", 404
    return render_template('reader.html', chapter=chapter, menu=data)

if __name__ == '__main__':
    app.run(debug=True)