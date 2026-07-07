<script setup>
defineProps({
  future: { type: Object, required: true },
});
</script>

<template>
  <section id="future" class="future section-full" aria-labelledby="futureTitle">
    <div class="future-media" aria-hidden="true"></div>
    <div class="section-inner future-layout">
      <div class="future-copy reveal" v-reveal>
        <p class="kicker">{{ future.kicker }}</p>
        <h2 id="futureTitle">{{ future.title }}</h2>
        <p>{{ future.body }}</p>
      </div>
      <div class="future-orbit reveal" :aria-label="future.orbitAriaLabel" v-reveal>
        <div class="orbit-ring"></div>
        <span v-for="node in future.nodes" :key="node">{{ node }}</span>
      </div>
    </div>
  </section>
</template>
