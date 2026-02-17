// Function to mark a chapter as complete
function markComplete(slug) {
    let progress = JSON.parse(localStorage.getItem('pyBootcampProgress')) || [];
    if (!progress.includes(slug)) {
        progress.push(slug);
        localStorage.setItem('pyBootcampProgress', JSON.stringify(progress));
    }
    alert("Chapter completed! Progress saved.");
    updateUI();
}

// Update UI based on saved progress
function updateUI() {
    let progress = JSON.parse(localStorage.getItem('pyBootcampProgress')) || [];
    
    // Update Sidebar Checks
    document.querySelectorAll('.check-mark').forEach(el => {
        if (progress.includes(el.dataset.slug)) {
            el.style.opacity = '1';
        }
    });

    // Update Dashboard Progress Bar (if on dashboard)
    const totalBar = document.getElementById('totalProgress');
    if (totalBar) {
        const total = document.querySelectorAll('.chapter-card').length;
        const percentage = (progress.length / total) * 100;
        totalBar.style.width = percentage + '%';
        
        // Update cards
        document.querySelectorAll('.chapter-card').forEach(card => {
            if (progress.includes(card.dataset.slug)) {
                card.classList.add('completed');
                card.querySelector('.status-icon').innerText = '●';
            }
        });
    }
}

// Global Search Functionality
const searchInput = document.getElementById('globalSearch');
if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.chapter-card').forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            if (title.includes(term)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Run on load
document.addEventListener('DOMContentLoaded', updateUI);