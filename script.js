const SUBMIT_URL = "https://script.google.com/macros/s/AKfycbyXHx-hnCHU3vy_ST3r6Im9-mKHrnCN0mpVBlkU7CuqEnRo13Ui_DJ1-mUyIcsA6NM/exec";

/* ══════════════════════════════════════════
   LISTENING DATA
══════════════════════════════════════════ */
const PATTERNS = [
  {
    id: 1,
    label: "Pattern 1",
    name: "道案内 · Wayfinding",
    questions: [
      {
        num: "L-1-1",
        q_en: "Excuse me, I need to use the restroom. Can you tell me how to get there?",
        audioFile: "audio/p1_q1(restroom).mp3",
        imageFile: "img/restroom.png",
        imageLabel: "会場マップ（トイレ・売店）",
        hint_jp: "途中の目印も説明するとわかりやすい"
      },
      {
        num: "L-1-2",
        q_en: "Hello, I'm looking for the information counter. Which way should I go?",
        audioFile: "audio/p1_q2(ic).mp3",
        imageFile: "img/ic.png",
        imageLabel: "会場マップ（案内所）",
        hint_jp: "何番目の交差点で曲がる／目的地は左か右か"
      },
      {
        num: "L-1-3",
        q_en: "Hi, can you help me? I can't find my seat. Here is my ticket. Where should I go?",
        audioFile: "audio/p1_q3(seat).mp3",
        imageFile: "img/seat.png",
        imageLabel: "座席表",
        hint_jp: "ここは○○／○○から入場"
      }
    ]
  },
  {
    id: 2,
    label: "Pattern 2",
    name: "現状紹介 · Introduction",
    questions: [
      {
        num: "L-2-1",
        q_en: "Excuse me, what game is being played inside? Is this the basketball arena?",
        audioFile: "audio/p2_q1(game).mp3",
        imageFile: "img/game.png",
        imageLabel: "会場全景（メインスタジアム + バスケットボールアリーナ）",
        hint_jp: "この建物の説明／やっている競技（陸上）／バスケアリーナへの案内"
      },
      {
        num: "L-2-2",
        q_en: "Excuse me, what is this long line for? Is this the way into the stadium?",
        audioFile: "audio/p2_q2(line).mp3",
        imageFile: "img/goods.png",
        imageLabel: "会場外観（グッズ販売列）",
        hint_jp: "この列の説明／スタジアム的場所案内"
      },
      {
        num: "L-2-3",
        q_en: "Excuse me! Is the shuttle bus to the main station still running? The line over there is not moving at all!",
        audioFile: "audio/p2_q3(bus).mp3",
        imageFile: "img/bus.png",
        imageLabel: "会場外観（バス乗り場 + 地下鉄駅入口）",
        hint_jp: "バスはまだある／渋滞で遅れている／急ぎの人は地下鉄を案内"
      }
    ]
  },
  {
    id: 3,
    label: "Pattern 3",
    name: "現場規制・アクセス制限 · Access Control",
    questions: [
      {
        num: "L-3-1",
        q_en: "Hey, I have a ticket. I just want to go in from here.",
        audioFile: "audio/p3_q1(ticket).mp3",
        imageFile: "img/ticket.png",
        imageLabel: null,
        hint_jp: "この入口は別チケット専用"
      },
      {
        num: "L-3-2",
        q_en: "I forgot my phone inside the stadium! Let me go back in through this exit gate!",
        audioFile: "audio/p3_q2(exitonly).mp3",
        imageFile: "img/exitonly.png",
        imageLabel: null,
        hint_jp: "ここは出口専用／正面入口へ案内"
      },
      {
        num: "L-3-3",
        q_en: "Look at the picture and respond appropriately.",
        audioFile: "audio/p3_q3(photo).mp3",
        imageFile: "img/authorizedonly.png",
        imageLabel: "関係者以外立入禁止（看板 + 侵入しようとする人物）",
        hint_jp: "このエリアは関係者専用／通行証なしNG"
      }
    ]
  },
  {
    id: 4,
    label: "Pattern 4",
    name: "緊急時案内 · Emergency",
    questions: [
      {
        num: "L-4-1",
        q_en: "Oh my god! The alarm is ringing! Where should we go?! Is it safe to run?!",
        audioFile: "audio/p4_q1(alarm).mp3",
        imageFile: "img/alarm.png",
        imageLabel: null,
        hint_jp: "落ち着いてください。走らずに、指示に従って最寄りの出口へゆっくり歩いてください。"
      },
      {
        num: "L-4-2",
        q_en: "Help! Someone passed out over here! He's not moving! What should we do?!",
        audioFile: "audio/p4_q2(help).mp3",
        imageFile: "img/help.png",
        imageLabel: null,
        hint_jp: "後ろに下がってスペースを確保してください。今すぐ救護チームを呼びます。"
      },
      {
        num: "L-4-3",
        q_en: "Excuse me! There is a strange black bag left under that bench. Nobody is around it. Is it dangerous?",
        audioFile: "audio/p4_q3(strange).mp3",
        imageFile: "img/strange.png",
        imageLabel: null,
        hint_jp: "そのバッグに触れないでください。すぐに警備本部へ報告します。"
      }
    ]
  }
];

/* ══════════════════════════════════════════
   READING DATA
══════════════════════════════════════════ */
const READING_STANDALONE = [
  {
    num: "R-1",
    scenario: "You are working at the venue entrance. A visitor shows you a ticket, but it is for yesterday's event. The ticket is not valid for today. You should politely explain the situation and direct him to the ticket counter for assistance.",
    question: "What should you do with this visitor?",
    options: [
      "Let him in because he has a ticket.",
      "Tell him to come back tomorrow.",
      "Send him to the ticket counter and explain his ticket is not for today.",
      "Call the police immediately."
    ],
    correct: "C"
  },
  {
    num: "R-2",
    scenario: "You are patrolling near the athlete zone. A person without a staff badge tries to walk in. You ask for his pass, but he says he left it at the hotel. You must not allow anyone without proper identification to enter this area.",
    question: "What is the main reason you cannot let this person in?",
    options: [
      "He does not have the right ticket type.",
      "He is trying to enter through the wrong gate.",
      "He cannot prove he is authorized to enter.",
      "His pass may have already expired."
    ],
    correct: "C"
  },
  {
    num: "R-3",
    scenario: "A visitor comes to you and says she cannot find her child. The child is about 8 years old and was last seen near the souvenir shop. You should contact the lost child center right away and stay with the visitor until help arrives.",
    question: "What should you do first?",
    options: [
      "Search the entire venue by yourself.",
      "Tell the visitor to look around on her own.",
      "Wait 10 minutes before taking action.",
      "Immediately inform the lost child center."
    ],
    correct: "D"
  }
];

const READING_PASSAGE = `You are working at a large sports stadium. During a game, the weather suddenly changes, and a heavy storm begins. The organizers decide to stop the game for safety reasons. An announcement is made: "Due to bad weather, the game is suspended. Please leave the stadium calmly and follow the staff's instructions." Your job is to stand near one of the main exits and guide people out. You should tell them, "Please use this exit. Do not run. Watch your step." If you see someone who needs help — for example, an elderly person or someone with a small child — you should offer assistance. After everyone has left your area, you must report to your supervisor that your section is clear.`;

const READING_PASSAGE_QS = [
  {
    num: "R-4",
    question: "Why is the game stopped?",
    options: [
      "Because the home team is losing.",
      "Because the weather has become dangerous.",
      "Because the stadium is too crowded.",
      "Because the players are tired."
    ],
    correct: "B"
  },
  {
    num: "R-5",
    question: "What is your main responsibility during the evacuation?",
    options: [
      "Sell umbrellas to the visitors.",
      "Stand near an exit and guide people out safely.",
      "Continue watching the game from your post.",
      "Tell people to stay in their seats."
    ],
    correct: "B"
  },
  {
    num: "R-6",
    question: "What should you do if you see an elderly person having trouble leaving?",
    options: [
      "Tell them to hurry up.",
      "Ignore them and focus on the crowd.",
      "Make sure they can get out safely.",
      "Ask them to wait until everyone else has left."
    ],
    correct: "C"
  }
];

const ALL_READING = [...READING_STANDALONE, ...READING_PASSAGE_QS];
const LETTERS = ["A", "B", "C", "D"];

let readingAnswers   = {};
let readingSubmitted = false;

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
  const id = `ab-${prefix}-${q.num.replace(/-/g,'_')}`;
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
   IMAGE
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

  html += `
  <div class="section-divider">
    <div class="section-divider-line"></div>
    <span class="section-divider-text">Reading — 読解問題</span>
    <div class="section-divider-line"></div>
  </div>`;

  READING_STANDALONE.forEach(q => { html += readingListItem(q); });
  html += `<div class="passage-wrap">
    <div class="passage-label">Passage — R-4 〜 R-6</div>
    <div class="passage-text">${READING_PASSAGE}</div>
  </div>`;
  READING_PASSAGE_QS.forEach(q => { html += readingListItem(q); });

  document.getElementById('list-content').innerHTML = html;
}

function readingListItem(q) {
  const optionsHtml = q.options.map((opt, i) => {
    const letter = LETTERS[i];
    const isCorrect = letter === q.correct;
    return `<div class="r-option ${isCorrect ? 'r-option-correct' : ''}">
      <span class="r-option-letter">${letter}</span>
      <span class="r-option-text">${opt}</span>
      ${isCorrect ? '<span class="r-correct-mark">✓</span>' : ''}
    </div>`;
  }).join('');

  return `<div class="q-item">
    <div class="q-inner">
      <div class="q-num-label">${q.num}</div>
      <div class="q-body">
        ${q.scenario ? `<div class="scenario-block">${q.scenario}</div>` : ''}
        <div class="r-question">${q.question}</div>
        <div class="r-options-list">${optionsHtml}</div>
      </div>
    </div>
  </div>`;
}

/* ══════════════════════════════════════════
   RENDER: 試験（Listening）
══════════════════════════════════════════ */
let selected = [];

function pick() {
  selected = PATTERNS.map(p => ({
    pattern: p,
    q: p.questions[Math.floor(Math.random() * p.questions.length)]
  }));
}

function renderExam() {
  const nameInput = document.getElementById('student-name');
  if (nameInput) nameInput.value = '';
  pick();
  buildExam();
}

function reshuffle() {
  if (currentAudio) { currentAudio.pause(); currentAudio = null; currentBtn = null; }

  // 再抽選の時は名前入力ボックスを綺麗にクリアする
  const nameInput = document.getElementById('student-name');
  if (nameInput) nameInput.value = '';
  
  pick();
  buildExam();
}

function buildExam() {
  const now  = new Date();
  const date = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')}  ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  let html = `
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
    const q      = s.q;
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
          <button class="hint-toggle-btn" onclick="toggleHint('${hintId}', this)">Hint</button>
        </div>
      </div>
    </div>`;
  });

  html += `</div>`;
  html += buildReadingExam();
  document.getElementById('exam-content').innerHTML = html;
}

/* ══════════════════════════════════════════
   RENDER: 試験（Reading）
══════════════════════════════════════════ */
function buildReadingExam() {
  readingAnswers   = {};
  readingSubmitted = false;

  let html = `
  <div class="section-divider" style="margin-top:3rem">
    <div class="section-divider-line"></div>
    <span class="section-divider-text">Reading — 読解問題</span>
    <div class="section-divider-line"></div>
  </div>`;

  READING_STANDALONE.forEach(q => { html += readingExamItem(q); });
  html += `<div class="passage-wrap">
    <div class="passage-label">Passage — R-4 〜 R-6</div>
    <div class="passage-text">${READING_PASSAGE}</div>
  </div>`;
  READING_PASSAGE_QS.forEach(q => { html += readingExamItem(q); });

  // 採点ボタン
  html += `
  <div class="reading-submit-area">
    <button class="reading-submit-btn" id="reading-submit-btn" onclick="submitReading()" disabled>
      採点する
    </button>
  </div>`;

  // 结果呈现与自动上传状态提示
  html += `
  <div class="reading-results" id="reading-results" style="display:none; margin-top: 2rem;">
    <div class="exam-summary-wrap" style="border: 1px solid var(--navy); border-radius: 4px; background: var(--white); overflow: hidden;">
      
      <div id="simple-score-title" style="padding: 1.25rem; background-color: var(--navy-pale); font-weight: bold; font-size: 15px; color: var(--navy-deep);">
      </div>

      <div id="upload-status-bar" style="padding: 11px 1.25rem; font-size: 13px; font-family: 'DM Mono', monospace; background: #fffde7; border-top: 1px solid var(--rule); color: #f57f17; display: flex; align-items: center; gap: 8px;">
        <span class="spinner" style="display:inline-block; width:12px; height:12px; border:2px solid #f57f17; border-top-color:transparent; border-radius:50%; animation: spin 1s linear infinite;"></span>
        Google スプレッドシートに自動保存中...
      </div>

      <div class="collapsible-header" onclick="toggleCollapsible('simple-copy')" style="background: var(--paper); border-top: 1px solid var(--rule);">
        <span class="collapsible-label" style="color: var(--ink-mid); font-weight: 500;">Excel 管理用データ（予備用手動コピー）</span>
        <span class="collapsible-toggle" id="simple-copy-toggle">▼ 開く</span>
      </div>
      <div class="collapsible-body" id="simple-copy-body">
        <div class="collapsible-inner" style="padding: 1.25rem; background: var(--white); display: flex; flex-direction: column; gap: 1rem;">
          <div id="excel-pure-data" style="display:none; white-space: pre;"></div>
          <div id="excel-visual-row" style="font-family: monospace; font-size: 13px; color: var(--ink-mid); background: var(--paper); padding: 0.75rem; border: 1px dashed var(--rule); border-radius: 4px; overflow-x: auto;"></div>
          <button class="copy-btn" id="simple-copy-btn" onclick="copyPureData()" style="width:100%; max-width:200px;">コピー</button>
        </div>
      </div>

    </div>
  </div>
  
  <style>
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>`;

  return html;
}

function readingExamItem(q) {
  const optionsHtml = q.options.map((opt, i) => {
    const letter = LETTERS[i];
    return `<button class="r-exam-btn" id="rbtn-${q.num}-${letter}"
      onclick="selectAnswer('${q.num}','${letter}')">
      <span class="r-exam-letter">${letter}</span>
      <span class="r-exam-text">${opt}</span>
    </button>`;
  }).join('');

  return `<div class="q-item" id="ritem-${q.num}">
    <div class="q-inner">
      <div class="q-num-label">${q.num}</div>
      <div class="q-body">
        ${q.scenario ? `<div class="scenario-block">${q.scenario}</div>` : ''}
        <div class="r-question">${q.question}</div>
        <div class="r-exam-options">${optionsHtml}</div>
      </div>
    </div>
  </div>`;
}

function selectAnswer(num, letter) {
  if (readingSubmitted) return;
  readingAnswers[num] = letter;

  LETTERS.forEach(l => {
    const btn = document.getElementById(`rbtn-${num}-${l}`);
    if (btn) btn.classList.toggle('selected', l === letter);
  });

  const allAnswered = ALL_READING.every(q => readingAnswers[q.num]);
  const submitBtn   = document.getElementById('reading-submit-btn');
  if (submitBtn) {
    submitBtn.disabled     = !allAnswered;
    submitBtn.textContent  = allAnswered
      ? '採点する →'
      : `採点する（${Object.keys(readingAnswers).length} / 6）`;
  }
}

/* ══════════════════════════════════════════
   核心逻辑：计算并自动发送契合图片格式的数据
══════════════════════════════════════════ */
function submitReading() {
  readingSubmitted = true;
  document.getElementById('reading-submit-btn').style.display = 'none';

  // 读取页面中您本来就写好的姓名输入框
  const nameInput = document.getElementById('student-name');
  const studentName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "未入力";

  // 1. 判定阅读题并上色
  let correctCount = 0;
  ALL_READING.forEach(q => {
    const chosen    = readingAnswers[q.num];
    const isCorrect = chosen === q.correct;
    if (isCorrect) correctCount++;

    LETTERS.forEach(l => {
      const btn = document.getElementById(`rbtn-${q.num}-${l}`);
      if (!btn) return;
      btn.disabled = true;
      if (l === q.correct)          btn.classList.add('r-correct');
      else if (l === chosen && !isCorrect) btn.classList.add('r-wrong');
    });
  });

  const rate = Math.round((correctCount / 6) * 100);
  document.getElementById('simple-score-title').textContent = `【${studentName}】様の採点結果: 6問中 ${correctCount}問 正解 (正答率: ${rate}%)`;

  // 2. 严格按照您的表格图片格式进行数据拼装
  // 结构：氏名(1列) + 听力随机生成的4道题号(4列) + 阅读学生选的答案(6列) + 正答率(1列)
  const listeningCols = selected.map(s => s.q.num).join('\t');
  const readingCols   = ALL_READING.map(q => readingAnswers[q.num] || '—').join('\t');
  
  const finalRowData = `${studentName}\t${listeningCols}\t${readingCols}\t${rate}%`;
  
  // 更新备用本地面板数据
  document.getElementById('excel-pure-data').textContent = finalRowData;
  document.getElementById('excel-visual-row').textContent = `${studentName} | ${selected.map(s => s.q.num).join(' | ')} | ${ALL_READING.map(q => readingAnswers[q.num]||'—').join(' | ')} | ${rate}%`;
  
  document.getElementById('reading-results').style.display = 'block';

  // 3. 【全自动发送】通过 Fetch 异步将数据直传 Google Sheet
  const targetUrl = `${SUBMIT_URL}?rawdata=${encodeURIComponent(finalRowData)}`;
  const statusElem = document.getElementById('upload-status-bar');

  fetch(targetUrl, { mode: 'no-cors' })
    .then(() => {
      // 传输成功状态提示
      statusElem.style.background = "var(--green-bg)";
      statusElem.style.color = "var(--green)";
      statusElem.style.borderColor = "var(--green)";
      statusElem.innerHTML = "✓ Google スプレッドシートに自動保存されました！";
    })
    .catch((err) => {
      // 传输失败状态提示
      statusElem.style.background = "#fdf0f0";
      statusElem.style.color = "var(--red)";
      statusElem.style.borderColor = "var(--red)";
      statusElem.innerHTML = "❌ 自動保存に失敗しました。URL設定を確認するか、下の予备ボタンから手動コピーしてください。";
      console.error(err);
    });
}

function copyPureData() {
  const text = document.getElementById('excel-pure-data').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('simple-copy-btn');
    btn.textContent = '✓ コピー完了';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'コピー'; btn.classList.remove('copied'); }, 2000);
  });
}

/* ══════════════════════════════════════════
   TOGGLE HELPERS & PAGE SWITCH
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
