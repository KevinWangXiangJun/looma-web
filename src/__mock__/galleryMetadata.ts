/**
 * 图片元数据映射
 * 从 IMAGE_RENAMING_LOG.md 提取，保存英文文件名与中文信息的对应关系
 */

export interface ImageMetadata {
  chineseName: string;    // 中文文件名（主题核心）
  description: string;    // 完整中文描述
}

export const galleryMetadataMap: Record<string, ImageMetadata> = {
  'adventure-bridge-tunnel': {
    chineseName: '冒险者穿过隧道与桥梁',
    description: '两个冒险者站在巨大的圆形隧道中，金黄色天空与金属桥梁结构形成视觉层次，棕红色背景与黑色人物剪影营造出神秘的地下冒险氛围'
  },
  'alien-planet-earth-orbit': {
    chineseName: '外星行星与地球轨道景象',
    description: '宇宙太空景象，蓝绿色外星行星与地球浓密云层对比，飞行器白色轨迹象征星际探索，营造宏大宇宙尺度感'
  },
  'alien-planet-sci-fi-landscape': {
    chineseName: '外星球科幻景观',
    description: '青绿色天空与红色大地强烈对比，金色植物与奇异生物点缀其间，白色塔楼与弯曲新月营造超现实科幻美学'
  },
  'alpine-mountains-cloud-sea': {
    chineseName: '雪山山峰与云海日落景观',
    description: '雪山耸立于云海之上，日落金色光芒洒落在积雪和岩石上，营造壮观高山景观和梦幻天境'
  },
  'armored-heroes-battle-squad': {
    chineseName: '装甲战士集结与升空作战',
    description: '超级英雄战队集结，中央装甲战士蓝色能量核心闪耀，周围战士升空喷火，日落天空与沙漠地形形成宏大战役意境'
  },
  'asus-rog-gaming-logo': {
    chineseName: '华硕ROG电竞标志',
    description: '锐利线条与动感设计，银白色黑色对比营造高端电竞气息，粒子效果强调游戏硬件科技感与高性能属性'
  },
  'autumn-stream-forest-leaves': {
    chineseName: '秋日溪流与金色落叶森林',
    description: '山溪在秋季绝美风景，清澈溪水流过灰色石头，两岸树木展现绚烂秋叶色彩，秋叶铺满河床倒映溪水'
  },
  'balloons-blue-sky-minimal': {
    chineseName: '气球与蔚蓝天空的极简梦幻',
    description: '粉红色与橙色气球在蔚蓝天空自由飘浮，白色绳子连接，纯净蓝色背景营造宁静梦幻与希望意境'
  },
  'bare-trees-winter-snow': {
    chineseName: '冬日雪景与光秃树木',
    description: '苍白雪地上三棵光秃树木竖立，极简构图与灰白色调营造寂寥冬日气息，象征季节沧桑与自然简洁之美'
  },
  'batman-armored-helmet-tech': {
    chineseName: '蝙蝠侠装甲头盔与科技设计',
    description: '高科技装甲头盔肖像，灰色金属呈军工风格，荧光青蓝色眼睛闪耀科技光芒，营造未来战争视觉冲击'
  },
  'batman-dark-knight-silhouette': {
    chineseName: '蝙蝠侠黑暗骑士剪影形象',
    description: '黑色人物剪影展现蝙蝠侠标志性尖锐耳朵头盔与斗篷，胸口蝙蝠标志清晰，整体充满黑暗与正义气息'
  },
  'beach-wave-monochrome-minimal': {
    chineseName: '黑白海浪与沙滩纹理艺术',
    description: '极简黑白艺术，上半部分深灰色粗糙纹理，下半部分洁白沙粒纹理，波浪形边界创造流动感与强烈视觉冲击'
  },
  'brooklyn-bridge-manhattan-skyline': {
    chineseName: '布鲁克林大桥与曼哈顿天际线',
    description: '布鲁克林大桥黄昏风景，红砖色塔柱古典雄伟，曼哈顿天际线闪耀金琥珀色灯光，完美捕捉纽约城市魅力'
  },
  'burning-world-tree': {
    chineseName: '燃烧的世界树',
    description: '巨大发光树木在战火中燃烧，周围是被战火包围的废墟和士兵，构成史诗奇幻的破坏场景'
  },
  'business-professional-minimalist-icon': {
    chineseName: '商务专业人士极简图标',
    description: '极简商务人物图标，方形眼镜与灰色领带，高度抽象化符号，深灰色背景营造专业冷静气质'
  },
  'check-mark-digital-wireframe': {
    chineseName: '复选标记与数字线框设计',
    description: '白色点线组成三维透视检查标记，线框网格营造虚拟现实感，象征确认、完成与成功，呈现专业视觉语言'
  },
  'city-night-skyline-lights': {
    chineseName: '城市夜景与摩天楼群',
    description: '摩天大楼炫彩灯光在深蓝色夜空下闪烁，青绿色与金黄色灯光交织成都市电子梦幻，呈现现代都市繁华'
  },
  'cityscape-aerial-neon-lights': {
    chineseName: '城市鸟瞰夜景与霓虹灯光',
    description: '高空俯视大都市全景，摩天楼群闪烁炫彩霓虹灯光，蜿蜒河流如蓝色丝带，呈现未来科幻数字化美学'
  },
  'cliff-moher-atlantic-seascape': {
    chineseName: '莫赫悬崖与大西洋海景',
    description: '爱尔兰莫赫悬崖壮观地理景观，高耸黑色玄武岩悬崖俯瞰大西洋，顶部翠绿色草地与紫色野花点缀'
  },
  'cnc-precision-drilling-metal': {
    chineseName: '数控精密加工与金属钻削',
    description: '数控机床钻头精确钻削金属表面，金属屑纷飞炽热光芒，机械精密结构呈现工业美学与技术实力'
  },
  'colorful-bubble-gradient-art': {
    chineseName: '彩色气泡与渐变梦幻艺术',
    description: '绚丽泡泡艺术，温暖粉红紫蓝桃色渐变，大小不一半透明球体营造多层次视觉深度与梦幻色彩氛围'
  },
  'coral-reef-tropical-fish': {
    chineseName: '珊瑚礁与热带鱼群生态',
    description: '绚丽水下珊瑚礁生态，紫粉海葵与蝴蝶鱼优雅畅游，清澈蓝色海水呈现梦幻透明感与海洋宝藏'
  },
  'crystal-gemstone-low-poly-art': {
    chineseName: '水晶宝石与低多边形艺术设计',
    description: '绚丽3D几何水晶宝石，低多边形风格呈现闪耀多面体，镜面反射效果营造珠宝奢华感与魔法光芒'
  },
  'cyborg-warrior-energy-blast': {
    chineseName: '机甲战士与绿色能量冲击',
    description: '科幻动作场景，机甲战士被荧光绿色能量包围冲击，粒子效果四散飞溅，营造高科技战斗视觉冲击'
  },
  'dark-landscape-silhouette': {
    chineseName: '极简深色风景，分层山丘剪影',
    description: '深色山丘层层堆叠极简风景构图，细节丰富却不失简洁，营造极简主义设计美感与深邃空间感'
  },
  'daredevil-blind-hero-silhouette': {
    chineseName: '夜魔侠盲人英雄剪影形象',
    description: '黑色人物剪影展现夜魔侠挺拔身形，白色护目镜轮廓象征特殊视觉能力，鲜艳红色背景形成极端色彩对比'
  },
  'deadpool-character-portrait-logo': {
    chineseName: '死侍角色肖像与品牌标志',
    description: '低多边形3D几何风格，鲜红色头盔面罩与标志性文字，黑色阴影凸显立体感，充满反英雄黑色幽默气息'
  },
  'demon-horned-horse-geometric-art': {
    chineseName: '恶魔角马与几何艺术肖像',
    description: '低多边形几何艺术设计，头顶尖锐恶魔之角的神秘马匹，大胆色彩搭配与黑色发鬃营造神秘危险气质'
  },
  'digital-tunnel-light-perspective': {
    chineseName: '科幻隧道与虚拟光线透视',
    description: '无尽延伸科幻走廊，精密几何网格与虚拟面板设计，整齐排列光源形成纵深透视，营造神秘数字空间感'
  },
  'dragon-sunset-fantasy-mountains': {
    chineseName: '龙与日落山景的奇幻世界',
    description: '黑色龙翼展开翱翔，金黄橙红日落天空构成梦幻背景，深紫色山峰剪影营造魔幻史诗意境'
  },
  'earth-moon-night-lights': {
    chineseName: '地球与月球的宇宙景象',
    description: '宇宙空间壮观景象，地球展现深蓝色海洋与黄金色城市灯光，遥远月球洁白悬浮，星空点缀深蓝宇宙'
  },
  'eiffel-tower-autumn': {
    chineseName: '埃菲尔铁塔与秋季红叶',
    description: '埃菲尔铁塔矗立塞纳河畔，前景火红秋叶染成温暖秋日色调，展现巴黎浪漫气息与季节之美'
  },
  'floppy-disk-save-icon': {
    chineseName: '软盘存储与SAVE文字图标',
    description: '经典复古计算机图标，霓虹青绿色软盘3D设计，磁盘表面水平纹理，白色SAVE文字，深灰色背景呈现怀旧风格'
  },
  'forest-explorer-silhouette': {
    chineseName: '森林探险者的剪影',
    description: '背负长弓探险者站在蜿蜒森林中，光影交织形成深邃洞穴感，灰蓝色雾气与树木黑色剪影营造冒险气氛'
  },
  'forest-mountain-explorer-layers': {
    chineseName: '分层森林与探险者山景',
    description: '极简插画风景，多层次绿色渐变营造纵深感，孤独黑色人物剪影凝视远方，充满探险精神与对大自然敬畏'
  },
  'forest-stream-sunset-vista': {
    chineseName: '森林溪流与梦幻日落景观',
    description: '密集针叶林眺望梦幻日落，清澈溪流倒映绚烂色彩，天空多层次色彩渐变营造超现实风景意象'
  },
  'galactic-black-hole-jets': {
    chineseName: '活跃星系中心与黑洞喷流',
    description: '宇宙星系壮观系统，金黄色吸积盘环绕黑洞，蓝紫色相对论喷流激烈喷射，营造壮观深空景象'
  },
  'geometric-color-blocks': {
    chineseName: '几何抽象设计，多色彩块组合',
    description: '青绿色、珊瑚红、薄荷绿和深灰色组成现代几何设计，对角线与色彩对比营造当代艺术视觉冲击力'
  },
  'goku-super-saiyan-blue': {
    chineseName: '悟空超赛亚人蓝变身动作',
    description: '龙珠主人公孙悟空标志性插画，霓虹青蓝色头发超赛亚人蓝形态，橙色道服与蓝色腰带，跳跃腾空动态充满热血冒险精神'
  },
  'gradient-sky-dusk-transition': {
    chineseName: '渐变天空与黄昏色彩过渡',
    description: '极简天空渐变艺术，蔚蓝色逐渐过渡紫粉色再到深紫蓝色，营造黄昏时分自然色彩变化与梦幻意境'
  },
  'gradient-sphere-glass-blur': {
    chineseName: '玻璃球体渐变与模糊艺术',
    description: '抽象3D几何艺术，半透明玻璃球体呈现色彩渐变，焦点模糊效果营造深邃空间感与梦幻视觉层次'
  },
  'harbor-skyline-night-lights': {
    chineseName: '港湾城市夜景与游艇停泊',
    description: '海滨城市壮丽夜景，摩天楼群闪烁炫彩灯光倒映平静水面，多艘游艇停泊港口，呈现海滨城市繁华优雅气息'
  },
  'ice-cream-cone-cloud-fantasy': {
    chineseName: '冰淇淋甜筒与云朵梦幻艺术',
    description: '清新梦幻美食艺术，金黄华夫脆筒竖立粉白云朵之上，象征甜蜜与梦想融合，营造童话梦幻意境'
  },
  'japan-cherry-blossom-temple': {
    chineseName: '日本富士山、樱花与红色塔楼寺庙',
    description: '樱花盛开春季景象，远处富士山雪峰清晰可见，中心绛红色日式宝塔，构成经典日本文化符号'
  },
  'kobe-bryant-invincible': {
    chineseName: '科比布莱恩特不败传奇',
    description: '篮球传奇科比穿着洛杉矶湖人队标志性黄紫球衣，做出庆祝手势，INVINCIBLE文字彰显其不败精神与五冠王荣耀'
  },
  'lake-mountain-geometric-art': {
    chineseName: '湖泊与山脉的几何艺术',
    description: '几何化简山水画面，多层次蓝色山峰形成视觉深度，蓝色湖面如镜面宁静，现代极简艺术与自然风景融合'
  },
  'minimalist-mountain-layers': {
    chineseName: '极简山层与灰调美学',
    description: '极简主义分层山脉，浅灰色逐渐过渡深黑色，优雅山峰轮廓在浅色天空显得纯净，黑白灰配色营造禅意宁静'
  },
  'misty-forest-canopy-light': {
    chineseName: '雾气森林与林间光影',
    description: '高大树木在晨雾中若隐若现，柔和光线透过树叶形成绿色光晕，雾气缠绕树木营造梦幻雾森氛围'
  },
  'moon-climbing-silhouette': {
    chineseName: '人物在月球上攀登的剪影艺术',
    description: '黑色人物剪影在巨大白色月球表面攀登，象征探险精神与追求卓越的主题意蕴'
  },
  'moonlit-mountain-forest-night': {
    chineseName: '月光照耀的雪山与夜间森林',
    description: '梦幻夜间山水风景，高耸积雪山峰呈现柔和粉红紫色，弯月悬挂深蓝色夜空，营造极简主义与浪漫诗意融合'
  },
  'mountain-lake-mirror-geometry': {
    chineseName: '极简山水镜像与几何艺术',
    description: '分层几何山水景观，完美对称镜像将雪山与湖面倒影融为一体，多层次蓝色渐变营造纵深与视觉平衡'
  },
  'mountain-reflection-symmetry': {
    chineseName: '完美镜像对称的山峰与水面倒影',
    description: '雪山山峰形成对称构图，湖面如镜般倒影创造完美几何美学，冷色调蓝白构成宁静意境'
  },
  'mountain-sunset-silhouette': {
    chineseName: '分层山景与日落剪影',
    description: '多层次山峰剪影在日落背景下形成视觉深度，灌木丛与远处山峰形成对比，营造神秘暮色氛围'
  },
  'mountain-valley-dawn-wildlife': {
    chineseName: '山谷晨曦与野生动物群落',
    description: '梦幻极简风景插画，分层紫粉蓝紫色调营造晨曦山谷景象，成群野生动物与飞翔鸟群点缀天空'
  },
  'nebula-cosmic-gas-cloud': {
    chineseName: '星云与宇宙深空气体',
    description: '壮观宇宙星云景象，蓝白色星云气体呈现波浪丝带流动形态，散布白色星点如宝石闪耀，营造永恒宇宙美学'
  },
  'neon-light-art-abstract': {
    chineseName: '霓虹灯光艺术与抽象设计',
    description: '抽象霓虹灯艺术，青蓝与镁粉红色光线交织动感几何图形，闪耀质感与发光线条营造炫彩当代艺术魅力'
  },
  'neon-purple-room-interior': {
    chineseName: '霓虹紫色房间与几何窗户',
    description: '极简未来科幻室内空间，炽热霓虹紫品红光线照亮，几何窗户框架散发耀眼霓虹光芒，营造赛博朋克美学'
  },
  'number-eight-water-splash': {
    chineseName: '数字八与水花荧光效果',
    description: '青蓝色发光数字8被激烈水花环绕，飞溅水珠形成动感弧形轨迹，象征无限平衡与流动美妙融合'
  },
  'nvidia-geforce-logo-green': {
    chineseName: 'NVIDIA GeForce 标志与品牌识别',
    description: '荧光绿色动感曲线组成大写G，由多层逐渐变细线条构成，深黑色背景与绿色形成极端对比，象征高科技领先地位'
  },
  'nvidia-gpu-chip-technology': {
    chineseName: 'NVIDIA GPU芯片与科技光芒',
    description: 'GPU芯片散发标志性荧光绿色光芒，置于精密电路板上，蓝橙色能量线条环绕，营造未来科技炫彩视觉效果'
  },
  'omega-watch-water-splash': {
    chineseName: '欧米茄手表与水花飞溅',
    description: '精致欧米茄Seamaster海马系列手表在水花中绽放光芒，深蓝表盘与银色表带显得奢华典雅，动感视觉效果诠释防水品质'
  },
  'photographer-mountain-horizon': {
    chineseName: '摄影师与山景地平线',
    description: '摄影师手持相机三脚架站在山顶，黑色人物剪影与灰白苍凉天地对比，象征对风景追逐与艺术执着'
  },
  'pikachu-electric-pokemon-icon': {
    chineseName: '皮卡丘电属性精灵角色',
    description: '精灵宝可梦标志性角色，鲜艳金黄色身体象征电属性，黑色尖锐耳朵，两颊鲜红圆形腮部象征电能活力，蔚蓝背景突出可爱风格'
  },
  'red-mountain-sunset-parachute': {
    chineseName: '红色山谷日落与降落伞冒险',
    description: '梦幻极简风景，炽热深红玫瑰红樱桃红色调营造火焰般日落，红色降落伞与飞翔鸟群象征冒险与自由'
  },
  'red-planet-orbit': {
    chineseName: '红色几何行星与轨道环、卫星',
    description: '低多边形红色行星悬浮深蓝色宇宙中，细细轨道环绕周围，远处小卫星闪耀，充满科幻感'
  },
  'skull-warrior-hellfire-apocalypse': {
    chineseName: '骷髅战士与地狱火焰启示录',
    description: '黑暗奇幻末日景象，猩红色重甲战士挺立于无数白色骷髅头包围中，炽热红色火焰岩浆营造末世气息'
  },
  'space-fighter-starfield-combat': {
    chineseName: '太空战斗机与星空战役',
    description: '宇宙太空战斗场景，多艘战斗飞船编队飞行，主角战机尾部喷射红粉色能量光束，青蓝青绿星空背景营造深邃宇宙意境'
  },
  'spider-man-hero-portrait-logo': {
    chineseName: '蜘蛛侠英雄肖像与品牌标志',
    description: '低多边形几何艺术风格，鲜红色头盔面罩占据整个画面，黑色蜘蛛网纹理勾勒轮廓，白色眼睛象征敏锐视觉'
  },
  'superhero-team-apocalypse-battle': {
    chineseName: '超级英雄团队末日战役集结',
    description: '壮观超级英雄集体战斗场景，数十个黑色剪影排列战场地平线，紫粉琥珀色末日天空象征终极战役来临'
  },
  'superhero-team-lineup-colorful': {
    chineseName: '超级英雄团队彩色阵容展示',
    description: '12个英雄黑色剪影排列，每个英雄被独特彩色光晕包围，多彩配色展现英雄团队多样性与独特个性'
  },
  'sunset-warrior-cloud-sky': {
    chineseName: '日落战士与梦幻云海',
    description: '黑色剪影人物手持长矛挺立孤立山丘，面向绚烂日落天空，蓬松云层呈现多层次温暖色调，象征冒险精神与梦想追求'
  },
  'tech-circle-interface-light': {
    chineseName: '科技圆形界面与光线穿透',
    description: '精密未来主义科技设计，同心圆环组成能量核心，炽白色光点闪耀，青蓝色光线如激光束穿过虚拟空间'
  },
  'thailand-lagoon-longboat': {
    chineseName: '泰国石灰岩泻湖与长尾船风景',
    description: '泰国岛屿标志性景观，翡翠绿色清澈海水与陡峭石灰岩悬崖，棕色长尾船停泊前景，营造天堂般热带岛屿风情'
  },
  'thailand-tropical-beach': {
    chineseName: '泰国热带海滩与长尾船',
    description: '清澈绿松石色海水，耸立石灰岩悬崖，传统泰国木制长尾船停泊白沙滩'
  },
  'tropical-island-sunset-boat': {
    chineseName: '热带岛屿与日落景象',
    description: '绚丽日落景象，金黄粉红色天空映照静谧水面，棕榈树村舍在剪影中恬静，小船停泊水面，营造梦幻热带天堂'
  },
  'turquoise-sky-desert-stone': {
    chineseName: '绿松石天空与沙漠石景',
    description: '极简地理风景艺术，清晰对角线分割上方纯净绿松石蓝色天空与下方深灰色沙漠地形，营造极简主义设计美感'
  },
  'vancouver-sunset-science-world': {
    chineseName: '温哥华落日与科学馆',
    description: '温哥华Burrard海湾傍晚景象，Science World球形建筑在金蓝灯光闪耀，城市天际线倒映平静水面'
  },
  'volcano-lake-mountain-landscape': {
    chineseName: '火山湖与山脉的自然奇景',
    description: '青蓝色高山湖泊清澈宁静，背景积雪覆盖火山锥，周围群山巍峨，青蓝与翡翠绿形成完美色彩和谐'
  },
  'wildlife-mountain-sunrise': {
    chineseName: '野生动物与山谷日出',
    description: '鹿群在层叠山谷中悠闲草食，雪山在日出金黄光芒下呈现浅蓝色优雅剪影，营造和谐自然生态美景'
  },
  'windows-10-nebula': {
    chineseName: 'Windows 10 经典星云壁纸',
    description: '深蓝色星空背景，紫粉色星云形成神秘天文景象，代表微软标志性系统设计'
  },
  'witcher-monster-medallion': {
    chineseName: '巫师怪物奖章与魔幻符号',
    description: '精致线条雕刻狰狞怪物头颅奖章，散发神秘魔幻气息，代表游戏巫师系列经典设定'
  },
  'zelda-master-sword-logo': {
    chineseName: '塞尔达传说勇者之剑标志',
    description: '任天堂经典游戏标志性元素，奶油白色字母Z融合勇者之剑图案，古老魔法剑闪耀神圣光辉，充满奇幻冒险气息'
  },
};
  