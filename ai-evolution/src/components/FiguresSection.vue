<script setup>
defineProps({
  figures: { type: Object, required: true },
});
</script>

<template>
  <section id="figures" class="figures section-band" aria-labelledby="figuresTitle">
    <div class="section-inner">
      <div class="section-heading centered reveal" v-reveal>
        <p class="kicker">{{ figures.kicker }}</p>
        <h2 id="figuresTitle">{{ figures.title }}</h2>
        <p>{{ figures.description }}</p>
      </div>

      <div class="figure-grid">
        <article v-for="person in figures.people" :key="person.name" class="person-card reveal" v-reveal>
          <div class="portrait" :class="person.portraitClass">
            <img :src="person.image" :alt="person.alt" loading="lazy" decoding="async" />
          </div>
          <h3>{{ person.name }}</h3>
          <p class="years">{{ person.years }}</p>
          <p>{{ person.contribution }}</p>
          <span>{{ person.work }}</span>
        </article>
      </div>
    </div>
  </section>
</template>
