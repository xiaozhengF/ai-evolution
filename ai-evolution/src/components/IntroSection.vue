<script setup>
defineProps({
  intro: { type: Object, required: true },
});
</script>

<template>
  <section class="intro section-band" aria-labelledby="introTitle">
    <div class="section-inner intro-grid">
      <div class="section-heading reveal" v-reveal>
        <p class="kicker">{{ intro.kicker }}</p>
        <h2 id="introTitle">{{ intro.title }}</h2>
      </div>
      <div class="intro-copy reveal" v-reveal>
        <p>{{ intro.body }}</p>
      </div>
    </div>
  </section>
</template>
