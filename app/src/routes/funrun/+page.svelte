<script lang="ts">
	import { enhance } from '$app/forms';
	import Fireworks from './Fireworks.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	let submitting = $state(false);
	let showAll = $state(false);
	let nameValue = $state('');
	let commentValue = $state('');

	const visible = $derived(showAll ? data.rsvps : data.rsvps.slice(0, 5));
	const overflow = $derived(Math.max(0, data.rsvps.length - 5));

	const firstName = (n: string) => n.split(/\s+/)[0] || n;

	const galleryPlaceholders = Array.from({ length: 8 }, (_, i) => i + 1);

	const stats = [
		{ k: 'Distance', v: '~1 mile' },
		{ k: 'Start', v: '9:00 AM sharp' },
		{ k: 'Donuts', v: 'Many' },
		{ k: 'Medals', v: 'For every finisher' },
	];

	// little patriotic confetti on submit success
	let showConfetti = $state(false);
	$effect(() => {
		if (form && 'success' in form && form.success) {
			showConfetti = true;
			nameValue = '';
			commentValue = '';
			setTimeout(() => (showConfetti = false), 2400);
		}
	});

	const confettiBits = Array.from({ length: 80 }, (_, i) => ({
		id: i,
		left: Math.random() * 100,
		delay: Math.random() * 0.4,
		duration: 1.8 + Math.random() * 1.6,
		color: ['#ff3b3b', '#4aa3ff', '#ffd84a', '#fff'][i % 4],
		rotate: Math.random() * 720 - 360,
	}));
</script>

<svelte:head>
	<title>Let Freedom Run — {data.year}</title>
	<meta
		name="description"
		content="Let Freedom Run — the Schwabauer family fun run on the 4th of July. Coffee, donuts, ridiculous opening ceremony, medals for every finisher."
	/>
</svelte:head>

<header class="hero">
	<Fireworks />
	<div class="hero-content container">
		<a class="back" href="/" aria-label="Back to the Schwabauer family home">← schwabauer.family</a>
		<p class="eyebrow">4th annual · {data.year}</p>
		<h1 class="title">
			<span>Let</span>
			<span>Freedom</span>
			<span class="run">Run</span>
		</h1>
		<p class="tagline">A one-mile, no-stakes, all-vibes family fun run.</p>
		<div class="hero-meta">
			{#each stats as s (s.k)}
				<div>
					<dt>{s.k}</dt>
					<dd>{s.v}</dd>
				</div>
			{/each}
		</div>
		<p class="click-hint" aria-hidden="true">Tap anywhere for fireworks 🎆</p>
	</div>
	<div class="bunting" aria-hidden="true">
		{#each Array(20) as _, i}
			<span class="flag" class:red={i % 3 === 0} class:white={i % 3 === 1} class:blue={i % 3 === 2}></span>
		{/each}
	</div>
</header>

<main class="page">
	<section class="container details">
		<div class="details-grid">
			<article class="about">
				<h2>What is this?</h2>
				<p>
					<strong>Let Freedom Run</strong> is our family's annual Fourth of July
					mile. It's been a thing for two years now, which by the rules of tradition
					makes it canon. The course is a flat loop at South Lake Park — bring kids,
					strollers, dogs, grandparents, and anything else that rolls or walks.
				</p>
				<p>
					Things kick off with an <em>opening ceremony</em> we take very, very
					seriously: speeches of dubious quality, a torch (a Bic lighter), and
					vaguely patriotic music played at uncomfortable volume. Then everybody
					runs. Or walks. Or strolls. Or fakes a hamstring injury near mile 0.5 —
					anything goes.
				</p>
				<p>
					Afterward: <strong>coffee, donuts, and a medal for every finisher.</strong>
					Stay as long as you want. Last year someone fell asleep on the picnic
					blanket. We're not naming names. (It was Brian.)
				</p>
			</article>

			<aside class="info-card">
				<h3>The details</h3>
				<dl>
					<dt>📅 When</dt>
					<dd>Saturday, July 4, {data.year}<br /><span>9:00 AM (be there 8:45)</span></dd>
					<dt>📍 Where</dt>
					<dd>
						<a href="https://www.google.com/maps/search/?api=1&query=South+Lake+Park+7601+W+86th+St+Overland+Park+KS+66212" target="_blank" rel="noopener">
							South Lake Park
						</a>
						<br />
						<span>7601 W 86th St, Overland Park, KS 66212</span>
					</dd>
					<dt>🅿️ Parking</dt>
					<dd>Lot off 86th St. Overflow on the street.</dd>
					<dt>⛺ Shelter</dt>
					<dd>TBD — look for red, white, and blue balloons.</dd>
					<dt>💰 Cost</dt>
					<dd>Free. Bring a folding chair if you have one.</dd>
				</dl>
			</aside>
		</div>

		<div class="schedule">
			<h3>Rough timeline</h3>
			<ol>
				<li><b>8:45</b> Check-in & last-second stretching of suspect quality</li>
				<li><b>9:00</b> Opening ceremony — anthem, speeches, an unauthorized cannon (toy)</li>
				<li><b>9:15</b> Race! Approximately 1 mile, almost certainly</li>
				<li><b>9:35</b> Medal ceremony — every finisher gets one. Yes, every.</li>
				<li><b>9:45</b> Coffee, donuts, lawn-chair philosophy</li>
				<li><b>10:30</b> Disperse, nap, prepare for evening fireworks</li>
			</ol>
		</div>
	</section>

	<section class="container rsvp">
		<div class="rsvp-grid">
			<div class="rsvp-form-wrap">
				<h2>Let us know you're coming</h2>
				<p class="rsvp-sub">
					Helps us know how many donuts to buy. (Answer is always "more.") We'll only show your first name publicly.
				</p>

				<form
					method="POST"
					class="rsvp-form"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							await update({ reset: false });
							submitting = false;
						};
					}}
				>
					<label class="field">
						<span>Your name</span>
						<input
							name="name"
							type="text"
							maxlength="80"
							required
							placeholder="Brian Schwabauer"
							autocomplete="name"
							bind:value={nameValue}
						/>
					</label>
					<label class="field">
						<span>Anything to add? <small>(optional)</small></span>
						<textarea
							name="comment"
							maxlength="250"
							placeholder="Bringing 3 kids and an irrational competitive streak."
							rows="3"
							bind:value={commentValue}
						></textarea>
						<small class="counter">{commentValue.length} / 250</small>
					</label>

					{#if form && 'error' in form && form.error}
						<p class="form-error">{form.error}</p>
					{/if}

					<button type="submit" class="submit" disabled={submitting}>
						{submitting ? 'Saving…' : "I'll be there"}
					</button>
				</form>
			</div>

			<div class="rsvp-list">
				<h3>
					Who's in
					<span class="count">{data.total}</span>
				</h3>

				{#if data.rsvps.length === 0}
					<p class="empty">Nobody yet. Be the first! Donuts are at stake.</p>
				{:else}
					<ul>
						{#each visible as r (r.id)}
							<li>
								<div class="r-name">{firstName(r.name)}</div>
								{#if r.comment}
									<div class="r-comment">"{r.comment}"</div>
								{/if}
							</li>
						{/each}
					</ul>
					{#if !showAll && overflow > 0}
						<button type="button" class="more" onclick={() => (showAll = true)}>
							+{overflow} more
						</button>
					{:else if showAll && data.rsvps.length > 5}
						<button type="button" class="more" onclick={() => (showAll = false)}>
							Show fewer
						</button>
					{/if}
				{/if}
			</div>
		</div>
	</section>

	<section class="container gallery">
		<header class="gallery-head">
			<h2>From years past</h2>
			<p>Drop new photos into <code>/static/funrun/{data.year - 1}/</code> and they'll appear here next year.</p>
		</header>
		<div class="gallery-grid">
			{#each galleryPlaceholders as i (i)}
				<figure class="g-tile" style="--i: {i}">
					<div class="g-placeholder">
						<svg viewBox="0 0 100 100" aria-hidden="true">
							<rect width="100" height="100" rx="6" fill="none" />
							<circle cx="70" cy="32" r="10" fill="currentColor" opacity="0.4" />
							<path d="M10 80 L35 55 L55 70 L75 50 L90 75 L90 90 L10 90 Z" fill="currentColor" opacity="0.55" />
						</svg>
						<span>Photo coming soon</span>
					</div>
				</figure>
			{/each}
		</div>
	</section>

	<section class="container fineprint">
		<h2>The fine print, sort of</h2>
		<ul>
			<li>🐕 Leashed dogs welcome — the smaller, the better.</li>
			<li>🚼 Strollers are encouraged. The bumpier the better — strengthens the soul.</li>
			<li>🎽 No bibs, no timing chips, no clocks. We will guess your time generously.</li>
			<li>🌧️ Rain plan: same place, same time, more wet. Donuts undeterred.</li>
			<li>🎤 If you'd like to give an opening-ceremony speech, just show up with notes. We trust you.</li>
		</ul>
	</section>

	<footer class="end">
		<div class="container end-inner">
			<p>See you on the 4th. 🇺🇸</p>
			<a href="/" class="end-link">← Back to schwabauer.family</a>
		</div>
	</footer>
</main>

{#if showConfetti}
	<div class="confetti-wrap" aria-hidden="true">
		{#each confettiBits as b (b.id)}
			<span
				class="bit"
				style="left: {b.left}%; background: {b.color}; animation-delay: {b.delay}s; animation-duration: {b.duration}s; --r: {b.rotate}deg;"
			></span>
		{/each}
	</div>
{/if}

<style>
	.hero {
		position: relative;
		min-height: clamp(560px, 92dvh, 900px);
		isolation: isolate;
		overflow: hidden;
		color: #fff;
	}
	.hero-content {
		position: relative;
		z-index: 2;
		display: grid;
		gap: 1.5rem;
		padding-block: clamp(2.5rem, 8vw, 5rem);
		pointer-events: none;
	}
	.hero-content > * { pointer-events: auto; }
	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.85rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.7);
		background: rgba(0, 0, 0, 0.25);
		padding: 0.4rem 0.85rem;
		border-radius: var(--radius-pill);
		backdrop-filter: blur(8px);
		width: max-content;
	}
	.back:hover { color: #fff; }
	.eyebrow {
		text-transform: uppercase;
		letter-spacing: 0.25em;
		font-size: 0.8rem;
		font-weight: 600;
		color: #ffd84a;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
	}
	.title {
		font-family: var(--font-display);
		font-size: clamp(4rem, 18vw, 13rem);
		font-weight: 900;
		line-height: 0.86;
		letter-spacing: -0.05em;
		display: flex;
		flex-direction: column;
		text-shadow:
			0 6px 30px rgba(0, 0, 0, 0.5),
			0 2px 0 rgba(0, 0, 0, 0.3);
		font-variation-settings: 'opsz' 144;
	}
	.title span:nth-child(1) { color: #fff; font-style: italic; font-weight: 600; font-size: 0.55em; }
	.title span:nth-child(2) { color: #fff; }
	.title .run {
		color: #ffd84a;
		font-style: italic;
		font-size: 1.1em;
		margin-top: -0.05em;
		display: inline-block;
		transform-origin: left center;
		animation: run-tilt 4s ease-in-out infinite;
	}
	@keyframes run-tilt {
		0%, 100% { transform: rotate(-2deg) translateX(0); }
		50% { transform: rotate(1deg) translateX(0.5rem); }
	}
	.tagline {
		font-size: clamp(1.05rem, 2vw, 1.4rem);
		color: rgba(255, 255, 255, 0.9);
		max-width: 36ch;
		font-style: italic;
		font-family: var(--font-display);
		font-weight: 400;
	}
	.hero-meta {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 0.85rem;
		margin-top: 1rem;
		max-width: 720px;
	}
	.hero-meta > div {
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: var(--radius);
		padding: 0.85rem 1rem;
		backdrop-filter: blur(10px);
	}
	.hero-meta dt {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		opacity: 0.8;
		font-weight: 600;
	}
	.hero-meta dd {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 700;
	}
	.click-hint {
		font-size: 0.85rem;
		opacity: 0.7;
		margin-top: 1rem;
		font-style: italic;
		animation: pulse 2.2s ease-in-out infinite;
	}
	@keyframes pulse {
		0%, 100% { opacity: 0.4; }
		50% { opacity: 0.9; }
	}

	.bunting {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-evenly;
		pointer-events: none;
		z-index: 1;
	}
	.flag {
		display: block;
		width: 26px;
		height: 36px;
		clip-path: polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%);
		transform-origin: top center;
		animation: sway 4s ease-in-out infinite;
		animation-delay: var(--d, 0s);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
	}
	.flag.red { background: #c03128; }
	.flag.white { background: #fbf6ec; }
	.flag.blue { background: #16486f; }
	.flag:nth-child(2n) { --d: 0.2s; }
	.flag:nth-child(3n) { --d: 0.5s; }
	.flag:nth-child(5n) { --d: 0.8s; }
	@keyframes sway {
		0%, 100% { transform: rotate(-3deg); }
		50% { transform: rotate(3deg); }
	}

	.page {
		background: var(--c-paper);
	}

	.details {
		padding-block: clamp(3rem, 6vw, 5rem);
	}
	.details-grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: 1fr;
	}
	@media (min-width: 880px) {
		.details-grid {
			grid-template-columns: 1.6fr 1fr;
			align-items: start;
		}
	}
	.about h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		margin-bottom: 1rem;
	}
	.about p {
		font-size: 1.07rem;
		color: var(--c-ink-soft);
		margin-bottom: 1rem;
		max-width: 60ch;
	}
	.info-card {
		background: var(--c-cream);
		border: 1px solid var(--c-line);
		border-radius: var(--radius-lg);
		padding: 1.75rem;
		box-shadow: var(--c-shadow);
		position: sticky;
		top: 1.5rem;
	}
	.info-card h3 {
		font-size: 1.3rem;
		margin-bottom: 1rem;
		font-family: var(--font-display);
		font-style: italic;
	}
	.info-card dl {
		display: grid;
		gap: 0.75rem;
		margin: 0;
	}
	.info-card dt {
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--c-ink-mute);
		font-weight: 700;
		margin-top: 0.6rem;
	}
	.info-card dt:first-child { margin-top: 0; }
	.info-card dd {
		margin: 0;
		font-size: 1rem;
	}
	.info-card dd span { color: var(--c-ink-mute); font-size: 0.92rem; }
	.info-card a { text-decoration: underline; text-underline-offset: 3px; }

	.schedule {
		margin-top: 3rem;
		padding: 1.75rem;
		border-radius: var(--radius-lg);
		background: linear-gradient(135deg, var(--c-blue-deep), var(--c-blue));
		color: var(--c-on-color);
		box-shadow: var(--c-shadow);
	}
	.schedule h3 {
		color: var(--c-gold-soft);
		font-size: 1.3rem;
		font-family: var(--font-display);
		font-style: italic;
		margin-bottom: 1rem;
	}
	.schedule ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.6rem;
	}
	.schedule li {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;
		align-items: baseline;
		padding-block: 0.35rem;
		border-bottom: 1px dashed rgba(255, 255, 255, 0.12);
	}
	.schedule li:last-child { border-bottom: none; }
	.schedule b {
		font-family: var(--font-display);
		font-weight: 700;
		color: var(--c-gold);
		font-size: 1.1rem;
		min-width: 3.5ch;
	}

	.rsvp {
		padding-block: clamp(3rem, 6vw, 5rem);
		background:
			linear-gradient(180deg, transparent, color-mix(in oklab, var(--c-paper-2) 70%, transparent));
	}
	.rsvp-grid {
		display: grid;
		gap: 2.5rem;
		grid-template-columns: 1fr;
	}
	@media (min-width: 880px) {
		.rsvp-grid {
			grid-template-columns: 1.1fr 1fr;
			align-items: start;
		}
	}
	.rsvp-form-wrap h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		margin-bottom: 0.5rem;
	}
	.rsvp-sub { color: var(--c-ink-mute); margin-bottom: 1.5rem; max-width: 50ch; }

	.rsvp-form { display: grid; gap: 1.1rem; }
	.field { display: grid; gap: 0.4rem; }
	.field > span {
		font-weight: 600;
		font-size: 0.92rem;
	}
	.field small { color: var(--c-ink-mute); font-weight: 400; }
	.field input, .field textarea {
		width: 100%;
		padding: 0.85rem 1rem;
		border-radius: var(--radius);
		border: 1.5px solid var(--c-line);
		background: var(--c-cream);
		transition: border-color 160ms, box-shadow 160ms;
		resize: vertical;
	}
	.field input:focus, .field textarea:focus {
		outline: none;
		border-color: var(--c-ink);
		box-shadow: 0 0 0 4px color-mix(in oklab, var(--c-ink) 14%, transparent);
	}
	.counter {
		justify-self: end;
		font-size: 0.78rem;
		color: var(--c-ink-mute);
	}
	.form-error {
		background: light-dark(#fde2e0, #3a1410);
		color: light-dark(#8b1f1a, #ffb8b3);
		border: 1px solid light-dark(#f1b8b4, #5a1d18);
		padding: 0.65rem 0.85rem;
		border-radius: var(--radius);
		font-size: 0.92rem;
		font-weight: 500;
	}
	.submit {
		justify-self: start;
		padding: 1rem 2rem;
		border-radius: var(--radius-pill);
		background: linear-gradient(135deg, var(--c-red), var(--c-red-deep));
		color: #fff;
		font-weight: 700;
		letter-spacing: 0.02em;
		font-size: 1.05rem;
		box-shadow: var(--c-shadow);
		transition: transform 180ms var(--ease-out), box-shadow 180ms;
	}
	.submit:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: var(--c-shadow-lg);
	}
	.submit:disabled { opacity: 0.7; cursor: progress; }

	.rsvp-list {
		background: var(--c-cream);
		border: 1px solid var(--c-line);
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		box-shadow: var(--c-shadow);
	}
	.rsvp-list h3 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 1.2rem;
		font-family: var(--font-display);
		font-style: italic;
		margin-bottom: 1rem;
	}
	.rsvp-list .count {
		font-family: var(--font-body);
		font-style: normal;
		font-size: 0.85rem;
		background: var(--c-red);
		color: var(--c-on-color);
		padding: 0.15rem 0.65rem;
		border-radius: var(--radius-pill);
		font-weight: 700;
	}
	.rsvp-list ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.85rem;
	}
	.rsvp-list li {
		padding: 0.75rem 0.85rem;
		border-radius: var(--radius);
		background: var(--c-paper);
		border: 1px solid var(--c-line);
		animation: fade-up 400ms var(--ease-out) both;
	}
	.r-name { font-weight: 700; font-family: var(--font-display); }
	.r-comment { font-size: 0.92rem; color: var(--c-ink-soft); margin-top: 0.15rem; font-style: italic; }
	.more {
		margin-top: 1rem;
		width: 100%;
		padding: 0.65rem 0.85rem;
		border: 1.5px dashed var(--c-line);
		border-radius: var(--radius);
		color: var(--c-ink-mute);
		font-weight: 600;
		transition: background 160ms, color 160ms;
	}
	.more:hover { background: var(--c-paper-2); color: var(--c-ink); }
	.empty {
		color: var(--c-ink-mute);
		font-style: italic;
		font-size: 0.95rem;
	}
	@keyframes fade-up {
		from { opacity: 0; transform: translateY(8px); }
		to { opacity: 1; transform: none; }
	}

	.gallery { padding-block: clamp(3rem, 6vw, 5rem); }
	.gallery-head { margin-bottom: 1.5rem; }
	.gallery-head h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); }
	.gallery-head p { color: var(--c-ink-mute); margin-top: 0.4rem; font-size: 0.92rem; }
	.gallery-head code {
		background: var(--c-paper-2);
		padding: 0.1em 0.45em;
		border-radius: 4px;
		font-family: ui-monospace, SFMono-Regular, monospace;
		font-size: 0.85em;
	}
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 0.8rem;
	}
	.g-tile {
		margin: 0;
		aspect-ratio: 4/3;
		border-radius: var(--radius);
		overflow: hidden;
		background: var(--c-paper-2);
		border: 1px solid var(--c-line);
	}
	.g-tile:nth-child(3n) { aspect-ratio: 1/1; }
	.g-tile:nth-child(5n) { aspect-ratio: 3/4; }
	.g-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		color: var(--c-line);
	}
	.g-placeholder svg { width: 40%; height: auto; color: var(--c-ink-mute); opacity: 0.6; }
	.g-placeholder span {
		font-size: 0.78rem;
		color: var(--c-ink-mute);
		font-style: italic;
	}

	.fineprint { padding-block: clamp(2.5rem, 5vw, 4rem); }
	.fineprint h2 {
		font-size: clamp(1.6rem, 3vw, 2.4rem);
		font-style: italic;
		font-family: var(--font-display);
		font-weight: 400;
		color: var(--c-ink-mute);
		margin-bottom: 1rem;
	}
	.fineprint ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.65rem;
	}
	.fineprint li {
		padding: 0.85rem 1rem;
		background: var(--c-cream);
		border: 1px solid var(--c-line);
		border-radius: var(--radius);
		font-size: 0.98rem;
	}

	.end {
		border-top: 1px solid var(--c-line);
		padding-block: 2rem;
		background: var(--c-paper-2);
	}
	.end-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.end p { font-family: var(--font-display); font-style: italic; font-size: 1.2rem; }
	.end-link { color: var(--c-ink-mute); }
	.end-link:hover { color: var(--c-ink); text-decoration: underline; }

	.confetti-wrap {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 50;
		overflow: hidden;
	}
	.bit {
		position: absolute;
		top: -10px;
		width: 8px;
		height: 14px;
		border-radius: 1px;
		animation: confetti-fall linear forwards;
	}
	@keyframes confetti-fall {
		to {
			transform: translateY(110vh) rotate(var(--r));
			opacity: 0.7;
		}
	}
</style>
