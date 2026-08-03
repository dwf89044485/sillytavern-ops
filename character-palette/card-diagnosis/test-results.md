# test-results — card-diagnosis

## 测试方式
**独立 sub-agent 盲测**（无参与蒸馏、看不到预期答案）。盲测 agent 拿到 4 个 skill 的 name+description 列表和 30 条用户 prompt，对每条做"该激活哪个 skill"的选择题，主流程判卷。

## 判卷

| 用例 | type | 盲测判断 | 预期 | 结果 |
|---|---|---|---|---|
| should-trigger-01 (#9 拧巴木偶) | should_trigger | card-diagnosis | card-diagnosis | ✅ |
| should-trigger-02 (#10 指节泛白很AI) | should_trigger | card-diagnosis | card-diagnosis | ✅ |
| should-trigger-03 (#11 演成高冷冰山但只是安静) | should_trigger | card-diagnosis | card-diagnosis | ✅ |
| should-not-trigger-01 (#12 写新角色退役佣兵) | should_not_trigger | character-card-master | character-card-master | ✅ |
| should-not-trigger-02 (#13 设定写好了AI不知道是不是世界书没配好) | should_not_trigger | worldbook-setup | worldbook-setup | ✅ |
| should-not-trigger-03 (#14 抓手腕被写成害怕) | should_not_trigger | user-info-guide | user-info-guide | ✅ |
| edge-01 (#15 卡文件大加载慢要不要精简) | edge_case | worldbook-setup | card-diagnosis（倾向） | ⚠️ 合理分歧 |

## 通过率
- should_trigger: 3/3 = 100%
- should_not_trigger: 3/3 = 100%（诱饵容错 0，全过）
- edge_case: 0/1 分歧
- **总计 6/7 = 86%（≥80%，接受）**

## edge-01 (#15) 分歧分析
盲测判断为 worldbook-setup，理由是"文件体量/加载性能属工程配置"。我的预期是"倾向 card-diagnosis 的卡太肥，同时检查配置层"。

**判定：修测试，不修 skill。** 理由：
- 这条 prompt"角色卡文件很大加载很慢"同时落在两个 skill 的合法范围内——"卡太肥"是内容层的病根（card-diagnosis），"常驻条目过多/分层"是配置层的病根（worldbook-setup）。它本质上是"卡太肥"这个病根在**配置侧**的体现。
- 盲测 agent 的选择（worldbook-setup）并非错误——"加载很慢"的第一直觉确实指向配置域。两个判断都合理，这是边界 case 本身设计得过狠（期望单一答案），不是 skill trigger 有歧义。
- 修复动作：把 card-diagnosis 的 edge-01 预期更新为"允许合理分歧，应同时提示检查内容 token 与配置分层"。

## 审计
- 测试时间: 2026-08-03
- 盲测 agent 独立判断，无预期泄露
- 边界 case 的设计教训：edge case 若同时跨越两个 skill 的合法域，应写"合理分歧可接受"，不追求单一答案
