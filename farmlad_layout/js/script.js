document.addEventListener("DOMContentLoaded", function () {
    const tblField = document.getElementById("tblField");
    const tblSquares = document.querySelectorAll("#tblSquares .option");
    const tblTools = document.querySelectorAll("#tblTools .tool");
    const imgSquare = document.getElementById("imgSquare");
    const imgTool = document.getElementById("imgTool");
    const toggleGrid = document.getElementById("toggleGrid");
    const toggleFence = document.getElementById("toggleFence");

    let currentSquare = "assets/t0.bmp";
    let currentTool = "assets/t_pen.gif";

    // Generar el campo de cultivo (27x45)
    for (let row = 0; row < 27; row++) {
        let tr = document.createElement("tr");
        for (let col = 0; col < 45; col++) {
            let td = document.createElement("td");
            let img = document.createElement("img");
            img.src = "t0.bmp";
            img.classList.add("field-cell");
            td.appendChild(img);
            tr.appendChild(td);
        }
        tblField.appendChild(tr);
    }

    // Manejo de selección de cuadros
    tblSquares.forEach(option => {
        option.addEventListener("click", function () {
            currentSquare = option.getAttribute("src");
            imgSquare.src = currentSquare;

            document.querySelectorAll(".square-hand").forEach(hand => hand.src = "assets/blank.gif");
            option.closest("tr").querySelector(".square-hand").src = "assets/hand.gif";
        });
    });

    // Manejo de selección de herramientas
    tblTools.forEach(tool => {
        tool.addEventListener("click", function () {
            currentTool = tool.getAttribute("src");
            imgTool.src = currentTool;

            document.querySelectorAll(".tool-hand").forEach(hand => hand.src = "assets/blank.gif");
            tool.closest("tr").querySelector(".tool-hand").src = "assets/hand.gif";
        });
    });

    // Manejo de interacciones con el campo
    tblField.addEventListener("click", function (e) {
        if (e.target.tagName === "IMG") {
            if (currentTool === "assets/t_pen.gif") {
                e.target.src = currentSquare;
            } else if (currentTool === "assets/t_fill.gif") {
                document.querySelectorAll(".field-cell").forEach(img => img.src = currentSquare);
            }
        }
    });

    // Alternar cuadrícula sin afectar tamaño
    toggleGrid.addEventListener("change", function () {
        if (toggleGrid.checked) {
            tblField.classList.remove("nogrid");
            tblField.classList.add("grid");
        } else {
            tblField.classList.remove("grid");
            tblField.classList.add("nogrid");
        }
    });

    // Alternar cerca perimetral
    toggleFence.addEventListener("change", function () {
        let fieldCells = document.querySelectorAll("#tblField .field-cell");
        fieldCells.forEach((img, index) => {
            if (index < 45 || index >= fieldCells.length - 45 || index % 45 === 0 || index % 45 === 44) {
                img.src = toggleFence.checked ? "assets/log.bmp" : "assets/t0.bmp";
            }
        });
    });
});
