# test-results — user-info-guide

## 测试方式
**独立 sub-agent 盲测**（无参与蒸馏、看不到预期答案）。盲测 agent 拿到 4 个 skill 的 name+description 列表和 30 条用户 prompt，对每条做"该激活哪个 skill"的选择题，主流程判卷。

## 判卷

| 用例 | type | 盲测判断 | 预期 | 结果 |
|---|---|---|---|---|
| should-trigger-01 (#22 揉脸颊被当欺负) | should_trigger | user-info-guide | user-info-guide | ✅ |
| should-trigger-02 (#23 抢话党AI演得不像我老提白发) | should_trigger | user-info-guide | user-info-guide | ✅ |
| should-trigger-03 (#24 沉默被当冷暴力) | should_trigger | user-info-guide | user-info-guide | ✅ |
| should-not-trigger-01 (#25 写嘴硬心软大小姐) | should_not_trigger | character-card-master | character-card-master | ✅ |
| should-not-trigger-02 (#26 AI把角色演成冰山只是安静) | should_not_trigger | card-diagnosis | card-diagnosis | ✅ |
| edge-01 (#27 AI反应不对不知是角色问题还是用户信息) | edge_case | ambiguous | ambiguous（先诊断误读对象） | ✅ |

## 通过率
- should_trigger: 3/3 = 100%
- should_not_trigger: 2/2 = 100%（诱饵容错 0，全过）
- edge_case: 1/1 = 100%（盲测正确判 ambiguous，符合"先区分误读对象"的边界理由）
- **总计 6/6 = 100%**

## 失败分析
无。特别值得注意的是跨 skill 混淆测试的区分度：#22/#24（误读用户）与 #26（误读角色）盲测正确区分，证明 description 里"误读对象是用户而非角色"的边界写得足够清楚。

## 审计
- 测试时间: 2026-08-03
- 盲测 agent 独立判断，无预期泄露
