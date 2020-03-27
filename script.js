const gridContainer = document.querySelector("#grid-container");
const populate = (x) => {
    gridContainer.style.gridTemplate = `repeat(${x}, 1fr) / repeat(${x}, 1fr)`;
    let totalBlocks = x ** 2;
    for (let i = 0; i < totalBlocks; i++) {
        let gridBlock = document.createElement("div");
        gridBlock.setAttribute("class", "grid-block");
        gridContainer.appendChild(gridBlock);
    }
}
gridContainer.addEventListener("mouseover", e => {
    e.target.setAttribute("class", "active");
})

populate(16);