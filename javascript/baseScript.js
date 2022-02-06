export {inputArea, resultArea};
import {input, clear, clearAll, result} from './functionScript.js';

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
        let button = document.createElement('button');
        row.appendChild(button);
        button.innerHTML = String(inputArray[i][j]);
        if (button.innerHTML.match(/[0-9]/)) {
            button.className = 'buttonNumber';
        } else {
            button.className = 'buttonCalculus';
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

