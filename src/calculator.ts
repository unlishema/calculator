// Initialize the display element
const display = document.getElementById("display") as HTMLInputElement;

const MAX_VALUE = 9.999999999999998e+27;

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
        // Get the locale-specific decimal separator
        const decimalSeparator = getDecimalSeparator();
        const thousandsSeparator = getThousandsSeparator();

        // Remove thousands separators (if using commas or periods as thousands separator)
        display.value = display.value.replace(new RegExp(`\\${thousandsSeparator}`, 'g'), ''); // Remove thousands separator

        // Replace decimal separator with a dot for eval (for consistency with JS parsing)
        display.value = display.value.replace(new RegExp(`\\${decimalSeparator}`, 'g'), '.'); // Replace the locale decimal with a dot for eval

        // Replace K, M, B, T with their corresponding numbers
        display.value = display.value.replace(/(\d+(\.\d+)?)([KMBT])/gi, (match, num, decimal, suffix) => {
            const multipliers = { K: 1000, M: 1000000, B: 1000000000, T: 1000000000000 };
            return (parseFloat(num) * multipliers[suffix.toUpperCase()]).toString();
        });

        // Handle implicit multiplication if parentheses are present
        display.value = display.value.replace(/(\d|\))\s*\(/g, "$1*("); // Multiplication implied by parentheses

        // Handle cases where the input might have invalid operations like leading zeros
        display.value = display.value.replace(/(\+|\-|\*|\/)(\d+)/g, '$1$2'); // Ensures valid operator spacing

        // Evaluate the expression after replacements
        let result = eval(display.value).toString();

        // Check if the result exceeds the max value
        if (parseFloat(result) > MAX_VALUE) {
            result = MAX_VALUE.toString();
            const successMessage = document.getElementById('successMessage') as HTMLDivElement;
            showSuccessMessage(successMessage, "Max value exceeded!");
            console.log(`Max value exceeded, setting to: ${MAX_VALUE}`);
        }

        // Format the result if it's a valid number
        const numberResult = parseFloat(result);
        result = !isNaN(numberResult) ? formatLargeNumber(numberResult) : result;

        // Set the display value to the result
        display.value = result;
    } catch (error) {
        display.value = "Error"; // In case of an error, show error
    }

    awaitingInput = true; // Await new input after "="
}

function formatLargeNumber(number: number): string {
    const suffixes = ["K", "M", "B", "T"];
    const thresholds = [1e3, 1e6, 1e9, 1e12];

    for (let i = thresholds.length - 1; i >= 0; i--) {
        if (number >= thresholds[i]) {
            const testResult = `${(number / thresholds[i])}`;
            return !testResult.includes(".") || (testResult.includes(".") && (testResult.length - 1 - testResult.indexOf(".")) <= 2)
                ? parseFloat(testResult).toLocaleString() + suffixes[i]
                : number.toLocaleString();
        }
    }
    return number.toLocaleString();
}

// Function to get the current locale's decimal separator
function getDecimalSeparator() {
    const testNumber = 1.1;
    return testNumber.toLocaleString().charAt(1); // Extracts the decimal separator
}

// Function to get the current locale's thousands separator
function getThousandsSeparator(): string {
    // Create a number formatted with commas or periods based on the locale
    const number = 1000;
    const formattedNumber = number.toLocaleString();

    // Check if the formatted number contains a comma or period
    // If the number contains a comma or period, we assume that's the thousands separator
    if (formattedNumber.includes(',')) {
        return ',';
    } else if (formattedNumber.includes('.')) {
        return '.';
    } else if (formattedNumber.includes(' ')) {
        return ' ';
    } else {
        return ''; // Return empty if no specific separator is found (edge cases)
    }
}


// Function to update the decimal button based on locale
function updateDecimalButton() {
    const decimalButton = document.getElementById("decimalBtn");
    const decimalSeparator = getDecimalSeparator();
    decimalButton.textContent = decimalSeparator; // Set the text of the button to the correct separator
}

// Set up button listeners for various actions
export function setupButtonListeners() {
    // Update the decimal button based on locale before adding event listeners
    updateDecimalButton();

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

    // Update the operatorMap to use the locale-specific decimal separator
    const decimalSeparator = getDecimalSeparator();
    const operatorMap: { [key: string]: string } = {
        openParenBtn: "(", closeParenBtn: ")", multiplyBtn: "*", divideBtn: "/",
        subtractBtn: "-", addBtn: "+", decimalBtn: decimalSeparator // Use the locale-specific separator
    };

    buttonGroups.operatorButtons.forEach(id => {
        document.getElementById(id)?.addEventListener("click", () => setOperation(operatorMap[id]));
    });
}


// Add Keyboard support for controlling calculator
export function setupKeyboardSupport() {
    const calculatorElement = document.getElementById("calculator");
    if (calculatorElement) {
        calculatorElement.addEventListener("focusin", () => document.getElementById("status").style.backgroundColor = "#00F00055");
        calculatorElement.addEventListener("focusout", () => document.getElementById("status").style.backgroundColor = "#F0000055");
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
    const contextMenu = document.getElementById("contextMenu") as HTMLUListElement;
    const copyOption = document.getElementById("copyOption") as HTMLLIElement;
    const pasteOption = document.getElementById("pasteOption") as HTMLLIElement;

    copyOption.addEventListener('click', async () => {
        await simulateCopy();
        closeContextMenu();
        document.getElementById("calculator")?.focus();
    });

    pasteOption.addEventListener('click', async () => {
        await simulatePaste();
        closeContextMenu();
        document.getElementById("calculator")?.focus();
    });

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
    const calculatorElement = document.getElementById("calculator");

    if (calculatorElement) {
        calculatorElement.addEventListener("keydown", async (event) => {
            if (!calculatorElement.contains(document.activeElement)) return;

            if (event.ctrlKey && event.key === "c") {
                await simulateCopy();
            } else if (event.ctrlKey && event.key === "v") {
                await simulatePaste();
            }
        });
    }
}

// Simulation of copy operation with fallback
async function simulateCopy() {
    const successMessage = document.getElementById('successMessage') as HTMLDivElement;

    const displayValue = display.value;
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(displayValue);
            console.log("Successfully copied to clipboard");
            showSuccessMessage(successMessage, await navigator.clipboard.readText() === displayValue ? "Copied!" : "Copy Failed!");
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    } else {
        const textarea = document.createElement('textarea');
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.value = displayValue;
        textarea.select();
        try {
            document.execCommand('copy');
            showSuccessMessage(successMessage, textarea.value !== "" ? "Copied!" : "Copy Failed!");
            document.body.removeChild(textarea);
            document.getElementById("calculator").focus();
            console.log("Fallback: Successfully copied to clipboard");
        } catch (error) {
            console.error("Fallback: Failed to copy text", error);
        }
    }
}

// Simulation of paste operation with fallback
async function simulatePaste() {
    const successMessage = document.getElementById('successMessage') as HTMLDivElement;

    if (navigator.clipboard) {
        try {
            const text = await navigator.clipboard.readText();
            const success = appendClipboardData(text);
            showSuccessMessage(successMessage, success ? "Pasted!" : "Paste Failed!");
            console.log("Successfully pasted from clipboard");
        } catch (error) {
            console.error("Failed to paste text", error);
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
            const success = appendClipboardData(pastedData);
            document.getElementById("calculator").focus();
            showSuccessMessage(successMessage, success ? "Pasted!" : "Paste Failed!");
            console.log("Fallback: Successfully pasted from clipboard");
        }, 10);
    }
}

// Show success message on copy or paste
function showSuccessMessage(successMessage: HTMLDivElement, text: string) {
    successMessage.innerHTML = text;
    successMessage.style.display = 'block';
    setTimeout(() => { successMessage.style.opacity = '1'; }, 10);
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => { successMessage.style.display = 'none'; }, 300);
    }, 2000);
}

// Add paste data as needed
function appendClipboardData(clipboardText: string): boolean {
    if (clipboardText === "") return false;

    // Regex to allow numbers, operators, commas, dots, and specific letters
    const allowedPattern = /^[0-9+\-*/.,()KMBT\s]*$/;
    if (!allowedPattern.test(clipboardText)) {
        console.log("Invalid clipboard text");
        return false;
    }

    // If awaiting input (after pressing "="), clear display and insert clipboard data
    if (awaitingInput) {
        display.value = clipboardText;
        awaitingInput = false;
        return true;
    } else {
        // Append clipboard data to the current display value
        if (display.value === "0") display.value = clipboardText;
        else display.value += clipboardText;
        return true;
    }
}
