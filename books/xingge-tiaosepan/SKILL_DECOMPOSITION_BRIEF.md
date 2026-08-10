# 技能拆解方案 — 决策简报（给接手蒸馏任务的 AI）

> **用途**：本文件是 `books/xingge-tiaosepan/` 蒸馏项目的「决策交接文档」。
> 如果你是被指派**继续执行 cangjie-skill 蒸馏**的 AI，请先读这份，再决定 skill 怎么拆，然后进阶段 2。
> 它独立于 `verified.md` / `ARCHITECTURE.md` / `DESIGN_DECISIONS.md`，是站在「读完全部材料」之后的第三方核查结论。

---

## 0. 一句话结论

`verified.md` 里写的 **6 个 skill 是错的 / 过时的**。项目自己后来也推翻了它（见 §1）。
但项目自己定的 **3 个也不全**——漏掉了源材料里两个有独立触发场景的方法论（见 §2）。
**真正该定的数量是 3~5 之间，推荐 4 个**（见 §3）。这是一个需要你拍板的 fork，不要闷头照抄任何一份旧文档。

---

## 1. 核心矛盾：项目自己的文件互相打架

同一轮蒸馏跑出了两份矛盾的阶段 1.5 结论：

| 文件 | 结论 | 性质 |
|---|---|---|
| `verified.md` | **6 个** skill（char-build-guide / palette-derivative / three-faces / core-personality-layer / worldbook-config / user-info-calibration） | 先写，**过时初稿** |
| `ARCHITECTURE.md` + `DESIGN_DECISIONS.md` | **3 个** skill（char-build-guide / worldbook-config / user-info-calibration） | 后写，** refined 终稿** |

`DESIGN_DECISIONS.md`「决策 2」原话：「**从最初的 5→6→3**」，并在「已否决方案清单」里把
「6 个按教程章节拆分的独立 skill」「5 个 skill（含独立调色盘 skill）」都列为**已否决**。

> ⚠️ 所以：**不要信 `verified.md` 的 6 个**。它顶部还残留「最终 5 个」、末尾改「6 个」，本身就没同步完就被后面推翻了。
> `ARCHITECTURE.md` / `DESIGN_DECISIONS.md` 才是项目自己走到最后的答案。

---

## 2. 为什么 6 错（根因，已用全部材料交叉验证）

多面性 / 混色 / 核心人格层 **从来不是用户会主动说的入口**。
它们在源材料里永远是「追问到一定程度自然激活的深度」，不是独立触发场景：

- 调色盘 = 「她是什么做的」；多面性 = 「同盘颜料在不同房间怎么调」（`frameworks.md` f09）
- 混色 = 「颜色打架时才写进同一画面」（`frameworks.md` f11）
- 核心人格层 = 「追问到『为什么选这条路』才激活」（`frameworks.md` f04、`principles.md` p54）

`DESIGN_DECISIONS.md` 决策 2 的否决理由一针见血：拆成 6 后，每个 skill 的 E 段第一步都得写
「确保你已有调色盘」——这是过度原子化的典型信号。cangjie-skill 的质量红线也禁止「用户永远不会主动说的 trigger」。

---

## 3. 但「3 个」也有漏 —— 这是读完全部材料才发现的关键缺口

`ARCHITECTURE.md` 把 `char-build-guide` 的内部模式列成：基础信息 / 调色盘 / 多面性 / 混色 /
核心人格层 / 二次解释 / 意象（+ 快速路径 / 小传路径）。**这个清单漏了源材料里两个完整存在、
且有独立触发场景的方法论：**

### 缺口 A：台词人设（教程 3）
- 一套完整替代方案：台词 + 第三人称解释 + 存疑机制。
- `principles.md` **p35** 明确定义：「**调色盘是主方案，台词人设是特化方案……一个角色要么用调色盘写，要么用台词人设写**」。
- 有独立 trigger（克制型模型、台词生硬），且原则要求**两者不混用**（`principles.md` p35/r09、`counter-examples.md` ce38、ce52）。
- `glossary.md` g22 将其归为 `alternative-methodology`（替代方法论），并明说「根据模型行为选择，不能把两个体系的元素混在一起」。
- 3-skill 架构完全没处理它。

### 缺口 B：开场白（教程 5）
- 独立交付物：给角色卡写第一句话 / 事件钩子 / 规避八股。
- 有自己的原则（`principles.md` p46–p48）和反例（`counter-examples.md` ce39、ce46）。
- 任何 skill 都不覆盖。

### 缺口 C（较弱）：长期性设计（教程 6）
- 进化系统 / 分支选择 / 不变内核。姜糖、秋浮生案例里是实打实的方法论（`cases.md` c09、c15）。
- 架构里没提，但可并入 char-build-guide 的设计层，不必单独成 skill。

> `glossary.md` 末尾自检报告亲口承认补了「台词人设、行为翻译手册、边界、小传、情绪阈值」——
> 说明**提取层**早就识别出这些是独立面，只是 `ARCHITECTURE.md` 收口时没接住。

---

## 4. 需要你拍板的决策：到底拆几个

提取层（5 个候选池）是完整且高质量的，问题**只在拆解层**。请在下述方案中选定：

| 方案 | 内容 | tradeoff |
|---|---|---|
| **A（守 3）** | 3 核心 skill，把台词人设 / 开场白当 char-build-guide **内部明确划界的路径/环节** | trigger 最干净；但违反「台词人设与调色盘不混用」原则——塞进调色盘引擎会别扭 |
| **B（4 个）★ 推荐** | 3 核心 + **台词人设独立成 skill**（它是「二选一」的替代方案，不是同引擎深度，trigger 清晰）；开场白仍作为 char-build-guide 的产出环节 | 最贴合源材料「不混用」硬约束；覆盖全 |
| **C（5 个）** | 4 + **开场白也独立成 skill** | 覆盖最全；但开场白 trigger 偏弱（用户更常说「帮我写角色」而非「写开场白」），有虚设风险 |

### 推荐：B（4 个）
- 理由：台词人设的「和调色盘二选一、不混用」是源材料明写的铁律，它天然是 char-build-guide 的
  **平级替代方案**而非子模式，单独成 skill 才不违反这条；开场白作为构建流程的最后一环放进
  char-build-guide 更自然。
- 4 个既守住项目自己定下的 3-skill 结构精神，又把漏掉的真实方法论补上。

### 命名与边界提示（来自既有文档）
- 三面性 → 应改称 **多面性**（`ARCHITECTURE.md` 第七节：面的数量由角色定，不必须是 3）。
- `char-build-guide` 是「追问引擎」不是「知识手册」（`DESIGN_DECISIONS.md` 决策 3）：通过提问让用户自己看见角色，不输出方法论。
- `char-build-guide` 内部模式**不暴露给用户**（决策 4）：基础信息/调色盘/多面性/混色/核心人格层/二次解释/意象之间的切换由引擎自动判断。
- 用户信息（user-info-calibration）的 trigger 独立（「AI 老误解我」「抓手腕总被理解成强制」），已被三重验证重新加回，保留为独立 skill。

---

## 5. 决策完成后该做什么

1. 把最终 skill 清单 + 选定方案，写进（或新建）`PIPELINE_STATE.md`，标清「阶段 1.5 用户轻确认：已确认 / 待确认」。
2. 把 `verified.md` 里过时的「6 个」结论标注为「已被推翻，见本简报 §1」，避免后人再被误导。
3. 按 `cangjie-skill` 流程进**阶段 2**：对通过清单里每个 skill 用 `templates/SKILL.md.template` 构造 `SKILL.md`（R/I/A1/A2/E/B 六段齐全）。
4. 阶段 3 建 Zettelkasten 链接 → 阶段 4 darwin 兼容压力测试 → 阶段 5 交付。

---

## 6. 证据索引（接手 AI 可复核）

| 主张 | 证据位置 |
|---|---|
| `verified.md` 结论 6 个且内部自相矛盾 | `verified.md` 顶部汇总「最终 skill 数 5」 vs 末尾「修正后清单 6 个」 |
| 项目自己推翻 6 → 3 | `DESIGN_DECISIONS.md` 决策 2「从最初的 5→6→3」+ 已否决方案清单 |
| 3 个的论证 | `ARCHITECTURE.md` 第六节「为什么是 3 个而不是 6 个或 1 个」 |
| 6 错的根因（深度递进非独立 trigger） | `frameworks.md` f04/f09/f11；`principles.md` p26–p34、p54–p62；`cases.md` c05/c06 |
| 缺口 A：台词人设被 3-skill 架构漏掉 | `principles.md` p35、r09；`counter-examples.md` ce38、ce52；`cases.md` c08；`glossary.md` g22 |
| 缺口 B：开场白被漏掉 | `principles.md` p46–p48；`counter-examples.md` ce39、ce46 |
| 缺口 C：长期性设计 | `cases.md` c09、c15 |
| 提取层已识别这些独立面 | `glossary.md` 末尾自检报告 |
| 三面性→多面性改名 | `ARCHITECTURE.md` 第七节；`DESIGN_DECISIONS.md` 决策 5 |
| char-build-guide = 追问引擎非知识手册 | `DESIGN_DECISIONS.md` 决策 3、决策 4 |

---

## 7. 各候选池覆盖面（证明问题只在「拆解层」，不在「提取层」）

- `candidates/frameworks.md`：f01–f18 共 18 条框架，齐全。
- `candidates/principles.md`：84 条原则 + 16 清单 + 15 规则 + 10 格言，覆盖教程 0–11 + 大总结 + 问题库。
- `candidates/cases.md`：c01–c20 共 20 个完整案例。
- `candidates/counter-examples.md`：ce01–ce53 共 53 条失败模式。
- `candidates/glossary.md`：g01–g34 共 34 条术语，按 10 个体系分组。

> 提取质量无问题。你只需要解决「这些材料该聚成几个 skill、边界怎么划」这一个问题。
