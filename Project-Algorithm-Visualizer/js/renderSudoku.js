let sudo = document.getElementById("sudoku");
let solve = document.getElementById("solve");
let generate = document.getElementById("generate");
let clearBoard = document.getElementById("clear");
let result = document.getElementById("sudoku-status");
let user = document.getElementById("user");
let home = document.getElementById("home");

let solved=false;
let f1=true;


    // let board = [
    //     [3, 0, 6, 5, 0, 8, 4, 0, 0],
    //     [5, 2, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 8, 7, 0, 0, 0, 0, 3, 1],
    //     [0, 0, 3, 0, 1, 0, 0, 8, 0],
    //     [9, 0, 0, 8, 6, 3, 0, 0, 5],
    //     [0, 5, 0, 0, 9, 0, 6, 0, 0],
    //     [1, 3, 0, 0, 0, 0, 2, 5, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 7, 4],
    //     [0, 0, 5, 2, 0, 6, 3, 0, 0],
    //     ];

let board =[];

function makeBoard(){
        board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
    }
 function cleanBoard(){
    
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let sudokuCell = document.getElementById(`cell-${i}-${j}`);
            if(board[i][j]!=0){
                sudokuCell.classList.remove("given-num");
                sudokuCell.classList.add("discovered-num");
                board[i][j]=0;
                sudokuCell.innerText="";
            }
            
        }
    }

 }
    
 document.addEventListener("DOMContentLoaded", function(){
    
    makeBoard();
    sudokuMaker();
    setEditable(true);  
    remove();  
});

function sudokuMaker(){

    while (sudo.firstChild) {
        sudo.removeChild(sudo.firstChild);
    }

    for(let i=0;i<9;i++){
        let sudokuRow = document.createElement("tr");
        sudo.appendChild(sudokuRow);
    
        for(let j=0;j<9;j++){
            let sudokuCell = document.createElement("td");
            sudokuRow.appendChild(sudokuCell);
            let num = board[i][j];
            sudokuCell.id = `cell-${i}-${j}`;
    
            let sudokuValue = document.getElementById(`cell-${i}-${j}`);

    
            if (num !== 0) {
                sudokuValue.innerText = num;
                sudokuCell.classList.add('given-num');
            }
            else {
                sudokuCell.classList.add('discovered-num');
            }
            
    
        if (i === 2 || i === 5) {
            sudokuCell.classList.add('box-boundary-row');
        }
        if (j === 2 || j === 5) {
            sudokuCell.classList.add('box-boundary-col');
        }
    
        if(i==3 || i==4 || i==5 || j==3 || j==4 || j==5)
        {
            sudokuCell.classList.add('gray-box');
        }}
    }  
}


function setEditable(editable){
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            let currentCell = document.getElementById(`cell-${i}-${j}`);
            currentCell.contentEditable = editable;

            currentCell.addEventListener('keydown', evt => {
                let [row, col] = evt.target.id.match(/\d/g).map(num => parseInt(num));
                let input = parseInt(evt.key);
        
                if (evt.target.textContent.length > 0 || isNaN(input)) {
                    if (evt.key === 'Backspace') {
                        evt.target.classList.remove('given-num');
                        evt.target.classList.add('discovered-num');
                        board[row][col] = 0;
                    }
                    else {
                        evt.preventDefault();
                    }
                }
                else {
                    if (isPossible(board,row, col, input)) {
                        evt.target.classList.remove('discovered-num');
                        evt.target.classList.add('given-num');
                        board[row][col] = input;
                    }
                    else {
                        evt.preventDefault();
                    }
                }
            });

             // Highlight row, column and box where the focused cell is in
             currentCell.addEventListener('focusin', evt => {
                let [row, col] = evt.target.id.match(/\d/g).map(num => parseInt(num));
                let rowStart = row - row % 3;
                let rowEnd = rowStart + 3;
                let colStart = col - col % 3;
                let colEnd = colStart + 3;

                for (let i = 0; i < board[row].length; i++) {
                    let cellRow = document.getElementById(`cell-${row}-${i}`);
                    let cellCol = document.getElementById(`cell-${i}-${col}`);
                    cellRow.classList.add('focused-cell');
                    cellCol.classList.add('focused-cell');
                }

                for (let x = rowStart; x < rowEnd; x++) {
                    for (let y = colStart; y < colEnd; y++) {
                        let cellBox = document.getElementById(`cell-${x}-${y}`);
                        cellBox.classList.add('focused-cell');
                    }
                }
            });

            // Remove highlight of row, column and box where the focused cell was in
            currentCell.addEventListener('focusout', evt => {
                let [row, col] = evt.target.id.match(/\d/g).map(num => parseInt(num));
                let rowStart = row - row % 3;
                let rowEnd = rowStart + 3;
                let colStart = col - col % 3;
                let colEnd = colStart + 3;

                for (let i = 0; i < board[row].length; i++) {
                    let cellRow = document.getElementById(`cell-${row}-${i}`);
                    let cellCol = document.getElementById(`cell-${i}-${col}`);
                    cellRow.classList.remove('focused-cell');
                    cellCol.classList.remove('focused-cell');
                }

                for (let x = rowStart; x < rowEnd; x++) {
                    for (let y = colStart; y < colEnd; y++) {
                        let cellBox = document.getElementById(`cell-${x}-${y}`);
                        cellBox.classList.remove('focused-cell');
                    }
                }
            });


        }
    }   
}



// sudoku solver---------------------------------------------------------------------------------------------------------------------------------
solve.addEventListener("click", function(){

    let solvable = true;
    isCancel = false;
    setEditable(false);
    // for(let i=0;i<9;i++)
    // {
    //     if(!solvable){
    //         for(let j=0;j<9;j++)
    //         {
    //             if(board[i][j]!=0){
    //                 solvable=true;
    //                 break;
    //             }    
    //         }
    //     }
    //     else break;
    // }

    if(solvable){
        solved=false;
        checkStatus();
        console.log(board);
    }
    else{
        alert("empty sudoku !");
    }
});



async function checkStatus(){
    let game = await sudokuSolver(board,0,0)
    if(game==true){
        result.classList.add("status-solved");
        result.innerText="Solved !";
        console.log("working");
    }
    else if(game==false){
        result.classList.add("status-unsolved");
        result.innerText="Unsolvable !";
        console.log("working");
    }

}

function remove(){
    result.innerText="";
   if(result.classList.contains("status-solved")) 
   {
    result.classList.remove("status-solved");
   }
   if(result.classList.contains("status-unsolved")) 
   {
    result.classList.remove("status-unsolved");
   }
}


let ms =2;



function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve,ms));
}


let isCancel=false;


async function sudokuSolver(board,row, col){

    if(isCancel){
        return;
    }

   
    if(solved){
        return true;
    }
       
    if(col==9){
        row++;
        col=0;
    }

    if(row==9) 
    {
        solved=true;
        return true;
    }
    if(board[row][col]!=0)
    {
       return await sudokuSolver(board,row,col+1);
    }
    else {

        for(let val=1;val<=9;val++)
        {
            
            if(isPossible(board,row,col,val))
            {
                let sudokuValue = document.getElementById(`cell-${row}-${col}`);
                board[row][col]=val;
                sudokuValue.innerText=val;
                await sleep(ms);
                console.log(sudokuValue.innerText);
                await sudokuSolver(board,row, col + 1);
                if(solved){
                    return true;
                }
                if(isCancel){
                    return;
                }
                board[row][col]=0;
                sudokuValue.innerText="";
            }

        }

        return false;

    
    }
}



function isPossible(grid,row,col,val){
    var r,c;
        // horizontal check
        for( c=0;c<9;c++)
        {
            if(grid[row][c]==val)
                return false;
        }

        // vertical check
        for( r=0;r<9;r++)
        {
            if(grid[r][col]==val)
                return false;
        }

        //3X3 check


        r = row - row%3;
        c = col - col%3;


        for(let i=r;i<r+3;i++){
            for(let j=c;j<c+3;j++){
                if(grid[i][j]==val)
                    return false;
            }
        }

        return true;

}


//-------------------------------------------------------------------------------------------------------------------------------------

generate.addEventListener("click", function(){
    
    solved=false;
    cleanBoard();
    isCancel=true;
    generateHelper(board,0,0);
    generateSudoku(board);
    setEditable(false);
    remove();
});

function generateSudoku(board){

    let emptyCells = Math.floor(Math.random() * 14) + 51;    
    let cellPositions = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            cellPositions.push([i, j]);
        }
    }

    cellPositions = shuffle(cellPositions).slice(0, emptyCells);        

    for (let i = 0; i < emptyCells; i++) {
        let [row, col] = cellPositions[i];
        board[row][col] = 0;
        let sudokuValue = document.getElementById(`cell-${row}-${col}`);
        sudokuValue.classList.remove("given-num");
        sudokuValue.classList.add("discovered-num");
        sudokuValue.innerText="";  
    }

}
function generateHelper(board,row,col){

    if(solved){
        return;
    }

    if(col==9)
    {
        row++;
        col=0;
    }
    if(row==9) 
    {
        //displaySudoku(grid);
        solved=true;
        console.log("solved " + solved);
        return;
    }
    if(board[row][col]!=0)
    {
        generateHelper(board,row,col+1);
    }
    else {

        let possibleNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            possibleNums = shuffle(possibleNums);
            console.log(possibleNums);
        for(let val of possibleNums)
        {
            if(isPossible(board,row,col,val))
            {
                let sudokuValue = document.getElementById(`cell-${row}-${col}`);
                sudokuValue.classList.add("given-num");
                sudokuValue.classList.remove("discovered-num");
                board[row][col]=val;
                sudokuValue.innerText=val;
                console.log(sudokuValue.innerText);
                generateHelper(board,row, col + 1);
                if(solved){
                    return;
                }
                board[row][col]=0;
                sudokuValue.innerText="";
            }
        }
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------

  clearBoard.addEventListener("click", function(){
    solved=false;
    isCancel=true;
    remove();
    cleanBoard(); 
    sudokuMaker();
    setEditable(true);
  });

  //-----------------------------------------------------------------------------------------------------------------------------------------------



home.addEventListener("click",function(){
    window.location.href="index.html";
});