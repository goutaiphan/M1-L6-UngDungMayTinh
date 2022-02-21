export {input, clear, clearAll, result};
import {inputArea, resultArea} from './baseScript.js';

function input(key) {
    inputArea.value += key.replace('×', '*')
        .replace('÷', '/')
        .replace('√', '√(')
        .replace('^', '^(');
    resultArea.innerHTML = '';
}

function clear() {
    inputArea.value = inputArea.value.slice(0, -1);
    resultArea.innerHTML = '';
}

function clearAll() {
    inputArea.value = '';
    resultArea.innerHTML = '';
}

function result() {
    let formatValue = format(inputArea.value);
    inputArea.value = formatValue.replaceAll('Math.sqrt(', '√\(');

    try {
        let result = eval(formatValue);
        if (formatValue.includes('^')) {
            let caretAmount = (formatValue.match(/\^/g)).length;
            let powers = formatValue.split('^');
            if (caretAmount >= 2) {
                inputArea.setCustomValidity('Biểu thức chỉ thực hiện 1 phép lũy thừa.');
                inputArea.reportValidity();
            } else {
                resultArea.innerHTML = String(Math.pow(eval(powers[0]), eval(powers[1])));
            }
        } else if (typeof (result) === 'number') {
            resultArea.innerHTML = String(result);
        } else {
            inputArea.setCustomValidity('Biểu thức không hợp lệ.');
            inputArea.reportValidity();
        }
    } catch {
        inputArea.setCustomValidity('Biểu thức không hợp lệ.');
        inputArea.reportValidity();
    }
}

function format(inputValue) {
    let reMinus = inputValue.match(/(-)+/);
    if (reMinus !== null) {
        for (let i = 0; i < reMinus.length; i++) {
            inputValue = reMinus[i].length % 2 === 0
                ? inputValue.replace(reMinus[i], '+')
                : inputValue.replace(reMinus[i], '-');
        }
    }
    return inputValue.replaceAll('%', '/100')
        .replaceAll('‰', '/1000')
        .replaceAll('√\(', 'Math.sqrt(')
        .replaceAll(',', '.')
        .replace(/(\+)+/g, '+')
        .replace(/(\*)+/g, '*')
        .replace(/(\/)+/g, '/')
        .replace(/(\.)+/g, '.');
}

