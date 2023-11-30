console.log('binary')
var count = 0
async function binarySearch(array, n, val) {
    let low = 0, high = n - 1;
    while (low <= high) {
        await waitcount(delay)
        let mid = Math.floor((low + high) / 2)
        // console.log(mid)
        // console.log(val)
        if (array[mid].innerHTML == val) {
            array[mid].style.background = 'green'
            array[mid].style.color = '#fcfcfc'
            findedAudio.play()
            findingAudio.pause()
            count++
            console.log(count)
            const step = document.querySelector('.step')
            step.innerHTML = `${count}`
            return mid;
        }
        // if val is greater than array[mid].. schrink the left part of the array
        if (val > array[mid].innerHTML) {
            array[mid].style.background = 'red'
            array[mid].style.color = 'white'
            findingAudio.play()
            count++
            low = mid + 1;
        }
        else {
            high = mid - 1;
            array[mid].style.background = 'red'
            array[mid].style.color = 'white'
            count++
            findingAudio.play()
        }
    }
    findingAudio.pause()
    return -1
}


async function sorting(array) {
    array.sort((a, b) => {
        return a.innerHTML - b.innerHTML
    })
    return array
}

async function Arrange(Array) {
    const body = document.querySelector('#mainbody')
    while (body.firstChild) {
        body.removeChild(body.firstChild)
    }
    for (let i = 0; i < Array.length; i++) {
        body.appendChild(Array[i])
    }
}

async function descriptionText() {
    const section = document.querySelector('#fullbody')
    section.style.height = `184vh`

    const description = document.querySelector('#description')
    description.style.display = 'flex'

    const code = document.querySelector('#code_java')
    // console.log(code.innerHTML)
    code.innerHTML = `// c++ code

    #include<bits/stdc++.h>
    using namespace std;
        
    int BinarySearch(int arr[],int size,int key)
    {
        int left=0;
        int right=size-1;
        int mid=left+(right-left)/2;
    
        while(left<=right){
    
            if(key==arr[mid]){
                 return mid;
            }
    
            else if(key>arr[mid])
            {
                left=mid+1;
            }
    
            else{
                right=mid-1;
            }
             mid=left+(right-left)/2;
        }
        return -1;
    }
    
    int main()
    {
    int arr[]={10,20,30,40,50,60};
    int size=sizeof(arr)/sizeof(arr[0]);
    
    int key=20;
    
    int k=BinarySearch(arr,size,key);
    
    cout<<k<<endl;
        
    return 0;
    }
`
    const time = document.querySelector('#time')
    time.innerHTML = `
> Best-case complexity = The best-case time complexity  would be O(1)
when the central index would directly match the desired value.
> Worst-case complexity = O(log n) in the worst case. 
> Average complexity = The average case time complexity 
of the binary search algorithm is O(log n)
`

    const space = document.querySelector('#space')
    space.innerHTML = `Binary Search will be an O(log n) space complex
in a recursive implementation.
Binary Search will be executed iteratively so that the 
space complexity is O(1).
Two variables are required to keep track of the number 
of elements that need to be checked... 
Additional data is not necessary.`


}

const binary = document.querySelector('#binary_Search').addEventListener('click', async () => {
    console.log('clicked')
    
    mouseclick.play()
    const array1 = document.querySelectorAll('.bars')
    // console.log(array1) provide nodelist
    let Array = []
    array1.forEach((element) => {
        Array.push(element)
    })
    // console.log(Array)

    const val = document.querySelector('#searchingVal').value
    if (val != '') {
        searchText.innerHTML=`Binary Searching..`
        await sorting(Array)
        await Arrange(Array)
        // console.log(Array)
        console.log(parseInt(val))

        await descriptionText()
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        var ind = await binarySearch(Array, Array.length, parseInt(val))
        // console.log(ind)
        const index = document.querySelector('.index')
        if (ind != -1) {
            searchText.innerHTML=`Searching Complete`
            index.innerHTML = `${val} is present at index no. ${ind} `
        }
        else {
            searchText.innerHTML=`Not Found!!`
            index.innerHTML = `${val} is not present in the array!!`
        }

    }
    else {
        alert('Pleae put Searching Value first!!😕😕')
    }
    // enableSortingBtn();
    // enableSizeSlider();
    enableNewArrayBtn();
})