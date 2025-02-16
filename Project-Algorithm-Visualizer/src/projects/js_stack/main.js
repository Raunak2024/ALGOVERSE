// This code defines a JavaScript module that creates a simple stack data structure and provides functions for converting decimal numbers to binary using a stack. 

//The stack is implemented using a class named `Stack`, and the conversion is done through the `decimalToBinary` function.

//The code also includes functions for manipulating and visualizing the stack in a basic UI, such as adding items, taking out items, and peeking at the top item. 


//Event handlers are set up to respond to button clicks for these actions. The code utilizes HTML elements for UI and relies on a CSS file for styling.

//********************************************************************************************* */

// 1 Stack Class:

// Methods:
// add(item): Adds an item to the stack.
// isEmpty(): Checks if the stack is empty.
// clear(): Clears all items from the stack.
// takeOut(): Removes and returns the top item from the stack.
// size(): Returns the number of items in the stack.
// peek(): Returns the top item of the stack without removing it.

import '@styles/globals.css';
(() => {
  class Stack {
    items = [];
    add(item) {
      this.items.push(item);
    }

    isEmpty() {
      return this.items.length === 0;
    }

    clear() {
      this.items.length = 0;
    }

    takeOut() {
      if (this.isEmpty()) {
        return undefined;
      }
      return this.items.pop();
    }

    size() {
      return this.items.length;
    }

    peek() {
      return this.items[this.items.length - 1];
    }
  }
//************************************************************************************************ */

// decimalToBinary Function:

// Converts a decimal number to binary using a stack.
// Utilizes a stack (reminderStack) to store remainders during the conversion.
// Modifies the UI by calling addItemToStack to display each step in the conversion.


  const decimalToBinary = (decimalNumber) => {
    const reminderStack = new Stack();
    let currentNumber = decimalNumber;
    let currentReminder;
    let binaryString = '';
    while (currentNumber > 0) {
      currentReminder = Math.floor(currentNumber % 2);
      reminderStack.add(currentReminder);
      addItemToStack(currentReminder); // JUST TO SHOW IN THE UI
      currentNumber = Math.floor(currentNumber / 2);
    }

    while (!reminderStack.isEmpty()) {
      const stackItem = reminderStack.takeOut();
      binaryString += stackItem.toString();
    }

    return binaryString;
  };

  const myStack = new Stack();

//   peekStackItem Function:

// Peeks at the top item in the stack in the UI.
// Adds a CSS class for a visual effect and removes it after a short delay.

  const peekStackItem = () => {
    const peekedElement = document.querySelector('.box_item:first-child');
    if (!peekedElement) {
      return;
    }
    peekedElement.classList.add('peeking');
    setTimeout(() => {
      peekedElement.classList.remove('peeking');
    }, 500);
  };
//************************************************************************* */

//addItemToStack Function:
//Adds a randomly generated number to the stack.
//Invokes renderStack to update the UI with the current stack state.

  const addItemToStack = (item) => {
    myStack.add(item);
    renderStack();
  };
//********************************************************************** */

// initiateHandlers Function:

// Sets up event handlers for UI buttons.
// Clicking the "Add Item" button generates a random number and adds it to the stack.
// Clicking the "Peek Item" button visually highlights the top item in the stack.
// Clicking the "Take Out Item" button removes the top item from the stack.
// Clicking the "Convert" button converts a decimal input to binary and updates the stack.


  const initiateHandlers = () => {
    const addItemBtn = document.querySelector('#addItemBtn');
    const peekItemBtn = document.querySelector('#peekItemBtn');
    const takeOutItemBtn = document.querySelector('#takeOutItemBtn');
    const dToBConvertBtn = document.querySelector('#dToBConvertBtn');

    dToBConvertBtn.addEventListener('click', () => {
      myStack.clear();
      const input = document.querySelector('#decimalToBinaryInput');
      decimalToBinary(Number(input.value));
    });

    addItemBtn.addEventListener('click', () => {
      const randomNumber = Math.round(Math.random() * 50 + 1);
      addItemToStack(randomNumber);
    });

    takeOutItemBtn.addEventListener('click', () => {
      myStack.takeOut();
      renderStack();
      peekStackItem();
    });

    peekItemBtn.addEventListener('click', () => {
      peekStackItem();
    });
  };

// Initialization Block:

// Creates an instance of the Stack class (myStack).
// Calls renderStack to initially render the empty stack in the UI.
// Calls initiateHandlers to set up event handlers for UI buttons.

  const renderStack = () => {
    const stackElement = document.querySelector('.box');
    stackElement.querySelectorAll('.box_item').forEach((item) => item.remove());
    myStack.items.forEach((item) => {
      const stackItemElement = document.createElement('DIV');
      stackItemElement.classList.add('box_item');
      stackItemElement.textContent = item;
      stackElement.prepend(stackItemElement);
    });
  };

  renderStack();
  initiateHandlers();
})();
