---
name: knot-cli
description: 把任务委托给 Knot 平台的远程智能体。两种用途：① 独立第三方审查你的产出——产出架构/方案/设计、或完成关键工作后，要 review / 评审 / 第二意见 / 独立视角时；② 把分析、检索、代码、长耗时任务外包给独立 agent——用户说外包 / 代劳 / 帮我做 / 交给 agent / 让 agent 跑时。提到 knot、远程智能体即触发，即使没明说 knot-cli。
metadata:
  version: "1.0.0"
---

# Knot CLI — 委派智能体执行指南

`knot-cli` 是 Knot 平台智能体的命令行客户端，把任务委托给自带工具（读文件、联网、执行命令）的远程智能体。

## 快速决策

按目标选对应行，命令直接抄：

| 任务      | 命令                                                                         |
| ------- | -------------------------------------------------------------------------- |
| 提问      | `knot-cli chat -o json -p '问题'`                                            |
| 使用子智能体  | `knot-cli list-agents` → `knot-cli chat -o json --subAgentId <id> -p '问题'` |
| 浏览目录结构  | `knot-cli chat -o json --workspace /绝对/路径 -p '分析这个目录'`                     |
| 读本地文件内容 | `knot-cli chat -o json -p '读取 /绝对/路径/文件 并分析'`（智能体用 read_file 工具）           |
| 传本地图片   | `knot-cli chat -o json --images /绝对/路径/img.png -p '描述这张图'`                 |
| 注入背景知识  | `knot-cli chat -o json --knowledge /绝对/路径/kb.md -p '按背景知识回答'`              |
| 应用用户规则  | `knot-cli chat -o json --user-rules /绝对/路径/rules.md -p '...'`              |
| 联网搜索    | `knot-cli chat -o json --enable-web-search -p '查一下...'`                    |
| 延续对话    | 取上次输出的 `sessionID` → `knot-cli chat -o json --sessionId <id> -p '...'`     |
| 长任务     | Bash 工具 `run_in_background: true`                                          |

所有路径必须是绝对路径（远程智能体按路径定位文件，相对路径会找不到）。CLI 二进制：`/Users/josephdeng/background_agent_cli/bin/knot-cli`。

## 执行规则

### JSON 输出是必须的

一律 `-o json`：返回结构化 JSON（`response` 回复文本、`stats` token/模型），且 stdout 最后一行打印 `sessionID`——多轮会话的唯一凭证。不加则无法程序化提取 sessionID 或检查 stats。

```bash
knot-cli chat -o json -p '问题'
```

### Shell 转义：两条路径

shell 只对**半角元字符**敏感（`"`、`$`、反引号、反斜杠、换行）；**全角标点（中文引号""、顿号、句号）天然安全，不是 shell 元字符，不需要转义**。

**简单 prompt**（无半角引号/`$`/反引号/多行）——单引号内联：

```bash
knot-cli chat -o json -p '分析这段代码的结构'
```

**复杂 prompt**（含半角引号/`$`/反引号/反斜杠/多行/代码）——先写 /tmp 文件，再命令替换：

```bash
cat > /tmp/prompt.md << 'EOF'
含 "引号"、$变量、`代码`、\ 和多行的 prompt
EOF
knot-cli chat -o json -p "$(cat /tmp/prompt.md)"
```

命令替换结果不会被二次展开，字符原样传递；拿不准就先写 /tmp 文件。

### 读本地文件内容：引导 read_file，不用 --files

`--files` 只注入路径元数据、不上传内容（content 恒空、fileSize 显示 NoneB）。正确方式：在 prompt 里给绝对路径，让智能体用它的 `read_file` 工具读——任意绝对路径（含 /tmp、workspace 外）都可读，不需 `--files`/`--workspace`。

```bash
knot-cli chat -o json -p '读取 /绝对/路径/文件.py 的完整内容并分析其中的问题'
```

`--workspace` 只用于目录级浏览（列目录、定位文件），不是读内容的前提：

```bash
knot-cli chat -o json --workspace /绝对/路径 -p '分析这个项目的结构'
```

### 传图：--images 真上传

与 `--files` 不同，`--images` 真的上传图片字节，智能体直接可见：

```bash
knot-cli chat -o json --images /绝对/路径/img.png -p '描述这张图'
```

### 多轮会话：仅在需连续性时复用 sessionID

后续提问依赖前文（追问、迭代修改、引用之前结果）时，把上一轮 `sessionID` 传给 `--sessionId`。一次性独立问题别带——无关历史会污染回答。

```bash
# 第一轮，输出末尾打印 sessionID: abc123
knot-cli chat -o json -p '记住暗号：紫色菠萝'

# 第二轮，带上 sessionID 延续上下文
knot-cli chat -o json --sessionId abc123 -p '暗号是什么？'
```

注意 sessionID 提供上下文记忆、**不省 token**，每轮仍约 2 万输入 tokens。

### 长任务：后台运行

耗时调用加 Bash 参数 `run_in_background: true`。

- 完成后 `Read` 输出文件取 `response`/`stats`（系统会通知路径）。
- 不要写 `sleep`/轮询/等待逻辑，也不要用 `nohup`/`&`/`wait`/PID 文件（每次 Bash 调用是独立 shell，进程状态不持久）。
- 需要续聊时取 stdout 末尾的 `sessionID` 传 `--sessionId`（见「多轮会话」）。

## 派 agent 的纪律

主 agent 是总控和大脑；子 agent 是独立思考的手脚，产出结论、不负责决策。

- **指令中立**：派发时交代清楚背景、目标、约束、输出要求；指令要充足、正确、精准，不带预设立场、不夹带倾向——哪怕"建议侧重某点"也会带偏，让 agent 自由发挥、中立客观地独立思考。

## 收回来：审核、决策、同步

子 agent 的结论收回来后，由主 agent 审核、综合、判断。把结果同步给用户时遵循：

- **整批回来再综合**：同一批派出去的 agent 会先后回来，别回来一个就分析一个、各写一大段。等这一批全回来，一次性综合、只给一个回复。信息够用户拍板就行，别写论文。
- **决策权归用户**：主 agent 把分析、选项、依据讲清楚，由用户拍板；重要决策不替用户定。
- **说人话**：用大白话，不用术语、缩写、自造词；第一次出现的词要么解释、要么换普通说法。让用户扫一眼就懂，不用费劲猜。
- **不假设用户看过**：每条自己讲清楚——一句话交代这轮派了什么、各查什么；引用的码、文件名、术语第一次出现要带内容或定义。
- **先证据后判断**：先原样列 agent 发现了什么，再说采纳/驳回/修正；结论不能顶替证据，过滤前的材料要让用户够得着。
- **判定给理由**：每条采纳/驳回/修正都带理由，理由能追溯到原始材料。
- **发现和改法分开**：先说「agent 发现了什么」，再说「据此怎么改」，让用户自己判断改动合不合理。
- **详略分开**：完整内容写进文档；对话里给摘要，每条发现一行（出处+内容+判定+理由）。别只给结论，也别刷屏。
- **同步完自查**：确认用户能独立回答——各 agent 发现了什么 / 采纳驳回了哪些及为什么 / 接下来改什么。答不上就补全。

## 模型选择

**不传模型参数，会默认使用`deepseek-v4-flash`**，换其他模型时把模型参数拼接到场景命令尾部：`knot-cli chat -o json <模型参数> -p '问题'`。

| 模型                           | 价格  | 上下文  | 模型参数                                                                   | 适用           |
| ---------------------------- | --- | ---- | ---------------------------------------------------------------------- | ------------ |
| `deepseek-v4-flash`（默认）      | 免费  | 128K | （默认，无需参数）                                                              | 检索、求速度、日常问答  |
| `glm-5.2`                    | 免费  | 128K | `-m glm-5.2`                                                           | 日常任务         |
| `kimi-k2.7-code`             | 免费  | 128K | `-m kimi-k2.7-code`                                                    | 代码任务         |
| `hy3`                        | 免费  | 224K | `-m hy3`                                                               | 长上下文任务       |
| `deepseek-v4-pro`            | 免费  | 128K | `-m deepseek-v4-pro --enable-thinking --reasoning-effort max`          | 复杂推理、深度逻辑分析  |
| `tokenhub_deepseek-v4-flash` | 付费  | 1M   | `-m tokenhub_deepseek-v4-flash --enable-thinking`                      | 超长上下文 + 求速度  |
| `tokenhub_deepseek-v4-pro`   | 付费  | 1M   | `-m tokenhub_deepseek-v4-pro --enable-thinking --reasoning-effort max` | 超长上下文 + 复杂推理 |

- **选模型**：按任务难度、长度、类型选择——
  - 类型/速度：检索、求速度、日常问答 → `deepseek-v4-flash`；日常任务 → `glm-5.2`；代码 → `kimi-k2.7-code`。
  - 长度：长上下文（长文档/大量材料）→ `hy3`（224K）。
  - 难度：复杂推理、深度逻辑 → `deepseek-v4-pro`（开 `--enable-thinking --reasoning-effort max`）。
  - 付费 `tokenhub_*`（1M）仅用于超长上下文或预期很长的多轮，且先用前征得同意。

## 禁止参数

无效或有害，一律不用：

- `--scene`：破坏请求（报错/空响应），平台自动填充，手动传值会出错
- `--sandbox` / `--network`：拦不住智能体自身联网（它自带调用 skill/执行命令的工具）
- `--files`：不上传文件内容，读内容用 read_file
- `--reasoning-effort` 单独使用：必须与 `--enable-thinking` 同传，否则无效
- `--max-context-tokens`：无效果

## 安装

CLI 已预装（`/Users/josephdeng/background_agent_cli/bin/knot-cli`）。不要尝试自动安装/更新，除非用户明确要求。
