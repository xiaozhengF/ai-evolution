<script setup>
import { onMounted, onUnmounted, ref } from "vue";

defineProps({
  timeline: { type: Object, required: true },
});

const activeIndex = ref(0);
const progressHeight = ref("0%");
const timelineListRef = ref(null);

let ticking = false;

function openItem(index) {
  activeIndex.value = index;
}

function updateProgress() {
  ticking = false;
  if (!timelineListRef.value) {
    return;
  }

  const rect = timelineListRef.value.getBoundingClientRect();
  const viewportMiddle = window.innerHeight * 0.55;
  const progress = (viewportMiddle - rect.top) / Math.max(rect.height, 1);
  const clamped = Math.min(1, Math.max(0, progress));
  progressHeight.value = `${clamped * 100}%`;
}

function requestProgress() {
  if (ticking) {
    return;
  }

  ticking = true;
  requestAnimationFrame(updateProgress);
}

onMounted(() => {
  updateProgress();
  window.addEventListener("scroll", requestProgress, { passive: true });
  window.addEventListener("resize", requestProgress);
});

onUnmounted(() => {
  window.removeEventListener("scroll", requestProgress);
  window.removeEventListener("resize", requestProgress);
});
</script>

<template>
  <section id="timeline" class="timeline-section section-band" aria-labelledby="timelineTitle">
    <div class="section-inner">
      <div class="section-heading centered reveal" v-reveal>
        <p class="kicker">{{ timeline.kicker }}</p>
        <h2 id="timelineTitle">{{ timeline.title }}</h2>
        <p>{{ timeline.description }}</p>
      </div>

      <div ref="timelineListRef" class="timeline">
        <div class="timeline-rail" aria-hidden="true">
          <span :style="{ height: progressHeight }"></span>
        </div>

        <article
          v-for="(item, index) in timeline.items"
          :key="`${item.period}-${item.title}`"
          class="timeline-item reveal"
          :class="{ 'is-open': index === activeIndex }"
          v-reveal
        >
          <button
            class="timeline-node"
            type="button"
            :aria-expanded="String(index === activeIndex)"
            @click="openItem(index)"
          >
            <span class="node-dot"></span>
            <span class="node-year">{{ item.period }}</span>
            <span class="node-title">{{ item.title }}</span>
          </button>
          <div class="timeline-panel">
            <div class="timeline-visual" :class="item.visualClass" aria-hidden="true"></div>
            <div class="timeline-content">
              <h3>{{ item.heading }}</h3>
              <p>{{ item.body }}</p>
              <ul>
                <li v-for="point in item.points" :key="point">{{ point }}</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
