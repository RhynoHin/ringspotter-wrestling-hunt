(() => {
  "use strict";

  const canvas = document.getElementById("game");
  const statusEl = document.getElementById("game-status");
  const ctx = canvas.getContext("2d", { alpha: false });
  const W = 390;
  const H = 720;
  const DPR = 2;

  canvas.width = W * DPR;
  canvas.height = H * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

  const stages = [
    {
      code: "AEW",
      name: "AEW 霓虹競技場",
      short: "AEW",
      city: "美國・霓虹競技場",
      colors: ["#f7c948", "#14141a", "#6b5cff"],
      target: [
        { name: "DYNAMO DAX", clue: "青綠外套＋金色閃電面彩", look: { skin: 2, hair: 1, hairColor: "#f2d16b", top: "#18d6ba", bottom: "#14141c", accent: "#ffd84d", accessory: "bolt", mask: 0 } },
        { name: "VIOLET VEX", clue: "紫色斗篷＋銀色護目鏡", look: { skin: 3, hair: 4, hairColor: "#15131b", top: "#7b4dff", bottom: "#d9d9e5", accent: "#ffffff", accessory: "goggles", mask: 0 } },
        { name: "NEON JACK", clue: "螢光背心＋紅色頭巾", look: { skin: 1, hair: 2, hairColor: "#592b1f", top: "#dfff35", bottom: "#2e2e39", accent: "#ff3f57", accessory: "headband", mask: 0 } },
      ],
      crowdBias: "modern",
    },
    {
      code: "STARDOM",
      name: "STARDOM 星光館",
      short: "STARDOM",
      city: "日本・星光女子競技場",
      colors: ["#ff4fa3", "#251734", "#65d9ff"],
      target: [
        { name: "星月 RIKA", clue: "藍色雙馬尾＋金色星星眼罩", look: { skin: 1, hair: 5, hairColor: "#56d7ff", top: "#ff4fa3", bottom: "#6a4cff", accent: "#ffe45e", accessory: "star", mask: 0 } },
        { name: "CRIMSON MIO", clue: "紅白羽毛肩飾＋白長靴", look: { skin: 0, hair: 3, hairColor: "#5a1d2a", top: "#e72e58", bottom: "#ffffff", accent: "#ffd0dc", accessory: "feathers", mask: 0 } },
        { name: "COSMIC YUNA", clue: "銀色短髮＋紫色月亮腰帶", look: { skin: 2, hair: 2, hairColor: "#d9e2ef", top: "#29234d", bottom: "#8d63ff", accent: "#e7dcff", accessory: "moon", mask: 0 } },
      ],
      crowdBias: "joshi",
    },
    {
      code: "CMLL",
      name: "CMLL 太陽聖殿",
      short: "CMLL",
      city: "墨西哥・太陽聖殿",
      colors: ["#21d4b4", "#122334", "#ff8b32"],
      target: [
        { name: "SOL AZTECA", clue: "金色太陽面具＋青綠披風", look: { skin: 3, hair: 0, hairColor: "#19151a", top: "#19bfa6", bottom: "#f4b73e", accent: "#ffe670", accessory: "cape", mask: 3 } },
        { name: "JAGUAR ROJO", clue: "紅色豹紋面具＋黑金手套", look: { skin: 2, hair: 0, hairColor: "#19151a", top: "#e33a42", bottom: "#16161d", accent: "#ffc857", accessory: "gloves", mask: 2 } },
        { name: "LUNA VERDE", clue: "綠色月牙面具＋紫色長靴", look: { skin: 1, hair: 0, hairColor: "#19151a", top: "#28c76f", bottom: "#7429b8", accent: "#e4ff61", accessory: "cape", mask: 1 } },
      ],
      crowdBias: "lucha",
    },
    {
      code: "NJPW",
      name: "新日本・紅日巨蛋",
      short: "新日本",
      city: "日本・紅日巨蛋",
      colors: ["#ed3138", "#151519", "#f4e6c7"],
      target: [
        { name: "赤龍 KENJI", clue: "紅色頭巾＋白色火焰長袍", look: { skin: 1, hair: 3, hairColor: "#17151a", top: "#f2eee6", bottom: "#d52d35", accent: "#ffb33d", accessory: "headband", mask: 0 } },
        { name: "IRON TORA", clue: "虎紋背心＋黑色護腕", look: { skin: 2, hair: 1, hairColor: "#34251d", top: "#f0a62e", bottom: "#17171d", accent: "#22180e", accessory: "wrist", mask: 0 } },
        { name: "BLUE COMET", clue: "藍色面罩＋銀色流星披肩", look: { skin: 0, hair: 0, hairColor: "#15151a", top: "#3269db", bottom: "#ececf3", accent: "#aee7ff", accessory: "cape", mask: 1 } },
      ],
      crowdBias: "strong",
    },
  ];

  const skinTones = ["#f4c7a1", "#d99a6c", "#ad6f48", "#77472f", "#5d3527"];
  const tops = ["#ee4057", "#3c8cff", "#f2bb35", "#7b53d6", "#27b57b", "#eeeeef", "#f27a37", "#17171c"];
  const bottoms = ["#17171c", "#e5e5e8", "#5a3aa8", "#2363af", "#bd2f42", "#187555"];
  const hairColors = ["#17151a", "#4c2b1f", "#d5ac63", "#8b2635", "#cfd7e6", "#2d6dd9"];
  const buttonRects = {
    start: { x: 38, y: 606, w: 314, h: 62 },
    hint: { x: 18, y: 650, w: 168, h: 52 },
    pause: { x: 204, y: 650, w: 168, h: 52 },
    action: { x: 47, y: 575, w: 296, h: 58 },
    secondary: { x: 80, y: 646, w: 230, h: 42 },
    sound: { x: 344, y: 18, w: 30, h: 30 },
  };

  const state = {
    mode: "menu",
    stageIndex: 0,
    round: 0,
    score: 0,
    timer: 45,
    combo: 0,
    wrong: 0,
    hints: 2,
    hintActive: 0,
    elapsed: 0,
    transition: 0,
    feedback: "",
    feedbackTime: 0,
    shake: 0,
    sound: true,
    best: Number(localStorage.getItem("ringspotter-best") || 0),
    completed: [],
    targetSlot: 0,
    crowd: [],
    lastTs: performance.now(),
  };

  let audioCtx = null;

  function announce(text) {
    statusEl.textContent = text;
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function mulberry32(seed) {
    return function rng() {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function roundedRect(x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
  }

  function fillText(text, x, y, size, color = "#fff", align = "left", weight = 700) {
    ctx.font = `${weight} ${size}px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans HK", sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
  }

  function drawButton(rect, label, accent, subtle = false) {
    ctx.save();
    ctx.shadowColor = subtle ? "transparent" : `${accent}70`;
    ctx.shadowBlur = subtle ? 0 : 18;
    roundedRect(rect.x, rect.y, rect.w, rect.h, 16);
    ctx.fillStyle = subtle ? "rgba(255,255,255,.09)" : accent;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = subtle ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.25)";
    ctx.lineWidth = 1;
    ctx.stroke();
    fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2 + 1, 17, subtle ? "#fff" : "#111117", "center", 800);
    ctx.restore();
  }

  function inRect(x, y, rect) {
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
  }

  function buildCrowd() {
    const rng = mulberry32(1907 + state.stageIndex * 911 + state.round * 131);
    const crowd = [];
    const rows = 7;
    const cols = 7;
    const targetSlots = [9, 38, 24, 14, 33, 45, 6, 29, 40, 18, 35, 2];
    state.targetSlot = targetSlots[state.stageIndex * 3 + state.round];
    const stage = stages[state.stageIndex];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const slot = row * cols + col;
        const x = 31 + col * 54 + (rng() - 0.5) * 10;
        const y = 184 + row * 65 + (rng() - 0.5) * 8;
        let look = {
          skin: Math.floor(rng() * skinTones.length),
          hair: 1 + Math.floor(rng() * 5),
          hairColor: hairColors[Math.floor(rng() * hairColors.length)],
          top: tops[Math.floor(rng() * tops.length)],
          bottom: bottoms[Math.floor(rng() * bottoms.length)],
          accent: tops[Math.floor(rng() * tops.length)],
          accessory: ["none", "headband", "wrist", "goggles", "none", "none"][Math.floor(rng() * 6)],
          mask: stage.crowdBias === "lucha" ? Math.floor(rng() * 4) : (rng() > 0.84 ? 1 : 0),
        };
        if (stage.crowdBias === "joshi") {
          look.hair = 2 + Math.floor(rng() * 4);
          look.top = tops[Math.floor(rng() * 7)];
        }
        if (slot === state.targetSlot) look = { ...stage.target[state.round].look };
        crowd.push({ slot, x, y, look, phase: rng() * Math.PI * 2, target: slot === state.targetSlot });
      }
    }
    state.crowd = crowd;
  }

  function setupStage(index, keepScore = true) {
    state.stageIndex = index;
    state.round = 0;
    if (!keepScore) state.score = 0;
    state.timer = 45;
    state.combo = 0;
    state.wrong = 0;
    state.hints = 2;
    state.hintActive = 0;
    state.feedback = "";
    state.transition = 0;
    state.mode = "playing";
    buildCrowd();
    announce(`第 ${index + 1} 站，${stages[index].name}。目標：${stages[index].target[0].name}`);
    tone(440, 0.06, "square", 0.035);
  }

  function startTour() {
    state.score = 0;
    state.completed = [];
    setupStage(0, true);
  }

  function ensureAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx?.state === "suspended") audioCtx.resume();
  }

  function tone(freq, duration, type = "sine", volume = 0.04, delay = 0) {
    if (!state.sound) return;
    ensureAudio();
    if (!audioCtx) return;
    const start = audioCtx.currentTime + delay;
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(audioCtx.destination);
    oscillator.start(start);
    oscillator.stop(start + duration);
  }

  function foundTarget() {
    if (state.transition > 0) return;
    const gain = Math.round(700 + state.timer * 18 + state.combo * 180);
    state.score += gain;
    state.combo += 1;
    state.feedback = `搵到！ +${gain}`;
    state.feedbackTime = 0.75;
    state.transition = 0.7;
    tone(660, 0.09, "square", 0.05);
    tone(880, 0.12, "square", 0.04, 0.08);
    announce(`搵到 ${stages[state.stageIndex].target[state.round].name}，加 ${gain} 分`);
  }

  function wrongTap() {
    if (state.transition > 0) return;
    state.timer = Math.max(0, state.timer - 2);
    state.combo = 0;
    state.wrong += 1;
    state.shake = 0.28;
    state.feedback = "唔係佢！ −2秒";
    state.feedbackTime = 0.65;
    tone(145, 0.1, "sawtooth", 0.035);
    announce("搵錯人，扣兩秒");
  }

  function useHint() {
    if (state.hints <= 0 || state.hintActive > 0 || state.transition > 0) return;
    state.hints -= 1;
    state.score = Math.max(0, state.score - 250);
    state.hintActive = 2.6;
    state.feedback = "提示區域已亮起 −250";
    state.feedbackTime = 1;
    tone(520, 0.08, "sine", 0.035);
    announce("提示已開啟，目標附近會亮起光圈");
  }

  function completeStage() {
    const timeBonus = Math.round(state.timer * 45);
    state.score += timeBonus;
    state.completed[state.stageIndex] = true;
    state.mode = "stageComplete";
    state.transition = 0;
    state.feedback = "";
    tone(523, 0.1, "square", 0.045);
    tone(659, 0.1, "square", 0.045, 0.1);
    tone(784, 0.18, "square", 0.045, 0.2);
    announce(`${stages[state.stageIndex].name} 完成，時間獎勵 ${timeBonus} 分`);
  }

  function finishTour() {
    state.mode = "tourComplete";
    if (state.score > state.best) {
      state.best = state.score;
      localStorage.setItem("ringspotter-best", String(state.best));
    }
    announce(`世界巡迴完成，總分 ${state.score}`);
  }

  function update(dt) {
    const step = clamp(dt, 0, 0.1);
    state.elapsed += step;
    if (state.feedbackTime > 0) state.feedbackTime -= step;
    if (state.hintActive > 0) state.hintActive -= step;
    if (state.shake > 0) state.shake -= step;
    if (state.mode === "playing") {
      if (state.transition > 0) {
        state.transition -= step;
        if (state.transition <= 0) {
          if (state.round >= 2) {
            completeStage();
          } else {
            state.round += 1;
            buildCrowd();
            announce(`下一個目標：${stages[state.stageIndex].target[state.round].name}`);
          }
        }
      } else {
        state.timer -= step;
        if (state.timer <= 0) {
          state.timer = 0;
          state.mode = "timeup";
          state.feedback = "";
          tone(110, 0.4, "sawtooth", 0.04);
          announce("時間到，可以重試這一站");
        }
      }
    }
  }

  function drawBackdrop(stage) {
    const gradient = ctx.createLinearGradient(0, 0, 0, H);
    gradient.addColorStop(0, stage.colors[1]);
    gradient.addColorStop(0.56, "#12121a");
    gradient.addColorStop(1, "#07070b");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    ctx.globalAlpha = 0.11;
    ctx.fillStyle = stage.colors[0];
    for (let i = -2; i < 8; i += 1) {
      ctx.save();
      ctx.translate(i * 78, 0);
      ctx.rotate(-0.24);
      ctx.fillRect(0, -60, 34, 820);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function drawSoundButton() {
    roundedRect(buttonRects.sound.x, buttonRects.sound.y, buttonRects.sound.w, buttonRects.sound.h, 9);
    ctx.fillStyle = "rgba(255,255,255,.09)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.15)";
    ctx.stroke();
    fillText(state.sound ? "♪" : "×", 359, 34, 17, state.sound ? "#fff" : "#aaa", "center", 800);
  }

  function drawMenu() {
    const stage = stages[0];
    drawBackdrop(stage);
    ctx.save();
    ctx.translate(195, 74);
    ctx.rotate(-0.025);
    fillText("RING", 0, 0, 49, "#ffffff", "center", 950);
    fillText("SPOTTER", 0, 47, 49, "#f7c948", "center", 950);
    ctx.restore();
    fillText("摔角捉迷藏", 195, 150, 19, "#dedbe8", "center", 750);

    roundedRect(23, 184, 344, 75, 19);
    ctx.fillStyle = "rgba(255,255,255,.07)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.14)";
    ctx.stroke();
    fillText("世界巡迴挑戰", 42, 207, 15, "#f7c948", "left", 850);
    fillText("每站搵出 3 位隱藏摔角手", 42, 234, 15, "#ffffff", "left", 650);
    fillText("撳錯扣 2 秒・提示扣 250 分", 42, 253, 11, "#aaa5b3", "left", 600);

    const cards = [
      { x: 23, y: 279, w: 164, h: 118 },
      { x: 203, y: 279, w: 164, h: 118 },
      { x: 23, y: 413, w: 164, h: 118 },
      { x: 203, y: 413, w: 164, h: 118 },
    ];
    stages.forEach((item, index) => {
      const card = cards[index];
      const glow = ctx.createLinearGradient(card.x, card.y, card.x + card.w, card.y + card.h);
      glow.addColorStop(0, `${item.colors[0]}42`);
      glow.addColorStop(1, `${item.colors[2]}18`);
      roundedRect(card.x, card.y, card.w, card.h, 18);
      ctx.fillStyle = glow;
      ctx.fill();
      ctx.strokeStyle = `${item.colors[0]}9a`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      fillText(String(index + 1).padStart(2, "0"), card.x + 18, card.y + 21, 11, item.colors[0], "left", 850);
      fillText(item.short, card.x + 14, card.y + 55, item.short === "STARDOM" ? 18 : 22, "#fff", "left", 900);
      fillText(index === 0 ? "霓虹競技場" : index === 1 ? "星光女子館" : index === 2 ? "太陽聖殿" : "紅日巨蛋", card.x + 14, card.y + 84, 12, "#c7c3ce", "left", 650);
      ctx.fillStyle = item.colors[0];
      ctx.fillRect(card.x + 14, card.y + 101, 36, 3);
    });

    drawButton(buttonRects.start, "開始世界巡迴  →", "#f7c948");
    fillText(`最高分 ${state.best.toLocaleString("zh-HK")}`, 195, 690, 12, "#aaa5b3", "center", 650);
    drawSoundButton();
  }

  function drawVenue(stage) {
    const y0 = 112;
    ctx.save();
    ctx.beginPath();
    ctx.rect(10, y0, 370, 520);
    ctx.clip();

    const venue = ctx.createLinearGradient(0, y0, 0, 632);
    venue.addColorStop(0, stage.colors[1]);
    venue.addColorStop(0.35, `${stage.colors[2]}55`);
    venue.addColorStop(1, "#0b0b10");
    ctx.fillStyle = venue;
    ctx.fillRect(10, y0, 370, 520);

    ctx.globalAlpha = 0.32;
    ctx.fillStyle = stage.colors[0];
    for (let i = 0; i < 8; i += 1) {
      const x = 14 + i * 52;
      ctx.beginPath();
      ctx.moveTo(x, 112);
      ctx.lineTo(x + 30, 305);
      ctx.lineTo(x + 54, 112);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = `${stage.colors[0]}88`;
    ctx.lineWidth = 3;
    ctx.strokeRect(21, 126, 348, 470);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255,255,255,.12)";
    for (let y = 168; y < 610; y += 65) {
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(370, y);
      ctx.stroke();
    }

    if (stage.code === "STARDOM") {
      for (let i = 0; i < 12; i += 1) {
        const x = 30 + ((i * 83) % 335);
        const y = 138 + ((i * 47) % 430);
        fillText("★", x, y, 10 + (i % 3) * 3, i % 2 ? "#ff85c4" : "#72ddff", "center", 700);
      }
    } else if (stage.code === "CMLL") {
      const flags = ["#1abd91", "#ffffff", "#ef5350"];
      for (let i = 0; i < 15; i += 1) {
        ctx.fillStyle = flags[i % 3];
        ctx.fillRect(17 + i * 25, 133, 16, 8);
      }
    } else if (stage.code === "NJPW") {
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "#fff1d0";
      ctx.beginPath();
      ctx.arc(195, 360, 150, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }

  function drawPerson(person, scale = 1, still = false) {
    const { look } = person;
    const bob = still ? 0 : Math.sin(state.elapsed * 2.4 + person.phase) * 1.7;
    ctx.save();
    ctx.translate(person.x, person.y + bob);
    ctx.scale(scale, scale);

    if (look.accessory === "cape") {
      ctx.fillStyle = look.accent;
      ctx.beginPath();
      ctx.moveTo(-13, -28);
      ctx.lineTo(-21, 14);
      ctx.lineTo(20, 14);
      ctx.lineTo(13, -28);
      ctx.fill();
    }
    if (look.accessory === "feathers") {
      ctx.strokeStyle = look.accent;
      ctx.lineWidth = 4;
      for (let i = -2; i <= 2; i += 1) {
        ctx.beginPath();
        ctx.moveTo(i * 5, -24);
        ctx.lineTo(i * 8, -42 - Math.abs(i) * 2);
        ctx.stroke();
      }
    }

    ctx.strokeStyle = look.bottom;
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-6, 4);
    ctx.lineTo(-8, 23);
    ctx.moveTo(6, 4);
    ctx.lineTo(8, 23);
    ctx.stroke();

    ctx.strokeStyle = look.top;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-10, -17);
    ctx.lineTo(-16, -1);
    ctx.moveTo(10, -17);
    ctx.lineTo(16, -1);
    ctx.stroke();

    roundedRect(-12, -23, 24, 31, 8);
    ctx.fillStyle = look.top;
    ctx.fill();
    ctx.fillStyle = look.accent;
    ctx.fillRect(-12, -7, 24, 5);

    ctx.fillStyle = skinTones[look.skin];
    ctx.beginPath();
    ctx.arc(0, -33, 10.5, 0, Math.PI * 2);
    ctx.fill();

    if (look.mask) {
      ctx.fillStyle = look.top;
      ctx.beginPath();
      ctx.arc(0, -34, 10.5, Math.PI, Math.PI * 2);
      ctx.lineTo(8, -27);
      ctx.lineTo(2, -22);
      ctx.lineTo(0, -27);
      ctx.lineTo(-2, -22);
      ctx.lineTo(-8, -27);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = look.accent;
      ctx.fillRect(-7, -35, 5, 2);
      ctx.fillRect(2, -35, 5, 2);
      if (look.mask === 3) {
        for (let a = 0; a < 8; a += 1) {
          ctx.save();
          ctx.translate(0, -34);
          ctx.rotate((Math.PI * 2 * a) / 8);
          ctx.fillRect(-1.5, -16, 3, 7);
          ctx.restore();
        }
      }
    } else {
      ctx.fillStyle = look.hairColor;
      if (look.hair === 1) {
        ctx.beginPath();
        ctx.moveTo(-9, -38);
        ctx.lineTo(-4, -48);
        ctx.lineTo(0, -39);
        ctx.lineTo(5, -48);
        ctx.lineTo(9, -38);
        ctx.fill();
      } else if (look.hair === 2) {
        ctx.beginPath();
        ctx.arc(0, -39, 9, Math.PI, Math.PI * 2);
        ctx.fill();
      } else if (look.hair === 3) {
        roundedRect(-11, -43, 22, 11, 6);
        ctx.fill();
      } else if (look.hair === 4) {
        roundedRect(-11, -43, 22, 24, 8);
        ctx.fill();
        ctx.fillStyle = skinTones[look.skin];
        ctx.beginPath();
        ctx.arc(0, -33, 8, 0, Math.PI * 2);
        ctx.fill();
      } else if (look.hair === 5) {
        ctx.beginPath();
        ctx.arc(-12, -34, 6, 0, Math.PI * 2);
        ctx.arc(12, -34, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, -39, 9, Math.PI, Math.PI * 2);
        ctx.fill();
      }
    }

    if (look.accessory === "headband") {
      ctx.strokeStyle = look.accent;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-10, -36);
      ctx.lineTo(11, -36);
      ctx.stroke();
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(9, -36);
      ctx.lineTo(17, -29);
      ctx.stroke();
    } else if (look.accessory === "goggles") {
      ctx.strokeStyle = look.accent;
      ctx.lineWidth = 2;
      ctx.strokeRect(-8, -37, 6, 5);
      ctx.strokeRect(2, -37, 6, 5);
    } else if (look.accessory === "star") {
      fillText("★", 0, -34, 9, look.accent, "center", 900);
    } else if (look.accessory === "moon") {
      fillText("☾", 0, -3, 10, look.accent, "center", 900);
    } else if (look.accessory === "bolt") {
      fillText("ϟ", 0, -34, 10, look.accent, "center", 900);
    } else if (look.accessory === "gloves") {
      ctx.fillStyle = look.accent;
      ctx.beginPath();
      ctx.arc(-16, -1, 4, 0, Math.PI * 2);
      ctx.arc(16, -1, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (look.accessory === "wrist") {
      ctx.fillStyle = look.accent;
      ctx.fillRect(-20, -5, 8, 5);
      ctx.fillRect(12, -5, 8, 5);
    }

    ctx.fillStyle = "#f4f1f7";
    ctx.beginPath();
    ctx.arc(-4, -33, 1.1, 0, Math.PI * 2);
    ctx.arc(4, -33, 1.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawTargetCard(stage) {
    roundedRect(12, 10, 322, 92, 18);
    ctx.fillStyle = "rgba(8,8,12,.88)";
    ctx.fill();
    ctx.strokeStyle = `${stage.colors[0]}aa`;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.save();
    ctx.translate(45, 72);
    drawPerson({ x: 0, y: 0, look: stage.target[state.round].look, phase: 0 }, 0.9, true);
    ctx.restore();
    fillText(`目標 ${state.round + 1}/3`, 79, 29, 11, stage.colors[0], "left", 850);
    fillText(stage.target[state.round].name, 79, 50, 16, "#fff", "left", 900);
    fillText(stage.target[state.round].clue, 79, 76, 12, "#c7c3ce", "left", 600);

    roundedRect(278, 20, 44, 31, 10);
    ctx.fillStyle = `${stage.colors[0]}20`;
    ctx.fill();
    fillText(String(Math.ceil(state.timer)).padStart(2, "0"), 300, 36, 16, stage.colors[0], "center", 900);
    fillText(state.stageIndex + 1 + "/4", 300, 72, 11, "#aaa5b3", "center", 750);
  }

  function drawPlaying() {
    const stage = stages[state.stageIndex];
    drawBackdrop(stage);
    ctx.save();
    if (state.shake > 0) ctx.translate(Math.sin(state.elapsed * 90) * 4, 0);
    drawVenue(stage);

    state.crowd.forEach((person) => drawPerson(person));

    if (state.hintActive > 0) {
      const target = state.crowd.find((person) => person.target);
      if (target) {
        const pulse = 30 + Math.sin(state.elapsed * 8) * 7;
        ctx.strokeStyle = `${stage.colors[0]}dd`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(target.x, target.y - 18, pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `${stage.colors[0]}20`;
        ctx.fill();
      }
    }
    ctx.restore();

    drawTargetCard(stage);
    ctx.fillStyle = "rgba(6,6,10,.94)";
    ctx.fillRect(0, 636, W, 84);
    drawButton(buttonRects.hint, `提示 ×${state.hints}`, stage.colors[0], true);
    drawButton(buttonRects.pause, `暫停  ·  ${state.score.toLocaleString("zh-HK")}`, stage.colors[0], true);

    if (state.feedbackTime > 0) {
      roundedRect(85, 566, 220, 42, 14);
      ctx.fillStyle = state.feedback.startsWith("搵到") ? "rgba(20,185,125,.94)" : "rgba(18,18,25,.94)";
      ctx.fill();
      fillText(state.feedback, 195, 587, 15, "#fff", "center", 850);
    }
    drawSoundButton();
  }

  function drawOverlay(title, lines, action, secondary = "") {
    ctx.fillStyle = "rgba(4,4,8,.77)";
    ctx.fillRect(0, 0, W, H);
    roundedRect(27, 180, 336, 360, 28);
    ctx.fillStyle = "rgba(22,21,30,.98)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.15)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
    fillText(title, 195, 238, 30, "#fff", "center", 900);
    lines.forEach((line, index) => {
      fillText(line.text, 195, 304 + index * 36, line.size || 16, line.color || "#c8c4d0", "center", line.weight || 650);
    });
    const actionRect = { ...buttonRects.action, y: 448 };
    drawButton(actionRect, action, stages[state.stageIndex].colors[0]);
    if (secondary) {
      const second = { ...buttonRects.secondary, y: 518 };
      drawButton(second, secondary, stages[state.stageIndex].colors[0], true);
    }
  }

  function drawStageComplete() {
    drawPlaying();
    const last = state.stageIndex === stages.length - 1;
    drawOverlay(
      "過關！",
      [
        { text: stages[state.stageIndex].name, color: stages[state.stageIndex].colors[0], weight: 850 },
        { text: `剩餘 ${Math.ceil(state.timer)} 秒`, size: 14 },
        { text: `目前 ${state.score.toLocaleString("zh-HK")} 分`, size: 22, color: "#fff", weight: 900 },
      ],
      last ? "查看世界巡迴成績" : "前往下一站  →",
      "返回主頁",
    );
  }

  function drawPaused() {
    drawPlaying();
    drawOverlay("已暫停", [{ text: stages[state.stageIndex].name }, { text: "休息一下，計時器已停止", size: 14 }], "繼續尋人", "重新開始這一站");
  }

  function drawTimeup() {
    drawPlaying();
    drawOverlay("時間到！", [{ text: `你搵到 ${state.round}/3 位目標` }, { text: `目前 ${state.score.toLocaleString("zh-HK")} 分`, size: 21, color: "#fff", weight: 900 }], "重試這一站", "返回主頁");
  }

  function drawTourComplete() {
    drawBackdrop(stages[3]);
    ctx.fillStyle = "rgba(4,4,8,.32)";
    ctx.fillRect(0, 0, W, H);
    fillText("WORLD TOUR", 195, 94, 19, "#ed3138", "center", 900);
    fillText("世界巡迴完成！", 195, 136, 31, "#fff", "center", 900);
    fillText(state.score.toLocaleString("zh-HK"), 195, 213, 58, "#f7c948", "center", 950);
    fillText("總分", 195, 254, 13, "#aaa5b3", "center", 700);

    stages.forEach((stage, index) => {
      const y = 300 + index * 58;
      roundedRect(34, y, 322, 44, 13);
      ctx.fillStyle = `${stage.colors[0]}1b`;
      ctx.fill();
      ctx.strokeStyle = `${stage.colors[0]}66`;
      ctx.stroke();
      fillText(`0${index + 1}`, 53, y + 22, 11, stage.colors[0], "left", 850);
      fillText(stage.short, 88, y + 22, 15, "#fff", "left", 850);
      fillText("✓", 334, y + 22, 18, stage.colors[0], "right", 900);
    });

    fillText(`最高分 ${state.best.toLocaleString("zh-HK")}`, 195, 550, 14, "#c7c3ce", "center", 700);
    drawButton(buttonRects.start, "再玩一次  ↻", "#f7c948");
    fillText("原創同人作品・與各團體並無關聯", 195, 692, 10, "#77727f", "center", 550);
    drawSoundButton();
  }

  function render() {
    ctx.save();
    ctx.clearRect(0, 0, W, H);
    if (state.mode === "menu") drawMenu();
    else if (state.mode === "playing") drawPlaying();
    else if (state.mode === "paused") drawPaused();
    else if (state.mode === "stageComplete") drawStageComplete();
    else if (state.mode === "timeup") drawTimeup();
    else if (state.mode === "tourComplete") drawTourComplete();
    ctx.restore();
  }

  function canvasPoint(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * W,
      y: ((event.clientY - rect.top) / rect.height) * H,
    };
  }

  function handlePointer(event) {
    event.preventDefault();
    canvas.focus({ preventScroll: true });
    ensureAudio();
    const { x, y } = canvasPoint(event);

    if (inRect(x, y, buttonRects.sound)) {
      state.sound = !state.sound;
      if (state.sound) tone(620, 0.07, "sine", 0.035);
      render();
      return;
    }

    if (state.mode === "menu" || state.mode === "tourComplete") {
      if (inRect(x, y, buttonRects.start)) startTour();
      render();
      return;
    }

    if (state.mode === "playing") {
      if (inRect(x, y, buttonRects.hint)) useHint();
      else if (inRect(x, y, buttonRects.pause)) {
        state.mode = "paused";
        announce("遊戲已暫停");
      } else if (y >= 112 && y <= 636) {
        const target = state.crowd.find((person) => person.target);
        if (target && Math.abs(x - target.x) <= 23 && y >= target.y - 58 && y <= target.y + 28) foundTarget();
        else wrongTap();
      }
      render();
      return;
    }

    const overlayAction = { ...buttonRects.action, y: 448 };
    const overlaySecondary = { ...buttonRects.secondary, y: 518 };
    if (state.mode === "paused") {
      if (inRect(x, y, overlayAction)) {
        state.mode = "playing";
        announce("繼續遊戲");
      } else if (inRect(x, y, overlaySecondary)) {
        setupStage(state.stageIndex, true);
      }
    } else if (state.mode === "timeup") {
      if (inRect(x, y, overlayAction)) setupStage(state.stageIndex, true);
      else if (inRect(x, y, overlaySecondary)) state.mode = "menu";
    } else if (state.mode === "stageComplete") {
      if (inRect(x, y, overlayAction)) {
        if (state.stageIndex >= stages.length - 1) finishTour();
        else setupStage(state.stageIndex + 1, true);
      } else if (inRect(x, y, overlaySecondary)) {
        state.mode = "menu";
      }
    }
    render();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) canvas.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  canvas.addEventListener("pointerdown", handlePointer, { passive: false });
  canvas.addEventListener("contextmenu", (event) => event.preventDefault());
  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (key === "f") toggleFullscreen();
    else if (key === "h" && state.mode === "playing") useHint();
    else if (key === "p" && (state.mode === "playing" || state.mode === "paused")) {
      state.mode = state.mode === "playing" ? "paused" : "playing";
    } else if (key === "r" && state.mode !== "menu") setupStage(state.stageIndex, true);
    else if (event.key === "Enter") {
      if (state.mode === "menu" || state.mode === "tourComplete") startTour();
      else if (state.mode === "paused") state.mode = "playing";
      else if (state.mode === "timeup") setupStage(state.stageIndex, true);
      else if (state.mode === "stageComplete") {
        if (state.stageIndex >= stages.length - 1) finishTour();
        else setupStage(state.stageIndex + 1, true);
      }
    }
    render();
  });

  window.addEventListener("resize", render);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state.mode === "playing") {
      state.mode = "paused";
      render();
    }
  });

  window.render_game_to_text = () => {
    const stage = stages[state.stageIndex];
    const target = state.crowd.find((person) => person.target);
    return JSON.stringify({
      coordinateSystem: "Canvas logical pixels; origin top-left; x right; y down; 390x720.",
      mode: state.mode,
      stage: state.mode === "menu" ? null : { index: state.stageIndex + 1, total: 4, code: stage.code, name: stage.name },
      round: state.mode === "menu" ? null : { current: state.round + 1, total: 3 },
      target: state.mode === "playing" && target ? { name: stage.target[state.round].name, clue: stage.target[state.round].clue, x: Math.round(target.x), y: Math.round(target.y - 18), hitbox: { left: Math.round(target.x - 23), top: Math.round(target.y - 58), right: Math.round(target.x + 23), bottom: Math.round(target.y + 28) } } : null,
      timerSeconds: Number(state.timer.toFixed(2)),
      score: state.score,
      combo: state.combo,
      wrongTaps: state.wrong,
      hintsRemaining: state.hints,
      hintActive: state.hintActive > 0,
      transitionSeconds: Number(Math.max(0, state.transition).toFixed(2)),
      feedback: state.feedbackTime > 0 ? state.feedback : null,
      controls: state.mode === "menu" ? { startButton: buttonRects.start } : state.mode === "playing" ? { hintButton: buttonRects.hint, pauseButton: buttonRects.pause, fullscreenKey: "f" } : { primaryButton: { ...buttonRects.action, y: 448 }, secondaryButton: { ...buttonRects.secondary, y: 518 } },
    });
  };

  window.advanceTime = (ms) => {
    const frames = Math.max(1, Math.round(ms / (1000 / 60)));
    for (let i = 0; i < frames; i += 1) update(1 / 60);
    render();
  };

  function loop(ts) {
    const dt = (ts - state.lastTs) / 1000;
    state.lastTs = ts;
    update(dt);
    render();
    requestAnimationFrame(loop);
  }

  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
  }

  render();
  requestAnimationFrame(loop);
})();
