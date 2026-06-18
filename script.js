const SUBMIT_URL = "https://script.google.com/macros/s/AKfycbzhSUfMgcV2EAqVxs0OVHtBVn4YRKApY3qQGfGo97mC-xYQpOiJ3OVJDQp5ya6xYoA/exec";

/* ══════════════════════════════════════════
   EXAM CONFIG
══════════════════════════════════════════ */
const EXAM_DURATION_SEC   = 5 * 60;   // 試験時間：5分
const TIMER_WARNING_SEC   = 60;       // 残り1分で警告色
const MAX_AUDIO_PLAYS     = 2;        // 音声再生は最大2回
const RECORD_MAX_SEC      = 30;       // 録音は最大30秒
const RECORD_MAX_ATTEMPTS = 2;        // 録音は最大2回（本番+再録音1回）
const LISTENING_PATTERN_COUNT = 2;    // 聴解パターンを何個抽選するか

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

const ALL_READING = [...READING_STANDALONE];
const LETTERS = ["A", "B", "C", "D"];

let readingAnswers   = {};
let readingSubmitted = false;

/* ══════════════════════════════════════════
   EXAM FLOW STATE
══════════════════════════════════════════ */
let examStarted    = false;
let timerInterval  = null;
let timerRemaining = EXAM_DURATION_SEC;

/* ══════════════════════════════════════════
   RECORDING STATE
   recordings[key] = { base64, attempts, blobUrl }
   key は 'L1' / 'L2'（聴解1問目／2問目に対応）
══════════════════════════════════════════ */
let recordings   = {};
let activeRecorder = null; // 現在録音中の MediaRecorder インスタンス（あれば）
let activeRecordKey = null;

/* ══════════════════════════════════════════
   TIMER
══════════════════════════════════════════ */
function startTimer() {
  timerRemaining = EXAM_DURATION_SEC;
  const bar   = document.getElementById('timer-bar');
  const clock = document.getElementById('timer-clock');

  bar.style.display = 'flex';
  bar.classList.remove('warning');
  positionTimerBar();
  renderTimerClock(clock);

  timerInterval = setInterval(() => {
    timerRemaining--;
    renderTimerClock(clock);

    if (timerRemaining === TIMER_WARNING_SEC) {
      bar.classList.add('warning');
    }

    if (timerRemaining <= 0) {
      clearInterval(timerInterval);
      handleTimeUp();
    }
  }, 1000);
}

function positionTimerBar() {
  const header = document.querySelector('header');
  const bar     = document.getElementById('timer-bar');
  if (!header || !bar) return;
  const headerHeight = header.getBoundingClientRect().height;
  bar.style.top = headerHeight + 'px';
  // 内容がタイマーの下に隠れないよう、本文側に余白を確保する
  const mainEl = document.querySelector('#page-exam main');
  if (mainEl) mainEl.style.paddingTop = (bar.getBoundingClientRect().height + headerHeight + 16) + 'px';
}

function renderTimerClock(clock) {
  const m = Math.floor(Math.max(0, timerRemaining) / 60);
  const s = Math.max(0, timerRemaining) % 60;
  clock.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
window.addEventListener('resize', () => {
  if (examStarted && !readingSubmitted) positionTimerBar();
});

function handleTimeUp() {
  // 録音中のものがあれば強制停止し、Base64化が完了してから採点・提出する
  stopAnyActiveRecording().then(() => submitReading(true));
}

/* ══════════════════════════════════════════
   AUDIO（再生回数制限つき）
══════════════════════════════════════════ */
let currentAudio = null;
let currentBtn   = null;
let audioPlayCounts = {};   // { 'L-1-1': 0, ... } 試験中の再生回数を記録

function toggleAudio(file, btn, qNum) {
  // 試験モード（qNum が渡された場合）は再生回数を確認
  if (qNum) {
    const count = audioPlayCounts[qNum] || 0;
    const isPlayingThis = currentBtn === btn && currentAudio;
    if (!isPlayingThis && count >= MAX_AUDIO_PLAYS) return; // 回数終了
  }

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

  if (qNum) {
    audioPlayCounts[qNum] = (audioPlayCounts[qNum] || 0) + 1;
    updateAudioPlayUI(qNum, btn);
  }

  audio.onended = () => {
    btn.classList.remove('playing');
    currentAudio = null; currentBtn = null;
    if (qNum) updateAudioPlayUI(qNum, btn);
  };
}

function updateAudioPlayUI(qNum, btn) {
  const count = audioPlayCounts[qNum] || 0;
  const remaining = Math.max(0, MAX_AUDIO_PLAYS - count);
  const countLabel = document.getElementById(`playcount-${qNum.replace(/-/g,'_')}`);
  if (countLabel) countLabel.textContent = `再生可能回数：残り ${remaining} 回`;
  if (remaining <= 0) {
    btn.classList.add('exhausted');
    btn.disabled = true;
  }
}

function audioBtn(q, prefix, withCounter) {
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
  const qArg = withCounter ? `,'${q.num}'` : '';
  const btnHtml = `<button class="audio-btn" id="${id}" onclick="toggleAudio('${q.audioFile}',this${qArg})">
    <span class="tip">再生 / 停止</span>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  </button>`;
  if (!withCounter) return btnHtml;

  const remaining = MAX_AUDIO_PLAYS - (audioPlayCounts[q.num] || 0);
  return `${btnHtml}<div class="audio-play-count" id="playcount-${q.num.replace(/-/g,'_')}">再生可能回数：残り ${remaining} 回</div>`;
}

/* ══════════════════════════════════════════
   RECORDING（録音：最大30秒、最大2回試行）
══════════════════════════════════════════ */
function pickSupportedMimeType() {
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus'
  ];
  for (const type of candidates) {
    if (window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return ''; // ブラウザのデフォルトに任せる
}

function recordWidget(key, qLabel) {
  return `
  <div class="record-wrap" id="recwrap-${key}">
    <div class="record-label">録音回答 — ${qLabel}</div>
    <div class="record-controls">
      <button class="record-btn" id="recbtn-${key}" onclick="toggleRecording('${key}')">
        <span class="record-dot"></span>
        <span id="recbtn-label-${key}">録音開始</span>
      </button>
      <button class="rerecord-btn" id="rerecbtn-${key}" style="display:none;" onclick="toggleRecording('${key}')">録り直す</button>
      <span class="record-attempts" id="recattempts-${key}">試行回数：0 / ${RECORD_MAX_ATTEMPTS}</span>
    </div>
    <div class="record-status" id="rec-status-${key}"></div>
  </div>`;
}

async function toggleRecording(key) {
  // 録音中なら → これは「終了」操作
  if (activeRecorder && activeRecorder.state === 'recording' && activeRecordKey === key) {
    finishRecording_(key, false);
    return;
  }
  if (activeRecorder && activeRecorder.state === 'recording') return; // 他のキーが録音中なら無視

  const rec = recordings[key] || { attempts: 0, base64: null };
  if (rec.attempts >= RECORD_MAX_ATTEMPTS) return; // 試行回数終了

  const statusEl = document.getElementById(`rec-status-${key}`);
  const btn       = document.getElementById(`recbtn-${key}`);
  const btnLabel  = document.getElementById(`recbtn-label-${key}`);
  const rerecBtn  = document.getElementById(`rerecbtn-${key}`);

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    statusEl.textContent = 'マイクへのアクセスが許可されていません。';
    statusEl.classList.add('err');
    return;
  }

  const mimeType = pickSupportedMimeType();
  const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
  const chunks = [];

  recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
  recorder._chunks = chunks;
  recorder._stream = stream;
  recorder._key = key;
  recorder._rec = rec;

  recorder.start();
  activeRecorder = recorder;
  activeRecordKey = key;

  // 1回目の録音か「録り直す」からの録音かに関わらず、
  // 表示中のボタンを「録音終了」ボタンとして使う（もう一方は隠す）
  const isRerecord = rerecBtn && rerecBtn.style.display !== 'none';
  if (isRerecord) {
    rerecBtn.classList.add('recording');
    rerecBtn.textContent = '録音終了';
    if (btn) btn.style.display = 'none';
  } else {
    btn.classList.add('recording');
    if (btnLabel) btnLabel.textContent = '録音終了';
    if (rerecBtn) rerecBtn.style.display = 'none';
  }
  statusEl.classList.remove('err', 'ok');
  statusEl.textContent = `録音中… 残り${RECORD_MAX_SEC}秒（もう一度押すと終了します）`;

  let remaining = RECORD_MAX_SEC;
  recorder._countdownInterval = setInterval(() => {
    remaining--;
    if (statusEl) statusEl.textContent = `録音中… 残り${remaining}秒（もう一度押すと終了します）`;
    if (remaining <= 0) clearInterval(recorder._countdownInterval);
  }, 1000);

  // 30秒で自動停止
  recorder._autoStopTimeout = setTimeout(() => {
    finishRecording_(key, false);
  }, RECORD_MAX_SEC * 1000);
}

/**
 * 録音を確定終了させ、Base64化が完了するまで待てるよう Promise を返す。
 * 通常の手動終了／30秒自動終了／試験タイムアップ強制終了のいずれからも呼ばれる。
 */
function finishRecording_(key, isForced) {
  return new Promise((resolve) => {
    const recorder = activeRecorder;
    if (!recorder || recorder._key !== key || recorder.state !== 'recording') {
      resolve();
      return;
    }

    if (recorder._autoStopTimeout) clearTimeout(recorder._autoStopTimeout);
    if (recorder._countdownInterval) clearInterval(recorder._countdownInterval);

    const btn      = document.getElementById(`recbtn-${key}`);
    const btnLabel = document.getElementById(`recbtn-label-${key}`);
    const rerecBtnEarly = document.getElementById(`rerecbtn-${key}`);
    const statusEl = document.getElementById(`rec-status-${key}`);
    if (btn) btn.classList.remove('recording');
    if (rerecBtnEarly) rerecBtnEarly.classList.remove('recording');

    recorder.onstop = () => {
      recorder._stream.getTracks().forEach(t => t.stop());
      const blob = new Blob(recorder._chunks, { type: recorder.mimeType || 'audio/webm' });

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(',')[1];
        const rec = recorder._rec;
        rec.attempts += 1;
        rec.base64   = base64;
        recordings[key] = rec;

        const attemptsEl = document.getElementById(`recattempts-${key}`);
        if (attemptsEl) attemptsEl.textContent = `試行回数：${rec.attempts} / ${RECORD_MAX_ATTEMPTS}`;

        const rerecBtn = document.getElementById(`rerecbtn-${key}`);
        if (rerecBtn) rerecBtn.textContent = '録り直す'; // 録音終了状態だった場合に文字を戻す
        if (statusEl) {
          statusEl.classList.remove('err');
          statusEl.classList.add('ok');
        }

        if (rec.attempts >= RECORD_MAX_ATTEMPTS) {
          if (btn) btn.style.display = 'none';
          if (rerecBtn) rerecBtn.style.display = 'none';
          if (statusEl) statusEl.textContent = '録音完了（試行回数終了のため録り直しできません）。';
        } else {
          if (btn) btn.style.display = 'none';
          if (rerecBtn) rerecBtn.style.display = 'inline-block';
          if (btnLabel) btnLabel.textContent = '録音開始';
          if (statusEl) statusEl.textContent = '録音完了。';
        }

        activeRecorder = null;
        activeRecordKey = null;
        resolve();
      };
      reader.readAsDataURL(blob);
    };

    recorder.stop();
  });
}

function stopAnyActiveRecording() {
  if (activeRecorder && activeRecorder.state === 'recording') {
    return finishRecording_(activeRecordKey, true);
  }
  return Promise.resolve();
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
    <span style="color:var(--rule);font-size:12.5px;">画像ファイル未設定</span>
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
  // PATTERNS をシャッフルし、先頭から LISTENING_PATTERN_COUNT 個を採用
  const shuffled = [...PATTERNS].sort(() => Math.random() - 0.5);
  const chosenPatterns = shuffled.slice(0, LISTENING_PATTERN_COUNT);
  selected = chosenPatterns.map(p => ({
    pattern: p,
    q: p.questions[Math.floor(Math.random() * p.questions.length)]
  }));
}

function renderExam() {
  const nameInput = document.getElementById('student-name');
  if (nameInput) { nameInput.value = ''; nameInput.disabled = false; }
  examStarted = false;
  audioPlayCounts = {};
  recordings = {};

  document.getElementById('student-info-wrap').style.display = '';
  document.getElementById('timer-bar').style.display = 'none';
  document.getElementById('start-warning').classList.remove('show');
  const startBtn = document.getElementById('start-exam-btn');
  if (startBtn) { startBtn.disabled = false; startBtn.textContent = '試験開始 →'; }
  const mainEl = document.querySelector('#page-exam main');
  if (mainEl) mainEl.style.paddingTop = '';

  pick();
  document.getElementById('exam-content').innerHTML = '';
}

function startExam() {
  const nameInput = document.getElementById('student-name');
  const name = nameInput && nameInput.value.trim();
  const warning = document.getElementById('start-warning');

  if (!name) {
    warning.textContent = '氏名を入力してください。';
    warning.classList.add('show');
    return;
  }
  warning.classList.remove('show');

  examStarted = true;
  document.getElementById('start-exam-btn').disabled = true;
  document.getElementById('start-exam-btn').textContent = '試験中…';
  nameInput.disabled = true;

  buildExam();
  startTimer();
}

function buildExam() {
  const now  = new Date();
  const date = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')}  ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  let html = `
  <div class="exam-actions">
    <span class="exam-date">${date}</span>
  </div>

  <div class="exam-cards">`;

  selected.forEach((s, i) => {
    const q       = s.q;
    const hintId  = `hint-${i}`;
    const recKey  = `L${i+1}`; // 表格上の「聴解1／聴解2」に対応する録音キー
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
          ${recordWidget(recKey, `Q${i+1}`)}
        </div>
        <div class="exam-card-right">
          ${audioBtn(q, 'exam', true)}
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
      
      <div id="simple-score-title" style="padding: 1.25rem; background-color: var(--navy-pale); font-weight: bold; font-size: 18.5px; color: var(--navy-deep);">
      </div>

      <div id="upload-status-bar" style="padding: 11px 1.25rem; font-size: 16px; font-family: 'DM Mono', monospace; background: #fffde7; border-top: 1px solid var(--rule); color: #f57f17; display: flex; align-items: center; gap: 8px;">
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
      : `採点する（${Object.keys(readingAnswers).length} / ${ALL_READING.length}）`;
  }
}

/* ══════════════════════════════════════════
   核心逻辑：採点 → 録音を含めて POST 送信
══════════════════════════════════════════ */
async function submitReading(autoSubmitted) {
  if (readingSubmitted) return; // 二重送信防止
  readingSubmitted = true;

  clearInterval(timerInterval);
  await stopAnyActiveRecording(); // 録音中なら、Base64化が完了するまで待つ

  const submitBtn = document.getElementById('reading-submit-btn');
  if (submitBtn) submitBtn.style.display = 'none';

  // 读取页面中本来就写好的姓名输入框
  const nameInput = document.getElementById('student-name');
  const studentName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "未入力";

  // 1. 判定阅读题并上色（未回答按不正解处理）
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

  const total = ALL_READING.length;
  const rate  = Math.round((correctCount / total) * 100);

  const titlePrefix = autoSubmitted ? '【時間切れ・自動採点】' : '';
  document.getElementById('simple-score-title').textContent =
    `${titlePrefix}【${studentName}】様の採点結果: ${total}問中 ${correctCount}問 正解 (正答率: ${rate}%)`;

  // 2. 表格列順：姓名 | 听力1 | 听力2 | 阅读1 | 阅读2 | 阅读3 | 正答率 | 听力1录音链接 | 听力2录音链接
  const listeningCols = selected.map(s => s.q.num);          // [L-x-y, L-x-y]
  const readingCols   = ALL_READING.map(q => readingAnswers[q.num] || '—');

  const visualRow = [studentName, ...listeningCols, ...readingCols, `${rate}%`, '(録音アップロード中…)', '(録音アップロード中…)'];
  document.getElementById('excel-visual-row').textContent = visualRow.join(' | ');
  document.getElementById('excel-pure-data').textContent  = visualRow.join('\t');

  document.getElementById('reading-results').style.display = 'block';

  // 3. 録音データ（Base64）を含めて POST 送信
  const statusElem = document.getElementById('upload-status-bar');
  statusElem.innerHTML = `<span class="spinner" style="display:inline-block; width:12px; height:12px; border:2px solid #f57f17; border-top-color:transparent; border-radius:50%; animation: spin 1s linear infinite;"></span> Google スプレッドシートに自動保存中...`;

  const payload = {
    studentName: studentName,
    listening: listeningCols,   // [题号1, 题号2]
    reading: readingCols,
    rate: `${rate}%`,
    recordings: {
      // キーは録音ウィジェットの内部キー(L1/L2=出題順)、値は実際の問題番号と音声データ
      L1: recordings['L1'] ? { qNum: listeningCols[0], base64: recordings['L1'].base64 } : null,
      L2: recordings['L2'] ? { qNum: listeningCols[1], base64: recordings['L2'].base64 } : null
    },
    mimeType: 'audio/webm'
  };

  fetch(SUBMIT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // GAS doPost対応のためtext/plainで送信(CORSのpreflight回避)
    body: JSON.stringify(payload)
  })
    .then(res => res.text())
    .then(text => {
      if (text.indexOf('success') === 0 || text.trim() === 'success') {
        statusElem.style.background = "var(--green-bg)";
        statusElem.style.color = "var(--green)";
        statusElem.style.borderColor = "var(--green)";
        statusElem.innerHTML = "✓ Google スプレッドシートに自動保存されました！";
      } else {
        throw new Error(text);
      }
    })
    .catch((err) => {
      statusElem.style.background = "#fdf0f0";
      statusElem.style.color = "var(--red)";
      statusElem.style.borderColor = "var(--red)";
      statusElem.innerHTML = "❌ 自動保存に失敗しました。下の予備ボタンから手動コピーしてください。";
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
  // 試験進行中（開始済み・未提出）に「問題一覧」へ移動しようとした場合は確認を挟む
  if (name === 'list' && examStarted && !readingSubmitted) {
    const ok = confirm('試験が進行中です。問題一覧に移動すると、この試験は無効になります。本当に移動しますか？');
    if (!ok) return;
    // 移動を許可した場合は試験を中断扱いとする
    clearInterval(timerInterval);
    stopAnyActiveRecording();
    examStarted = false;
  }

  if (currentAudio) { currentAudio.pause(); currentAudio = null; currentBtn = null; }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.getElementById('nav-list').classList.toggle('active', name === 'list');

  // 試験が進行中（開始済み・未提出）の状態で exam ページに戻る場合は状態を保持し、再描画しない
  if (name === 'exam' && !(examStarted && !readingSubmitted)) {
    renderExam();
  }
  window.scrollTo(0, 0);
}

window.addEventListener('beforeunload', (e) => {
  if (examStarted && !readingSubmitted) {
    e.preventDefault();
    e.returnValue = '';
  }
});

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
renderList();
