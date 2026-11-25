import type { Dispatch, SetStateAction } from "react";
import { Dragon } from "./Dragon";
import {
  chooseStory,
  COMPANIONS,
  say,
  type State,
  wake,
} from "./store";

const CHIPS: Record<1 | 2 | 3, string[]> = {
  1: ["小伴龙", "恐龙吃什么", "海马是什么", "我要睡觉了", "画一把刀砍人", "别告诉妈妈"],
  2: ["帮我画一只恐龙", "黄色的", "跑步的", "讲个刷牙的故事", "帮大禹搭桥", "跟我喊：刷干净", "画一把刀砍人"],
  3: ["小伴龙", "唐小丫在吗", "打开绘本", "我刷完牙了", "这是什么海螺", "我要睡觉了"],
};

export function Room({
  state,
  setState,
}: {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
}) {
  const speak = (text: string) => {
    setState((prev) => ({ ...say(prev, text), talking: true }));
    window.setTimeout(() => {
      setState((prev) => ({ ...prev, talking: false }));
    }, 420);
  };
  const last = state.messages.at(-1);

  return (
    <div className={`room ${state.night ? "night" : ""} ${state.screenOff ? "off" : ""}`}>
      <div className="world">
        <div className={state.night ? "moon" : "sunball"} />
        <button className="conch" onClick={() => speak("海马是什么")} type="button">
          百科
        </button>
        <div className="island" />
        <div className="stage-area">
          <Dragon who={state.companion} talking={state.talking} night={state.night} />
        </div>
        {last && !state.screenOff && state.overlay === "none" && !state.paywall ? (
          <div className={`speech speech-${last.who}`}>
            {last.who === "companion" ? `${COMPANIONS[state.companion].name}：` : last.who === "kid" ? "豆豆：" : "围栏："}
            {last.text}
          </div>
        ) : null}
        {state.overlay === "draw" ? <DrawPane state={state} speak={speak} /> : null}
        {state.overlay === "story" ? <StoryPane state={state} setState={setState} /> : null}
        {state.overlay === "game" ? (
          <div className="sheet">
            <h3>无屏语音小游戏</h3>
            <p>跟着喊三声「刷干净」。现在 {state.gameHits} / 3。</p>
            <button type="button" onClick={() => speak("刷干净")}>
              喊：刷干净
            </button>
          </div>
        ) : null}
        {state.overlay === "wiki" ? (
          <div className="sheet">
            <h3>百科</h3>
            <p>不是词条页。小伴龙用自己的嘴讲一件能记住的小事。</p>
            <button type="button" onClick={() => setState((s) => ({ ...s, overlay: "none" }))}>
              收回
            </button>
          </div>
        ) : null}
        {state.overlay === "book" ? <BookPane state={state} setState={setState} /> : null}
        {state.overlay === "camera" ? (
          <div className="sheet">
            <h3>拍照认世界（探索）</h3>
            <p>识别：{state.camera}。不联网搜成人内容。只讲身边能玩的东西。</p>
            <button type="button" onClick={() => setState((s) => ({ ...s, overlay: "none" }))}>
              收回
            </button>
          </div>
        ) : null}
        {state.overlay === "s2s" ? (
          <div className="sheet">
            <h3>SVIP · S2S 限时</h3>
            <p>实时通话试 30 秒。V2.0 仅灰度，不作为 V1 过关项。</p>
            <button type="button" onClick={() => setState((s) => ({ ...s, overlay: "none", s2s: false }))}>
              挂断
            </button>
          </div>
        ) : null}
        {state.paywall ? (
          <div className="sheet pay">
            <h3>次数包</h3>
            <p>画画还剩 {state.drawLeft} 张，故事还剩 {state.storyLeft} 篇。</p>
            <p>灰度会员演示。毛利率门槛 40%，本包按 46% 计。</p>
            <button type="button" onClick={() => setState((s) => ({ ...s, paywall: false, drawLeft: 3, storyLeft: 2 }))}>
              家长已开通
            </button>
          </div>
        ) : null}
      </div>

      <div className="dock">
        <div className="chips">
          {CHIPS[state.stage].map((c) => (
            <button key={c} className="chip" type="button" onClick={() => speak(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="micbar">
          <button className="mic" type="button" onClick={() => speak("小伴龙")}>
            按住说话
          </button>
          {state.stage >= 2 ? (
            <button className="iconbtn" type="button" onClick={() => speak("帮我画一只恐龙")}>
              画
            </button>
          ) : null}
          {state.stage >= 2 ? (
            <button className="iconbtn" type="button" onClick={() => speak("讲个刷牙的故事")}>
              事
            </button>
          ) : null}
        </div>
      </div>

      {state.screenOff ? (
        <div className="wake">
          <div>
            <div className="breathe" />
            <p>息屏晚安。海浪一下，一下。我在这儿。</p>
            <button type="button" onClick={() => setState((s) => wake(s))}>
              早晨了
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DrawPane({ state, speak }: { state: State; speak: (t: string) => void }) {
  return (
    <div className="sheet">
      <h3>魔法画板 · 2–3 轮再出图</h3>
      <p>
        进度：{state.drawStep}/3。颜色 {state.drawColor || "还没定"}，姿势 {state.drawPose || "还没定"}。
      </p>
      <div className="draw-art">
        {state.drawDone ? (
          <svg width="180" height="120" viewBox="0 0 180 120">
            <ellipse cx="90" cy="100" rx="50" ry="8" fill="#7ec8ea" />
            <ellipse cx="90" cy="70" rx="40" ry="22" fill={state.drawColor === "绿" ? "#6fbf6a" : state.drawColor === "红" ? "#ff6b57" : "#ffc53d"} />
            <circle cx="128" cy="58" r="16" fill={state.drawColor === "绿" ? "#6fbf6a" : state.drawColor === "红" ? "#ff6b57" : "#ffc53d"} />
            <circle cx="134" cy="54" r="3" fill="#1e3a40" />
            {state.drawPose === "跑步" ? <path d="M70 88 L60 108 M100 88 L118 108" stroke="#1e3a40" strokeWidth="4" /> : <path d="M74 90 L74 108 M104 90 L104 108" stroke="#1e3a40" strokeWidth="4" />}
          </svg>
        ) : (
          <span>先问清楚，再施魔法</span>
        )}
      </div>
      {state.drawStep === 1 ? (
        <div className="choices">
          <button type="button" onClick={() => speak("黄色的")}>黄色</button>
          <button type="button" onClick={() => speak("绿色的")}>绿色</button>
        </div>
      ) : null}
      {state.drawStep === 2 ? (
        <div className="choices">
          <button type="button" onClick={() => speak("跑步的")}>跑步</button>
          <button type="button" onClick={() => speak("站着")}>站着</button>
        </div>
      ) : null}
    </div>
  );
}

function StoryPane({ state, setState }: { state: State; setState: Dispatch<SetStateAction<State>> }) {
  return (
    <div className="sheet">
      <h3>分支互动故事</h3>
      {state.storyNode === "choice" ? (
        <div className="choices">
          <button type="button" onClick={() => setState((s) => chooseStory(s, "bridge"))}>搭桥</button>
          <button type="button" onClick={() => setState((s) => chooseStory(s, "run"))}>快跑</button>
        </div>
      ) : (
        <p>一篇一个结尾。不无限续写。</p>
      )}
      <button className="ghost" type="button" onClick={() => setState((s) => ({ ...s, overlay: "none" }))}>
        收起
      </button>
    </div>
  );
}

function BookPane({ state, setState }: { state: State; setState: Dispatch<SetStateAction<State>> }) {
  const pages = [
    ["1", "月弯湾的早晨，豆豆敲海螺小楼的门。"],
    ["2", "小伴龙探出犄角：今天去找会发光的贝壳。"],
    ["3", "发条熊把饼干分给路过的螃蟹。"],
    ["4", "天黑了。四个人把贝壳放回海里。晚安。"],
  ];
  const i = state.bookPage;
  const next = Math.min(3, i + 1);
  const prev = Math.max(0, i - 1);
  return (
    <div className="sheet">
      <h3>连环绘本 · 4 页</h3>
      <div className="book">
        <div className="page">
          <strong>第 {pages[i][0]} 页</strong>
          <p>{pages[i][1]}</p>
        </div>
        <div className="page">
          <strong>第 {pages[Math.min(3, i + 1)][0]} 页</strong>
          <p>{i < 3 ? pages[i + 1][1] : "合上了。"}</p>
        </div>
      </div>
      <div className="choices">
        <button type="button" onClick={() => setState((s) => ({ ...s, bookPage: prev }))}>上一页</button>
        <button type="button" onClick={() => setState((s) => ({ ...s, bookPage: next }))}>下一页</button>
        <button type="button" onClick={() => setState((s) => ({ ...s, overlay: "none", bookOpen: false }))}>合上</button>
      </div>
    </div>
  );
}
