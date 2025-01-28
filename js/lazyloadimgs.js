document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("img").forEach(img => {
		img.setAttribute("loading", "lazy");
	});
});
