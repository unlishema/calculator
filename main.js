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
    var operatorRegex = /[+\-*/]/;
    var trimmedValue = display.value.trim();
    if (awaitingInput && operation === ".")
        display.value = "0"; // Reset on decimal
    awaitingInput = false;
    if (operatorRegex.test(trimmedValue.charAt(trimmedValue.length - 1))) {
        display.value = trimmedValue.slice(0, -1) + operation + " ";
    }
    else if (trimmedValue.length > 0) {
        display.value += "".concat(operation !== "." ? " " : "").concat(operation).concat(operation !== "." ? " " : "");
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
        // Remove commas from the input
        display.value = display.value.replace(/,/g, "");
        // Replace K, M, B, T with their corresponding numbers
        display.value = display.value.replace(/(\d+(\.\d+)?)([KMBT])/gi, function (match, num, decimal, suffix) {
            var multipliers = { K: 1000, M: 1000000, B: 1000000000, T: 1000000000000 };
            return (parseFloat(num) * multipliers[suffix.toUpperCase()]).toString();
        });
        if (display.value.includes("(")) {
            display.value = display.value.replace(/(\d|\))\s*\(/g, "$1*("); // Handle implicit multiplication
        }
        var result = eval(display.value).toString();
        var numberResult = parseFloat(result);
        result = !isNaN(numberResult) ? formatLargeNumber(numberResult) : result;
        display.value = result;
    }
    catch (error) {
        display.value = "Error";
    }
    awaitingInput = true; // Await new input after "="
}
function formatLargeNumber(number) {
    var suffixes = ["K", "M", "B", "T"];
    var thresholds = [1e3, 1e6, 1e9, 1e12];
    for (var i = thresholds.length - 1; i >= 0; i--) {
        if (number >= thresholds[i]) {
            var testResult = (number / thresholds[i]).toLocaleString();
            return !testResult.includes(".") || (testResult.includes(".") && (testResult.length - 1 - testResult.indexOf(".")) <= 2)
                ? testResult + suffixes[i]
                : number.toLocaleString();
        }
    }
    return number.toLocaleString();
}
// Set up button listeners for various actions
function setupButtonListeners() {
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
    buttonGroups.operatorButtons.forEach(function (id) {
        var _a;
        var operatorMap = {
            openParenBtn: "(", closeParenBtn: ")", multiplyBtn: "*", divideBtn: "/",
            subtractBtn: "-", addBtn: "+", decimalBtn: "."
        };
        (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return setOperation(operatorMap[id]); });
    });
}
// Add Keyboard support for controlling calculator
function setupKeyboardSupport() {
    var calculatorElement = document.getElementById("calculator");
    if (calculatorElement) {
        calculatorElement.addEventListener("focusin", function () { return document.getElementById("status").style.backgroundColor = "#00F00035"; });
        calculatorElement.addEventListener("focusout", function () { return document.getElementById("status").style.backgroundColor = "#F0000035"; });
        calculatorElement.addEventListener("click", function () { return calculatorElement.focus(); });
        calculatorElement.addEventListener("keydown", function (event) {
            if (!calculatorElement.contains(document.activeElement))
                return;
            var key = event.key;
            if (key >= '0' && key <= '9')
                appendNumber(key);
            else if (key === '.')
                setOperation('.');
            else if (key === '+' || key === '-' || key === '*' || key === '/')
                setOperation(key);
            else if ('KMBT'.includes(key.toUpperCase()))
                appendFunction(key.toUpperCase());
            else if (key === 'Enter')
                calculate();
            else if (key === 'Backspace')
                backspace();
            else if (key === 'Delete')
                clearLast();
            else if (key === 'Escape')
                clearAll();
        });
    }
}
// Add right-click menu for copy and paste
function setupRightClickMenu() {
    var _this = this;
    var displayElement = document.getElementById("calculator");
    // Create custom context menu
    var contextMenu = document.createElement('ul');
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
    var copyOption = document.createElement('li');
    copyOption.className = 'nistext';
    copyOption.textContent = 'Copy (Ctrl+C)';
    copyOption.style.padding = '0px 15px';
    copyOption.style.cursor = 'pointer';
    copyOption.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, simulateCopy()];
                case 1:
                    _a.sent();
                    closeContextMenu();
                    document.getElementById("calculator").focus();
                    return [2 /*return*/];
            }
        });
    }); });
    contextMenu.appendChild(copyOption);
    var pasteOption = document.createElement('li');
    pasteOption.className = 'nistext';
    pasteOption.textContent = 'Paste (Ctrl+V)';
    pasteOption.title = 'Use Ctrl+V instead as this won\'t work';
    pasteOption.style.padding = '0px 15px';
    pasteOption.style.cursor = 'pointer';
    pasteOption.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            //await simulatePaste();
            closeContextMenu();
            document.getElementById("calculator").focus();
            return [2 /*return*/];
        });
    }); });
    contextMenu.appendChild(pasteOption);
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
    setupRightClickMenu(); // Set up right-click menu
    var calculatorElement = document.getElementById("calculator");
    if (calculatorElement) {
        calculatorElement.addEventListener("keydown", function (event) { return __awaiter(_this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!calculatorElement.contains(document.activeElement))
                            return [2 /*return*/];
                        key = event.key;
                        if (!event.ctrlKey) return [3 /*break*/, 4];
                        if (!(key === 'c')) return [3 /*break*/, 2];
                        return [4 /*yield*/, simulateCopy()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(key === 'v')) return [3 /*break*/, 4];
                        return [4 /*yield*/, simulatePaste()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    }
}
function simulateCopy() {
    return __awaiter(this, void 0, void 0, function () {
        var displayValue, error_1, textarea;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    displayValue = display.value;
                    if (!navigator.clipboard) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.clipboard.writeText(displayValue)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to copy to clipboard:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    textarea = document.createElement('textarea');
                    textarea.style.opacity = '0';
                    document.body.appendChild(textarea);
                    textarea.value = displayValue;
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    document.getElementById("calculator").focus();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function simulatePaste() {
    return __awaiter(this, void 0, void 0, function () {
        var clipboardText, error_2, clipboardText_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!navigator.clipboard) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.clipboard.readText()];
                case 2:
                    clipboardText = _a.sent();
                    appendClipboardData(clipboardText);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Failed to read clipboard content:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    clipboardText_1 = document.createElement('textarea');
                    clipboardText_1.style.opacity = '0';
                    document.body.appendChild(clipboardText_1);
                    clipboardText_1.focus();
                    document.execCommand('paste');
                    setTimeout(function () {
                        var pastedData = clipboardText_1.value;
                        document.body.removeChild(clipboardText_1);
                        appendClipboardData(pastedData);
                        document.getElementById("calculator").focus();
                    }, 10);
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function appendClipboardData(clipboardText) {
    if (awaitingInput) {
        // If awaiting input (after pressing "="), clear display and insert clipboard data
        display.value = clipboardText;
        awaitingInput = false;
    }
    else {
        // Append clipboard data to the current display value
        if (display.value === "0")
            display.value = clipboardText;
        else
            display.value += clipboardText;
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

// Check if running inside Alt1
if (window.alt1) {
    alt1.identifyAppUrl("./appconfig.json");
}
else {
    document.getElementById("addtoalt1").style.display = "block";
}
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
                _calculator__WEBPACK_IMPORTED_MODULE_0__.setupButtonListeners();
                _calculator__WEBPACK_IMPORTED_MODULE_0__.setupKeyboardSupport();
                _calculator__WEBPACK_IMPORTED_MODULE_0__.setupClipboardSupport();
                _calculator__WEBPACK_IMPORTED_MODULE_0__.setupRightClickMenu();
                // TODO Add in keyboard support
                // TODO Override Right click to add a copy and paste option
            }
            catch (error) {
                console.error("Initialization error:", error);
            }
            return [2 /*return*/];
        });
    });
}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});