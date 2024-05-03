// ==UserScript==
// @name         EdgeNext
// @namespace    https://github.com/cardcraft/EdgeNext
// @version      0.0.1-A
// @description  Adds tweaks to edgenuity in a more sneaky way
// @author       Anon
// @updateURL    https://raw.githubusercontent.com/cardcraft/EdgeNext/main/EdgeNext.js
// @downloadURL  https://raw.githubusercontent.com/cardcraft/EdgeNext/main/EdgeNext.js
// @match        *://*.core.learn.edgenuity.com/*
// @match        https://student.edgenuity.com/*
// @grant        none
// ==/UserScript==

// Lots of this code is based off the legendary EdgenTweaks

const version_num = "1.5.6";
var $, jQuery;
$ = jQuery = window.jQuery;

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
    } catch (TypeError) {}
    try {
        window.frames[0].frames[0].document.getElementsByClassName("left-column")[0].children[0].style.display = "block"
    } catch (TypeError) {}
}

// The main loop that executes every 2 seconds

function loop() {
	autoadvance();
	skipIntro();
	ShowExample();
}