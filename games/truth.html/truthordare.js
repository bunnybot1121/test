const truths = [
  "🌸 Bunny, confess something you adore about Pichu!",
  "⚡ Pichu, what’s a secret little habit that makes Bunny extra cute?",
  "💌 Describe your happiest memory together.",
  "🐰 When did Bunny first fall for Pichu?",
  "🎶 Which song is 'your' song?",
  "✨ Share a dream you want to fulfill together.",
  "💖 If you could freeze one moment with Pichu/Bunny, what would it be?",
  "🍨 What’s your partner’s sweetest quality?",
  "🌟 What makes you feel most loved by the other?",
  "🌱 What’s a little thing you wish for your relationship?"
];

const dares = [
  "🐰 Send a cute selfie to your partner right now!",
  "⚡ Write an adorable note for your partner (in 'Notes').",
  "🎵 Serenade your partner (even if just a few lines!).",
  "🌼 Share a random compliment right here.",
  "💞 Draw a heart with both initials and send a pic.",
  "🌻 Type the cheesiest pickup line you can think of!",
  "😚 Pretend to give your partner a BIG virtual hug (type *hug*)!",
  "🍦 Next time, treat each other to your favorite dessert!",
  "🪁 Play rock–paper–scissors, loser owes a favor!",
  "🎨 Draw something only your partner would understand!"
];

let lastType = null, lastIdx = -1;

function pick(type) {
  const arr = type === "truth" ? truths : dares;
  let idx;
  do {
    idx = Math.floor(Math.random() * arr.length);
  } while (type === lastType && idx === lastIdx && arr.length > 1);
  lastType = type;
  lastIdx = idx;
  fancyPrint(arr[idx]);
  floatingHeart();
}

function randomPick() {
  pick(Math.random() < 0.5 ? 'truth' : 'dare');
}

// Pretty typing animation
function fancyPrint(text) {
  const box = document.getElementById("question-box");
  box.innerHTML = "";
  let i = 0;
  const typeIt = () => {
    if (i < text.length) {
      box.innerHTML += text[i];
      i++;
      setTimeout(typeIt, 32 + Math.random() * 80);
    }
  };
  typeIt();
}

// Animated floating hearts (sparkle effect)
function floatingHeart() {
  const q = document.querySelector('.sparkle');
  if (!q) return;
  for (let i = 0; i < 2 + Math.random() * 2; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.textContent = ["💖", "💞", "💘"][Math.floor(Math.random() * 3)];
      heart.style.left = (40 + Math.random() * 20 + window.innerWidth / 2 - 60) + "px";
      heart.style.top = (240 + Math.random() * 20) + "px";
      document.body.appendChild(heart);
      setTimeout(() => {
        heart.style.transform = "translateY(-120px) scale(2)";
        heart.style.opacity = "0";
      }, 60);
      setTimeout(() => {
        heart.remove();
      }, 1200);
    }, i * 150);
  }
}

// Spin the Bottle code!
const players = [
  { name: "Bunny", avatar: "../../assets/bunny.png", emoji: "🐰" },
  { name: "Pichu", avatar: "../../assets/pichu.png", emoji: "⚡" }
];

function spinBottle() {
  const bottle = document.getElementById("bottle-img");
  const resultBox = document.getElementById("bottle-result");
  if (!bottle) return;
  bottle.style.transition = "none";
  bottle.style.transform = "rotate(0deg)";
  setTimeout(() => {
    const randomIdx = Math.round(Math.random()); // 0 or 1
    const endDeg = 720 + randomIdx * 180 + Math.floor(Math.random() * 50) - 25;
    bottle.style.transition = "transform 2.1s cubic-bezier(.33,1.7,.36,1), box-shadow 0.21s";
    bottle.style.transform = "rotate(" + endDeg + "deg)";
    bottle.style.boxShadow = "0 0 40px 12px #fcbaf6a9";
    setTimeout(() => {
      bottle.style.boxShadow = "";
      const player = players[randomIdx];
      // Bouncy turn card with confetti!
      resultBox.innerHTML = `
        <div class="bouncy-turn-card">
          <img src='${player.avatar}' alt='${player.name}' class="card-avatar">
          <span class="pick-emoji">${player.emoji}</span>
          <div class="pick-name">${player.name}!</div>
          <span class="turn-sparkle">✨</span>
        </div>
      `;
      showConfetti();
      floatingHeart(window.innerWidth / 2, 195 + Math.random() * 40);
    }, 2070);
  }, 80);
}

function showConfetti() {
  for (let i = 0; i < 9; i++) {
    setTimeout(() => {
      const conf = document.createElement('div');
      conf.textContent = ["💖", "💛", "💚", "💙", "💜"][Math.floor(Math.random() * 5)];
      conf.className = "confetti";
      conf.style.left = (window.innerWidth / 2 - 32 + Math.random() * 60) + "px";
      conf.style.top = (180 + Math.random() * 50) + "px";
      conf.style.fontSize = (1.5 + Math.random() * 1.2) + "em";
      conf.style.opacity = ".82";
      conf.style.transition = "all 1.9s cubic-bezier(.49,1.3,.35,.98)";
      conf.style.position = "fixed";
      document.body.appendChild(conf);
      setTimeout(() => {
        conf.style.transform = `translateY(${160 + Math.random() * 60}px) rotate(${Math.random() * 180}deg) scale(${1 + Math.random()})`;
        conf.style.opacity = "0";
      }, 30);
      setTimeout(() => conf.remove(), 1800);
    }, 80 * i);
  }
}

// ----------- Cute LOCAL CHAT -----------

const chatAvatars = {
  bunny: "../../assets/bunny.png",
  pichu: "../../assets/pichu.png"
};

const chatEmojis = {
  bunny: "🐰",
  pichu: "⚡"
};

const chatPrompts = [
  "Send a virtual hug to your partner!",
  "What made you smile today?",
  "Share a happy memory with Bunny/Pichu.",
  "Send your partner a secret compliment!",
  "What's the next thing you'd do together?",
  "What's one thing you adore about each other?",
  "Write a one-line poem for your partner 💖"
];

function displayChat() {
  const chatBox = document.getElementById("chat-box");
  let msgs = [];
  try {
    msgs = JSON.parse(localStorage.getItem("cuteChat") || "[]");
  } catch (ex) { }
  chatBox.innerHTML = "";
  msgs.forEach(msg => {
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-message " + msg.name;
    msgDiv.innerHTML = `
      <img src="${chatAvatars[msg.name]}" class="chat-avatar" alt="${msg.name}">
      <div class="chat-bubble">${msg.emoji} ${msg.text}</div>
    `;
    chatBox.appendChild(msgDiv);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}
displayChat();

function sendChat() {
  const input = document.getElementById("chat-input");
  const chatName = document.getElementById("chat-name").value;
  const txt = input.value.trim();
  if (!txt) return;
  let msgs = [];
  try {
    msgs = JSON.parse(localStorage.getItem("cuteChat") || "[]");
  } catch (ex) { }
  msgs.push({
    name: chatName,
    text: txt,
    emoji: chatEmojis[chatName],
    time: Date.now()
  });
  localStorage.setItem("cuteChat", JSON.stringify(msgs));
  input.value = "";
  displayChat();
  floatingHeart(window.innerWidth / 2 - 80 + Math.random() * 160, window.innerHeight / 2 + 70 - Math.random() * 140);
}

document.getElementById("chat-input")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendChat();
});

function nextSuggestedPrompt() {
  const suggestion = chatPrompts[Math.floor(Math.random() * chatPrompts.length)];
  document.getElementById("chat-sugg").textContent = "💡 " + suggestion;
}
if (document.getElementById("chat-sugg")) nextSuggestedPrompt();
document.getElementById("chat-name")?.addEventListener("change", nextSuggestedPrompt);

const dateIdeas = [
  "Have a ‘pajama party’ and play every game—loser owes the other dessert!",
  "Read old notes & type new secret messages 💌",
  "Draw each other in Scribble and guess who’s who 🎨",
  "Use Spin the Bottle to decide who’ll say ‘I love you’ in a funny accent!",
  "Compete in a virtual dance-off (winner gets a virtual hug 🎵💃)"
];

if (document.getElementById("date-idea"))
  document.getElementById("date-idea").textContent = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];

window.onload = () => {
  pick('truth');
};
