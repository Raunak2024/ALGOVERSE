let soe = document.getElementById("soe");
let start = document.getElementById("solve_soe");
let stop = document.getElementById("clear");
let result = document.getElementById("result");
let home = document.getElementById("home");

//let numbers =[];



function displayNumbers(){
    let count=1;
    while (soe.firstChild) {
        soe.removeChild(soe.firstChild);
    }

    for(let i=1;i<=10;i++){
        let soeRow = document.createElement("tr");
        soe.appendChild(soeRow);
        for(let j=1;j<=10;j++){
            let soeCell = document.createElement("td");
            soeRow.appendChild(soeCell);
            soeCell.id = `cell-${count}`;
            if(count==1){
                soeCell.classList.add("one");
            }
            //numbers.push(count);
            soeCell.innerText=count;
            count++;
        }
    }    

    console.log(numbers);

}

let ms=100;

function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve,ms));
}

async function notPrime(num){
    if(flag)
    {
        return;
    }
    for(i=0;i<num.length;i++){
        if(flag){
            return;
        }
        let cell = document.getElementById(`cell-${num[i]}`);
        cell.classList.remove("multiple");
        cell.classList.add("notPrime");
        await sleep(ms);
    }
}

async function primeSieveAlgo(){
       //kisi index pe false set hai to us index ko prime number consider kiya jayega
        //kisi index pe true set hai to us index ko not prime number consider kiya jayega
        let arr = new Array(101);
        arr[0]=true;
       

        for(let i=2;i<=100;i++){
            arr[i]=false;
        }
      
        console.log(arr);

        for(let i=2;i<arr.length;i++)
        {   await sleep(ms);
            if(flag)
            {
                return;
            }
            let num =[];  
            if(i==1){
                if(flag)
                {
                    return;
                }
                arr[1]=true;
                let cell = document.getElementById(`cell-${i}`);
                cell.classList.add("currentCell");
                await sleep(ms*5);
                cell.classList.remove("currentCell");
                cell.classList.add("notPrime");
                await sleep(ms);
            }
            else{
            if(arr[i]==false){
                if(flag)
                {
                    return;
                }
                let cell = document.getElementById(`cell-${i}`);
                cell.classList.add("currentCell");
                await sleep(ms*10);
                for(let j=2;i*j<=100;j++){
                    
                    let multi = document.getElementById(`cell-${i*j}`);
                    arr[i*j]=true; //not prime set kiyo ho
                    if(flag)
                    {
                     return;
                    }
                    multi.classList.add("multiple");
                    num.push(i*j);
                    if(flag)
                    {
                        return;
                    }
                    await sleep(ms);
                }
                if(flag)
                    {
                        return;
                    }
                await sleep(ms);
                cell.classList.remove("currentCell");
                cell.classList.add("prime");
                result.innerHTML += i + ",&nbsp;&nbsp;";  
                await sleep(ms);
                await notPrime(num);
                

            }}

        }
    
}

let flag=false;

document.addEventListener("DOMContentLoaded", function(){
    flag=false;
   displayNumbers(); 
   result.innerHTML="";
});


start.addEventListener("click", function(){
    flag=false;
    primeSieveAlgo();

});

stop.addEventListener("click",function(){
    flag=true;
    result.innerHTML="";
    displayNumbers(); 
 
});

home.addEventListener("click",function(){
    window.location.href="index.html";
})