export {inputArea, resultArea};
import {input, clear, clearAll, result} from './functionScript.js';

if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
    let width = Math.min(screen.width, screen.height);
    let height = Math.max(screen.width, screen.height);
    let widthRatio = width / 450;
    let heightRatio = height / 850;
    alert(screen.width + '/' + screen.height + ','
        + outerWidth + '/' + outerHeight);

    if (width < 450) {
        widthRatio = width < 360
            ? widthRatio * 1.2
            : widthRatio
        document.body.style.width = width + 'px';
        document.body.style.height = height + 'px';
        document.body.style.paddingBottom = 150 * heightRatio + 'px';
    } else {
        widthRatio = widthRatio * 0.85;
        document.body.style.width = '450px';
        document.body.style.height = height + 'px';
        //document.body.style.paddingTop = 100 * heightRatio + 'px';
    }
    document.body.style.transform = `scale(${widthRatio})`;

} else {
    document.body.style.width = '450px';
    document.body.style.height = innerHeight + 'px';
    document.body.style.paddingBottom = '200px';
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

