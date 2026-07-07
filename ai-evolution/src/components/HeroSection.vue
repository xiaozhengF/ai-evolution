<script setup>
import ParticleCanvas from "./ParticleCanvas.vue";

defineProps({
  hero: { type: Object, required: true },
  theme: { type: String, required: true },
});
</script>

<template>
  <section id="home" class="hero section-full" aria-labelledby="heroTitle">
    <ParticleCanvas :theme="theme" />
    <div class="hero-image" aria-hidden="true"></div>
    <div class="grid-overlay" aria-hidden="true"></div>
    <div class="aurora aurora-one" aria-hidden="true"></div>
    <div class="aurora aurora-two" aria-hidden="true"></div>

    <div class="hero-content reveal" v-reveal>
      <p class="eyebrow">
        <svg><use href="#icon-spark" /></svg>
        <span>{{ hero.eyebrow }}</span>
      </p>
      <h1 id="heroTitle" class="hero-title">{{ hero.title }}</h1>
      <p class="hero-subtitle">{{ hero.subtitle }}</p>
      <div class="hero-actions" :aria-label="hero.actionsAriaLabel">
        <a class="button primary" href="#timeline">
          <span>{{ hero.exploreLabel }}</span>
          <svg><use href="#icon-arrow" /></svg>
        </a>
        <a class="button ghost" href="#timeline">
          <svg><use href="#icon-play" /></svg>
          <span>{{ hero.timelineLabel }}</span>
        </a>
      </div>
      <dl class="hero-stats" :aria-label="hero.statsAriaLabel">
        <div v-for="stat in hero.stats" :key="stat.year + stat.label">
          <dt>{{ stat.year }}</dt>
          <dd>{{ stat.label }}</dd>
        </div>
      </dl>
    </div>

    <a class="scroll-hint" href="#timeline" :aria-label="hero.scrollLabel">
      <svg><use href="#icon-arrow" /></svg>
    </a>
  </section>
</template>
