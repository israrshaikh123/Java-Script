const EVENT_DATE = new Date("Jan 1, 2026 00:00:00").getTime();
const QUOTE_AUTO_MS = 4000;
const MODAL_DELAY_MS = 1000;

const el = (id) => document.getElementById(id);

const daysEl = el("days");
const hoursEl = el("hours");
const minutesEl = el("minutes");
const secondsEl = el("seconds");
const messageEl = el("countdownMessage");
const toggleBtn = el("toggleCountdown");

const quoteBox = el("quoteBox");
const prevQBtn = el("prevQuote");
const nextQBtn = el("nextQuote");

const modal = el("welcomeModal");
const closeModalBtn = el("closeModal");

const quotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "Do something today that your future self will thank you for.",
  "Dream big. Work hard. Stay focused.",
  "Strive not to be a success, but rather to be of value.",
];

let quoteIndex = 0;
let quoteIntervalId = null;

const showQuote = (idx = quoteIndex) => {
  quoteBox.textContent = quotes[idx];
};

const nextQuote = () => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  showQuote();
};
const prevQuote = () => {
  quoteIndex = (quoteIndex - 1 + quotes.length) % quotes.length;
  showQuote();
};

const startAutoQuotes = () => {
  if (quoteIntervalId) return;
  quoteIntervalId = setInterval(() => {
    nextQuote();
  }, QUOTE_AUTO_MS);
};
const stopAutoQuotes = () => {
  if (!quoteIntervalId) return;
  clearInterval(quoteIntervalId);
  quoteIntervalId = null;
};

let countdownIntervalId = null;
let isRunning = true;

const pad = (n) => String(n).padStart(2, "0");

const updateCountdownDisplay = (msDiff) => {
  if (msDiff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    messageEl.textContent = "Time's up! The event has started 🎉";
    return;
  }

  const totalSeconds = Math.floor(msDiff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
  messageEl.textContent = "";
};

const tick = () => {
  const now = Date.now();
  const diff = EVENT_DATE - now;

  if (diff <= 0) {
    clearInterval(countdownIntervalId);
    countdownIntervalId = null;
    isRunning = false;
    toggleBtn.textContent = "Restart Countdown";
    updateCountdownDisplay(0);
    return;
  }
  updateCountdownDisplay(diff);
};

const startCountdown = () => {
  if (countdownIntervalId) return;
  tick();
  countdownIntervalId = setInterval(tick, 1000);
  isRunning = true;
  toggleBtn.textContent = "Pause Countdown";
};

const pauseCountdown = () => {
  if (!countdownIntervalId) return;
  clearInterval(countdownIntervalId);
  countdownIntervalId = null;
  isRunning = false;
  toggleBtn.textContent = "Start Countdown";
};

toggleBtn.addEventListener("click", () => {
  if (isRunning) {
    pauseCountdown();
  } else {
    if (Date.now() >= EVENT_DATE) {
      messageEl.textContent =
        "Event date is in the past. Update EVENT_DATE if needed.";
      return;
    }
    startCountdown();
  }
});

const showModal = () => {
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
};
const hideModal = () => {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
};
closeModalBtn.addEventListener("click", hideModal);

setTimeout(showModal, MODAL_DELAY_MS);

nextQBtn.addEventListener("click", () => {
  stopAutoQuotes();
  nextQuote();
});
prevQBtn.addEventListener("click", () => {
  stopAutoQuotes();
  prevQuote();
});

const init = () => {
  showQuote(quoteIndex);
  startAutoQuotes();
  startCountdown();
};

window.addEventListener("DOMContentLoaded", init);
