<script lang="ts">
  const year = new Date().getFullYear();
</script>

<svelte:head>
  <title>The Schwabauer Family</title>
</svelte:head>

<main>
  <section class="hero">
    <div class="hero-inner container">
      <h1>
        <span class="the">The</span>
        <span class="name">Schwabauer</span>
        <span class="family">Family</span>
      </h1>
    </div>

    <svg
      class="hero-divider"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
      />
    </svg>
  </section>

  <section class="cta container">
    <a
      class="cta-card"
      href="/funrun"
      aria-label="Let Freedom Run — 4th of July fun run details"
    >
      <div class="cta-tape" aria-hidden="true">
        <span>Coming July 4</span><span>Coming July 4</span><span
          >Coming July 4</span
        >
      </div>
      <div class="cta-body">
        <p class="kicker">Annual event · 3rd year running</p>
        <h2>Let Freedom Run</h2>
        <p>
          A one-mile family fun run, an utterly ridiculous opening ceremony,
          finisher medals, and donuts. RSVP →
        </p>
      </div>
      <div class="cta-star" aria-hidden="true">
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <polygon
            points="50,4 61,38 96,38 67,59 78,93 50,72 22,93 33,59 4,38 39,38"
            fill="currentColor"
          />
        </svg>
      </div>
    </a>
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
      radial-gradient(
        80% 60% at 80% 0%,
        color-mix(in oklab, var(--c-gold-soft) 35%, transparent),
        transparent 60%
      ),
      radial-gradient(
        60% 50% at 0% 30%,
        color-mix(in oklab, var(--c-blue) 12%, transparent),
        transparent 60%
      ),
      var(--c-paper);
    overflow: hidden;
  }
  .hero-inner {
    display: grid;
    gap: clamp(2rem, 5vw, 3.5rem);
    padding-block-end: clamp(3rem, 6vw, 5rem);
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
    font-variation-settings: "opsz" 14;
    margin-bottom: 0.2em;
  }
  h1 .name {
    font-weight: 900;
    color: var(--c-ink);
    font-variation-settings: "opsz" 144;
  }
  h1 .family {
    font-style: italic;
    font-weight: 600;
    font-size: 0.8em;
    color: var(--c-red-deep);
    font-variation-settings: "opsz" 96;
    margin-top: -0.1em;
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
    grid-template-columns: 1fr;
    align-items: center;
    gap: 1.5rem;
    padding: 4.5rem clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 4vw, 2.5rem);
    border-radius: var(--radius-lg);
    background: linear-gradient(
      135deg,
      var(--c-red) 0%,
      var(--c-red-deep) 60%,
      var(--c-blue-deep) 100%
    );
    color: var(--c-on-color);
    overflow: hidden;
    box-shadow: var(--c-shadow-lg);
    transition:
      transform 220ms var(--ease-out),
      box-shadow 220ms var(--ease-out);
  }
  .cta-card:hover {
    transform: translateY(-3px);
  }
  .cta-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(
        circle at 20% 30%,
        rgba(255, 255, 255, 0.16) 0 1px,
        transparent 2px
      ),
      radial-gradient(
        circle at 70% 60%,
        rgba(255, 255, 255, 0.12) 0 1px,
        transparent 2px
      ),
      radial-gradient(
        circle at 40% 80%,
        rgba(255, 255, 255, 0.1) 0 1px,
        transparent 2px
      );
    background-size:
      36px 36px,
      52px 52px,
      28px 28px;
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
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    padding: 0.3rem 4rem;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .cta-tape span:nth-child(n + 2) {
    display: none;
  }
  @media (min-width: 560px) {
    .cta-tape {
      font-size: 0.78rem;
      letter-spacing: 0.18em;
      padding: 0.35rem 4rem;
    }
    .cta-tape span:nth-child(n + 2) {
      display: inline;
    }
  }
  .cta-body {
    z-index: 1;
  }
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
    width: clamp(72px, 22vw, 96px);
    justify-self: end;
    color: var(--c-gold);
    opacity: 0.85;
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25));
    animation: slow-spin 30s linear infinite;
    line-height: 0;
  }
  @keyframes slow-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (min-width: 560px) {
    .cta-card {
      grid-template-columns: 1fr auto;
      padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 3rem);
    }
    .cta-star {
      width: 120px;
      justify-self: auto;
    }
  }

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
  .foot a:hover {
    color: var(--c-ink);
    text-decoration: underline;
  }
</style>
