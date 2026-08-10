# 性格调色盘 → Skill 蒸馏 — 流水线状态

> cangjie-skill 断点续跑用。每完成一个阶段更新此文件。

## 当前阶段：阶段 1.5 ✅ → 下一步阶段 2

---

## 各阶段状态

- [x] **阶段 0 — 整书理解** ✅
  - 产出: `BOOK_OVERVIEW.md`
  - 完成时间: 2026-08-09
  - 用户已确认骨架

- [x] **阶段 1 — 5 agent 并行提取** ✅
  - 产出: `candidates/frameworks.md`, `principles.md`, `cases.md`, `counter-examples.md`, `glossary.md`
  - 完成时间: 2026-08-09
  - 注: 因环境限制，实际为串行执行

- [x] **阶段 1.5 — 三重验证筛选** ✅
  - 第一轮（初步筛选）: `verified.md` 初稿 → 6 个 skill（已废弃）
  - 第二轮（架构深化）: `ARCHITECTURE.md` + `DESIGN_DECISIONS.md` → 收敛为 3 个 skill
  - 第三轮（简报核查 + 教程深读）: `SKILL_DECOMPOSITION_BRIEF.md` 指出遗漏台词人设 → 深入教程 3 原文后确认追加 → **最终 4 个 skill**
  - 产出: `verified.md`（已更新为最终版）, `ARCHITECTURE.md`, `DESIGN_DECISIONS.md`, `SKILL_DECOMPOSITION_BRIEF.md`, `rejected/`（10 条）
  - 用户已确认 4 skill 方案 ✅
  - 未决事项：`DESIGN_DECISIONS.md` 末尾 5 条保留，部分会在阶段 2 自然解决

- [ ] **阶段 2 — RIA++ 构造 skill** ← 下一步
  - 待产出: 4 个 `SKILL.md`

- [ ] **阶段 3 — Zettelkasten 链接**
  - 待产出: `INDEX.md`, `GLOSSARY.md`

- [ ] **阶段 4 — 压力测试**
  - 待产出: `test-prompts.json` × 4, `test-results.md` × 4

- [ ] **阶段 5 — 交付**
  - 待产出: `DIGEST.md`, skill 安装

---

## 最终 skill 清单（4 个，用户已确认）

| # | Slug | 标题 | 定位 |
|---|------|------|------|
| 1 | `char-build-guide` | 角色构建引导（追问引擎） | 主入口。内含 7 种内部模式 + 快速路径 |
| 2 | `dialogue-persona` | 台词人设写法 | 调色盘的平级替代方案。台词 + 第三人称解释 + 存疑 |
| 3 | `worldbook-config` | 世界书配置原则 | 技术配置。ABC 分类 + 触发策略 |
| 4 | `user-info-calibration` | 用户信息校准 | 配套模块。行为翻译手册 |

## 下一步

进入阶段 2，依次为 4 个 skill 编写完整 SKILL.md（R/I/A1/A2/E/B 六段）。
顺序：先 char-build-guide（最复杂，约 8000 字）→ dialogue-persona → worldbook-config → user-info-calibration。
