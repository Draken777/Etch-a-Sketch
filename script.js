const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const container = document.querySelector('.container');

// Event Listeners
colorPicker.addEventListener('input', (e) => setCurrentColor(e.target.value));
colorBtn.addEventListener('click', () => setCurrentMode('color'));
rainbowBtn.addEventListener('click', () => setCurrentMode('rainbow'));
clearBtn.addEventListener('click', resetGrid);
sizeSlider.addEventListener('input', (e) => updateSizeValue(e.target.value));
sizeSlider.addEventListener('change', (e) => changeSize(e.target.value));

let mouseDown = false;
document.body.addEventListener('mousedown', () => (mouseDown = true));
document.body.addEventListener('mouseup', () => (mouseDown = false));

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    resetGrid();
}

function updateSizeValue(value) {
    sizeValue.textContent = `${value} x ${value}`;
}

function resetGrid() {
    clearGrid();
    createGrid(currentSize);
}

function clearGrid() {
    container.innerHTML = '';
}

function createGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseover', changeColor);
        cell.addEventListener('mousedown', changeColor);
        container.appendChild(cell);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;

    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    }
}

function activateButton(newMode) {
    document.querySelectorAll('.btn').forEach((btn) => btn.classList.remove('active'));

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active');
    } else if (newMode === 'color') {
        colorBtn.classList.add('active');
    }
}

// Initialize
window.onload = () => {
    createGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
};
