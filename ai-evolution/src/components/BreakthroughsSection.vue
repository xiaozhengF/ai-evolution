<script setup>
defineProps({
  breakthroughs: { type: Object, required: true },
});
</script>

<template>
  <section id="breakthroughs" class="breakthroughs section-band" aria-labelledby="breakthroughsTitle">
    <div class="section-inner">
      <div class="section-heading reveal" v-reveal>
        <p class="kicker">{{ breakthroughs.kicker }}</p>
        <h2 id="breakthroughsTitle">{{ breakthroughs.title }}</h2>
        <p>{{ breakthroughs.description }}</p>
      </div>

      <div class="model-grid">
        <article v-for="model in breakthroughs.models" :key="model.name" class="model-card reveal" v-reveal>
          <span class="model-index">{{ model.index }}</span>
          <h3>{{ model.name }}</h3>
          <p>{{ model.body }}</p>
        </article>
      </div>

      <div class="application-grid" :aria-label="breakthroughs.applicationsAriaLabel">
        <article
          v-for="application in breakthroughs.applications"
          :key="application.title"
          class="application-card reveal"
          v-reveal
        >
          <span class="app-icon">{{ application.icon }}</span>
          <h3>{{ application.title }}</h3>
          <p>{{ application.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
