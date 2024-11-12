// Initialize the display element
const display = document.getElementById("display") as HTMLInputElement;

const buttonGroups = {
    controlButtons: ["backspaceBtn", "clearLastBtn", "clearAllBtn", "equalsBtn"],
    functionButtons: ["functionT", "functionB", "functionM", "functionK"],
    numberButtons: ["number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9"],
    operatorButtons: ["openParenBtn", "closeParenBtn", "multiplyBtn", "divideBtn", "subtractBtn", "addBtn", "decimalBtn"]
};

let awaitingInput = true; // Flag to track if we are awaiting a new input after pressing "="

export function appendNumber(number: string) {
    display.value = awaitingInput ? number : (display.value === "0" ? number : display.value + number);
    awaitingInput = false;
}

export function appendFunction(letter: string) {
    display.value += letter;
    awaitingInput = false;
}

export function setOperation(operation: string) {
    const operatorRegex = /[+\-*/]/;
    const trimmedValue = display.value.trim();

    if (awaitingInput && operation === ".") display.value = "0"; // Reset on decimal
    awaitingInput = false;

    if (operatorRegex.test(trimmedValue.charAt(trimmedValue.length - 1))) {
        display.value = trimmedValue.slice(0, -1) + operation + " ";
    } else if (trimmedValue.length > 0) {
        display.value += `${operation !== "." ? " " : ""}${operation}${operation !== "." ? " " : ""}`;
    }
}

export function backspace() {
    display.value = display.value.slice(0, -1) || "0";
    awaitingInput = display.value === "0" ? false : awaitingInput;
}

export function clearLast() {
    display.value = display.value.trim().split(" ").slice(0, -1).join(" ") || "0";
    awaitingInput = false;
}

export function clearAll() {
    display.value = "0";
    awaitingInput = false;
}

export function calculate() {
    try {
        // Remove commas from the input
        display.value = display.value.replace(/,/g, "");

        // Replace K, M, B, T with their corresponding numbers
        display.value = display.value.replace(/(\d+(\.\d+)?)([KMBT])/gi, (match, num, decimal, suffix) => {
            const multipliers = { K: 1000, M: 1000000, B: 1000000000, T: 1000000000000 };
            return (parseFloat(num) * multipliers[suffix.toUpperCase()]).toString();
        });

        if (display.value.includes("(")) {
            display.value = display.value.replace(/(\d|\))\s*\(/g, "$1*("); // Handle implicit multiplication
        }

        let result = eval(display.value).toString();
        const numberResult = parseFloat(result);
        result = !isNaN(numberResult) ? formatLargeNumber(numberResult) : result;

        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
    awaitingInput = true; // Await new input after "="
}

function formatLargeNumber(number: number): string {
    const suffixes = ["K", "M", "B", "T"];
    const thresholds = [1e3, 1e6, 1e9, 1e12];

    for (let i = thresholds.length - 1; i >= 0; i--) {
        if (number >= thresholds[i]) {
            const testResult = (number / thresholds[i]).toLocaleString();
            return !testResult.includes(".") || (testResult.includes(".") && (testResult.length - 1 - testResult.indexOf(".")) <= 2)
                ? testResult + suffixes[i]
                : number.toLocaleString();
        }
    }
    return number.toLocaleString();
}

// Set up button listeners for various actions
export function setupButtonListeners() {
    const buttonActions = {
        backspaceBtn: backspace,
        clearLastBtn: clearLast,
        clearAllBtn: clearAll,
        equalsBtn: calculate
    };

    Object.keys(buttonActions).forEach(id => {
        const button = document.getElementById(id) as HTMLButtonElement;
        button?.addEventListener("click", buttonActions[id]);
    });

    buttonGroups.functionButtons.forEach(id => {
        document.getElementById(id)?.addEventListener("click", () => appendFunction(id.charAt(id.length - 1)));
    });

    buttonGroups.numberButtons.forEach(id => {
        document.getElementById(id)?.addEventListener("click", () => appendNumber(id.charAt(id.length - 1)));
    });

    buttonGroups.operatorButtons.forEach(id => {
        const operatorMap: { [key: string]: string } = {
            openParenBtn: "(", closeParenBtn: ")", multiplyBtn: "*", divideBtn: "/",
            subtractBtn: "-", addBtn: "+", decimalBtn: "."
        };
        document.getElementById(id)?.addEventListener("click", () => setOperation(operatorMap[id]));
    });
}

// Add Keyboard support for controlling calculator
export function setupKeyboardSupport() {
    const calculatorElement = document.getElementById("calculator");
    if (calculatorElement) {
        calculatorElement.addEventListener("focusin", () => document.getElementById("status").style.backgroundColor = "#00F00035");
        calculatorElement.addEventListener("focusout", () => document.getElementById("status").style.backgroundColor = "#F0000035");
        calculatorElement.addEventListener("click", () => calculatorElement.focus());

        calculatorElement.addEventListener("keydown", (event) => {
            if (!calculatorElement.contains(document.activeElement)) return;

            const key = event.key;
            if (key >= '0' && key <= '9') appendNumber(key);
            else if (key === '.') setOperation('.');
            else if (key === '+' || key === '-' || key === '*' || key === '/') setOperation(key);
            else if ('KMBT'.includes(key.toUpperCase())) appendFunction(key.toUpperCase());
            else if (key === 'Enter') calculate();
            else if (key === 'Backspace') backspace();
            else if (key === 'Delete') clearLast();
            else if (key === 'Escape') clearAll();
        });
    }
}

// Add right-click menu for copy and paste
export function setupRightClickMenu() {
    const displayElement = document.getElementById("calculator") as HTMLInputElement;

    // Create custom context menu
    const contextMenu = document.createElement('ul');
    contextMenu.className = 'context-menu nis';
    contextMenu.style.position = 'absolute';
    contextMenu.style.display = 'none';
    contextMenu.style.backgroundColor = '#fff';
    contextMenu.style.border = '1px solid #ccc';
    contextMenu.style.padding = '0px';
    contextMenu.style.listStyle = 'none';
    contextMenu.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    document.body.appendChild(contextMenu);

    // Add "Copy" and "Paste" options
    const copyOption = document.createElement('li');
    copyOption.className = 'nistext';
    copyOption.textContent = 'Copy (Ctrl+C)';
    copyOption.style.padding = '0px 15px';
    copyOption.style.cursor = 'pointer';
    copyOption.addEventListener('click', async () => {
        await simulateCopy();
        closeContextMenu();
        document.getElementById("calculator").focus();
    });
    contextMenu.appendChild(copyOption);

    const pasteOption = document.createElement('li');
    pasteOption.className = 'nistext';
    pasteOption.textContent = 'Paste (Ctrl+V)';
    pasteOption.title = 'Use Ctrl+V instead as this won\'t work';
    pasteOption.style.padding = '0px 15px';
    pasteOption.style.cursor = 'pointer';
    pasteOption.addEventListener('click', async () => {
        //await simulatePaste();
        closeContextMenu();
        document.getElementById("calculator").focus();
    });
    contextMenu.appendChild(pasteOption);

    // Show custom context menu on right-click
    displayElement.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        contextMenu.style.left = `${event.pageX}px`;
        contextMenu.style.top = `${event.pageY}px`;
        contextMenu.style.display = 'block';
    });

    // Hide context menu when clicking elsewhere
    document.addEventListener('click', (event) => {
        if (!contextMenu.contains(event.target as Node)) {
            closeContextMenu();
        }
    });

    // Function to hide the context menu
    function closeContextMenu() {
        contextMenu.style.display = 'none';
    }
}

// Setup for copy and paste support
export function setupClipboardSupport() {
    setupRightClickMenu(); // Set up right-click menu
    const calculatorElement = document.getElementById("calculator");

    if (calculatorElement) {
        calculatorElement.addEventListener("keydown", async (event) => {
            if (!calculatorElement.contains(document.activeElement)) return;
            const key = event.key;
            if (event.ctrlKey) {
                if (key === 'c') await simulateCopy();
                else if (key === 'v') await simulatePaste();
            }
        });
    }
}

async function simulateCopy() {
    const displayValue = display.value;
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(displayValue);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    } else {
        const textarea = document.createElement('textarea');
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.value = displayValue;
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        document.getElementById("calculator").focus();
    }
}

async function simulatePaste() {
    if (navigator.clipboard) {
        try {
            const clipboardText = await navigator.clipboard.readText();
            appendClipboardData(clipboardText);
        } catch (error) {
            console.error('Failed to read clipboard content:', error);
        }
    } else {
        // Use fallback
        const clipboardText = document.createElement('textarea');
        clipboardText.style.opacity = '0';
        document.body.appendChild(clipboardText);
        clipboardText.focus();
        document.execCommand('paste');

        setTimeout(() => {
            const pastedData = clipboardText.value;
            document.body.removeChild(clipboardText);
            appendClipboardData(pastedData);
            document.getElementById("calculator").focus();
        }, 10);
    }
}

function appendClipboardData(clipboardText: string) {
    if (awaitingInput) {
        // If awaiting input (after pressing "="), clear display and insert clipboard data
        display.value = clipboardText;
        awaitingInput = false;
    } else {
        // Append clipboard data to the current display value
        if (display.value === "0") display.value = clipboardText;
        else display.value += clipboardText;
    }
}