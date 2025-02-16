// This code defines a basic linked list data structure in JavaScript, consisting of a Node class and a LinkedList class. 

//It also includes utility functions for manipulating and retrieving information about the linked list.

export const defaultEqFn = (a, b) => a === b;



// Node Class:

// Represents a node in the linked list.
// Contains an element (data) and a next reference to the next node in the list.
// Constructor allows for initializing the element and the next node.

export class Node {
  constructor(element, next = null) {
    this.element = element;
    this.next = next;
  }
}
//*************************************************************************************** */

// LinkedList Class:

// Represents a linked list.
// Properties:
// head: Points to the first node in the list.
// count: Represents the number of nodes in the list.
// equalsFn: A function for comparing elements (defaults to a function checking equality).
// Methods:
// push(element): Adds an element to the end of the list.
// removeAt(index): Removes the element at a specified index.
// getElementAt(index): Retrieves the node at a specified index.
// insertAt(element, index): Inserts an element at a specified index.
// indexOf(element): Returns the index of a specified element.
// remove(element): Removes the first occurrence of a specified element.
// clear(): Clears the entire list.
// size(): Returns the number of elements in the list.
// isEmpty(): Checks if the list is empty.
// getHead(): Returns the head of the list.
// toString(): Converts the list to a string for display.

class LinkedList {
  constructor(equalsFn = defaultEqFn) {
    this.head = null;
    this.count = 0;
    this.equalsFn = equalsFn;
  }

  push(element) {
    let current;
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
    return node;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size()) {
      return undefined;
    }

    let current = this.head;
    if (index === 0) {
      this.head = current.next;
    } else {
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = current.next;
    }

    this.count--;
    return current;
  }

  getElementAt(index) {
    if (index < 0 || index > this.size()) {
      return undefined;
    }

    let current = this.head;
    for (let i = 0; i < index && current !== null; i++) {
      current = current.next;
    }
    return current;
  }

  insertAt(element, index) {
    if (index < 0 || index > this.size()) {
      return undefined;
    }

    const node = new Node(element);
    if (index === 0) {
      const current = this.head;
      node.next = current;
      this.head = node;
    } else {
      const previous = this.getElementAt(index - 1);
      const current = previous.next;
      node.next = current;
      previous.next = node;
    }

    this.count++;
    return node;
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.size() && current !== null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  clear() {
    this.head = null;
    this.count = 0;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.size() === 0;
  }

  getHead() {
    return this.head;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const linkedListArr = [];
    let current = this.head;
    for (let i = 0; i < this.size() && current !== null; i++) {
      linkedListArr.push(current.element);
      current = current.next;
    }

    return linkedListArr.join(', ');
  }
}
export default LinkedList;
