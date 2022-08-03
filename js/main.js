'use strict';
//Variables
const displayHistory = document.querySelector(".display__history");
const displayResult = document.querySelector(".display__result");
const numberBtn = document.querySelectorAll(".btn__numbers");
const operatorBtn = document.querySelectorAll(".btn__operator");
const deleteBtn = document.querySelector(".btn__delete");
const equalsBtn = document.querySelector(".btn__equals");
const clearAll = document.querySelector(".btn__clearall")
const clearLast = document.querySelector(".btn__clearlast")

//Initial Variables for storing output
let dis1 = "";
let dis2 = "";
let result = null;
let prevOperation = "";
let putDecimal = false;

//Number Buttons
numberBtn.forEach(number => {
    number.addEventListener("click", (e) => {
        if (e.target.value === "." && !putDecimal) { //check if there is a decimal point already. If none, you can put decimal point.
            putDecimal = true;
        }else if (e.target.value === "." && putDecimal) { //check if there is a decimal point already. If there is, you cannot put decimal point.
            return;
        }
        dis2 += e.target.value;
        displayResult.innerText = dis2;

    });
});

//Operator Buttons
operatorBtn.forEach(operator => {
    operator.addEventListener("click", (e) => {
        if (!dis2) return;
        putDecimal = false;

        const operatorSign = e.target.value;

        if (dis1 && dis2 && prevOperation) {
            doCalculate();
        }else {
            result = parseFloat(dis2);
        }
        moveToHistory(operatorSign); //Will trigger when an operator was clicked
        prevOperation = operatorSign;
        
    });
});

//Will move the output to history
const moveToHistory = (sign = "") => {
    dis1 += dis2 + " " + sign + " ";
    displayHistory.innerText = dis1;
    displayResult.innerText = "";
    dis2 = "";
};


//Operation function
const doCalculate = () => {
    if (prevOperation === "/") {
        result = parseFloat(result) / parseFloat(dis2);
    }else if (prevOperation === "x") {
        result = parseFloat(result) * parseFloat(dis2);
    }else if (prevOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2);
    }else if (prevOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2);
    }else if (prevOperation === "%") {
        result = parseFloat(result) % parseFloat(dis2);
    }
};


//Outputting Result
equalsBtn.addEventListener("click", () => {
    if (!dis2 || !dis1) return;
    putDecimal = false;
    doCalculate();
    moveToHistory();
    displayResult.innerText = result;
    dis2 = result;
    dis1 = "";
});

//Clear all outputs
clearAll.addEventListener("click", () => {
    dis1 = "";
    dis2 = "";
    displayHistory.innerText = "0";
    displayResult.innerText = "0";
    result = "";
});

//Will only clear output in result
clearLast.addEventListener("click", () => {
    displayResult.innerText = "0";
    dis2 = "";
  });

//Delete numbers
  deleteBtn.addEventListener("click", () => {
    displayResult.innerText = displayResult.innerText.slice(0, -1);
    dis2 = displayResult.innerText;
  })
