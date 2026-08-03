# AGENTS.md — SillyTavern + Piney 服务器运维手册

最后验证日期：2026-08-02
维护人：josephdeng
适用 agent：CodeBuddy / Claude Code / Codex 等

## 1. 任务目标

本目录是本地 Mac 工作区，用于维护一台腾讯云轻量应用服务器。服务器上运行两个服务：

| 服务          | 用途                 | 端口         | 部署方式       |
| ----------- | ------------------ | ---------- | ---------- |
| SillyTavern | AI 聊天前端            | 8000（本机监听） | systemd 服务 |
| Piney       | SillyTavern 角色卡工作站 | 9696（公网直连） | Docker 容器  |

关键事实：

- 本目录是本地项目，服务器上的实际文件在远端，不在本地。
- 所有服务器操作通过本机（Mac）SSH 远程执行，不需要手动登录腾讯云控制台。
- 用户是非专业开发者，不需要掌握运维知识。agent 负责消化技术细节，用大白话汇报。

## 2. 环境与事实来源

### 远端服务器

| 项目    | 值                     |
| ----- | --------------------- |
| 实例 ID | lhins-jewxli25        |
| 实例名称  | Ubuntu-ihzE           |
| 地域    | 广州（ap-guangzhou）      |
| 系统    | Ubuntu 22.04.5 LTS    |
| 公网 IP | 134.175.249.80        |
| 登录用户  | ubuntu（仅密钥登录，密码登录已关闭） |

### 本机（Mac）

- SSH 密钥：ed25519，公钥已配置在服务器 `/home/ubuntu/.ssh/authorized_keys`
- 本地工作区：`/Users/josephdeng/Documents/sillytavern/piney`（源码仓库克隆，与服务器 Docker 部署相互独立）

### 连接方式

```bash
# 标准连接（端口 22，密钥登录）
ssh ubuntu@134.175.249.80

# 备用连接（端口 2222，防火墙已放行 TCP:2222）
ssh -p 2222 ubuntu@134.175.249.80
```

## 3. 不可违反的规则（硬约束）

以下规则优先级最高，任何操作不得违反：

1. **先诊断、后动手**：能先只读检查的（状态、日志、端口、资源占用），先把情况摸清，再决定要不要改。
2. **先确认、后变更**：任何会改变服务器状态的操作（安装、升级、改配置、重启服务、删数据、开端口）必须先向用户说明「做什么、为什么、风险是什么」，用户确认后才执行。
3. **数据操作先备份**：删除、覆盖、恢复等涉及数据的操作，先做备份或确认有备份，再动手。
4. **不擅自开端口**：任何对外暴露变更（开端口、加域名）必须先说明风险并获确认。
5. **不懂就直说**：超出能力范围的事，不硬来，明确告诉用户需要做什么、找谁做。
6. **CodeBuddy 必须跑在这台 Mac 上**（SSH 密钥与 ssh 客户端都在 Mac 侧），否则无法执行任何操作。

## 4. 操作授权矩阵

| 操作类型                   | 是否可直接执行 | 是否需先确认 | 备注       |
| ---------------------- |:-------:|:------:| -------- |
| 只读检查（状态、日志、端口、磁盘、内存）   | ✅ 是     | ❌ 否    | 随时可做     |
| 服务重启（systemd / docker） | ❌ 否     | ✅ 是    | 先说明影响    |
| 修改配置文件                 | ❌ 否     | ✅ 是    | 改前备份     |
| 安装 / 升级软件              | ❌ 否     | ✅ 是    | 先说明风险    |
| 防火墙 / 端口变更             | ❌ 否     | ✅ 是    | 先说明暴露风险  |
| 删除 / 覆盖数据              | ❌ 否     | ✅ 是    | 必须先备份    |
| 系统级变更（sshd、内核等）        | ❌ 否     | ✅ 是    | 高风险，格外谨慎 |

## 5. 服务地图

### 5.1 SillyTavern

- 进程监听：`127.0.0.1:8000`
- 登录：已开启 `--enableLogin` 密码登录，防止外人直进
- 公网访问：nginx 在 80 端口反代到本机 8000
- **访问链接：`http://134.175.249.80`**
- 启动方式：systemd 服务，服务器重启后自动启动
- 防火墙：只放通了 80/22/9696/ICMP，未开 8000（走反代而非改防火墙）

### 5.2 Piney

- 部署方式：Docker（服务器已装 Docker CE v29 + compose v5）
- 目录：`/home/ubuntu/piney`
- 配置文件：`docker-compose.yml`
- 数据卷：`./data:/app/data`（持久化，重启不丢）
- 镜像：`ghcr.io/andclear/piney:latest`
- 容器名：`piney`
- 健康检查：`/api/health`
- 监听：`0.0.0.0:9696`
- 公网访问：`http://134.175.249.80:9696`
- **访问链接：`http://134.175.249.80:9696`**
- 防火墙：走的是轻量应用服务器「防火墙」（已放行 TCP:9696），不是 CVM 安全组，别去安全组找

### 5.3 nginx

- 公网 80 端口反代到本机 8000
- 使 `http://134.175.249.80` 可直接访问
- 可选后续：用户有域名后可加 HTTPS（Let's Encrypt）

## 6. 标准命令清单

### SSH

```bash
ssh ubuntu@134.175.249.80
ssh -p 2222 ubuntu@134.175.249.80   # 备用
```

### 服务管理

```bash
# SillyTavern（systemd）
systemctl status sillytavern
systemctl restart sillytavern
systemctl stop sillytavern
journalctl -u sillytavern -f          # 实时日志

# Piney（Docker）
docker ps -a --filter name=piney
docker logs -f piney
docker compose -f /home/ubuntu/piney/docker-compose.yml restart
docker compose -f /home/ubuntu/piney/docker-compose.yml down
docker compose -f /home/ubuntu/piney/docker-compose.yml up -d
```

### nginx

```bash
nginx -t                              # 配置校验（改完必跑）
systemctl reload nginx
systemctl status nginx
```

### 端口 / 网络检查

```bash
ss -lntp                              # 查看监听端口
curl -s http://127.0.0.1:8000/health  # 本机检查 SillyTavern
curl -s http://127.0.0.1:9696/api/health  # 本机检查 Piney
curl -s http://134.175.249.80         # 公网检查
```

### 资源检查

```bash
df -h                                 # 磁盘
free -h                               # 内存
top -b -n 1 | head -20                # CPU 概览
```

## 7. 常见任务 SOP

### 7.1 主页（80 端口）打不开

按顺序排查：

1. `curl -s http://134.175.249.80` — 公网是否通
2. `systemctl status nginx` — nginx 是否在
3. `systemctl status sillytavern` — SillyTavern 是否在
4. `ss -lntp | grep 8000` — 8000 端口是否监听
5. `journalctl -u sillytavern -n 50` — 看 SillyTavern 日志
6. 最后才考虑重启服务（需先确认）

### 7.2 9696（Piney）打不开

按顺序排查：

1. `curl -s http://134.175.249.80:9696/api/health` — 公网健康检查
2. `docker ps -a --filter name=piney` — 容器状态
3. `docker logs -f piney` — 看容器日志
4. 确认防火墙 TCP:9696 是否放行（轻量应用服务器防火墙，非安全组）
5. 最后才考虑 `docker compose restart`（需先确认）

### 7.3 SSH 连不上

1. 先试备用端口 `ssh -p 2222 ubuntu@134.175.249.80`
2. 若弹微信扫码二维码且过不去：去控制台确认「扫码登录」是否被重新开启
3. 应急通道：腾讯云控制台 OrcaTerm 网页终端（走控制台会话通道，不受 SSH 网关影响）

### 7.4 升级 / 重启前检查

1. 确认当前版本：`docker ps` / `systemctl status`
2. 备份数据目录（见第 9 节）
3. 确认磁盘空间：`df -h`
4. 向用户说明升级内容、风险、回滚方案，获确认后执行

### 7.5 磁盘告警

1. `df -h` — 确认哪个分区满
2. 排查大文件：`du -sh /home/ubuntu/* | sort -rh | head -10`
3. 清理 Docker 无用镜像：`docker system prune -f`（需先确认）
4. 向用户汇报占用情况和清理建议

### 7.6 服务变慢

1. `top -b -n 1 | head -20` — 看 CPU / 内存占用
2. `free -h` — 看内存
3. `df -h` — 看磁盘
4. 看对应服务日志找异常
5. 向用户汇报原因和建议

## 8. 验收清单（变更后必须检查）

| 变更类型      | 验收标准                    |
| --------- | ----------------------- |
| 服务重启      | 进程存在、端口监听正常、健康检查通过      |
| nginx 改动  | `nginx -t` 通过、80 端口响应正常 |
| Docker 改动 | 容器 healthy、日志无持续报错      |
| 外网访问类     | 本机 curl + 公网访问都验证通过     |
| 配置修改      | 服务正常启动、无报错日志            |

## 9. 备份与回滚

### 备份范围

- Piney 数据目录：`/home/ubuntu/piney/data/`
- SillyTavern 配置：`/home/ubuntu/sillytavern/config/`（如有）

### 备份规则

- 命名格式：`backup_<服务名>_<日期>.tar.gz`
- 备份到服务器本地 `/home/ubuntu/backups/`
- 涉及数据操作前必须先备份

### 回滚触发条件

- 升级后服务无法启动
- 配置修改后服务异常
- 数据操作后数据丢失

### 应急通道

- 腾讯云控制台 OrcaTerm 网页终端始终可用

## 10. 已知坑（务必记住）

### 10.1 腾讯云「扫码登录」网关

- 该实例默认开启轻量应用服务器「扫码登录」，会在所有入站 SSH 前插入微信扫码验证网关。
- 已在控制台关闭。关闭后 raw ssh 密钥登录恢复。
- 连接时可能仍打印微信二维码 banner，但不要求扫码、直接放行，属无害残留，忽略即可。
- 若某天 ssh 又弹码且过不去：先去控制台确认「扫码登录」是否被重新开启；或用 OrcaTerm 应急。

### 10.2 服务器直连不了 GitHub

- 广州机器直连 `github.com:443` 会超时。
- Git 克隆走代理：

```bash
git clone --depth 1 -b release https://ghproxy.com/https://github.com/SillyTavern/SillyTavern.git
# 失败可换 https://kgithub.com/SillyTavern/SillyTavern.git
```

- npm 换国内镜像（npmmirror）再 `npm install`。

### 10.3 改 sshd 配置注意换行

- 修改 `/etc/ssh/sshd_config` 时，文件末行必须保留换行符。
- 用 `printf '...\n' | sudo tee -a` 而非裸 `echo` 追加。
- 改完务必 `sudo sshd -t` 校验，否则 sshd 启动失败、SSH 全断。

## 11. 安全规则

### 硬性安全要求

- SSH 仅密钥登录，不在服务器上启用密码登录。
- 涉及数据/配置变更或对外暴露时，先说明风险再执行。
- 数据操作先备份再动手。

### ⚠️ Piney 安全风险（高优先级）

风险等级：**高**

- 密码为明文存储。
- `/api/auth/recover` 接口无鉴权可重置密码。
- 9696 端口对公网开放。

处理原则：

1. 务必尽快完成 Piney 初始化账号。
2. 发现任何异常访问或安全事件，立即向用户汇报。
3. 不擅自关闭 9696 端口（会影响用户使用），但必须提醒风险。

## 12. 汇报格式

每次操作完成后，按以下格式向用户汇报：

```
【现象】发生了什么 / 用户报告了什么
【原因】诊断出的根因
【处理】做了什么操作
【风险】当前是否还有风险
【状态】是否已恢复
【建议】后续建议（如需）
```

用大白话汇报，不堆术语；需要对比时用表格。

## 13. 元信息

| 项目     | 值                             |
| ------ | ----------------------------- |
| 最后验证日期 | 2026-08-02                    |
| 最后维护人  | josephdeng                    |
| 下次需复核项 | Piney 安全风险是否已缓解；是否有域名接入 HTTPS |
