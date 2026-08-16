# PIPELINE_STATE — airp-shengjing

- [x] 阶段 0 整书理解 → BOOK_OVERVIEW.md ✅
- [x] 阶段 1 并行提取(5 个 knot-cli glm-5.2 agent)→ candidates/ ✅ (156 单元:26 框架 + 47 原则 + 11 案例 + 33 反例 + 39 术语)
- [x] 阶段 1.5 内容筛选(进 SKILL.md / 进 references / 丢弃)→ verified.md ✅ (无整体否决,全部分配)
- [x] 阶段 1.6 跨提取器去重与互补整合 → dedup.md ✅ (20 个主题聚类 + 27 对原则↔反例配对 + 5 条案例↔反例证据链)
- [ ] 阶段 2 构造 skill → books/airp-shengjing/airp-character-biotope/(SKILL.md + references/)
- [ ] 阶段 3 术语表 → GLOSSARY.md(单 skill 无兄弟链接,阶段 3 降级)
- [ ] 阶段 4 压力测试 → test-prompts.json + evals/evals.json + test-results.md
- [ ] 阶段 5 交付 → DIGEST.md + 安装到 .claude/skills/

## 已裁决的架构决策(两轮 7 个审查 agent)

- skill 数量:1 个 `airp-character-biotope`
- 呈现框架:skill-creator 渐进式披露;RIA++ 内容实质保留、不贴模板标签
- 文件布局:SKILL.md(~350 行骨架)+ references/step-guides/{step1..step5}.md + references/principles.md + references/diagnostics.md + test-prompts.json + evals/evals.json
