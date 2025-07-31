let board = Array(9).fill(null);
let player = "❌";
let playing = true;

function drawBoard() {
  const elem = document.getElementById('board');
  elem.innerHTML = '';
  board.forEach((cell, i) => {
    const d = document.createElement('div');
    d.className = 'cell';
    d.textContent = cell || '';
    d.onclick = () => playMove(i);
    elem.appendChild(d);
  });
  document.getElementById('status').textContent = playing
    ? `Current turn: ${player}`
    : getWinner() ? `${getWinner()} wins! ✨` : "It's a draw!";
  
  if (!playing && getWinner()) floatingHeart();
}

function playMove(i) {
  if (!playing || board[i]) return;
  board[i] = player;
  if (getWinner() || board.every(Boolean)) playing = false;
  else player = player === "❌" ? "⭕️" : "❌";
  drawBoard();
}

function getWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let w of wins) {
    if (board[w[0]] && board[w[0]] === board[w[1]] && board[w[1]] === board[w[2]]) return board[w[0]];
  }
  return null;
}

function resetGame() {
  board = Array(9).fill(null);
  player = "❌";
  playing = true;
  drawBoard();
}

// Floating Heart animation
function floatingHeart(x = window.innerWidth/2, y = 200) {
  const heart = document.createElement('div');
  heart.textContent = '💖';
  heart.style.position = 'fixed';
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  heart.style.fontSize = '2em';
  heart.style.zIndex = 1000;
  document.body.appendChild(heart);
  setTimeout(() => {
    heart.style.transition = 'all 1.2s cubic-bezier(.5,1.8,.5,1)';
    heart.style.transform = 'translateY(-120px) scale(2)';
    heart.style.opacity = '0';
  }, 50);
  setTimeout(() => document.body.removeChild(heart), 1300);
}

drawBoard();
