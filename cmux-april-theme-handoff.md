# cmux「April」浅色苔绿主题 — 跨设备交接文档

> 给 Ardot 项目另一台电脑/另一台设备安装用。照此操作即可复现。
> 目标效果：cmux 终端 + 侧边栏/tab 全部换成 April 浅色苔绿主题。

---

## 背景（为什么这么做）

- 用户机器装的 cmux 是 **manaflow-ai/cmux**（macOS 原生 App，不是 TUI 多路复用器）。
- cmux 的**终端渲染内核是 Ghostty** → 终端配色（背景/前景/16 色 palette/cursor）**必须写在 Ghostty 配置** `~/.config/ghostty/config`，cmux 直接读取。
- cmux 的 **UI 壳颜色**（侧边栏、tab、边框、通知）写在 **`~/.config/cmux/cmux-tui.json`**（注意：不是 `cmux.json`，官方 schema 里 `cmux.json` 没有 `theme` 字段）。
- 用户给的主题源是 **Warp 的 `April` 主题**（TOML），需要手动映射成 Ghostty 语法 + cmux-tui 语法。cmux 官方不支持直接导入 Warp 主题，**但 Warp 主题的 `[terminal]` 字段和 Ghostty 配置基本一一对应**。
- 侧边栏外观由 `~/.config/cmux/cmux.json` 的 `sidebarAppearance` 控制。

---

## 操作步骤（3 个文件）

### 1. 终端配色 → `~/.config/ghostty/config`

先备份再改：

```bash
cp ~/.config/ghostty/config ~/.config/ghostty/config.bak
```

写入以下内容（可直接整段替换）：

```ini
# April — light botanical theme (Warp → ghostty mapping)
theme = April
font-size = 16
background-opacity = 1.0

palette = 0=#1A1F1C
palette = 1=#B23B3B
palette = 2=#5DA802
palette = 3=#B88A3A
palette = 4=#3D87C8
palette = 5=#9B5AAB
palette = 6=#3F9B85
palette = 7=#8cbaa5
palette = 8=#3D4B44
palette = 9=#D04A3D
palette = 10=#7CB342
palette = 11=#D89B47
palette = 12=#5AA3D6
palette = 13=#A67ABF
palette = 14=#5BB8A0
palette = 15=#2A332E
background = #ffffff
foreground = #17703f
cursor-color = #17703f
cursor-text = #ffffff
selection-background = #14934b2f
selection-foreground = #2A332E
```

> 注：原配置若为暗色主题（如 Catppuccin Mocha），有 `background-blur = true`、`background-opacity = 0.95` 等毛玻璃项，浅色主题下建议改为 `background-opacity = 1.0` 并删掉 blur，否则背景发灰。

**色值对照表（Warp April → Ghostty）：**

| Warp 字段 | 值 | Ghostty 字段 |
|---|---|---|
| `background` | `#ffffff` | `background` |
| `foreground` | `#17703f` | `foreground` |
| `cursor`（主题无，取 foreground） | `#17703f` | `cursor-color` |
| — | `#ffffff` | `cursor-text` |
| `tab.active background` | `#14934b2f` | `selection-background` |
| `token.foreground` | `#2A332E` | `selection-foreground` |
| `palette[0..15]` | 16 色 | `palette = N=...` 16 行 |

### 2. cmux UI 壳 → `~/.config/cmux/cmux-tui.json`（新建）

```bash
cp ~/.config/cmux/cmux.json ~/.config/cmux/cmux.json.bak
```

写入：

```json
{
  "theme": {
    "selection_background": "#14934b2f",
    "selection_foreground": "#2A332E",
    "sidebar_rail": "#5DA802",
    "sidebar_active_bg": "#14934b2f",
    "tab_rail": "#5DA802",
    "tab_bg": "#F4F6F4",
    "tab_active_bg": "#14934b2f",
    "border_active": "#5DA802",
    "border_inactive": "#E0E6E2",
    "notification_info": "#3D87C8",
    "notification_warning": "#D89B47",
    "notification_error": "#D04A3D"
  }
}
```

**UI 色值对照表（Warp April → cmux-tui）：**

| Warp 字段 | 值 | cmux-tui 字段 |
|---|---|---|
| `panel.surface` / `sidebar.background` | `#F4F6F4` | `tab_bg` |
| `tab.active background` | `#14934b2f` | `sidebar_active_bg`、`tab_active_bg`、`selection_background` |
| `accent` | `#5DA802` | `sidebar_rail`、`tab_rail`、`border_active` |
| `panel.border` | `#E0E6E2` | `border_inactive` |
| `palette[3]`（黄） | `#D89B47` | `notification_warning` |
| `palette[9]`（红） | `#D04A3D` | `notification_error` |
| `palette[4]`（蓝） | `#3D87C8` | `notification_info` |

> `cmux-tui.json` 支持 JSONC（可带注释），键全部可选，未知键会使整个配置失效回退默认。本次只放了 `theme`，其余键留给系统默认。

### 3. 侧边栏外观 → `~/.config/cmux/cmux.json`

在文件顶部（`schemaVersion` 之后）插入：

```jsonc
  "sidebarAppearance": {
    "lightModeTintColor": "#F4F6F4",
    "matchTerminalBackground": true,
    "tintColor": "#F4F6F4",
    "tintOpacity": 1.0
  },
```

> 原侧边栏是黑色 18% 半透明（`tintColor #000000` + `tintOpacity 0.18`），April 浅色主题下应改为 `#F4F6F4` 不透明。`app.appearance` 建议设 `light` 或在系统偏好切浅色，否则侧边栏仍是深色。

---

## 生效方式（无需重启 App）

```bash
cmux reload-config
# 输出 OK Reloaded config 即成功
# 同时重载 Ghostty 配置 + cmux.json + cmux-tui.json，并原地刷新已开终端
```

> 路径：`/Applications/cmux.app/Contents/Resources/bin/cmux`（`which cmux` 可查）。

---

## 回退方式

| 文件 | 回退 |
|---|---|
| `~/.config/ghostty/config` | 用 `config.bak` 覆盖，或改回原 `theme = Catppuccin Mocha` |
| `~/.config/cmux/cmux-tui.json` | 直接删除该文件（回到默认） |
| `~/.config/cmux/cmux.json` | 用 `cmux.json.bak` 覆盖 |

改完任选一个：重启 cmux 或 `cmux reload-config`。

---

## 已验证

- 本机 `cmux reload-config` 输出 `OK Reloaded config`，零报错。
- 三个文件 JSON/ini 语法全部校验通过。
- cmux 官方 docs 确认：`theme` 字段在 `cmux-tui.json`；终端行为走 Ghostty；`cmux.json` 的 `sidebarAppearance` 合法。

## 参考

- [cmux 官方配置文档（theme 键说明）](https://github.com/manaflow-ai/cmux/blob/main/cmux-tui/docs/configuration.md)
- [Warp themes — April 源文件](https://github.com/warpdotdev/themes/blob/main/themes/April.yaml)
- [Ghostty 配置文档](https://ghostty.org/docs/config/reference)
