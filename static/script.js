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

// 1. Handle Mobile Sidebar
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}

// 2. Handle Pane Resizing (Stretching)
const resizer = document.getElementById('drag-bar');
const leftSide = document.getElementById('theory-pane');

if (resizer) {
    resizer.addEventListener('mousedown', function(e) {
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
        document.body.style.cursor = 'col-resize';
    });
}

// Add editor.resize() inside your existing resize function
// Add this logic to your resize function
function resize(e) {
    if (window.innerWidth > 1024) {
        const workspaceRect = workspace.getBoundingClientRect();
        let newWidth = e.clientX - workspaceRect.left;
        
        // Safety limits
        if (newWidth > 320 && newWidth < (workspaceRect.width - 350)) {
            theory.style.width = newWidth + 'px';
            
            // This is the MAGIC line that makes the editor look good
            editor.resize(); 
        }
    }
}

function stopResize() {
    document.removeEventListener('mousemove', resize);
    document.body.style.cursor = 'default';
}