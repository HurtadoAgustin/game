"use strict";
document.addEventListener("contextmenu", e=>{e.preventDefault()})
function startGame(bombs=10, columns=10, rows=10) {
  //DOM Elements
  const main = document.getElementsByTagName("main")[0];
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  createTable();
  addBombs(bombs);
  addNumbers();

  function createTable(){
    for (let i=0; i<rows; i++){
      const table_row = document.createElement("tr");
      for (let j=0; j<columns; j++){
        const table_cell = document.createElement("td");
        table_cell.classList.add("cell");
        table_cell.id = `r${i}c${j}`;
        table_cell.innerText = 0;
        table_cell.addEventListener("click", showNumbers);
        table_cell.addEventListener("contextmenu", addFlag);
        table_row.appendChild(table_cell);
      }
      tbody.appendChild(table_row);
    }
    table.appendChild(tbody);
    main.appendChild(table);
  }
  function addBombs(bombs){
    const cells = document.getElementsByClassName("cell");
    let random = Math.floor(Math.random()*(columns*rows));
    let i = 0;
    for(let cell of cells){
      if(random == i){
        if(cell.classList[1] == "bomb"){
          addBombs(bombs);
        }else{
          cell.classList.add("bomb");
          if(bombs>1) addBombs(bombs-1);
          return;
        }
      }else{
        i++;
      }
    }
  }
  function addNumbers(){
    const bombs = document.getElementsByClassName("bomb");
    for(let cell of bombs){
      const cell_id = cell.id;
      let leftCellId; let rightCellId;
      let topCellId; let buttonCellId;
      let topLeftCellId; let topRightCellId;
      let buttonLeftCellId; let buttonRightCellId;
      // IDs of nearest cells
      let cellIdR = cell_id.substring(1, cell_id.indexOf("c"));
      let cellIdC = cell_id.substring((cell_id.indexOf("c")+1), 10);
      if(cellIdC != 0) leftCellId = "r"+ cellIdR +"c"+ (parseInt(cellIdC)-1);
      if(cellIdC != columns-1) rightCellId = "r"+ cellIdR +"c"+ (parseInt(cellIdC)+1);
      if(cellIdR != 0) topCellId = "r"+ (parseInt(cellIdR)-1) +"c"+ (cellIdC);
      if(cellIdR != rows-1) buttonCellId = "r"+ (parseInt(cellIdR)+1) +"c"+ (cellIdC);
      
      if(cellIdC != 0 && cellIdR != 0) topLeftCellId = "r"+ (parseInt(cellIdR)-1) +"c"+ (parseInt(cellIdC)-1);
      if(cellIdC != columns-1 && cellIdR != 0) topRightCellId = "r"+ (parseInt(cellIdR)-1) +"c"+ (parseInt(cellIdC)+1);
      if(cellIdC != 0 && cellIdR != rows-1) buttonLeftCellId = "r"+ (parseInt(cellIdR)+1) +"c"+ (parseInt(cellIdC)-1);
      if(cellIdC != columns-1 && cellIdR != rows-1) buttonRightCellId = "r"+ (parseInt(cellIdR)+1) +"c"+ (parseInt(cellIdC)+1);

      let leftCell = document.getElementById(leftCellId);
      let rightCell = document.getElementById(rightCellId);
      let topCell = document.getElementById(topCellId);
      let buttonCell = document.getElementById(buttonCellId);
      let topLeftCell = document.getElementById(topLeftCellId);
      let topRightCell = document.getElementById(topRightCellId);
      let buttonLeftCell = document.getElementById(buttonLeftCellId);
      let buttonRightCell = document.getElementById(buttonRightCellId);

      if(leftCell) leftCell.innerText = parseInt(leftCell.innerText)+1;
      if(rightCell) rightCell.innerText = parseInt(rightCell.innerText)+1;
      if(topCell) topCell.innerText = parseInt(topCell.innerText)+1;
      if(buttonCell) buttonCell.innerText = parseInt(buttonCell.innerText)+1
      if(topLeftCell) topLeftCell.innerText = parseInt(topLeftCell.innerText)+1;
      if(topRightCell) topRightCell.innerText = parseInt(topRightCell.innerText)+1;
      if(buttonLeftCell) buttonLeftCell.innerText = parseInt(buttonLeftCell.innerText)+1;
      if(buttonRightCell) buttonRightCell.innerText = parseInt(buttonRightCell.innerText)+1;
    }
  }
  function showNumbers(){
    if(this.classList[1]=="flag") return;
    if(this.classList[1]=="bomb"){
      for(let bomb of document.getElementsByClassName("bomb")){
        bomb.style.backgroundColor = "red";
        bomb.style.color = "red";
      }
      for(let cell of document.getElementsByClassName("cell")){
        cell.removeEventListener("click", showNumbers);
        cell.removeEventListener("contextmenu", addFlag);
      }
      setTimeout(()=>{
        document.getElementsByTagName("table")[0].remove();
        startGame(5, 15, 3);
      },3000)
    }else{
      this.classList.add("visible");
      if(this.innerText == 0) deleteZeros(this);
    }
  }
  function addFlag(){
    if(this.classList[1]=="visible") return;
    this.classList.toggle("flag");
  }
  function deleteZeros(zero){
    zero.setAttribute("deleted", true);
    zero.style.fontSize = 0; //Visual only
    const cell_id = zero.id;
    let leftCellId; let rightCellId;
    let topCellId; let buttonCellId;
    let topLeftCellId; let topRightCellId;
    let buttonLeftCellId; let buttonRightCellId;
    // IDs of nearest cells
    let cellIdR = cell_id.substring(1, cell_id.indexOf("c"));
    let cellIdC = cell_id.substring((cell_id.indexOf("c")+1), 10);
    if(cellIdC != 0) leftCellId = "r"+ cellIdR +"c"+ (parseInt(cellIdC)-1);
    if(cellIdC != columns-1) rightCellId = "r"+ cellIdR +"c"+ (parseInt(cellIdC)+1);
    if(cellIdR != 0) topCellId = "r"+ (parseInt(cellIdR)-1) +"c"+ (cellIdC);
    if(cellIdR != rows-1) buttonCellId = "r"+ (parseInt(cellIdR)+1) +"c"+ (cellIdC);
    
    if(cellIdC != 0 && cellIdR != 0) topLeftCellId = "r"+ (parseInt(cellIdR)-1) +"c"+ (parseInt(cellIdC)-1);
    if(cellIdC != columns-1 && cellIdR != 0) topRightCellId = "r"+ (parseInt(cellIdR)-1) +"c"+ (parseInt(cellIdC)+1);
    if(cellIdC != 0 && cellIdR != rows-1) buttonLeftCellId = "r"+ (parseInt(cellIdR)+1) +"c"+ (parseInt(cellIdC)-1);
    if(cellIdC != columns-1 && cellIdR != rows-1) buttonRightCellId = "r"+ (parseInt(cellIdR)+1) +"c"+ (parseInt(cellIdC)+1);

    let leftCell = document.getElementById(leftCellId);
    let rightCell = document.getElementById(rightCellId);
    let topCell = document.getElementById(topCellId);
    let buttonCell = document.getElementById(buttonCellId);
    let topLeftCell = document.getElementById(topLeftCellId);
    let topRightCell = document.getElementById(topRightCellId);
    let buttonLeftCell = document.getElementById(buttonLeftCellId);
    let buttonRightCell = document.getElementById(buttonRightCellId);

    if(leftCell && !leftCell.getAttribute("deleted")) {leftCell.classList.add("visible"); if(leftCell.innerText==0) deleteZeros(leftCell);};
    if(rightCell && !rightCell.getAttribute("deleted")) {rightCell.classList.add("visible"); if(rightCell.innerText==0) deleteZeros(rightCell);};
    if(topCell && !topCell.getAttribute("deleted")) {topCell.classList.add("visible"); if(topCell.innerText==0) deleteZeros(topCell);};
    if(buttonCell && !buttonCell.getAttribute("deleted")) {buttonCell.classList.add("visible"); if(buttonCell.innerText==0) deleteZeros(buttonCell);};
    if(topLeftCell && !topLeftCell.getAttribute("deleted")) {topLeftCell.classList.add("visible"); if(topLeftCell.innerText==0) deleteZeros(topLeftCell);};
    if(topRightCell && !topRightCell.getAttribute("deleted")) {topRightCell.classList.add("visible"); if(topRightCell.innerText==0) deleteZeros(topRightCell);};
    if(buttonLeftCell && !buttonLeftCell.getAttribute("deleted")) {buttonLeftCell.classList.add("visible"); if(buttonLeftCell.innerText==0) deleteZeros(buttonLeftCell);};
    if(buttonRightCell && !buttonRightCell.getAttribute("deleted")) {buttonRightCell.classList.add("visible"); if(buttonRightCell.innerText==0) deleteZeros(buttonRightCell);};
  }
}
const bombs = 5;
try{
  startGame(bombs, 15, 3);
  if (document.getElementsByClassName("bombs").length > bombs) new Error("Error");
}catch{
  document.getElementsByTagName("table")[0].delete();
  startGame(bombs, 10, 3);
}

// if (cell.innerText == 0) this.style.fontSize = 0; //Visual only