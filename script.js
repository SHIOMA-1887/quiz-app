const questions = [
  {
    question: "「モナ・リザ」を描いた画家は誰？",
    options: ["ミケランジェロ", "レオナルド・ダ・ヴィンチ", "ラファエロ", "ボッティチェリ"],
    answer: 1,
    explanation: "モナ・リザはレオナルド・ダ・ヴィンチが1503〜1519年頃に描いた作品で、現在はフランスのルーヴル美術館に所蔵されています。"
  },
  {
    question: "地球の表面の約何%が海（海洋）に覆われている？",
    options: ["約51%", "約61%", "約71%", "約81%"],
    answer: 2,
    explanation: "地球の表面の約71%は海洋が占めています。陸地は残りの約29%に過ぎません。"
  },
  {
    question: "日本で最も長い川はどれ？",
    options: ["利根川", "信濃川", "石狩川", "阿賀野川"],
    answer: 1,
    explanation: "信濃川は全長約367kmで日本最長の川です。長野県では「千曲川」とも呼ばれます。"
  },
  {
    question: "「万有引力の法則」を発見した科学者は誰？",
    options: ["アインシュタイン", "ガリレオ・ガリレイ", "アイザック・ニュートン", "ニコラウス・コペルニクス"],
    answer: 2,
    explanation: "アイザック・ニュートンはリンゴが木から落ちるのを見て万有引力の法則を発見したとされています。1687年に発表しました。"
  },
  {
    question: "人間の体で最も大きい臓器はどれ？",
    options: ["肝臓", "肺", "脳", "皮膚"],
    answer: 3,
    explanation: "皮膚は体全体を覆う最大の臓器で、成人では面積約1.6〜2.0m²、重さ約3〜4kgにもなります。"
  },
  {
    question: "富士山の標高はどれ？",
    options: ["3,376m", "3,576m", "3,776m", "3,976m"],
    answer: 2,
    explanation: "富士山の標高は3,776mで日本最高峰です。静岡県と山梨県にまたがり、2013年に世界文化遺産に登録されました。"
  },
  {
    question: "光が1秒間に進む距離は約何km？",
    options: ["約3万km", "約30万km", "約300万km", "約3,000万km"],
    answer: 1,
    explanation: "光の速度は真空中で約30万km/s（299,792km/s）です。この速さで地球を約7.5周できます。"
  },
  {
    question: "世界で最も高い山（海抜）はどれ？",
    options: ["K2", "エベレスト", "マカルー", "ローツェ"],
    answer: 1,
    explanation: "エベレスト（チョモランマ）は標高8,848.86mで世界最高峰です。ネパールと中国（チベット）の国境に位置しています。"
  },
  {
    question: "日本で最も古い木造建築物があるのはどこ？",
    options: ["東大寺", "法隆寺", "薬師寺", "興福寺"],
    answer: 1,
    explanation: "奈良県の法隆寺は607年創建で、世界最古の木造建築物群です。1993年にユネスコ世界遺産に登録されました。"
  },
  {
    question: "ABO式血液型は何種類ある？",
    options: ["3種類", "4種類", "5種類", "6種類"],
    answer: 1,
    explanation: "ABO式血液型はA・B・O・ABの4種類です。1901年にオーストリアの医師カール・ラントシュタイナーによって発見されました。"
  }
];

let currentIndex = 0;
let score = 0;

function init() {
  currentIndex = 0;
  score = 0;
  document.getElementById('quiz-screen').style.display = 'block';
  document.getElementById('result-screen').style.display = 'none';
  showQuestion();
}

function showQuestion() {
  const q = questions[currentIndex];

  document.getElementById('progress-text').textContent =
    `問題 ${currentIndex + 1} / ${questions.length}`;
  document.getElementById('progress-fill').style.width =
    `${(currentIndex / questions.length) * 100}%`;

  document.getElementById('question-text').textContent = q.question;

  const optionsEl = document.getElementById('options');
  optionsEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(i));
    optionsEl.appendChild(btn);
  });

  const feedbackEl = document.getElementById('feedback');
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';

  const nextBtn = document.getElementById('next-btn');
  nextBtn.style.display = 'none';
}

function selectAnswer(selected) {
  const q = questions[currentIndex];
  const buttons = document.querySelectorAll('.option-btn');

  buttons.forEach(btn => (btn.disabled = true));
  buttons[q.answer].classList.add('correct');

  const feedbackEl = document.getElementById('feedback');

  if (selected === q.answer) {
    score++;
    feedbackEl.textContent = `✓ 正解！　${q.explanation}`;
    feedbackEl.className = 'feedback correct-feedback';
  } else {
    buttons[selected].classList.add('incorrect');
    feedbackEl.textContent = `✗ 不正解。正解は「${q.options[q.answer]}」です。　${q.explanation}`;
    feedbackEl.className = 'feedback incorrect-feedback';
  }

  const nextBtn = document.getElementById('next-btn');
  nextBtn.style.display = 'block';
  nextBtn.textContent =
    currentIndex === questions.length - 1 ? '結果を見る' : '次の問題へ →';
}

function showResult() {
  document.getElementById('quiz-screen').style.display = 'none';
  document.getElementById('result-screen').style.display = 'block';

  document.getElementById('progress-fill').style.width = '100%';

  document.getElementById('score-text').textContent =
    `${questions.length}問中 ${score}問 正解`;

  const ratio = score / questions.length;
  let icon, message;
  if (ratio === 1)       { icon = '🏆'; message = '完璧です！全問正解おめでとうございます！'; }
  else if (ratio >= 0.8) { icon = '😄'; message = 'すばらしい！あと少しで満点でした！'; }
  else if (ratio >= 0.6) { icon = '🙂'; message = 'なかなか良い結果です！'; }
  else if (ratio >= 0.4) { icon = '😅'; message = 'もう少し頑張りましょう！'; }
  else                   { icon = '📚'; message = '復習して再挑戦してみましょう！'; }

  document.getElementById('result-icon').textContent = icon;
  document.getElementById('score-message').textContent = message;
}

document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
});

document.getElementById('restart-btn').addEventListener('click', init);

init();
