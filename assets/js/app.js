/**
 * INVITATION INTERACTIONS
 * -----------------------
 * This file controls the opening, music, scratch card, gallery, countdown,
 * reveal animations, and demo RSVP state. Client content lives in config.js.
 */
 
 document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
  if (event.target instanceof HTMLImageElement) {
    event.preventDefault();
  }
});

(function () {
  "use strict";

  const config = window.INVITATION_CONFIG;

  if (!config) {
    throw new Error("Invitation config was not loaded. Check assets/js/config.js.");
  }

  const select = (selector, root = document) => root.querySelector(selector);
  const selectAll = (selector, root = document) => [...root.querySelectorAll(selector)];

  function getValue(path) {
    return path.split(".").reduce((value, key) => value?.[key], config);
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);

    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;

    return element;
  }

  function setName(element, person) {
    const fullName = person.name;
    if (person.shortName) {
      const idx = fullName.indexOf(person.shortName);
      if (idx !== -1) {
        const before = fullName.substring(0, idx);
        const after = fullName.substring(idx + person.shortName.length);
        const span = createElement("span", "", person.shortName);
        element.replaceChildren(before, span, after);
        return;
      }
    }
    const [firstName, ...remainingNames] = fullName.split(" ");
    const firstNameElement = createElement("span", "", firstName);
    element.replaceChildren(firstNameElement, ` ${remainingNames.join(" ")}`);
  }

  function setCoupleNames(element) {
    const brideShort = config.couple.bride.shortName || config.couple.bride.name.split(" ")[0];
    const groomShort = config.couple.groom.shortName || config.couple.groom.name.split(" ")[0];
    
    element.replaceChildren(
      document.createTextNode(brideShort),
      document.createTextNode(" "),
      createElement("span", "", "&"),
      document.createTextNode(" "),
      document.createTextNode(groomShort),
    );
  }

  function applyConfig() {
    document.title = config.site.title;

    const description = select('meta[name="description"]');
    const ogTitle = select('meta[property="og:title"]');
    const ogDescription = select('meta[property="og:description"]');

    description?.setAttribute("content", config.site.description);
    ogTitle?.setAttribute("content", config.site.title);
    ogDescription?.setAttribute("content", config.site.description);

    const invitation = select("#invitation");

    Object.entries(config.theme).forEach(([name, value]) => {
      invitation.style.setProperty(`--${name}`, value);
    });

    selectAll("[data-bind]").forEach((element) => {
      const value = getValue(element.dataset.bind);
      element.textContent = value ?? "";
    });

    setName(select("#brideName"), config.couple.bride);
    setName(select("#groomName"), config.couple.groom);
    setCoupleNames(select("#welcomeSignature"));
    setCoupleNames(select("#closingNames"));

    select("#closingDetails").textContent =
      `${config.wedding.date} · ${config.venue.name}`;

    select("#mapLink").href = config.venue.mapUrl;

    const audio = select("#backgroundMusic");
    const video = select("#introVideo");
    const videoSource = select("#introVideoSource");

    audio.src = config.media.music;
    video.poster = config.media.introPoster;
    videoSource.src = config.media.introVideo;
    video.load();

    renderProgram();
    renderPreWeddingEvents();
    renderDressPalette();
    renderGallery();
  }

  function renderProgram() {
    const timeline = select("#programTimeline");

    config.program.forEach((item, index) => {
      const article = createElement("article");
      const number = createElement(
        "span",
        "timeline-index",
        String(index + 1).padStart(2, "0"),
      );
      const time = createElement("time", "", item.time);
      const details = createElement("div");

      details.append(
        createElement("h3", "", item.title),
        createElement("p", "", item.note),
      );

      article.append(number, time, details);
      timeline.append(article);
    });
  }

  function renderPreWeddingEvents() {
    const eventList = select("#preWeddingEvents");

    config.preWeddingEvents.forEach((event, index) => {
      const article = createElement("article");

      article.append(
        createElement("span", "", String(index + 1).padStart(2, "0")),
        createElement("h3", "", event.name),
        createElement("p", "", `${event.date} · ${event.time}`),
        createElement("small", "", event.location),
      );

      eventList.append(article);
    });
  }

  function renderDressPalette() {
    const palette = select("#dressPalette");

    config.dressCode.swatches.forEach((color, index) => {
      const swatch = createElement("i");
      swatch.style.background = color;
      swatch.style.setProperty("--swatch-delay", `${index * 0.08}s`);
      palette.append(swatch);
    });
  }

  let activeSlide = 0;
  let galleryTimer;
  let touchStartX = 0;

  function renderGallery() {
    const slides = select("#gallerySlides");
    const dots = select("#galleryDots");

    config.media.gallery.forEach((image, index) => {
      const figure = createElement(
        "figure",
        `gallery-slide${index === 0 ? " is-active" : ""}`,
      );
      const photo = createElement("img");

      photo.src = image.src;
      photo.alt = image.alt;
      photo.loading = index === 0 ? "eager" : "lazy";

      figure.append(photo, createElement("figcaption", "", image.caption));
      slides.append(figure);

      const dot = createElement("button", index === 0 ? "is-active" : "");
      dot.type = "button";
      dot.setAttribute("aria-label", `Show image ${index + 1}`);
      dot.addEventListener("click", () => showSlide(index));
      dots.append(dot);
    });

    const frame = select("#galleryFrame");

    frame.addEventListener("touchstart", (event) => {
      touchStartX = event.touches[0].clientX;
    });

    frame.addEventListener("touchend", (event) => {
      const distance = touchStartX - event.changedTouches[0].clientX;

      if (Math.abs(distance) < 45) return;

      showSlide(
        distance > 0
          ? (activeSlide + 1) % config.media.gallery.length
          : (activeSlide - 1 + config.media.gallery.length) %
              config.media.gallery.length,
      );
    });

    galleryTimer = window.setInterval(() => {
      showSlide((activeSlide + 1) % config.media.gallery.length);
    }, 5200);
  }

  function showSlide(index) {
    activeSlide = index;

    selectAll(".gallery-slide").forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    selectAll("#galleryDots button").forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
      dot.toggleAttribute("aria-current", dotIndex === index);
    });
  }
  
  function updateMusicControl() {
  const audio = select("#backgroundMusic");
  const button = select("#musicToggle");
  const label = select("#musicLabel");
  const playing = !audio.paused;

  button.classList.toggle("is-playing", playing);
  button.setAttribute(
    "aria-label",
    playing ? "Pause background music" : "Play background music",
  );
  label.textContent = playing ? "Playing" : "Music";
}

  function initializeOpening() {
    const hero = select("#hero");
    const video = select("#introVideo");
    let opened = false;

    function openInvitation() {
      if (opened) return;

      opened = true;
      hero.classList.remove("is-closed");
      hero.classList.add("is-open");
      hero.removeAttribute("role");
      hero.removeAttribute("aria-label");
      hero.tabIndex = -1;
      select("#openingMark").setAttribute("aria-hidden", "true");
      document.body.classList.remove("intro-locked");
      video.muted = true;
      video.volume = 0;
      video.play().catch(() => undefined);
      const audio = select("#backgroundMusic");

audio.play()
  .then(updateMusicControl)
  .catch(updateMusicControl);
    }

    hero.addEventListener("click", openInvitation);
    hero.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") openInvitation();
    });

    select(".scroll-cue").addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  function initializeMusic() {
  const audio = select("#backgroundMusic");
  const button = select("#musicToggle");

  button.addEventListener("click", async (event) => {
    event.stopPropagation();

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        // Playback can fail if the music file is missing.
      }
    } else {
      audio.pause();
    }

    updateMusicControl();
  });

  audio.addEventListener("play", updateMusicControl);
  audio.addEventListener("pause", updateMusicControl);

  updateMusicControl();
}

  function initializeRevealAnimations() {
    const revealElements = selectAll(".reveal");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.13 },
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  function initializeScratchCard() {
    const canvas = select("#scratchCanvas");
    const card = select("#scratchCard");
    const heading = select("#scratchHeading");
    const note = select("#scratchNote");
    let drawing = false;
    let revealed = false;

    function prepareCanvas() {
      if (revealed || !canvas.isConnected) return;

      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const context = canvas.getContext("2d", { willReadFrequently: true });

      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, "#d8c9df");
      gradient.addColorStop(1, "#b998bd");

      context.globalCompositeOperation = "source-over";
      context.fillStyle = gradient;
      context.fillRect(0, 0, rect.width, rect.height);
      context.fillStyle = "rgba(77, 41, 75, 0.82)";
      context.font = "600 12px Arial, sans-serif";
      context.textAlign = "center";
      context.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 - 5);
      context.font = "400 22px Georgia, serif";
      context.fillText("✦", rect.width / 2, rect.height / 2 + 30);

      context.globalCompositeOperation = "destination-out";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = 42;
    }

    function pointerPosition(event) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }

    function beginScratch(event) {
      if (revealed) return;

      drawing = true;
      canvas.setPointerCapture(event.pointerId);

      const position = pointerPosition(event);
      const context = canvas.getContext("2d", { willReadFrequently: true });

      context.beginPath();
      context.moveTo(position.x, position.y);
    }

    function continueScratch(event) {
      if (!drawing || revealed) return;

      const position = pointerPosition(event);
      const context = canvas.getContext("2d", { willReadFrequently: true });

      context.lineTo(position.x, position.y);
      context.stroke();

      if (scratchCompletion(context) > 0.42) finishReveal();
    }

    function scratchCompletion(context) {
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparentSamples = 0;
      let totalSamples = 0;

      for (let alphaIndex = 3; alphaIndex < pixels.length; alphaIndex += 64) {
        totalSamples += 1;
        if (pixels[alphaIndex] < 30) transparentSamples += 1;
      }

      return transparentSamples / totalSamples;
    }

    function finishReveal() {
      if (revealed) return;

      revealed = true;
      drawing = false;

      // Keep both classes: is-revealed handles celebration styling, while
      // is-visible prevents the scroll-reveal animation from hiding the card.
      card.classList.add("is-revealed", "is-visible");
      heading.textContent = "Our forever begins";
      note.textContent =
        "Save the date — we would be honoured to have you with us.";
      canvas.remove();
      createPetalShower();
    }

    canvas.addEventListener("pointerdown", beginScratch);
    canvas.addEventListener("pointermove", continueScratch);
    canvas.addEventListener("pointerup", () => {
      drawing = false;
    });
    canvas.addEventListener("pointercancel", () => {
      drawing = false;
    });
    canvas.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") finishReveal();
    });

    prepareCanvas();
    window.addEventListener("resize", prepareCanvas);
  }

  function createPetalShower() {
    const shower = createElement("div", "petal-shower");
    shower.setAttribute("aria-hidden", "true");

    for (let index = 0; index < 48; index += 1) {
      const petal = createElement("i");

      petal.style.setProperty("--petal-x", `${(index * 37) % 101}%`);
      petal.style.setProperty("--petal-delay", `${(index % 12) * 0.12}s`);
      petal.style.setProperty(
        "--petal-duration",
        `${4.2 + (index % 7) * 0.35}s`,
      );
      petal.style.setProperty("--petal-drift", `${-70 + (index % 10) * 16}px`);
      shower.append(petal);
    }

    document.body.append(shower);
    window.setTimeout(() => shower.remove(), 7000);
  }

  function initializeCountdown() {
    const targetDate = new Date(config.wedding.isoDate).getTime();

    function updateCountdown() {
      const difference = Math.max(0, targetDate - Date.now());
      const values = {
        countdownDays: Math.floor(difference / 86400000),
        countdownHours: Math.floor((difference / 3600000) % 24),
        countdownMinutes: Math.floor((difference / 60000) % 60),
        countdownSeconds: Math.floor((difference / 1000) % 60),
      };

      Object.entries(values).forEach(([id, value]) => {
        select(`#${id}`).textContent = String(value).padStart(2, "0");
      });
    }

    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  function prepareRsvpFields() {
    select("#rsvpName").placeholder = config.rsvp.fields.name;
    select("#rsvpEmail").placeholder = config.rsvp.fields.email;
    select("#rsvpNote").placeholder = config.rsvp.fields.note;

    const attendance = select("#rsvpAttendance");
    const prompt = createElement("option", "", "Select your response");

    prompt.value = "";
    prompt.disabled = true;
    prompt.selected = true;
    attendance.append(prompt);

    config.rsvp.fields.attendance.forEach((option) => {
      attendance.append(createElement("option", "", option));
    });

    const guests = select("#rsvpGuests");

    config.rsvp.fields.guests.forEach((option) => {
      guests.append(createElement("option", "", option));
    });
  }

  function initializeRsvp() {
    const form = select("#rsvpForm");
    const success = select("#rsvpSuccess");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.hidden = true;
      success.hidden = false;
      success.classList.add("is-visible");
    });

    select("#editRsvp").addEventListener("click", () => {
      success.hidden = true;
      form.hidden = false;
    });
  }

  function initialize() {
    applyConfig();
    initializeOpening();
    initializeMusic();
    initializeRevealAnimations();
    initializeScratchCard();
    initializeCountdown();
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();
