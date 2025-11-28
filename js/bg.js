const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Configuration
const particleCount = 100; // More particles for texture
const mouseDistance = 150;

// Mouse State
const mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
	mouse.x = null;
	mouse.y = null;
});

class Particle {
	constructor() {
		this.x = Math.random() * width;
		this.y = Math.random() * height;
		// Much slower, organic movement
		this.vx = (Math.random() - 0.5) * 0.5; 
		this.vy = (Math.random() - 0.5) * 0.5;

		// Varied size and opacity for depth
		this.size = Math.random() * 2 + 0.5;
		// Base alpha is lower for background feel
		this.baseAlpha = Math.random() * 0.3 + 0.05; 
		this.alpha = this.baseAlpha;
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;

		// Wrap around screen seamlessly
		if (this.x < 0) this.x = width;
		if (this.x > width) this.x = 0;
		if (this.y < 0) this.y = height;
		if (this.y > height) this.y = 0;

		// Subtle Mouse Interaction: gentle push away
		if (mouse.x != null) {
			const dx = mouse.x - this.x;
			const dy = mouse.y - this.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < mouseDistance) {
				const forceDirectionX = dx / distance;
				const forceDirectionY = dy / distance;
				const force = (mouseDistance - distance) / mouseDistance;

				// Push harder the closer it is
				const repulsion = force * 2; 

				this.x -= forceDirectionX * repulsion;
				this.y -= forceDirectionY * repulsion;

				// Slightly brighten particles near mouse
				this.alpha = Math.min(this.baseAlpha + 0.2, 0.8);
			} else {
				// Return to normal opacity slowly
				if (this.alpha > this.baseAlpha) {
					this.alpha -= 0.01;
				}
			}
		}
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(150, 150, 150, ${this.alpha})`;
		ctx.fill();
	}
}

function resize() {
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
	initParticles();
}

function initParticles() {
	particles = [];
	const count = width < 768 ? particleCount / 2 : particleCount;
	for (let i = 0; i < count; i++) {
		particles.push(new Particle());
	}
}

function animate() {
	ctx.clearRect(0, 0, width, height);

	for (let i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].draw();
	}

	requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
animate();
