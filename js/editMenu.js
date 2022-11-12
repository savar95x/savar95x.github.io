toggleEngine();

function editBookmarks() {
	document.getElementById("editContainer").style.display = "initial";
	document.getElementById("mainContainer").style.opacity = "0.25";
	document.getElementById("mainContainer").style["pointer-events"] = "none";
}

function backToHome() {
	document.getElementById("editContainer").style.display = "none";
	document.getElementById("mainContainer").style.opacity = "1";
	document.getElementById("mainContainer").style["pointer-events"] = "auto";
}

function editSettings() {
	window.open("https://github.com/skaar513/skaar513.github.io", "_self")
}
