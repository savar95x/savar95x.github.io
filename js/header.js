const header = document.getElementById('header-wrapper');
const scrollThreshold = 20; // px
const handleScroll = () => {
	if (window.scrollY > scrollThreshold) {
		// User has scrolled down
		header.classList.add('scrolled');
	} else {
		// User is at the top
		header.classList.remove('scrolled');
	}
};
// Passive: true improves scrolling performance
window.addEventListener('scroll', handleScroll, { passive: true });
