let Size = 16;


const container = document.getElementsByClassName('.container');


function createGrid(size) {
    container.style.gridTemplateColumns = repeat(size, "1fr");
    container.style.gridTemplateRows = repeat(size, "1fr");
    for(let i=0;i<size*size;i++) {
        const cells = document.createElement('div');
        cells.classList.add('cells');
        cells.addEventListener('mouseover');
        container.appendChild(cells);
    }
}

createGrid(Size);