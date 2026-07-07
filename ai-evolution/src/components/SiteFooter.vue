<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  footer: { type: Object, required: true },
});

const statusMessage = ref("");

async function copyCurrentLink() {
  const url = window.location.href;

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(url);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = url;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textArea);
  }
}

async function handleCopy() {
  try {
    await copyCurrentLink();
    statusMessage.value = props.footer.messages.copied;
  } catch {
    statusMessage.value = props.footer.messages.copyFailed;
  }
}

async function handleShare() {
  const shareData = {
    title: document.title,
    text: props.footer.shareText,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      statusMessage.value = props.footer.messages.shared;
      return;
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }
    }
  }

  try {
    await copyCurrentLink();
    statusMessage.value = props.footer.messages.shareFallback;
  } catch {
    statusMessage.value = props.footer.messages.copyFailed;
  }
}

watch(
  () => props.footer,
  () => {
    statusMessage.value = "";
  },
);
</script>

<template>
  <footer class="site-footer">
    <div class="section-inner footer-grid">
      <div>
        <h2>{{ footer.title }}</h2>
        <p>{{ footer.description }}</p>
      </div>
      <div>
        <h3>{{ footer.sourcesTitle }}</h3>
        <ul class="source-list">
          <li v-for="source in footer.sourceLinks" :key="source.href">
            <a :href="source.href" target="_blank" rel="noreferrer">{{ source.label }}</a>
          </li>
          <li class="portrait-source">
            <span>{{ footer.portraitLead }}</span>
            <a
              v-for="source in footer.portraitSources"
              :key="source.href"
              :href="source.href"
              target="_blank"
              rel="noreferrer"
            >
              {{ source.label }}
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3>{{ footer.shareTitle }}</h3>
        <div class="share-actions">
          <button class="button small ghost" type="button" @click="handleShare">
            <svg><use href="#icon-share" /></svg>
            <span>{{ footer.shareButton }}</span>
          </button>
          <button class="button small ghost" type="button" @click="handleCopy">
            <svg><use href="#icon-link" /></svg>
            <span>{{ footer.copyButton }}</span>
          </button>
        </div>
        <p class="copy-status" role="status" aria-live="polite">{{ statusMessage }}</p>
      </div>
    </div>
  </footer>
</template>
