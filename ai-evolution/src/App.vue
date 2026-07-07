<script setup>
import { computed, onMounted, ref, watch } from "vue";

import AppHeader from "./components/AppHeader.vue";
import BreakthroughsSection from "./components/BreakthroughsSection.vue";
import FiguresSection from "./components/FiguresSection.vue";
import FutureSection from "./components/FutureSection.vue";
import HeroSection from "./components/HeroSection.vue";
import IconSprite from "./components/IconSprite.vue";
import IntroSection from "./components/IntroSection.vue";
import SiteFooter from "./components/SiteFooter.vue";
import TimelineSection from "./components/TimelineSection.vue";
import { useActiveSection } from "./composables/useActiveSection";
import { content } from "./data/content";

const sectionIds = ["home", "timeline", "figures", "breakthroughs", "future"];
const activeSection = useActiveSection(sectionIds);

const theme = ref("dark");
const language = ref("zh");

const page = computed(() => content[language.value]);
const themeColor = computed(() => (theme.value === "light" ? "#f6f9ff" : "#0a0a1f"));

function updateMetaTag(selector, attribute, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
}

function toggleLanguage() {
  language.value = language.value === "en" ? "zh" : "en";
}

onMounted(() => {
  const storedTheme = localStorage.getItem("ai-evolution-theme");
  const storedLanguage = localStorage.getItem("ai-evolution-language");

  if (storedTheme === "light" || storedTheme === "dark") {
    theme.value = storedTheme;
  }

  if (storedLanguage === "zh" || storedLanguage === "en") {
    language.value = storedLanguage;
  }
});

watch(
  theme,
  (nextTheme) => {
    document.body.classList.toggle("light-theme", nextTheme === "light");
    localStorage.setItem("ai-evolution-theme", nextTheme);
    updateMetaTag('meta[name="theme-color"]', "content", themeColor.value);
  },
  { immediate: true },
);

watch(
  language,
  (nextLanguage) => {
    document.documentElement.lang = content[nextLanguage].lang;
    localStorage.setItem("ai-evolution-language", nextLanguage);
  },
  { immediate: true },
);

watch(
  page,
  (nextPage) => {
    document.title = nextPage.meta.title;
    updateMetaTag('meta[name="description"]', "content", nextPage.meta.description);
    updateMetaTag('meta[name="keywords"]', "content", nextPage.meta.keywords);
    updateMetaTag('meta[property="og:title"]', "content", nextPage.meta.ogTitle);
    updateMetaTag('meta[property="og:description"]', "content", nextPage.meta.ogDescription);
  },
  { immediate: true },
);
</script>

<template>
  <a class="skip-link" href="#main">{{ page.accessibility.skip }}</a>
  <IconSprite />
  <AppHeader
    :header="page.header"
    :active-section="activeSection"
    :theme="theme"
    :language="language"
    @toggle-language="toggleLanguage"
    @toggle-theme="toggleTheme"
  />
  <main id="main">
    <HeroSection :hero="page.hero" :theme="theme" />
    <IntroSection :intro="page.intro" />
    <TimelineSection :timeline="page.timeline" />
    <FiguresSection :figures="page.figures" />
    <BreakthroughsSection :breakthroughs="page.breakthroughs" />
    <FutureSection :future="page.future" />
  </main>
  <SiteFooter :footer="page.footer" />
</template>
