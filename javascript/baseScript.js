export {inputArea, resultArea};
import {input, clear, clearAll, result} from './functionScript.js';

let width = Math.min(innerWidth, innerHeight);
//let height = Math.max(innerWidth, innerHeight);
let widthRatio = width <= 500
    ? width / 500 * 1.1
    : 1.3;

alert(widthRatio);

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.style.transform = `scale(${widthRatio})`;
    document.body.style.width = 450 * widthRatio + 'px';
    document.body.style.height = innerHeight + 'px';
    document.body.style.paddingBottom = 200 + 'px';
} else {
    document.body.style.width = '450px';
    document.body.style.paddingBottom = 200 + 'px';
}

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

