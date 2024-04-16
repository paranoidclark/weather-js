const canvas = document.querySelector('.canvas');
const rangeValue = document.getElementById('rangeValue');
const rangeInput = document.getElementById('rangeInput');
const cells = document.querySelectorAll('.cell');
const color = document.getElementById('color');
const eraser = document.getElementById('eraser');
const clear = document.getElementById('clear');
const buttons = document.querySelectorAll('.select');
const colorPicker = document.getElementById('colorPicker');
let penMode = "color";
let penDown = false;
let selectedColor = 'black';

// Menu

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    })
})

colorPicker.addEventListener('input', (event) => {
    selectedColor = event.target.value;
})

color.addEventListener('click', () => {
    penMode = 'color';
    selectedColor = colorPicker.value;
})

eraser.addEventListener('click', () => {
    selectedColor = 'transparent';
    penMode = 'eraser'
})

clear.addEventListener('click', () => {
    createGrid(rangeInput.value)
})

rangeInput.addEventListener('input', () => {
    rangeValue.textContent = rangeInput.value + " x " + rangeInput.value;
    createGrid(rangeInput.value);
})

// Coloring Logic

canvas.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('cell')) {
        penDown = true;
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (penDown && event.target.classList.contains('cell')) {
        event.target.style.backgroundColor = selectedColor;
    } else if (penDown && event.target.classList.contains('cell')) {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        event.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
});

canvas.addEventListener('mouseup', (event) => {
    if (event.target.classList.contains('cell')) {
        penDown = false;
    }
});

canvas.addEventListener('mouseleave', () => {
    if (penDown) {
        penDown = true;
    }
});

canvas.addEventListener('mouseenter', () => {
    if (penDown) {
        penDown = true;
    }
});

// Canvas Grid

function createGrid(gridDensity) {
    canvas.innerHTML = ''
    const canvasSize = window.matchMedia('(max-width: 600px)').matches ? 320 : 480;
    for (let i = 0; i < gridDensity * gridDensity; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = canvasSize / gridDensity + 'px';
        cell.style.height = canvasSize / gridDensity + 'px';
        canvas.appendChild(cell);
    }
}

createGrid(rangeInput.value)
color.classList.add('active');