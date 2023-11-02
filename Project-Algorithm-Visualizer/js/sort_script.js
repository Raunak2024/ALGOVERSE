let randomize_Array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let range = document.getElementById("range");
let speed= document.getElementById("speed");
let algo = document.getElementById("sorting_algos");
let home = document.getElementById("home");


let sortType = "";
let minRange  = 1;
let ms = speed.value;
let maxRange = range.value;
let numOfBars = range.value;
let hfactor = 1.6;
let flag=false;
let factor=10;


let unsorted_array = new Array(numOfBars);

range.addEventListener("input",function(){
    update();
})

algo.addEventListener("change",function(){
    sortType = algo.value;
})

speed.addEventListener("change", function(){
    ms = speed.value;
})

function randomNum(min,max){
    return (Math.floor(Math.random() * (max-min+1)) + min)/hfactor;
}

function createRandomArray(){
    for(let i=0;i<numOfBars;i++){
        unsorted_array[i] = randomNum(minRange,maxRange);
    }
}


document.addEventListener("DOMContentLoaded", function(){
    createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array){
    for(let i=0;i<array.length;i++){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i]*10 + "px";
        bar.style.backgroundColor = "aqua";
        bars_container.appendChild(bar);
    }
    
}

function update(){

    flag=true;
    ms = speed.value;
    maxRange = range.value;
    numOfBars = range.value;
    unsorted_array = new Array(numOfBars);
    createRandomArray();
    bars_container.innerHTML="";
    renderBars(unsorted_array); 

}

randomize_Array.addEventListener("click", function(){
    update(); 
});

function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve,ms));
}

//bubble sort algorithm ----------------------------------------------------------------------------------------
async function bubbleSort(array){
    
    let bars = document.getElementsByClassName("bar");
    let l=array.length;
    
    for(let i=0;i<array.length;i++){

       if(flag)
        return;

        for(let j=0;j<array.length-i-1;j++){

            if(flag)
              return;

            for(let k=0;k<bars.length;k++){
                if(k!==j && k!==j+1 && k<l){
                    bars[k].style.backgroundColor = "aqua";
                }
            }
            if(array[j]>array[j+1]){
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                bars[j].style.height = array[j]* factor + "px";
                bars[j].style.backgroundColor = "red";
                bars[j+1].style.height = array[j+1]* factor + "px";
                bars[j+1].style.backgroundColor = "red";
               
                await sleep(ms); 

            }
        }
        l--;
        bars[l].style.backgroundColor = "green";
        
        await sleep(ms);
}
    
    return array;
}
    
//----------------------------------------------------------------------------------------------------------------

//insertion sort algorithm----------------------------------------------------------------------------------------

async function insertionSort(array) {
    let bars = document.getElementsByClassName("bar");
   
    for (let i = 1; i < array.length; i++) {
      if(flag)
        return;
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        if(flag)
         return;
        array[j + 1] = array[j];
        bars[j + 1].style.height = array[j + 1] * factor + "px";
        bars[j + 1].style.backgroundColor = "red";
        
        await sleep(ms);
  
        for (let k = 0; k < bars.length; k++) {
          if (k != j + 1) {
            bars[k].style.backgroundColor = "aqua";
          }
        }
        j = j - 1;
      }
      array[j + 1] = key;
      bars[j + 1].style.height = array[j + 1] *factor + "px";
      bars[j + 1].style.backgroundColor = "green";

      await sleep(ms);
    }
  
    for (let k = 0; k < bars.length; k++) {
      bars[k].style.backgroundColor = "aqua";
    }

    return array;
   
  }

//------------------------------------------------------------------------------------------------------------------

//heap sort---------------------------------------------------------------------------------------------------------

async function heapSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
      await heap(array, array.length, i);
    }
    for (let i = array.length - 1; i >= 0; i--) {
      await swap(array, 0, i, bars);
      await heap(array, i, 0);
    }
    for (let k = 0; k < bars.length; k++) {
      bars[k].style.backgroundColor = "aqua";
      await sleep(ms);
    }
    return array;
  }
  
  async function heap(array, n, i) {
    let bars = document.getElementsByClassName("bar");
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < n && array[left] > array[largest]) {
      largest = left;
    }
    if (right < n && array[right] > array[largest]) {
      largest = right;
    }
    if (largest != i) {
      await swap(array, i, largest, bars);
      await heap(array, n, largest);
    }
  }
  
  async function swap(array, i, j, bars) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    bars[i].style.height = array[i] * factor + "px";
    bars[j].style.height = array[j] * factor + "px";
    bars[i].style.backgroundColor = "red";
    bars[j].style.backgroundColor = "red";
    await sleep(ms);
  
    for (let k = 0; k < bars.length; k++) {
      if (k != i && k != j) {
        bars[k].style.backgroundColor = "aqua";
      }
    }
    return array;
  }

//------------------------------------------------------------------------------------------------------------------------------------------------

//merge sort--------------------------------------------------------------------------------------------------------------------------------------


async function merge(arr) {
    let bars = document.getElementsByClassName("bar");
    if (arr.length < 2) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    await merge(left);
    await merge(right);
  
    let i = 0;
    let j = 0;
    let k = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        arr[k] = left[i];
        i++;
       
      } else {
        arr[k] = right[j];
        j++;
    
      }
      
      bars[k].style.height = arr[k] * factor + "px";
      bars[k].style.backgroundColor = "lightgreen";
      if (k + arr.length < bars.length) {
        bars[k + arr.length].style.height = arr[k] * factor + "px";
       
        bars[k + arr.length].style.backgroundColor = "yellow";
      }
      await sleep(ms);
      
  
      k++;
    }
  
    while (i < left.length) {
      arr[k] = left[i];
      bars[k].style.height = arr[k] * factor + "px";
      bars[k].style.backgroundColor = "lightgreen";
      await sleep(ms);
      i++;
      k++;
    }
  
    while (j < right.length) {
      arr[k] = right[j];
      bars[k].style.height = arr[k] * factor + "px";
      bars[k].style.backgroundColor = "lightgreen";
      await sleep(ms);
      j++;
      k++;
    }
  
  
    for (let k = 0; k < bars.length; k++) {
      bars[k].style.backgroundColor = "aqua";
    }
  
    return arr;
  }
  
  function mergeSort(arr, start, end) {
    if (arr.length < 2) {
      return arr;
    }
  
    let middle = Math.floor((start + end) / 2);
    let left = arr.slice(start, middle);
    let right = arr.slice(middle, end);
  
    //mergeSort(left);
    merge(right);
  }

//--------------------------------------------------------------------------------------------------------------------------------

//quick sort----------------------------------------------------------------------------------------------------------------------


async function swap(items, leftIndex, rightIndex, bars) {
    if(flag)
        return;
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    bars[leftIndex].style.height = items[leftIndex] * factor + "px";
    bars[leftIndex].style.backgroundColor = "green";
    
    bars[rightIndex].style.height = items[rightIndex] * factor + "px";
    bars[rightIndex].style.backgroundColor = "green";
    
    await sleep(ms);
  }
  async function partition(items, left, right) {
    let bars = document.getElementsByClassName("bar");
    if(flag)
        return;

    let pivotIndex = Math.floor((right + left) / 2);
    var pivot = items[pivotIndex]; //middle element
    bars[pivotIndex].style.backgroundColor = "red";
  
    for (let i = 0; i < bars.length; i++) {
      if (i != pivotIndex) {
        bars[i].style.backgroundColor = "aqua";
      }
    }
  
    (i = left), //left pointer
      (j = right); //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        await swap(items, i, j, bars); 
        i++;
        j--;
      }
    }
    return i;
  }
  
  async function quickSort(items, left, right) {
    var index;
    let bars = document.getElementsByClassName("bar");
    if(flag)
        return;
    if (items.length > 1) {
      index = await partition(items, left, right); 
      if (left < index - 1) {
         await quickSort(items, left, index - 1);
      }
      if (index < right) {
        await quickSort(items, index, right);
      }
    }
  
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "aqua";
    }
    return items;
  }

  //-------------------------------------------------------------------------------------------------------------------------------------

sort_btn.addEventListener("click", function(){
    flag=false;
    switch(sortType){
        case "bubble":
            bubbleSort(unsorted_array);
            break;
        case "insertion":
            insertionSort(unsorted_array);
            break;
        case "heap":
            heapSort(unsorted_array);
            break;
        case "merge":
            mergeSort(unsorted_array);
            break;
        case "quick":
            quickSort(unsorted_array,0,unsorted_array.length-1);
            break;
    }
});

home.addEventListener("click",function(){
  window.location.href="index.html";
})