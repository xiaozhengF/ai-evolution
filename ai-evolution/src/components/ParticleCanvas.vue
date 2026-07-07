<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  theme: { type: String, required: true },
});

const canvasRef = ref(null);

let context = null;
let particles = [];
let width = 0;
let height = 0;
let dpr = 1;
let animationFrame = 0;
let reduceMotion = false;

function createParticle() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.28,
    radius: Math.random() * 1.8 + 0.6,
    pulse: Math.random() * Math.PI * 2,
  };
}

function resizeCanvas() {
  const canvas = canvasRef.value;
  if (!canvas || !context) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = rect.width;
  height = rect.height;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  context.setTransform(dpr, 0, 0, dpr, 0, 0);

  const targetCount = Math.min(110, Math.max(48, Math.floor((width * height) / 15000)));
  particles = Array.from({ length: targetCount }, createParticle);
}

function drawNetwork() {
  if (!context) {
    return;
  }

  context.clearRect(0, 0, width, height);
  const isLight = props.theme === "light";
  const nodeColor = isLight ? "rgba(0, 110, 140, 0.72)" : "rgba(0, 245, 255, 0.82)";
  const violetLine = isLight ? "rgba(124, 58, 237, " : "rgba(168, 85, 247, ";
  const cyanLine = isLight ? "rgba(0, 110, 140, " : "rgba(0, 245, 255, ";

  particles.forEach((particle, index) => {
    if (!reduceMotion) {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.pulse += 0.018;

      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;
    }

    for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
      const other = particles[nextIndex];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = width < 680 ? 92 : 128;

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.32;
        context.strokeStyle = index % 2 === 0 ? `${cyanLine}${opacity})` : `${violetLine}${opacity})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(other.x, other.y);
        context.stroke();
      }
    }

    context.fillStyle = nodeColor;
    context.beginPath();
    context.arc(
      particle.x,
      particle.y,
      particle.radius + Math.sin(particle.pulse) * 0.35,
      0,
      Math.PI * 2,
    );
    context.fill();
  });
}

function stopAnimation() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  }
}

function animate() {
  drawNetwork();
  if (!reduceMotion) {
    animationFrame = requestAnimationFrame(animate);
  }
}

function startAnimation() {
  stopAnimation();
  animate();
}

function handleResize() {
  resizeCanvas();
  startAnimation();
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopAnimation();
    return;
  }

  startAnimation();
}

watch(
  () => props.theme,
  () => {
    drawNetwork();
  },
);

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) {
    return;
  }

  context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  resizeCanvas();
  startAnimation();
  window.addEventListener("resize", handleResize);
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onUnmounted(() => {
  stopAnimation();
  window.removeEventListener("resize", handleResize);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
});
</script>

<template>
  <canvas ref="canvasRef" class="particle-canvas" aria-hidden="true"></canvas>
</template>
