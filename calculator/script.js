class Calculator{
    //constructor
    constructor(previousOperandTextElement, currentOperandTextElement){ 
        this.computed = false       // added: for clearing after computation
        this.previousOperandTextElement = previousOperandTextElement    // member var declarations, by constructor parameter
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()              // clear screen
    }

    clear(){
        // sets both operands to '', and reset operation
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){     
        if(this.computed == true){
            this.clear()
            this.computed = false
        }

        if (number == '.' && this.currentOperand.includes('.')) return  //prevent multiple period
        this.currentOperand = this.currentOperand.toString() + number.toString()    // append the parameter to existing currOperand
    }

    chooseOperation(operation){
        //add a checking
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }

        this.operation = operation  //save operand
        this.previousOperand = this.currentOperand  // save to prev operand
        this.currentOperand = ''    // clear out curr operand
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)   //conversion to a floating point number
        const curr = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr)) return   // 'Not_A_Number'
        switch(this.operation){
            case '+':
                computation = prev + curr
                break;
            case '-':
                computation = prev - curr
                break;
            case '*':
                computation = prev * curr
                break;
            case '%':
                computation = prev / curr
                break;
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        this.computed = true
    }

    getDisplayNumber(number){
            // convert to string
        const stringNumber = number.toString()

            //parse to '***.' and '.***'
        const intDigits = parseFloat(stringNumber.split('.')[0])
        const decDigits = stringNumber.split('.')[1]
        let integerDisplay

        if(isNaN(intDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = intDigits.toLocaleString('en',     // for ',' every 1000
            {maximumFractionDigits: 0})
        }

        if(decDigits != null){
            return `${integerDisplay}.${decDigits}`
        }else{
            return integerDisplay
        }
        /*  >>simple implementation. hasFlaw
        const floatNumber = parseFloat(number)  //convert to float
        if(isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en') */
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = ''
        }
        
    }
}

/* 'document.querySelector' returns the first matching selector in the document */
/* 'document.querySelectorAll' returns the nodeList of matching selectors in the document */
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const acButton = document.querySelector('[data-ac]')
const previousOperandTextElement = document.querySelector('[data-prev-operand]')
const currentOperandTextElement = document.querySelector('[data-curr-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) //declare an instance

/* addEventlistener('type', 'listener') */
numberButtons.forEach(button => {                   // for all number buttons
    button.addEventListener('click', () => {        // catch event 'click'
        calculator.appendNumber(button.innerText)   // action: appendNumber the text inside the button
        calculator.updateDisplay()                  //       : update display
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()  //update everytime the button is clicked
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

acButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})