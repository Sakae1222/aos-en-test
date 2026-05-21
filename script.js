const PATTERNS = [
  {
    id: 1,
    label: "Pattern 1",
    name: "道案内 · Wayfinding",
    questions: [
      {
        num: "1-1",
        q_en: "Excuse me, I need to use the restroom. Can you tell me how to get there?",
        audioFile: "audio/p1_q1(restroom).mp3",
        imageFile: "img/restroom.png",
        imageLabel: "会場マップ（トイレ・売店・案内所）",
        hint_jp: "直進して右手の売店を通り過ぎ、左側にトイレが見えます。"
      },
      {
        num: "1-2",
        q_en: "Hello, I'm looking for the information counter. Which way should I go?",
        audioFile: "audio/p1_q2(ic).mp3",
        imageFile: "img/ic.png",
        imageLabel: "会場マップ（案内所・ゲート）",
        hint_jp: "真っ直ぐ進んで最初の交差点を右へ。案内所はゲートの隣です。"
      },
      {
        num: "1-3",
        q_en: "Hi, can you help me? I can't find my seat. Here is my ticket. Where should I go?",
        audioFile: "audio/p1_q1(seat).mp3",
        imageFile: null,
        imageLabel: "会場マップ（Gate A / Gate B・白線）",
        hint_jp: "白線の突き当たりを左へ。Gate B からご入場ください。"
      }
    ]
  },
  {
    id: 2,
    label: "Pattern 2",
    name: "現状紹介 · Introduction",
    questions: [
      {
        num: "2-1",
        q_en: "Excuse me, what game is being played inside? Is this the basketball arena?",
        audioFile: "audio/p2_q1(game).mp3",
        imageFile: "img/game.png",
        imageLabel: "会場全景（メインスタジアム + バスケットボールアリーナ）",
        hint_jp: "ここはメインスタジアム（陸上競技）です。バスケアリーナはあちらの建物です。"
      },
      {
        num: "2-2",
        q_en: "Excuse me, what is this long line for? Is this the way into the stadium?",
        audioFile: "audio/p2_q2(line).mp3",
        imageFile: "img/goods.png",
        imageLabel: "会場外観（グッズ販売列 + メインゲート）",
        hint_jp: "この列はグッズ購入専用です。入場はあちらへどうぞ。"
      },
      {
        num: "2-3",
        q_en: "Excuse me! Is the shuttle bus to the main station still running? The line over there is not moving at all!",
        audioFile: "audio/p2_q3(bus).mp3",
        imageFile: "img/bus.png",
        imageLabel: "会場外観（バス乗り場 + 地下鉄駅入口）",
        hint_jp: "バスは渋滞で遅延中です。急ぎの方は地下鉄をお勧めします。"
      }
    ]
  },
  {
    id: 3,
    label: "Pattern 3",
    name: "現場規制・アクセス制限 · Access Control",
    questions: [
      {
        num: "3-1",
        q_en: "Hey, I have a ticket. I just want to go in from here.",
        audioFile: "audio/p3_q1(ticket).mp3",
        imageFile: "img/ticket.png",
        imageLabel: null,
        hint_jp: "こちらの入口は別の種類のチケットをお持ちの方専用です。"
      },
      {
        num: "3-2",
        q_en: "I forgot my phone inside the stadium! Let me go back in through this exit gate!",
        audioFile: "audio/p3_q2(exitonly).mp3",
        imageFile: "img/exit only.png",
        imageLabel: null,
        hint_jp: "ここは出口専用ゲートです。正面入口からスタッフにお申し出ください。"
      },
      {
        num: "3-3",
        q_en: "Look at the picture and respond appropriately.",
        audioFile: "audio/p3_q3(photo).mp3",
        imageFile: "img/authorizedonly.png",
        imageLabel: "関係者以外立入禁止（看板 + 侵入しようとする人物）",
        hint_jp: "このエリアは関係者専用です。特別通行証のない方は入れません。"
      }
    ]
  },
  {
    id: 4,
    label: "Pattern 4",
    name: "緊急時案内 · Emergency",
    questions: [
      {
        num: "4-1",
        q_en: "Oh my god! The alarm is ringing! Where should we go?! Is it safe to run?!",
        audioFile: "audio/p4_q1(alarm).mp3",
        imageFile: "img/alarm.png",
        imageLabel: null,
        hint_jp: "落ち着いてください。走らずに、指示に従って最寄りの出口へゆっくり歩いてください。"
      },
      {
        num: "4-2",
        q_en: "Help! Someone passed out over here! He's not moving! What should we do?!",
        audioFile: "audio/p4_q2(help).mp3",
        imageFile: null,
        imageLabel: null,
        hint_jp: "後ろに下がってスペースを確保してください。今すぐ救護チームを呼びます。"
      },
      {
        num: "4-3",
        q_en: "Excuse me! There is a strange black bag left under that bench. Nobody is around it. Is it dangerous?",
        audioFile: "audio/p4_q3(strange).mp3",
        imageFile: null,
        imageLabel: null,
        hint_jp: "そのバッグに触れないでください。離れてお待ちください。すぐに警備本部へ報告します。"
      }
    ]
  }
];

/* ══════════════════════════════════════════
   AUDIO
══════════════════════════════════════════ */
let currentAudio = null;
let currentBtn   = null;

function toggleAudio(file, btn) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    if (currentBtn) currentBtn.classList.remove('playing');
    const wasThis = currentBtn === btn;
    currentAudio = null; currentBtn = null;
    if (wasThis) return;
  }
  const audio = new Audio(file);
  audio.play();
  btn.classList.add('playing');
  currentAudio = audio; currentBtn = btn;
  audio.onended = () => { btn.classList.remove('playing'); currentAudio = null; currentBtn = null; };
}

function audioBtn(q, prefix) {
  const id = `ab-${prefix}-${q.num.replace('-','_')}`;
  if (!q.audioFile) {
    return `<button class="audio-btn no-file" title="音声未設定">
      <span class="tip">音声未設定</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
      </svg>
    </button>`;
  }
  return `<button class="audio-btn" id="${id}" onclick="toggleAudio('${q.audioFile}',this)">
    <span class="tip">再生 / 停止</span>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  </button>`;
}

/* ══════════════════════════════════════════
   IMAGE PLACEHOLDER / TAG
══════════════════════════════════════════ */
function imgBlock(q) {
  if (!q.imageFile && !q.imageLabel) return '';
  if (q.imageFile) {
    return `<div class="img-placeholder" style="padding:0;border-style:solid;border-color:var(--rule);">
      <img src="${q.imageFile}" alt="${q.imageLabel || ''}">
    </div>`;
  }
  return `<div class="img-placeholder">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
    <span>${q.imageLabel}</span>
    <span style="color:var(--rule);font-size:9px;">画像ファイル未設定</span>
  </div>`;
}

/* ══════════════════════════════════════════
   RENDER: 問題一覧
══════════════════════════════════════════ */
function renderList() {
  let html = '';
  PATTERNS.forEach(p => {
    html += `<div class="pattern-block">
      <div class="pattern-header">
        <span class="pattern-num">${p.label}</span>
        <span class="pattern-name">${p.name}</span>
      </div>`;
    p.questions.forEach(q => {
      html += `
      <div class="q-item">
        <div class="q-inner">
          <div class="q-num-label">${q.num}</div>
          <div class="q-body">
            <div class="q-english">"${q.q_en}"</div>
            ${imgBlock(q)}
            <div class="hint-block">
              <div class="hint-label">Hint</div>
              <div class="hint-text">${q.hint_jp}</div>
            </div>
          </div>
          ${audioBtn(q, 'list')}
        </div>
      </div>`;
    });
    html += `</div>`;
  });
  document.getElementById('list-content').innerHTML = html;
}

/* ══════════════════════════════════════════
   RENDER: 試験
══════════════════════════════════════════ */
let selected = [];

function pick() {
  selected = PATTERNS.map(p => ({
    pattern: p,
    q: p.questions[Math.floor(Math.random() * p.questions.length)]
  }));
}

function renderExam() {
  pick();
  buildExam();
}

function reshuffle() {
  if (currentAudio) { currentAudio.pause(); currentAudio = null; currentBtn = null; }
  pick();
  buildExam();
}

function buildExam() {
  const now = new Date();
  const date = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')}  ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  const summaryText = selected.map((s,i) =>
    `${s.q.num}`
  ).join(' ');

  let html = `
  <div class="exam-summary-wrap">
    <div class="collapsible-header" onclick="toggleCollapsible('summary')">
      <span class="collapsible-label">抽選結果（コピー用）</span>
      <span class="collapsible-toggle" id="summary-toggle">▼ 開く</span>
    </div>
    <div class="collapsible-body" id="summary-body">
      <div class="collapsible-inner">
        <div class="summary-text" id="summary-text">${summaryText}</div>
        <button class="copy-btn" id="copy-btn" onclick="copySummary()">コピー</button>
      </div>
    </div>
  </div>

  <div class="exam-actions">
    <span class="exam-date">${date}</span>
    <button class="reshuffle-btn" onclick="reshuffle()">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
      再抽選
    </button>
  </div>

  <div class="exam-cards">`;

  selected.forEach((s, i) => {
    const q = s.q;
    const hintId = `hint-${i}`;
    html += `
    <div class="exam-card">
      <div class="exam-card-header">
        <span class="exam-card-num">Q${i+1}</span>
        <span class="exam-card-pattern">${s.pattern.label} — ${s.pattern.name} — No.${q.num}</span>
      </div>
      <div class="exam-card-body">
        <div class="exam-card-left">
          ${imgBlock(q)}
          <div class="exam-hint-area" id="${hintId}">
            <div class="hint-block" style="margin-top:0">
              <div class="hint-label">Hint</div>
              <div class="hint-text">${q.hint_jp}</div>
            </div>
          </div>
        </div>
        <div class="exam-card-right">
          ${audioBtn(q, 'exam')}
          <button class="hint-toggle-btn" onclick="toggleHint('${hintId}', this)" title="ヒントを見る">Hint</button>
        </div>
      </div>
    </div>`;
  });

  html += `</div>`;
  document.getElementById('exam-content').innerHTML = html;
}

/* ══════════════════════════════════════════
   TOGGLE HELPERS
══════════════════════════════════════════ */
function toggleCollapsible(id) {
  const body   = document.getElementById(`${id}-body`);
  const toggle = document.getElementById(`${id}-toggle`);
  const isOpen = body.classList.toggle('open');
  toggle.textContent = isOpen ? '▲ 閉じる' : '▼ 開く';
}

function toggleHint(id, btn) {
  const area   = document.getElementById(id);
  const isOpen = area.classList.toggle('open');
  btn.style.borderColor = isOpen ? 'var(--gold)' : '';
  btn.style.color       = isOpen ? 'var(--gold)' : '';
}

function copySummary() {
  const text = document.getElementById('summary-text').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = '✓ 完了';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'コピー'; btn.classList.remove('copied'); }, 2000);
  });
}

/* ══════════════════════════════════════════
   PAGE SWITCH
══════════════════════════════════════════ */
function showPage(name) {
  if (currentAudio) { currentAudio.pause(); currentAudio = null; currentBtn = null; }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.getElementById('nav-list').classList.toggle('active', name === 'list');
  if (name === 'exam') renderExam();
  window.scrollTo(0, 0);
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
renderList();
