function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let operations = ['*', '/', '+', '-'];
    let exprArr = expr.split('');
    let operation;
    let operationIndex;
    let argumentLeft;
    let argumentRight;
    let operationResult;
    let match;
    let openBracket;
    let closeBracket;
    let amountOfOpenBrackets = 0;
    let amountOfCloseBrackets = 0;
    let openBracketIndex;
    let closeBracketIndex;
    let bracketArr;
    let bracketArrResult;
    
    function deleteSpaces(exprArr) {
        for (let i = 0; i < exprArr.length; i++) {
            if (exprArr[i] === ' ') {
                exprArr.splice(i, 1);
                i--;
            }
        }
    }
    function formMultiDigitNumbers (exprArr) {
        for (let i = 0; i < exprArr.length; i++) { 
            if (i > 0 && +exprArr[i].match(/[0-9]/) && +exprArr[i - 1].match(/[0-9]/)) {
                exprArr[i] = exprArr[i - 1] + exprArr[i];
                exprArr.splice(i - 1, 1);
                i--;
            } else if (i > 0 && +exprArr[i] === 0 && +exprArr[i - 1].match(/[0-9]/)) {
                exprArr[i] = exprArr[i - 1] + exprArr[i];
                exprArr.splice(i - 1, 1);
                i--;
            }
        }
    }
    function prepareInputArrayForCalculations(exprArr) {
        deleteSpaces(exprArr);
        formMultiDigitNumbers (exprArr);
    }
    function findMultiplicationOrDivision(exprArr) {
        for (let i = 0; i < exprArr.length; i++) {
            if (!match) {
                if (operations[0] === exprArr[i] || operations[1] === exprArr[i]) {
                    switch (exprArr[i]) {
                        case operations[0]:
                            operation = operations[0];
                            operationIndex = i;
                            match = true;
                            break;
                        case operations[1]:
                            operation = operations[1];
                            operationIndex = i;
                            match = true;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
    function findAdditionOrSubtraction(exprArr) {
        for (let i = 0; i < exprArr.length; i++) {
            if (!match) {
                if (operations[2] === exprArr[i] || operations[3] === exprArr[i]) {
                    switch (exprArr[i]) {
                        case operations[2]:
                            operation = operations[2];
                            operationIndex = i;
                            match = true;
                            break;
                        case operations[3]:
                            operation = operations[3];
                            operationIndex = i;
                            match = true;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
    function performDetectedOperation(exprArr) {
        argumentLeft = exprArr[operationIndex - 1];
        argumentRight = exprArr[operationIndex + 1];
        switch (operation) {
            case '*':
                operationResult = +argumentLeft * +argumentRight;
                exprArr.splice(operationIndex - 1, 3, operationResult);
                break;
            case '/':
                if (+argumentRight === 0) throw 'TypeError: Division by zero.';
                operationResult = +argumentLeft / +argumentRight;
                exprArr.splice(operationIndex - 1, 3, operationResult);
                break;
            case '+':
                operationResult = +argumentLeft + +argumentRight;
                exprArr.splice(operationIndex - 1, 3, operationResult);
                break;
            case '-':
                operationResult = +argumentLeft - +argumentRight;
                exprArr.splice(operationIndex - 1, 3, operationResult);
                break;
            default:
                break;
        }
    }
    function performSingleOperation(exprArr) {
        match = 0;
        argumentLeft = 0;
        argumentLeft = 0;
        operation = 0;
        operationIndex = 0;
        
        findMultiplicationOrDivision(exprArr);
        findAdditionOrSubtraction(exprArr);
        performDetectedOperation(exprArr);

        return exprArr[0];
    }
    function checkBracketsPairs() {
        for (let i = 0; i < exprArr.length; i++) {
            if (exprArr[i] === '(') amountOfOpenBrackets++;
            if (exprArr[i] === ')') amountOfCloseBrackets++;
        }
        if (amountOfOpenBrackets !== amountOfCloseBrackets) throw 'ExpressionError: Brackets must be paired';
    }
    function resolveBrackets(exprArr) {
        for (let i = 0; i <= exprArr.length; i++) {
            if (openBracket === 1 && closeBracket === 1) {
                bracketArr = exprArr.slice(openBracketIndex + 1, closeBracketIndex);
                while (bracketArr.includes('*') || bracketArr.includes('/') || bracketArr.includes('+') || bracketArr.includes('-')) {
                    bracketArrResult = performSingleOperation(bracketArr);
                }
                exprArr.splice(openBracketIndex, closeBracketIndex - openBracketIndex + 1, bracketArrResult);
                openBracket = 0;
                closeBracket = 0;
                resolveBrackets(exprArr);
            } else if (exprArr[i] === '(') {
                openBracket = 1;
                openBracketIndex = i;
                closeBracket = 0;
            } else if (exprArr[i] === ')') {
                closeBracket = 1;
                closeBracketIndex = i;
            }
        }
    }

    prepareInputArrayForCalculations(exprArr);
    checkBracketsPairs();
    resolveBrackets(exprArr);
    
    while (exprArr.includes('*') || exprArr.includes('/') || exprArr.includes('+') || exprArr.includes('-')) {
        performSingleOperation(exprArr);
    }
    
    return exprArr[0];
}

module.exports = {
    expressionCalculator
}