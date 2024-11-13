import * as a1lib from "alt1";

import * as calculator from "./calculator";

const DEFAULT_SETTINGS_WIDTH = 420;
const DEFAULT_SETTINGS_HEIGHT = 200;

// Check if running inside Alt1
if (window.alt1) {
	alt1.identifyAppUrl("./appconfig.json");
} else {
	document.getElementById("addtoalt1").style.display = "block";
}

// Add settings button listener
document.getElementById("status").addEventListener("click", () => {
	const left = window.screenX + (window.innerWidth / 2) - (DEFAULT_SETTINGS_WIDTH / 2);
	const top = window.screenY + (window.innerHeight / 2) - (DEFAULT_SETTINGS_HEIGHT / 2);

	const settingsWindow = window.open("./settings.html", "_blank", `width=${DEFAULT_SETTINGS_WIDTH},height=${DEFAULT_SETTINGS_HEIGHT},left=${left},top=${top}`);

	settingsWindow?.addEventListener('keyup', (e) => {
		if ((e.which || e.keyCode) === 116) {
			e.preventDefault(); // Prevent F5 key press from refreshing the page
		}
	});

	settingsWindow?.addEventListener('beforeunload', () => {
		// Setup the colors
		applyStoredColor("functions-color", "functions-alpha", ".functions");
		applyStoredColor("operators-color", "operators-alpha", ".operators");
		applyStoredColor("numbers-color", "numbers-alpha", ".numbers");
		applyStoredColor("output-color", "output-alpha", "#display");
		applyStoredColor("buttons-color", "buttons-alpha", ".buttons", true);
		applyStoredColor("buttons-color", "buttons-alpha", "#display", true);

		console.warn("Settings Closed!");
		settingsWindow?.window.console.warn("Settings Saved!");
	});
	console.log("Open Settings!");
});

// Listen for window resize and adjust font size dynamically
window.addEventListener('resize', adjustFontSizeOnResize);

// Initialize the app
document.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
	try {
		if (window.alt1 && !alt1.permissionInstalled) {
			document.getElementById("addtoalt1").style.display = "block";
			document.getElementById("addtoalt1").innerHTML = "You should click <a href='https://calc.unlishema.org'>Add App</a> at top right";
		}

		// Setup default colors
		if (localStorage.getItem("functions-color") == null) localStorage.setItem("functions-color", "#fffb44");
		if (localStorage.getItem("functions-alpha") == null) localStorage.setItem("functions-alpha", "1.0");
		if (localStorage.getItem("operators-color") == null) localStorage.setItem("operators-color", "#ff4444");
		if (localStorage.getItem("operators-alpha") == null) localStorage.setItem("operators-alpha", "01.0");
		if (localStorage.getItem("numbers-color") == null) localStorage.setItem("numbers-color", "#ffffff");
		if (localStorage.getItem("numbers-alpha") == null) localStorage.setItem("numbers-alpha", "0.85");
		if (localStorage.getItem("output-color") == null) localStorage.setItem("output-color", "#ffffff");
		if (localStorage.getItem("output-alpha") == null) localStorage.setItem("output-alpha", "0.75");
		if (localStorage.getItem("buttons-color") == null) localStorage.setItem("buttons-color", "#252525");
		if (localStorage.getItem("buttons-alpha") == null) localStorage.setItem("buttons-alpha", "0.35");

		// Setup the colors
		applyStoredColor("functions-color", "functions-alpha", ".functions");
		applyStoredColor("operators-color", "operators-alpha", ".operators");
		applyStoredColor("numbers-color", "numbers-alpha", ".numbers");
		applyStoredColor("output-color", "output-alpha", "#display");
		applyStoredColor("buttons-color", "buttons-alpha", ".buttons", true);
		applyStoredColor("buttons-color", "buttons-alpha", "#display", true);

		calculator.setupButtonListeners();
		calculator.setupKeyboardSupport();
		calculator.setupClipboardSupport();
		calculator.setupRightClickMenu();

		// Initial font size adjustment when the page loads
		adjustFontSizeOnResize();
	} catch (error) {
		console.error("Initialization error:", error);
	}
}

function applyStoredColor(colorKey, alphaKey, selector, bgColor = false) {
	if (localStorage.getItem(colorKey) != null && localStorage.getItem(alphaKey) != null) {
		const elements = document.querySelectorAll(selector);
		const hexColor = localStorage.getItem(colorKey);
		const alpha = parseFloat(localStorage.getItem(alphaKey));

		// Convert hex color to rgba
		const red = parseInt(hexColor.substring(1, 3), 16);
		const green = parseInt(hexColor.substring(3, 5), 16);
		const blue = parseInt(hexColor.substring(5, 7), 16);
		const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

		elements.forEach(element => {
			if (bgColor) element.style.backgroundColor = rgbaColor;
			else element.style.color = rgbaColor;
		});
	}
}

function adjustFontSizeOnResize() {
	const newFontSize = Math.max(window.innerWidth / 12, 14); // Adjust the factor (50) to control scaling
	const elements = document.querySelectorAll(".functions, .operators, .numbers, #display, .buttons, .success-message");

	elements.forEach(element => {
		(<HTMLElement>element).style.fontSize = newFontSize + "px";
	});
}