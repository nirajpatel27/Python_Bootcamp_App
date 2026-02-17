from flask import Flask, render_template, redirect, url_for, jsonify
import json
import os

app = Flask(__name__)

# Load data safely
def load_course():
    try:
        with open('content.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading content: {e}")
        return []

@app.route('/')
def home():
    data = load_course()
    if not data:
        return "Error: content.json is missing or corrupted. Please check the file."
    # Redirect to the first chapter's slug
    return redirect(url_for('learn', slug=data[0]['slug']))

@app.route('/learn/<slug>')
def learn(slug):
    data = load_course()
    chapter = next((item for item in data if item['slug'] == slug), None)
    
    if not chapter:
        return redirect(url_for('home'))
    
    # Calculate navigation
    idx = data.index(chapter)
    prev_slug = data[idx-1]['slug'] if idx > 0 else None
    next_slug = data[idx+1]['slug'] if idx < len(data)-1 else None
    
    # Calculate progress percentage
    progress = int(((idx + 1) / len(data)) * 100)

    return render_template('learning_interface.html', 
                         chapter=chapter, 
                         course_map=data, 
                         prev_slug=prev_slug,
                         next_slug=next_slug,
                         progress=progress)

if __name__ == '__main__':
    app.run(debug=True, port=5000)