"use strict";
function startGame(){
  function addColors(){
    let random = Math.floor(Math.random()*6);
    let color;
    switch(random){
      case 0: color = "blue"; break;
      case 1: color = "pink"; break;
      case 2: color = "red"; break;
      case 3: color = "green"; break;
      case 4: color = "yellow"; break;
      case 5: color = "black"; break;
    }
    return color;
  }
  function deleteCells(){
    let cellsInARow = 0;
    multiDelete(this);
    function multiDelete(cell){
      cell.setAttribute("deleted", "true");
      cellsInARow++;
      let leftCellId; let rightCellId;
      let topCellId; let buttonCellId;
      // IDs of nearest cells
      let cellIdR = cell.id.substring(1, cell.id.indexOf("c"));
      let cellIdC = cell.id.substring((cell.id.indexOf("c")+1), 10);
      if(cellIdC != 0) leftCellId = "r"+ cellIdR +"c"+ (parseInt(cellIdC)-1);
      if(cellIdC != columns-1) rightCellId = "r"+ cellIdR +"c"+ (parseInt(cellIdC)+1);
      if(cellIdR != 0) topCellId = "r"+ (parseInt(cellIdR)-1) +"c"+ (cellIdC);
      if(cellIdR != rows-1) buttonCellId = "r"+ (parseInt(cellIdR)+1) +"c"+ (cellIdC);

      let leftCell = document.getElementById(leftCellId);
      let rightCell = document.getElementById(rightCellId);
      let topCell = document.getElementById(topCellId);
      let buttonCell = document.getElementById(buttonCellId);
      // Loop to delete
      if(leftCell && (cell.classList[1]==leftCell.classList[1]) && !leftCell.getAttribute("deleted")) multiDelete(leftCell);
      if(rightCell && (cell.classList[1]==rightCell.classList[1]) && !rightCell.getAttribute("deleted")) multiDelete(rightCell);
      if(topCell && (cell.classList[1]==topCell.classList[1]) && !topCell.getAttribute("deleted")) multiDelete(topCell);
      if(buttonCell && (cell.classList[1]==buttonCell.classList[1]) && !buttonCell.getAttribute("deleted")) multiDelete(buttonCell);
      if(!(cellsInARow>1)){
        attempts++;
        if (!footer.firstElementChild) footer.appendChild(document.createElement("span"));
        footer.firstElementChild.innerText = attempts;
        if(attempts==5){
          attempts = 0;
          footer.firstElementChild.innerText = attempts;
          alert("Game over!");
          table.remove();
          startGame();
        }
      }else{cell.remove()}
    }
    restartIds();
    function restartIds(){
      let columns_table = document.getElementsByTagName("tr");
      let x = 0; let y;
      for(const columns of columns_table){
        y = 0;
        if (columns.children.length==0){
          columns.remove();
        }else{
          for(const row of columns.children) {
            row.id = `r${x}c${y}`;
            row.removeAttribute("deleted");
            y++;
          }
        }
        x++;
      }
    }
  }
  let main = document.getElementsByTagName("main")[0];
  let footer = document.getElementsByTagName("footer")[0];
  let table = document.createElement("table");
  let tbody = document.createElement("tbody");
  let attempts = 0;
  let columns = 11;
  let rows = 11;
  for(let i = 0; i < columns; i++){
    let columns_table = document.createElement("tr");
    for(let j = 0; j < rows; j++){
      let rows_table = document.createElement("td");
      rows_table.id = `r${j}c${i}`;
      rows_table.classList.add("cell", addColors());
      columns_table.appendChild(rows_table);
    }
    tbody.appendChild(columns_table);
  }
  table.appendChild(tbody);
  main.appendChild(table);
  let col = document.getElementsByClassName("cell");
  for(const selected of col) {selected.addEventListener("click", deleteCells);}
}
startGame();