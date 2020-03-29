

const gridContainer = document.querySelector("#grid-container");

const populate = (x) => {
    if (x > 200) {
        gridContainer.style.gridTemplate = `repeat(16, 1fr) / repeat(16, 1fr)`;
        alert("That would be way too much work. Try a lower number.");
        return;
    }
    gridContainer.style.gridTemplate = `repeat(${x}, 1fr) / repeat(${x}, 1fr)`;
    let totalBlocks = x ** 2;
    for (let i = 0; i < totalBlocks; i++) {
        let gridBlock = document.createElement("div");
        gridBlock.classList.add("grid-block", "blackandwhite");
        gridContainer.appendChild(gridBlock);
    }
}

let randomColor = () => `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;

let shader = (item) => {
    if (item.style.backgroundColor == ""){
        item.style.backgroundColor = "rgb(255, 255, 255)";
    }
    let getColor = item.style.backgroundColor;
    getColor = getColor.slice(4, getColor.length - 1).split(",");
    getColor = getColor.map(i => Number(i));
    if (getColor[0] >= 25){
        getColor = getColor.map(j => j -= 25);
    } else if (getColor[0] < 25) {
        getColor.map(i => i = 0);
    }
    item.style.backgroundColor = `rgb(${getColor[0]}, ${getColor[1]}, ${getColor[2]})`;
}

gridContainer.addEventListener("mouseover", e => {
    if (e.target.classList.contains("blackandwhite")){
        e.target.style.backgroundColor = "black";
    } else if (e.target.classList.contains("randomcolor")){
        e.target.style.backgroundColor = randomColor();
    } else if (e.target.classList.contains("shader")){
        shader(e.target);
    }
});

populate(16);

const shakeFunction = () => Array.from(gridContainer.children).forEach(block => block.style.backgroundColor = "rgb(255, 255, 255)");

const shake = document.querySelector("button");
shake.addEventListener("click", () => shakeFunction());

let gridSize = document.querySelector("#gridsize");
gridSize.addEventListener("click", () => {
    let i = prompt("Please enter the row/column size as a number.");
    if (i == null || i == "") {
        return;
    }
    else if (typeof i == "number" || i > 0) {
        shakeFunction();
        populate(i);
    } else {alert("I thought the instructions were rather simple. I guess I thought wrong.")
    }
})

let colorMode = document.querySelector("#colormode");
let modal = document.querySelector("#myModal");
colorMode.addEventListener("click", () => {
    let span = document.querySelector(".close");
    modal.style.display = "block";
    span.addEventListener("click", () => modal.style.display = "none");
    window.onclick = e => {if (e.target == modal) {
        modal.style.display = "none";
    }}
})

let buttons = Array.from(document.querySelectorAll(".colorselector"));
buttons.forEach(button => button.addEventListener("click", e => {
    Array.from(gridContainer.children).forEach(i => i.className = e.target.id);
    shakeFunction();
}));