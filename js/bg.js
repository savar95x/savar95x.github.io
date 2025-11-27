const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let points = [];
const spacing = 40; // Space between points

function resize() {
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
	initPoints();
}

function initPoints() {
	points = [];
	// Create a grid of points covering the screen
	for (let x = 0; x < width + spacing; x += spacing) {
		for (let y = 0; y < height + spacing; y += spacing) {
			points.push({
				originX: x,
				originY: y,
				x: x,
				y: y,
				// Blink/Fade state properties
				alpha: 0.1,    
				targetAlpha: 0.1, 
				isFading: false,
				fadeProgress: 0,
				fadeSpeed: 0.02 + Math.random() * 0.02 
			});
		}
	}
}

function animate(time) {
	ctx.clearRect(0, 0, width, height);

	// Dot Color: Light Grey for visibility on dark background
	ctx.fillStyle = '#666666'; 

	const t = time * 0.001; // Scale time

	points.forEach(p => {
		// 1. Calculate Wave Movement
		// Sine waves based on position create the "breathing" grid effect
		const moveX = Math.sin(t + p.originY * 0.005) * 8; 
		const moveY = Math.cos(t + p.originX * 0.005) * 8;

		// 2. Handle Random Twinkle/Fading
		if (!p.isFading) {
			// Small chance to start fading a dot
			if (Math.random() < 0.001) { 
				p.isFading = true;
				p.fadeProgress = 0;
			}
			p.alpha = 0.1; // Base faint opacity
		} else {
			// Animate the fade cycle
			p.fadeProgress += p.fadeSpeed;
			if (p.fadeProgress >= Math.PI) {
				p.isFading = false;
				p.alpha = 0.1;
			} else {
				// Calculate opacity based on sine wave of progress
				const sineVal = Math.sin(p.fadeProgress);
				p.alpha = 0.1 + (sineVal * 0.5); // Max opacity ~0.6
			}
		}

		// 3. Draw the Point
		ctx.globalAlpha = p.alpha;
		ctx.beginPath();
		ctx.fillRect(p.originX + moveX, p.originY + moveY, 2, 2); 
	});

	requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(animate);
