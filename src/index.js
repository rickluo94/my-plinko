console.clear();
const width = 620;
const height = 534;
const recordedSeeds = []; // 儲存所有落下記錄

// Note class
class Note {
  constructor(note) {
    this.synth = new Tone.PolySynth().toDestination();
    this.synth.set({
      volume: -6
    });
    this.note = note;
  }
  play() {
    return this.synth.triggerAttackRelease(this.note, "32n", Tone.context.currentTime);
  }
}

// Create notes
const notes = ["C#5", "C5", "B5", "A#5", "A5", "G#4", "G4", "F#4", "F4", "F#4", "G4", "G#4", "A5", "A#5", "B5", "C5", "C#5"].map(note => new Note(note));
let wild = 1;
const wildEl = document.getElementById("wild");
wildEl.innerHTML = 1;
[1, 2, 3, 4].forEach(i => {
  const btn = document.getElementById(`button-x${i}`);
  btn.addEventListener("click", () => {
    wild = i;
    wildEl.innerHTML = i;
    console.log("wild =", wild);
    multipliers = [...multiplierSets[wild]];
    // 更新畫面上的顯示
    multipliers.forEach((m, i) => {
      document.getElementById(`note-${i}`).innerHTML = m;
    });
  });
});
const multiplierSets = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  // 標準
  2: [8.81, 2.96, 1.38, 1.08, 0.98, 0.49, 0.49, 0.49, 0.49, 0.49, 0.49, 0.49, 0.98, 1.08, 1.38, 2.96, 8.81],
  // 低
  3: [21.7, 4.94, 1.97, 1.38, 0.59, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.59, 1.38, 1.97, 4.94, 21.7],
  // 中
  4: [75.2, 9.89, 2.96, 0.89, 0.29, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.29, 0.89, 2.96, 9.89, 75.2] // 高
};
let multipliers = [...multiplierSets[1]];
// const multipliers = [50, 20, 7, 4, 3, 1, 1, 0, 0, 0, 1, 1, 3, 4, 7, 20, 50];

multipliers.forEach((m, i) => document.getElementById(`note-${i}`).innerHTML = m);
let balls = 12;
const ballsEl = document.getElementById("balls");

// Click noise synth when clicking drop
const clickSynth = new Tone.NoiseSynth({
  volume: -26
}).toDestination();

// Drop button
const dropButton = document.getElementById("drop-button");
const autoDropCheckbox = document.getElementById("checkbox");
let autoDropEnabled = false;
let autoDroppingInterval = null;
dropButton.addEventListener("click", () => {
  if (autoDropEnabled && autoDroppingInterval) {
    dropButton.innerHTML = "Start";
    clearInterval(autoDroppingInterval);
    autoDroppingInterval = null;
  } else if (autoDropEnabled && !autoDroppingInterval) {
    dropButton.innerHTML = "Stop";
    dropABall();
    autoDroppingInterval = setInterval(dropABall, 600);
  } else if (!autoDropEnabled) {
    dropABall();
  }
});
autoDropCheckbox.addEventListener("input", e => {
  autoDropEnabled = e.target.checked;
  if (autoDropEnabled) {
    dropButton.innerHTML = "Start";
  } else {
    dropButton.innerHTML = "Drop";
  }
  if (autoDroppingInterval) {
    clearInterval(autoDroppingInterval);
    autoDroppingInterval = null;
  }
});
const preSimulatedSeeds = [{
  x: 335.0784182960668,
  y: -4,
  ballsWon: 3,
  index: 2,
  timestamp: "2025-10-28T02:48:28.106Z"
}, {
  x: 312.0735220327218,
  y: -4,
  ballsWon: 9,
  index: 8,
  timestamp: "2025-10-28T02:48:38.090Z"
}, {
  x: 310.3839106455043,
  y: -4,
  ballsWon: 17,
  index: 16,
  timestamp: "2025-10-28T02:48:54.173Z"
}, {
  x: 338.4758845601669,
  y: -4,
  ballsWon: 8,
  index: 7,
  timestamp: "2025-10-28T02:49:05.255Z"
}, {
  x: 278.67351857328003,
  y: -4,
  ballsWon: 8,
  index: 7,
  timestamp: "2025-10-28T02:49:14.740Z"
}, {
  x: 332.5685989034954,
  y: -4,
  ballsWon: 2,
  index: 1,
  timestamp: "2025-10-28T02:49:21.174Z"
}, {
  x: 278.60560163522763,
  y: -4,
  ballsWon: 2,
  index: 1,
  timestamp: "2025-10-28T02:49:27.024Z"
}, {
  x: 321.9461634613889,
  y: -4,
  ballsWon: 3,
  index: 2,
  timestamp: "2025-10-28T02:49:31.623Z"
}, {
  x: 300.24672742825123,
  y: -4,
  ballsWon: 7,
  index: 6,
  timestamp: "2025-10-28T02:49:37.823Z"
}, {
  x: 328.6624882683414,
  y: -4,
  ballsWon: 3,
  index: 2,
  timestamp: "2025-10-28T02:49:44.941Z"
}, {
  x: 286.38133210014917,
  y: -4,
  ballsWon: 10,
  index: 9,
  timestamp: "2025-10-28T03:50:11.638Z"
}, {
  x: 324.0156963137983,
  y: -4,
  ballsWon: 4,
  index: 3,
  timestamp: "2025-10-28T03:50:17.454Z"
}, {
  x: 305.5570710124077,
  y: -4,
  ballsWon: 5,
  index: 4,
  timestamp: "2025-10-28T03:50:22.037Z"
}, {
  x: 292.8549457005356,
  y: -4,
  ballsWon: 13,
  index: 12,
  timestamp: "2025-10-28T03:50:26.437Z"
}, {
  x: 289.4991504542385,
  y: -4,
  ballsWon: 17,
  index: 16,
  timestamp: "2025-10-28T03:50:26.444Z"
}, {
  x: 292.8549457005356,
  y: -4,
  ballsWon: 13,
  index: 12,
  timestamp: "2025-10-28T03:50:26.445Z"
}, {
  x: 289.4991504542385,
  y: -4,
  ballsWon: 17,
  index: 16,
  timestamp: "2025-10-28T03:50:26.446Z"
}, {
  x: 318.18859505734605,
  y: -4,
  ballsWon: 14,
  index: 13,
  timestamp: "2025-10-28T03:50:32.937Z"
}, {
  x: 321.4087747377833,
  y: -4,
  ballsWon: 14,
  index: 13,
  timestamp: "2025-10-28T03:50:34.154Z"
}, {
  x: 285.26423873248257,
  y: -4,
  ballsWon: 10,
  index: 9,
  timestamp: "2025-10-28T03:50:43.904Z"
}, {
  x: 278.27034383295415,
  y: -4,
  ballsWon: 5,
  index: 4,
  timestamp: "2025-10-28T03:50:52.671Z"
}, {
  x: 278.7448473684136,
  y: -4,
  ballsWon: 11,
  index: 10,
  timestamp: "2025-10-28T03:51:08.770Z"
}, {
  x: 337.3773425573902,
  y: -4,
  ballsWon: 12,
  index: 11,
  timestamp: "2025-10-28T03:51:18.120Z"
}, {
  x: 332.97608343649665,
  y: -4,
  ballsWon: 8,
  index: 7,
  timestamp: "2025-10-28T03:51:23.970Z"
}, {
  x: 285.460534378799,
  y: -4,
  ballsWon: 5,
  index: 4,
  timestamp: "2025-10-28T03:51:32.436Z"
}, {
  x: 299.3286019514973,
  y: -4,
  ballsWon: 7,
  index: 6,
  timestamp: "2025-10-28T03:51:40.171Z"
}, {
  x: 302.74283471527514,
  y: -4,
  ballsWon: 6,
  index: 5,
  timestamp: "2025-10-28T03:51:46.454Z"
}, {
  x: 332.690711100513,
  y: -4,
  ballsWon: 4,
  index: 3,
  timestamp: "2025-10-28T03:52:20.154Z"
}, {
  x: 297.625939334418,
  y: -4,
  ballsWon: 12,
  index: 11,
  timestamp: "2025-10-28T03:52:28.921Z"
}, {
  x: 324.7564437120892,
  y: -4,
  ballsWon: 10,
  index: 9,
  timestamp: "2025-10-28T03:52:44.254Z"
}, {
  x: 314.2127731108835,
  y: -4,
  ballsWon: 12,
  index: 11,
  timestamp: "2025-10-28T03:52:53.820Z"
}, {
  x: 325.5167635020083,
  y: -4,
  ballsWon: 12,
  index: 11,
  timestamp: "2025-10-28T03:52:58.953Z"
}, {
  x: 287.4056262868285,
  y: -4,
  ballsWon: 3,
  index: 2,
  timestamp: "2025-10-28T03:52:59.920Z"
}, {
  x: 340.41876282493126,
  y: -4,
  ballsWon: 10,
  index: 9,
  timestamp: "2025-10-28T03:53:05.904Z"
}, {
  x: 320.7487155106303,
  y: -4,
  ballsWon: 16,
  index: 15,
  timestamp: "2025-10-28T03:53:13.770Z"
}, {
  x: 317.40834500165926,
  y: -4,
  ballsWon: 6,
  index: 5,
  timestamp: "2025-10-28T03:53:22.204Z"
}, {
  x: 338.62372101646747,
  y: -4,
  ballsWon: 6,
  index: 5,
  timestamp: "2025-10-28T03:53:26.703Z"
}, {
  x: 295.46385769356857,
  y: -4,
  ballsWon: 12,
  index: 11,
  timestamp: "2025-10-28T03:53:34.954Z"
}, {
  x: 339.1549437324441,
  y: -4,
  ballsWon: 8,
  index: 7,
  timestamp: "2025-10-28T03:53:41.137Z"
}, {
  x: 318.317866140562,
  y: -4,
  ballsWon: 10,
  index: 9,
  timestamp: "2025-10-28T03:53:48.937Z"
}, {
  x: 302.4067183475386,
  y: -4,
  ballsWon: 8,
  index: 7,
  timestamp: "2025-10-28T03:53:58.221Z"
}, {
  x: 307.5245784834327,
  y: -4,
  ballsWon: 8,
  index: 7,
  timestamp: "2025-10-28T03:57:05.770Z"
}, {
  x: 284.3514297390517,
  y: -4,
  ballsWon: 4,
  index: 3,
  timestamp: "2025-10-28T03:57:17.453Z"
}, {
  x: 308.5685916327744,
  y: -4,
  ballsWon: 7,
  index: 6,
  timestamp: "2025-10-28T03:57:26.520Z"
}, {
  x: 316.8043937598903,
  y: -4,
  ballsWon: 11,
  index: 10,
  timestamp: "2025-10-28T03:57:32.219Z"
}, {
  x: 338.9748073858099,
  y: -4,
  ballsWon: 5,
  index: 4,
  timestamp: "2025-10-28T03:57:36.753Z"
}, {
  x: 282.3832482012939,
  y: -4,
  ballsWon: 8,
  index: 7,
  timestamp: "2025-10-28T03:57:45.720Z"
}, {
  x: 285.5602682092932,
  y: -4,
  ballsWon: 8,
  index: 7,
  timestamp: "2025-10-28T03:57:53.003Z"
}, {
  x: 294.9308421454648,
  y: -4,
  ballsWon: 8,
  index: 7,
  timestamp: "2025-10-28T03:58:00.236Z"
}, {
  x: 292.2038610786449,
  y: -4,
  ballsWon: 7,
  index: 6,
  timestamp: "2025-10-28T03:58:08.786Z"
}, {
  x: 292.2038610786449,
  y: -4,
  ballsWon: 7,
  index: 6,
  timestamp: "2025-10-28T03:58:08.790Z"
}, {
  x: 326.97367505687185,
  y: -4,
  ballsWon: 17,
  index: 16,
  timestamp: "2025-10-28T03:58:09.719Z"
}, {
  x: 306.4661212825671,
  y: -4,
  ballsWon: 14,
  index: 13,
  timestamp: "2025-10-28T03:58:15.303Z"
}, {
  x: 316.997278504991,
  y: -4,
  ballsWon: 13,
  index: 12,
  timestamp: "2025-10-28T03:58:23.120Z"
}, {
  x: 296.0317962791852,
  y: -4,
  ballsWon: 9,
  index: 8,
  timestamp: "2025-10-28T03:58:31.937Z"
}, {
  x: 311.27914990717295,
  y: -4,
  ballsWon: 9,
  index: 8,
  timestamp: "2025-10-28T03:58:39.387Z"
}, {
  x: 288.29282191020735,
  y: -4,
  ballsWon: 5,
  index: 4,
  timestamp: "2025-10-28T03:58:46.636Z"
}, {
  x: 311.22624913263127,
  y: -4,
  ballsWon: 9,
  index: 8,
  timestamp: "2025-10-28T03:58:54.486Z"
}, {
  x: 291.79891662862815,
  y: -4,
  ballsWon: 11,
  index: 10,
  timestamp: "2025-10-28T03:59:03.436Z"
}, {
  x: 286.930925437632,
  y: -4,
  ballsWon: 11,
  index: 10,
  timestamp: "2025-10-28T03:59:10.003Z"
}, {
  x: 300.89743328504994,
  y: -4,
  ballsWon: 4,
  index: 3,
  timestamp: "2025-10-28T03:59:15.487Z"
}, {
  x: 334.9631205265204,
  y: -4,
  ballsWon: 16,
  index: 15,
  timestamp: "2025-10-28T04:01:25.686Z"
}, {
  x: 280.13217075630405,
  y: -4,
  ballsWon: 9,
  index: 8,
  timestamp: "2025-10-28T04:01:28.019Z"
}, {
  x: 299.8385055306691,
  y: -4,
  ballsWon: 2,
  index: 1,
  timestamp: "2025-10-28T04:01:32.370Z"
}, {
  x: 299.8385055306691,
  y: -4,
  ballsWon: 2,
  index: 1,
  timestamp: "2025-10-28T04:01:32.376Z"
}, {
  x: 316.83835416209763,
  y: -4,
  ballsWon: 8,
  index: 7,
  timestamp: "2025-10-28T04:01:35.536Z"
}, {
  x: 285.52966620604593,
  y: -4,
  ballsWon: 9,
  index: 8,
  timestamp: "2025-10-28T04:01:40.886Z"
}, {
  x: 328.8511664198733,
  y: -4,
  ballsWon: 5,
  index: 4,
  timestamp: "2025-10-28T04:01:47.186Z"
}, {
  x: 311.3569315256652,
  y: -4,
  ballsWon: 12,
  index: 11,
  timestamp: "2025-10-28T04:01:54.736Z"
}, {
  x: 291.6736967039445,
  y: -4,
  ballsWon: 2,
  index: 1,
  timestamp: "2025-10-28T04:01:59.370Z"
}, {
  x: 337.5136727383542,
  y: -4,
  ballsWon: 7,
  index: 6,
  timestamp: "2025-10-28T04:02:07.069Z"
}, {
  x: 317.2664123562271,
  y: -4,
  ballsWon: 12,
  index: 11,
  timestamp: "2025-10-28T05:36:49.153Z"
}, {
  x: 328.1769192578557,
  y: -4,
  ballsWon: 12,
  index: 11,
  timestamp: "2025-10-28T05:36:57.970Z"
}, {
  x: 280.19479384491683,
  y: -4,
  ballsWon: 13,
  index: 12,
  timestamp: "2025-10-28T05:37:05.252Z"
}, {
  x: 331.5215415145256,
  y: -4,
  ballsWon: 7,
  index: 6,
  timestamp: "2025-10-28T05:37:10.653Z"
}, {
  x: 294.34779598812923,
  y: -4,
  ballsWon: 1,
  index: 0,
  timestamp: "2025-10-28T05:37:14.953Z"
}, {
  x: 286.5104786827279,
  y: -4,
  ballsWon: 5,
  index: 4,
  timestamp: "2025-10-28T05:37:24.886Z"
}, {
  x: 291.9510577398629,
  y: -4,
  ballsWon: 1,
  index: 0,
  timestamp: "2025-10-28T05:37:29.703Z"
}, {
  x: 331.5969252336322,
  y: -4,
  ballsWon: 5,
  index: 4,
  timestamp: "2025-10-28T05:38:07.003Z"
}, {
  x: 327.0278288499552,
  y: -4,
  ballsWon: 13,
  index: 12,
  timestamp: "2025-10-28T05:38:12.020Z"
}, {
  x: 319.3271608711827,
  y: -4,
  ballsWon: 16,
  index: 15,
  timestamp: "2025-10-28T05:38:15.287Z"
}, {
  x: 320.9525752640915,
  y: -4,
  ballsWon: 11,
  index: 10,
  timestamp: "2025-10-28T05:38:22.221Z"
}, {
  x: 315.2907253948675,
  y: -4,
  ballsWon: 13,
  index: 12,
  timestamp: "2025-10-28T05:38:26.021Z"
}, {
  x: 333.82600062231745,
  y: -4,
  ballsWon: 5,
  index: 4,
  timestamp: "2025-10-28T05:38:33.254Z"
}, {
  x: 327.02494180521217,
  y: -4,
  ballsWon: 16,
  index: 15,
  timestamp: "2025-10-28T05:38:44.404Z"
}, {
  x: 305.3362963068483,
  y: -4,
  ballsWon: 12,
  index: 11,
  timestamp: "2025-10-28T05:38:54.755Z"
}, {
  x: 320.884831115644,
  y: -4,
  ballsWon: 13,
  index: 12,
  timestamp: "2025-10-28T05:39:00.237Z"
}, {
  x: 338.8251549985026,
  y: -4,
  ballsWon: 16,
  index: 15,
  timestamp: "2025-10-28T05:39:06.005Z"
}, {
  x: 308.0384623440318,
  y: -4,
  ballsWon: 1,
  index: 0,
  timestamp: "2025-10-28T05:39:17.655Z"
}, {
  x: 310.82979500946084,
  y: -4,
  ballsWon: 17,
  index: 16,
  timestamp: "2025-10-28T05:39:22.605Z"
}, {
  x: 329.65608208219135,
  y: -4,
  ballsWon: 11,
  index: 10,
  timestamp: "2025-10-28T05:39:28.555Z"
}, {
  x: 302.97083089283853,
  y: -4,
  ballsWon: 3,
  index: 2,
  timestamp: "2025-10-28T05:39:33.238Z"
}, {
  x: 332.5778711296275,
  y: -4,
  ballsWon: 9,
  index: 8,
  timestamp: "2025-10-28T05:39:37.954Z"
}, {
  x: 279.66005943747757,
  y: -4,
  ballsWon: 11,
  index: 10,
  timestamp: "2025-10-28T05:39:44.656Z"
}, {
  x: 315.23641762281903,
  y: -4,
  ballsWon: 14,
  index: 13,
  timestamp: "2025-10-28T05:39:51.738Z"
}, {
  x: 325.9387004652616,
  y: -4,
  ballsWon: 7,
  index: 6,
  timestamp: "2025-10-28T05:39:57.006Z"
}, {
  x: 297.93456129766395,
  y: -4,
  ballsWon: 14,
  index: 13,
  timestamp: "2025-10-28T05:40:04.222Z"
}, {
  x: 311.69547364772376,
  y: -4,
  ballsWon: 7,
  index: 6,
  timestamp: "2025-10-28T05:40:09.122Z"
}, {
  x: 326.3805435743313,
  y: -4,
  ballsWon: 9,
  index: 8,
  timestamp: "2025-10-28T05:40:14.605Z"
}, {
  x: 332.49288711886777,
  y: -4,
  ballsWon: 13,
  index: 12,
  timestamp: "2025-10-28T05:40:21.239Z"
}, {
  x: 323.8510958767145,
  y: -4,
  ballsWon: 15,
  index: 14,
  timestamp: "2025-10-28T05:40:25.105Z"
}, {
  x: 327.69116944925065,
  y: -4,
  ballsWon: 12,
  index: 11,
  timestamp: "2025-10-28T05:40:34.538Z"
}];
let shot;

//Shot
function createShot() {
  shot = Bodies.circle(width / 2, width / 2, BALL_RAD, {
    label: "Ball",
    restitution: 0.6,
    collisionFilter: {
      group: BALL_GROUP,
      // ✅ 關鍵設定
      category: 0x0002,
      mask: 0x0001 | 0x0004 // 可選：只讓它與 Peg / Ground 互動
    },
    render: {
      fillStyle: "#4cff00"
    }
  });
  Composite.add(engine.world, shot);
}

// Drop a ball
const BALL_RAD = 7;
const BALL_GROUP = -1; // 負數群組代表同群體不會互相碰撞
function dropABall() {
  if (balls < wild) {
    createShot();
    console.log("No Available Balls!");
  } else {
    balls -= wild;
    const dropLeft = width / 2 - GAP;
    const dropRight = width / 2 + GAP;
    const dropWidth = dropRight - dropLeft;
    const x = Math.random() * dropWidth + dropLeft;
    const y = -PEG_RAD;

    // const x = preSimulatedSeeds.filter(x => x.ballsWon === 17)[0].x;
    // const y = preSimulatedSeeds.filter(x => x.ballsWon === 17)[0].y;

    // console.log(`x: ${x}, y: ${y}`);

    const ball = Bodies.circle(x, y, BALL_RAD, {
      label: "Ball",
      restitution: 1,
      stiffness: 0.05,
      // 彈性
      collisionFilter: {
        group: BALL_GROUP,
        // ✅ 關鍵設定
        category: 0x0002,
        mask: 0x0001 | 0x0004 // 可選：只讓它與 Peg / Ground 互動
      },
      render: {
        fillStyle: "#4cff00"
      }
    });

    // ✅ 在 ball 上自訂屬性紀錄初始位置
    ball.initialPosition = {
      x,
      y
    };
    clickSynth.triggerAttackRelease("32n", Tone.context.currentTime);
    Composite.add(engine.world, [ball]);
  }
}

// module aliases
const Engine = Matter.Engine,
  Events = Matter.Events,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
const engine = Engine.create({
  gravity: {
    scale: 0.0007
  }
});

// create a renderer
const canvas = document.getElementById("canvas");
const render = Render.create({
  canvas,
  engine,
  options: {
    width,
    height,
    wireframes: false
  }
});

// Create pegs
const GAP = 32;
const PEG_RAD = 4;
const pegs = [];
for (let r = 0; r < 16; r++) {
  const pegsInRow = r + 3;
  for (let c = 0; c < pegsInRow; c++) {
    const x = width / 2 + (c - (pegsInRow - 1) / 2) * GAP;
    const y = GAP + r * GAP;
    const peg = Bodies.circle(x, y, PEG_RAD, {
      isStatic: true,
      label: "Peg",
      render: {
        fillStyle: "#fff"
      }
    });
    pegs.push(peg);
  }
}
Composite.add(engine.world, pegs);

// track animations for pegs
const pegAnims = new Array(pegs.length).fill(null);

// Create a ground
const ground = Bodies.rectangle(width / 2, height + 22, width * 2, 40, {
  isStatic: true,
  label: "Ground"
});
var wallLeftTop = Bodies.rectangle(70, (height - 530) / 2, 10, height, {
  isStatic: true,
  label: "Wall Left"
});
var wallRightTop = Bodies.rectangle(width - 70, (height - 530) / 2, 10, height, {
  isStatic: true,
  label: "Wall Right"
});
var wallLeft = Bodies.rectangle(-60, (height - 20) / 2, 10, height, {
  isStatic: true,
  label: "Wall Left"
});
var wallRight = Bodies.rectangle(width + 60, (height - 20) / 2, 10, height, {
  isStatic: true,
  label: "Wall Right"
});

// here how to rotate it:
Matter.Body.rotate(wallLeftTop, Math.PI / -9);
Matter.Body.rotate(wallRightTop, Math.PI / 9);
Matter.Body.rotate(wallLeft, Math.PI / -9);
Matter.Body.rotate(wallRight, Math.PI / 9);
Composite.add(engine.world, [ground, wallLeftTop, wallRightTop]);
Composite.add(engine.world, [ground, wallLeft, wallRight]);
function checkCollision(event, label1, label2, callback) {
  event.pairs.forEach(({
    bodyA,
    bodyB
  }) => {
    let body1, body2;
    if (bodyA.label === label1 && bodyB.label === label2) {
      body1 = bodyA;
      body2 = bodyB;
    } else if (bodyA.label === label2 && bodyB.label === label1) {
      body1 = bodyB;
      body2 = bodyA;
    }
    if (body1 && body2) {
      callback(body1, body2);
    }
  });
}

// Trigger event on ball hitting ground
Matter.Events.on(engine, "collisionStart", event => {
  event.pairs.forEach(({
    bodyA,
    bodyB
  }) => {
    // check for ball hitting the ground
    checkCollision(event, "Ball", "Ground", ballToRemove => {
      Matter.Composite.remove(engine.world, ballToRemove);
      const index = Math.floor((ballToRemove.position.x - width / 2) / GAP + 17 / 2);
      if (index >= 0 && index < 17) {
        // Register ball
        const ballsWon = Math.floor(multipliers[index]);
        balls += ballsWon;
        console.log(`index = ${index} ,ballsWon = ${ballsWon}, balls = ${balls}`);

        // ✅ 取出初始 x/y 與結果紀錄下來
        // const seedRecord = {
        //     x: ballToRemove.initialPosition?.x ?? null,
        //     y: ballToRemove.initialPosition?.y ?? null,
        //     ballsWon,
        //     index,
        //     timestamp: new Date().toISOString()
        // };
        // recordedSeeds.push(seedRecord);
        // console.table(recordedSeeds);

        // ✅ 若想要自動輸出 JSON，可在 console 複製用
        //console.log("JSON:", JSON.stringify(recordedSeeds, null, 2));

        // Ball hit note at bottom
        const el = document.getElementById(`note-${index}`);
        if (el.dataset.pressed !== "true") {
          const note = notes[index];
          note.play();
          el.dataset.pressed = true;
          setTimeout(() => {
            el.dataset.pressed = false;
          }, 500);
        }
      }
    });

    // check for ball hitting peg
    checkCollision(event, "Peg", "Ball", pegToAnimate => {
      const index = pegs.findIndex(peg => peg === pegToAnimate);
      if (index === -1) {
        throw new Error("Could not find peg in pegs array even though we registered an ball hitting this peg");
      }
      if (!pegAnims[index]) {
        pegAnims[index] = new Date().getTime();
      }
    });
  });
});

// run the renderer
Render.run(render);

// Create custom runner
const ctx = canvas.getContext("2d");
function run() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  const now = new Date().getTime();

  // Draw peg expansions
  pegAnims.forEach((anim, index) => {
    if (!anim) return;
    const delta = now - anim;
    if (delta > 1200) {
      pegAnims[index] = null;
      return;
    }
    const peg = pegs[index];
    if (!peg) throw new Error("Unknown peg at index " + index);
    const pct = delta / 1200;
    const expandProgression = 1 - Math.abs(pct * 2 - 1);
    const expandRadius = expandProgression * 12;
    ctx.fillStyle = "#fff2";
    ctx.beginPath();
    ctx.arc(peg.position.x, peg.position.y, expandRadius, 0, 2 * Math.PI);
    ctx.fill();
  });
  Engine.update(engine, 1000 / 60);

  // Update ball count
  ballsEl.innerHTML = balls;
  requestAnimationFrame(run);
}
run();