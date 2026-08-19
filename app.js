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
      gear: ["#c4952f", "#252a32", "#70439a", "#c8cbd0", "#245f70", "#8f2f38"],
      target: [
        { name: "KENNY OMEGA", clue: "長曲髮＋黑紫青長褲", look: { skin: 1, hair: 4, hairColor: "#4a2b24", top: "#171820", bottom: "#39245f", accent: "#30c8d4", accessory: "wrist", mask: 0, build: "athletic", signature: "omega" } },
        { name: "TONI STORM", clue: "金色波浪髮＋黑銀長袍", look: { skin: 0, hair: 4, hairColor: "#ead8a5", top: "#17171b", bottom: "#272730", accent: "#d7d4cf", accessory: "cape", mask: 0, build: "power", frame: "female", signature: "toni" } },
        { name: "WILL OSPREAY", clue: "金啡短髮＋翡翠綠戰衣", look: { skin: 0, hair: 2, hairColor: "#b48a5a", top: "#176b56", bottom: "#11181a", accent: "#d5e7df", accessory: "wrist", mask: 0, build: "striker", signature: "ospreay" } },
      ],
      crowdBias: "modern",
    },
    {
      code: "STARDOM",
      name: "STARDOM 星光館",
      short: "STARDOM",
      city: "日本・星光女子競技場",
      colors: ["#ff4fa3", "#251734", "#65d9ff"],
      gear: ["#b72b6f", "#252735", "#427b98", "#c9bdcc", "#69305d", "#d06086"],
      target: [
        { name: "STARLIGHT KID", clue: "紅黑虎面罩＋雙馬尾", look: { skin: 0, hair: 5, hairColor: "#17151a", top: "#a51f3c", bottom: "#181820", accent: "#e4d7c5", accessory: "none", mask: 2, build: "striker", frame: "female", signature: "slk" } },
        { name: "SAYA KAMITANI", clue: "長黑髮＋黑紅鎖鏈戰衣", look: { skin: 0, hair: 4, hairColor: "#17151a", top: "#17171d", bottom: "#8f1d35", accent: "#c8c9ce", accessory: "wrist", mask: 0, build: "athletic", frame: "female", signature: "saya" } },
        { name: "MAIKA", clue: "啡紅長髮＋紅金戰衣", look: { skin: 1, hair: 3, hairColor: "#6f3029", top: "#a92d38", bottom: "#521b28", accent: "#d9aa4c", accessory: "wrist", mask: 0, build: "power", frame: "female", signature: "maika" } },
      ],
      crowdBias: "joshi",
    },
    {
      code: "CMLL",
      name: "CMLL 太陽聖殿",
      short: "CMLL",
      city: "墨西哥・太陽聖殿",
      colors: ["#21d4b4", "#122334", "#ff8b32"],
      gear: ["#15867a", "#a5682d", "#293a46", "#6b2d60", "#b8a45f", "#396d53"],
      target: [
        { name: "MÍSTICO", clue: "白金太陽面具＋披風", look: { skin: 2, hair: 0, hairColor: "#19151a", top: "#e9e7df", bottom: "#c39528", accent: "#f5d965", accessory: "cape", mask: 3, build: "athletic", signature: "mistico" } },
        { name: "MÁSCARA DORADA", clue: "金白面具＋金色長褲", look: { skin: 2, hair: 0, hairColor: "#19151a", top: "#d4a72b", bottom: "#f1eee6", accent: "#55a6c8", accessory: "wrist", mask: 2, build: "striker", signature: "dorada" } },
        { name: "ZEUXIS", clue: "黑金面具＋黑金戰衣", look: { skin: 1, hair: 5, hairColor: "#151318", top: "#151519", bottom: "#17171d", accent: "#d1a63c", accessory: "gloves", mask: 1, build: "power", frame: "female", signature: "zeuxis" } },
      ],
      crowdBias: "lucha",
    },
    {
      code: "NJPW",
      name: "新日本・紅日巨蛋",
      short: "新日本",
      city: "日本・紅日巨蛋",
      colors: ["#ed3138", "#151519", "#f4e6c7"],
      gear: ["#ad282e", "#292b31", "#cec7ba", "#5e2026", "#465566", "#7d5932"],
      target: [
        { name: "YOTA TSUJI", clue: "長黑髮＋紅色長大衣", look: { skin: 1, hair: 4, hairColor: "#15151a", top: "#8f2027", bottom: "#17171b", accent: "#d4b07a", accessory: "cape", mask: 0, build: "power", signature: "yota" } },
        { name: "ZACK SABRE JR.", clue: "金啡短髮＋黑金短褲", look: { skin: 0, hair: 2, hairColor: "#9e754c", top: "#202126", bottom: "#15161a", accent: "#d39b37", accessory: "wrist", mask: 0, build: "striker", signature: "zack" } },
        { name: "EL DESPERADO", clue: "紅黑火焰面具＋白護腕", look: { skin: 1, hair: 0, hairColor: "#15151a", top: "#9d2630", bottom: "#17171b", accent: "#ece7df", accessory: "wrist", mask: 3, build: "athletic", signature: "desperado" } },
      ],
      crowdBias: "strong",
    },
  ];

  const skinTones = ["#f4c7a1", "#d99a6c", "#ad6f48", "#77472f", "#5d3527"];
  const hairColors = ["#17151a", "#4c2b1f", "#d5ac63", "#8b2635", "#cfd7e6", "#2d6dd9"];
  const portraitSources = {
    aew: "./assets/portraits/aew-3d.jpg",
    stardom: "./assets/portraits/stardom-3d.jpg",
    cmll: "./assets/portraits/cmll-3d.jpg",
    njpw: "./assets/portraits/njpw-3d.jpg",
    zeuxis: "./assets/portraits/zeuxis-3d.jpg",
  };
  const portraitImages = Object.fromEntries(Object.entries(portraitSources).map(([key, src]) => {
    const image = new Image();
    image.decoding = "async";
    image.src = src;
    image.addEventListener("load", () => render());
    return [key, image];
  }));
  const portraitMap = {
    omega: { sheet: "aew", index: 0, cols: 3, focusY: 8 },
    toni: { sheet: "aew", index: 1, cols: 3, focusY: 6 },
    ospreay: { sheet: "aew", index: 2, cols: 3, focusY: 8 },
    slk: { sheet: "stardom", index: 0, cols: 3, focusY: 0 },
    saya: { sheet: "stardom", index: 1, cols: 3, focusY: 0 },
    maika: { sheet: "stardom", index: 2, cols: 3, focusY: 0 },
    mistico: { sheet: "cmll", index: 0, cols: 3, focusY: 105 },
    dorada: { sheet: "cmll", index: 1, cols: 3, focusY: 105 },
    zeuxis: { sheet: "zeuxis", index: 0, cols: 1, focusY: 25 },
    yota: { sheet: "njpw", index: 0, cols: 3, focusY: 105 },
    zack: { sheet: "njpw", index: 1, cols: 3, focusY: 105 },
    desperado: { sheet: "njpw", index: 2, cols: 3, focusY: 105 },
  };
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
    hitFlash: 0,
    missFlash: 0,
    hitX: 195,
    hitY: 340,
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

  function chamferPath(x, y, w, h, cut = 10) {
    const c = Math.min(cut, w / 3, h / 3);
    ctx.beginPath();
    ctx.moveTo(x + c, y);
    ctx.lineTo(x + w - c, y);
    ctx.lineTo(x + w, y + c);
    ctx.lineTo(x + w, y + h - c);
    ctx.lineTo(x + w - c, y + h);
    ctx.lineTo(x + c, y + h);
    ctx.lineTo(x, y + h - c);
    ctx.lineTo(x, y + c);
    ctx.closePath();
  }

  function drawStarPath(cx, cy, outer, inner, points = 5) {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i += 1) {
      const radius = i % 2 === 0 ? outer : inner;
      const angle = -Math.PI / 2 + (i * Math.PI) / points;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
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
    ctx.shadowColor = subtle ? "rgba(0,0,0,.45)" : `${accent}90`;
    ctx.shadowBlur = subtle ? 8 : 20;
    chamferPath(rect.x, rect.y, rect.w, rect.h, subtle ? 7 : 12);
    const plate = ctx.createLinearGradient(rect.x, rect.y, rect.x, rect.y + rect.h);
    plate.addColorStop(0, subtle ? "rgba(35,38,45,.98)" : accent);
    plate.addColorStop(1, subtle ? "rgba(10,12,17,.98)" : `${accent}ba`);
    ctx.fillStyle = plate;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = subtle ? `${accent}8a` : "rgba(255,255,255,.42)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = subtle ? accent : "rgba(0,0,0,.34)";
    ctx.fillRect(rect.x + 13, rect.y + 7, 31, 2);
    ctx.fillRect(rect.x + rect.w - 44, rect.y + rect.h - 9, 31, 2);
    fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2 + 1, subtle ? 13 : 15, subtle ? "#f4f5f7" : "#090b0f", "center", 900);
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
          top: stage.gear[Math.floor(rng() * stage.gear.length)],
          bottom: stage.gear[Math.floor(rng() * stage.gear.length)],
          accent: stage.gear[Math.floor(rng() * stage.gear.length)],
          accessory: ["none", "headband", "wrist", "goggles", "none", "none"][Math.floor(rng() * 6)],
          mask: stage.crowdBias === "lucha" ? Math.floor(rng() * 4) : (rng() > 0.84 ? 1 : 0),
          build: ["power", "athletic", "striker"][Math.floor(rng() * 3)],
        };
        if (stage.crowdBias === "joshi") {
          look.hair = 2 + Math.floor(rng() * 4);
          look.top = stage.gear[Math.floor(rng() * stage.gear.length)];
        }
        if (slot === state.targetSlot) {
          const targetLook = stage.target[state.round].look;
          look = { ...targetLook, build: targetLook.build || "athletic" };
        }
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
    state.hitFlash = 0;
    state.missFlash = 0;
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
    const target = state.crowd.find((person) => person.target);
    const gain = Math.round(700 + state.timer * 18 + state.combo * 180);
    state.score += gain;
    state.combo += 1;
    state.feedback = `TARGET LOCKED  +${gain}`;
    state.feedbackTime = 0.75;
    state.transition = 0.7;
    state.hitFlash = 0.7;
    if (target) {
      state.hitX = target.x;
      state.hitY = target.y - 18;
    }
    tone(660, 0.09, "square", 0.05);
    tone(880, 0.12, "square", 0.04, 0.08);
    tone(1320, 0.08, "square", 0.025, 0.16);
    announce(`搵到 ${stages[state.stageIndex].target[state.round].name}，加 ${gain} 分`);
  }

  function wrongTap() {
    if (state.transition > 0) return;
    state.timer = Math.max(0, state.timer - 2);
    state.combo = 0;
    state.wrong += 1;
    state.shake = 0.28;
    state.missFlash = 0.32;
    state.feedback = "TARGET MISS  −2 SEC";
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
    if (state.hitFlash > 0) state.hitFlash -= step;
    if (state.missFlash > 0) state.missFlash -= step;
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
    gradient.addColorStop(0, "#141820");
    gradient.addColorStop(0.34, stage.colors[1]);
    gradient.addColorStop(0.72, "#080a0e");
    gradient.addColorStop(1, "#030405");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = stage.colors[0];
    ctx.lineWidth = 1;
    for (let y = 380; y <= H; y += 34) {
      const perspective = (y - 360) / 360;
      ctx.globalAlpha = 0.04 + perspective * 0.12;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    for (let x = -260; x <= 650; x += 52) {
      ctx.globalAlpha = 0.09;
      ctx.beginPath();
      ctx.moveTo(195, 348);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    const sweep = ctx.createLinearGradient(40, 0, 340, 610);
    sweep.addColorStop(0, "rgba(255,255,255,0)");
    sweep.addColorStop(0.5, `${stage.colors[2]}15`);
    sweep.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sweep;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function drawSoundButton() {
    chamferPath(buttonRects.sound.x - 5, buttonRects.sound.y, buttonRects.sound.w + 5, buttonRects.sound.h, 5);
    ctx.fillStyle = "rgba(8,10,14,.9)";
    ctx.fill();
    ctx.strokeStyle = state.sound ? "rgba(255,255,255,.34)" : "rgba(255,255,255,.12)";
    ctx.stroke();
    fillText(state.sound ? "SFX" : "OFF", 359, 34, 9, state.sound ? "#fff" : "#777", "center", 900);
  }

  function drawMenu() {
    const stage = stages[0];
    drawBackdrop(stage);
    fillText("3D ARCADE EDITION // 02", 24, 35, 9, "#8f98a8", "left", 850);
    fillText(`HI-SCORE  ${String(state.best).padStart(6, "0")}`, 24, 55, 10, "#f7c948", "left", 850);
    ctx.save();
    ctx.transform(1, 0, -0.1, 1, 0, 0);
    fillText("RINGSPOTTER", 201, 104, 42, "#f6f7f8", "center", 950);
    fillText("RINGSPOTTER", 198, 108, 42, "#f7c948", "center", 950);
    ctx.restore();
    ctx.fillStyle = "#f7c948";
    ctx.fillRect(25, 137, 92, 4);
    fillText("REAL ROSTER // 3D CROWD HUNT", 126, 139, 9, "#d2d6dc", "left", 900);

    chamferPath(23, 166, 344, 76, 12);
    ctx.fillStyle = "rgba(10,13,18,.92)";
    ctx.fill();
    ctx.strokeStyle = "rgba(247,201,72,.46)";
    ctx.stroke();
    fillText("GLOBAL HUNT PROTOCOL", 42, 188, 11, "#f7c948", "left", 900);
    fillText("LOCK 3 TARGETS // BEAT THE CLOCK", 42, 213, 13, "#ffffff", "left", 850);
    fillText("MISS −2 SEC     SCAN −250 PTS", 42, 230, 9, "#7f8795", "left", 750);

    const cards = [
      { x: 23, y: 260, w: 164, h: 112 },
      { x: 203, y: 260, w: 164, h: 112 },
      { x: 23, y: 390, w: 164, h: 112 },
      { x: 203, y: 390, w: 164, h: 112 },
    ];
    stages.forEach((item, index) => {
      const card = cards[index];
      const glow = ctx.createLinearGradient(card.x, card.y, card.x + card.w, card.y + card.h);
      glow.addColorStop(0, `${item.colors[0]}29`);
      glow.addColorStop(1, "rgba(8,10,14,.96)");
      chamferPath(card.x, card.y, card.w, card.h, 10);
      ctx.fillStyle = glow;
      ctx.fill();
      ctx.strokeStyle = `${item.colors[0]}92`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      fillText(`ZONE 0${index + 1}`, card.x + 14, card.y + 18, 9, item.colors[0], "left", 900);
      fillText(item.short, card.x + 14, card.y + 52, item.short === "STARDOM" ? 17 : 22, "#fff", "left", 950);
      fillText(index === 0 ? "NEON ARENA" : index === 1 ? "STARLIGHT HALL" : index === 2 ? "SOLAR TEMPLE" : "RED SUN DOME", card.x + 14, card.y + 78, 9, "#a7aebb", "left", 750);
      ctx.fillStyle = `${item.colors[0]}cc`;
      ctx.fillRect(card.x + 14, card.y + 94, card.w - 28, 2);
    });

    drawButton(buttonRects.start, "PRESS START // 開始", "#f7c948");
    fillText("12 REAL STARS     04 ZONES     01 TOUR", 195, 676, 9, "#6f7784", "center", 750);
    fillText("UNOFFICIAL FAN TRIBUTE // 非官方粉絲作品", 195, 694, 8, "#555d69", "center", 700);
    drawSoundButton();
  }

  function drawVenue(stage) {
    const y0 = 112;
    ctx.save();
    chamferPath(10, y0, 370, 520, 12);
    ctx.clip();

    const venue = ctx.createLinearGradient(0, y0, 0, 632);
    venue.addColorStop(0, "#151a22");
    venue.addColorStop(0.22, stage.colors[1]);
    venue.addColorStop(0.7, "#0c0f14");
    venue.addColorStop(1, "#050609");
    ctx.fillStyle = venue;
    ctx.fillRect(10, y0, 370, 520);

    const arenaDepth = ctx.createRadialGradient(195, 310, 24, 195, 350, 230);
    arenaDepth.addColorStop(0, `${stage.colors[0]}25`);
    arenaDepth.addColorStop(0.48, `${stage.colors[2]}10`);
    arenaDepth.addColorStop(1, "rgba(0,0,0,.58)");
    ctx.fillStyle = arenaDepth;
    ctx.fillRect(10, y0, 370, 520);

    for (let i = 0; i < 6; i += 1) {
      const x = 36 + i * 66;
      const beam = ctx.createLinearGradient(x, 116, x + 32, 570);
      beam.addColorStop(0, `${stage.colors[0]}52`);
      beam.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(x - 9, 112);
      ctx.lineTo(x - 32, 570);
      ctx.lineTo(x + 44, 570);
      ctx.lineTo(x + 10, 112);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(2,3,5,.78)";
    ctx.fillRect(10, 112, 370, 28);
    for (let i = 0; i < 18; i += 1) {
      ctx.fillStyle = i % 2 ? `${stage.colors[0]}42` : `${stage.colors[2]}22`;
      ctx.fillRect(17 + i * 21, 131, 14, 3);
    }

    ctx.strokeStyle = `${stage.colors[0]}99`;
    ctx.lineWidth = 2;
    chamferPath(20, 124, 350, 476, 8);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255,255,255,.08)";
    for (let y = 168; y < 610; y += 65) {
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(370, y);
      ctx.stroke();
    }

    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = stage.colors[0];
    ctx.lineWidth = 5;
    if (stage.code === "AEW") {
      ctx.beginPath();
      ctx.moveTo(90, 190);
      ctx.lineTo(300, 515);
      ctx.moveTo(300, 190);
      ctx.lineTo(90, 515);
      ctx.stroke();
    } else if (stage.code === "STARDOM") {
      drawStarPath(195, 360, 150, 65);
      ctx.stroke();
    } else if (stage.code === "CMLL") {
      ctx.strokeRect(68, 230, 254, 254);
      ctx.strokeRect(108, 270, 174, 174);
    } else if (stage.code === "NJPW") {
      ctx.beginPath();
      ctx.arc(195, 360, 118, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 16; i += 1) {
        const angle = (i / 16) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(195 + Math.cos(angle) * 128, 360 + Math.sin(angle) * 128);
        ctx.lineTo(195 + Math.cos(angle) * 158, 360 + Math.sin(angle) * 158);
        ctx.stroke();
      }
    }
    ctx.restore();

    const floor = ctx.createLinearGradient(0, 548, 0, 632);
    floor.addColorStop(0, "rgba(255,255,255,.01)");
    floor.addColorStop(1, `${stage.colors[0]}22`);
    ctx.fillStyle = floor;
    ctx.fillRect(10, 548, 370, 84);
    const floorGlow = ctx.createRadialGradient(195, 580, 8, 195, 590, 180);
    floorGlow.addColorStop(0, `${stage.colors[0]}30`);
    floorGlow.addColorStop(0.55, `${stage.colors[2]}10`);
    floorGlow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = floorGlow;
    ctx.fillRect(10, 548, 370, 84);
    ctx.strokeStyle = `${stage.colors[0]}36`;
    ctx.beginPath();
    ctx.moveTo(46, 632);
    ctx.lineTo(195, 548);
    ctx.lineTo(344, 632);
    ctx.stroke();

    ctx.restore();
  }

  function drawSignatureBack(look, shoulder, ink) {
    const signature = look.signature;
    if (!signature) return;
    ctx.save();
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2;

    if (signature === "toni") {
      const robe = ctx.createLinearGradient(-22, -28, 22, 20);
      robe.addColorStop(0, "#111217");
      robe.addColorStop(0.5, "#d0d0ce");
      robe.addColorStop(0.62, "#292a31");
      robe.addColorStop(1, "#0c0d10");
      ctx.fillStyle = robe;
      ctx.beginPath();
      ctx.moveTo(-shoulder, -27);
      ctx.lineTo(-23, 23);
      ctx.lineTo(-6, 18);
      ctx.lineTo(0, 3);
      ctx.lineTo(6, 18);
      ctx.lineTo(23, 23);
      ctx.lineTo(shoulder, -27);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "#ece9df";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-shoulder + 3, -24);
      ctx.lineTo(-18, 18);
      ctx.moveTo(shoulder - 3, -24);
      ctx.lineTo(18, 18);
      ctx.stroke();
    } else if (signature === "yota") {
      ctx.fillStyle = "#781c25";
      ctx.beginPath();
      ctx.moveTo(-shoulder, -27);
      ctx.lineTo(-22, 25);
      ctx.lineTo(-4, 17);
      ctx.lineTo(0, -3);
      ctx.lineTo(4, 17);
      ctx.lineTo(22, 25);
      ctx.lineTo(shoulder, -27);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "#c8a468";
      ctx.beginPath();
      ctx.moveTo(-shoulder + 2, -22);
      ctx.lineTo(-16, 19);
      ctx.moveTo(shoulder - 2, -22);
      ctx.lineTo(16, 19);
      ctx.stroke();
    } else if (signature === "mistico") {
      ctx.fillStyle = "#eeece5";
      ctx.beginPath();
      ctx.moveTo(-shoulder + 2, -24);
      ctx.lineTo(-22, 18);
      ctx.lineTo(0, 11);
      ctx.lineTo(22, 18);
      ctx.lineTo(shoulder - 2, -24);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "#d7ac38";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-18, 14);
      ctx.lineTo(0, 8);
      ctx.lineTo(18, 14);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawSignatureGear(look, shoulder, waist, ink) {
    const signature = look.signature;
    if (!signature) return;
    ctx.save();
    ctx.lineJoin = "miter";
    ctx.strokeStyle = ink;
    ctx.lineWidth = 1;

    if (signature === "omega") {
      ctx.fillStyle = "#2fc1d0";
      ctx.beginPath();
      ctx.moveTo(-10, -21);
      ctx.lineTo(0, -12);
      ctx.lineTo(10, -21);
      ctx.lineTo(7, -24);
      ctx.lineTo(0, -18);
      ctx.lineTo(-7, -24);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#6a42a0";
      ctx.fillRect(-11, 4, 5, 18);
      ctx.fillRect(6, 4, 5, 18);
      ctx.fillStyle = "#31cad4";
      ctx.fillRect(-13, 18, 8, 3);
      ctx.fillRect(5, 18, 8, 3);
    } else if (signature === "toni") {
      ctx.strokeStyle = "#e6e2dc";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-8, -25);
      ctx.lineTo(-3, -8);
      ctx.lineTo(-7, 4);
      ctx.moveTo(8, -25);
      ctx.lineTo(3, -8);
      ctx.lineTo(7, 4);
      ctx.stroke();
      ctx.fillStyle = "#d7d4cf";
      ctx.fillRect(-11, 3, 22, 3);
      for (let i = -8; i <= 8; i += 4) ctx.fillRect(i, 6, 1, 5);
    } else if (signature === "ospreay") {
      ctx.fillStyle = "#dce7e3";
      ctx.beginPath();
      ctx.moveTo(-10, -22);
      ctx.lineTo(0, -12);
      ctx.lineTo(10, -22);
      ctx.lineTo(8, -17);
      ctx.lineTo(0, -8);
      ctx.lineTo(-8, -17);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#168b6c";
      ctx.fillRect(-11, 5, 5, 17);
      ctx.fillRect(6, 5, 5, 17);
    } else if (signature === "slk") {
      ctx.fillStyle = "#111217";
      ctx.beginPath();
      ctx.moveTo(-12, -21);
      ctx.lineTo(-3, -16);
      ctx.lineTo(-8, -11);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(12, -21);
      ctx.lineTo(3, -16);
      ctx.lineTo(8, -11);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#a81e3a";
      ctx.fillRect(-13, 1, 26, 7);
      ctx.strokeStyle = "#ddd7cc";
      ctx.lineWidth = 1;
      for (let x = -10; x <= 10; x += 5) {
        ctx.beginPath();
        ctx.moveTo(x, 1);
        ctx.lineTo(x, 8);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(-13, 4);
      ctx.lineTo(13, 4);
      ctx.stroke();
    } else if (signature === "saya") {
      ctx.strokeStyle = "#bb2d43";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-10, -23);
      ctx.lineTo(9, 1);
      ctx.moveTo(10, -23);
      ctx.lineTo(-8, -2);
      ctx.stroke();
      ctx.fillStyle = "#c6c9cf";
      for (let i = -8; i <= 8; i += 4) ctx.fillRect(i, -9 + Math.abs(i) * 0.35, 2, 2);
    } else if (signature === "maika") {
      ctx.fillStyle = "#d4a343";
      ctx.beginPath();
      ctx.moveTo(-11, -23);
      ctx.lineTo(0, -13);
      ctx.lineTo(11, -23);
      ctx.lineTo(7, -8);
      ctx.lineTo(0, -3);
      ctx.lineTo(-7, -8);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#f0dfbd";
      ctx.fillRect(-10, 1, 20, 3);
    } else if (signature === "mistico") {
      ctx.fillStyle = "#d4aa38";
      drawStarPath(0, -15, 8, 3.5, 8);
      ctx.fill();
      ctx.fillStyle = "#f4f0e6";
      ctx.fillRect(-11, 4, 8, 18);
      ctx.fillRect(3, 4, 8, 18);
    } else if (signature === "dorada") {
      ctx.fillStyle = "#55a6c8";
      ctx.beginPath();
      ctx.moveTo(-10, -22);
      ctx.lineTo(0, -13);
      ctx.lineTo(10, -22);
      ctx.lineTo(8, -17);
      ctx.lineTo(0, -8);
      ctx.lineTo(-8, -17);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(-11, 6, 5, 16);
      ctx.fillRect(6, 6, 5, 16);
    } else if (signature === "zeuxis") {
      ctx.strokeStyle = "#d1a63c";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-10, -22);
      ctx.lineTo(0, -10);
      ctx.lineTo(10, -22);
      ctx.moveTo(-waist, 3);
      ctx.lineTo(0, -2);
      ctx.lineTo(waist, 3);
      ctx.stroke();
      ctx.fillStyle = "#d1a63c";
      ctx.fillRect(-12, 18, 9, 4);
      ctx.fillRect(3, 18, 9, 4);
    } else if (signature === "yota") {
      ctx.fillStyle = "#d0aa70";
      ctx.beginPath();
      ctx.moveTo(-10, -22);
      ctx.lineTo(0, -13);
      ctx.lineTo(10, -22);
      ctx.lineTo(6, -8);
      ctx.lineTo(-6, -8);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#9b2530";
      ctx.fillRect(-12, 2, 24, 4);
    } else if (signature === "zack") {
      ctx.fillStyle = "#d29a36";
      ctx.beginPath();
      ctx.moveTo(-10, -20);
      ctx.lineTo(0, -12);
      ctx.lineTo(10, -20);
      ctx.lineTo(7, -16);
      ctx.lineTo(0, -8);
      ctx.lineTo(-7, -16);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(-12, 5, 6, 8);
      ctx.fillRect(6, 5, 6, 8);
    } else if (signature === "desperado") {
      ctx.fillStyle = "#eee9df";
      ctx.beginPath();
      ctx.moveTo(-11, -20);
      ctx.lineTo(-4, -14);
      ctx.lineTo(-8, -8);
      ctx.lineTo(-2, -2);
      ctx.lineTo(-9, 2);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(11, -20);
      ctx.lineTo(4, -14);
      ctx.lineTo(8, -8);
      ctx.lineTo(2, -2);
      ctx.lineTo(9, 2);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function drawSignatureFace(look, skin, ink) {
    const signature = look.signature;
    if (!signature) return;
    ctx.save();
    ctx.lineJoin = "round";

    if (signature === "omega") {
      ctx.fillStyle = "#b28b64";
      ctx.beginPath();
      ctx.moveTo(-11, -29);
      ctx.lineTo(-8, -19);
      ctx.lineTo(-4, -24);
      ctx.lineTo(-5, -31);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(11, -29);
      ctx.lineTo(8, -19);
      ctx.lineTo(4, -24);
      ctx.lineTo(5, -31);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#3c241f";
      ctx.beginPath();
      ctx.moveTo(-6, -30);
      ctx.lineTo(0, -25);
      ctx.lineTo(6, -30);
      ctx.lineTo(4, -24);
      ctx.lineTo(0, -21.5);
      ctx.lineTo(-4, -24);
      ctx.closePath();
      ctx.fill();
    } else if (signature === "toni") {
      ctx.fillStyle = "#f0dfad";
      for (const [x, y, r] of [[-11, -40, 4], [10, -40, 4], [-12, -33, 4], [11, -32, 4]]) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = "#8a2630";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-3, -28);
      ctx.lineTo(0, -27);
      ctx.lineTo(3, -28);
      ctx.stroke();
    } else if (signature === "ospreay") {
      ctx.fillStyle = "#b99163";
      for (const [x, y] of [[-7,-43],[-2,-45],[3,-44],[7,-41]]) {
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#6c4c34";
      ctx.beginPath();
      ctx.moveTo(-5, -30);
      ctx.lineTo(0, -25);
      ctx.lineTo(5, -30);
      ctx.lineTo(3, -24);
      ctx.lineTo(-3, -24);
      ctx.closePath();
      ctx.fill();
    } else if (signature === "slk") {
      ctx.fillStyle = "#17171c";
      ctx.beginPath();
      ctx.moveTo(-9, -42);
      ctx.lineTo(-5, -50);
      ctx.lineTo(-1, -42);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(9, -42);
      ctx.lineTo(5, -50);
      ctx.lineTo(1, -42);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#e7dbca";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(-8, -39);
      ctx.lineTo(-2, -35);
      ctx.moveTo(8, -39);
      ctx.lineTo(2, -35);
      ctx.moveTo(-4, -29);
      ctx.lineTo(0, -25);
      ctx.lineTo(4, -29);
      ctx.stroke();
      ctx.fillStyle = "#a51f3c";
      ctx.beginPath();
      ctx.moveTo(-10, -37);
      ctx.lineTo(-18, -33);
      ctx.lineTo(-15, -25);
      ctx.lineTo(-9, -29);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(10, -37);
      ctx.lineTo(18, -33);
      ctx.lineTo(15, -25);
      ctx.lineTo(9, -29);
      ctx.closePath();
      ctx.fill();
    } else if (signature === "saya") {
      ctx.strokeStyle = "#a7263b";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(8, -41);
      ctx.lineTo(11, -24);
      ctx.stroke();
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-6, -35);
      ctx.lineTo(-1, -34);
      ctx.moveTo(6, -35);
      ctx.lineTo(1, -34);
      ctx.stroke();
    } else if (signature === "maika") {
      ctx.fillStyle = "#a14b36";
      ctx.beginPath();
      ctx.moveTo(-10, -42);
      ctx.lineTo(-14, -29);
      ctx.lineTo(-8, -24);
      ctx.lineTo(-6, -39);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#50251f";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-6, -35);
      ctx.lineTo(-1, -34);
      ctx.moveTo(6, -35);
      ctx.lineTo(1, -34);
      ctx.stroke();
    } else if (signature === "mistico") {
      ctx.fillStyle = "#d9ad38";
      drawStarPath(0, -36, 12, 8, 8);
      ctx.fill();
      ctx.fillStyle = "#f0eee8";
      ctx.beginPath();
      ctx.moveTo(-7, -38);
      ctx.lineTo(-1, -36);
      ctx.lineTo(-2, -32);
      ctx.lineTo(-7, -33);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(7, -38);
      ctx.lineTo(1, -36);
      ctx.lineTo(2, -32);
      ctx.lineTo(7, -33);
      ctx.closePath();
      ctx.fill();
    } else if (signature === "dorada") {
      ctx.strokeStyle = "#f1eee6";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-8, -39);
      ctx.lineTo(-2, -35);
      ctx.lineTo(-7, -31);
      ctx.moveTo(8, -39);
      ctx.lineTo(2, -35);
      ctx.lineTo(7, -31);
      ctx.moveTo(0, -42);
      ctx.lineTo(0, -25);
      ctx.stroke();
      ctx.strokeStyle = "#55a6c8";
      ctx.beginPath();
      ctx.moveTo(-9, -28);
      ctx.lineTo(0, -24);
      ctx.lineTo(9, -28);
      ctx.stroke();
    } else if (signature === "zeuxis") {
      ctx.strokeStyle = "#d1a63c";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-8, -40);
      ctx.lineTo(0, -44);
      ctx.lineTo(8, -40);
      ctx.moveTo(-8, -34);
      ctx.lineTo(-2, -31);
      ctx.moveTo(8, -34);
      ctx.lineTo(2, -31);
      ctx.moveTo(-5, -27);
      ctx.lineTo(0, -24);
      ctx.lineTo(5, -27);
      ctx.stroke();
      ctx.fillStyle = "#161419";
      ctx.beginPath();
      ctx.moveTo(-9, -40);
      ctx.lineTo(-18, -34);
      ctx.lineTo(-14, -24);
      ctx.lineTo(-9, -29);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(9, -40);
      ctx.lineTo(18, -34);
      ctx.lineTo(14, -24);
      ctx.lineTo(9, -29);
      ctx.closePath();
      ctx.fill();
    } else if (signature === "yota") {
      ctx.fillStyle = "#111217";
      ctx.beginPath();
      ctx.moveTo(-10, -42);
      ctx.lineTo(-13, -22);
      ctx.lineTo(-7, -26);
      ctx.lineTo(-5, -40);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(10, -42);
      ctx.lineTo(13, -22);
      ctx.lineTo(7, -26);
      ctx.lineTo(5, -40);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#31201b";
      ctx.beginPath();
      ctx.moveTo(-6, -30);
      ctx.lineTo(0, -24);
      ctx.lineTo(6, -30);
      ctx.lineTo(4, -23);
      ctx.lineTo(-4, -23);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#f3eee5";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-3, -28);
      ctx.lineTo(0, -27);
      ctx.lineTo(3, -28);
      ctx.stroke();
    } else if (signature === "zack") {
      ctx.strokeStyle = "#5d3e29";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-6, -36);
      ctx.lineTo(-1, -34);
      ctx.moveTo(6, -36);
      ctx.lineTo(1, -34);
      ctx.stroke();
    } else if (signature === "desperado") {
      ctx.fillStyle = "#15151a";
      ctx.beginPath();
      ctx.moveTo(-9, -42);
      ctx.lineTo(-5, -50);
      ctx.lineTo(-1, -42);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(9, -42);
      ctx.lineTo(5, -50);
      ctx.lineTo(1, -42);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#f0ebe3";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-8, -40);
      ctx.lineTo(-2, -35);
      ctx.lineTo(-7, -30);
      ctx.moveTo(8, -40);
      ctx.lineTo(2, -35);
      ctx.lineTo(7, -30);
      ctx.moveTo(-5, -26);
      ctx.lineTo(0, -23);
      ctx.lineTo(5, -26);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawPersonLegacy(person, scale = 1, still = false) {
    const { look } = person;
    const bob = still ? 0 : Math.sin(state.elapsed * 2.4 + person.phase) * 1.1;
    const build = look.build || "athletic";
    const femaleFrame = look.frame === "female";
    const shoulderBase = build === "power" ? 18 : build === "striker" ? 14.5 : 16;
    const shoulder = femaleFrame ? shoulderBase - 1.8 : shoulderBase;
    const waist = femaleFrame ? 8.5 : build === "power" ? 11.5 : 9.5;
    const skin = skinTones[look.skin];
    const ink = "#090b0f";
    ctx.save();
    ctx.translate(person.x, person.y + bob);
    ctx.scale(scale, scale);
    ctx.lineJoin = "miter";
    ctx.lineCap = "butt";

    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.ellipse(0, 27, 21, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    drawSignatureBack(look, shoulder, ink);

    if (look.accessory === "cape" && !["toni", "yota", "mistico"].includes(look.signature)) {
      ctx.fillStyle = look.accent;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-shoulder + 2, -25);
      ctx.lineTo(-20, 18);
      ctx.lineTo(0, 12);
      ctx.lineTo(20, 18);
      ctx.lineTo(shoulder - 2, -25);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    if (look.accessory === "feathers") {
      ctx.fillStyle = look.accent;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1.5;
      for (let i = -2; i <= 2; i += 1) {
        ctx.save();
        ctx.rotate(i * 0.12);
        ctx.beginPath();
        ctx.moveTo(i * 4 - 2, -23);
        ctx.lineTo(i * 7, -43 - Math.abs(i) * 2);
        ctx.lineTo(i * 4 + 3, -25);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }

    ctx.strokeStyle = ink;
    ctx.lineWidth = 2;

    ctx.fillStyle = look.bottom;
    ctx.beginPath();
    ctx.moveTo(-waist, -2);
    ctx.lineTo(-1, -2);
    ctx.lineTo(-2, 14);
    ctx.lineTo(-8, 25);
    ctx.lineTo(-14, 25);
    ctx.lineTo(-11, 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(waist, -2);
    ctx.lineTo(1, -2);
    ctx.lineTo(2, 14);
    ctx.lineTo(8, 25);
    ctx.lineTo(14, 25);
    ctx.lineTo(11, 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = look.accent;
    ctx.fillRect(-14, 20, 11, 6);
    ctx.fillRect(3, 20, 11, 6);
    ctx.strokeRect(-14, 20, 11, 6);
    ctx.strokeRect(3, 20, 11, 6);

    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.moveTo(-shoulder + 2, -23);
    ctx.lineTo(-22, -15);
    ctx.lineTo(-20, 2);
    ctx.lineTo(-15, 7);
    ctx.lineTo(-11, 2);
    ctx.lineTo(-12, -12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(shoulder - 2, -23);
    ctx.lineTo(22, -15);
    ctx.lineTo(20, 2);
    ctx.lineTo(15, 7);
    ctx.lineTo(11, 2);
    ctx.lineTo(12, -12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = look.top;
    ctx.beginPath();
    ctx.moveTo(-8, -29);
    ctx.lineTo(-shoulder, -23);
    ctx.lineTo(-12, -4);
    ctx.lineTo(-waist, 6);
    ctx.lineTo(waist, 6);
    ctx.lineTo(12, -4);
    ctx.lineTo(shoulder, -23);
    ctx.lineTo(8, -29);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    const shade = ctx.createLinearGradient(-shoulder, 0, shoulder, 0);
    shade.addColorStop(0, "rgba(0,0,0,.28)");
    shade.addColorStop(0.48, "rgba(255,255,255,.05)");
    shade.addColorStop(1, "rgba(0,0,0,.38)");
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-8, -28);
    ctx.lineTo(-shoulder + 1, -22);
    ctx.lineTo(-waist + 1, 5);
    ctx.lineTo(waist - 1, 5);
    ctx.lineTo(shoulder - 1, -22);
    ctx.lineTo(8, -28);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = look.accent;
    ctx.beginPath();
    ctx.moveTo(-9, -9);
    ctx.lineTo(9, -9);
    ctx.lineTo(8, -5);
    ctx.lineTo(-8, -5);
    ctx.closePath();
    ctx.fill();

    drawSignatureGear(look, shoulder, waist, ink);

    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.moveTo(-7.5, -42);
    ctx.lineTo(7.5, -42);
    ctx.lineTo(10, -35);
    ctx.lineTo(7, -27);
    ctx.lineTo(0, -23.5);
    ctx.lineTo(-7, -27);
    ctx.lineTo(-10, -35);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (look.mask) {
      ctx.fillStyle = look.top;
      ctx.beginPath();
      ctx.moveTo(-8.5, -42);
      ctx.lineTo(8.5, -42);
      ctx.lineTo(10, -34);
      ctx.lineTo(6, -26);
      ctx.lineTo(0, -23.5);
      ctx.lineTo(-6, -26);
      ctx.lineTo(-10, -34);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = look.accent;
      ctx.beginPath();
      ctx.moveTo(-7, -36);
      ctx.lineTo(-1, -35);
      ctx.lineTo(-2, -32);
      ctx.lineTo(-7, -33);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(7, -36);
      ctx.lineTo(1, -35);
      ctx.lineTo(2, -32);
      ctx.lineTo(7, -33);
      ctx.closePath();
      ctx.fill();
      if (look.mask === 3) {
        for (let a = 0; a < 8; a += 1) {
          ctx.save();
          ctx.translate(0, -35);
          ctx.rotate((Math.PI * 2 * a) / 8);
          ctx.fillRect(-1, -14, 2, 6);
          ctx.restore();
        }
      }
    } else {
      ctx.fillStyle = look.hairColor;
      if (look.hair === 1) {
        ctx.beginPath();
        ctx.moveTo(-9, -39);
        ctx.lineTo(-6, -49);
        ctx.lineTo(-1, -42);
        ctx.lineTo(4, -50);
        ctx.lineTo(9, -39);
        ctx.closePath();
        ctx.fill();
      } else if (look.hair === 2) {
        ctx.beginPath();
        ctx.moveTo(-9, -40);
        ctx.lineTo(-5, -46);
        ctx.lineTo(8, -44);
        ctx.lineTo(10, -36);
        ctx.lineTo(4, -40);
        ctx.closePath();
        ctx.fill();
      } else if (look.hair === 3) {
        ctx.beginPath();
        ctx.moveTo(-10, -41);
        ctx.lineTo(-6, -48);
        ctx.lineTo(8, -46);
        ctx.lineTo(11, -38);
        ctx.closePath();
        ctx.fill();
      } else if (look.hair === 4) {
        ctx.beginPath();
        ctx.moveTo(-10, -42);
        ctx.lineTo(10, -42);
        ctx.lineTo(12, -26);
        ctx.lineTo(7, -22);
        ctx.lineTo(6, -39);
        ctx.lineTo(-6, -39);
        ctx.lineTo(-7, -22);
        ctx.lineTo(-12, -26);
        ctx.closePath();
        ctx.fill();
      } else if (look.hair === 5) {
        ctx.beginPath();
        ctx.moveTo(-8, -43);
        ctx.lineTo(0, -48);
        ctx.lineTo(8, -43);
        ctx.lineTo(7, -39);
        ctx.lineTo(-7, -39);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-8, -39);
        ctx.lineTo(-18, -35);
        ctx.lineTo(-17, -27);
        ctx.lineTo(-10, -30);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(8, -39);
        ctx.lineTo(18, -35);
        ctx.lineTo(17, -27);
        ctx.lineTo(10, -30);
        ctx.closePath();
        ctx.fill();
      }
      ctx.strokeStyle = "rgba(0,0,0,.72)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(-6, -35);
      ctx.lineTo(-2, -34);
      ctx.moveTo(6, -35);
      ctx.lineTo(2, -34);
      ctx.stroke();
    }

    if (look.accessory === "headband") {
      ctx.strokeStyle = look.accent;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-9, -38);
      ctx.lineTo(10, -38);
      ctx.stroke();
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(8, -38);
      ctx.lineTo(17, -31);
      ctx.stroke();
    } else if (look.accessory === "goggles") {
      ctx.strokeStyle = look.accent;
      ctx.lineWidth = 2;
      ctx.strokeRect(-8, -38, 6, 5);
      ctx.strokeRect(2, -38, 6, 5);
      ctx.beginPath();
      ctx.moveTo(-2, -35.5);
      ctx.lineTo(2, -35.5);
      ctx.stroke();
    } else if (look.accessory === "star") {
      ctx.fillStyle = look.accent;
      drawStarPath(0, -34.5, 5, 2.1);
      ctx.fill();
    } else if (look.accessory === "moon") {
      fillText("☾", 0, 0, 10, look.accent, "center", 900);
    } else if (look.accessory === "bolt") {
      fillText("ϟ", 0, -34, 10, look.accent, "center", 900);
    } else if (look.accessory === "gloves") {
      ctx.fillStyle = look.accent;
      ctx.fillRect(-22, -1, 8, 8);
      ctx.fillRect(14, -1, 8, 8);
    } else if (look.accessory === "wrist") {
      ctx.fillStyle = look.accent;
      ctx.fillRect(-22, -5, 8, 6);
      ctx.fillRect(14, -5, 8, 6);
    }

    drawSignatureFace(look, skin, ink);

    ctx.strokeStyle = "rgba(255,255,255,.13)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-shoulder + 2, -22);
    ctx.lineTo(-8, -28);
    ctx.stroke();
    ctx.restore();
  }

  function drawGlossyShape(color, left, right, path, outline = "rgba(3,5,8,.9)") {
    path();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = outline;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.save();
    path();
    ctx.clip();
    const gloss = ctx.createLinearGradient(left, 0, right, 0);
    gloss.addColorStop(0, "rgba(0,0,0,.55)");
    gloss.addColorStop(0.24, "rgba(255,255,255,.16)");
    gloss.addColorStop(0.48, "rgba(255,255,255,.05)");
    gloss.addColorStop(0.78, "rgba(0,0,0,.18)");
    gloss.addColorStop(1, "rgba(0,0,0,.62)");
    ctx.fillStyle = gloss;
    ctx.fillRect(left - 2, -62, right - left + 4, 96);
    ctx.restore();
  }

  function draw3DLimb(x1, y1, x2, y2, width, color, highlight = -1) {
    ctx.save();
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(2,4,7,.92)";
    ctx.lineWidth = width + 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    const limb = ctx.createLinearGradient(x1 - width, y1, x1 + width, y1);
    limb.addColorStop(0, "rgba(0,0,0,.48)");
    limb.addColorStop(0.28, color);
    limb.addColorStop(0.6, color);
    limb.addColorStop(1, "rgba(0,0,0,.52)");
    ctx.strokeStyle = limb;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,.28)";
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(x1 + highlight * width * 0.18, y1 + 1);
    ctx.lineTo(x2 + highlight * width * 0.18, y2 - 1);
    ctx.stroke();
    ctx.restore();
  }

  function drawPerson(person, scale = 1, still = false) {
    const { look } = person;
    const bob = still ? 0 : Math.sin(state.elapsed * 2.1 + person.phase) * 0.85;
    const build = look.build || "athletic";
    const femaleFrame = look.frame === "female";
    const shoulderBase = build === "power" ? 18.5 : build === "striker" ? 14.5 : 16.5;
    const shoulder = femaleFrame ? shoulderBase - 1.5 : shoulderBase;
    const waist = femaleFrame ? 8.5 : build === "power" ? 11.5 : 9.5;
    const skin = skinTones[look.skin];
    const ink = "#080a0e";
    ctx.save();
    ctx.translate(person.x, person.y + bob);
    ctx.scale(scale, scale);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const floorShadow = ctx.createRadialGradient(0, 27, 1, 0, 27, 23);
    floorShadow.addColorStop(0, "rgba(0,0,0,.78)");
    floorShadow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = floorShadow;
    ctx.beginPath();
    ctx.ellipse(0, 27, 24, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.shadowColor = look.accent;
    ctx.shadowBlur = 4;
    drawSignatureBack(look, shoulder, ink);
    ctx.restore();

    if (look.accessory === "cape" && !["toni", "yota", "mistico"].includes(look.signature)) {
      drawGlossyShape(look.accent, -24, 24, () => {
        ctx.beginPath();
        ctx.moveTo(-shoulder + 2, -25);
        ctx.quadraticCurveTo(-24, -4, -20, 20);
        ctx.quadraticCurveTo(0, 12, 20, 20);
        ctx.quadraticCurveTo(24, -4, shoulder - 2, -25);
        ctx.closePath();
      });
    }

    drawGlossyShape(look.bottom, -14, 0, () => {
      ctx.beginPath();
      ctx.moveTo(-waist, -3);
      ctx.quadraticCurveTo(-12.5, 5, -11, 13);
      ctx.quadraticCurveTo(-10, 18, -13, 23);
      ctx.quadraticCurveTo(-13, 27, -8.5, 27);
      ctx.lineTo(-3.5, 27);
      ctx.quadraticCurveTo(-1.5, 21, -1.2, 14);
      ctx.lineTo(0, -2);
      ctx.closePath();
    });
    drawGlossyShape(look.bottom, 0, 14, () => {
      ctx.beginPath();
      ctx.moveTo(waist, -3);
      ctx.quadraticCurveTo(12.5, 5, 11, 13);
      ctx.quadraticCurveTo(10, 18, 13, 23);
      ctx.quadraticCurveTo(13, 27, 8.5, 27);
      ctx.lineTo(3.5, 27);
      ctx.quadraticCurveTo(1.5, 21, 1.2, 14);
      ctx.lineTo(0, -2);
      ctx.closePath();
    });

    ctx.fillStyle = look.accent;
    roundedRect(-14, 19, 11.5, 8, 3);
    ctx.fill();
    roundedRect(2.5, 19, 11.5, 8, 3);
    ctx.fill();
    ctx.strokeStyle = "rgba(3,5,8,.9)";
    ctx.lineWidth = 1.5;
    roundedRect(-14, 19, 11.5, 8, 3);
    ctx.stroke();
    roundedRect(2.5, 19, 11.5, 8, 3);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-12, 21);
    ctx.lineTo(-5, 21);
    ctx.moveTo(5, 21);
    ctx.lineTo(12, 21);
    ctx.stroke();

    draw3DLimb(-shoulder + 2, -22, -19, -8, build === "power" ? 9 : 8, look.top, -1);
    draw3DLimb(shoulder - 2, -22, 19, -8, build === "power" ? 9 : 8, look.top, 1);
    draw3DLimb(-19, -8, -17, 4, 7, skin, -1);
    draw3DLimb(19, -8, 17, 4, 7, skin, 1);

    drawGlossyShape(look.top, -shoulder, shoulder, () => {
      ctx.beginPath();
      ctx.moveTo(-7.5, -29);
      ctx.quadraticCurveTo(-shoulder, -28, -shoulder, -21);
      ctx.quadraticCurveTo(-14, -8, -waist, 6);
      ctx.quadraticCurveTo(0, 9, waist, 6);
      ctx.quadraticCurveTo(14, -8, shoulder, -21);
      ctx.quadraticCurveTo(shoulder, -28, 7.5, -29);
      ctx.closePath();
    });

    const chestLight = ctx.createRadialGradient(-4, -22, 1, 0, -14, 22);
    chestLight.addColorStop(0, "rgba(255,255,255,.25)");
    chestLight.addColorStop(0.5, "rgba(255,255,255,.03)");
    chestLight.addColorStop(1, "rgba(0,0,0,.25)");
    ctx.fillStyle = chestLight;
    ctx.beginPath();
    ctx.ellipse(0, -14, shoulder - 2, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = look.accent;
    roundedRect(-9.5, -10, 19, 4.5, 2);
    ctx.fill();
    drawSignatureGear(look, shoulder, waist, ink);

    if (!look.mask && (look.hair === 4 || look.hair === 5)) {
      ctx.fillStyle = look.hairColor;
      ctx.shadowColor = "rgba(0,0,0,.5)";
      ctx.shadowBlur = 3;
      if (look.hair === 4) {
        roundedRect(-12, -43, 24, 23, 9);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.ellipse(-14, -33, 6, 11, -0.18, 0, Math.PI * 2);
        ctx.ellipse(14, -33, 6, 11, 0.18, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    const headFill = ctx.createRadialGradient(-4, -39, 1, 1, -34, 15);
    headFill.addColorStop(0, "rgba(255,255,255,.5)");
    headFill.addColorStop(0.18, skin);
    headFill.addColorStop(0.72, skin);
    headFill.addColorStop(1, "rgba(57,23,14,.68)");
    ctx.fillStyle = headFill;
    ctx.beginPath();
    ctx.ellipse(0, -35, 10.5, 12.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = ink;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    if (look.mask) {
      const maskFill = ctx.createLinearGradient(-10, -42, 10, -28);
      maskFill.addColorStop(0, "rgba(255,255,255,.32)");
      maskFill.addColorStop(0.26, look.top);
      maskFill.addColorStop(0.72, look.top);
      maskFill.addColorStop(1, "rgba(0,0,0,.55)");
      ctx.fillStyle = maskFill;
      ctx.beginPath();
      ctx.ellipse(0, -35, 10.4, 12.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = look.accent;
      ctx.beginPath();
      ctx.ellipse(-4.5, -36, 3.1, 1.7, -0.08, 0, Math.PI * 2);
      ctx.ellipse(4.5, -36, 3.1, 1.7, 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.42)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-5, -43);
      ctx.quadraticCurveTo(-1, -46, 2, -43);
      ctx.stroke();
      if (look.mask === 3) {
        ctx.strokeStyle = look.accent;
        ctx.lineWidth = 2;
        for (let a = 0; a < 8; a += 1) {
          const angle = (Math.PI * 2 * a) / 8;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * 9, -35 + Math.sin(angle) * 10);
          ctx.lineTo(Math.cos(angle) * 13, -35 + Math.sin(angle) * 14);
          ctx.stroke();
        }
      }
    } else {
      ctx.fillStyle = look.hairColor;
      ctx.shadowColor = "rgba(0,0,0,.42)";
      ctx.shadowBlur = 2;
      ctx.beginPath();
      if (look.hair === 1) {
        ctx.moveTo(-9, -39);
        ctx.quadraticCurveTo(-7, -50, -2, -43);
        ctx.quadraticCurveTo(4, -51, 9, -39);
        ctx.quadraticCurveTo(1, -45, -9, -39);
      } else if (look.hair === 2) {
        ctx.moveTo(-9, -40);
        ctx.quadraticCurveTo(-4, -47, 8, -44);
        ctx.quadraticCurveTo(11, -40, 8, -36);
        ctx.quadraticCurveTo(1, -42, -9, -40);
      } else if (look.hair === 3) {
        ctx.moveTo(-10, -40);
        ctx.quadraticCurveTo(-5, -49, 8, -46);
        ctx.quadraticCurveTo(12, -42, 10, -34);
        ctx.quadraticCurveTo(2, -42, -10, -40);
      } else {
        ctx.moveTo(-9, -42);
        ctx.quadraticCurveTo(0, -49, 9, -42);
        ctx.lineTo(8, -38);
        ctx.quadraticCurveTo(0, -43, -8, -38);
      }
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(20,12,10,.78)";
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(-6, -35.5);
      ctx.lineTo(-2, -34.8);
      ctx.moveTo(6, -35.5);
      ctx.lineTo(2, -34.8);
      ctx.stroke();
    }

    if (look.accessory === "headband") {
      ctx.strokeStyle = look.accent;
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.moveTo(-9, -38.5);
      ctx.lineTo(10, -38.5);
      ctx.lineTo(17, -32);
      ctx.stroke();
    } else if (look.accessory === "goggles") {
      ctx.strokeStyle = look.accent;
      ctx.lineWidth = 1.7;
      roundedRect(-8.5, -38.5, 7, 5.5, 2);
      ctx.stroke();
      roundedRect(1.5, -38.5, 7, 5.5, 2);
      ctx.stroke();
    } else if (look.accessory === "gloves" || look.accessory === "wrist") {
      ctx.fillStyle = look.accent;
      roundedRect(-21, look.accessory === "gloves" ? -2 : -5, 8, look.accessory === "gloves" ? 8 : 6, 2);
      ctx.fill();
      roundedRect(13, look.accessory === "gloves" ? -2 : -5, 8, look.accessory === "gloves" ? 8 : 6, 2);
      ctx.fill();
    }

    drawSignatureFace(look, skin, ink);

    ctx.strokeStyle = "rgba(255,255,255,.38)";
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(-shoulder + 2, -22);
    ctx.quadraticCurveTo(-12, -14, -waist + 2, 2);
    ctx.moveTo(-5, -44);
    ctx.quadraticCurveTo(-9, -39, -8, -31);
    ctx.stroke();
    ctx.restore();
  }

  function draw3DPortrait(look, x, y, w, h) {
    const portrait = portraitMap[look.signature];
    const image = portrait ? portraitImages[portrait.sheet] : null;
    ctx.save();
    chamferPath(x, y, w, h, 8);
    ctx.clip();
    const backdrop = ctx.createLinearGradient(x, y, x + w, y + h);
    backdrop.addColorStop(0, "#26303c");
    backdrop.addColorStop(0.5, "#10151c");
    backdrop.addColorStop(1, "#020406");
    ctx.fillStyle = backdrop;
    ctx.fillRect(x, y, w, h);
    if (image?.complete && image.naturalWidth > 0) {
      const cellWidth = image.naturalWidth / portrait.cols;
      const sourceHeight = Math.min(image.naturalHeight - portrait.focusY, cellWidth * (h / w));
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        image,
        portrait.index * cellWidth,
        portrait.focusY,
        cellWidth,
        sourceHeight,
        x,
        y,
        w,
        h,
      );
    } else {
      drawPerson({ x: x + w / 2, y: y + h - 5, look, phase: 0 }, 1.05, true);
    }
    const lens = ctx.createLinearGradient(x, y, x + w, y + h);
    lens.addColorStop(0, "rgba(255,255,255,.24)");
    lens.addColorStop(0.34, "rgba(255,255,255,0)");
    lens.addColorStop(1, "rgba(0,0,0,.38)");
    ctx.fillStyle = lens;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
    chamferPath(x, y, w, h, 8);
    ctx.strokeStyle = "rgba(255,255,255,.32)";
    ctx.lineWidth = 1;
    ctx.stroke();
    chamferPath(x + 4, y + h - 15, 25, 11, 3);
    ctx.fillStyle = "rgba(0,0,0,.72)";
    ctx.fill();
    fillText("3D", x + 16.5, y + h - 9.5, 7, "#fff", "center", 950);
  }

  function drawTargetCard(stage) {
    chamferPath(10, 10, 324, 92, 12);
    ctx.fillStyle = "rgba(7,9,13,.96)";
    ctx.fill();
    ctx.strokeStyle = `${stage.colors[0]}bd`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.fillStyle = stage.colors[0];
    ctx.fillRect(10, 10, 4, 92);

    const target = stage.target[state.round];
    draw3DPortrait(target.look, 18, 16, 62, 80);
    fillText(`3D WRESTLER FILE // 0${state.round + 1}`, 89, 27, 8, stage.colors[0], "left", 900);
    fillText(target.name, 89, 50, target.name.length > 14 ? 14 : 16, "#fff", "left", 900);
    fillText(target.clue, 89, 76, 10, "#aeb4bf", "left", 650);

    chamferPath(278, 18, 44, 34, 6);
    ctx.fillStyle = `${stage.colors[0]}18`;
    ctx.fill();
    ctx.strokeStyle = `${stage.colors[0]}66`;
    ctx.stroke();
    fillText(String(Math.ceil(state.timer)).padStart(2, "0"), 300, 35, 17, stage.colors[0], "center", 950);
    fillText(`ZONE 0${state.stageIndex + 1}`, 300, 72, 9, "#7f8793", "center", 850);
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
        const pulse = 28 + Math.sin(state.elapsed * 8) * 4;
        ctx.strokeStyle = `${stage.colors[0]}dd`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(target.x, target.y - 18, pulse, 0, Math.PI * 2);
        ctx.stroke();
        const corners = [
          [-1, -1], [1, -1], [-1, 1], [1, 1],
        ];
        corners.forEach(([sx, sy]) => {
          ctx.beginPath();
          ctx.moveTo(target.x + sx * 34, target.y - 18 + sy * 21);
          ctx.lineTo(target.x + sx * 25, target.y - 18 + sy * 21);
          ctx.lineTo(target.x + sx * 25, target.y - 18 + sy * 30);
          ctx.stroke();
        });
        fillText("SCAN", target.x, target.y - 57, 8, stage.colors[0], "center", 900);
      }
    }

    if (state.hitFlash > 0) {
      const progress = 1 - state.hitFlash / 0.7;
      const radius = 18 + progress * 78;
      ctx.save();
      ctx.globalAlpha = state.hitFlash / 0.7;
      ctx.strokeStyle = "#45ffd1";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(state.hitX, state.hitY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i += 1) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(state.hitX + Math.cos(angle) * (radius + 5), state.hitY + Math.sin(angle) * (radius + 5));
        ctx.lineTo(state.hitX + Math.cos(angle) * (radius + 25), state.hitY + Math.sin(angle) * (radius + 25));
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(state.hitX - 17, state.hitY);
      ctx.lineTo(state.hitX + 17, state.hitY);
      ctx.moveTo(state.hitX, state.hitY - 17);
      ctx.lineTo(state.hitX, state.hitY + 17);
      ctx.stroke();
      ctx.restore();
    }

    if (state.missFlash > 0) {
      ctx.save();
      ctx.globalAlpha = state.missFlash / 0.32;
      ctx.strokeStyle = "#ff3347";
      ctx.lineWidth = 5;
      chamferPath(13, 115, 364, 513, 10);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();

    drawTargetCard(stage);
    ctx.fillStyle = "rgba(4,6,9,.98)";
    ctx.fillRect(0, 636, W, 84);
    ctx.fillStyle = stage.colors[0];
    ctx.fillRect(0, 636, W, 2);
    drawButton(buttonRects.hint, `SCAN // ${state.hints}`, stage.colors[0], true);
    drawButton(buttonRects.pause, `PAUSE // ${state.score.toLocaleString("zh-HK")}`, stage.colors[0], true);

    if (state.feedbackTime > 0) {
      chamferPath(82, 566, 226, 42, 8);
      ctx.fillStyle = state.feedback.startsWith("TARGET LOCKED") ? "rgba(10,106,83,.96)" : "rgba(18,18,25,.96)";
      ctx.fill();
      ctx.strokeStyle = state.feedback.startsWith("TARGET LOCKED") ? "#32e3b6" : "#e84d58";
      ctx.stroke();
      fillText(state.feedback, 195, 587, 13, "#fff", "center", 900);
    }
    drawSoundButton();
  }

  function drawOverlay(title, lines, action, secondary = "") {
    ctx.fillStyle = "rgba(2,3,5,.82)";
    ctx.fillRect(0, 0, W, H);
    chamferPath(27, 180, 336, 360, 18);
    ctx.fillStyle = "rgba(12,15,20,.985)";
    ctx.fill();
    ctx.strokeStyle = `${stages[state.stageIndex].colors[0]}88`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.fillStyle = stages[state.stageIndex].colors[0];
    ctx.fillRect(27, 180, 336, 4);
    fillText("MATCH CONTROL", 195, 208, 9, stages[state.stageIndex].colors[0], "center", 900);
    fillText(title, 195, 248, 29, "#fff", "center", 950);
    lines.forEach((line, index) => {
      fillText(line.text, 195, 310 + index * 36, line.size || 15, line.color || "#aeb4bf", "center", line.weight || 700);
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
      "STAGE CLEAR",
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
    drawOverlay("PAUSE", [{ text: stages[state.stageIndex].name }, { text: "SYSTEM CLOCK SUSPENDED", size: 12 }], "RESUME // 繼續", "RESTART ZONE");
  }

  function drawTimeup() {
    drawPlaying();
    drawOverlay("TIME OVER", [{ text: `TARGET LOCK  ${state.round}/3` }, { text: `SCORE  ${state.score.toLocaleString("zh-HK")}`, size: 21, color: "#fff", weight: 900 }], "RETRY // 重試", "EXIT TO TITLE");
  }

  function drawTourComplete() {
    drawBackdrop(stages[3]);
    ctx.fillStyle = "rgba(4,4,8,.32)";
    ctx.fillRect(0, 0, W, H);
    fillText("WORLD TOUR // COMPLETE", 195, 94, 13, "#ed3138", "center", 950);
    fillText("TOUR CLEAR", 195, 136, 34, "#fff", "center", 950);
    fillText(state.score.toLocaleString("zh-HK"), 195, 213, 58, "#f7c948", "center", 950);
    const rank = state.score >= 14000 ? "S" : state.score >= 10500 ? "A" : "B";
    fillText(`FINAL SCORE // RANK ${rank}`, 195, 254, 11, "#8e96a2", "center", 850);

    stages.forEach((stage, index) => {
      const y = 300 + index * 58;
      chamferPath(34, y, 322, 44, 7);
      ctx.fillStyle = `${stage.colors[0]}13`;
      ctx.fill();
      ctx.strokeStyle = `${stage.colors[0]}66`;
      ctx.stroke();
      fillText(`0${index + 1}`, 53, y + 22, 11, stage.colors[0], "left", 850);
      fillText(stage.short, 88, y + 22, 15, "#fff", "left", 850);
      fillText("✓", 334, y + 22, 18, stage.colors[0], "right", 900);
    });

    fillText(`HI-SCORE // ${state.best.toLocaleString("zh-HK")}`, 195, 550, 12, "#aeb4bf", "center", 800);
    drawButton(buttonRects.start, "NEW RUN // 再玩", "#f7c948");
    fillText("UNOFFICIAL FAN PROJECT // NOT AFFILIATED", 195, 692, 8, "#626975", "center", 650);
    drawSoundButton();
  }

  function drawPostFX() {
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = "#000";
    for (let y = 1; y < H; y += 4) ctx.fillRect(0, y, W, 1);
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "#fff";
    for (let i = 0; i < 16; i += 1) {
      const x = (i * 97 + Math.floor(state.elapsed * 31)) % W;
      const y = (i * 157 + Math.floor(state.elapsed * 19)) % H;
      ctx.fillRect(x, y, 1, 1);
    }
    const vignette = ctx.createRadialGradient(195, 330, 160, 195, 350, 440);
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(0.72, "rgba(0,0,0,.08)");
    vignette.addColorStop(1, "rgba(0,0,0,.56)");
    ctx.globalAlpha = 1;
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
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
    drawPostFX();
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
