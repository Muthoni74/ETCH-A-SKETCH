// Etch-a-Sketch JavaScript
const container = document.getElementById('container');
const resizeBtn = document.getElementById('resizeBtn');
const clearBtn = document.getElementById('clearBtn');
const modeSelect = document.getElementById('modeSelect');

let currentMode = 'draw';
let currentSize = 16;
modeSelect.addEventListener('change', e => currentMode = e.target.value);

function buildGrid(size = 16) {
    currentSize = size;
    container.innerHTML = '';
    const total = size * size;
    const containerSize = container.clientWidth; // in px
    const cellSize = Math.floor(containerSize / size);

    for (let i = 0; i < total; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.dataset.darkness = '0';

        cell.addEventListener('mouseenter', onHover);
        container.appendChild(cell);
    }
}

function onHover(e) {
    const cell = e.target;
    if (currentMode === 'draw') {
        cell.style.backgroundColor = '#333';
    } else if (currentMode === 'random') {
        const r = Math.floor(Math.random()*256);
        const g = Math.floor(Math.random()*256);
        const b = Math.floor(Math.random()*256);
        cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else if (currentMode === 'darken') {
        // increment darkness by 10% each time
        let darkness = Number(cell.dataset.darkness) || 0;
        if (darkness < 1) {
            darkness += 0.1;
            cell.dataset.darkness = darkness.toString();
            // apply black at given opacity over white
            cell.style.backgroundColor = `rgba(0,0,0,${darkness.toFixed(2)})`;
        }
    }
}

resizeBtn.addEventListener('click', () => {
    let input = prompt('Enter squares per side (max 100):', '16');
    if (input === null) return;
    let n = Number(input);
    if (Number.isNaN(n) || n < 1) {
        alert('Invalid number! Please enter a number between 1 and 100.');
        return;
    }
    if (n > 100) n = 100;
    buildGrid(n);
});

clearBtn.addEventListener('click', () => buildGrid(currentSize));

// build default grid on load
window.addEventListener('load', () => buildGrid(16));

console.log('Script loaded');
