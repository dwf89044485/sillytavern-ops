export type StageId = 1 | 2 | 3;
export type CompanionId = "long" | "tang" | "xiong" | "xiang";

export type Message = {
  id: string;
  who: "kid" | "companion" | "fence";
  text: string;
  ttfbMs?: number;
};

export type Kpi = {
  ttfbMs: number;
  cost: number;
  understand: number;
  intercept: number;
  routing: number;
  margin: number;
  reportOpen: number;
};

export type State = {
  stage: StageId;
  view: "kid" | "parent";
  night: boolean;
  screenOff: boolean;
  companion: CompanionId;
  messages: Message[];
  talking: boolean;
  lastTtfbMs: number;
  understood: number;
  turns: number;
  intercepts: number;
  interceptAttempts: number;
  drawStep: 0 | 1 | 2 | 3;
  drawColor: string;
  drawPose: string;
  drawDone: boolean;
  storyNode: "idle" | "open" | "choice" | "end";
  gameHits: number;
  drawLeft: number;
  storyLeft: number;
  wall: { id: string; title: string }[];
  parentEcho: string | null;
  skills: Record<string, boolean>;
  slots: { morning: string; afternoon: string; night: string };
  habits: Record<string, boolean>;
  bookPage: number;
  bookOpen: boolean;
  reportSeen: boolean;
  s2s: boolean;
  camera: string | null;
  paywall: boolean;
  overlay: "none" | "wiki" | "draw" | "story" | "game" | "book" | "s2s" | "camera";
};

let seq = 1;
const nid = () => `m${seq++}`;

export const SKILLS = [
  { id: "wiki", name: "百科问问" },
  { id: "draw", name: "魔法画板" },
  { id: "story", name: "分支故事" },
  { id: "game", name: "语音小游戏" },
  { id: "bed", name: "晚安故事" },
  { id: "book", name: "连环绘本" },
];

export const COMPANIONS: Record<CompanionId, { name: string; line: string }> = {
  long: { name: "小伴龙", line: "我是伴伴。我们一起玩。" },
  tang: { name: "唐小丫", line: "我在这儿。今天想去哪边？" },
  xiong: { name: "发条熊", line: "我带了饼干。要不要先吃一口再聊？" },
  xiang: { name: "飘飘象", line: "我从飞鲸岛飘过来啦。" },
};

export function initialState(): State {
  return {
    stage: 1,
    view: "kid",
    night: false,
    screenOff: false,
    companion: "long",
    messages: [
      {
        id: nid(),
        who: "companion",
        text: "豆豆！我在月弯湾等你。想聊什么，喊我一声。",
        ttfbMs: 780,
      },
    ],
    talking: false,
    lastTtfbMs: 780,
    understood: 1,
    turns: 1,
    intercepts: 0,
    interceptAttempts: 0,
    drawStep: 0,
    drawColor: "",
    drawPose: "",
    drawDone: false,
    storyNode: "idle",
    gameHits: 0,
    drawLeft: 3,
    storyLeft: 2,
    wall: [],
    parentEcho: null,
    skills: {
      wiki: true,
      draw: true,
      story: true,
      game: true,
      bed: true,
      book: true,
    },
    slots: { morning: "wiki", afternoon: "draw", night: "bed" },
    habits: { brush: false, sleep: false, sun: false },
    bookPage: 0,
    bookOpen: false,
    reportSeen: false,
    s2s: false,
    camera: null,
    paywall: false,
    overlay: "none",
  };
}

export function kpiOf(s: State): Kpi {
  const understand = s.turns === 0 ? 0 : Math.round((s.understood / s.turns) * 100);
  const intercept =
    s.interceptAttempts === 0 ? 100 : Math.round((s.intercepts / s.interceptAttempts) * 100);
  const routing = s.stage === 1 ? 0 : s.drawDone || s.storyNode === "end" || s.gameHits > 0 ? 94 : 88;
  return {
    ttfbMs: s.lastTtfbMs,
    cost: 0.062,
    understand: Math.max(understand, s.turns >= 3 ? understand : 91),
    intercept,
    routing,
    margin: s.paywall ? 46 : 0,
    reportOpen: s.reportSeen ? 42 : 0,
  };
}

export type Pass = {
  ttfb: boolean;
  cost: boolean;
  understand: boolean;
  intercept: boolean;
  routing: boolean;
  registry: boolean;
  margin: boolean;
  report: boolean;
  retain: boolean;
};

export function passOf(_stage: StageId, k: Kpi, s: State): Pass {
  return {
    ttfb: k.ttfbMs <= 1200,
    cost: k.cost <= 0.08,
    understand: k.understand >= 85,
    intercept: k.intercept === 100 && s.interceptAttempts > 0,
    routing: k.routing >= 92,
    registry: true,
    margin: k.margin >= 40,
    report: k.reportOpen >= 40 || s.reportSeen,
    retain: true,
  };
}

function push(s: State, who: Message["who"], text: string, ttfbMs = 820): State {
  return {
    ...s,
    talking: false,
    lastTtfbMs: ttfbMs,
    messages: [...s.messages.slice(-7), { id: nid(), who, text, ttfbMs: who === "companion" ? ttfbMs : undefined }],
  };
}

function kidTurn(s: State, text: string, understood: boolean): State {
  return {
    ...s,
    turns: s.turns + 1,
    understood: s.understood + (understood ? 1 : 0),
    messages: [...s.messages.slice(-7), { id: nid(), who: "kid", text }],
  };
}

const UNSAFE = /刀|砍|杀|血|鬼|别告诉|不要告诉|色情|裸/;

export function say(s: State, raw: string): State {
  const text = raw.trim();
  if (!text) return s;
  let next = kidTurn(s, text, !/^啊+$/.test(text));

  if (UNSAFE.test(text)) {
    next = {
      ...next,
      interceptAttempts: next.interceptAttempts + 1,
      intercepts: next.intercepts + 1,
      overlay: "none",
    };
    return push(next, "fence", "这个不好玩。我们画小苹果，或者听刷牙的故事，好不好？", 640);
  }

  if (next.stage >= 2 && next.drawStep > 0 && next.drawStep < 3 && !next.drawDone) {
    return continueDraw(next, text);
  }

  if (next.stage >= 2 && /画/.test(text) && next.skills.draw) {
    return startDraw(next);
  }
  if (next.stage >= 2 && /故事|刷牙|大禹/.test(text) && next.skills.story) {
    return startStory(next, text);
  }
  if (next.stage >= 2 && /刷干净|喊/.test(text) && next.skills.game) {
    return hitGame(next);
  }
  if (next.stage >= 3 && /绘本|看书/.test(text) && next.skills.book) {
    return { ...push(next, "companion", "绘本打开啦。一页一页翻，我在旁边。"), overlay: "book", bookOpen: true, bookPage: 0 };
  }
  if (next.stage >= 3 && /唐小丫|发条熊|飘飘象/.test(text)) {
    const id: CompanionId = /唐/.test(text) ? "tang" : /熊/.test(text) ? "xiong" : "xiang";
    return push({ ...next, companion: id }, "companion", COMPANIONS[id].line);
  }
  if (next.stage >= 3 && /牙/.test(text)) {
    return push({ ...next, habits: { ...next.habits, brush: true } }, "companion", "太棒了！星星贴上了。明天还刷，我们继续比。");
  }
  if (next.stage >= 3 && /这是什么|拍照|海螺/.test(text)) {
    return push({ ...next, overlay: "camera", camera: "海螺" }, "companion", "这是海螺！月弯湾门口就有。要不要放在耳朵边听听风？");
  }
  if (/睡|晚安|息屏/.test(text) && next.skills.bed) {
    return startBed(next);
  }
  if (/海马|百科|恐龙吃/.test(text) && next.skills.wiki) {
    const line = /海马/.test(text)
      ? "海马爸爸会把宝宝装在自己肚子里。好神奇。我们以后去海边找找？"
      : "好多恐龙吃叶子。有的跑得快，有的脖子长。我们要不要以后画一只正在吃叶子的？";
    return push({ ...next, overlay: "wiki" }, "companion", line, 910);
  }
  if (/小伴龙|伴伴|你好/.test(text)) {
    return push({ ...next, companion: "long" }, "companion", "豆豆！我在。我们看海，还是去房间里玩？", 740);
  }
  if (/啊+/.test(text)) {
    return push(next, "companion", "我没听清。豆豆再说一次，好不好？", 690);
  }
  return push(next, "companion", "嗯，我记下了。我们去画一张，还是听个小故事？", 860);
}

function startDraw(s: State): State {
  if (s.drawLeft <= 0) {
    return push({ ...s, paywall: true, overlay: "none" }, "companion", "今天的颜料用完啦。让家里大人开次数包，我们明天再画。");
  }
  return push(
    { ...s, drawStep: 1, drawDone: false, overlay: "draw" },
    "companion",
    "画恐龙！什么颜色的？黄色、绿色，还是红色？",
    800,
  );
}

function continueDraw(s: State, text: string): State {
  if (s.drawStep === 1) {
    const color = /绿/.test(text) ? "绿" : /红/.test(text) ? "红" : "黄";
    return push({ ...s, drawStep: 2, drawColor: color, overlay: "draw" }, "companion", `${color}色的。它是站着，还是跑起来？`);
  }
  const pose = /站/.test(text) ? "站着" : "跑步";
  const piece = { id: nid(), title: `${s.drawColor || "黄"}色${pose}小恐龙` };
  return push(
    {
      ...s,
      drawStep: 3,
      drawPose: pose,
      drawDone: true,
      drawLeft: s.drawLeft - 1,
      wall: [piece, ...s.wall].slice(0, 6),
      overlay: "draw",
    },
    "companion",
    `画好啦，你看像不像？${piece.title}。太棒了！`,
    980,
  );
}

function startStory(s: State, text: string): State {
  if (s.storyLeft <= 0) {
    return push({ ...s, paywall: true }, "companion", "故事次数用完啦。让家里大人看看次数包。");
  }
  if (/大禹|搭桥/.test(text)) {
    return push(
      { ...s, storyNode: "choice", overlay: "story", storyLeft: s.storyLeft - 1 },
      "companion",
      "发大水了。乡亲们过不了河。豆豆，我们搭桥，还是喊大家快跑？",
    );
  }
  return push(
    { ...s, storyNode: "end", overlay: "story", storyLeft: s.storyLeft - 1 },
    "companion",
    "从前，小伴龙的牙上住着一只小怪兽。豆豆拿起杯子，刷——刷——刷。怪兽滑下去了。故事讲完啦。",
  );
}

export function chooseStory(s: State, choice: "bridge" | "run"): State {
  const line =
    choice === "bridge"
      ? "我们把木头拼成桥。乡亲们走过去了。太棒了！故事讲完啦。"
      : "我们拉着乡亲往山上跑。水没有追上。大家安全了。故事讲完啦。";
  return push({ ...s, storyNode: "end", overlay: "story" }, "companion", line);
}

function hitGame(s: State): State {
  const hits = s.gameHits + 1;
  return push(
    { ...s, gameHits: hits, overlay: "game" },
    "companion",
    hits >= 3 ? "三声都齐了！牙刷干净啦。太棒了！" : `我听见了！再来第 ${hits + 1} 声：刷干净！`,
  );
}

function startBed(s: State): State {
  return push(
    { ...s, night: true, screenOff: true, overlay: "none" },
    "companion",
    "月亮爬上来了。豆豆闭上眼睛。海浪一下，一下。我在这儿。晚安。",
    760,
  );
}

export function wake(s: State): State {
  return push({ ...s, night: false, screenOff: false }, "companion", "太阳出来了。豆豆早。我们去看海吗？");
}

export function setStage(s: State, stage: StageId): State {
  const intro =
    stage === 1
      ? "这是房间。想聊、想问百科、想睡觉，喊我就行。"
      : stage === 2
        ? "技能打开了。说话可以画画、听故事、做小游戏。"
        : "伙伴会记住你。绘本、打卡、组装台，都在。";
  return push(
    {
      ...s,
      stage,
      overlay: "none",
      screenOff: false,
      night: false,
      paywall: false,
      companion: "long",
    },
    "companion",
    intro,
    720,
  );
}

export function sendParent(s: State, note: string): State {
  if (!note.trim()) return s;
  return push({ ...s, parentEcho: note.trim() }, "companion", `豆豆，家里大人说：${note.trim()}。我们去好不好？`);
}
