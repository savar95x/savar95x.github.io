var activeEngine;
var x = -1;

function toggleEngine() {
	x = (x == allEngines.length - 1) ? -1:x; 
	x = x + 1;
	activeEngine = allEngines[x];
	document.getElementById('searchInput').placeholder = "Search " + activeEngine.preposition + " " + activeEngine.name;

	document.getElementById('searchButton').style.color = activeEngine.color;
	document.getElementById('searchInput').focus();
}

function search() {
	let realVal = document.getElementById('searchInput').value.replace("%","%25").replace(/#/g,"%23").replace(/&/g,"%26").replaceAll("+","%2B").replace("/","%2F").replace("?","%3F").replace("=","%3d").replace("_","%5F").replace(/:/g,"%3A");
	let noSpaceVal = realVal.replace(/\s/g, "");
	{ if (noSpaceVal == "") {window.location.reload(false);}
		else {window.open("https://" + activeEngine.url + realVal + activeEngine.urlFilters, "_self");} };
}

function clearInput() {
	document.getElementById("searchInput").value = "";
	hideClearButton();
}

function hideClearButton() {
	document.getElementById("clearButton").style.display = (document.getElementById("searchInput").value == "") ? "none":"inline";
}
