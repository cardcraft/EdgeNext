// ==UserScript==
// @name         EdgeNext
// @namespace    https://github.com/cardcraft/EdgeNext
// @version      0.0.2
// @description  Adds tweaks to edgenuity in a more sneaky way
// @author       Anon
// @updateURL    https://raw.githubusercontent.com/cardcraft/EdgeNext/main/EdgeNext.js
// @downloadURL  https://raw.githubusercontent.com/cardcraft/EdgeNext/main/EdgeNext.js
// @match        *://*.core.learn.edgenuity.com/*
// @match        https://student.edgenuity.com/*
// @grant        none
// ==/UserScript==

// Some code is based off the legendary EdgenTweaks

const version_num = "1.5.6";
var $, jQuery;
$ = jQuery = window.jQuery;

var UI_initialized = false
var popwindow
var Settings_html = `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>EdgeNext: Settings</title>
	<style>
		body {
			background-color: #1b1b1c;
			min-width: 100vw;
			min-height: 100vh;
			overflow: hidden;
			font-family: monospace;
			margin: 0;
			color: white;
		}

		button {
			width: 75px;
			padding: 2px;
			margin: 5px;
		}

		.title {
			font-size: 32pt;
			padding-top: 12px;
			width: 100%;
			text-align: center;
		}

		.inputs {
			padding: 10px;
			font-size: 12pt;
			display: flex;
			justify-content: center;
			flex-direction: column;
			color: rgb(255, 222, 160);
		}

		.cent {
			padding-bottom: 30px;
			width: 100%;
			text-align: center;
		}

		.footer {
			height: 100px;
			width: 100vw;
			background-color: #262627;
			position: absolute;
			bottom: 0;
			padding: 10px;
			flex-direction: column;

			text-align: center;
			font-size: 16px;
			font-weight: bold;
			color: #5b5b5b;
		}

		.social-cont {
			padding: 10px;
		}

		link {
			color: #5b5b5b;
		}

		svg {
			padding-left: 5px;
			padding-right: 5px;
		}
	</style>
</head>

<body>
	<div class="title">EdgeNext</div>
	<div class="inputs">
		<div class="cent">
			<input class="input" type="checkbox" name="advance" id="advance">
			<label for="advance">Auto Advance | Only for brackets</label>
		</div>
		<div class="cent">
			<input class="input" type="checkbox" name="showall" id="showall">
			<label for="showall">Show All | Example responses</label>
		</div>
		<div class="cent">
			<input class="input" type="checkbox" name="skipint" id="skipint">
			<label for="skipint">Skip Intro | Work while talking</label>
		</div>
		<div class="cent">
			<input class="input" type="checkbox" name="shutup" id="shutup">
			<label for="shutup">SHUT UP!! | Stops notification</label>
		</div>
		<div class="cent">
			<button onclick="window.close();">Close</button>
		</div>
	</div>
	<div class="footer">
		Made with ❤️ by... me <span style="font-size: 8px;">nunya</span>

		<div class="social-cont">
			<div style="font-size: 10px; padding-bottom: 8px;">Questions? Dm Me!!</div>
			<svg onclick="window.open('https://twitter.com/cardcraft_dev')" xmlns="http://www.w3.org/2000/svg"
				width="24" height="24" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
				<path
					d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
			</svg>
			<svg onclick="window.open('https://github.com/cardcraft/EdgeNext')" xmlns="http://www.w3.org/2000/svg"
				width="24" height="24" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
				<path
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
			</svg>
		</div>
	</div>
	<div style="position: absolute; bottom:10px; right:10px; fnot-size: 10px;">V0.0.1</div>
</body>

</html>
`

// Shorcut to open settings popup
document.addEventListener("keydown", function (event) {
	if (event.ctrlKey && event.altKey && event.key === "a") {
		openSettings()
	}
});

// Open settings popup
function openSettings() {

	let params = `scrollbars=no,resizable=0,status=no,location=no,toolbar=0,menubar=no, width=450,height=550,left=-1000,top=-1000`;

	popwindow = window.open("", "about:blank", params);
	popwindow.document.getElementsByTagName('body')[0].innerHTML = '';
	popwindow.document.write(Settings_html);
	load();
}

setTimeout(() => {
	window.masterloop = setInterval(loop, 2000);
}, 2000);

// Skip intro
function skipIntro() {
	try {
		window.frames[0].document.getElementById("invis-o-div").remove();
	} catch (TypeError) { }
}


// Auto Advance
function autoadvance() {
	setTimeout(() => {
		try {
			// For some reason this returns an error. It works tho so idk
			API.FrameChain.nextFrame();
		} catch (error) { }
	}, Math.floor(Math.random() * 5000));
}

// Show Example Response
function ShowExample() {
	try {
		window.frames[0].frames[0].document.getElementsByClassName("right-column")[0].children[0].style.display = "block"
	} catch (TypeError) { }
	try {
		window.frames[0].frames[0].document.getElementsByClassName("left-column")[0].children[0].style.display = "block"
	} catch (TypeError) { }
}

// Save and load the user settings
function save() {
	try {
		const inputElements = popwindow.document.getElementsByClassName("input");

		for (let i = 0; i < inputElements.length; i++) {
			const element = inputElements[i];
			if (element.checked) {
				localStorage.setItem(i.toString(), "true");
			} else {
				localStorage.setItem(i.toString(), "false");
			}
		}

	} catch (error) { }
}

function load() {
	try {
		const inputElements = popwindow.document.getElementsByClassName("input");

		for (let i = 0; i < inputElements.length; i++) {
			const element = inputElements[i];
			if (localStorage.getItem(i.toString()) === "true") {
				element.checked = true;
			} else if (localStorage.getItem(i.toString()) === "false") {
				element.checked = false;
			}
		}

	} catch (error) { }
}


// The main loop that executes every 2 seconds
function loop() {
	if (localStorage.getItem(0) === "true") { autoadvance(); };
	if (localStorage.getItem(1) === "true") { ShowExample(); };
	if (localStorage.getItem(2) === "true") { skipIntro(); };

	save();
	load();

}