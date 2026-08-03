# Counter-Examples 候选池 — 性格调色盘

> 阶段 1 产出（counter-example extractor）
> 提取范围：作者明确警告的失败模式、批评的错误做法、承认自己犯过的错、各篇"常见错误/常见问题"清单、认知偏误与心理陷阱。
> 用途：作为后续 skill 的 Boundary（边界）段核心素材——没有这些，skill 会在不该用的时候被调用。

---

- id: ce01
  title: 万能美人外貌描写
  type: counter-example
  source_chapter: 0.写正确卡（1.3 外貌，90% 的人都写错了）
  source_quote: |
    "精致的脸蛋、白皙的皮肤、桃花眼、柳叶眉、樱桃小嘴、身材匀称、气质优雅。你把名字遮住，这段描写放在谁身上都行。……那就等于什么都没写。"
  failure_mode: |
    把"美"当成外貌描写的目标，写出放谁身上都成立的通用形容。遮住名字认不出是谁，AI 也无法凭这些词记住角色。
  mechanism: |
    AI 是联想词机器，读到"精致/白皙/好看"会调用数据库里这些词最常见的搭配模板，角色被"模板化"；通用形容不产生任何辨识特征，等于用 token 复制了一份 AI 本来就会写的东西。
  warning_signs:
    - 外貌出现"精致/白皙/好看/气质优雅/美人胚子"
    - 遮住名字后看不出是谁
    - 同一段外貌能套到任意"好看的女角色"身上
  bound_to:
    - "写角色基础信息（特征差异化原则）"
  tags: [counter-example, appearance, templating, 基础信息]

- id: ce02
  title: 外貌写文学比喻/意象/感觉
  type: counter-example
  source_chapter: 0.写正确卡（1.3 反面教材）
  source_quote: |
    "朝霞橙金渐变长发，发梢在强光下泛起细微浅金光点……'晨光般暖白'——这是比喻，不是信息。……外貌只写特征，不写美感描述。不写意象，不写比喻，不写'感觉'。白描、零度、干干净净。"
  failure_mode: |
    用华丽修辞、比喻、意象、"感觉"来写外貌。AI 读了不会帮你记住角色，只会学会用同样华丽的方式描写头发/皮肤，产出大量空转的文学腔。
  mechanism: |
    比喻和意象对 AI 是"文风样本"而非"特征数据"——它模仿的是修辞，不是记住辨识点；同时这些词占用 token，稀释真正的特征信息。
  warning_signs:
    - 外貌出现"如同/像/泛起/流光/初升日轮"等修辞
    - 一句描写删掉后角色仍看不出任何差异
    - 出现"感觉/气质/富有朝气"这类无法目测的词
  bound_to:
    - "写角色基础信息（外貌特征）"
  tags: [counter-example, appearance, prose-vs-data, 基础信息]

- id: ce03
  title: 外貌里写行为习惯/性格动作
  type: counter-example
  source_chapter: 10.大总结教程（01 基础信息篇）
  source_quote: |
    "'一个总是低着头、缩着肩膀的女孩子'——这是性格描写……'低着头、缩着肩膀'描述的是她的行为习惯，属于性格范畴。……外貌只写她站在那里不动的时候，你看到的硬件。"
  failure_mode: |
    把行为习惯（总低头、缩肩膀、贴着墙根走）、性格动作写进外貌特征。外貌条目混入"这个人是什么样的"，破坏"外貌只回答长什么样"的边界。
  mechanism: |
    AI 会把行为习惯当成性格标签提前定型，且外貌条目里混入性格内容会让角色提前"被演绎"，和后面的调色盘/三面性行为描写重复、打架。
  warning_signs:
    - 外貌字段出现"总是/经常 + 行为动词"
    - 外貌字段出现"缩着肩膀/低着头/走路快"这类动态描写
  bound_to:
    - "写角色基础信息（外貌特征）"
    - "写三面性（身体行为模式）"
  tags: [counter-example, appearance, boundary-mixing, 基础信息]

- id: ce04
  title: 性格写进基础信息（提前定型）
  type: counter-example
  source_chapter: 0.写正确卡（1.1）+ 10.大总结教程（01）
  source_quote: |
    "如果你在基础信息里就写了'极度自卑、沉默寡言、极致善良'，AI 还没读到你后面精心写的调色盘和衍生，就已经对这个角色定型了。……你后面再怎么写，都是在和前面的标签打架。"
  failure_mode: |
    把"她是什么样的人"（性格标签）写进"她是谁"（身份证）。基础信息只该回答年龄/身份/外貌/背景/关系。
  mechanism: |
    AI 在读到性格条目之前就开始调用标签演绎，角色被提前定型；后面所有去标签化的内容都在跟前面标签打架，AI 输出拧巴。
  warning_signs:
    - 基本信息/外貌/背景里出现"自卑/善良/叛逆/热情"等性格词
    - 分不清"她17岁高二吉他手"（是谁）和"她热情叛逆"（是什么样）
  bound_to:
    - "写角色基础信息（结构四件套）"
  tags: [counter-example, structure, premature-typing, 基础信息]

- id: ce05
  title: 背景写事无巨细的人生年表/无关琐事
  type: counter-example
  source_chapter: 0.写正确卡（1.4 背景设定）
  source_quote: |
    "每个年龄段发生了什么（除非那件事改变了角色）；和角色当前状态无关的童年琐事；'她小时候很可爱''她学习成绩不错'这种废话。……如果你发现自己写了十几条背景但删掉任何一条角色都没变化，那这条就是废的，删。"
  failure_mode: |
    把背景写成完整人生年表，堆砌与角色当前状态无关的琐事。token 膨胀，关键事件被稀释。
  mechanism: |
    AI 无法区分哪些经历"塑造了角色"，只能全部照单收录；信息密度下降，真正驱动角色的关键事件在上下文里不再突出。
  warning_signs:
    - 背景条目删掉后角色行为无变化
    - 出现"小时候很可爱/学习成绩不错"类无因果作用的描述
  bound_to:
    - "写角色基础信息（背景只写改变人的事）"
  tags: [counter-example, background, token-waste, 基础信息]

- id: ce06
  title: 背景替 AI 下结论（写解释不写事实）
  type: counter-example
  source_chapter: 10.大总结教程（01 基础信息篇）
  source_quote: |
    "你把'这是她性格转变的起点'也写进去了……解释属于'二次解释'条目，不属于背景。背景只写事实。……写多了解释，AI 反而会偷懒——它不再自己理解角色，只是照搬你的结论。"
  failure_mode: |
    在背景里替 AI 总结因果（"这让她的性格从活泼变得文静"）。背景该只放事件，让 AI 自己看出因果链。
  mechanism: |
    作者下结论会让 AI 停止自行理解、直接照搬结论；且"为什么"的解释应放在二次解释（D0），放背景里会占用本来该给事实的 token 且位置错误。
  warning_signs:
    - 背景条目出现"这导致/这让/她是因此才……"
    - 在背景里解释动机而非陈述事件
  bound_to:
    - "写角色基础信息（背景）"
    - "写二次解释"
  tags: [counter-example, background, explanation-placement, 基础信息]

- id: ce07
  title: 关系写抽象形容而非具体画面
  type: counter-example
  source_chapter: 0.写正确卡（1.5 关系设定）
  source_quote: |
    "不要写'他们之间有着深厚的感情'，写他们具体做了什么。……'不存在"认识"这个概念，有记忆起就在一起'——这一句话比'他们从小就是最好的朋友，一起经历了很多美好的时光'强十倍。前者是具体的，后者是空的。"
  failure_mode: |
    关系设定写"他们感情深厚/她对他充满恐惧"这类总结，不写画面。
  mechanism: |
    AI 读到总结只会复述总结，读到画面才会生成画面。抽象形容不产生行为参考，角色关系无法被演出。
  warning_signs:
    - 关系条目出现"充满/深厚/亲密/恐惧"等抽象情感词而无具体互动
    - 没有"谁对谁做了什么"的动作画面
  bound_to:
    - "写角色基础信息（关系设定）"
  tags: [counter-example, relationship, abstract-vs-concrete, 基础信息]

- id: ce08
  title: 外貌写"病态雪白"这类判断词（角色被自己淹死）
  type: counter-example
  source_chapter: 10.大总结教程（01 基础信息篇）
  source_quote: |
    "你写'病态的雪白'，AI 读了会怎么做？它会在每一段描写里都提她的皮肤，'她苍白的脸''她没有血色的肤色'——你的角色会被自己的皮肤淹死。而且'病态的'是你的判断，不是特征。"
  failure_mode: |
    外貌里写带判断/形容词强调的特征（病态雪白、极其精致），或把"偏离默认值"写成反复强调的卖点。
  mechanism: |
    AI 把这类带情绪的强调词当"该反复出现的标志"，导致每次描写都提，特征本身变成噪音淹没其他内容；判断词还会诱导 AI 按该判断去渲染氛围。
  warning_signs:
    - 特征前加"病态/极其/非常"等程度判断词
    - 某单一特征被预测会反复出现在正文
  bound_to:
    - "写角色基础信息（外貌特征）"
  tags: [counter-example, appearance, over-emphasis, 基础信息]

- id: ce09
  title: 把世界观写成小说/创世史诗
  type: counter-example
  source_chapter: 0.写正确卡（2.7 常见错误·错误一）
  source_quote: |
    "'太初之际，混沌未分，天地不辨。忽有阴阳二气初生，清气上升为天……'这是小说开头，不是提示词。AI 不需要读你的创世史诗，它只需要知道'世界叫阴阳大陆，由阴阳二气化生'。"
  failure_mode: |
    用小说笔法写世界观背景，把提示词写成设定集/创世史诗。世界观是常驻提示词，每一轮都吃 token。
  mechanism: |
    AI 会把小说体当作文风样本，学到的不是设定而是叙事腔；同时大量 token 被非信息文字占据，挤占 AI 的记忆与创作力。世界观必须用数据库格式（零度白描）。
  warning_signs:
    - 世界观条目出现"太初/昔者/天地不辨"等史诗开头
    - 一句话删掉后 AI 不会演错但仍占大量字数
  bound_to:
    - "写角色基础信息（世界观）"
  tags: [counter-example, worldbuilding, prose-vs-data, 基础信息]

- id: ce10
  title: 世界观写 AI 已知的默认知识
  type: counter-example
  source_chapter: 0.写正确卡（2.7 常见错误·错误二）
  source_quote: |
    "一个现代校园卡，世界观里写了'中国有14亿人口''日本位于东亚'。AI 知道。删。一个修仙卡，写了'修仙者可以飞''龙很强大'。AI 数据库里修仙就是这样的。删。判断标准永远是：删了以后 AI 会不会演错？不会就删。"
  failure_mode: |
    在 A 类（真实背景）世界观里写 AI 训练数据里已有的常识，或在小世界里写 AI 已知套路。
  mechanism: |
    这些内容不改变 AI 的联想结果，纯占常驻 token；每轮对话都在为 AI 已经知道的东西付费。
  warning_signs:
    - 世界观包含"XX 是首都/XX 位于 XX/XX 有便利店"
    - 某条设定删掉后 AI 表现不变
  bound_to:
    - "写角色基础信息（世界观分类 A/B/C）"
  tags: [counter-example, worldbuilding, token-waste, 基础信息]

- id: ce11
  title: 以为世界观越详细越好
  type: counter-example
  source_chapter: 0.写正确卡（2.2 为什么要精简）
  source_quote: |
    "很多人觉得世界观写得越详细越好。这是错的。世界观是常驻提示词。……你写了一万 token 的世界观设定，角色在东边活动的时候，西边的三千 token 设定也在那里占位置。token 是有限的。被世界观吃掉的，就是从 AI 的记忆力和创作力里扣掉的。"
  failure_mode: |
    追求世界观的"宏大完整"，把大量常驻内容塞进上下文。
  mechanism: |
    常驻即每轮都在，写越多、AI 可用的记忆与创作空间越少；角色演不好往往是 token 预算被世界观吃光的直接结果。
  warning_signs:
    - 世界观常驻条目总量远超 1-3 条（A/B 类）
    - 出现角色当前场景用不到的设定（西边势力/其他 NPC）
  bound_to:
    - "写角色基础信息（世界观精简）"
    - "世界书配置（C 类大世界拆分）"
  tags: [counter-example, worldbuilding, token-waste, 基础信息]

- id: ce12
  title: 世界观写主观评价/比喻/废话
  type: counter-example
  source_chapter: 0.写正确卡（2.6 绝对零度——世界观的语言要求）
  source_quote: |
    "'强大的帝国'→'帝国'（或写具体军力数据）；'神秘的组织'→'组织'（神秘不是信息，是修饰）；'如同天堑的裂谷'→'宽三百丈的裂谷'。……'此地风景优美'→删掉，不是信息。"
  failure_mode: |
    世界观条目里出现形容词、评价、比喻、口号（"修仙者追求长生"）。世界观是信息密度最高的提示词，语言要求比角色基础更严格。
  mechanism: |
    评价词和比喻不给 AI 任何可执行信息，AI 只能自己脑补具体样貌（往往按刻板印象）；比喻还会诱导模仿腔调。能写数据的写数据，不能的就删。
  warning_signs:
    - 世界观出现"强大的/神秘的/宏伟的/令人畏惧的"
    - 出现比喻（"如同/仿佛"）
    - 出现 AI 本来就懂的套话（"修仙者追求长生"）
  bound_to:
    - "写角色基础信息（世界观语言）"
  tags: [counter-example, worldbuilding, prose-vs-data, 基础信息]

- id: ce13
  title: 细节泄漏到上层条目（总纲写详情）
  type: counter-example
  source_chapter: 0.写正确卡（2.7 常见错误·错误三）
  source_quote: |
    "总纲里写了某个 NPC 的详细背景。速览里展开了某个势力的内部斗争。上层只放目录，下层才放内容。……即使角色不在剑宗附近，这些信息也在常驻吃 token。"
  failure_mode: |
    C 类大世界不遵循"总纲/速览常驻、详情按需加载"的分层，把详情写进常驻层。
  mechanism: |
    详情常驻 = 角色用不到也占 token；且详情条目失去存在意义，绿灯触发机制形同虚设。
  warning_signs:
    - 总纲里出现 NPC 详细身世/势力内部结构
    - 速览条目展开到第三层细节
  bound_to:
    - "世界书配置（C 类大世界分层）"
  tags: [counter-example, worldbuilding, layer-leak, 世界书配置]

- id: ce14
  title: 绿灯关键词覆盖不全（条目永不触发）
  type: counter-example
  source_chapter: 0.写正确卡（2.7 错误四 + 3.8 关键词设计）
  source_quote: |
    "你设了一个 NPC 条目叫'林小雨'，关键词只写了'林小雨'。但聊天中大家都叫她'小雨'或者'班长'，关键词没覆盖，条目永远不会被触发。……关键词要覆盖所有可能的称呼方式。"
  failure_mode: |
    绿灯条目关键词只写全名/单一称呼，漏掉昵称、外号、职务、别称、动作相关词，导致该触发时不触发。
  mechanism: |
    绿灯靠关键词匹配触发，覆盖不全 = AI 需要该资料时读不到，开始"已读乱回"、按刻板印象演。
  warning_signs:
    - 关键词只有全名，没有昵称/外号/职务
    - 场景条目没把"喝酒"这类相关动作词加进关键词
  bound_to:
    - "世界书配置（绿灯关键词）"
  tags: [counter-example, worldbook, keyword-coverage, 世界书配置]

- id: ce15
  title: 绿灯关键词用中文逗号/空格（格式错误）
  type: counter-example
  source_chapter: 0.写正确卡（3.2 触发策略）
  source_quote: |
    "关键词的格式：必须用英文逗号隔开。不能用中文逗号，不能用空格，不能用分号。……错误：林小雨，小雨，班长（中文逗号，不触发）。这个是非常常见的错误，很多人配完发现绿灯条目死活不触发，去检查一下，十有八九是逗号用错了。"
  failure_mode: |
    用中文逗号、空格、分号分隔关键词，或逗号后带空格。绿灯条目死活不触发。
  mechanism: |
    触发系统只认英文逗号分隔的精确匹配，格式不符整个关键词失效；这是"写对了但没生效"的典型工程失败。
  warning_signs:
    - 关键词出现"，"
    - 关键词出现空格分隔（"林小雨, 小雨"）
  bound_to:
    - "世界书配置（绿灯关键词格式）"
  tags: [counter-example, worldbook, delimiter-error, 世界书配置]

- id: ce16
  title: 绿灯的遗漏触发与过度触发
  type: counter-example
  source_chapter: 0.写正确卡（3.2 绿灯的两个已知问题）
  source_quote: |
    "遗漏触发：剧情明明在写某个角色，但最近两条消息刚好没提到关键词（比如用了代称'她'而不是名字），条目就没触发……过度触发：一旦引入了某个角色，AI 每次回复都会提到这个角色的名字，关键词每轮都触发，条目一直挂着。本来想让它偶尔出现，结果它赖着不走了。"
  failure_mode: |
    把重要角色/场景的关键内容做成绿灯关键词触发——要么漏触发（用代称/绕开关键词），要么过触发（名字每轮出现导致常驻）。
  mechanism: |
    绿灯只扫最近 N 条消息且依赖关键词命中；代称会漏、常驻名字会爆。本质是"按需加载"对重要常驻内容不可靠。
  warning_signs:
    - 核心角色的完整人设用了绿灯而非蓝灯
    - 聊天常用代称/别名绕开关键词
  bound_to:
    - "世界书配置（蓝灯/绿灯策略）"
  tags: [counter-example, worldbook, trigger-failure, 世界书配置]

- id: ce17
  title: D1/D2 深度放条目（破坏聊天记录完整性）
  type: counter-example
  source_chapter: 0.写正确卡（3.3 位置）
  source_quote: |
    "D1 就是倒数第一条消息和倒数第二条消息之间。你在那个位置插一段世界观设定，AI 看来就是：对话到一半突然冒出来一大段说明书，然后对话继续了。这会严重干扰 AI 对剧情的理解。……记住：D0 可以用，D1 及以上一律不碰。"
  failure_mode: |
    把设定/指导放进 D0 以外的深度（D1/D2/D3）。经典的历史教训就是"一堆 D1 D2 深度的世界书条目"导致角色卡出问题。
  mechanism: |
    预设会把聊天记录包起来，D1 位置的内容被 AI 误读为对话历史的一部分，分不清是设定还是剧情，输出质量明显下降。
  warning_signs:
    - 条目深度被设成 D1/D2/D3
    - 位置不当的条目"对话到一半突然插入说明书"
  bound_to:
    - "世界书配置（位置：只用 before/after/D0）"
  tags: [counter-example, worldbook, position-error, 世界书配置]

- id: ce18
  title: 递归选项不勾（连锁触发 token 爆炸）
  type: counter-example
  source_chapter: 0.写正确卡（3.5 递归设置）
  source_quote: |
    "不勾的话，绿灯条目 A 的内容里如果出现了绿灯条目 B 的关键词，B 就会被连带触发。B 的内容里又出现了 C 的关键词，C 也被触发。一个接一个，像多米诺骨牌一样，最后所有绿灯条目全部触发，token 爆炸，AI 直接崩了。"
  failure_mode: |
    世界书条目不勾选"不可递归 + 防止进一步递归"，绿灯条目互相连锁触发。
  mechanism: |
    条目内容命中其他条目关键词 → 级联加载 → 全部绿灯常驻 → token 爆炸、AI 崩溃。这是纯配置项但后果是灾难性的。
  warning_signs:
    - 任意世界书条目未同时勾两个递归选项
  bound_to:
    - "世界书配置（递归设置）"
  tags: [counter-example, worldbook, recursion, 世界书配置]

- id: ce19
  title: 单角色卡条目多就改绿灯省 token
  type: counter-example
  source_chapter: 0.写正确卡（3.6 单角色卡和多角色卡）
  source_quote: |
    "他看到角色的条目拆成了五六个，觉得'哇好多啊，要不把一些改成绿灯省点 token 吧'。绝对不行。……你把性格条目改成绿灯，那么当聊天里刚好没提到触发关键词的时候，AI 就读不到性格了……这时候它只能靠猜，猜的结果就是八股。"
  failure_mode: |
    单角色卡（只有一个核心角色）把拆分条目改绿灯想省 token。判定"单角色"看的是核心角色数，不是条目数。
  mechanism: |
    同一角色的基础+性格是必须同时存在才能正确扮演的；绿灯一漏，AI 只知人名不知性格，靠猜演出八股。单角色卡全蓝灯是铁律。
  warning_signs:
    - 单角色卡出现绿灯条目
    - "条目太多想省 token"的念头
  bound_to:
    - "世界书配置（单/多角色卡策略）"
  tags: [counter-example, worldbook, single-character-card, 世界书配置]

- id: ce20
  title: EJS 被加载条目手动开启（阶段内容全混）
  type: counter-example
  source_chapter: 0.写正确卡（3.7 EJS被加载的条目）
  source_quote: |
    "如果你手动开启了，所有阶段的内容会同时出现在 AI 的上下文里——AI 同时读到'阶段1：她刚认识你''阶段3：她已经爱上你''阶段5：她准备告白'，那角色行为直接就乱了。"
  failure_mode: |
    被 EJS 控制器动态加载的条目自己开启（enabled 设为 true），多阶段内容同时进入上下文。
  mechanism: |
    AI 同时读到互斥的阶段设定，角色行为瞬间混乱——这是"工程控制权"被破坏的典型：控制器的活不该手动碰。
  warning_signs:
    - EJS 加载的条目处于 enabled 状态
    - 同一角色的多阶段条目同时出现在上下文
  bound_to:
    - "世界书配置（EJS 动态控制）"
  tags: [counter-example, worldbook, ejs-control, 世界书配置]

- id: ce21
  title: 七个性格标签堆叠（AI 轮流切换频道）
  type: counter-example
  source_chapter: 10.大总结教程（02 调色盘篇）
  source_quote: |
    "性格: ['极度自卑', '沉默寡言', '敏感胆怯', '极致善良', '坚韧执拗', '高度专注', '被动顺从']……七个标签堆在一起，AI 不会融合它们。它会轮流切换，像在换频道。这一段演'自卑'，下一段演'善良'，再下一段演'坚韧'。"
  failure_mode: |
    用一排性格标签词定义角色（七标签/十标签写法）。标签是单色的，人是混色的。
  mechanism: |
    每个标签都是独立"频道"，AI 只会按上下文轮流切换、不会融合；输出表现为一会儿木偶一会儿坚强，拧巴。
  warning_signs:
    - 性格字段是一串逗号分隔的标签词
    - 标签之间有冲突（"极度自卑"却"坚韧主动"）
  bound_to:
    - "写性格调色盘（替代标签化）"
  tags: [counter-example, tags, channel-switching, 调色盘]

- id: ce22
  title: "极度""极致"放大器（AI 拉到最极端）
  type: counter-example
  source_chapter: 10.大总结教程（02 调色盘篇）
  source_quote: |
    "'极度'这个词是 AI 最喜欢的放大器，一写上去 AI 就会把所有行为都往最极端的方向拉。……你说她'极度自卑'，但你又让她做了'不极度自卑的人才做得到的事'（成绩前列、主动求助）。AI 就会崩溃，在'极度不动'和'必须动'之间来回拉扯。"
  failure_mode: |
    在标签/特质前加"极度/极致/非常"，把角色写成一个不可能做出与标签相反行为的极端体。
  mechanism: |
    放大器让 AI 把所有行为往最极端拉，角色失去弹性；且极端标签与实际行为冲突时 AI 在"不动"与"必须动"间反复拉扯，输出拧巴。
  warning_signs:
    - 性格词前有"极度/极致/非常/无比"
    - 标签要求的极端行为和剧情需要的正常行为冲突
  bound_to:
    - "写性格调色盘（去掉放大器，写具体行为）"
  tags: [counter-example, tags, amplifier, 调色盘]

- id: ce23
  title: 让 AI 扩写衍生/人设（AI 直出）
  type: counter-example
  source_chapter: 1.入门（二、为什么选择手写而不是 ai 扩写）+ 10.大总结教程（02）
  source_quote: |
    "你告诉它'这个角色自卑'，它会给你什么衍生？'不敢看人''说话声音小''觉得自己不配'。全是数据库里'自卑'标签下最常见的关联。……这些反直觉的组合，只有你自己才能想到。AI 不会把'自卑'和'话多'联系在一起。"
  failure_mode: |
    给 AI 标签让它扩写衍生/人设，再喂回 AI 扮演。衍生全部落在数据库最常见的关联上，等于没写。
  mechanism: |
    AI 只能从已有数据库找关联，产出的是"正确但最俗套"的组合；把这些喂回扮演 = 用 AI 最常见的联想词告诉 AI 该联想什么，等于什么都没改。
  warning_signs:
    - "让 AI 帮我展开性格/衍生"的念头
    - 生成的衍生全是数据库常见关联（自卑→不敢看人）
  bound_to:
    - "写性格调色盘（衍生必须手写）"
  tags: [counter-example, ai-generation, templating, 调色盘]

- id: ce24
  title: 衍生太空泛/写总结/写鸡汤
  type: counter-example
  source_chapter: 10.大总结教程（02 调色盘篇）
  source_quote: |
    "第一条：太概括了。'努力学习成绩好'谁都能用。第二条：这是你的总结。AI 读了只知道'她不放弃'，但不知道这个'不放弃'在日常里变成了什么具体的动作。第三条：'不愿接受命运的安排'是一句鸡汤。太空了。"
  failure_mode: |
    衍生写成"她努力学习""她不会放弃""她不愿接受命运"这类概括/总结/鸡汤，没有具体场景画面。
  mechanism: |
    AI 需要"能在脑子里看到画面"的行为数据才能生成同质感内容；概括句没有可执行信息，AI 只能按俗套补全。
  warning_signs:
    - 衍生读不出具体动作/场景
    - 衍生是"她很 XX/她不会 XX"的结论句
  bound_to:
    - "写性格调色盘（衍生 = 具体行为画面）"
  tags: [counter-example, derivative, abstract, 调色盘]

- id: ce25
  title: AI 扩写/润色给角色加上 AI 的缺点
  type: counter-example
  source_chapter: 1.入门（二、为什么手写人设优于 AI 扩写）
  source_quote: |
    "ai 输出就意味它帮你把一些内容改成它资料库里认为'正确'的内容、词语、句子排序、性格展示等等，我们在想法设法的摆脱 ai 的缺点，你让 ai 输出角色这不就是本末倒置，把你的内容加上 Ai 缺点了？"
  failure_mode: |
    用 AI 润色/扩写/直出手写内容（第 2、3 类作者），让 AI 参与创作实质内容。
  mechanism: |
    AI 输出必然带上其数据库里"正确"的措辞与性格展示，等于给角色打上 AI 的通病（八股、同质化）；且第 3 类（AI 直出）在扮演中劣化最严重。
  warning_signs:
    - "让 AI 帮我润色/扩写这段人设"
    - 内容里出现 AI 常用句式与转折
  bound_to:
    - "写卡大师（纯手写原则）"
    - "改卡诊断（AI 味过重）"
  tags: [counter-example, ai-generation, principle, 调色盘]

- id: ce26
  title: 万字级世界书/角色卡（秋青子 5w token 的教训）
  type: counter-example
  source_chapter: 1.入门（二）
  source_quote: |
    "token 量太大了，你几乎需要用大量的内容才能完成。例子自然是我曾经的几个卡，特别是'秋青子'那张卡，一个角色有 5wtoken，以至于 3.0pro 直接无法游玩。"
  failure_mode: |
    作者本人承认的错误：堆大量设定条目（演绎指导/优缺点/语料/背景/采访全塞）把单角色卡撑到几万 token。
  mechanism: |
    大量"让 AI 学习参考"的条目互相稀释、常驻吃 token，模型直接无法游玩。作者由此转向"衍生压缩包"——用 3000 token 超越 4w token 的效果。
  warning_signs:
    - 单角色卡 token 量达到数万
    - 用大量独立条目代替"衍生"表达性格
  bound_to:
    - "写卡大师（衍生压缩 token）"
    - "改卡诊断（卡太肥跑不动）"
  tags: [counter-example, token-budget, author-mistake, 调色盘]

- id: ce27
  title: 性格对冲/演绎指导限制手写卡（旧方案副作用）
  type: counter-example
  source_chapter: 1.入门（一、性格对冲思路）
  source_quote: |
    "我最开始处理的方式是来自咚咚的'演绎指导'，也就是把这份指导放在 d0 1，但是结果就是，角色失去了'变化'，哪怕结婚了，角色还是会按照演绎指导进行演绎。"
  failure_mode: |
    用"演绎指导"类固定条目标签化限制角色，或对手写完善的卡叠加"性格锚点/对冲"。
  mechanism: |
    演绎指导是"AI 觉得角色该这么演"，会锁死角色变化（结婚了还按指导演）；性格锚点对已去标签化的手写卡反而成 debuff，限制角色。方案要按卡的状态选择。
  warning_signs:
    - 用演绎指导类条目定义角色"应该怎么演"
    - 对已经手写去标签化的卡叠加对冲限制
  bound_to:
    - "改卡诊断（角色失去变化/被锁死）"
  tags: [counter-example, old-solution, over-constraint, 改卡诊断]

- id: ce28
  title: NSFW 教"做什么"不教"为什么做"（性爱机器）
  type: counter-example
  source_chapter: 1.入门（七、NSFW 调色盘教程）
  source_quote: |
    "性癖：喜欢骑乘位、喜欢被咬……这种写法的问题在于：它在教 AI'做什么'，而不是'为什么做'。AI 读到这些，会机械地执行：到了骑乘位就写骑乘位，到了高潮就写夹紧颤抖。像一台按照程序运行的机器。"
  failure_mode: |
    亲密/动作描写只列清单（敏感部位、性癖、高潮表现），不写背后的动机。
  mechanism: |
    描述动作 = AI 机械执行动作清单；描述动机（"她需要控制节奏才有安全感"）才能让 AI 在任何情境下自然衍生出该特质。这和性格调色盘同理。
  warning_signs:
    - 出现"敏感部位/性癖/高潮表现/事后"清单式字段
    - 条目只描述"做什么"没有"为什么做"
  bound_to:
    - "写卡大师（NSFW 调色盘）"
  tags: [counter-example, nsfw, why-not-what, 调色盘]

- id: ce29
  title: 把三面性当成三种性格/贴三个标签
  type: counter-example
  source_chapter: 2.进阶（一、什么是三面性 + 三、强行写三面性的危害）
  source_quote: |
    "很多人一听'三面性'就以为是给角色贴三个标签——'在 A 面前温柔，在 B 面前冷酷，在 C 面前活泼'。这是错的。……给不需要三面性的角色硬拆面，会造成一个问题：AI 会把原本连贯的角色强行切成几块来演。……像在换频道。"
  failure_mode: |
    把三面性写成"三张标签/三种性格"，或给行为差异不大（找不出两个以上压力性质截然不同场景）的角色硬拆面。
  mechanism: |
    三面性是同一台发动机在不同压力下的生存策略切换，不是换人；硬拆让 AI 在模式间生硬切换，角色拧巴割裂。
  warning_signs:
    - "三面性 = 三张标签"的理解
    - 找不到两种以上压力性质截然不同的场景仍拆面
    - 面与面之间的差异只是"稍微放松/语气变了"
  bound_to:
    - "写卡大师（三面性判断标准）"
  tags: [counter-example, tri-facets, forced-split, 三面性]

- id: ce30
  title: 把二次解释写进三面性（写"为什么"）
  type: counter-example
  source_chapter: 2.进阶（十、常见错误·错误一）
  source_quote: |
    "错误写法，三面性里写：'第一面：学校。秋明月在学校装乖，因为家庭压力，她内心其实很矛盾……'这是二次解释的内容。你在解释'为什么'。……简单判断法：如果你写的内容里出现了'因为''本质上''其实''内心'这些词，大概率你在写二次解释，不是三面性。"
  failure_mode: |
    在三面性的"面"里写动机/内心/原因（因为/本质上/其实/内心）。三面性只写"怎么运作"，不写"为什么"。
  mechanism: |
    "为什么"是二次解释的活；混进三面性会让面的定义被心理分析稀释，AI 抓不住"触发→语料→行为"的运行表。
  warning_signs:
    - 面内出现"因为/本质上/其实/内心"
    - 面内出现大段心理解读而非触发条件+语料+行为
  bound_to:
    - "写卡大师（三面性五部件）"
    - "写二次解释（承接为什么）"
  tags: [counter-example, tri-facets, why-where, 三面性]

- id: ce31
  title: 把三面性写成调色盘/语料放错位置
  type: counter-example
  source_chapter: 2.进阶（十、常见错误·错误二/错误三）
  source_quote: |
    "错误写法，三面性里写：'第二面：舞台上。秋明月对摇滚充满热情，是一个不受束缚的灵魂。'这是调色盘的衍生。……有三面性的角色，语料从调色盘里剔除，放到三面性的每一张面里。如果这三种语料混在调色盘里，AI 分不清什么时候该用哪套。"
  failure_mode: |
    三面性的面里写性格定义（重复调色盘），或把具体台词语料留在调色盘衍生里。
  mechanism: |
    面应只写调色盘没有的东西（触发/语料/身体动作）；语料混在调色盘里，AI 分不清场景该用哪套台词（学校说脏话/舞台说官话）。
  warning_signs:
    - 面内内容删掉后调色盘仍完整包含
    - 调色盘衍生里附带具体台词（"不爽时骂'操你妈'"）
  bound_to:
    - "写卡大师（语料分流）"
  tags: [counter-example, tri-facets, line-placement, 三面性]

- id: ce32
  title: 混色里解释情绪（一解释就变八股指令）
  type: counter-example
  source_chapter: 4.调色盘进阶（四/五）+ 10.大总结教程（04）
  source_quote: |
    "错误示范：'她笑了，但笑容里同时带着温柔和心酸，因为她知道时间不多了。'这是在告诉 AI'请表演温柔和心酸的混合'。AI 会照做，但做出来是假的。……混色不能解释。一旦你解释，AI 就会把这当成一个标签去执行。"
  failure_mode: |
    混色画面里点名情绪（"她同时感到害怕和温柔"），或加"因为/本质上/其实"。
  mechanism: |
    解释 = 给 AI 一个"表演复杂情绪"的指令，AI 不知道复杂情绪长什么样，只会把两个标签硬拼，输出拧巴；不解释只写动作，AI 只需"重现画面"。
  warning_signs:
    - 画面里出现情绪名词（心酸/温柔/复杂情感）
    - 画面里出现"因为"解释动机
  bound_to:
    - "写卡大师（混色：只写动作）"
  tags: [counter-example, mixing, explanation, 混色]

- id: ce33
  title: 每个画面都混色（情绪不稳定/失去反差）
  type: counter-example
  source_chapter: 4.混色（五、常见错误·错误二）+ 10.大总结教程（04）
  source_quote: |
    "不是每个瞬间都需要多种颜色在跑。如果你的角色每一秒都在体验复杂情绪，AI 会读成'她情绪不稳定'或者'她随时要崩溃'。……混色的画面是点睛之笔，不是底色。如果到处都是混色，那就没有混色了，因为没有反差。"
  failure_mode: |
    滥用混色，把每个瞬间都写成多情绪碰撞。
  mechanism: |
    处处混色 = 处处无反差，AI 把角色读成情绪不稳定/随时崩溃；单一时刻的清晰反而让混色瞬间有张力。
  warning_signs:
    - 角色每段描写都塞两种以上情绪
    - 找不到"只有一种颜色"的日常时刻
  bound_to:
    - "写卡大师（混色是点睛之笔）"
  tags: [counter-example, mixing, over-use, 混色]

- id: ce34
  title: 混色写成情绪罗列
  type: counter-example
  source_chapter: 4.混色（五、常见错误·错误三）+ 10.大总结教程（04）
  source_quote: |
    "错误写法：'她同时感到开心、难过、疲惫、恐惧和感恩。'这不是混色，这是清单。AI 读了以后不知道先演哪个。……你不需要列出所有颜色，你只需要写一个足够好的画面，颜色自己会跑出来。"
  failure_mode: |
    把混色写成"她同时感到 A/B/C/D/E"的情绪清单。
  mechanism: |
    清单是"五种情绪并列"，AI 没有执行优先级；而一个具体画面（"她笑着，笑完眼角湿了，没擦"）颜色自己跑出来，AI 知道怎么演。
  warning_signs:
    - "同时感到 X、Y、Z"句式
    - 画面里情绪名词超过两个而无动作支撑
  bound_to:
    - "写卡大师（混色画面）"
  tags: [counter-example, mixing, emotion-list, 混色]

- id: ce35
  title: 用转折句/破折号做混色（八股句式）
  type: counter-example
  source_chapter: 4.混色（五、常见错误·错误四）+ 10.大总结教程（04）
  source_quote: |
    "错误写法：'她笑了——但那个笑里藏着说不出的苦涩。'这是在用文学手法强行告诉读者'注意这里有反差'。AI 读了以后会模仿这种'——但'的句式，出来的效果是八股味的。"
  failure_mode: |
    用"她笑了，但……""——但……""然而"标记混色。
  mechanism: |
    转折标记是在"告诉"读者这里有两层，AI 学会的只是这个句式（八股腔），而不是混色本身；两个物理事实摆在一起才是混色。
  warning_signs:
    - "笑了，但/——但/然而"句式
    - 需要"注意这里有反差"的提示才能传达两层
  bound_to:
    - "写卡大师（混色：物理事实反差）"
  tags: [counter-example, mixing, cliche-syntax, 混色]

- id: ce36
  title: 核心人格层写成心理词清单（防御机制太空）
  type: counter-example
  source_chapter: 7.再次进阶（十五、常见错误·错误一）+ 10.大总结教程（05）
  source_quote: |
    "错误写法：核心恐惧: 被抛弃。防御机制: 逃避。……这不是不能用，但太空。AI 只能得到三个标签。……正确写法：'她一旦发现自己开始期待 {{user}} 的回复，就会故意隔更久才回，像是在证明自己没有那么需要对方。'这才叫防御机制。"
  failure_mode: |
    核心人格层七件套写成单词语清单（被抛弃/逃避/想爱不敢爱），防御机制没有落到具体行为。
  mechanism: |
    单词标签对 AI 无执行信息，AI 只能按俗套补全；防御机制必须"能演"——落到具体行为（故意隔久回消息）才算被 AI 使用。
  warning_signs:
    - 防御机制是"逃避/控制/冷处理"这类单词
    - 核心恐惧是"被抛弃"这类无场景标签
  bound_to:
    - "写卡大师（核心人格层：写到行为）"
  tags: [counter-example, core-persona, word-list, 核心人格层]

- id: ce37
  title: 日常也触发核心恐惧（AI 乱开高潮戏）
  type: counter-example
  source_chapter: 7.再次进阶（十五、常见错误·错误二）+ 10.大总结教程（05）
  source_quote: |
    "核心恐惧不是每次都要爆。{{user}} 晚回一句消息，不等于角色立刻崩溃。……日常里可以泄漏一点……但不要每次都进入高潮戏。核心人格层是底层逻辑，不是天天按下去的核按钮。"
  failure_mode: |
    把核心恐惧写成"每轮都要爆"的触发点，导致 AI 在普通互动里乱开高潮戏。
  mechanism: |
    核心人格层是底层逻辑，应只泄漏一点（多看一眼手机、删掉打好的字）；每次触发全量输出会让日常戏变得虚假、戏剧化。
  warning_signs:
    - 一条日常互动就被写成角色崩溃/大哭/大发雷霆
    - 核心恐惧在每轮都被全量触发
  bound_to:
    - "写卡大师（核心人格层：低频触发）"
    - "改卡诊断（AI 乱开高潮戏）"
  tags: [counter-example, core-persona, over-trigger, 核心人格层]

- id: ce38
  title: 自我认知写成固定结局（AIRP 不是剧本）
  type: counter-example
  source_chapter: 7.再次进阶（十五、错误三）+ 10.大总结教程（05）
  source_quote: |
    "不要写：'最终她会学会爱自己，并和 {{user}} 幸福生活。'这是剧本。AIRP 不是剧本。更好的写法：'她可能意识到……'注意可能。角色可以完成弧光，也可以失败。"
  failure_mode: |
    把"自我认知可能性"写成确定结局（"最终她一定会成长/学会信任"）。
  mechanism: |
    写死结局 = 锁死剧情走向，角色失去"活"的可能；写"可能"给 AI 方向不锁结局，成长/失败/反复都成立，才像人。
  warning_signs:
    - 自我认知条目以"最终/一定会"开头
    - 自我认知写了完整剧情结局
  bound_to:
    - "写卡大师（核心人格层：可能性）"
  tags: [counter-example, core-persona, fixed-ending, 核心人格层]

- id: ce39
  title: 为了高级硬加创伤
  type: counter-example
  source_chapter: 7.再次进阶（十五、错误四）+ 10.大总结教程（05）
  source_quote: |
    "不是所有核心人格层都必须来自极端创伤。……有些人的核心恐惧来自长期被忽视、来自一直被比较、来自每次表达需求都会被说'你怎么这么麻烦'。不需要每个人都童年惨案。写得准比写得惨重要。"
  failure_mode: |
    为让角色"有深度"硬编童年惨案/极端创伤。
  mechanism: |
    创伤不是目的；日常积累（被忽视/被比较/需求总被拒）也能长成真实的核心恐惧，硬加惨案反而失真、写不准。
  warning_signs:
    - 角色背景凭空加"童年被虐待/被抛弃"
    - 核心恐惧无法从已有经历里长出来
  bound_to:
    - "写卡大师（核心人格层：从原人设长出来）"
  tags: [counter-example, core-persona, forced-trauma, 核心人格层]

- id: ce40
  title: 核心矛盾只围着 user 转
  type: counter-example
  source_chapter: 7.再次进阶（十五、错误五）+ 10.大总结教程（05）
  source_quote: |
    "角色可以爱 {{user}}，但她的人格不能只为 {{user}} 存在。……她本来就害怕依赖，{{user}} 只是第一个让她不得不面对这件事的人。否则就变成'为了和 user 恋爱而临时长出来的矛盾'。"
  failure_mode: |
    核心矛盾写成"因为爱上 user 才产生的矛盾"，人格没有独立性。
  mechanism: |
    人格只围着 user 长 → 角色是"恋爱挂件"，离开 user 就不成立；人格应有自己的前史（本来就怕依赖），user 只是触发者。
  warning_signs:
    - 核心矛盾离开 {{user}} 就不成立
    - 角色人格是为了这段恋爱"临时长出来"的
  bound_to:
    - "写卡大师（核心人格层独立性）"
    - "改卡诊断（角色像挂件）"
  tags: [counter-example, core-persona, user-centered, 核心人格层]

- id: ce41
  title: 靠外部事件制造冲突（AI 阴谋化）
  type: counter-example
  source_chapter: 7.再次进阶（十四、核心人格层怎么避免 AI 阴谋化）
  source_quote: |
    "AI 很喜欢制造冲突，但它制造冲突的方式经常很偷懒。第三者。误会。阴谋。突然绑架。突然黑化。……如果每次冲突都靠外部事件，角色本身就空了。真正的冲突可以是：他明明想靠近，却只能用命令表达。"
  failure_mode: |
    角色卡只写"这个人对 user 的反应"，AI 只能靠第三者/阴谋/误会/绑架制造冲突。
  mechanism: |
    没有决策层时 AI 没有内部冲突可用，只能外挂戏剧事件；核心人格层把冲突放回角色内部，AI 才能演"明明想靠近却用命令表达"这类不靠阴谋的张力和不 OOC 的冲突。
  warning_signs:
    - 剧情冲突必须靠第三者/绑架/误会才能推进
    - 角色一旦脱离外部事件就没有戏
  bound_to:
    - "写卡大师（核心人格层让角色有叙事主动权）"
  tags: [counter-example, core-persona, ai-conspiracy, 核心人格层]

- id: ce42
  title: 台词人设的第三人称解释替角色下结论
  type: counter-example
  source_chapter: 3.废除（四、第三人称解释到底在干什么）
  source_quote: |
    "错误写法：'她说这句话的时候其实很开心，因为她一直喜欢 {{user}}。'这是代入了。你钻到她脑子里去了。你替她定了结论——她开心，她喜欢。……正确写法：'这句话的语速比她平时快了一点，"讨厌"这个词的咬字不够干净。是否真的讨厌，存疑。'"
  failure_mode: |
    台词人设的第三人称解释写成"她其实 XX 因为她 XX"，替角色下结论（"她开心/她喜欢"）。
  mechanism: |
    你只是"观察者不是扮演者"；替她下结论 = 又一次给 AI 标签。正确做法是描述观察到的现象 + 存疑，让 AI 从模式里长新台词而非照搬结论。
  warning_signs:
    - 解释里出现"其实/因为 + 角色内心"
    - 解释下了单一确定结论（没有存疑）
  bound_to:
    - "写卡大师（台词人设：第三人称观察）"
  tags: [counter-example, line-first, conclusion, 台词人设]

- id: ce43
  title: 台词人设按场景分类（等于贴标签）
  type: counter-example
  source_chapter: 3.废除（六、怎么写台词人设）
  source_quote: |
    "不要写'对外人的台词''对 {{user}} 日常的台词''伪装过的关心''脆弱的时刻'。一旦你分了类，你就在告诉 AI'她在这种场景下应该这样说话'。这和写标签有什么区别？……分类是你替 AI 做了思考。不分类是让 AI 自己思考。"
  failure_mode: |
    台词人设把台词按场景/对象分类存放（对外人/对 user/崩溃时）。
  mechanism: |
    分类 = 替 AI 决定"这场景该这么说话"，和贴标签等价；不分类混在一起，AI 自己从用词、句长、语气里提取说话模式，提取得更深。
  warning_signs:
    - 台词条目带"对 XX 时/崩溃时/日常"分类标题
  bound_to:
    - "写卡大师（台词人设：不分类、覆盖广）"
  tags: [counter-example, line-first, classification, 台词人设]

- id: ce44
  title: 台词人设量太少（AI 回落自己资料库）
  type: counter-example
  source_chapter: 3.废除（六、七）
  source_quote: |
    "四百句是一个经验值。不是必须四百句，但量太少 AI 会回落到自己的资料库。量够了，AI 才会老老实实按你的模式走。……长对话推进之后，早期的台词样本会被挤出上下文窗口，角色可能会逐渐回落到 AI 自己的说话模板。"
  failure_mode: |
    台词人设样本量不足，或长对话后早期样本被挤出上下文窗口。
  mechanism: |
    台词人设靠大量样本让 AI 学"说话模式"；量少 AI 学不到就回落数据库模板；长对话后早期样本被挤出窗口，角色逐渐"AI 化"。
  warning_signs:
    - 台词人设只有几十句
    - 长对话后角色台词开始变得"标准/正确但没人味"
  bound_to:
    - "写卡大师（台词人设：量 + 核心样本放前面）"
  tags: [counter-example, line-first, sample-size, 台词人设]

- id: ce45
  title: 用户输入被 AI 刻板印象补全（误读成最戏剧化解读）
  type: counter-example
  source_chapter: 9.用户信息（二、没有用户信息会怎样）
  source_quote: |
    "你输入：我抓住了她的手腕。你想的：着急，怕她走，想留住她。AI 理解：控制，强迫，压制。……每一次 AI 都在往最刺激的方向补全。因为 AI 的资料库里，'抓手腕'出现最多的场景就是强制和冲突。"
  failure_mode: |
    不写用户信息，AI 对用户输入做"行为归因"时只用资料库最常见/最戏剧化的解读。
  mechanism: |
    AI 先给用户动作归因再写角色反应；没有用户信息时归因来源只有资料库，而资料库最常见的解读往往是冲突化/戏剧化的（抓手腕→控制、沉默→冷暴力、命令→支配）。
  warning_signs:
    - 用户做普通动作，角色反应却往强迫/恐惧/主仆方向跑
    - "我沉默"被角色读成生气冷暴力
  bound_to:
    - "用户信息（行为翻译手册）"
  tags: [counter-example, user-info, misattribution, 用户信息]

- id: ce46
  title: 用户信息写成小说人设（不是提示词）
  type: counter-example
  source_chapter: 9.用户信息（八、常见错误·错误一）
  source_quote: |
    "他是一个外表冷漠内心温柔的少年，有着不为人知的过去，在月光下他的眼神总是带着一丝忧郁……这是小说，不是提示词。AI 读了只会学会用同样华丽的方式描写你，不会因此更理解你的行为。用户信息要干。像说明书一样干。"
  failure_mode: |
    用户信息写成文学人设/小说描写。
  mechanism: |
    用户信息是"校准 AI 对用户行为的理解"，本质是说明书；写成小说 AI 只会模仿文风，无法用于行为归因。
  warning_signs:
    - 用户信息出现"外表冷漠内心温柔/月光下眼神忧郁"
    - 用户信息读起来像作品而非说明
  bound_to:
    - "用户信息（说明书式写法）"
  tags: [counter-example, user-info, prose-not-prompt, 用户信息]

- id: ce47
  title: 不抢话党写了调色盘（AI 拿标签预判你）
  type: counter-example
  source_chapter: 9.用户信息（五、不抢话党的用户信息怎么写）
  source_quote: |
    "不抢话党不需要 AI 演你。你自己会写自己的行为。如果你写了调色盘，AI 反而会出问题。它会拿你的调色盘去预判你的行为……你输入了一句很热情的话。AI 会困惑：他不是沉默的吗？这句话不像他。"
  failure_mode: |
    不抢话党（只写自己行为等 AI 回应）在用户信息里写了调色盘/性格定义。
  mechanism: |
    调色盘是给 AI 演的；不抢话党 AI 不演你，写了性格标签 AI 就拿标签预判你的每句话，出现"他不该这么说"的错愕反应。
  warning_signs:
    - 不抢话党的用户信息里出现底色/主色调/衍生
    - AI 对用户的热情/反常行为表示困惑
  bound_to:
    - "用户信息（按玩法选写法）"
  tags: [counter-example, user-info, palette-misuse, 用户信息]

- id: ce48
  title: 抢话党没写禁止部分（特征被反复提起）
  type: counter-example
  source_chapter: 9.用户信息（八、常见错误·错误三 + 四、禁止部分）
  source_quote: |
    "你写了'白发'，AI 就会在每段描写里都提你的白发。'白发少年微微一笑''他用修长的手指拨开额前的白发''月光下白发如银'——你会被自己的头发淹死。……特征后面必须跟禁止说明。告诉 AI 什么时候可以提，什么时候别提。"
  failure_mode: |
    抢话党用户信息写特化特征（白发/一米八五/低沉声音）却没跟"禁止频繁描写"说明。
  mechanism: |
    AI 扮演用户时会把独特特征当卖点每轮强调，正文被特征淹没；禁止部分（"仅初次见面时提""只在物理接触时体现"）是必要的护栏。
  warning_signs:
    - 用户特征没有附带禁止说明
    - AI 在每段正文都强调身高差/白发/声音
  bound_to:
    - "用户信息（抢话党禁止部分）"
  tags: [counter-example, user-info, no-ban-list, 用户信息]

- id: ce49
  title: 用户信息写太多"我不是什么"（越说越往那想）
  type: counter-example
  source_chapter: 9.用户信息（八、常见错误·错误四）
  source_quote: |
    "这种写法有一个致命问题：AI 读到'不是冷漠'，它脑子里第一个蹦出来的词就是冷漠。你越说不是什么，AI 越会往那个方向想。……不要告诉 AI 你不是什么。告诉它你是什么。"
  failure_mode: |
    用户信息用否定式定义（"我不是冷漠的人/不是控制欲强的人"）。
  mechanism: |
    AI 联想词机制：读到"不是冷漠"，先激活的是"冷漠"；否定式描述反而强化 AI 往该方向联想。应直接写"我表达关心的方式是行动而非语言"。
  warning_signs:
    - 用户信息出现"不是/不会 + 负面标签"
    - 写了"我不是冷暴力"这类否定句
  bound_to:
    - "用户信息（直接叙述是什么）"
  tags: [counter-example, user-info, negation, 用户信息]

- id: ce50
  title: 用户信息写得比角色卡还长（抢走注意力）
  type: counter-example
  source_chapter: 9.用户信息（八、常见错误·错误五）
  source_quote: |
    "用户信息不是主角。角色才是主角。用户信息的 token 量应该控制在角色卡的四分之一以下。写多了，AI 的注意力会被你的用户信息抢走，反而影响角色的表现。"
  failure_mode: |
    用户信息篇幅过大，超过角色卡四分之一。
  mechanism: |
    上下文注意力有限，用户信息越长越抢戏，角色表现被稀释；用户信息只写"最常被误读的行为"，够用就行。
  warning_signs:
    - 用户信息比角色卡还长
    - 用户信息包含大量非行为翻译的细节
  bound_to:
    - "用户信息（token 预算）"
  tags: [counter-example, user-info, token-budget, 用户信息]

- id: ce51
  title: 二次解释写"不是……"（反向触发）
  type: counter-example
  source_chapter: 9.用户信息（错误四）+ BOOK_OVERVIEW 核心命题 13 + 10.大总结教程（06）
  source_quote: |
    "写法上有一个核心原则：直接叙述你想要的样子。不要先列举错误然后否定它。直接说'她是这样的'。……'不是冷漠'，AI 脑子里第一个蹦出来的词就是冷漠。你越说不是什么，AI 越会往那个方向想。"
  failure_mode: |
    二次解释/防误读条目写成"她不是冷漠的""不要把她写成傲娇"等否定句式。
  mechanism: |
    AI 联想词机制下，否定式会激活被否定的词本身（"不是冷漠"→先想到冷漠）；应直接叙述想要的样子（"她的安静是选择，里面有东西在跑"）。
  warning_signs:
    - 二次解释条目以"不是/不要/千万别"开头
    - 防误读写在"否定 AI 错误"而非"叙述正确"上
  bound_to:
    - "写二次解释（直接叙述你想要的样子）"
  tags: [counter-example, second-explanation, negation, 二次解释]

- id: ce52
  title: 二次解释缺失（AI 把安静读成冷漠/不接受帮助读成傲娇）
  type: counter-example
  source_chapter: 10.大总结教程（06 二次解释篇）+ 2.进阶（九、三者的边界）
  source_quote: |
    "你写了'她安静'，AI 可能理解成'她冷漠'。你写了'她不接受帮助'，AI 可能理解成'她傲娇'。……'安静的女孩不接受帮助'这个组合在数据库里最常见的匹配结果是什么？……傲娇？冰山？高冷女神？"
  failure_mode: |
    角色有反直觉组合/易被模板化特质（安静、拒绝帮助、口是心非）时没写二次解释，AI 按数据库默认模板补全。
  mechanism: |
    AI 把描述匹配到数据库最常见模式（安静→冰山，拒绝帮助→傲娇）；二次解释是"反向护栏"，直接告诉 AI"我的角色是这个意思，别按你的模板脑补"。
  warning_signs:
    - 角色行为被 AI 套进"傲娇/冰山/热血漫主角"模板
    - 角色有反直觉组合且无防误读条目
  bound_to:
    - "写二次解释（防 AI 补全）"
  tags: [counter-example, second-explanation, ai-misread, 二次解释]

- id: ce53
  title: 二次解释里先列举错误再否定
  type: counter-example
  source_chapter: 10.大总结教程（06 二次解释篇·二）
  source_quote: |
    "写法上有一个核心原则：直接叙述你想要的样子。不要先列举错误然后否定它。直接说'她是这样的'。"
  failure_mode: |
    二次解释写成"AI 会写成 A/B/C，但我的角色不是"的列举-否定结构，堆满错误样本。
  mechanism: |
    先列举 AI 的错误会把这些错误写法喂进上下文（增加被模仿概率），且浪费时间；应直接写正确样貌，让 AI 记住该怎样而非不该怎样。
  warning_signs:
    - 二次解释先写"AI 可能会写成……"
    - 条目里错误示范的篇幅超过正确叙述
  bound_to:
    - "写二次解释（直接叙述）"
  tags: [counter-example, second-explanation, structure, 二次解释]

- id: ce54
  title: 开场白没有引子/目标（玩家不知所措）
  type: counter-example
  source_chapter: 5.如何为角色卡写出一个合适的开场白？（2.1）
  source_quote: |
    "如果开场白十分简单，没有制造任何矛盾，没有创造任何目标让角色去行动。那么这样一个角色卡，玩家拿到手上会不知所措，不知道该玩什么。……目标很简单也无所谓，但不能没有。"
  failure_mode: |
    开场白只有静态介绍，没有引子/矛盾/行动目标。
  mechanism: |
    没有目标 = 玩家不知道"我要玩什么"，开不了局；开场白首要功能是给 user 一个行动目标（哪怕是"去操谁"这样简单的引子）。
  warning_signs:
    - 开场白读完不知道"接下来该做什么"
    - 开场白没有任何事件/矛盾/可行动对象
  bound_to:
    - "开场白（给 user 行动目标）"
  tags: [counter-example, opening, no-hook, 开场白]

- id: ce55
  title: 开场白含八股句式（提前种下文风劣化种子）
  type: counter-example
  source_chapter: 5.如何为角色卡写出一个合适的开场白？（2.2）
  source_quote: |
    "如果开场白主动规避 llm 爱用的八股句式，后续生成时会很大程度延缓文风劣化的速度。反过来说，如果开场白就包含大量的投石，指节泛白。玩的时候就会很容易出现这些八股。"
  failure_mode: |
    开场白大量使用 AI 八股（投石、指节泛白、喉结滚动类句式）。
  mechanism: |
    开场白是首楼，所有模型都吃首楼文风；首楼含八股 = 直接给 AI 提供八股样本，后续生成快速劣化。
  warning_signs:
    - 开场白出现"指节泛白/投石/眸色一暗"类常见 AI 句式
    - 开场白读起来"很 AI"
  bound_to:
    - "开场白（固定文风、规避八股）"
  tags: [counter-example, opening, cliche-syntax, 开场白]

- id: ce56
  title: 大纲开场白无法固定文风
  type: counter-example
  source_chapter: 5.如何为角色卡写出一个合适的开场白？（3.3）
  source_quote: |
    "大纲开场白：不提供具体文本，而是提供一份情节大纲。纯主观看法。这种写法我本人不太喜欢。他起不到固定文风的作用。Gemini 这样的语料多的模型 roll 开场白还不错。Claude 的语料比较少，让他自己发挥写的很糟糕。"
  failure_mode: |
    用纯大纲式开场白（不给具体文本），期望 AI 自己展开。
  mechanism: |
    大纲不提供文风样本，起不到固定文风/延缓劣化的作用；对语料较少的模型（Claude）产出尤其糟糕。
  warning_signs:
    - 开场白只给"接下来发生 XX"的提纲
    - 需要开场白承担固定文风功能却没给文本
  bound_to:
    - "开场白（三种写法选择）"
  tags: [counter-example, opening, outline-only, 开场白]

- id: ce57
  title: 小传/画面用解释性写法（给 AI 三个标签）
  type: counter-example
  source_chapter: 11.另一种写法（第三章 小传）
  source_quote: |
    "解释性写法（错误）：'线下有人夸她"你真乖"。她表面笑了但内心很不舒服，因为这个词让她想起小时候被父母规训的记忆……'AI 读到这段会怎么做？它拿到了三个标签：'内心不舒服''伪装''掩饰'。然后它用数据库里最常见的方式去演这三个标签。"
  failure_mode: |
    小传/画面里写"她觉得/她心想/因为/其实"，用解释替代画面。
  mechanism: |
    解释句 = 给 AI 标签（伪装/掩饰/不舒服），AI 按俗套演标签；录像带写法只写五感画面（笑的弧度、绞衣角的手），AI 没有现成模板可套，被迫理解画面并同质感生成。
  warning_signs:
    - 小传出现"她觉得/因为/其实/内心"
    - 删掉解释句后面面就不完整
  bound_to:
    - "写卡大师（小传 = 录像带）"
  tags: [counter-example, mini-bio, explanation, 写卡大师]

- id: ce58
  title: 情绪阈值写成"情绪的样子"（等于没写）
  type: counter-example
  source_chapter: 11.另一种写法（第五章 喜怒哀乐衰）
  source_quote: |
    "大多数人写情绪的方式是这样的：开心的时候：她会微笑，眼睛弯成月牙。难过的时候：她会流泪，声音颤抖。这种写法的问题和写'性格：温柔'一样。AI 数据库里'开心'后面跟的就是'微笑''眼睛弯'，你写了等于没写。"
  failure_mode: |
    情绪表写"情绪长什么样"（开心→微笑月牙眼），而不是"情绪的阈值"（什么触发/怎么变化/怎么结束）。
  mechanism: |
    写"样子" = 重复数据库默认联想，无新信息；写"阈值"（触发条件/变化轨迹/结束方式）才让 AI 知道这个角色不会随便大喜大悲、有自己的曲线。
  warning_signs:
    - 情绪条目是"开心时她微笑，难过时她流泪"这类样子描写
    - 没有触发/过程/结束三段结构
  bound_to:
    - "写卡大师（情绪阈值表）"
  tags: [counter-example, emotion, threshold, 写卡大师]

- id: ce59
  title: 意象从外面套比喻（不解释自己/要短）
  type: counter-example
  source_chapter: 10.大总结教程（07 意象篇）+ 11.另一种写法（第六章 意象）
  source_quote: |
    "不要去网上搜'好看的比喻'然后往角色身上套。意象要从你对角色的理解里自然生长。你想她像什么，这个'像'必须能承载她的核心状态。……意象要短。几段话就够了。意象不解释自己。"
  failure_mode: |
    意象脱离角色核心状态，从外部套用"好看比喻"；或意象写成长篇、在末尾解释含义。
  mechanism: |
    意象的功能是"总调性锚"，必须能承载角色的核心矛盾与关系动态（风铃→等风来的被动）；套用的比喻与角色无关 = 无效；解释自己 = 破坏浓缩感。
  warning_signs:
    - 意象与角色核心状态对不上
    - 意象后面跟了"这个意象的含义是……"
  bound_to:
    - "写卡大师（意象：从角色长出来、短、放最后）"
  tags: [counter-example, imagery, external-metaphor, 写卡大师]

- id: ce60
  title: 定死的不变量动摇（"差点冲破"的摇摆写法）
  type: counter-example
  source_chapter: 6.怎么去写一个纯文字角色卡（三、定死不可动摇的东西）
  source_quote: |
    "当我在和 AI 讨论角色设计时，AI 提了一嘴'有时候本能差点冲破偏爱'，我直接否了：偏爱没输过，是绝对胜利的，哪来的差点冲破？……如果你不在一开始定死这个东西，写到后面就会摇摆。你会写出'她差点咬下去''她拼命忍住了'这种东西。"
  failure_mode: |
    角色"绝对内核"（不变量）没定死，写作和 AI 都摇摆，写出"她差点失控/拼命忍住"这类削弱内核的写法。
  mechanism: |
    不变量一旦动摇，角色最核心的特质被稀释（"偏爱没输过"被写成"差点输"）；定死不变量后，画面/两面性/进化规则才都有方向。
  warning_signs:
    - 核心设定出现"差点/几乎/拼命忍住"
    - 连作者自己都没想清楚角色的爱/信念到底多绝对
  bound_to:
    - "写卡大师（定死不变量）"
    - "改卡诊断（角色内核模糊）"
  tags: [counter-example, invariant, instability, 写卡大师]

- id: ce61
  title: 一上来就写性格外貌（跳过核心玩法设计）
  type: counter-example
  source_chapter: 6.怎么去写一个纯文字角色卡（一、先搞清楚你要写什么）
  source_quote: |
    "很多人一上来就开始写性格、写外貌、写背景。这是错的。你连'这张卡的核心玩法是什么'都没想清楚，写什么性格？写卡的第一步，想清楚三件事：核心驱动力、用户会怎么玩、这张卡能玩多久。"
  failure_mode: |
    从零设计角色卡时直接动手写性格/外貌/背景，跳过"核心驱动力 + 用户动力 + 长期性"设计。
  mechanism: |
    没有先想清"她为什么活着/用户玩什么/能玩多久"，写的性格外貌没有骨架支撑，卡很快就腻、玩不长。
  warning_signs:
    - 写卡第一步就落在"性格怎么定"上
    - 回答不了"这张卡用户能玩几轮"
  bound_to:
    - "写卡大师（从核心驱动力开始）"
  tags: [counter-example, card-design, skip-foundation, 写卡大师]

- id: ce62
  title: AI 的"最戏剧化补全"（AI 爱写她差点失控）
  type: counter-example
  source_chapter: 6.怎么去写一个纯文字角色卡（七、写二次解释）
  source_quote: |
    "你发现了吗？二次解释拦的全是 AI 最可能犯的错误。AI 喜欢写'她差点失控'因为那很有戏剧性。AI 喜欢写'她想起了什么'因为那很催泪。AI 喜欢写'恐怖的笑容'因为丧尸笑在 AI 的数据库里就是恐怖的。"
  failure_mode: |
    不主动预判 AI 的戏剧化补全（差点失控/恢复清明/恐怖笑），让 AI 把角色往最有戏剧性的方向写。
  mechanism: |
    AI 的默认补全倾向戏剧化（"差点失控""想起什么""恐怖的笑容"），与作者想要的克制设定冲突；二次解释要提前拦住"AI 最可能犯的错"。
  warning_signs:
    - AI 反复写"差点/险些/拼命忍住"等戏剧化转折
    - AI 给角色加数据库默认的催泪/恐怖反应
  bound_to:
    - "写二次解释（预判 AI 最可能犯的错）"
  tags: [counter-example, ai-dramatization, second-explanation, 二次解释]
