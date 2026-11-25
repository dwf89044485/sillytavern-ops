import { sendParent, SKILLS, type State } from "./store";
import { useState, type Dispatch, type SetStateAction } from "react";

export function ParentDesk({
  state,
  setState,
}: {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
}) {
  const [note, setNote] = useState("该吃饭了");
  return (
    <div className="side">
      <h2>家长台 · Talk V{state.stage === 1 ? "1.0" : state.stage === 2 ? "1.5" : "2.0"}</h2>
      <p className="muted">孩子看不见这些。开关、次数、组装、周报都走这里。</p>

      <div className="card">
        <strong>监护人合规</strong>
        <p>功能总开关已开。PIN 演示码 2580。改开关不能右滑。</p>
        <p>
          今日画画 {3 - state.drawLeft}/3，故事 {2 - state.storyLeft}/2。作息 20:30 息屏。
        </p>
      </div>

      {state.stage >= 2 ? (
        <div className="card">
          <strong>Skill Registry</strong>
          <p className="muted">新技能只登记，不改主中控。</p>
          {SKILLS.map((sk) => (
            <label key={sk.id} style={{ display: "block", margin: "6px 0" }}>
              <input
                type="checkbox"
                checked={state.skills[sk.id]}
                onChange={(e) =>
                  setState({
                    ...state,
                    skills: { ...state.skills, [sk.id]: e.target.checked },
                  })
                }
              />{" "}
              {sk.name}
            </label>
          ))}
        </div>
      ) : null}

      {state.stage >= 2 ? (
        <div className="card">
          <strong>家长传话筒</strong>
          <input value={note} onChange={(e) => setNote(e.target.value)} />
          <button type="button" onClick={() => setState((s) => sendParent(s, note))}>
            让小伴龙转达
          </button>
          {state.parentEcho ? <p>已转达：{state.parentEcho}</p> : null}
        </div>
      ) : null}

      {state.stage >= 2 ? (
        <div className="card">
          <strong>作品墙</strong>
          <div className="wall">
            {state.wall.length === 0 ? <span className="muted">还没有画</span> : null}
            {state.wall.map((w) => (
              <div key={w.id} className="tile">
                {w.title}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {state.stage >= 3 ? (
        <div className="card">
          <strong>技能组装台</strong>
          <p className="muted">把技能排进一天，不是让孩子装插件市场。</p>
          <div className="desk-grid">
            {(["morning", "afternoon", "night"] as const).map((slot) => (
              <button
                key={slot}
                className="slot on"
                type="button"
                onClick={() =>
                  setState({
                    ...state,
                    slots: {
                      ...state.slots,
                      [slot]: state.slots[slot] === "draw" ? "wiki" : "draw",
                    },
                  })
                }
              >
                {slot === "morning" ? "上午" : slot === "afternoon" ? "下午" : "晚上"}
                <br />
                {SKILLS.find((x) => x.id === state.slots[slot])?.name}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {state.stage >= 3 ? (
        <div className="card">
          <strong>长期记忆图谱</strong>
          <div className="graph">
            <span className="node">豆豆 · 5岁</span>
            <span>→</span>
            <span className="node">喜欢恐龙</span>
            <span>→</span>
            <span className="node">怕黑，要晚安</span>
            <span>→</span>
            <span className="node">刷牙打卡 {state.habits.brush ? "已贴" : "未贴"}</span>
          </div>
        </div>
      ) : null}

      {state.stage >= 3 ? (
        <div className="card">
          <strong>每周成长报告</strong>
          <p>陪伴 46 分钟。画画 4 张。故事 3 篇。情绪：平稳。</p>
          <p className="red">预警：周五晚上聊了 28 分钟，过了作息。</p>
          <button type="button" onClick={() => setState({ ...state, reportSeen: true })}>
            打开周报
          </button>
          {state.reportSeen ? <p className="okc">本周已打开。门槛 40%。</p> : null}
        </div>
      ) : null}

      {state.stage >= 3 ? (
        <div className="card">
          <strong>好习惯打卡</strong>
          {(["brush", "sleep", "sun"] as const).map((h) => (
            <button
              key={h}
              className={`habit ${state.habits[h] ? "on" : ""}`}
              type="button"
              onClick={() => setState({ ...state, habits: { ...state.habits, [h]: !state.habits[h] } })}
            >
              {h === "brush" ? "刷牙" : h === "sleep" ? "早睡" : "晒太阳"}
            </button>
          ))}
        </div>
      ) : null}

      {state.stage >= 3 ? (
        <div className="card">
          <strong>SVIP 试验</strong>
          <button
            type="button"
            onClick={() => setState({ ...state, overlay: "s2s", s2s: true, view: "kid" })}
          >
            试 30 秒 S2S
          </button>
        </div>
      ) : null}
    </div>
  );
}
