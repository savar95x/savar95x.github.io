function copyLink(btn) {
	const wrapper = btn.closest('.copy-wrapper');
	// In a real app, you would use:
	navigator.clipboard.writeText(window.location.href);
	// Trigger Animation
	wrapper.classList.add('active');
	// Reset after 2.5 seconds
	setTimeout(() => {
		wrapper.classList.remove('active');
	}, 2500);
}
