// 1. Initialize Ace Editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/python");

// 2. Initialize Pyodide (Python Runner)
let pyodideReady = false;
let pyodide;

async function main() {
    document.getElementById("output").innerText = "Initializing Python Kernel...\n(This downloads ~10MB once)";
    pyodide = await loadPyodide();
    pyodideReady = true;
    document.getElementById("output").innerText = "Python 3.10 Ready! Click 'Run Code'.";
}
main();

// 3. Run Code Function
async function runPython() {
    if (!pyodideReady) return;
    
    let code = editor.getValue();
    let outputDiv = document.getElementById("output");
    outputDiv.innerText = "Running...";
    
    try {
        // Redirect stdout to our console
        pyodide.setStdout({ batched: (msg) => { outputDiv.innerText += msg + "\n"; } });
        
        // Clear previous output
        outputDiv.innerText = "";
        
        // Execute
        await pyodide.runPythonAsync(code);
        
    } catch (err) {
        outputDiv.innerText = err;
    }
}

// 4. Quiz Logic
function checkAnswer(btn, selectedIndex, correctIndex) {
    let parent = btn.parentElement;
    let buttons = parent.querySelectorAll('button');
    let feedback = parent.parentElement.querySelector('.feedback');
    
    // Disable all buttons
    buttons.forEach(b => b.disabled = true);
    
    if (selectedIndex === correctIndex) {
        btn.classList.add('correct');
        feedback.innerText = "Correct! 🎉";
        feedback.style.color = "#4ec9b0";
    } else {
        btn.classList.add('wrong');
        buttons[correctIndex].classList.add('correct'); // Show correct answer
        feedback.innerText = "Incorrect. Try the code example above!";
        feedback.style.color = "#e74c3c";
    }
}