const inputValue = document.querySelector(".display");

document.querySelectorAll(".numbers").forEach(item => {
    item.addEventListener("click", handleNumberClick);
});

document.querySelectorAll(".operations").forEach(item => {
    item.addEventListener("click", handleOperationClick);
});


function handleNumberClick(e) {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    if (inputValue.innerText === "NaN" || inputValue.innerText === "Cannot divide by zero") {
        inputValue.innerText = "";
    }

    if (inputValue.innerText === "0") {
        inputValue.innerText = "";
    }

    inputValue.innerText += e.target.innerHTML.trim();
}


function handleOperationClick(e) {
    const operation = e.target.innerHTML.trim();

    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    switch (operation) {
        case "=":
            evaluateExpression();
            break;
        case "AC":
            clearDisplay();
            break;
        case "DEL":
            deleteLastCharacter();
            break;
        default:
            const lastChar = inputValue.innerText.slice(-1);
            if (!isNaN(lastChar) || lastChar === "." || lastChar === ")") {
                inputValue.innerText += operation;
            }
    }
}


function evaluateExpression() {
    try {
        if (inputValue.innerText.includes('÷0')) {
            throw new Error("Cannot divide by zero");
        }

        let result = eval(inputValue.innerText);

        if (Math.abs(result) > 1e12 || Math.abs(result) < 1e-12) {
            result = result.toExponential();
        }
        if (result === "0e+0") {
            result = 0;
        }
        inputValue.innerText = result;
        inputValue.style.color = "var(--display-font-color)";
    } catch (error) {
        if (error.message === "Cannot divide by zero") {
            inputValue.innerText = "Cannot divide by zero";
            inputValue.style.color = "orangered";
        } else {
            inputValue.innerText = "0";
        }
    }
}


function clearDisplay() {
    inputValue.innerText = "0";
    inputValue.style.color = "var(--text-color)";
}


function deleteLastCharacter() {
    inputValue.innerText = inputValue.innerText.slice(0, -1);
    if (inputValue.innerText.length === 0) {
        inputValue.innerText = "0";
        inputValue.style.color = "var(--text-color)";
    }
}

const theme = localStorage.getItem("theme");
const themeToggleBtn = document.querySelector(".theme-toggle");

if (theme) {
    document.body.classList.add(theme);
    if (theme === "light-mode") {
        themeToggleBtn.classList.remove("fa-moon");
        themeToggleBtn.classList.add("fa-sun");
    }
}

function handleThemeToggle() {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light-mode");
        themeToggleBtn.classList.remove("fa-moon");
        themeToggleBtn.classList.add("fa-sun");
    } else {
        localStorage.removeItem("theme");
        themeToggleBtn.classList.remove("fa-sun");
        themeToggleBtn.classList.add("fa-moon");
    }
}

themeToggleBtn.addEventListener("click", handleThemeToggle);