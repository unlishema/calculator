import * as a1lib from "alt1";

import * as calculator from "./calculator";

// Check if running inside Alt1
if (window.alt1) {
	alt1.identifyAppUrl("./appconfig.json");
} else {
	document.getElementById("addtoalt1").style.display = "block";
}

// Initialize the app
document.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
	try {
		if (window.alt1 && !alt1.permissionInstalled) {
			document.getElementById("addtoalt1").style.display = "block";
			document.getElementById("addtoalt1").innerHTML = "You should click <a href='https://calc.unlishema.org'>Add App</a> at top right";
		}

		calculator.setupButtonListeners();
		calculator.setupKeyboardSupport();
		calculator.setupClipboardSupport();
		calculator.setupRightClickMenu();

		// TODO Add in keyboard support

		// TODO Override Right click to add a copy and paste option
	} catch (error) {
		console.error("Initialization error:", error);
	}
}