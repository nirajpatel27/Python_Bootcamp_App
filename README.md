# 🐍 Niraj's PythonLab

An interactive Python learning platform built with **Flask**, featuring:

- 📚 Structured theory modules
- 💻 In-browser code execution (Pyodide)
- 🧠 Quiz-based knowledge checks
- 📈 Chapter progress tracking
- 🧩 Modular JSON-based content system

---

## 🚀 Quick Start

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/pythonlab.git
cd pythonlab
```

2. **Create Virtual Environment**
```bash
python -m venv venv
```

3. **Activate Environment**
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

4. **Install Dependencies**
```bash
pip install -r requirements.txt
```

5. **Run Application**
```bash
python app.py
```

Visit: `http://127.0.0.1:5000`

---

## 🏗 Project Structure

```
PYTHON_BOOTCAMP_APP/
├── app.py
├── content.json
├── requirements.txt
├── README.md
├── static/
│   ├── style.css
│   └── script.js
└── templates/
    ├── index.html
    └── learning_interface.html
```

---

## ⚙️ Tech Stack

- **Backend:** Flask
- **Frontend:** HTML, CSS, JavaScript
- **Code Editor:** Visual Studio Code
- **Python Execution:** Pyodide (WebAssembly)
- **Content:** JSON-driven modules

---

## ✨ Features

- 📘 Markdown-structured theory modules
- 🧪 Interactive quizzes with immediate feedback
- 🖥 Live Python code editor with browser execution
- 📈 Chapter progress tracking
- 🧩 Modular, scalable content system

---

## 📂 Content System

All chapters stored in `content.json`:

```json
{
  "id": 1,
  "title": "Introduction to Python",
  "slug": "intro",
  "content": "<h2>...</h2>",
  "code_default": "print('Hello World')",
  "quiz": []
}
```

---

## 🛠 Future Improvements

- User authentication
- Database integration
- Deployment (Render, AWS)

---

## 👨‍💻 Author

Niraj Patel — Built with Flask & Passion 🚀


