export {inputArea, resultArea};
import {input, clear, clearAll, result} from './functionScript.js';

let width = Math.min(screen.width, screen.height);
let height = Math.max(screen.width, screen.height);
let widthRatio = width / 500;
//alert(innerWidth + '/' + innerHeight);
if (screen.width <= 320) {
    widthRatio = widthRatio * 1.3;
    document.body.style.width = width + 'px';
    document.body.style.height = height + 'px';
    document.body.style.paddingTop = 50 + 'px';
    document.body.style.paddingBottom = 100 + 'px';
} else if (screen.width <= 400) {
    widthRatio = widthRatio * 1.1;
    document.body.style.width = width + 'px';
    document.body.style.height = screen.width + 'px';
    document.body.style.paddingBottom = 200 + 'px';
} else if (screen.width < 768) {
    document.body.style.width = width + 'px';
    //document.body.style.height = screen.height * 80 / 100 + 'px';
    document.body.style.paddingTop = 70 + 'px';
    document.body.style.paddingBottom = 120 + 'px';
} else if (screen.width < 992) {
    widthRatio = widthRatio * 0.9;
    document.body.style.width = 450 + 'px';
    document.body.style.height = screen.height * 80 / 100 + 'px';
    document.body.style.paddingTop = 50 + 'px';
    document.body.style.paddingBottom = 50 + 'px';
} else {
    widthRatio = widthRatio * 0.8;
    document.body.style.width = '450px';
    document.body.style.paddingTop = 100 + 'px';
    document.body.style.paddingBottom = 150 + 'px';
}
document.body.style.transform = `scale(${widthRatio})`;

let inputArray = [['AC', 'C', '÷', 7, 8, 9],
    ['(', ')', '×', 4, 5, 6],
    ['%', '‰', '-', 1, 2, 3],
    ['√', '^', '+', '.', 0, '=']];
let inputArea = document.getElementById('inputArea');
let resultArea = document.getElementById('resultArea');
let tableArea = document.getElementById('tableArea');

for (let i = 0; i < inputArray.length; i++) {
    let row = document.createElement('tr');
    tableArea.appendChild(row);

    for (let j = 0; j < inputArray[i].length; j++) {
        let button = document.createElement('td');
        row.appendChild(button);
        button.innerHTML = String(inputArray[i][j]);
        if (button.innerHTML.match(/[0-9]/)) {
            button.id = 'buttonNumber';
        } else {
            button.id = 'buttonCalculus';
        }

        switch (button.innerHTML) {
            default:
                button.onclick = function () {
                    input(button.innerHTML);
                };
                break;
            case 'C':
                button.onclick = clear;
                break;
            case 'AC':
                button.onclick = clearAll;
                break;
            case '=':
                button.onclick = result;
                break;
        }
    }
}

window.onkeydown = function (event) {
    inputArea.setCustomValidity('');
    event.preventDefault();
    switch (event.key) {
        case String(event.key.match(/[0-9.,+\-*/%()^√]/)):
            input(event.key);
            break;
        case 'Backspace':
            clear();
            break;
        case 'Delete':
        case 'Clear':
            clearAll();
            break;
        case 'Enter':
        case 'Return':
            result();
            break;
    }
}

