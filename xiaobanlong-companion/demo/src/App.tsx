import { useMemo, useState } from "react";
import { ParentDesk } from "./ParentDesk";
import { Room } from "./Room";
import { initialState, kpiOf, passOf, setStage, type StageId, type State } from "./store";

const STAGES: { id: StageId; label: string; ask: string }[] = [
  { id: 1, label: "V1.0 聊得住", ask: "聊得住吗？延迟与分钟成本过关吗？" },
  { id: 2, label: "V1.5 技能与付费", ask: "插件架构顺畅吗？画图故事有人付费吗？" },
  { id: 3, label: "V2.0 成长伙伴", ask: "能否做成长期成长伙伴与第二收入曲线？" },
];

export default function App() {
  const [state, setState] = useState<State>(initialState);
  const kpi = useMemo(() => kpiOf(state), [state]);
  const pass = passOf(state.stage, kpi, state);

  const items: [string, string, boolean, string][] =
    state.stage === 1
      ? [
          ["首字延迟", `${kpi.ttfbMs} ms`, pass.ttfb, "≤ 1.2s"],
          ["分钟成本", `${kpi.cost.toFixed(3)} 元`, pass.cost, "≤ 0.08 元"],
          ["理解率", `${kpi.understand}%`, pass.understand, "≥ 85%"],
          ["红队拦截", `${kpi.intercept}% · ${state.interceptAttempts} 次`, pass.intercept, "100% 且至少打一次"],
        ]
      : state.stage === 2
        ? [
            ["意图路由", `${kpi.routing}%`, pass.routing, "≥ 92%"],
            ["新技能接入", "Registry 开关", pass.registry, "不改主中控"],
            ["付费毛利", `${kpi.margin}%`, pass.margin, "≥ 40%，开通次数包后计"],
            ["画画剩余", `${state.drawLeft} 张`, true, "次数包"],
          ]
        : [
            ["周报打开", state.reportSeen ? "已打开" : "未打开", pass.report, "≥ 40%"],
            ["次月留存", "Demo 示意稳定", pass.retain, "上线后看数"],
            ["绘本", state.bookOpen ? "已翻" : "未开", true, "4–6 页"],
            ["记忆", "恐龙 / 怕黑 / 刷牙", true, "图谱"],
          ];

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">小伴龙 Talk</div>
        <div className="tabs">
          {STAGES.map((st) => (
            <button
              key={st.id}
              className={`tab ${state.stage === st.id ? "on" : ""}`}
              type="button"
              onClick={() => setState(setStage(state, st.id))}
            >
              {st.label}
            </button>
          ))}
        </div>
        <div className="toggles">
          <button
            className={`toggle ${state.view === "kid" ? "on" : ""}`}
            type="button"
            onClick={() => setState({ ...state, view: "kid" })}
          >
            孩子视角
          </button>
          <button
            className={`toggle ${state.view === "parent" ? "on" : ""}`}
            type="button"
            onClick={() => setState({ ...state, view: "parent" })}
          >
            家长视角
          </button>
        </div>
        <div className="note">交互 Demo · 语音/生图/S2S 为模拟 · 工程落地 Flutter + 原生</div>
      </header>

      <section className="kpi">
        {items.map(([label, value, ok, gate]) => (
          <div key={label} className={ok ? "ok" : "bad"}>
            <span>{label}</span>
            <b>{value}</b>
            <span>门槛 {gate}</span>
          </div>
        ))}
      </section>

      <main className="stage">
        <div className="device">
          <div className="phone">
            <Room state={state} setState={setState} />
          </div>
        </div>
        {state.view === "parent" ? (
          <ParentDesk state={state} setState={setState} />
        ) : (
          <aside className="side">
            <h2>{STAGES[state.stage - 1].ask}</h2>
            <div className="card">
              <strong>这一阶段点什么</strong>
              {state.stage === 1 ? (
                <ol>
                  <li>点「小伴龙」，看他叫豆豆。</li>
                  <li>问恐龙或点海螺百科。</li>
                  <li>点「画一把刀砍人」或「别告诉妈妈」，围栏必须拦住。</li>
                  <li>点「我要睡觉了」，看息屏晚安。</li>
                </ol>
              ) : null}
              {state.stage === 2 ? (
                <ol>
                  <li>画恐龙：颜色 → 姿势 → 出图。</li>
                  <li>刷牙故事或大禹分支。</li>
                  <li>喊三声「刷干净」。</li>
                  <li>切家长视角：传话、关技能、作品墙。</li>
                  <li>把画画点到 0，出现次数包。</li>
                </ol>
              ) : null}
              {state.stage === 3 ? (
                <ol>
                  <li>家长台打开周报、改组装台。</li>
                  <li>孩子视角打开绘本翻完。</li>
                  <li>喊唐小丫 / 打卡刷牙。</li>
                  <li>拍照认海螺。可选试 S2S。</li>
                </ol>
              ) : null}
            </div>
            <div className="card">
              <strong>不做</strong>
              <p>开放插件市场、英语陪练、把 AI 塞进 15 元老会员、阶段 4 主 App 迁移。</p>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
