document.addEventListener('DOMContentLoaded', initializeApp);
function initializeApp(){
changeTheme();
clickButtonEffect();
clearAll()
}
const historyValue = document.querySelector('#history-value'),
currentValue = document.querySelector('#current-value'),
buttons = document.querySelectorAll('button'), //all buttons
buttonNumberType = document.querySelectorAll('.number'),
buttonOperatorType = document.querySelectorAll('.operator')
equalsButton = document.querySelector('#equals')
clearButton = document.querySelector('#clear');

class Calculator{
    constructor(historyValue,currentValue){
        this.historyValue = historyValue;
        this.currentValue = currentValue;
        this.clear();
    }
    clear(){
        this.history = '';
        this.current = '';
        this.operation = undefined;
    }
    delete(){
        this.current = this.current.toString().slice(0,-1);
    }
    appendNumber(number){
        if(number==='.'&&this.current.includes('.'))return;
        if(currentValue.innerText.length>14){
            return;
        }else{
            this.current  = this.current.toString()+ number.toString();
        }
    }
    choseOperation(operation){
        if(this.current===''||this.current.length===0)return;
        if(this.history!==''){
            this.compute();
        }
        this.operation = operation;
        this.history = this.current;
        this.current = '';
    }
    compute(){
        let computedResult;
        const prev = parseFloat(this.history),
        curr  = parseFloat(this.current);
        if(isNaN(prev)||isNaN(curr))return;
        switch(this.operation){
            case '+':
                computedResult = prev + curr
            break;
            case '−':
                computedResult = prev - curr
            break;
            case '÷':
                computedResult = prev / curr
            break;
            case '×':
                computedResult = prev * curr
            break;
            case '%':
                computedResult = prev % curr
            break;
            default:
            return;
        }
        this.current = computedResult;
        this.operation = undefined;
        this.history = '';
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    updateDisplay(){
        this.currentValue.innerText = this.getDisplayNumber(this.current);
        if(this.operation!=null){
            this.historyValue.innerText = `${this.getDisplayNumber(this.history)}${this.operation}`;
    }else{
        this.historyValue.innerText = '';
    }
    
}}

const calculator = new Calculator(historyValue,currentValue);
for(let i = 0;i<buttonNumberType.length;i++){
    buttonNumberType[i].addEventListener('click',()=>{
        calculator.appendNumber(buttonNumberType[i].innerText);
        calculator.updateDisplay()
    })
}
for(let i = 0;i<buttonOperatorType.length;i++){
    buttonOperatorType[i].addEventListener('click',()=>{
        calculator.choseOperation(buttonOperatorType[i].innerText);
        calculator.updateDisplay()
    })
}
equalsButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
})
clearButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
})
let mouseTimer;
function clearAll(){
clearButton.addEventListener('mousedown', mouseDown)
function mouseDown(){
     mouseUp();
     mouseTimer = window.setTimeout(execMouseDown,1000); 
}
 clearButton.addEventListener('mouseup',mouseUp)
 function mouseUp(){
    if (mouseTimer) window.clearTimeout(mouseTimer);  
}
function execMouseDown() { 
    calculator.clear();
    calculator.updateDisplay();
}}
function clickButtonEffect(){
    for(let i = 0;i<buttons.length;i++){
    buttons[i].addEventListener('mousedown',()=>{
    setTimeout(()=>{
    buttons[i].classList.add('button-focus');
    },10)})
    buttons[i].addEventListener('mouseup',()=>{
    setTimeout(()=>{
    buttons[i].classList.remove('button-focus');
    },100)})
    buttons[i].addEventListener('dbclick',()=>{
    buttons[i].classList.remove('button-focus');})
    buttons[i].addEventListener('mouseleave',()=>{
    buttons[i].classList.remove('button-focus');
    })}}    
function changeTheme(){
    const toggler = document.querySelector('.onoffswitch'); // i have no idea how this broke
    body = document.querySelector('body'),
    ouput = document.querySelector('#output'),
    changeModeDiv = document.querySelector('#change-mode'),
    gridContainer = document.querySelector('.grid-container');
    toggler.addEventListener('click',()=>{
        toggler.checked = true; 
        if(toggler.checked===true){
            setTimeout(()=>{
                historyValue.style.color = 'var( --dark-mode-secondary-text-color)';
                currentValue.style.color = 'var( --dark-mode-secondary-text-color)';
                output.style.color = 'var(--dark-mode-primary-text-color)' 
                body.style.setProperty('background','var(--dark-mode-background)');
                body.style.transition = 'all 2s';
                output.style.setProperty('background','var(--dark-mode-foreground-primary)');
                ouput.style.transition = 'all 2s';
                changeModeDiv.style.setProperty('background',' var(--dark-mode-foreground-secondary)');
                changeModeDiv.style.transition = 'all 2s';
                gridContainer.style.setProperty('background','linear-gradient(rgb(125, 125, 125),rgb(144, 144, 144))');
                gridContainer.style.transition = 'all 2s';
                for(let i = 0;i<buttons.length;i++){
                    buttons[i].style.color = 'var(--dark-mode-primary-text-color)';
                    buttons[i].addEventListener('mouseover',()=>{
                        buttons[i].style.setProperty('border-color','white');
                    })
                    buttons[i].addEventListener('mouseout',()=>{
                        buttons[i].style.removeProperty('border-color')
                    })
                }
                
            },250)  
        }else{
            setTimeout(()=>{
                historyValue.style.color = 'var( --light-mode-secondary-text-color)';
                currentValue.style.color = 'var(--light-mode-primary-text-color)' 
                body.style.setProperty('background','var(--light-mode-background)');
                body.style.transition = 'all 2s';
                output.style.setProperty('background','var(--light-mode-foreground-primary)');
                ouput.style.transition = 'all 2s';
                changeModeDiv.style.setProperty('background',' var(--light-mode-foreground-secondary)');
                changeModeDiv.style.transition = 'all 2s';
                gridContainer.style.setProperty('background','linear-gradient(rgb(241, 241, 241),rgb(249, 249, 249))');
                gridContainer.style.transition = 'all 2s';
                for(let i = 0;i<buttons.length;i++){
                    buttons[i].style.color = 'var(--light-mode-primary-text-color)';
                    buttons[i].addEventListener('mouseover',()=>{
                        buttons[i].style.setProperty('border-color','#484848');
                    })
                    buttons[i].addEventListener('mouseout',()=>{
                        buttons[i].style.removeProperty('border-color')
                    })
                }
            },250)
           
        }
    })
    }
