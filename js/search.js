const allEngines = [
	{ name:"Google", logo:"ph-bold ph-google-logo", preposition:"with", color:"#80A9A0", url:"google.com/search?q=", urlFilters:"" },
	{ name:"ArchWiki", logo:"ph-fill ph-notebook", preposition:"over", color:"var(--clr-highlight1)", url:"wiki.archlinux.org/index.php?search=", urlFilters:"" },
	//{ name:"SearX", logo:"ph ph-magnifying-glass", preposition:"with", color:"#A9B665", url:"searx.be/search?q=", urlFilters:"" },
	{ name:"YouTube", logo:"ph-fill ph-play", preposition:"over", color:"#D87873", url:"youtube.com/results?search_query=", urlFilters:"" },
	{ name:"Github", logo:"ph-fill ph-github-logo", preposition:"over", color:"#D8A657", url:"github.com/search?q=", urlFilters:"&s=stars" },
];

const searchInput = document.getElementById("searchInput");

var activeEngine;
var x = -1;

function toggleActiveColor(x) {
	document.getElementById("engine-" + x).className = "engine active-engine";
	for (let i = 1; i < allEngines.length; i++) {
	document.getElementById("engine-" + ((x+i) % len)).className = "engine";
	}
	activeEngine = allEngines[x];

	document.getElementById('searchInput').placeholder = "Search " + activeEngine.preposition + " " + activeEngine.name + " ...";
	document.getElementById('searchInput').focus();
}

function toggleEngine() {
	len = allEngines.length;
	x++;
	x = x%len;
	activeEngine = allEngines[x];

	//document.getElementById("engine-" + x).style.background = "#61A6FA";
	//bg = document.getElementById("wrapper").style.background;
	//document.getElementById("engine-" + x).style.color = "#000000";
	//x = (x == 0) ? len : x;
	//document.getElementById("engine-" + ((x-1) % len)).style.background = "#1a1a1a";
	//document.getElementById("engine-" + ((x-1) % len)).style.color = "#808080";
	toggleActiveColor(x);

	document.getElementById('searchInput').placeholder = "Search " + activeEngine.preposition + " " + activeEngine.name + " ...";
	//document.getElementById('search-icon').className = activeEngine.logo;
	//document.getElementById('search-icon').style.borderColor = activeEngine.color;
	document.getElementById('searchInput').focus();
}

function toggleClearButton() {
	if (searchInput.value.trim() !== "") {
		clearButton.style.display = "flex"; // Show if input has text
	} else {
		clearButton.style.display = "none"; // Hide if input is empty
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
const childBtn = document.getElementById("tabButton");

// 1. Prevent the button click from stealing focus
childBtn.addEventListener("mousedown", (e) => {
    e.preventDefault(); 
    // This stops the input from blurring, so the "hide" logic never runs!
});

function clearInput() {
	document.getElementById("searchInput").value = "";
	toggleClearButton();
	document.getElementById('searchInput').focus();
}

toggleEngine();
document.getElementById("searchInput").addEventListener("keydown", event =>
	{ if (event.key == "Enter") search(); // keycode 13
		else if (event.key == "Tab") {
			event.preventDefault(); // <--- This stops the focus change
			toggleEngine(); // keycode 9
		} else if (event.altKey && event.key == "c") clearInput();
	});
