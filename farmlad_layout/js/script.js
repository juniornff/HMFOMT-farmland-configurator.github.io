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
            if (row === 0){
                if (col === 0){
                    img.src = "assets/side_tl.bmp";
                    img.classList.add("side");
                } else if (col === 44){
                    img.src = "assets/side_tr.bmp";
                    img.classList.add("side");
                } else {
                    img.src = "assets/side_t.bmp";
                    img.classList.add("side");
                }
            } else if (row === 26){
                if (col === 0){
                    img.src = "assets/side_bl.bmp";
                    img.classList.add("side");
                } else if (col === 44){
                    img.src = "assets/side_br.bmp";
                    img.classList.add("side");
                } else {
                    img.src = "assets/side_b.bmp";
                    img.classList.add("side");
                }
            } else {
                if (col === 0){
                    img.src = "assets/side_l.bmp";
                    img.classList.add("side");
                } else if (col === 44){
                    img.src = "assets/side_r.bmp";
                    img.classList.add("side");
                } else {
                    img.src = "assets/t0.bmp";
                    img.classList.add("field-cell");
                }
            }
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
        if (e.target.tagName === "IMG" && e.target.classList.contains("field-cell")) {
            // Herramienta Pluma
            if (currentTool === "assets/t_pen.gif") {
                e.target.src = currentSquare;
            }
            //Herramienta Pintar
            if (currentTool === "assets/t_paint.gif") {
                enablePainting();
            }
            // Herramienta Rellenar
            if (currentTool === "assets/t_fill.gif") {
                floodFill(e.target);
            }
            //Herramienta Muestra
            if (currentTool === "assets/t_drop.gif") {
                selectSquareFromField(e.target);
            }
            //Herramienta Bolsa
            if (currentTool === "assets/t_bag.gif") {
                applyBag(e.target);
            }
        }
    });

    // Funcion pintar con el movimiento del mouse
    function enablePainting() {
        let isPainting = false;

        tblField.addEventListener("mousedown", function (e) {
            if (currentTool === "assets/t_paint.gif" && e.target.tagName === "IMG" && e.target.classList.contains("field-cell")) {
                isPainting = true;
                e.target.src = currentSquare; // Pinta la primera casilla
            }
        });

        tblField.addEventListener("mousemove", function (e) {
            if (isPainting && currentTool === "assets/t_paint.gif" && e.target.tagName === "IMG" && e.target.classList.contains("field-cell")) {
                e.target.src = currentSquare; // Pinta mientras se mueve el mouse
            }
        });

        document.addEventListener("mouseup", function () {
            isPainting = false; // Detiene la pintura cuando se suelta el mouse
        });
    }

    // Funcion para Rellenar las casillas del field
    function floodFill(startCell) {
        let targetSrc = startCell.src;  // Tipo de cuadro original
        if (!startCell.classList.contains("field-cell")) return;  // Solo afectar "field-cell"
    
        let queue = [startCell];
        let visited = new Set(); // Para evitar visitar la misma celda más de una vez
    
        while (queue.length > 0) {
            let cell = queue.shift();
            if (!cell || visited.has(cell) || !cell.classList.contains("field-cell") || cell.src !== targetSrc) {
                continue;
            }
    
            // Marcar como visitada
            visited.add(cell);
            cell.src = currentSquare; // Cambiar la imagen
    
            // Obtener posición en la tabla
            let td = cell.parentElement;
            let tr = td.parentElement;
            let rowIdx = [...tr.parentElement.children].indexOf(tr);
            let colIdx = [...tr.children].indexOf(td);
    
            // Buscar vecinos (arriba, abajo, izquierda, derecha)
            let neighbors = [
                tblField.rows[rowIdx - 1]?.cells[colIdx]?.firstChild,  // Arriba
                tblField.rows[rowIdx + 1]?.cells[colIdx]?.firstChild,  // Abajo
                tblField.rows[rowIdx]?.cells[colIdx - 1]?.firstChild,  // Izquierda
                tblField.rows[rowIdx]?.cells[colIdx + 1]?.firstChild   // Derecha
            ];
    
            // Agregar vecinos a la cola si no han sido visitados
            neighbors.forEach(neighbor => {
                if (neighbor && !visited.has(neighbor) && neighbor.classList.contains("field-cell") && neighbor.src === targetSrc) {
                    queue.push(neighbor);
                }
            });
        }
    }

    // Función para seleccionar un cuadro desde el campo
    function selectSquareFromField(selectedCell) {
        // Obtener la imagen del cuadro seleccionado
        let newSquare = selectedCell.src;
        
        // Actualizar el cuadro actual y la imagen de previsualización
        currentSquare = newSquare;
	    let newSquareFile = newSquare.split("/").pop();
	    currentSquare = "assets/" + newSquareFile;  
	    imgSquare.src = currentSquare;

        // Buscar la opción en el menú que coincide con la imagen seleccionada
        let selectedOption = [...tblSquares].find(option => option.getAttribute("src").endsWith(newSquareFile));
        
        // Si la opción existe en el menú, mover la mano (`hand.gif`) a esa opción
        if (selectedOption) {
            document.querySelectorAll(".square-hand").forEach(hand => hand.src = "assets/blank.gif");
            selectedOption.closest("tr").querySelector(".square-hand").src = "assets/hand.gif";
        }
    }

    // Herramienta Bolsa de Semillas (3x3)
    function applyBag(centerCell) {
        let td = centerCell.parentElement;
        let tr = td.parentElement;
        let centerRow = [...tr.parentElement.children].indexOf(tr);
        let centerCol = [...tr.children].indexOf(td);

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let newRow = centerRow + i;
                let newCol = centerCol + j;

                let cell = tblField.rows[newRow]?.cells[newCol]?.firstChild;
                if (cell && cell.classList.contains("field-cell")) {
                    cell.src = currentSquare;
                }
            }
        }
    }

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
            if (index < 43 || index >= fieldCells.length - 43 || index % 43 === 0 || index % 43 === 42) {
                img.src = toggleFence.checked ? "assets/log.bmp" : "assets/t0.bmp";
            }
        });
    });
});
