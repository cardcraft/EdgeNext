// ==UserScript==
// @name         EdgeNext
// @namespace    https://github.com/cardcraft/EdgeNext
// @version      0.0.1-A
// @description  Adds tweaks to edgenuity in a more sneaky way
// @author       Anon
// @updateURL    https://github.com/cardcraft/EdgeNext/main/EdgeNext.js
// @downloadURL  https://github.com/cardcraft/EdgeNext/main/EdgeNext.js
// @match        *://*.core.learn.edgenuity.com/*
// @match        https://student.edgenuity.com/*
// @grant        none
// ==/UserScript==

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

function loop() {
	autoadvance();
	skipIntro();
}