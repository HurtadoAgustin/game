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
    let i;
    let random;
    while(bombs>0){
      random = Math.floor(Math.random()*(columns*rows));
      i=0;
      for(let cell of cells){
        if(random==i){
          if(cell.classList[1] != "bomb"){
            cell.classList.add("bomb");
            bombs--;
            //console.log(cell);
            break;
          }
        }else i++;
      }
    }
  }
  function addNumbers(){
    const bombs = document.getElementsByClassName("bomb");
    for(let cell of bombs){
      const arounds = getBlocksAround(cell);
      for(let selected of arounds){
        selected.innerText = parseInt(selected.innerText) + 1;
      }
    }
  }
  function getBlocksAround(cell){
    const IDS = {
      it: cell.id,
      row: cell.id.substring(1, cell.id.indexOf("c")),
      col: cell.id.substring((cell.id.indexOf("c")+1), 10)
    };
    const doID = ({c=0, r=0}) => {
      return "r"+(parseInt(IDS.row)+r)+"c"+(parseInt(IDS.col)+c);
    }
    
    const coords = [{c:-1},{c:1},{r:-1},{r:1},{c:-1,r:-1},{c:-1,r:1},{c:1,r:-1},{c:1,r:1}] //Positions
    const cellsID = [];
    for(let i = 0; i < coords.length; i++){
      cellsID.push(doID(coords[i]));
    }

    const cells = [];
    for(let around of cellsID){
      let valid = document.getElementById(around);
      if(valid) cells.push(valid);
    }
    return cells;
  }
  function showNumbers(){
    if(this.classList[1]=="flag" || this.classList[1]=="visible") return;
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
        startGame(40, 10, 20);
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
    const arounds = getBlocksAround(zero);
    //console.log(arounds);
    for(let cell of arounds){
      if(!cell.getAttribute("deleted")){
        cell.classList.add("visible");
        if(cell.innerText == 0) {
          deleteZeros(cell);
        }
      }
    }
  }
}
const bombs = 40;
startGame(bombs, 10, 20);

// if (cell.innerText == 0) this.style.fontSize = 0; //Visual only