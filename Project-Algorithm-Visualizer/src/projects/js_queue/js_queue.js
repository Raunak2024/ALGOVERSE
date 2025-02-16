//This code defines a JavaScript module that creates a queue data structure using a class named Queue.

//It also includes functions for manipulating and visualizing the queue in a basic UI, such as adding items, taking out items, peeking at the front item, and clearing the entire queue. The code utilizes HTML elements for UI and relies on CSS files for styling.


import '@styles/globals.css';
import './js-queue.css';


// Queue Class:

// Properties:
// items: An object representing the queue.
// itemToAddKey: A counter representing the key for the next item to be added.
// itemToRemoveKey: A counter representing the key for the next item to be removed.
// Methods:
// add(item): Adds an item to the queue.
// isEmpty(): Checks if the queue is empty.
// clear(): Clears all items from the queue.
// remove(): Removes and returns the front item from the queue.
// size(): Returns the current size of the queue.
// peek(): Returns the front item of the queue without removing it.

export class Queue {
  items = {};
  itemToAddKey = 0; // was previously called `count`
  itemToRemoveKey = 0;
  add(item) {
    this.items[this.itemToAddKey] = item;
    this.itemToAddKey++;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.items = {};
    this.itemToAddKey = 0;
    this.itemToRemoveKey = 0;
  }

  remove() {
    if (this.isEmpty()) {
      return undefined;
    }
    const item = this.items[this.itemToRemoveKey];
    delete this.items[this.itemToRemoveKey];
    this.itemToRemoveKey++;
    return item;
  }

  size() {
    return this.itemToAddKey - this.itemToRemoveKey;
  }

  peek() {
    return this.items[this.itemToRemoveKey];
  }
}

const myQueue = new Queue();

//************************************************************************************************* */

// peekQueueItem Function:

// Peeks at the front item in the queue in the UI.
// Adds a CSS class for a visual effect and removes it after a short delay.

const peekQueueItem = () => {
  const peekedElement = document.querySelector('.box_item:first-child');
  if (!peekedElement) {
    return;
  }
  peekedElement.classList.add('peeking');
  setTimeout(() => {
    peekedElement.classList.remove('peeking');
  }, 500);
};

//************************************************************************************************* */

// renderQueue Function:

// Renders the current state of the queue in the UI.
// Clears existing queue items and appends new items to the UI based on the queue state.

const renderQueue = () => {
  const queueElement = document.querySelector('.box');
  queueElement.querySelectorAll('.box_item').forEach((item) => item.remove());
  for (const key in myQueue.items) {
    const item = myQueue.items[key];
    const queueItemElement = document.createElement('DIV');
    queueItemElement.classList.add('box_item');
    queueItemElement.textContent = item;
    queueElement.append(queueItemElement);
  }
};
//****************************************************************************************** */
// initiateHandlers Function:

// Sets up event handlers for UI buttons.
// Clicking the "Add Item" button generates a random number and adds it to the queue.
// Clicking the "Peek Item" button visually highlights the front item in the queue.
// Clicking the "Take Out Item" button removes the front item from the queue.
// Clicking the "Clear" button clears all items from the queue.

const initiateHandlers = () => {
  const addItemBtn = document.querySelector('#addItemBtn');
  const peekItemBtn = document.querySelector('#peekItemBtn');
  const takeOutItemBtn = document.querySelector('#takeOutItemBtn');
  const clearBtn = document.querySelector('#clearBtn');
  clearBtn.addEventListener('click', () => {
    myQueue.clear();
    renderQueue();
  });
  addItemBtn.addEventListener('click', () => {
    const randomNumber = Math.round(Math.random() * 50 + 1);
    myQueue.add(randomNumber);
    renderQueue();
  });
  takeOutItemBtn.addEventListener('click', () => {
    myQueue.remove();
    renderQueue();
    peekQueueItem();
  });
  peekItemBtn.addEventListener('click', () => {
    peekQueueItem();
  });
};

const main = () => {
  initiateHandlers();
};

main();
