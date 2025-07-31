// Quiz questions
let quizList = [
  {q:"Who said 'I love you' first?", a:["Bunny 🐰", "Pichu ⚡"], ans:0, emoji:"💞"},
  {q:"Partner's dream travel place?", a:["Mountains", "Beach"], ans:1, emoji:"🌴"},
  {q:"Who takes longer to get ready?", a:["Bunny 😅", "Pichu 😋"], ans:0, emoji:"⌛"},
  {q:"Favourite Cuddle Pose?", a:["Netflix & Lap", "Shoulder hug"], ans:1, emoji:"🤗"},
  {q:"Better at keeping secrets?", a:["Bunny 🤐", "Pichu 😇"], ans:1, emoji:"🔒"},
  {q:"Who loves pizza more?", a:["Bunny! 🍕", "Pichu! 🍕"], ans:1, emoji:"🍕"},
  {q:"Most likely to prank?", a:["Pichu 😈", "Bunny 😇"], ans:0, emoji:"😆"},
  {q:"Who apologizes first?", a:["Pichu", "Bunny"], ans:0, emoji:"🙏"},
  {q:"More jealous?", a:["Bunny 🐰", "Pichu ⚡"], ans:1, emoji:"😜"},
  {q:"Secret snack hoarder?", a:["Bunny 🍫", "Pichu 🍭"], ans:0, emoji:"🍬"},
];

let curQ = 0, score = 0, showAns = false, streak = 0;
const qBox = document.getElementById('quiz-box');
const scoreBar = document.getElementById('score-bar');

function showQuiz(idx) {
  const it = quizList[idx];
  if (!it) return;
  qBox.innerHTML = `
    <div class="q-emoji">${it.emoji||"❓"}</div>
    <div class="q-index"><b>Question ${idx+1}</b> of ${quizList.length}</div>
    <div class="question">${it.q}</div>
    <button class="option-btn" onclick="pickQuiz(0)">${it.a[0]}</button>
    <button class="option-btn" onclick="pickQuiz(1)">${it.a[1]}</button>
  `;
  scoreBar.innerHTML = `<b>Your Score:</b> ${score} / ${quizList.length}`;
}

function pickQuiz(opt) {
  if (showAns) return;
  showAns = true;
  const it = quizList[curQ];
  const btns = qBox.querySelectorAll('.option-btn');
  if (opt === it.ans) {
    btns[opt].classList.add("correct");
    score++;
    streak++;
    setTimeout(()=> {
      showFeedback("✔️ Right! "+(streak>1?`🔥 Streak: ${streak}`:""));
      nextQuiz();
    }, 650);
  } else {
    btns[opt].classList.add("wrong");
    btns[it.ans].classList.add("correct");
    streak = 0;
    setTimeout(()=> {
      showFeedback("❌ Oops! Try Next.");
      nextQuiz();
    }, 950);
  }
}

function nextQuiz() {
  showAns = false;
  curQ++;
  if(curQ>=quizList.length)
    showResult();
  else
    showQuiz(curQ);
}

function showResult() {
  let msg = "Good Try! More memories to make!";
  let icon = "💖";
  if(score === quizList.length) { msg = "PERFECT! You know each other so well!"; icon="👑"; }
  else if(score >= Math.floor(quizList.length * 0.7)) { msg = "So close! Almost perfect!"; icon="🥇"; }
  else if(score <= 3) { msg = "You need more dates! 😉"; icon="💭"; }
  qBox.innerHTML = `<div style="font-size:2em;" class="crown">${icon}</div>
    <div class="question">${msg}</div>
    <div style="margin:1.3em 0;">Final Score: <b>${score} / ${quizList.length}</b></div>
    <button class="restart-btn" onclick="quizRestart()">Restart</button>`;
  scoreBar.innerHTML = "";
}

function quizRestart() {
  curQ = 0; score = 0; streak = 0; showAns = false;
  showQuiz(curQ);
}

function addCustomQuiz(e) {
  e.preventDefault();
  let q = document.getElementById('addQ').value.trim();
  let a = document.getElementById('addA').value.trim();
  let b = document.getElementById('addB').value.trim();
  let ans = document.getElementById('addANS').value;
  if(!q||!a||!b) return alert("Fill all fields!");
  quizList.push({q, a:[a,b], ans:Number(ans), emoji:"🌟"});
  document.getElementById('addQ').value = "";
  document.getElementById('addA').value = "";
  document.getElementById('addB').value = "";
  alert("Custom quiz saved! It will now appear at the end.");
}

function showFeedback(msg) {
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = "position:fixed;top:8vh;left:50%;transform:translateX(-50%);background:#2dabb5e0;color:#fff;padding:.8em 2em;font-size:1.15em;border-radius:14px;z-index:99;box-shadow:0 2px 16px #bae6ff44;";
  document.body.appendChild(el);
  setTimeout(()=>{el.style.opacity=0;el.style.marginTop="30px";},1000);
  setTimeout(()=>el.remove(),1700);
}
// Quiz chat
let chatMsgs = [];
function sendChat() {
  const user = document.getElementById('chatUser').value;
  const txt = document.getElementById('chatInput').value.trim();
  if(!txt) return;
  chatMsgs.push({user,txt});
  document.getElementById('chatInput').value = '';
  displayChat();
  if(Math.random()<0.25 && chatMsgs.length%2===0) showQuizChatPrompt();
}
function displayChat() {
  const div = document.getElementById('chatBox');
  div.innerHTML = chatMsgs.slice(-8).map(m =>
    `<div class="chat-msg ${m.user==='bunny'?'chat-bunny':'chat-pichu'}"><b>${m.user==='bunny'?'🐰':'⚡'}:</b> ${m.txt}</div>`
  ).join('');
  div.scrollTop = 9999;
}
function showQuizChatPrompt() {
  const prompts=[
    "Tease with a trick answer next!",
    "Kya tum sach bataye? 😏",
    "Compliment your partner in chat!",
    "Next question ka guess comment karo!",
    "Describe a date memory! 💌"
  ];
  const div = document.getElementById('chatBox');
  const hint = document.createElement('div');
  hint.textContent = prompts[Math.floor(Math.random()*prompts.length)];
  hint.style="font-size:.95em;color:#3a58c9;padding:.31em 0 .08em .4em;";
  div.appendChild(hint);
  setTimeout(()=>{hint.remove();},2250);
}
// Load first question on page load
quizRestart();
