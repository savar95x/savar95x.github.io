const allEngines = [
	{ name:"Google", logo:"ph ph-google-logo", preposition:"with", color:"#80A9A0", url:"google.com/search?q=", urlFilters:"" },
	{ name:"ArchWiki", logo:"ph ph-linux-logo", preposition:"over", color:"var(--clr-highlight1)", url:"wiki.archlinux.org/index.php?search=", urlFilters:"" },
	{ name:"SearX", logo:"ph ph-magnifying-glass", preposition:"with", color:"#A9B665", url:"searx.be/search?q=", urlFilters:"" },
	{ name:"YouTube", logo:"ph ph-youtube-logo", preposition:"over", color:"#D87873", url:"youtube.com/results?search_query=", urlFilters:"" },
	{ name:"Github", logo:"ph ph-github-logo", preposition:"over", color:"#D8A657", url:"github.com/search?q=", urlFilters:"&s=stars" },
];

var activeEngine;
var x = -1;

function toggleEngine() {
	x = (x == allEngines.length - 1) ? -1:x; 
	x = x + 1;
	activeEngine = allEngines[x];
	//document.getElementById('searchInput').placeholder = "Search " + activeEngine.preposition + " " + activeEngine.name;
	document.getElementById('name').textContent = activeEngine.name;
	document.getElementById('logo').style.color = activeEngine.color;
	document.getElementById('logo').className = activeEngine.logo;
	//document.getElementById('search-icon').style.borderColor = activeEngine.color;
	document.getElementById('searchInput').focus();
}

function toggleClearButton() {
	if (searchInput.value.trim() !== "") {
		clearButton.style.visibility = "visible"; // Show if input has text
	} else {
		clearButton.style.visibility = "hidden"; // Hide if input is empty
	}
}

function search() {
	let realVal = document.getElementById('searchInput').value.replace("%","%25").replace(/#/g,"%23").replace(/&/g,"%26").replaceAll("+","%2B").replace("/","%2F").replace("?","%3F").replace("=","%3d").replace("_","%5F").replace(/:/g,"%3A");
	let noSpaceVal = realVal.replace(/\s/g, "");
	{ if (noSpaceVal == "") {window.location.reload(false);}
		else {window.open("https://" + activeEngine.url + realVal + activeEngine.urlFilters, "_self");} };
}

toggleClearButton();
searchInput.addEventListener("input", toggleClearButton);

function clearInput() {
	document.getElementById("searchInput").value = "";
	toggleClearButton();
	document.getElementById('searchInput').focus();
}

toggleEngine();
document.getElementById("searchInput").addEventListener("keydown", event =>
	{ if (event.key == "Enter") search(); // keycode 13
		else if (event.altKey && event.key == "Tab") toggleEngine(); // keycode 9
		else if (event.altKey && event.key == "c") clearInput();
	});
