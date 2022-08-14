class Calculator{
    //constructor
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number == '.' && this.currentOperand.includes('.')) return  //prevent multiple period
        this.currentOperand = this.currentOperand.toString().toString() + number.toString()
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
        const prev = parseFloat(this.previousOperand)
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
            integerDisplay = intDigits.toLocaleString('en', 
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

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const acButton = document.querySelector('[data-ac]')
const previousOperandTextElement = document.querySelector('[data-prev-operand]')
const currentOperandTextElement = document.querySelector('[data-curr-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) //define a class

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()  //update everytime the button is clicked
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()  //update everytime the button is clicked
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

acButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})