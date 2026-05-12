<script lang="ts">
	import { onMount } from 'svelte';

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		life: number;
		max: number;
		color: string;
		size: number;
		trail: { x: number; y: number }[];
	}

	interface Rocket {
		x: number;
		y: number;
		vx: number;
		vy: number;
		targetY: number;
		color: string;
		trail: { x: number; y: number }[];
	}

	let canvas: HTMLCanvasElement;
	let raf = 0;
	let particles: Particle[] = [];
	let rockets: Rocket[] = [];
	let width = $state(0);
	let height = $state(0);

	const palette = [
		['#ff3b3b', '#ff8a4a'],
		['#4aa3ff', '#a3d2ff'],
		['#ffd84a', '#fff0a0'],
		['#ff5dc8', '#ffafe1'],
		['#9bff7a', '#dcffba'],
		['#fffbe8', '#ffe9c2'],
	];

	function rand(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}

	function pickPalette() {
		return palette[Math.floor(Math.random() * palette.length)];
	}

	function launch(targetX: number, targetY: number) {
		const colors = pickPalette();
		rockets.push({
			x: targetX + rand(-30, 30),
			y: height + 10,
			vx: rand(-1.2, 1.2),
			vy: rand(-13, -10),
			targetY,
			color: colors[0],
			trail: [],
		});
	}

	function burst(x: number, y: number) {
		const [a, b] = pickPalette();
		const count = Math.floor(rand(60, 110));
		const speed = rand(2.5, 5);
		const type = Math.random();
		for (let i = 0; i < count; i++) {
			let vx: number;
			let vy: number;
			if (type < 0.55) {
				// circular burst
				const angle = (Math.PI * 2 * i) / count + rand(-0.1, 0.1);
				const s = speed * rand(0.6, 1.2);
				vx = Math.cos(angle) * s;
				vy = Math.sin(angle) * s;
			} else if (type < 0.85) {
				// ring
				const angle = (Math.PI * 2 * i) / count;
				vx = Math.cos(angle) * speed;
				vy = Math.sin(angle) * speed;
			} else {
				// chaotic spray
				vx = rand(-speed, speed);
				vy = rand(-speed, speed);
			}
			particles.push({
				x,
				y,
				vx,
				vy,
				life: 0,
				max: rand(60, 110),
				color: Math.random() < 0.5 ? a : b,
				size: rand(1.4, 2.8),
				trail: [],
			});
		}
		// a couple of "stars" that linger
		for (let i = 0; i < 8; i++) {
			particles.push({
				x,
				y,
				vx: rand(-0.6, 0.6),
				vy: rand(-0.6, 0.6),
				life: 0,
				max: rand(110, 160),
				color: '#fff7d6',
				size: rand(2.2, 3.4),
				trail: [],
			});
		}
	}

	function spawnRandom() {
		if (rockets.length > 4 || particles.length > 600) return;
		launch(rand(width * 0.1, width * 0.9), rand(height * 0.15, height * 0.55));
	}

	function resize() {
		if (!canvas) return;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const rect = canvas.getBoundingClientRect();
		width = rect.width;
		height = rect.height;
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		const ctx = canvas.getContext('2d');
		ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	function tick() {
		const ctx = canvas?.getContext('2d');
		if (!ctx) return;
		// translucent fade for trails
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillStyle = 'rgba(6, 12, 30, 0.22)';
		ctx.fillRect(0, 0, width, height);

		ctx.globalCompositeOperation = 'lighter';

		// rockets
		for (let i = rockets.length - 1; i >= 0; i--) {
			const r = rockets[i];
			r.trail.push({ x: r.x, y: r.y });
			if (r.trail.length > 8) r.trail.shift();
			r.vy += 0.18;
			r.x += r.vx;
			r.y += r.vy;
			for (let t = 0; t < r.trail.length; t++) {
				const p = r.trail[t];
				const alpha = t / r.trail.length;
				ctx.fillStyle = `rgba(255, 240, 200, ${alpha * 0.7})`;
				ctx.beginPath();
				ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
				ctx.fill();
			}
			if (r.vy >= -2 || r.y <= r.targetY) {
				burst(r.x, r.y);
				rockets.splice(i, 1);
			}
		}

		// particles
		const grav = 0.045;
		const drag = 0.985;
		for (let i = particles.length - 1; i >= 0; i--) {
			const p = particles[i];
			p.life++;
			p.vy += grav;
			p.vx *= drag;
			p.vy *= drag;
			p.x += p.vx;
			p.y += p.vy;
			p.trail.push({ x: p.x, y: p.y });
			if (p.trail.length > 5) p.trail.shift();
			const alpha = 1 - p.life / p.max;
			if (alpha <= 0) {
				particles.splice(i, 1);
				continue;
			}
			ctx.fillStyle = `${p.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size * (0.6 + alpha * 0.6), 0, Math.PI * 2);
			ctx.fill();
		}

		// random auto-launch
		if (Math.random() < 0.025) spawnRandom();

		raf = requestAnimationFrame(tick);
	}

	function handleClick(e: MouseEvent) {
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		burst(x, y);
		// also launch one rocket toward that point for fun
		launch(x, y);
	}

	function handleTouch(e: TouchEvent) {
		const rect = canvas.getBoundingClientRect();
		for (const t of Array.from(e.touches)) {
			burst(t.clientX - rect.left, t.clientY - rect.top);
		}
	}

	onMount(() => {
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);
		// initial volley
		for (let i = 0; i < 3; i++) setTimeout(spawnRandom, i * 250);
		raf = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	});
</script>

<canvas
	bind:this={canvas}
	onclick={handleClick}
	ontouchstart={handleTouch}
	aria-hidden="true"
></canvas>

<style>
	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
		background: linear-gradient(180deg, #06122e 0%, #11233f 70%, #1c2f4f 100%);
		cursor: crosshair;
	}
</style>
