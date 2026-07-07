const body = document.body;
const header = document.getElementById("siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const languageToggle = document.getElementById("languageToggle");
const timelineProgress = document.getElementById("timelineProgress");
const timelineList = document.getElementById("timelineList");
const shareButton = document.getElementById("shareButton");
const copyLinkButton = document.getElementById("copyLinkButton");
const copyStatus = document.getElementById("copyStatus");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const defaultText = {};
document.querySelectorAll("[data-i18n]").forEach((element) => {
  defaultText[element.dataset.i18n] = element.textContent.trim();
});

const translations = {
  en: {
    skip: "Skip to main content",
    siteTitle: "AI Evolution",
    siteSubtitle: "From Theory to Intelligence",
    openMenu: "Open menu",
    navHome: "Home",
    navTimeline: "Timeline",
    navFigures: "Key People",
    navBreakthroughs: "Breakthroughs",
    navFuture: "Future",
    themeToggle: "Toggle dark or light theme",
    heroEyebrow: "A civilizational story from theory to agents",
    heroTitle: "The Awakening Path of Artificial Intelligence",
    heroSubtitle: "From Turing's dream to the surprise of ChatGPT: a 70-year leap in human intelligence.",
    ctaExplore: "Start the Journey",
    ctaTimeline: "Watch the Timeline",
    statDartmouth: "AI named",
    statDeep: "Deep learning takes off",
    statModel: "Foundation models go mainstream",
    introKicker: "What is AI?",
    introTitle: "AI history is not a straight line. It is a relay of questions.",
    introBody:
      "Early scientists asked whether machines could think. Engineers encoded knowledge as rules. Statistical learning taught computers to infer patterns from data. Deep learning then built stronger representations across vision, language, and action. Today's foundation models bring these paths together and open a new window into intelligence.",
    timelineKicker: "Interactive Timeline",
    timelineTitle: "From paper theory to world-scale models",
    timelineDesc: "Click or focus any node to view the key events and impact of that stage.",
    tl1Title: "Foundations",
    tl1Heading: "Machine intelligence becomes a formal question",
    tl1Body:
      "Turing opened the imagination with the question of whether machines can think. McCarthy and others introduced the term Artificial Intelligence at Dartmouth, while neuron models, information theory, and early computers formed the theoretical base.",
    tl1Point1: "1950: Turing publishes Computing Machinery and Intelligence.",
    tl1Point2: "1956: The Dartmouth workshop establishes AI as a research field.",
    tl1Point3: "Early neural networks and symbolic reasoning begin side by side.",
    tl2Title: "First boom and winter",
    tl2Heading: "Symbolic intelligence enters the lab",
    tl2Body:
      "Researchers believed that clear logic and rules could make machines reason. Systems such as ELIZA and Shakey showed early promise, but limited compute, scarce data, and the difficulty of common sense cooled expectations.",
    tl2Point1: "Natural language, robotics, and theorem proving become hot topics.",
    tl2Point2: "Real-world tasks prove far more complex than demos.",
    tl2Point3: "Funding cuts trigger the first AI winter.",
    tl3Title: "Expert systems and a second winter",
    tl3Heading: "The rise and limits of knowledge engineering",
    tl3Body:
      "Expert systems encoded the experience of doctors, engineers, or financial specialists as rules and found business use. But rules were costly to maintain and weak at generalization, leading to another downturn.",
    tl3Point1: "MYCIN, XCON, and similar systems show AI can create business value.",
    tl3Point2: "The knowledge acquisition bottleneck limits scale.",
    tl3Point3: "Statistical learning quietly prepares the next revival.",
    tl4Title: "Machine learning revival",
    tl4Heading: "Data, compute, and algorithms converge",
    tl4Body:
      "The internet produced massive data, GPUs accelerated training, and statistical learning moved AI from hand-written rules to learning from examples.",
    tl4Point1: "Search, ads, recommendation, and speech recognition become practical AI scenes.",
    tl4Point2: "Large datasets such as ImageNet change evaluation culture.",
    tl4Point3: "Multi-layer neural networks regain attention.",
    tl5Title: "Deep learning era",
    tl5Heading: "Neural networks enter the mainstream",
    tl5Body:
      "AlexNet changed visual recognition, AlphaGo showed the power of reinforcement learning plus search, and Transformer reshaped language modeling. AI began winning at scale across vision, speech, translation, and games.",
    tl5Point1: "2012: AlexNet sparks the deep learning wave.",
    tl5Point2: "2016: AlphaGo makes the AI leap visible to the public.",
    tl5Point3: "2017: Transformer lays a key foundation for foundation models.",
    tl6Title: "Foundation model era",
    tl6Heading: "Intelligence moves from model to platform",
    tl6Body:
      "ChatGPT brought natural language interaction to the public. Multimodal models connect text, images, audio, and video. Diffusion models reshape generation, while agents and embodied AI move toward tool-using systems.",
    tl6Point1: "Instruction tuning and human feedback make models more conversational.",
    tl6Point2: "GPT, Claude, Gemini, and Grok represent different product paths.",
    tl6Point3: "Safety, copyright, energy use, and governance become central questions.",
    figuresKicker: "Key People",
    figuresTitle: "They changed how machines understand the world",
    figuresDesc: "These cards use public portraits to highlight each person's role in AI history.",
    person1Name: "Alan Turing",
    person1Contrib: "Framed the classic question of machine intelligence and proposed the Turing Test.",
    person1Work: "Key work: Computing Machinery and Intelligence",
    person2Name: "Claude Shannon",
    person2Contrib: "Gave communication, coding, and intelligent computation a mathematical language.",
    person2Work: "Key work: A Mathematical Theory of Communication",
    person3Name: "John McCarthy",
    person3Contrib: "Coined Artificial Intelligence and advanced Lisp and symbolic AI.",
    person3Work: "Key work: Dartmouth Proposal",
    person4Name: "Geoffrey Hinton",
    person4Contrib: "Helped drive backpropagation, deep belief networks, and the revival of deep learning.",
    person4Work: "Key work: Deep Learning",
    person5Name: "Yann LeCun",
    person5Contrib: "A key force behind convolutional neural networks and practical visual recognition.",
    person5Work: "Key work: LeNet",
    person6Name: "Yoshua Bengio",
    person6Contrib: "Advanced representation learning, neural language models, and deep learning foundations.",
    person6Work: "Key work: Neural Probabilistic Language Model",
    person7Name: "Sam Altman",
    person7Contrib: "Helped bring generative AI products into everyday public use.",
    person7Work: "Representative project: ChatGPT",
    breakKicker: "Modern Breakthroughs",
    breakTitle: "Foundation models turn AI into a general interface",
    breakDesc:
      "The model names here are representative examples, not a performance ranking. Together they show the direction of the foundation model era.",
    model1: "Shows the emergent abilities of large-scale pretrained language models and makes prompting a new human-computer interface.",
    model2: "Further blends text, vision, and voice interaction with an emphasis on low latency, multimodality, and natural conversation.",
    model3: "Highlights long context, writing, and safety alignment as an important route for enterprise and knowledge work.",
    model4: "Reflects how search, live information, multimodality, and platform ecosystems shape AI products.",
    app1Title: "Multimodal understanding",
    app1Body: "Models process text, images, voice, and video in one system, linking seeing, hearing, and expression.",
    app2Title: "AI Agent",
    app2Body: "Models begin to plan tasks, call tools, read and write files, and execute workflows.",
    app3Title: "Embodied intelligence",
    app3Body: "Robots connect perception, decision making, and action, bringing AI closer to the physical world.",
    app4Title: "AI for Science",
    app4Body: "From proteins to materials, AI is becoming an accelerator for scientific discovery.",
    futureKicker: "Future Outlook",
    futureTitle: "Next stop: controllable, reliable intelligence that evolves with humanity",
    futureBody:
      "Future AI is not only about more parameters or higher scores. It also needs interpretability, verification, and governance. AGI and superintelligence remain open questions, but every breakthrough reminds us that the goal is not replacing people. It is making intelligence an infrastructure for human creativity.",
    futureNode1: "AGI",
    futureNode2: "Alignment",
    futureNode3: "Governance",
    futureNode4: "Science",
    futureNode5: "Human-AI work",
    footerTitle: "AI Evolution",
    footerDesc: "This website is a science communication demo project for helping general users understand the history of AI.",
    sourcesTitle: "Source note",
    shareTitle: "Share",
    shareButton: "Share",
    copyButton: "Copy link",
  },
};

const messages = {
  zh: {
    copied: "链接已复制。",
    copyFailed: "复制失败，请手动复制浏览器地址。",
    shared: "已打开系统分享面板。",
    shareFallback: "当前环境不支持系统分享，已复制链接。",
  },
  en: {
    copied: "Link copied.",
    copyFailed: "Copy failed. Please copy the browser address manually.",
    shared: "System share panel opened.",
    shareFallback: "System share is unavailable here, so the link was copied.",
  },
};

let currentLanguage = localStorage.getItem("ai-evolution-language") || "zh";

function translatePage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === "en" ? "en" : "zh-CN";
  document.title =
    language === "en"
      ? "AI Evolution | From Theory to Intelligence"
      : "人工智能的发展历史 | AI Evolution: From Theory to Intelligence";

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      language === "en"
        ? "A science communication single-page website about the history of AI, from Turing, Dartmouth, and expert systems to deep learning and foundation models."
        : "人工智能的发展历史科普单页网站，讲述 AI 从图灵理论、达特茅斯会议、专家系统、深度学习到大模型时代的关键历程。",
    );
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translated = language === "en" ? translations.en[key] : defaultText[key];
    if (translated) {
      element.textContent = translated;
    }
  });

  languageToggle.setAttribute("aria-pressed", String(language === "en"));
  languageToggle.querySelector("span").textContent = language === "en" ? "中文" : "English";
  copyStatus.textContent = "";
  localStorage.setItem("ai-evolution-language", language);
}

function applyTheme(theme) {
  const isLight = theme === "light";
  body.classList.toggle("light-theme", isLight);
  themeToggle.setAttribute("aria-pressed", String(isLight));
  localStorage.setItem("ai-evolution-theme", theme);
}

function setupNavigation() {
  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    body.classList.toggle("no-scroll", isOpen);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("no-scroll");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
      navMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("no-scroll");
      menuToggle.focus();
    }
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...navMenu.querySelectorAll("a")];

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 },
  );

  sections.forEach((section) => activeObserver.observe(section));
}

function setupRevealAnimation() {
  const revealElements = document.querySelectorAll(".reveal");

  if (reduceMotion) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

function setupTimeline() {
  const items = [...document.querySelectorAll(".timeline-item")];
  const nodes = items.map((item) => item.querySelector(".timeline-node"));

  function openItem(activeItem) {
    items.forEach((item) => {
      const isActive = item === activeItem;
      item.classList.toggle("is-open", isActive);
      item.querySelector(".timeline-node").setAttribute("aria-expanded", String(isActive));
    });
  }

  nodes.forEach((node) => {
    node.addEventListener("click", () => openItem(node.closest(".timeline-item")));
  });

  let ticking = false;
  const updateProgress = () => {
    ticking = false;
    if (!timelineList || !timelineProgress) return;
    const rect = timelineList.getBoundingClientRect();
    const viewportMiddle = window.innerHeight * 0.55;
    const progress = (viewportMiddle - rect.top) / Math.max(rect.height, 1);
    const clamped = Math.min(1, Math.max(0, progress));
    timelineProgress.style.height = `${clamped * 100}%`;
  };

  const requestProgress = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateProgress);
  };

  updateProgress();
  window.addEventListener("scroll", requestProgress, { passive: true });
  window.addEventListener("resize", requestProgress);
}

function setupThemeAndLanguage() {
  const savedTheme = localStorage.getItem("ai-evolution-theme") || "dark";
  applyTheme(savedTheme);
  translatePage(currentLanguage);

  themeToggle.addEventListener("click", () => {
    applyTheme(body.classList.contains("light-theme") ? "dark" : "light");
  });

  languageToggle.addEventListener("click", () => {
    translatePage(currentLanguage === "en" ? "zh" : "en");
  });
}

function copyCurrentLink() {
  const url = window.location.href;

  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(url);
  }

  return new Promise((resolve, reject) => {
    const textArea = document.createElement("textarea");
    textArea.value = url;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      resolve();
    } catch (error) {
      reject(error);
    } finally {
      document.body.removeChild(textArea);
    }
  });
}

function setupShare() {
  copyLinkButton.addEventListener("click", async () => {
    try {
      await copyCurrentLink();
      copyStatus.textContent = messages[currentLanguage].copied;
    } catch {
      copyStatus.textContent = messages[currentLanguage].copyFailed;
    }
  });

  shareButton.addEventListener("click", async () => {
    const shareData = {
      title: document.title,
      text:
        currentLanguage === "en"
          ? "Explore the history of artificial intelligence."
          : "一起浏览人工智能的发展历史。",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        copyStatus.textContent = messages[currentLanguage].shared;
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }

    try {
      await copyCurrentLink();
      copyStatus.textContent = messages[currentLanguage].shareFallback;
    } catch {
      copyStatus.textContent = messages[currentLanguage].copyFailed;
    }
  });
}

function setupParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const particles = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrame = 0;

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
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const targetCount = Math.min(110, Math.max(48, Math.floor((width * height) / 15000)));
    particles.length = 0;
    for (let index = 0; index < targetCount; index += 1) {
      particles.push(createParticle());
    }
  }

  function drawNetwork() {
    context.clearRect(0, 0, width, height);
    const isLight = body.classList.contains("light-theme");
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

  function animate() {
    drawNetwork();
    if (!reduceMotion) {
      animationFrame = requestAnimationFrame(animate);
    }
  }

  resizeCanvas();
  animate();

  window.addEventListener("resize", () => {
    cancelAnimationFrame(animationFrame);
    resizeCanvas();
    animate();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else {
      animate();
    }
  });
}

setupThemeAndLanguage();
setupNavigation();
setupRevealAnimation();
setupTimeline();
setupShare();
setupParticles();
