// ==UserScript==
// @name         EdgeNext
// @namespace    https://github.com/cardcraft/EdgeNext
// @version      0.0.4
// @description  Adds tweaks to edgenuity in a more sneaky way
// @author       Anon
// @updateURL    https://raw.githubusercontent.com/cardcraft/EdgeNext/main/EdgeNext.js
// @downloadURL  https://raw.githubusercontent.com/cardcraft/EdgeNext/main/EdgeNext.js
// @match        *://*.edgenuity.com/*
// @match        https://student.edgenuity.com/*
// @grant        none
// ==/UserScript==

// Some code is based off the legendary EdgenTweaks

const version_num = "0.0.4";

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

		.lowpadding {
			padding-bottom: 8px;
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

		<div class="cent lowpadding" style="font-size: 14px;">🛑Edgenuity detected auto advance! will fix soon🛑</div>
		<div class="cent lowpadding" style="font-size: 14px;">Read more <a href="https://github.com/cardcraft/EdgeNext/issues/2" target="_blank">here</a></div>

		<div class="cent" style="font-size: 18px;">Standard Edgenuity</div>

		<div class="cent" style="opacity: 30%;">
			<input class="input" type="checkbox" name="advance" id="advance" disabled>
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

		<div class="cent" style="font-size: 18px;">EdgeEX</div>

		<div class="cent">
			<input class="input" type="checkbox" name="EX-autoadvance" id="EX-autoadvance">
			<label for="EX-autoadvance">Auto Advance | Only for brackets</label>
		</div>

		<div class="cent" style="font-size: 18px;">System</div>

		<div class="cent">
			<input class="input" type="checkbox" name="logininfo" id="logininfo">
			<label for="logininfo">Hide Login-Screen info</label>
		</div>

		<!-- WIP stuff. sneak peek for you mr source snooper -->

		<!-- <div class="cent">
			<input class="input" type="checkbox" name="more-height" id="more-height">
			<label for="more-height">Set Viewport Height | Amount </label>
			<span>
				<input type="number" min="0" max="100" value="75" style="width: 60px; height: 20px;" id="height-amount"> px
			</span>
		</div> -->


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
	<div style="position: absolute; bottom:10px; right:10px;">${version_num}</div>
</body>

</html>
`

var Info_html = `
<div id="container"
	style="bottom: 8px; right: 8px; position: absolute; padding: 4px; background-color: #262627; width: 100px; color: white; z-index: 9999;"
	onclick="
	if (document.getElementById('child').style.display == 'none')
	{document.getElementById('child').style.display = 'block'; document.getElementById('container').style.width = '350px'}
	else {document.getElementById('child').style.display = 'none'; document.getElementById('container').style.width = '100px'}
	">
	⚠️ Info
	<div id="child" style="padding: 8px; display: none; height: 400px; width: 350px;">
		<div style="width: 100%; text-align: center; word-wrap: break-word;">
			Version 0.0.4<br><br>
			The first release since break, its a doozy.<br>
			The main roadmap going forwards is fixing things that are currently down<br>
			(I swear I'm working on auto-advance)<br><br> Also working on <b>EdgeEX</b> support<br>
			Currently, auto advance has become available with EdgeEX<br>

			For settings and more information click <b>Ctrl+Alt+a</b> (lowercase)<br>
			This will open a settings menu <br>
			(popups must be enabled) <br>
			(may not work on chrome(ium))
		</div>
	</div>
</div>
`

// Shorcut to open settings popup
document.addEventListener("keydown", function (event) {
	if (event.ctrlKey && event.altKey && event.key === "a") {
		openSettings()
	}
});

// Add info to login-screen
if (localStorage.getItem(5) === "false") {document.body.insertAdjacentHTML('afterbegin', Info_html)}
// Open settings popup
function openSettings() {

	let params = `scrollbars=no,resizable=0,status=no,location=no,toolbar=0,menubar=no, width=450,height=700,left=-1000,top=-1000`;

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

// Function to check whether video is done playing
function VideoDone() {
	try {
		var timeStr = iframe.contentDocument.getElementById("uid1_time").innerText;

		if (!timeStr || timeStr.length < 3) { return false; };
		const [left, right] = timeStr.split('/');

		return left.replace(/\s+/g, '').trim() === right.replace(/\s+/g, '').trim();
	} catch (error) {
		return true
	}
}

// Auto Advance

function autoadvance() {

	var iframe = document.getElementById('stageFrame');
	// var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

	setTimeout(() => {

		try {

			console.log(iframe.contentDocument.getElementById("frame_video_controls").style.display != block)

			if (iframe.contentDocument.getElementById("frame_video_controls").style.display != block) { } else {
				// For some reason this returns an error. It works tho so idk
				console.log("Autoadvance ran")
				API.FrameChain.nextFrame();
			}
		} catch (error) { }
	}, Math.floor(Math.random() * 3000));
}

// EdgeEX implementation

function EXautoadvance() {
	// Grab the next button
	var ex_next_button = document.getElementsByClassName("MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary")[0]

	// click it if its enabled :)
	if (ex_next_button != undefined && !ex_next_button.hasAttribute('disabled')) {
		ex_next_button.click()
	}
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

// Save user settings
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

		// localStorage.setItem("height-amount", popwindow.document.getElementById("height-amount").value.toString());

	} catch (error) { }
}

// Load user settings
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

		// popwindow.document.getElementById("height-amount").value = parseInt(localStorage.getItem("height-amount"));

	} catch (error) { }
}

function set_height(new_height) {
	new_height = new_height.toString();
	document.getElementById("main_area").style["height"] = new_height + "px";
	document.getElementById("main_area").style["background-color"] = "white";

// Check for elements that only exists in EdgeEX
function is_edgex() {
	if (document.getElementsByClassName("vjs-control-bar").length > 0) {
		return true;
	} else {
		return false;
	}
}

function is_login() {
	if (document.getElementsByClassName("MuiTypography-root MuiTypography-h1").length > 0) {
		console.log("login detected")
    this is a stupid peice of text because i want to break shit
	}
}

// The main loop that executes every 2 seconds
// var ex_next_button = document.getElementsByClassName("MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary")

function loop() {

// Stuff for EdgeEX, naimly auto-advance
	if (is_edgex()) {
		if (localStorage.getItem(4) === "true") { EXautoadvance(); };
	}
// Stuff for normal-non Ex edge
	else {
		// if (localStorage.getItem(0) === "true") { autoadvance(); };
		if (localStorage.getItem(1) === "true") { ShowExample(); };
		if (localStorage.getItem(2) === "true") { skipIntro(); };
		// if (localStorage.getItem(3) === "true") {set_height(localStorage.getItem("height-amount"))}
	}
	
	load();

}
