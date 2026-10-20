
/* =========================================
   LOVE IN PIXELS — INTERACTIONS
========================================= */

const screens = document.querySelectorAll(".screen");
const floatingHearts = document.querySelector(".floating-hearts");

function showScreen(screenId) {
    screens.forEach((screen) => {
        screen.classList.add("hidden");
    });

    const targetScreen = document.getElementById(screenId);

    if (!targetScreen) return;

    targetScreen.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Welcome screen
document.getElementById("open-surprise").addEventListener("click", () => {
    showScreen("birthday");
    createConfetti();
});

// Navigation buttons
document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => {
        showScreen(button.dataset.next);
    });
});

// Open the letter
document.getElementById("open-letter").addEventListener("click", () => {
    const letter = document.getElementById("love-letter");
    const envelope = document.getElementById("open-letter");

    letter.classList.remove("hidden");
    envelope.classList.add("hidden");
});

// Additional reasons
const extraReasons = [
    "The kindness you show in little ways. 🌷",
    "Your courage to keep growing. ♡",
    "The light you bring into a room. ✨",
    "The beautiful things that make you uniquely you. 💗",
    "The way you make memories worth keeping. 💌"
];

let reasonIndex = 0;

document.getElementById("more-reasons").addEventListener("click", () => {
    const container = document.getElementById("reasons-container");

    if (reasonIndex >= extraReasons.length) {
        const button = document.getElementById("more-reasons");
        button.textContent = "You've seen all your reasons ♡";
        button.disabled = true;
        return;
    }

    const card = document.createElement("div");
    card.className = "reason-card";

    const number = document.createElement("span");
    number.textContent = String(reasonIndex + 5).padStart(2, "0");

    const message = document.createElement("p");
    message.textContent = extraReasons[reasonIndex];

    card.append(number, message);
    container.appendChild(card);

    reasonIndex++;
});

// Final birthday wish
document.getElementById("final-surprise").addEventListener("click", () => {
    document.getElementById("final-wish").classList.remove("hidden");
    document.getElementById("final-surprise").classList.add("hidden");

    createConfetti();
});

// Floating hearts
function createHeart() {
    if (!floatingHearts) return;

    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.setProperty("--duration", `${7 + Math.random() * 6}s`);

    floatingHearts.appendChild(heart);

    heart.addEventListener("animationend", () => {
        heart.remove();
    });
}

let heartInterval = setInterval(createHeart, 1100);

// Confetti celebration
function createConfetti() {
    const colors = [
        "#f7dde3",
        "#c58b8b",
        "#650d24",
        "#fff8f0",
        "#e8bd84"
    ];

    for (let i = 0; i < 65; i++) {
        const piece = document.createElement("span");

        piece.className = "confetti-piece";
        piece.style.setProperty("--left", `${Math.random() * 100}%`);
        piece.style.setProperty(
            "--confetti-color",
            colors[Math.floor(Math.random() * colors.length)]
        );
        piece.style.setProperty(
            "--fall-duration",
            `${2 + Math.random() * 2.5}s`
        );
        piece.style.setProperty(
            "--drift",
            `${Math.random() * 160 - 80}px`
        );

        document.body.appendChild(piece);

        piece.addEventListener("animationend", () => {
            piece.remove();
        });
    }
}

// Stop adding hearts when the page is hidden.
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        clearInterval(heartInterval);
    } else {
        heartInterval = setInterval(createHeart, 1100);
    }
});
