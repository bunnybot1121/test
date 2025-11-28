console.log("Hello from Place-for-Us!"); // 🌟 YEH LINE YAHAN HOGI

let loveNotes = [];

function addLoveNote() {
  const input = document.getElementById('notesInput');
  const noteText = input.value.trim();
  if (!noteText) {
    alert('Please enter a note!');
    return;
  }
  loveNotes.push(noteText);
  input.value = '';
  renderLoveNotes();
}

function renderLoveNotes() {
  const container = document.getElementById('notesList');
  if (!container) return;
  container.innerHTML = loveNotes.map(note => `<li class="note-item">${note}</li>`).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('notesBtn');
  if (btn) btn.onclick = addLoveNote;
});

let coupleGoals = [];

function addGoal(event) {
  event.preventDefault();
  const input = document.getElementById('goalInput');
  const goalText = input.value.trim();
  if (!goalText) {
    alert('Please enter a goal!');
    return;
  }
  coupleGoals.push({ text: goalText, completed: false });
  input.value = '';
  renderGoals();
}

function toggleGoalCompletion(index) {
  coupleGoals[index].completed = !coupleGoals[index].completed;
  renderGoals();
}

function renderGoals() {
  const container = document.getElementById('goalsList');
  if (!container) return;
  container.innerHTML = coupleGoals.map((goal, index) => `
    <li class="goal-item">
      <div class="goal-checkbox ${goal.completed ? 'completed' : ''}" onclick="toggleGoalCompletion(${index})"></div>
      <div class="goal-text ${goal.completed ? 'completed' : ''}">${goal.text}</div>
    </li>
  `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  const goalsForm = document.getElementById('goalsForm');
  if (goalsForm) goalsForm.addEventListener('submit', addGoal);
  renderPlaylistSongs();
  renderLoveNotes();
  renderGoals();

  // Set greeting message
  const greetingEl = document.getElementById('greeting');
  if (greetingEl) {
    greetingEl.textContent = 'Hello, my love 💙';
    greetingEl.style.fontSize = '2.5rem';
    greetingEl.style.fontWeight = '600';
    greetingEl.style.color = 'white';
    greetingEl.style.textAlign = 'center';
  }

  // Calculate and display relationship days counter without shayari
  const anniversaryEl = document.getElementById('anniversary');
  if (anniversaryEl) {
    const relationshipStart = new Date('2024-11-30');
    const today = new Date();
    const diffTime = Math.abs(today - relationshipStart);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    anniversaryEl.innerHTML = `
      <div>We have been together for <strong>${diffDays}</strong> days 💖</div>
      <br>
      <div class="daily-quote" id="today-quote">“You are my favorite notification.”</div>
    `;
  }
});
