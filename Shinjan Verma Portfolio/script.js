// Sticky nav: burger menu toggle
const burgerButton = document.querySelector('.burger');
const navMenu = document.getElementById('nav-menu');
const audioToggle = document.getElementById('audio-toggle');
const bgMusicToggle = document.getElementById('bg-music-toggle');
const bgMusic = document.getElementById('bg-music');
let audioCtx = null;
let ambientGain = null;
let ambientOscillators = [];

if (burgerButton && navMenu) {
	burgerButton.addEventListener('click', () => {
		const isOpen = navMenu.classList.toggle('open');
		burgerButton.classList.toggle('active', isOpen);
		burgerButton.setAttribute('aria-expanded', String(isOpen));
	});

	// Close after clicking a link (mobile)
	navMenu.addEventListener('click', (e) => {
		const target = e.target;
		if (target && target.tagName === 'A' && navMenu.classList.contains('open')) {
			navMenu.classList.remove('open');
			burgerButton.classList.remove('active');
			burgerButton.setAttribute('aria-expanded', 'false');
		}
	});
}

// Background Music Management
function initBackgroundMusic() {
	if (!bgMusic) return;
	
	// Set initial volume and start position
	bgMusic.volume = 0.3;
	bgMusic.currentTime = 13;
	
	// Handle autoplay restrictions
	bgMusic.muted = true;
	
	// Try to start playing (will be muted initially)
	bgMusic.play().then(() => {
		console.log('Background music started (muted)');
		// Fade in volume after a delay
		setTimeout(() => {
			bgMusic.muted = false;
			bgMusic.volume = 0.3;
			bgMusicToggle.setAttribute('aria-pressed', 'true');
		}, 2000);
	}).catch(err => {
		console.log('Autoplay blocked, waiting for user interaction');
	});
}

// Background Music Toggle
if (bgMusicToggle && bgMusic) {
	bgMusicToggle.addEventListener('click', () => {
		if (bgMusic.paused) {
			bgMusic.play();
			bgMusicToggle.setAttribute('aria-pressed', 'true');
		} else {
			bgMusic.pause();
			bgMusicToggle.setAttribute('aria-pressed', 'false');
		}
		playClick();
	});
	
	// Handle music ending to ensure seamless looping
	bgMusic.addEventListener('ended', () => {
		bgMusic.currentTime = 13;
		bgMusic.play();
	});
	
	// Initialize music
	initBackgroundMusic();
}

// Smooth scroll for internal links (offset for sticky header)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function (e) {
		const id = this.getAttribute('href');
		if (!id || id === '#' || id.length < 2) return;
		const target = document.querySelector(id);
		if (target) {
			e.preventDefault();
			const top = target.getBoundingClientRect().top + window.scrollY - 64;
			window.scrollTo({ top, behavior: 'smooth' });
			playClick();
		}
	});
});

// Intersection Observer: reveal on scroll
const observer = new IntersectionObserver(
	(entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		}
	},
	{ threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form: compose mailto
const contactForm = document.getElementById('contact-form');
if (contactForm) {
	contactForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = /** @type {HTMLInputElement} */ (document.getElementById('name')).value.trim();
		const email = /** @type {HTMLInputElement} */ (document.getElementById('email')).value.trim();
		const message = /** @type {HTMLTextAreaElement} */ (document.getElementById('message')).value.trim();
		const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
		const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
		window.location.href = `mailto:shinjanverma@gmail.com?subject=${subject}&body=${body}`;
		playClick();
	});
}

// Animated canvas background: neon particles + connecting lines (mobile optimized)
const canvas = document.getElementById('hero-canvas');
if (canvas) {
	const ctx = canvas.getContext('2d');
	let width = (canvas.width = canvas.offsetWidth);
	let height = (canvas.height = canvas.offsetHeight);

	const DPR = Math.min(window.devicePixelRatio || 1, 2);
	canvas.width = Math.floor(width * DPR);
	canvas.height = Math.floor(height * DPR);
	ctx.scale(DPR, DPR);

	const colors = ['#ff2bd1', '#34a1ff', '#29ffc6', '#b039ff'];
	// Reduce particle count on mobile for better performance
	const isMobile = window.innerWidth <= 768;
	const particleCount = isMobile ? 
		Math.floor(Math.min(40, Math.max(20, width / 20))) : 
		Math.floor(Math.min(120, Math.max(60, width / 12)));
	const maxSpeed = isMobile ? 0.25 : 0.35;
	const linkDistance = isMobile ? 
		Math.min(100, Math.max(60, width / 12)) : 
		Math.min(160, Math.max(90, width / 8));

	const particles = [];
	for (let i = 0; i < particleCount; i++) {
		particles.push({
			x: Math.random() * width,
			y: Math.random() * height,
			vx: (Math.random() - 0.5) * maxSpeed,
			vy: (Math.random() - 0.5) * maxSpeed,
			r: isMobile ? Math.random() * 1.2 + 0.4 : Math.random() * 1.8 + 0.6,
			c: colors[Math.floor(Math.random() * colors.length)],
		});
	}

	let running = true;
	let frameCount = 0;

	function draw() {
		if (!running) return;
		
		// Reduce frame rate on mobile for better performance
		if (isMobile && frameCount % 2 !== 0) {
			frameCount++;
			requestAnimationFrame(draw);
			return;
		}
		frameCount++;

		ctx.clearRect(0, 0, width, height);

		// Trails background for neon feel (reduced opacity on mobile)
		const trailOpacity = isMobile ? 0.25 : 0.35;
		ctx.fillStyle = `rgba(10,11,16,${trailOpacity})`;
		ctx.fillRect(0, 0, width, height);

		// Draw links (simplified on mobile)
		if (!isMobile) {
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const a = particles[i];
					const b = particles[j];
					const dx = a.x - b.x;
					const dy = a.y - b.y;
					const d2 = dx * dx + dy * dy;
					const dist = Math.sqrt(d2);
					if (dist < linkDistance) {
						const alpha = 1 - dist / linkDistance;
						ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.25})`;
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.stroke();
					}
				}
			}
		}

		// Draw particles
		for (const p of particles) {
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
			ctx.fillStyle = p.c;
			// Reduce shadow blur on mobile
			ctx.shadowColor = p.c;
			ctx.shadowBlur = isMobile ? 6 : 12;
			ctx.fill();
			ctx.shadowBlur = 0;
		}

		// Update
		for (const p of particles) {
			p.x += p.vx;
			p.y += p.vy;
			if (p.x < -20) p.x = width + 20;
			if (p.x > width + 20) p.x = -20;
			if (p.y < -20) p.y = height + 20;
			if (p.y > height + 20) p.y = -20;
		}

		requestAnimationFrame(draw);
	}

	let rafId = requestAnimationFrame(draw);

	function resize() {
		width = canvas.offsetWidth;
		height = canvas.offsetHeight;
		canvas.width = Math.floor(width * DPR);
		canvas.height = Math.floor(height * DPR);
		ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
		
		// Recalculate particle count and positions on resize
		const newParticleCount = isMobile ? 
			Math.floor(Math.min(40, Math.max(20, width / 20))) : 
			Math.floor(Math.min(120, Math.max(60, width / 12)));
		
		// Adjust particles array if needed
		while (particles.length > newParticleCount) {
			particles.pop();
		}
		while (particles.length < newParticleCount) {
			particles.push({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * maxSpeed,
				vy: (Math.random() - 0.5) * maxSpeed,
				r: isMobile ? Math.random() * 1.2 + 0.4 : Math.random() * 1.8 + 0.6,
				c: colors[Math.floor(Math.random() * colors.length)],
			});
		}
	}

	const ro = new ResizeObserver(() => resize());
	ro.observe(canvas);

	// Pause animation when tab is hidden to save battery
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) {
			running = false;
			cancelAnimationFrame(rafId);
		} else {
			if (!running) {
				running = true;
				rAF();
			}
		}
	});

	function rAF() { rafId = requestAnimationFrame(draw); }
}

// Typing effect for Contact heading
const typingEl = document.getElementById('contact-typing');
if (typingEl) {
	const text = typingEl.getAttribute('data-text') || '';
	let i = 0;
	function type() {
		if (!typingEl) return;
		typingEl.textContent = text.slice(0, i) + (i % 2 === 0 ? '_' : '');
		i = (i + 1) % (text.length + 8);
		setTimeout(type, 120);
	}
	type();
}

// WebAudio: ambient pad and click beep (optional)
function getAudioCtx() {
	if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	return audioCtx;
}

function startAmbient() {
	const ctx = getAudioCtx();
	if (ambientGain) return; // already running
	ambientGain = ctx.createGain();
	ambientGain.gain.value = 0.02;
	ambientGain.connect(ctx.destination);

	const freqs = [120, 238, 480];
	ambientOscillators = freqs.map((f, idx) => {
		const osc = ctx.createOscillator();
		osc.type = idx === 0 ? 'sine' : 'triangle';
		osc.frequency.value = f;
		const g = ctx.createGain();
		g.gain.value = 0.3 / (idx + 1);
		osc.connect(g).connect(ambientGain);
		osc.start();
		return osc;
	});
}

function stopAmbient() {
	if (!audioCtx || !ambientGain) return;
	ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
	setTimeout(() => {
		ambientOscillators.forEach((o) => { try { o.stop(); } catch (e) {} });
		ambientOscillators = [];
		try { ambientGain.disconnect(); } catch (e) {}
		ambientGain = null;
	}, 220);
}

function playClick() {
	try {
		const ctx = getAudioCtx();
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = 'square';
		osc.frequency.setValueAtTime(700, ctx.currentTime);
		gain.gain.setValueAtTime(0.0001, ctx.currentTime);
		gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.005);
		gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
		osc.connect(gain).connect(ctx.destination);
		osc.start();
		osc.stop(ctx.currentTime + 0.09);
	} catch (e) {}
}

if (audioToggle) {
	audioToggle.addEventListener('click', async () => {
		try {
			const ctx = getAudioCtx();
			if (ctx.state === 'suspended') await ctx.resume();
			if (!ambientGain) {
				startAmbient();
				audioToggle.setAttribute('aria-pressed', 'true');
			} else {
				stopAmbient();
				audioToggle.setAttribute('aria-pressed', 'false');
			}
			playClick();
		} catch (e) {}
	});
}

// Play click for any UI button/links
document.addEventListener('click', (e) => {
	const t = e.target && (e.target.closest ? e.target.closest('.btn, .btn-primary, .nav a, .logo') : null);
	if (t) playClick();
});

// Enable background music on first user interaction
document.addEventListener('click', function enableMusic() {
	if (bgMusic && bgMusic.paused) {
		bgMusic.play().then(() => {
			bgMusic.muted = false;
			bgMusic.volume = 0.3;
			bgMusicToggle.setAttribute('aria-pressed', 'true');
		}).catch(err => console.log('Music play failed:', err));
	}
	document.removeEventListener('click', enableMusic);
}, { once: true });


