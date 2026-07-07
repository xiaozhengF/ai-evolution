<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  header: { type: Object, required: true },
  activeSection: { type: String, required: true },
  theme: { type: String, required: true },
  language: { type: String, required: true },
});

const emit = defineEmits(["toggle-theme", "toggle-language"]);

const menuOpen = ref(false);
const scrolled = ref(false);
const languageLabel = computed(() => (props.language === "en" ? "中文" : "English"));

function syncScrollState() {
  scrolled.value = window.scrollY > 16;
}

function closeMenu() {
  menuOpen.value = false;
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function handleKeydown(event) {
  if (event.key === "Escape" && menuOpen.value) {
    closeMenu();
  }
}

watch(
  menuOpen,
  (isOpen) => {
    document.body.classList.toggle("no-scroll", isOpen);
  },
  { immediate: true },
);

onMounted(() => {
  syncScrollState();
  window.addEventListener("scroll", syncScrollState, { passive: true });
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", syncScrollState);
  document.removeEventListener("keydown", handleKeydown);
  document.body.classList.remove("no-scroll");
});
</script>

<template>
  <header id="siteHeader" class="site-header" :class="{ 'is-scrolled': scrolled }">
    <nav class="navbar" :aria-label="header.navAriaLabel">
      <a class="brand" href="#home" :aria-label="header.brandAriaLabel">
        <span class="brand-mark"><svg><use href="#icon-brain" /></svg></span>
        <span>
          <strong>{{ header.siteTitle }}</strong>
          <small>{{ header.siteSubtitle }}</small>
        </span>
      </a>

      <button
        class="icon-button menu-toggle"
        type="button"
        aria-controls="navMenu"
        :aria-expanded="String(menuOpen)"
        @click="toggleMenu"
      >
        <svg><use href="#icon-menu" /></svg>
        <span class="sr-only">{{ header.openMenu }}</span>
      </button>

      <div id="navMenu" class="nav-menu" :class="{ 'is-open': menuOpen }">
        <a
          v-for="item in header.nav"
          :key="item.id"
          :href="`#${item.id}`"
          :class="{ 'is-active': activeSection === item.id }"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </div>

      <div class="nav-actions">
        <button
          class="icon-button"
          type="button"
          :aria-pressed="String(theme === 'light')"
          :title="header.themeToggle"
          @click="emit('toggle-theme')"
        >
          <svg class="moon-icon"><use href="#icon-moon" /></svg>
          <svg class="sun-icon"><use href="#icon-sun" /></svg>
          <span class="sr-only">{{ header.themeToggle }}</span>
        </button>
        <button
          class="language-toggle"
          type="button"
          :aria-pressed="String(language === 'en')"
          @click="emit('toggle-language')"
        >
          <svg><use href="#icon-globe" /></svg>
          <span>{{ languageLabel }}</span>
        </button>
      </div>
    </nav>
  </header>
</template>
