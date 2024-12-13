let display = '', mathEqn = null;
const buttons = document.querySelectorAll('button');
const displayPane = document.querySelector('.display');
const outputPane =  document.querySelector('.output');
//clearCalculator();

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.id == 'addition') {
            if (display == '') {
                //do nothing
            } else {
                display += '+';
                printDisplay();
            }
        } else if (button.id == 'multiplication') {
            if (display == '') {
                //do nothing
            } else {
                display += '*';
                printDisplay();
            }
        } else if (button.id == 'subtraction') {
            if (display == '') {
                //do nothing
            } else {
                display += '-';
                printDisplay();
            }
        } else if (button.id == 'division') {
            if (display == '') {
                //do nothing
            } else {
                display += '/';
                printDisplay();
            }
        } else if (button.id == 'equals') {
            if (display == '') {
                //do nothing
            } else {
                performOperation(display);
            }
        } else if (button.id == 'clear') {
            if (display == '') {
                //do nothing
            } else {
                display = '';
                clearDisplay();
            }
        } else if (button.id == 'one') {
            display += '1';
            printDisplay();
        } else if (button.id == 'two') {
            display += '2';
            printDisplay();
        } else if (button.id == 'three') {
            display += '3';
            printDisplay();
        } else if (button.id == 'four') {
            display += '4';
            printDisplay();
        } else if (button.id == 'five') {
            display += '5';
            printDisplay();
        } else if (button.id == 'six') {
            display += '6';
            printDisplay();
        } else if (button.id == 'seven') {
            display += '7';
            printDisplay();
        } else if (button.id == 'eight') {
            display += '8';
            printDisplay();
        } else if (button.id == 'nine') {
            display += '9';
            printDisplay();
        } else if (button.id == 'zero') {
            display += '0';
            printDisplay();
        }
    })
})
/**Sidenote for intro: The reverse polish notation (RPN) visualises the way in which operations are conducted on a stack.
 * We will be using the Shunting algorithm for the performOperation, created by Edsger Dilkaasldkjhalkdjf in the 1960s.
 * It requires: 1) An array for the tokens. 2) A queue for the output (shows in RPN). 3) A stack for the operations.
 */
function performOperation(display) {
    let infixNotation = display.split('');
    //console.log(infixNotation);
    let operatorStack = [];
    //console.log(operatorStack);
    let outputQueue = [];
    //console.log(outputQueue);
    let operators = "+-/*";

    //Below's code loops through infixNotation and add the items to the operator stack or output queue
    for (let index = 0; index < infixNotation.length; index++) { 
        if (isNumber(infixNotation[index])) { //is the infixNotation a number? NEED TO MAKE IT SO IT TAKES TWO, THREE, etc. digit number (for loop)
            //console.log("I'm in");
            outputQueue.push(infixNotation[index]);
            console.log(outputQueue);
        } else if (operators.includes(infixNotation[index])) { //is the infixNotation an operator?
            //while there's an operator on the top of the stack with greater precedence:
                //pop operators from the stack onto the output queue
            console.log(infixNotation[index]);
            if (precedence(operatorStack[operatorStack.length - 1]) > precedence(infixNotation[index])) {
                for (let counter = operatorStack.length - 1; counter >= 0; counter--) {
                    outputQueue.push(operatorStack.pop()); // i think this pops all... NEED TO CHECK IF THIS ACTUALLY WORKS.
                }
            }
            operatorStack.push(infixNotation[index]);
            console.log(operatorStack);
        } else if (infixNotation[index] === '(') {
            operatorStack.push(infixNotation[index]);
        } else if (infixNotation[index] === ')') {
            for (let counter = operatorStack.length - 1; counter >= 0; counter--) {
                if (operatorStack[operatorStack.length - 1] !== '(') {
                    outputQueue.push(operatorStack.pop()); // i think this pops all...
                } else {
                    operatorStack.pop();
                }
            }
        }
    }

    //below's code checks if there are any more items in the operatorStack and queues them...
    for (let counter = operatorStack.length -1; counter >= 0; counter--) {
        outputQueue.push(operatorStack.pop());
    }

    console.log(operatorStack);
    console.log(outputQueue);

    //after all this, the outputQueue is in RPN.
    //get the first operator as you move up the queue
    //then, use that operator on the two numbers in the queue before that operator
    //as you do so, shift everything down two places
    //For this reason, as I lack the true understanding of queues I'm going to use an array for the output queue and slice/splice etc.

    /**Go up the array from 0, then check when you first encounter an operator.
     * Once you encounter an operator, use that operator on the two numbers before it.
     * To the LEFT of the operator will be the number two before that operator.
     * To the RIGHT of the operator will be the number one before that operator.*/

    /**After the operation has been evaluated, a number is produced, (tautological, but you get me).
     * The number that is evaluated will now take the space at the array index TWO below the operator.
     * The operator and numbers will taken out of the array and every item above it will be shifted down.
     * .splice() is very useful here! It is the swiss army knife of the array methods.
     * It takes a number of argsuments as it's parameters.
     * The first of which is where you want the array to start removing elements, the second is how many elements you want it to remove.
     * The REMAINDER OF THE ARGUMENT'S IT TAKES IS THE STUFF YOU WANT TO INPUT INTO THE ARRAY IN PLACE OF THOSE REMOVED ELEMENTS
     * Note: you can also remove "0" elements to add items at the specified index.
     */
    for (let counter = 0; counter < outputQueue.length; counter++) {
        if (operators.includes(outputQueue[counter])) { //checks if it's an operator
            if (outputQueue[counter] == '/') {
                let computed = Number(outputQueue[counter - 2]) / Number(outputQueue[counter - 1]);
                outputQueue.splice(counter - 2, 3, computed.toString()); //if everything in our array is a string(), keep it the same. Makes me feel safe.
            } else if (outputQueue[counter] == '*') {
                let computed = Number(outputQueue[counter - 2]) * Number(outputQueue[counter - 1]);
                outputQueue.splice(counter - 2, 3, computed.toString());
            } else if (outputQueue[counter] == '+') {
                let computed = Number(outputQueue[counter - 2]) + Number(outputQueue[counter - 1]);
                outputQueue.splice(counter - 2, 3, computed.toString());
            } else if (outputQueue[counter] == '-') {
                let computed = Number(outputQueue[counter - 2]) - Number(outputQueue[counter - 1]);
                outputQueue.splice(counter - 2, 3, computed.toString());
            }
            counter = 0; //reset the trace through the array
        }
    } //after this loop, there are no more operations to do, but just an array is left with one number in it. round it to 1 decimal place please.
    outputPane.textContent += outputQueue[0];
}

/*class Stack {
    //Count is
    constructor() {
        this.items = [];
    }

    //Add element to top of stack
    push(element) {
        this.items.push(element);
    }

    //Return and remove top element in stack
    //Return undefined if stack is empty
    pop() {
        if (this.items.length == 0) {
            return "Oops. the stack is empty!";
        }
        return this.items.pop();
    }

    //Check top element in stack
    peek() {
        return this.items[this.items.length - 1];
    }

    //Check if stack is empty
    isEmpty() {
        return this.items.length == 0;
    }

    //Check size of stack
    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }
}*/

/**class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        return this.items.shift(); //removes and returns element from beginning of array
    }

    isEmpty() {
        return this.items.length === 0;
    }

    peek() {
        if (!this.isEmpty()) {
            return this.items[0];
        }
        return null;
    }

    size() {
        return this.items.length;
    }

    print() {
        console.log(this.items.toString());
    }
}*/

function precedence(operator) {
    if (operator === "/") {
        return 3;
    } else if (operator === "*") {
        return 2;
    } else if (operator === "+") {
        return 1;
    } else if (operator === "-") {
        return 0;
  }
}

function isNumber(value) {
    if (value == "1") {
        return true;
    } else if ( value == "2") {
        return true;
    } else if (value == "3") {
        return true;
    } else if (value == "4") {
        return true;
    } else if (value == "5") {
        return true;
    } else if (value == "6") {
        return true;
    } else if (value == "7") {
        return true;
    } else if (value == "8") {
        return true;
    } else if (value == "9") {
        return true;
    } else if (value == "0") {
        return true;
    } else {
        return false;
    }
}

function clearDisplay() {
    display.textContent = "";
    printDisplay();
}

function printDisplay() {
    displayPane.textContent = display;
}

function clearCalculator() {
    displayPane.textContent = '';
    display = '';
}

function addition(a, b) { // ...args changes all the inputs into an array of elements
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a/b;
}

