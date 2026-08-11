# 性格调色盘 → Skill 蒸馏 — 流水线状态

> cangjie-skill 断点续跑用。每完成一个阶段更新此文件。

## 当前阶段：阶段 1.5 ✅ → 阶段 2 进行中（char-build-guide 设计深化）

---

## 各阶段状态

- [x] **阶段 0 — 整书理解** ✅
  - 产出: `BOOK_OVERVIEW.md`
  - 完成时间: 2026-08-09
  - 用户已确认骨架

- [x] **阶段 1 — 5 agent 并行提取** ✅
  - 产出: `candidates/frameworks.md`, `principles.md`, `cases.md`, `counter-examples.md`, `glossary.md`
  - 完成时间: 2026-08-09

- [x] **阶段 1.5 — 三重验证 + 架构设计** ✅
  - 第一轮: `verified.md` 初稿 → 6 个 skill（已废弃）
  - 第二轮: `ARCHITECTURE.md` + `DESIGN_DECISIONS.md` → 3 个 skill
  - 第三轮: `SKILL_DECOMPOSITION_BRIEF.md` → **最终 4 个 skill**
  - 用户已确认 4 skill 方案 ✅
  - char-build-guide 设计共识已沉淀: `design/CHAR_BUILD_GUIDE_DESIGN.md` ✅

- [ ] **阶段 2 — RIA++ 构造 skill** ← 当前
  - char-build-guide: 设计进行中（见 §未决事项）
  - dialogue-persona: 待开始
  - worldbook-config: 待开始
  - user-info-calibration: 待开始

- [ ] **阶段 3 — Zettelkasten 链接**
- [ ] **阶段 4 — 压力测试**
- [ ] **阶段 5 — 交付**

---

## 最终 skill 清单（4 个，用户已确认）

| # | Slug | 标题 | 定位 |
|---|------|------|------|
| 1 | `char-build-guide` | 角色构建引导（追问引擎） | 主入口。原则驱动，追问引擎 |
| 2 | `dialogue-persona` | 台词人设写法 | 调色盘的平级替代方案 |
| 3 | `worldbook-config` | 世界书配置原则 | 技术配置 |
| 4 | `user-info-calibration` | 用户信息校准 | 配套模块 |

---

## char-build-guide 设计状态

**已达成共识**（详见 `design/CHAR_BUILD_GUIDE_DESIGN.md`）：
- skill 定位：追问引擎，不是知识手册
- AI 有智能：原则驱动优于规则穷举
- 用户不接触术语：调色盘/多面性/核心人格层是 AI 的诊断地图
- AI 的主动性边界：帮用户梳理共性但不替用户编造
- 顶层原则：从最具体处切入、只追问不填空、推向独特性、用户主权、帮梳理不替总结
- 深度信号识别：标签→行为→矛盾→动机 的自然追问方向
- 三层执行框架：接住→追问循环→MVC 暂停→深化/收束
- 与其他 3 个 skill 的边界

**未决事项**（7 条，阶段 2 写作时逐个解决）：
1. 技法工具箱的组织方式
2. AI 需要多深的方法论理解
3. MVC 暂停点的时机（格式完成 vs 用户自然信号）
4. 24/80/200 问题库的位置
5. 快速路径切换的判断标准
6. 收束产出格式
7. 和 dialogue-persona 的路由时机

## 下一步

继续讨论 char-build-guide 未决事项，或直接进入阶段 2 开始写 SKILL.md。
