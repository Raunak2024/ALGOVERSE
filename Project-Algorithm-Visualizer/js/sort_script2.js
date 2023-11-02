let box_container = document.getElementById("box_container");
let rangeBox = document.getElementById("rangeBox");
let randomize_Array_box = document.getElementById("randomize_array_btn_box");
let sort_btn_box = document.getElementById("sort_btn_box");
let speedBox = document.getElementById("speedBox");
let createArray = document.getElementById("createArray");
let arrayBox = document.getElementById("arrayBox");
let algoBox = document.getElementById("sorting_algos_box");
let home1 = document.getElementById("home1");



let sortTypeBox = "";
let totalbox = rangeBox.value;
let minValue = 0;
let maxValue = 100;
let s=speedBox.value;



let un_array = new Array(totalbox);

algoBox.addEventListener("change",function(){
  sortTypeBox = algoBox.value;
})

createArray.addEventListener("click", function(){
    let str = arrayBox.value;
    if(str.length!=0)
      toArray(str);
})

function toArray(str){
    str = str.split(",");
    for(x in str){
        un_array[x] = parseFloat(str[x]);
    }

    if(un_array.length>16){
        alert("max array size: 15");
        arrayBox.value="";
    }   
    else{

        flag=true;
        s = speedBox.value;
        box_container.innerHTML="";
        renderBoxes(un_array); 

    }
   
}

function randomnum(min,max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}


function createRandomarray(){
    for(let i=0;i<totalbox;i++){
        un_array[i] = randomnum(minValue,maxValue);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    createRandomarray();
    renderBoxes(un_array);
});


function renderBoxes(array){
    for(let i=0;i<array.length;i++){
        let box = document.createElement("div");
        box.classList.add("box");
        box.innerText = array[i];
        box_container.appendChild(box);
    }
    
}

function updateBox(){

    flag=true;
    s = speedBox.value;
    totalbox = rangeBox.value;
    un_array = new Array(totalbox);
    createRandomarray();
    box_container.innerHTML="";
    renderBoxes(un_array); 

}

randomize_Array_box.addEventListener("click", function(){
    updateBox(); 
});

rangeBox.addEventListener("input",function(){
    updateBox();
})

speedBox.addEventListener("change", function(){
    s = speedBox.value;
})

function sleepBox(s){
    return new Promise((resolve) => setTimeout(resolve,s));
}




// Bubble sort Box-----------------------------------------------------

//bubble sort algorithm ----------------------------------------------------------------------------------------
async function bubbleSortBox(array){
    
    let box = document.getElementsByClassName("box");
    
    
    for(let i=0;i<array.length;i++){

        for(let j=0;j<array.length-i-1;j++){

            box[j].style.backgroundColor = "yellow";
            box[j+1].style.backgroundColor = "yellow";
            await sleepBox(550); 

            if(array[j]>array[j+1]){
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
               
                box[j].innerHTML= array[j]; 
                
                box[j+1].innerHTML=array[j+1];
                box[j].style.backgroundColor = "red";
                box[j+1].style.backgroundColor = "red";

                await sleepBox(550); 

            }
            for(let k=0;k<box.length;k++){
                // if(k!==j && k!==j+1){
                    box[k].style.backgroundColor =  "antiquewhite";
                
            }
        }
       
        
        await sleepBox(s);
}
    
    return array;
}

   
//----------------------------------------------------------------------------------------------------------------

//insertion sort algorithm----------------------------------------------------------------------------------------

async function insertionSortBox(array) {
    let box = document.getElementsByClassName("box");
   
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;

      for (let k = 0; k <=j; k++) {
          box[k].style.backgroundColor = "yellow";
      }

      while (j >= 0 && array[j] > key) {
        box[j + 1].style.backgroundColor = "red";
        await sleepBox(s);
        array[j + 1] = array[j];
        box[j + 1].innerHTML =array[j];
        j = j - 1;
      }


      array[j + 1] = key;
      box[j + 1].innerHTML = key;
      box[j + 1].style.backgroundColor = "green";
    
      await sleepBox(s);
    }
  
    for (let k = 0; k < box.length; k++) {
      box[k].style.backgroundColor = "antiquewhite";
    }

    return array;
   
  }
//------------------------------------------------------------------------------------------------------------------


//heap sort---------------------------------------------------------------------------------------------------------

async function heapSortBox(array) {
    let box = document.getElementsByClassName("box");
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
        box[i].style.backgroundColor="yellow";
        await heapBox(array, array.length, i);

        box[i].style.backgroundColor = "antiquewhite";
       
    }
    for (let i = array.length - 1; i >= 0; i--) {
       
      await swapBox(array, 0, i, box);
      await heapBox(array, i, 0);
    }
    for (let k = 0; k < box.length; k++) {
      box[k].style.backgroundColor = "antiquewhite";
      await sleepBox(s);
    }
    return array;
  }
  
  async function heapBox(array, n, i) {
    let box = document.getElementsByClassName("box");
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    box[largest].style.backgroundColor="yellow";
    if(left<array.length)
        box[left].style.backgroundColor="pink";

    if(right<array.length)
        box[right].style.backgroundColor="pink";

    await sleepBox(s);

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }
    if (right < n && array[right] > array[largest]) {
      largest = right;
    }
    if (largest != i) {
      await swapBox(array, i, largest, box);
      await heapBox(array, n, largest);
    }

    if(left<array.length)
        box[left].style.backgroundColor="antiquewhite";

    if(right<array.length)
        box[right].style.backgroundColor="antiquewhite";

  }
  
  async function swapBox(array, i, j, box) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    box[i].style.backgroundColor = "red";
    box[j].style.backgroundColor = "red";
    await sleepBox(s);
    box[i].innerHTML=array[i];
    box[j].innerHTML=array[j];

    
    await sleepBox(s);
    for (let k = 0; k < box.length; k++) {
    //   if (k != i && k != j) {
        box[k].style.backgroundColor = "antiquewhite";
    //   }
    }
    return array;
  }


//--------------------------------------------------------------------------

//merge sort--------------------------------------------------------------------------------------------------------------------------------------


async function mergeBox(arr) {
    let box = document.getElementsByClassName("box");
    if (arr.length < 2) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    await mergeBox(left);
    await mergeBox(right);
  
    let i = 0;
    let j = 0;
    let k = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        arr[k] = left[i];
        box[k].innerHTML=arr[k];
        i++;
       
      } else {
        arr[k] = right[j];
        box[k].innerHTML=arr[k];
        j++;
    
      }
      
      box[k].style.backgroundColor = "lightgreen";
      if (k + arr.length < box.length) {  
        box[k + arr.length].style.backgroundColor = "yellow";
      }
      await sleepBox(s);
    
      k++;
    }
  
    while (i < left.length) {
      arr[k] = left[i];
      box[k].innerHTML=arr[k];
      box[k].style.backgroundColor = "lightgreen";
      await sleepBox(s);
      i++;
      k++;
    }
  
    while (j < right.length) {
      arr[k] = right[j];
      box[k].innerHTML=arr[k];
      box[k].style.backgroundColor = "lightgreen";
      await sleepBox(s);
      j++;
      k++;
    }
  
  
    for (let k = 0; k < box.length; k++) {
      box[k].style.backgroundColor = "aqua";
    }
  
    return arr;
  }
  
  function mergeSortBox(arr, start, end) {
    if (arr.length < 2) {
      return arr;
    }
  
    let middle = Math.floor((start + end) / 2);
    let left = arr.slice(start, middle);
    let right = arr.slice(middle, end);
  
    mergeSort(left);
    mergeBox(right);
  }

//--------------------------------------------------------------------------------------------------------------------------------


//quick sort----------------------------------------------------------------------------------------------------------------------


async function qswapBox(array, leftIndex, rightIndex, box) {

    var temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
    box[leftIndex].style.backgroundColor = "red";
    box[rightIndex].style.backgroundColor = "red";

    await sleepBox(s);

    box[leftIndex].innerHTML=array[leftIndex];
    box[rightIndex].innerHTML = array[rightIndex];

    await sleepBox(s);

    box[leftIndex].style.backgroundColor = "antiquewhite";
    box[rightIndex].style.backgroundColor = "antiquewhite";
    
  }

  async function partitionBox(array, start, end) {
    let box = document.getElementsByClassName("box");

    let pivot = array[start];

    box[start].style.backgroundColor = "pink";

    await sleepBox(s);

    let count= 0;

    for(let i=start+1;i<=end;i++){
        if(array[i]<=pivot){
            count++;
        }
    }

    let pivotIndex = start + count;

    if(count!=0){
        box[pivotIndex].style.backgroundColor = "yellow";
        await sleepBox(s);
        qswapBox(array,start,pivotIndex,box);
    }
         
    let i=start, j=end;

    while(i<pivotIndex && j>pivotIndex){

        while(array[i]<=pivot){
            i++;
        }

        while(array[j]>pivot){
            j--;
        }
        if(i<pivotIndex && j>pivotIndex){
            qswapBox(array,i,j,box);
            i++;
            j--;
        }
    }

    //await sleepBox(s);
    //box[pivotIndex].style.backgroundColor = "green";
    return pivotIndex;

  }
  
  async function quickSortBox(array, start, end) {
    
    if(start>=end)
        return;
    let p = await partitionBox(array,start,end);
    await quickSortBox(array,start,p-1);
    await quickSortBox(array,p+1,end);

  }

  //-------------------------------------------------------------------------------------------------------------------------------------



sort_btn_box.addEventListener("click", function(){
  switch(sortTypeBox){
    case "bubbleBox":
        bubbleSortBox(un_array);
        break;
    case "insertionBox":
        insertionSortBox(un_array);
        break;
    case "heapBox":
        heapSortBox(un_array);
        break;
    case "mergeBox":
        mergeSortBox(un_array);
        break;
    case "quickBox":
        quickSortBox(un_array,0,unsorted_array.length-1);
        break;
}
})

home1.addEventListener("click",function(){
  window.location.href="index.html";
})