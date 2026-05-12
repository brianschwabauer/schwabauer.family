<script lang="ts">
	const year = new Date().getFullYear();
</script>

<svelte:head>
	<title>The Schwabauer Family</title>
</svelte:head>

<main>
	<section class="hero">
		<div class="hero-inner container">
			<p class="eyebrow">Est. some good while ago · Kansas City</p>
			<h1>
				<span class="the">The</span>
				<span class="name">Schwabauer</span>
				<span class="family">Family</span>
			</h1>
			<p class="lede">
				A small private corner of the internet for the people we love —
				stories, pictures, and the occasional excuse to put on running shoes.
			</p>

			<figure class="portrait">
				<img
					src="/family/family.svg"
					alt="The Schwabauer family. (Drop a real photo in at /static/family/family.jpg to replace.)"
					width="1200"
					height="800"
					loading="eager"
					decoding="async"
				/>
				<figcaption>The Schwabauers — {year}</figcaption>
			</figure>
		</div>

		<svg class="hero-divider" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
			<path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
		</svg>
	</section>

	<section class="cta container">
		<a class="cta-card" href="/funrun" aria-label="Let Freedom Run — 4th of July fun run details">
			<div class="cta-tape" aria-hidden="true">
				<span>Coming July 4</span><span>Coming July 4</span><span>Coming July 4</span>
			</div>
			<div class="cta-body">
				<p class="kicker">Annual event · 3rd year running</p>
				<h2>Let Freedom Run</h2>
				<p>A one-mile family fun run, an utterly ridiculous opening ceremony, finisher medals, and donuts. RSVP →</p>
			</div>
			<div class="cta-star" aria-hidden="true">
				<svg viewBox="0 0 100 100" width="120" height="120">
					<polygon
						points="50,4 61,38 96,38 67,59 78,93 50,72 22,93 33,59 4,38 39,38"
						fill="currentColor"
					/>
				</svg>
			</div>
		</a>
	</section>

	<section class="teaser container">
		<h3>Coming soon, slowly</h3>
		<ul>
			<li>
				<span class="dot dot-1"></span>
				<div>
					<strong>Photos & stories</strong>
					<p>A quiet, sign-in-only spot for the moments we'd rather not put on the public internet.</p>
				</div>
			</li>
			<li>
				<span class="dot dot-2"></span>
				<div>
					<strong>Birthdays & milestones</strong>
					<p>So distant relatives stop accidentally missing them.</p>
				</div>
			</li>
			<li>
				<span class="dot dot-3"></span>
				<div>
					<strong>Whatever Brian feels like building next</strong>
					<p>This domain has been sitting unused for a year. The streak ends today.</p>
				</div>
			</li>
		</ul>
	</section>

	<footer class="foot">
		<div class="container foot-inner">
			<p>© {year} the Schwabauers. Made with love in Kansas.</p>
			<p><a href="/funrun">Fun Run {year}</a></p>
		</div>
	</footer>
</main>

<style>
	main {
		min-height: 100dvh;
	}

	.hero {
		position: relative;
		padding-block: clamp(3rem, 8vw, 6rem) 0;
		background:
			radial-gradient(80% 60% at 80% 0%, color-mix(in oklab, var(--c-gold-soft) 35%, transparent), transparent 60%),
			radial-gradient(60% 50% at 0% 30%, color-mix(in oklab, var(--c-blue) 12%, transparent), transparent 60%),
			var(--c-paper);
		overflow: hidden;
	}
	.hero-inner {
		display: grid;
		gap: clamp(2rem, 5vw, 3.5rem);
	}
	.eyebrow {
		font-family: var(--font-body);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 0.78rem;
		color: var(--c-ink-mute);
		font-weight: 600;
	}

	h1 {
		display: grid;
		gap: 0;
		font-size: clamp(3.2rem, 14vw, 9rem);
		letter-spacing: -0.04em;
		line-height: 0.88;
	}
	h1 .the {
		font-style: italic;
		font-weight: 400;
		font-size: 0.5em;
		color: var(--c-ink-mute);
		font-variation-settings: 'opsz' 14;
		margin-bottom: 0.2em;
	}
	h1 .name {
		font-weight: 900;
		color: var(--c-ink);
		font-variation-settings: 'opsz' 144;
	}
	h1 .family {
		font-style: italic;
		font-weight: 600;
		font-size: 0.8em;
		color: var(--c-red-deep);
		font-variation-settings: 'opsz' 96;
		margin-top: -0.1em;
	}

	.lede {
		font-size: clamp(1.05rem, 1.5vw, 1.2rem);
		color: var(--c-ink-soft);
		max-width: 48ch;
	}

	.portrait {
		margin: 0;
		position: relative;
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--c-shadow-lg);
		aspect-ratio: 16/10;
		max-height: 60dvh;
		transform: rotate(-0.6deg);
	}
	.portrait img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.portrait figcaption {
		position: absolute;
		left: 1.5rem;
		bottom: 1.5rem;
		background: var(--c-cream);
		color: var(--c-ink);
		padding: 0.4rem 0.85rem;
		border-radius: var(--radius-pill);
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		box-shadow: var(--c-shadow);
	}
	.portrait::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 60%, rgba(10, 37, 64, 0.18));
		pointer-events: none;
	}

	.hero-divider {
		display: block;
		width: 100%;
		height: 60px;
		margin-top: -1px;
		fill: var(--c-paper-2);
	}

	.cta {
		padding-block: clamp(3rem, 6vw, 5rem);
		background: var(--c-paper-2);
	}
	.cta-card {
		position: relative;
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 1.5rem;
		padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 3rem);
		border-radius: var(--radius-lg);
		background:
			linear-gradient(135deg, var(--c-red) 0%, var(--c-red-deep) 60%, var(--c-blue-deep) 100%);
		color: var(--c-on-color);
		overflow: hidden;
		box-shadow: var(--c-shadow-lg);
		transition: transform 220ms var(--ease-out), box-shadow 220ms var(--ease-out);
	}
	.cta-card:hover { transform: translateY(-3px); }
	.cta-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image:
			radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.16) 0 1px, transparent 2px),
			radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.12) 0 1px, transparent 2px),
			radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0 1px, transparent 2px);
		background-size: 36px 36px, 52px 52px, 28px 28px;
		opacity: 0.6;
		pointer-events: none;
	}
	.cta-tape {
		position: absolute;
		top: 1.1rem;
		right: -3rem;
		transform: rotate(8deg);
		display: flex;
		gap: 1rem;
		background: var(--c-gold);
		color: var(--c-ink);
		font-weight: 700;
		font-size: 0.78rem;
		letter-spacing: 0.18em;
		padding: 0.35rem 4rem;
		text-transform: uppercase;
	}
	.cta-body { z-index: 1; }
	.cta-body .kicker {
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 0.78rem;
		opacity: 0.8;
		font-weight: 600;
	}
	.cta-body h2 {
		font-size: clamp(2rem, 5vw, 3.2rem);
		margin-block: 0.5rem;
	}
	.cta-body p {
		max-width: 50ch;
		opacity: 0.9;
	}
	.cta-star {
		color: var(--c-gold);
		opacity: 0.85;
		filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25));
		animation: slow-spin 30s linear infinite;
	}
	@keyframes slow-spin {
		to { transform: rotate(360deg); }
	}

	.teaser {
		padding-block: clamp(3rem, 7vw, 5rem);
	}
	.teaser h3 {
		font-size: clamp(1.4rem, 3vw, 1.9rem);
		margin-bottom: 1.5rem;
		color: var(--c-ink-mute);
		font-style: italic;
		font-weight: 400;
	}
	.teaser ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.5rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.teaser li {
		display: flex;
		gap: 1rem;
		padding: 1.25rem;
		border: 1px solid var(--c-line);
		border-radius: var(--radius);
		background: var(--c-cream);
	}
	.teaser strong {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.1rem;
		display: block;
		margin-bottom: 0.25rem;
	}
	.teaser p {
		color: var(--c-ink-soft);
		font-size: 0.95rem;
	}
	.dot {
		flex-shrink: 0;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		margin-top: 0.55rem;
	}
	.dot-1 { background: var(--c-red); }
	.dot-2 { background: var(--c-blue); }
	.dot-3 { background: var(--c-gold); }

	.foot {
		border-top: 1px solid var(--c-line);
		padding-block: 1.5rem;
		font-size: 0.85rem;
		color: var(--c-ink-mute);
	}
	.foot-inner {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.foot a:hover { color: var(--c-ink); text-decoration: underline; }

	@media (min-width: 880px) {
		.hero-inner {
			grid-template-columns: 1.05fr 1fr;
			align-items: end;
			padding-block-end: clamp(3rem, 6vw, 5rem);
		}
		.portrait {
			align-self: stretch;
			max-height: none;
		}
	}
</style>
