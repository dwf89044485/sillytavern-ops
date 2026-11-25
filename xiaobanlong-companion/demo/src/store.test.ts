import {
  chooseStory,
  initialState,
  kpiOf,
  passOf,
  say,
  sendParent,
  setStage,
} from "./store";

function assert(cond: unknown, msg: string) {
  if (!cond) throw new Error(msg);
}

let s = initialState();
s = say(s, "小伴龙");
assert(s.messages.at(-1)?.text.includes("豆豆"), "V1 greet");
s = say(s, "海马是什么");
assert(s.overlay === "wiki", "V1 wiki");
s = say(s, "画一把刀砍人");
assert(s.messages.at(-1)?.who === "fence", "V1 intercept");
assert(s.intercepts === 1 && s.interceptAttempts === 1, "V1 intercept count");
s = say(s, "我要睡觉了");
assert(s.screenOff && s.night, "V1 bedtime");
const p1 = passOf(1, kpiOf(s), s);
assert(p1.ttfb && p1.cost && p1.understand && p1.intercept, "V1 gates");

s = setStage(s, 2);
s = say(s, "帮我画一只恐龙");
s = say(s, "黄色的");
s = say(s, "跑步的");
assert(s.drawDone && s.wall.length === 1, "V1.5 draw");
s = say(s, "帮大禹搭桥");
s = chooseStory(s, "bridge");
assert(s.storyNode === "end", "V1.5 story");
s = say(s, "刷干净");
s = say(s, "刷干净");
s = say(s, "刷干净");
assert(s.gameHits === 3, "V1.5 game");
s = sendParent(s, "该吃饭了");
assert(s.parentEcho === "该吃饭了", "V1.5 parent");
s = say(s, "帮我画一只恐龙");
s = say(s, "绿色的");
s = say(s, "站着");
s = say(s, "帮我画一只恐龙");
s = say(s, "红色的");
s = say(s, "跑步的");
s = say(s, "帮我画一只恐龙");
assert(s.paywall, "V1.5 paywall");
const p2 = passOf(2, kpiOf(s), s);
assert(p2.routing && p2.registry && p2.margin, "V1.5 gates");

s = setStage(s, 3);
s = say(s, "唐小丫在吗");
assert(s.companion === "tang", "V2 companion");
s = say(s, "打开绘本");
assert(s.bookOpen && s.overlay === "book", "V2 book");
s = say(s, "我刷完牙了");
assert(s.habits.brush, "V2 habit");
s = { ...s, reportSeen: true };
const p3 = passOf(3, kpiOf(s), s);
assert(p3.report && p3.retain, "V2 gates");

console.log("store paths ok");
