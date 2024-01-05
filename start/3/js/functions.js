var activeEngine;
var x = -1;
const srchBtn = document.getElementById('searchButton');

function toggleEngine() {
  x = (x == allEngines.length - 1) ? -1:x; 
	x = x + 1;
	activeEngine = allEngines[x];
	document.getElementById('searchInput').placeholder = "Search " + activeEngine.preposition + " " + activeEngine.name;
	document.getElementById('toggleButton').style.color = activeEngine.color;
  srchBtn.style.setProperty('--srchBtnHoverBg', activeEngine.color);
	document.getElementById('searchInput').focus();
};

function search() {
  let realVal = document.getElementById('searchInput').value.replace("%","%25").replace(/#/g,"%23").replace(/&/g,"%26").replaceAll("+","%2B").replace("/","%2F").replace("?","%3F").replace("=","%3d").replace("_","%5F").replace(/:/g,"%3A");

	if (realVal.replace(/\s/g, "") == "") window.location.reload(false);
  else if (document.getElementById('searchInput').value.slice(-3) == " ul") window.open("https://" + document.getElementById('searchInput').value.slice(0,-3), "_self");
	else window.open("https://" + activeEngine.url + realVal + activeEngine.urlFilters, "_self");
};

function clearInput() {
  document.getElementById("searchInput").value = "";
	document.getElementById('searchInput').focus();
	hideClearButton();
};

function hideClearButton() {
	document.getElementById("clearButton").style.display = (document.getElementById("searchInput").value == "") ? "none":"inline";
};

toggleEngine();
