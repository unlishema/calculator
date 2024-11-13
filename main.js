(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Calc"] = factory();
	else
		root["Calc"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./calculator.ts":
/*!***********************!*\
  !*** ./calculator.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appendFunction: () => (/* binding */ appendFunction),
/* harmony export */   appendNumber: () => (/* binding */ appendNumber),
/* harmony export */   backspace: () => (/* binding */ backspace),
/* harmony export */   calculate: () => (/* binding */ calculate),
/* harmony export */   clearAll: () => (/* binding */ clearAll),
/* harmony export */   clearLast: () => (/* binding */ clearLast),
/* harmony export */   setOperation: () => (/* binding */ setOperation),
/* harmony export */   setupButtonListeners: () => (/* binding */ setupButtonListeners),
/* harmony export */   setupClipboardSupport: () => (/* binding */ setupClipboardSupport),
/* harmony export */   setupKeyboardSupport: () => (/* binding */ setupKeyboardSupport),
/* harmony export */   setupRightClickMenu: () => (/* binding */ setupRightClickMenu)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Initialize the display element
var display = document.getElementById("display");
var MAX_VALUE = 9.999999999999998e+27;
var buttonGroups = {
    controlButtons: ["backspaceBtn", "clearLastBtn", "clearAllBtn", "equalsBtn"],
    functionButtons: ["functionT", "functionB", "functionM", "functionK"],
    numberButtons: ["number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9"],
    operatorButtons: ["openParenBtn", "closeParenBtn", "multiplyBtn", "divideBtn", "subtractBtn", "addBtn", "decimalBtn"]
};
var awaitingInput = true; // Flag to track if we are awaiting a new input after pressing "="
function appendNumber(number) {
    display.value = awaitingInput ? number : (display.value === "0" ? number : display.value + number);
    awaitingInput = false;
}
function appendFunction(letter) {
    display.value += letter;
    awaitingInput = false;
}
function setOperation(operation) {
    // Get the locale-specific decimal separator
    var decimalSeparator = getDecimalSeparator();
    var operatorRegex = /[+\-*/]/;
    var trimmedValue = display.value.trim();
    if (awaitingInput && operation === decimalSeparator)
        display.value = "0"; // Reset on decimal
    awaitingInput = false;
    if (operatorRegex.test(trimmedValue.charAt(trimmedValue.length - 1))) {
        display.value = trimmedValue.slice(0, -1) + operation + " ";
    }
    else if (trimmedValue.length > 0) {
        display.value += "".concat(operation);
    }
}
function backspace() {
    display.value = display.value.slice(0, -1) || "0";
    awaitingInput = display.value === "0" ? false : awaitingInput;
}
function clearLast() {
    display.value = display.value.trim().split(" ").slice(0, -1).join(" ") || "0";
    awaitingInput = false;
}
function clearAll() {
    display.value = "0";
    awaitingInput = false;
}
function calculate() {
    try {
        // Get the locale-specific decimal separator
        var decimalSeparator = getDecimalSeparator();
        var thousandsSeparator = getThousandsSeparator();
        // Remove thousands separators (if using commas or periods as thousands separator)
        display.value = display.value.replace(new RegExp("\\".concat(thousandsSeparator), 'g'), ''); // Remove thousands separator
        // Replace decimal separator with a dot for eval (for consistency with JS parsing)
        display.value = display.value.replace(new RegExp("\\".concat(decimalSeparator), 'g'), '.'); // Replace the locale decimal with a dot for eval
        // Replace K, M, B, T with their corresponding numbers
        display.value = display.value.replace(/(\d+(\.\d+)?)([KMBT])/gi, function (match, num, decimal, suffix) {
            var multipliers = { K: 1000, M: 1000000, B: 1000000000, T: 1000000000000 };
            return (parseFloat(num) * multipliers[suffix.toUpperCase()]).toString();
        });
        // Handle implicit multiplication if parentheses are present
        display.value = display.value.replace(/(\d|\))\s*\(/g, "$1*("); // Multiplication implied by parentheses
        // Handle cases where the input might have invalid operations like leading zeros
        display.value = display.value.replace(/(\+|\-|\*|\/)(\d+)/g, '$1$2'); // Ensures valid operator spacing
        // Evaluate the expression after replacements
        var result = eval(display.value).toString();
        // Check if the result exceeds the max value
        if (parseFloat(result) > MAX_VALUE) {
            result = MAX_VALUE.toString();
            var successMessage = document.getElementById('successMessage');
            showSuccessMessage(successMessage, "Max value exceeded!");
            console.log("Max value exceeded, setting to: ".concat(MAX_VALUE));
        }
        // Format the result if it's a valid number
        var numberResult = parseFloat(result);
        result = !isNaN(numberResult) ? formatLargeNumber(numberResult) : result;
        // Set the display value to the result
        display.value = result;
    }
    catch (error) {
        display.value = "Error"; // In case of an error, show error
    }
    awaitingInput = true; // Await new input after "="
}
function formatLargeNumber(number) {
    var suffixes = ["K", "M", "B", "T"];
    var thresholds = [1e3, 1e6, 1e9, 1e12];
    for (var i = thresholds.length - 1; i >= 0; i--) {
        if (number >= thresholds[i]) {
            var testResult = "".concat((number / thresholds[i]));
            return !testResult.includes(".") || (testResult.includes(".") && (testResult.length - 1 - testResult.indexOf(".")) <= 2)
                ? parseFloat(testResult).toLocaleString() + suffixes[i]
                : number.toLocaleString();
        }
    }
    return number.toLocaleString();
}
// Function to get the current locale's decimal separator
function getDecimalSeparator() {
    var testNumber = 1.1;
    return testNumber.toLocaleString().charAt(1); // Extracts the decimal separator
}
// Function to get the current locale's thousands separator
function getThousandsSeparator() {
    // Create a number formatted with commas or periods based on the locale
    var number = 1000;
    var formattedNumber = number.toLocaleString();
    // Check if the formatted number contains a comma or period
    // If the number contains a comma or period, we assume that's the thousands separator
    if (formattedNumber.includes(',')) {
        return ',';
    }
    else if (formattedNumber.includes('.')) {
        return '.';
    }
    else if (formattedNumber.includes(' ')) {
        return ' ';
    }
    else {
        return ''; // Return empty if no specific separator is found (edge cases)
    }
}
// Function to update the decimal button based on locale
function updateDecimalButton() {
    var decimalButton = document.getElementById("decimalBtn");
    var decimalSeparator = getDecimalSeparator();
    decimalButton.textContent = decimalSeparator; // Set the text of the button to the correct separator
}
// Set up button listeners for various actions
function setupButtonListeners() {
    // Update the decimal button based on locale before adding event listeners
    updateDecimalButton();
    var buttonActions = {
        backspaceBtn: backspace,
        clearLastBtn: clearLast,
        clearAllBtn: clearAll,
        equalsBtn: calculate
    };
    Object.keys(buttonActions).forEach(function (id) {
        var button = document.getElementById(id);
        button === null || button === void 0 ? void 0 : button.addEventListener("click", buttonActions[id]);
    });
    buttonGroups.functionButtons.forEach(function (id) {
        var _a;
        (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return appendFunction(id.charAt(id.length - 1)); });
    });
    buttonGroups.numberButtons.forEach(function (id) {
        var _a;
        (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return appendNumber(id.charAt(id.length - 1)); });
    });
    // Update the operatorMap to use the locale-specific decimal separator
    var decimalSeparator = getDecimalSeparator();
    var operatorMap = {
        openParenBtn: "(", closeParenBtn: ")", multiplyBtn: "*", divideBtn: "/",
        subtractBtn: "-", addBtn: "+", decimalBtn: decimalSeparator // Use the locale-specific separator
    };
    buttonGroups.operatorButtons.forEach(function (id) {
        var _a;
        (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return setOperation(operatorMap[id]); });
    });
}
// Add Keyboard support for controlling calculator
function setupKeyboardSupport() {
    var calculatorElement = document.getElementById("calculator");
    var decimalSeparator = getDecimalSeparator();
    var thousandsSeparator = getThousandsSeparator();
    if (calculatorElement) {
        calculatorElement.addEventListener("focusin", function () { return document.getElementById("status").style.backgroundColor = "#00F00055"; });
        calculatorElement.addEventListener("focusout", function () { return document.getElementById("status").style.backgroundColor = "#F0000055"; });
        calculatorElement.addEventListener("click", function () { return calculatorElement.focus(); });
        calculatorElement.addEventListener("keydown", function (event) {
            if (!calculatorElement.contains(document.activeElement))
                return;
            var key = event.key;
            // Handle numeric keys
            if (key >= '0' && key <= '9')
                appendNumber(key);
            // Handle decimal separator (dynamic based on locale)
            else if (key === decimalSeparator)
                setOperation(decimalSeparator);
            // Handle thousands separator if needed (optional, can be used for formatting)
            else if (key === thousandsSeparator)
                setOperation(thousandsSeparator);
            // Handle mathematical operations
            else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '(' || key === ')')
                setOperation(key);
            // Handle function keys (K, M, B, T)
            else if ('KMBT'.includes(key.toUpperCase()))
                appendFunction(key.toUpperCase());
            // Handle 'Enter' for calculation
            else if (key === 'Enter')
                calculate();
            // Handle 'Backspace' for deletion
            else if (key === 'Backspace')
                backspace();
            // Handle 'Delete' to clear last input
            else if (key === 'Delete')
                clearLast();
            // Handle 'Escape' to clear everything
            else if (key === 'Escape')
                clearAll();
        });
    }
}
// Add right-click menu for copy and paste
function setupRightClickMenu() {
    var _this = this;
    var displayElement = document.getElementById("calculator");
    var contextMenu = document.getElementById("contextMenu");
    var copyOption = document.getElementById("copyOption");
    var pasteOption = document.getElementById("pasteOption");
    copyOption.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, copy()];
                case 1:
                    _b.sent();
                    closeContextMenu();
                    (_a = document.getElementById("calculator")) === null || _a === void 0 ? void 0 : _a.focus();
                    return [2 /*return*/];
            }
        });
    }); });
    pasteOption.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, paste()];
                case 1:
                    _b.sent();
                    closeContextMenu();
                    (_a = document.getElementById("calculator")) === null || _a === void 0 ? void 0 : _a.focus();
                    return [2 /*return*/];
            }
        });
    }); });
    // Show custom context menu on right-click
    displayElement.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        contextMenu.style.left = "".concat(event.pageX, "px");
        contextMenu.style.top = "".concat(event.pageY, "px");
        contextMenu.style.display = 'block';
    });
    // Hide context menu when clicking elsewhere
    document.addEventListener('click', function (event) {
        if (!contextMenu.contains(event.target)) {
            closeContextMenu();
        }
    });
    // Function to hide the context menu
    function closeContextMenu() {
        contextMenu.style.display = 'none';
    }
}
// Setup for copy and paste support
function setupClipboardSupport() {
    var _this = this;
    var calculatorElement = document.getElementById("calculator");
    if (calculatorElement) {
        calculatorElement.addEventListener("keydown", function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!calculatorElement.contains(document.activeElement))
                            return [2 /*return*/];
                        if (!(event.ctrlKey && event.key === "c")) return [3 /*break*/, 2];
                        return [4 /*yield*/, copy()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(event.ctrlKey && event.key === "v")) return [3 /*break*/, 4];
                        return [4 /*yield*/, paste()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    }
}
// Simulation of copy operation with fallback
function copy() {
    return __awaiter(this, void 0, void 0, function () {
        var successMessage, displayValue, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    successMessage = document.getElementById('successMessage');
                    displayValue = display.value;
                    if (!navigator.clipboard) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.clipboard.writeText(displayValue)];
                case 2:
                    _a.sent();
                    // Temp bypass till paste is fixed
                    //showSuccessMessage(successMessage, await navigator.clipboard.readText() === displayValue ? "Copied!" : "Copy Failed!");
                    showSuccessMessage(successMessage, "Copied!");
                    console.log("Successfully copied to clipboard");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to copy to clipboard:', error_1);
                    fallbackCopy();
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    fallbackCopy();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Simulation of copy operation with fallback
function fallbackCopy() {
    return __awaiter(this, void 0, void 0, function () {
        var successMessage, textarea;
        return __generator(this, function (_a) {
            successMessage = document.getElementById('successMessage');
            textarea = document.createElement('textarea');
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.value = display.value;
            textarea.select();
            try {
                document.execCommand('copy');
                showSuccessMessage(successMessage, textarea.value !== "" ? "Copied!" : "Copy Failed!");
                if (textarea.value !== "")
                    console.log("Fallback: Successfully copied to clipboard");
                document.body.removeChild(textarea);
                document.getElementById("calculator").focus();
            }
            catch (error) {
                console.error("Fallback: Failed to copy text", error);
            }
            return [2 /*return*/];
        });
    });
}
// Simulation of paste operation with fallback
function paste() {
    return __awaiter(this, void 0, void 0, function () {
        var successMessage, text, success, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    successMessage = document.getElementById('successMessage');
                    if (true) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.clipboard.readText()];
                case 2:
                    text = _a.sent();
                    success = appendClipboardData(text);
                    showSuccessMessage(successMessage, success ? "Pasted!" : "Paste Failed!");
                    if (success)
                        console.log("Successfully pasted from clipboard");
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Failed to paste text", error_2);
                    fallbackPaste();
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    fallbackPaste();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Simulation of paste operation with fallback
function fallbackPaste() {
    return __awaiter(this, void 0, void 0, function () {
        var successMessage, clipboardText;
        return __generator(this, function (_a) {
            successMessage = document.getElementById('successMessage');
            clipboardText = document.createElement('textarea');
            clipboardText.style.opacity = '0';
            document.body.appendChild(clipboardText);
            clipboardText.focus();
            document.execCommand('paste');
            setTimeout(function () {
                var pastedData = clipboardText.value;
                document.body.removeChild(clipboardText);
                var success = appendClipboardData(pastedData);
                document.getElementById("calculator").focus();
                showSuccessMessage(successMessage, success ? "Pasted!" : "Paste Failed!");
                if (success)
                    console.log("Fallback: Successfully pasted from clipboard");
            }, 10);
            return [2 /*return*/];
        });
    });
}
// Show success message on copy or paste
function showSuccessMessage(successMessage, text) {
    successMessage.innerHTML = text;
    successMessage.style.display = 'block';
    setTimeout(function () { successMessage.style.opacity = '1'; }, 10);
    setTimeout(function () {
        successMessage.style.opacity = '0';
        setTimeout(function () { successMessage.style.display = 'none'; }, 300);
    }, 2000);
}
// Add paste data as needed
function appendClipboardData(clipboardText) {
    if (clipboardText === "")
        return false;
    // Regex to allow numbers, operators, commas, dots, and specific letters
    var allowedPattern = /^[0-9+\-*/.,()KMBT\s]*$/;
    if (!allowedPattern.test(clipboardText)) {
        console.log("Invalid clipboard text");
        return false;
    }
    // If awaiting input (after pressing "="), clear display and insert clipboard data
    if (awaitingInput) {
        display.value = clipboardText;
        awaitingInput = false;
        return true;
    }
    else {
        // Append clipboard data to the current display value
        if (display.value === "0")
            display.value = clipboardText;
        else
            display.value += clipboardText;
        return true;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculator */ "./calculator.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var DEFAULT_SETTINGS_WIDTH = 420;
var DEFAULT_SETTINGS_HEIGHT = 200;
// Check if running inside Alt1
if (window.alt1) {
    alt1.identifyAppUrl("./appconfig.json");
}
else {
    document.getElementById("addtoalt1").style.display = "block";
}
// Add settings button listener
document.getElementById("status").addEventListener("click", function () {
    var left = window.screenX + (window.innerWidth / 2) - (DEFAULT_SETTINGS_WIDTH / 2);
    var top = window.screenY + (window.innerHeight / 2) - (DEFAULT_SETTINGS_HEIGHT / 2);
    var settingsWindow = window.open("./settings.html", "_blank", "width=".concat(DEFAULT_SETTINGS_WIDTH, ",height=").concat(DEFAULT_SETTINGS_HEIGHT, ",left=").concat(left, ",top=").concat(top));
    settingsWindow === null || settingsWindow === void 0 ? void 0 : settingsWindow.addEventListener('keyup', function (e) {
        if ((e.which || e.keyCode) === 116) {
            e.preventDefault(); // Prevent F5 key press from refreshing the page
        }
    });
    settingsWindow === null || settingsWindow === void 0 ? void 0 : settingsWindow.addEventListener('beforeunload', function () {
        // Setup the colors
        applyStoredColor("functions-color", "functions-alpha", ".functions");
        applyStoredColor("operators-color", "operators-alpha", ".operators");
        applyStoredColor("numbers-color", "numbers-alpha", ".numbers");
        applyStoredColor("output-color", "output-alpha", "#display");
        applyStoredColor("buttons-color", "buttons-alpha", ".buttons", true);
        applyStoredColor("buttons-color", "buttons-alpha", "#display", true);
        console.warn("Settings Closed!");
        settingsWindow === null || settingsWindow === void 0 ? void 0 : settingsWindow.window.console.warn("Settings Saved!");
    });
    console.log("Open Settings!");
});
// Listen for window resize and adjust font size dynamically
window.addEventListener('resize', adjustFontSizeOnResize);
// Initialize the app
document.addEventListener("DOMContentLoaded", initializeApp);
function initializeApp() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                if (window.alt1 && !alt1.permissionInstalled) {
                    document.getElementById("addtoalt1").style.display = "block";
                    document.getElementById("addtoalt1").innerHTML = "You should click <a href='https://calc.unlishema.org'>Add App</a> at top right";
                }
                // Setup default colors
                if (localStorage.getItem("functions-color") == null)
                    localStorage.setItem("functions-color", "#fffb44");
                if (localStorage.getItem("functions-alpha") == null)
                    localStorage.setItem("functions-alpha", "1.0");
                if (localStorage.getItem("operators-color") == null)
                    localStorage.setItem("operators-color", "#ff4444");
                if (localStorage.getItem("operators-alpha") == null)
                    localStorage.setItem("operators-alpha", "01.0");
                if (localStorage.getItem("numbers-color") == null)
                    localStorage.setItem("numbers-color", "#ffffff");
                if (localStorage.getItem("numbers-alpha") == null)
                    localStorage.setItem("numbers-alpha", "0.85");
                if (localStorage.getItem("output-color") == null)
                    localStorage.setItem("output-color", "#ffffff");
                if (localStorage.getItem("output-alpha") == null)
                    localStorage.setItem("output-alpha", "0.75");
                if (localStorage.getItem("buttons-color") == null)
                    localStorage.setItem("buttons-color", "#252525");
                if (localStorage.getItem("buttons-alpha") == null)
                    localStorage.setItem("buttons-alpha", "0.35");
                // Setup the colors
                applyStoredColor("functions-color", "functions-alpha", ".functions");
                applyStoredColor("operators-color", "operators-alpha", ".operators");
                applyStoredColor("numbers-color", "numbers-alpha", ".numbers");
                applyStoredColor("output-color", "output-alpha", "#display");
                applyStoredColor("buttons-color", "buttons-alpha", ".buttons", true);
                applyStoredColor("buttons-color", "buttons-alpha", "#display", true);
                _calculator__WEBPACK_IMPORTED_MODULE_0__.setupButtonListeners();
                _calculator__WEBPACK_IMPORTED_MODULE_0__.setupKeyboardSupport();
                _calculator__WEBPACK_IMPORTED_MODULE_0__.setupClipboardSupport();
                _calculator__WEBPACK_IMPORTED_MODULE_0__.setupRightClickMenu();
                // Initial font size adjustment when the page loads
                adjustFontSizeOnResize();
            }
            catch (error) {
                console.error("Initialization error:", error);
            }
            return [2 /*return*/];
        });
    });
}
function applyStoredColor(colorKey, alphaKey, selector, bgColor) {
    if (bgColor === void 0) { bgColor = false; }
    if (localStorage.getItem(colorKey) != null && localStorage.getItem(alphaKey) != null) {
        var elements = document.querySelectorAll(selector);
        var hexColor = localStorage.getItem(colorKey);
        var alpha = parseFloat(localStorage.getItem(alphaKey));
        // Convert hex color to rgba
        var red = parseInt(hexColor.substring(1, 3), 16);
        var green = parseInt(hexColor.substring(3, 5), 16);
        var blue = parseInt(hexColor.substring(5, 7), 16);
        var rgbaColor_1 = "rgba(".concat(red, ", ").concat(green, ", ").concat(blue, ", ").concat(alpha, ")");
        elements.forEach(function (element) {
            if (bgColor)
                element.style.backgroundColor = rgbaColor_1;
            else
                element.style.color = rgbaColor_1;
        });
    }
}
function adjustFontSizeOnResize() {
    var newFontSize = Math.max(window.innerWidth / 12, 14); // Adjust the factor (50) to control scaling
    var elements = document.querySelectorAll(".functions, .operators, .numbers, #display, .buttons, .success-message");
    elements.forEach(function (element) {
        element.style.fontSize = newFontSize + "px";
    });
}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});