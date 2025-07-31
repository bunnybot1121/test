// JavaScript code for Would You Rather game with chat box

// Questions list
let wyrList = [
  {q:"Would you rather always talk in rhymes or only be able to whisper?",a:"Rhymes Only",b:"Whisper Only"},
  {q:"Would you rather have to sing every sentence or dance everywhere you go?",a:"Sing Everything",b:"Dance Everywhere"},
  {q:"Would you rather be a unicorn for a day or a shooting star for a night?",a:"Unicorn for a day",b:"Shooting star for a night"},
  {q:"Would you rather be stuck in a romantic comedy or an alien adventure with me?",a:"Romantic Comedy",b:"Alien Adventure"},
  {q:"Would you rather tickle a grumpy cat or boop a sleepy dog’s nose—blindfolded?",a:"Tickle grumpy cat",b:"Boop sleepy dog"},
  {q:"Would you rather swap bodies with your partner for a day or swap phones for a day?",a:"Swap bodies!",b:"Swap phones 😮"},
  {q:"Would you rather spend a day together on Mars or go scuba diving at midnight?",a:"Mars Date",b:"Scuba at Midnight"},
  {q:"Would you rather eat chocolate on pizza or ketchup on ice cream for a month?",a:"Choco Pizza",b:"Ketchup Ice Cream"},
  {q:"Would you rather our thoughts be broadcast as subtitles or have to say everything on live radio?",a:"Subtitles",b:"Live Radio!"},
  {q:"Would you rather never stop hiccuping on dates or literally float every time you blush?",a:"Hiccup forever 😳",b:"Float when blushing"},
  {q:"Would you rather your laugh sound like a duck or hiccup after every kiss?",a:"Duck Laugh",b:"Hiccup after kiss"},
  {q:"Would you rather hold hands, superglued for 1 day or wear matching onesies for 1 week?",a:"Superglued hands",b:"Matching onesies"},
  {q:"Would you rather have every photo be photobombed by a squirrel or sunglass emoji?",a:"Squirrel photobomb",b:"😎 Sunglass emoji"},
  {q:"Would you rather only use memes to text for a week or only use voice notes?",a:"Only memes",b:"Only voice notes"},
  {q:"Would you rather swap your favorite food forever or swap your favorite movie forever?",a:"Swap food",b:"Swap movie"},
  {q:"Would you rather be BFFs with a ghost or a time-traveling sheep?",a:"Ghost BFF",b:"Time-travel sheep"},
  {q:"Would you rather every date be a surprise OR plan every date for the year in January?",a:"Surprise always!",b:"Plan all at Jan"},
  {q:"Would you rather go on a hot-air balloon ride or underwater submarine picnic?",a:"Hot-air balloon",b:"Submarine picnic"},
  {q:"Would you rather be chased by 100 kittens or one giant turtle?",a:"100 kittens 😱",b:"Giant turtle"},
  {q:"Would you rather teleport, but only to weird places, or freeze time, but only for 5 seconds?",a:"Teleport weird",b:"Freeze 5s"},
  // Crazy & fun custom questions added
  {q:"Would you rather alien world me ek din bitana pade, jahan sab creatures aapki baatein sunte hain par reply nahi karte OR zombie apocalypse me ek zombie ke saath dance karna pade, bina kisi gear ke?",a:"Alien world me ek din bitana",b:"Zombie ke saath dance karna"},
  {q:"Would you rather har baar jab aap bologe to 3 seconds ke liye aap unicorn ban jaoge OR ek din ke liye har jagah hawa ke jhonke aapke saath cricketer ki tarah cricket khelne lagen?",a:"3 second unicorn banna",b:"Hawa me cricket khelna"},
  // Aur bhi (romantic/weird/funny)
  {q:"Would you rather have a song play every time we hold hands, or fireworks every time we hug?",a:"Song with hands",b:"Fireworks hug"},
  {q:"Would you rather teleport to Paris or Tokyo for our next random date?",a:"Paris Baby!",b:"Tokyo Adventure"},
  {q:"Would you rather wear mismatched socks for a year or mismatched shoes for a week?",a:"Socks mismatched",b:"Shoes mismatched"},
  {q:"Would you rather only communicate by singing for a day or only by miming?",a:"Singing only",b:"Miming only"},
  {q:"Would you rather have penguin butler follow us everywhere or squirrel paparazzi?",a:"Penguin butler!",b:"Squirrel paparazzi"},
  {q:"Would you rather do a TikTok dance together in public or karaoke our song in a crowded place?",a:"TikTok dance",b:"Karaoke session!"},
  {q:"Would you rather have dessert for every meal or breakfast for dinner forever?",a:"Dessert always",b:"Breakfast for dinner"},
  {q:"Would you rather be able to talk to plants or animals (only when together)?",a:"Plants",b:"Animals"},
  {q:"Would you rather have a magical flying scooter for two, or a magical rainbow slide at home?",a:"Flying scooter",b:"Rainbow slide"},
];

let curIdx = 0, scores = {a:0,b:0}, logArr = [];

const box = document.getElementById('wyr-box');
const scoreRow = document.getElementById('score-row');
const wyrLog = document.getElementById('wyr-log');

function showWYR(idx) {
  const it = wyrList[idx];
  if (!it) return;
  box.innerHTML = `
    <div style="font-size:1.18em;"><b>${it.q}</b></div>
    <button class="choice-btn" onclick="pickWYR('a')">${it.a}</button>
    <button class="choice-btn" onclick="pickWYR('b')">${it.b}</button>
  `;
  scoreRow.innerHTML = `<b>Q:</b> ${idx+1}/${wyrList.length} — <b>Choices</b> <span style="color:#fc99bb;">${scores.a}</span> : <span style="color:#298aba;">${scores.b}</span>`;
}

function pickWYR(ans) {
  scores[ans]++;
  logArr.push(`Q${curIdx+1}: <span style="color:${ans=='a'?'#fc99bb':'#298aba'}">${wyrList[curIdx][ans]}</span>`);
  wyrLog.innerHTML = logArr.slice(-6).join('<br>');
  nextWYR();
}

function nextWYR() {
  curIdx = (curIdx+1)%wyrList.length;
  showWYR(curIdx);
}

function randomWYR() {
  curIdx = Math.floor(Math.random()*wyrList.length);
  showWYR(curIdx);
}

function resetWYR() {
  curIdx = 0; scores.a=0; scores.b=0; logArr=[];
  showWYR(curIdx); wyrLog.innerHTML="";
}

function addCustomWYR(e) {
  e.preventDefault();
  let q = document.getElementById('addQ').value.trim();
  let a = document.getElementById('addA').value.trim();
  let b = document.getElementById('addB').value.trim();
  if(!q||!a||!b) return alert("Please fill all fields!");
  wyrList.push({q,a,b});
  document.getElementById('addQ').value="";
  document.getElementById('addA').value="";
  document.getElementById('addB').value="";
  alert("New crazy WYR added!");
  showWYR(wyrList.length-1);
}

// Chat box logic
let chatMsgs = [];

function sendChat() {
  const user = document.getElementById('chatUser').value;
  const txt = document.getElementById('chatInput').value.trim();
  if(!txt) return;
  chatMsgs.push({user,txt});
  document.getElementById('chatInput').value = '';
  displayChat();
}

function displayChat() {
  const div = document.getElementById('chatBox');
  div.innerHTML = chatMsgs.slice(-9).map(m =>
    `<div class="chat-msg ${m.user==='bunny'?'chat-bunny':'chat-pichu'}"><b>${m.user==='bunny'?'🐰':'⚡'}:</b> ${m.txt}</div>`
  ).join('');
  div.scrollTop = 9999;
}

// Initial load
resetWYR();
