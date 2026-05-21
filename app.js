/* ============================================================
   Coffee Playbook · app.js
   Data + render + interactive filters (vanilla JS, no deps)
   ============================================================ */

/* ---------- DATA ---------- */

// Country production data (2025/26 estimates, ICO/USDA-FAS)
// production = million 60kg bags; share = % of 178.85M global
const COUNTRIES = [
  {
    rank: 1, name: "巴西", en: "Brazil",
    mapId: "076",
    production: 65.0, share: 36.3,
    bean: "mixed",
    beanLabel: "Arabica 主 + Conilon Robusta",
    flavor: ["醇厚", "巧克力", "坚果", "低酸"],
    note: "全球第一大产国，定义商业 Arabica 基准",
    regions: ["Sul de Minas", "Cerrado Mineiro", "Mogiana", "Espírito Santo"],
    regionPoints: [
      { name: "Sul de Minas", lon: -45.5, lat: -21.5 },
      { name: "Cerrado Mineiro", lon: -47.5, lat: -18.8 },
      { name: "Mogiana", lon: -47.0, lat: -21.0 },
      { name: "Espírito Santo", lon: -40.7, lat: -19.5 }
    ],
    estates: ["卡舒埃拉农场（Fazenda Cachoeira）", "圣塔阿丽娜农场（Fazenda Santa Alina）", "圣弗朗西斯科农场（Fazenda São Francisco）", "法蒂玛圣母农场（Nossa Senhora de Fatima）"],
    varieties: ["Mundo Novo", "Catuaí", "Yellow Bourbon", "Conilon"],
    harvest: "5–9 月主采，机械化程度高",
    purchase: "适合做意式基底、商业拼配和低酸巧克力调单品。",
    color: "linear-gradient(135deg,#3F6B3A,#7BA05B,#E8C570)"
  },
  {
    rank: 2, name: "越南", en: "Vietnam",
    mapId: "704",
    production: 31.0, share: 17.3,
    bean: "robusta",
    beanLabel: "Robusta 主导（>95%）",
    flavor: ["浓苦", "焦烤", "高咖啡因", "醇厚"],
    note: "世界 Robusta 主产国，速溶与意式拼配支柱",
    regions: ["Đắk Lắk", "Lâm Đồng", "Gia Lai", "Đắk Nông", "Kon Tum"],
    regionPoints: [
      { name: "Đắk Lắk", lon: 108.0, lat: 12.7 },
      { name: "Lâm Đồng", lon: 108.3, lat: 11.6 },
      { name: "Gia Lai", lon: 108.0, lat: 13.9 },
      { name: "Đắk Nông", lon: 107.7, lat: 12.2 },
      { name: "Kon Tum", lon: 108.0, lat: 14.6 }
    ],
    estates: ["邦美蜀小农批次（Buôn Ma Thuột）", "求达特阿拉比卡（Cầu Đất Arabica）", "林同合作社批次（Lam Dong cooperatives）"],
    varieties: ["Robusta", "Catimor", "Typica 少量"],
    harvest: "10–1 月主采，中部高原集中上市",
    purchase: "适合速溶、奶咖、意式 crema 和成本敏感型拼配。",
    color: "linear-gradient(135deg,#B7282E,#D8B73A,#3F4B5C)"
  },
  {
    rank: 3, name: "哥伦比亚", en: "Colombia",
    mapId: "170",
    production: 13.0, share: 7.3,
    bean: "arabica",
    beanLabel: "100% Arabica（水洗）",
    flavor: ["明亮酸", "焦糖", "红苹果", "干净"],
    note: "全球水洗 Arabica 标杆，Supremo / Excelso 分级",
    regions: ["Huila", "Nariño", "Tolima", "Cauca", "Antioquia"],
    regionPoints: [
      { name: "Huila", lon: -75.6, lat: 2.5 },
      { name: "Nariño", lon: -77.9, lat: 1.2 },
      { name: "Tolima", lon: -75.2, lat: 4.0 },
      { name: "Cauca", lon: -76.6, lat: 2.4 },
      { name: "Antioquia", lon: -75.6, lat: 6.2 }
    ],
    estates: ["埃尔迪维索庄园（Finca El Diviso）", "拉帕尔马与埃尔图库庄园（La Palma y El Tucán）", "天堂庄园（Finca El Paraíso）", "小农合作社微批次"],
    varieties: ["Caturra", "Castillo", "Colombia", "Bourbon"],
    harvest: "南北产区错峰，全年有货源窗口",
    purchase: "适合稳定水洗单品、门店常规手冲和单品意式。",
    color: "linear-gradient(135deg,#FCD116,#003893,#CE1126)"
  },
  {
    rank: 4, name: "印度尼西亚", en: "Indonesia",
    mapId: "360",
    production: 10.5, share: 5.9,
    bean: "mixed",
    beanLabel: "Robusta 75% + Arabica 25%",
    flavor: ["低酸", "土味", "草本", "厚 body"],
    note: "湿刨法 Mandheling 风格独特，苏门答腊代表",
    regions: ["Aceh Gayo", "Lintong", "Mandheling / Tapanuli", "Java Ijen", "Sulawesi Toraja"],
    regionPoints: [
      { name: "Aceh Gayo", lon: 96.8, lat: 4.6 },
      { name: "Lintong", lon: 98.9, lat: 2.3 },
      { name: "Mandheling", lon: 99.1, lat: 1.5 },
      { name: "Java Ijen", lon: 114.2, lat: -8.1 },
      { name: "Sulawesi Toraja", lon: 119.9, lat: -3.0 }
    ],
    estates: ["布拉旺庄园（Blawan Estate）", "詹皮特庄园（Jampit Estate）", "卡尤马斯庄园（Kayumas Estate）", "伽佑小农合作社（Gayo cooperatives）"],
    varieties: ["Typica", "Catimor", "S-795", "Robusta"],
    harvest: "多岛屿错峰，苏门答腊常见小农湿刨批次",
    purchase: "适合低酸厚重型拼配、深烘单品和 Mocha-Java 风格。",
    color: "linear-gradient(135deg,#B7282E,#3F4B5C,#1F2933)"
  },
  {
    rank: 5, name: "埃塞俄比亚", en: "Ethiopia",
    mapId: "231",
    production: 8.4, share: 4.7,
    bean: "arabica",
    beanLabel: "100% Arabica（古老原生种）",
    flavor: ["花香", "柑橘", "蓝莓", "茶感"],
    note: "咖啡发源地，Yirgacheffe / Sidamo / Guji 三大产区",
    regions: ["Yirgacheffe", "Sidamo", "Guji", "Harrar", "Jimma / Limu"],
    regionPoints: [
      { name: "Yirgacheffe", lon: 38.2, lat: 6.2 },
      { name: "Sidamo", lon: 38.5, lat: 6.8 },
      { name: "Guji", lon: 39.0, lat: 5.7 },
      { name: "Harrar", lon: 42.1, lat: 9.3 },
      { name: "Jimma / Limu", lon: 36.8, lat: 7.8 }
    ],
    estates: ["切尔贝萨处理站（Chelbesa washing station）", "孔加合作社（Konga cooperative）", "本萨处理站（Bensa washing station）", "卡永山农场（Kayon Mountain）"],
    varieties: ["Heirloom", "JARC 74110", "JARC 74112"],
    harvest: "10–1 月采收，水洗站批次差异明显",
    purchase: "适合花果香手冲、浅烘精品和风味教育菜单。",
    color: "linear-gradient(135deg,#078930,#FCDD09,#DA121A)"
  },
  {
    rank: 6, name: "乌干达", en: "Uganda",
    mapId: "800",
    production: 6.8, share: 3.8,
    bean: "mixed",
    beanLabel: "Robusta 80% + Arabica 20%",
    flavor: ["扎实", "巧克力", "黑糖", "中等酸"],
    note: "非洲第二大产国，Robusta 原生地之一",
    regions: ["Bugisu / Mount Elgon", "Rwenzori", "Kisoro", "Central Robusta belt"],
    regionPoints: [
      { name: "Mount Elgon", lon: 34.5, lat: 1.1 },
      { name: "Rwenzori", lon: 30.0, lat: 0.4 },
      { name: "Kisoro", lon: 29.7, lat: -1.3 },
      { name: "Central belt", lon: 32.5, lat: 0.3 }
    ],
    estates: ["西皮瀑布项目（Kawacom Sipi Falls）", "基辛加处理站（Kisinga washing station）", "基索罗庄园（Kisoro Estate）"],
    varieties: ["Robusta 原生系", "SL14", "SL28", "Nyasaland"],
    harvest: "Arabica 与 Robusta 分区错峰，出口节奏灵活",
    purchase: "适合非洲 Robusta、巧克力调拼配和价格替代来源。",
    color: "linear-gradient(135deg,#000000,#FCDC04,#D90000)"
  },
  {
    rank: 7, name: "印度", en: "India",
    mapId: "356",
    production: 6.0, share: 3.4,
    bean: "mixed",
    beanLabel: "Robusta 70% + Arabica 30%",
    flavor: ["浓郁", "香料", "黑巧克力", "低酸"],
    note: "Monsooned Malabar 季风处理工艺独特",
    regions: ["Karnataka", "Kerala", "Tamil Nadu", "Bababudangiri", "Coorg"],
    regionPoints: [
      { name: "Karnataka", lon: 75.7, lat: 13.5 },
      { name: "Kerala", lon: 76.5, lat: 10.0 },
      { name: "Tamil Nadu", lon: 78.2, lat: 11.0 },
      { name: "Bababudangiri", lon: 75.7, lat: 13.4 },
      { name: "Coorg", lon: 75.7, lat: 12.4 }
    ],
    estates: ["塔塔咖啡庄园群（Tata Coffee estates）", "巴德拉庄园（Badra Estate）", "巴拉努尔庄园（Balanoor Estate）", "河谷庄园（Riverdale Estate）"],
    varieties: ["S-795", "SLN9", "Cauvery", "Robusta"],
    harvest: "11–3 月，季风马拉巴另有熟成周期",
    purchase: "适合香料调意式、季风处理特色豆和 Robusta 拼配。",
    color: "linear-gradient(135deg,#FF9933,#FFFFFF,#138808)"
  },
  {
    rank: 8, name: "洪都拉斯", en: "Honduras",
    mapId: "340",
    production: 5.7, share: 3.2,
    bean: "arabica",
    beanLabel: "100% Arabica（水洗）",
    flavor: ["焦糖", "柑橘", "干净", "平衡"],
    note: "中美洲第二大 Arabica 产国，价格友好",
    regions: ["Copán", "Marcala / Montecillos", "Opalaca", "El Paraíso", "Comayagua"],
    regionPoints: [
      { name: "Copán", lon: -89.1, lat: 14.8 },
      { name: "Marcala", lon: -88.0, lat: 14.1 },
      { name: "Opalaca", lon: -88.3, lat: 14.4 },
      { name: "El Paraíso", lon: -86.5, lat: 13.9 },
      { name: "Comayagua", lon: -87.6, lat: 14.5 }
    ],
    estates: ["桥庄园（Finca El Puente）", "枫香庄园（Finca Liquidambar）", "COMSA 合作社", "马尔卡拉咖啡生产者（Café de Marcala）"],
    varieties: ["Bourbon", "Caturra", "Catuaí", "Pacas", "Parainema"],
    harvest: "11–4 月，高海拔产区后段更集中",
    purchase: "适合性价比精品、稳定水洗拼配和中美洲风味替代。",
    color: "linear-gradient(135deg,#0073CF,#FFFFFF,#0073CF)"
  },
  {
    rank: 9, name: "中国（云南）", en: "China · Yunnan",
    mapId: "156",
    production: 2.8, share: 1.6,
    bean: "arabica",
    beanLabel: "Arabica 小粒种为主",
    flavor: ["坚果", "红糖", "草本", "柔和果酸"],
    note: "成长型精品产区，普洱、保山、临沧、德宏最具代表性",
    regions: ["普洱", "保山潞江坝", "临沧", "德宏", "西双版纳少量"],
    regionPoints: [
      { name: "普洱", lon: 101.0, lat: 22.8 },
      { name: "保山", lon: 99.2, lat: 25.1 },
      { name: "临沧", lon: 100.1, lat: 23.9 },
      { name: "德宏", lon: 98.6, lat: 24.4 },
      { name: "西双版纳", lon: 100.8, lat: 21.9 }
    ],
    estates: ["爱伲庄园（Aini Coffee Estate）", "后谷咖啡（Hogood Coffee）", "保山潞江坝小粒咖啡基地", "普洱小农合作社批次"],
    varieties: ["Catimor", "Typica 少量", "Bourbon 少量", "Sarchimor"],
    harvest: "11–3 月主采，云南高海拔小产区批次差异扩大",
    purchase: "适合入门精品、国产产地故事、低酸坚果甜感和中深烘意式。",
    color: "linear-gradient(135deg,#DE2910,#FFDE00,#6B8E23)"
  }
];

// Growing conditions
const CONDITIONS = [
  {
    icon: "altitude", name: "海拔",
    arabica: "600–2,200 m，高海拔慢熟、酸甜复杂",
    robusta: "0–800 m，低地及丘陵也能高产",
    metric: "慢熟与酸质",
    arabicaLevel: 88, robustaLevel: 36,
    motion: "lift",
    visual: "山线越高，成熟越慢，香气和酸甜结构越容易拉开。"
  },
  {
    icon: "temp", name: "温度",
    arabica: "年均 15–24°C，凉爽气候",
    robusta: "22–30°C，耐高温",
    metric: "耐热能力",
    arabicaLevel: 42, robustaLevel: 84,
    motion: "pulse",
    visual: "温度升高时，Robusta 的产量稳定性通常更强。"
  },
  {
    icon: "rain", name: "降雨",
    arabica: "1,400–2,000 mm，需明显干湿季",
    robusta: "1,500–3,000 mm，更耐潮湿",
    metric: "耐湿能力",
    arabicaLevel: 62, robustaLevel: 86,
    motion: "rain",
    visual: "充足雨水支撑开花和果实膨大，但干燥期决定采后质量。"
  },
  {
    icon: "soil", name: "土壤",
    arabica: "火山岩 / 富含有机质、排水良好",
    robusta: "兼容性更广，可在贫瘠土上结实",
    metric: "土壤要求",
    arabicaLevel: 82, robustaLevel: 58,
    motion: "grain",
    visual: "排水、矿物质和有机质会影响甜感、干净度与根系健康。"
  },
  {
    icon: "slope", name: "坡度",
    arabica: "15–25° 缓坡至陡坡，利排水",
    robusta: "可在平地、坡地大规模种植",
    metric: "地形敏感度",
    arabicaLevel: 76, robustaLevel: 44,
    motion: "tilt",
    visual: "坡度帮助排水和昼夜温差，但会增加人工采摘成本。"
  },
  {
    icon: "shade", name: "遮阴",
    arabica: "传统遮阴种植，保留风味",
    robusta: "多半全日照种植，追求产量",
    metric: "遮阴依赖",
    arabicaLevel: 72, robustaLevel: 38,
    motion: "sway",
    visual: "遮阴降低热压和蒸散，常用于维持高海拔 Arabica 的风味稳定。"
  },
  {
    icon: "ph", name: "土壤 pH",
    arabica: "弱酸性 6.0–6.5 最佳",
    robusta: "5.5–6.5，耐性更广",
    metric: "酸碱适配",
    arabicaLevel: 64, robustaLevel: 70,
    motion: "bubble",
    visual: "弱酸性土壤利于养分吸收，极端 pH 会拉低产量和树势。"
  },
  {
    icon: "harvest", name: "采收周期",
    arabica: "种植 3–4 年开始结果",
    robusta: "种植 2–3 年开始结果",
    metric: "回本速度",
    arabicaLevel: 48, robustaLevel: 76,
    motion: "spin",
    visual: "Robusta 投产更快，Arabica 则通常以更高杯测潜力换取更长周期。"
  }
];

const PRICES = [
  { name: "Colombian Milds", cn: "哥伦比亚水洗", value: 334.56, type: "水洗 Arabica", level: "high", note: "精品和高海拔水洗溢价最明显" },
  { name: "Other Milds", cn: "其他水洗 Arabica", value: 331.32, type: "水洗 Arabica", level: "high", note: "中美洲和东非水洗基准" },
  { name: "Brazilian Naturals", cn: "巴西日晒/半日晒", value: 313.76, type: "日晒 Arabica", level: "mid", note: "商业 Arabica 拼配基准" },
  { name: "NY ICE Arabica", cn: "纽约期货 KC", value: 284.63, type: "期货 Arabica", level: "mid", note: "商业 Arabica 锚点" },
  { name: "ICO I-CIP", cn: "ICO 综合指标价", value: 266.24, type: "综合", level: "base", note: "跨组别市场温度计" },
  { name: "ICO Robustas", cn: "Robusta 组别", value: 164.64, type: "Robusta", level: "low", note: "速溶和意式拼配成本锚" },
  { name: "London ICE Robusta", cn: "伦敦期货折算", value: 150.65, type: "期货 Robusta", level: "low", note: "全球 Robusta 交易锚点" }
];

const RECOMMENDATIONS = [
  {
    bean: "Ethiopia Yirgacheffe Washed",
    cn: "埃塞俄比亚 耶加雪菲 水洗",
    taste: ["floral", "bright", "light"],
    brew: ["pourover", "coldbrew", "drip"],
    drinks: ["black-hot", "iced-americano", "coldbrew"],
    budgets: ["80-150", "150-300"],
    profile: "花香、柑橘、茶感、明亮酸质",
    why: "适合想要清爽、不苦、层次明显的手冲或冷萃。",
    skus: ["前街咖啡 · 水洗耶加雪菲", "治光师 · 耶加雪菲水洗", "Manner · 埃塞水洗单品豆"]
  },
  {
    bean: "Ethiopia Natural Red Cherry",
    cn: "埃塞俄比亚 耶加雪菲 日晒红樱桃",
    taste: ["fruity", "floral", "sweet"],
    brew: ["pourover", "coldbrew", "drip"],
    drinks: ["black-hot", "iced-americano", "coldbrew"],
    budgets: ["80-150", "150-300"],
    profile: "莓果、柑橘、水果发酵香、蜂蜜甜",
    why: "适合偏好果香、甜感和发酵层次，但仍想保持轻盈口感。",
    skus: ["前街咖啡 · 日晒红樱桃", "治光师 · 埃塞日晒单品", "Torch 炬点 · 埃塞日晒"]
  },
  {
    bean: "Yirgacheffe Natural SOE",
    cn: "耶加雪菲 日晒红樱桃 SOE",
    taste: ["fruity", "bright", "sweet"],
    brew: ["espresso", "americano"],
    drinks: ["iced-americano", "flatwhite", "latte"],
    budgets: ["150-300"],
    profile: "莓果、奶油、柑橘、红茶",
    why: "适合想用意式设备做有花果香的美式或澳白。",
    skus: ["前街咖啡 · 草莓糖 SOE", "Manner · 花果香 SOE", "Seesaw · 花果香意式豆"]
  },
  {
    bean: "Classic Espresso Blend",
    cn: "经典意式拼配",
    taste: ["nutty", "chocolate", "balanced"],
    brew: ["espresso", "moka"],
    drinks: ["latte", "flatwhite", "oat", "sweet"],
    budgets: ["under80", "80-150"],
    profile: "焦糖、坚果、可可、黑巧克力、油脂丰富",
    why: "适合拿铁、卡布、澳白和日常家用意式，奶中表现稳定。",
    skus: ["前街咖啡 · 经典意式拼配 OP4", "Manner · 意式拼配咖啡豆", "辛鹿 · 意式拼配"]
  },
  {
    bean: "100% Arabica Espresso Blend",
    cn: "100% 阿拉比卡精品拼配",
    taste: ["nutty", "balanced", "sweet"],
    brew: ["espresso", "americano"],
    drinks: ["black-hot", "iced-americano", "latte", "flatwhite"],
    budgets: ["80-150", "150-300"],
    profile: "柔和微酸、清甜、坚果回甘、中等油脂",
    why: "适合不想要罗布斯塔苦感，又希望浓缩稳定平衡。",
    skus: ["前街咖啡 · 精品拼配 100%阿拉比卡", "治光师 · 甜感意式拼配", "Seesaw · 意式拼配"]
  },
  {
    bean: "Indonesia PWN Golden Mandheling",
    cn: "印尼 PWN 黄金曼特宁",
    taste: ["lowacid", "chocolate", "heavy"],
    brew: ["pourover", "moka", "espresso"],
    drinks: ["black-hot", "latte", "flatwhite", "oat"],
    budgets: ["150-300", "300plus"],
    profile: "低酸、醇厚、坚果、焦糖、巧克力、草本尾韵",
    why: "适合不喜欢酸咖啡、偏好厚重口感，也可做深烘方向奶咖。",
    skus: ["前街咖啡 · PWN 黄金曼特宁", "治光师 · 曼特宁", "FisherCoffee · 曼特宁"]
  },
  {
    bean: "Brazil Queen Estate",
    cn: "巴西 皇后庄园",
    taste: ["nutty", "chocolate", "lowacid"],
    brew: ["pourover", "espresso", "moka"],
    drinks: ["black-hot", "latte", "flatwhite", "sweet", "oat"],
    budgets: ["80-150", "150-300"],
    profile: "奶油巧克力、坚果、黑可可、柔顺低酸",
    why: "适合想要低酸、顺滑、带坚果巧克力风味的安全选择。",
    skus: ["前街咖啡 · 巴西皇后庄园", "治光师 · 巴西单品", "豆叔 · 巴西单品"]
  },
  {
    bean: "Colombia Huila / Experimental",
    cn: "哥伦比亚 蕙兰 / 厌氧果香",
    taste: ["fruity", "sweet", "experimental"],
    brew: ["pourover", "drip", "espresso"],
    drinks: ["black-hot", "iced-americano", "coldbrew"],
    budgets: ["150-300", "300plus"],
    profile: "百香果、葡萄、杏桃、果脯、巧克力甜感",
    why: "适合想尝试现代处理法和高辨识度果香的人。",
    skus: ["前街咖啡 · 哥伦比亚希爪", "治光师 · 哥伦比亚特殊处理", "Torch 炬点 · 哥伦比亚特殊处理"]
  }
];

// Processing methods
const PROCESSES = [
  {
    name: "水洗", en: "Washed / Wet",
    img: "./assets/cherries-plant.jpg",
    desc: "去果皮 → 发酵脱胶 → 清水洗净 → 干燥。干净度最高，突出酸度与品种特征。",
    tags: ["干净", "酸度突出", "高一致性"],
    origins: "哥伦比亚 · 肯尼亚 · 中美洲"
  },
  {
    name: "日晒", en: "Natural / Dry",
    img: "./assets/drying-patio.jpg",
    desc: "整颗带果晒干 → 脱壳。果糖渗入豆体，甜感与果香浓郁，但风味一致性挑战大。",
    tags: ["甜感", "果香", "body 厚"],
    origins: "巴西 · 埃塞俄比亚 · 也门"
  },
  {
    name: "蜜处理", en: "Honey / Pulped Natural",
    img: "./assets/harvesting-bucket.jpg",
    desc: "去果皮但保留部分果胶 → 直接干燥。按果胶残留量分白蜜 / 黄蜜 / 红蜜 / 黑蜜，平衡水洗的干净与日晒的甜。",
    tags: ["平衡", "焦糖甜", "分级精细"],
    origins: "哥斯达黎加 · 巴拿马 · 萨尔瓦多"
  },
  {
    name: "湿刨法", en: "Wet-Hulled / Giling Basah",
    img: "./assets/roasting-pan.jpg",
    desc: "在 30–40% 含水率时即脱壳，再继续干燥。豆体偏深绿、风味厚重、酸度低、土木气强。",
    tags: ["低酸", "厚 body", "土木气"],
    origins: "印尼苏门答腊（Mandheling）"
  },
  {
    name: "厌氧 / 二氧化碳浸渍", en: "Anaerobic / Carbonic",
    img: "./assets/roasted-beans.jpg",
    desc: "整颗咖啡樱桃在密封罐内进行无氧发酵，再按水洗或日晒后处理。风味分层强、热带水果与发酵酒香明显，多见于比赛与精品。",
    tags: ["发酵风味", "高分层", "比赛常用"],
    origins: "哥斯达黎加 · 巴拿马 · 哥伦比亚"
  }
];

// Signature products
// uses: pourover | espresso | blend | instant | specialty
const PRODUCTS = [
  {
    name: "Brazil Santos NY2", cn: "巴西 桑托斯",
    origin: "BRAZIL",
    desc: "巴西商业 Arabica 基准。坚果、巧克力、低酸、厚 body，最常见的意式拼配底。",
    tier: "Commercial / Premium",
    tierClass: "prem",
    uses: ["espresso", "blend"]
  },
  {
    name: "Vietnam Robusta G1", cn: "越南 Robusta G1",
    origin: "VIETNAM",
    desc: "全球速溶与即饮的主力。浓苦、高咖啡因、谷物焦香，常做拼配 crema 来源。",
    tier: "Commercial",
    tierClass: "comm",
    uses: ["espresso", "blend", "instant"]
  },
  {
    name: "Colombia Supremo", cn: "哥伦比亚 苏普雷莫",
    origin: "COLOMBIA",
    desc: "水洗 17/18 目大豆，柑橘酸明亮、焦糖甜、平衡度高。手冲与单品意式都好用。",
    tier: "Premium / Specialty",
    tierClass: "prem",
    uses: ["pourover", "espresso", "blend"]
  },
  {
    name: "Ethiopia Yirgacheffe", cn: "埃塞 耶加雪菲",
    origin: "ETHIOPIA",
    desc: "水洗 Yirgacheffe G1。柠檬花、佛手柑、白茶、莓果，精品手冲常青树。",
    tier: "Specialty",
    tierClass: "spec",
    uses: ["pourover", "specialty"]
  },
  {
    name: "Indonesia Mandheling", cn: "印尼 曼特宁",
    origin: "INDONESIA",
    desc: "苏门答腊湿刨法，雪松、烟草、黑巧、草药调，低酸厚 body，意式拼配常客。",
    tier: "Premium",
    tierClass: "prem",
    uses: ["espresso", "blend", "pourover"]
  },
  {
    name: "Kenya AA", cn: "肯尼亚 AA",
    origin: "KENYA",
    desc: "水洗 SL28 / SL34，黑加仑、葡萄柚、番茄汁，酸质极其活跃，杯测高分常客。",
    tier: "Specialty",
    tierClass: "spec",
    uses: ["pourover", "specialty"]
  },
  {
    name: "Guatemala Antigua", cn: "危地马拉 安提瓜",
    origin: "GUATEMALA",
    desc: "火山土壤水洗，可可、焦糖、烟熏、香料，结构感强，适合中深烘。",
    tier: "Premium / Specialty",
    tierClass: "prem",
    uses: ["pourover", "espresso", "blend"]
  },
  {
    name: "Costa Rica Tarrazú", cn: "哥斯达黎加 塔拉珠",
    origin: "COSTA RICA",
    desc: "高海拔水洗或蜜处理，柑橘、蜂蜜、杏桃、干净明亮，蜜处理风味分层尤佳。",
    tier: "Specialty",
    tierClass: "spec",
    uses: ["pourover", "specialty"]
  },
  {
    name: "Panama Geisha", cn: "巴拿马 瑰夏",
    origin: "PANAMA",
    desc: "拍卖之王。茉莉、佛手柑、桃子、蜂蜜，BoP 拍卖屡破纪录，象征精品天花板。",
    tier: "Auction / Top Specialty",
    tierClass: "spec",
    uses: ["specialty", "pourover"]
  }
];

/* ---------- ICONS (inline SVG) ---------- */
const ICONS = {
  altitude: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 20 L9 10 L13 16 L17 8 L21 20 Z"/></svg>',
  temp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="13" rx="3"/><circle cx="12" cy="18" r="3"/></svg>',
  rain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 14a5 5 0 0 1 10-2 4 4 0 0 1 0 8H8a4 4 0 0 1-2-6Z"/><path d="M9 21l-1 2M13 21l-1 2M17 21l-1 2"/></svg>',
  soil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17h18"/><path d="M5 17l2-4M11 17l2-5M17 17l2-3"/><circle cx="7" cy="13" r="1"/><circle cx="13" cy="12" r="1"/><circle cx="19" cy="14" r="1"/></svg>',
  slope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 20 L21 6"/><path d="M21 20H3"/></svg>',
  shade: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="9" r="5"/><path d="M12 14v8M8 22h8"/></svg>',
  ph: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3v6l-4 8a4 4 0 0 0 4 5h6a4 4 0 0 0 4-5l-4-8V3"/><path d="M9 3h6"/></svg>',
  harvest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
};

const PROCESS_ICONS = {
  washed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z"/><path d="M9 15c1.2 1.2 3.6 1.3 5.8-.6"/></svg>',
  natural: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M19.8 4.2l-2.1 2.1M6.3 17.7l-2.1 2.1"/></svg>',
  honey: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8l4 6-8 10-8-10 4-6Z"/><path d="M8 4l4 16M16 4l-4 16M4 10h16"/></svg>',
  hulled: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17c4-6 12-6 16 0"/><path d="M6 14c3-3 9-3 12 0"/><path d="M9 11c1.8-1 4.2-1 6 0"/><path d="M6 20h12"/></svg>',
  anaerobic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="12" height="16" rx="3"/><path d="M9 8h6M9 16h6"/><circle cx="10" cy="12" r="1"/><circle cx="14" cy="12" r="1"/></svg>'
};

const WORLD_MAP_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
let worldMapPromise = null;

function loadWorldMapFeatures() {
  if (!worldMapPromise) {
    worldMapPromise = fetch(WORLD_MAP_URL)
      .then(response => {
        if (!response.ok) throw new Error("World map failed to load");
        return response.json();
      })
      .then(world => topojson.feature(world, world.objects.countries).features);
  }
  return worldMapPromise;
}

function beanScale(value, max = 100, className = "") {
  const total = 10;
  const active = Math.max(1, Math.min(total, Math.round((value / max) * total)));
  return `<div class="bean-scale ${className}" aria-label="${value} / ${max}">
    ${Array.from({ length: total }, (_, i) => `<span class="${i < active ? "active" : ""}"></span>`).join("")}
  </div>`;
}

function conditionScale(arabicaValue, robustaValue) {
  const arabica = Math.max(6, Math.min(94, arabicaValue));
  const robusta = Math.max(6, Math.min(94, robustaValue));
  return `<div class="comparison-scale" aria-label="同一刻度对比：Arabica ${arabicaValue}，Robusta ${robustaValue}">
    <div class="scale-caption"><span>相对较弱</span><span>相对较强</span></div>
    <div class="scale-track">
      <span class="scale-dot arabica-dot" style="--pos:${arabica}%"><b>A</b></span>
      <span class="scale-dot robusta-dot" style="--pos:${robusta}%"><b>R</b></span>
    </div>
    <div class="scale-legend"><span><i class="legend-a"></i>Arabica</span><span><i class="legend-r"></i>Robusta</span></div>
  </div>`;
}

/* ---------- RENDER ---------- */

function renderCountries() {
  const grid = document.getElementById("countryGrid");
  grid.innerHTML = COUNTRIES.map((c, index) => `
    <article class="country-card" data-bean="${c.bean}">
      <span class="country-rank">#${c.rank}</span>
      <div class="country-flag" style="background:${c.color}">
        <span class="country-flag-name">${c.name}</span>
      </div>
      <div class="country-body">
        <div class="country-stats">
          <div>
            <div class="stat-mini-label">年产量</div>
            <div class="stat-mini-value">${c.production.toFixed(1)}<span class="unit">M 袋</span></div>
          </div>
          <div>
            <div class="stat-mini-label">全球占比</div>
            <div class="stat-mini-value">${c.share.toFixed(1)}<span class="unit">%</span></div>
            ${beanScale(c.share, 40, "country-bean-scale")}
          </div>
        </div>
        <div>
          <span class="bean-tag bean-${c.bean === 'mixed' ? 'mixed' : c.bean}">${c.beanLabel}</span>
        </div>
        <p style="font-size:var(--text-sm);color:var(--ink-2);line-height:1.55">${c.note}</p>
        <div class="flavor-tags">
          ${c.flavor.map(f => `<span class="flavor-tag">${f}</span>`).join("")}
        </div>
        <button class="country-toggle" type="button" data-country-open="${index}" aria-haspopup="dialog">
          <span>查看核心产区与庄园</span>
          <span class="toggle-arrow">→</span>
        </button>
      </div>
    </article>
  `).join("");
}

function renderConditions() {
  const grid = document.getElementById("conditionsGrid");
  grid.innerHTML = `
    <div class="terroir-compare">
      <article class="terroir-hero arabica-terroir">
        <div>
          <span class="species-kicker">Coffea arabica</span>
          <h3>Arabica · 风味优先</h3>
          <p>更依赖高海拔、凉爽昼夜温差和排水良好的土壤，适合做花果香、酸甜层次和精品单品。</p>
        </div>
        <div class="terroir-stats">
          <div class="terroir-stat"><span>海拔</span><strong>600–2,200m</strong></div>
          <div class="terroir-stat"><span>温度</span><strong>15–24°C</strong></div>
          <div class="terroir-stat"><span>周期</span><strong>3–4 年</strong></div>
        </div>
      </article>
      <article class="terroir-hero robusta-terroir">
        <div>
          <span class="species-kicker">Coffea canephora</span>
          <h3>Robusta · 产量与韧性优先</h3>
          <p>更适合低海拔、高温高湿和规模化管理，优势在高产、抗病、厚重 body 与更高咖啡因。</p>
        </div>
        <div class="terroir-stats">
          <div class="terroir-stat"><span>海拔</span><strong>0–800m</strong></div>
          <div class="terroir-stat"><span>温度</span><strong>22–30°C</strong></div>
          <div class="terroir-stat"><span>周期</span><strong>2–3 年</strong></div>
        </div>
      </article>
    </div>
    <div class="terroir-factor-grid">
      ${CONDITIONS.map(c => `
        <article class="terroir-factor visual-condition" data-motion="${c.motion}">
          <div class="terroir-factor-head">
            <div class="condition-icon">${ICONS[c.icon] || ""}</div>
            <div>
              <span>${c.metric}</span>
              <h4>${c.name}</h4>
            </div>
          </div>
          <div class="factor-split">
            <div class="factor-side arabica-side">
              <span>Arabica</span>
              <p>${c.arabica}</p>
            </div>
            <div class="factor-side robusta-side">
              <span>Robusta</span>
              <p>${c.robusta}</p>
            </div>
          </div>
          ${conditionScale(c.arabicaLevel, c.robustaLevel)}
          <p class="visual-note">${c.visual}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderPrices() {
  const wrap = document.getElementById("priceViz");
  if (!wrap) return;
  wrap.innerHTML = `
    <div class="buyer-price-board">
      <article class="price-explainer">
        <span class="price-kicker">先看这句话</span>
        <h3>买熟豆时，不用先看懂 ¢/lb</h3>
        <p>期货价是生豆大宗市场的温度计；你买到的 200g / 250g 熟豆价格，还会叠加产地溢价、烘焙损耗、包装物流、品牌渠道和新鲜度服务。</p>
      </article>
      <div class="retail-price-grid" aria-label="熟豆零售价格带">
        <article class="retail-price-card daily">
          <span>口粮豆</span>
          <strong>¥40–80</strong>
          <p>中深烘、拼配、国产云南或巴西底，适合美式、奶咖、办公室日常。</p>
        </article>
        <article class="retail-price-card stable">
          <span>稳定精品</span>
          <strong>¥80–150</strong>
          <p>常见单品或精品拼配，风味更清楚，是多数家用玩家的甜蜜区。</p>
        </article>
        <article class="retail-price-card advanced">
          <span>风味进阶</span>
          <strong>¥150–300</strong>
          <p>高海拔、特殊处理、微批次，适合想喝出花果香、发酵感或产区差异。</p>
        </article>
        <article class="retail-price-card rare">
          <span>稀缺/礼品</span>
          <strong>¥300+</strong>
          <p>瑰夏、竞赛批次、拍卖批次或极小批量处理法，更多为体验和收藏溢价。</p>
        </article>
      </div>
      <div class="price-journey" aria-label="咖啡价格从生豆到零售的形成路径">
        <div class="journey-node"><span>01</span><strong>生豆基准</strong><p>ICE / ICO 决定大盘冷暖</p></div>
        <div class="journey-line"></div>
        <div class="journey-node"><span>02</span><strong>产地溢价</strong><p>杯测分、庄园、处理法、稀缺性</p></div>
        <div class="journey-line"></div>
        <div class="journey-node"><span>03</span><strong>烘焙损耗</strong><p>熟豆重量减少，人工与品控增加</p></div>
        <div class="journey-line"></div>
        <div class="journey-node"><span>04</span><strong>零售服务</strong><p>包装、物流、渠道、新鲜烘焙</p></div>
      </div>
      <aside class="market-note">
        <strong>给小白的判断法</strong>
        <p>先按喝法定预算：奶咖优先看稳定油脂与巧克力坚果调；黑咖啡优先看产区、处理法和烘焙日期。价格越高不一定越好喝，但通常意味着批次更小、风味更明显、容错更低。</p>
      </aside>
    </div>
  `;
}

function renderProcesses() {
  const grid = document.getElementById("processGrid");
  grid.innerHTML = PROCESSES.map((p, i) => `
    <article class="process-card">
      <div class="process-card-img">
        <img src="${p.img}" alt="${p.name} 处理法图像" loading="lazy" />
        <span class="process-num">${String(i + 1).padStart(2, "0")}</span>
      </div>
      <div class="process-body">
        <div>
          <h4>${p.name}</h4>
          <div class="process-en">${p.en}</div>
        </div>
        <p>${p.desc}</p>
        <div class="process-tags">
          ${p.tags.map(t => `<span class="flavor-tag">${t}</span>`).join("")}
        </div>
        <div style="font-size:var(--text-xs);color:var(--ink-3);letter-spacing:0.08em;margin-top:auto">代表产区：${p.origins}</div>
      </div>
    </article>
  `).join("");
  const flow = document.getElementById("processFlow");
  if (flow) {
    flow.innerHTML = `
      <div class="flow-step"><span>01</span><strong>采摘</strong><p>只选成熟红果，决定甜感上限。</p></div>
      <div class="flow-join">→</div>
      <div class="flow-step"><span>02</span><strong>分选</strong><p>浮选、手选，去除未熟与瑕疵果。</p></div>
      <div class="flow-join">→</div>
      <div class="flow-branch icon-branch" aria-label="处理法分支">
        <div class="process-option washed"><span class="process-icon">${PROCESS_ICONS.washed}</span><strong>水洗</strong><em>干净酸质</em></div>
        <div class="process-option natural"><span class="process-icon">${PROCESS_ICONS.natural}</span><strong>日晒</strong><em>果香甜感</em></div>
        <div class="process-option honey"><span class="process-icon">${PROCESS_ICONS.honey}</span><strong>蜜处理</strong><em>焦糖平衡</em></div>
        <div class="process-option hulled"><span class="process-icon">${PROCESS_ICONS.hulled}</span><strong>湿刨</strong><em>低酸厚重</em></div>
        <div class="process-option anaerobic"><span class="process-icon">${PROCESS_ICONS.anaerobic}</span><strong>厌氧</strong><em>风味放大</em></div>
      </div>
      <div class="flow-join">→</div>
      <div class="flow-step"><span>04</span><strong>干燥</strong><p>晒床或机械干燥，降至安全含水率。</p></div>
      <div class="flow-join">→</div>
      <div class="flow-step"><span>05</span><strong>脱壳分级</strong><p>成为生豆，进入出口、烘焙和杯测。</p></div>
    `;
  }
}

const USE_LABEL = {
  pourover: "手冲", espresso: "意式", blend: "拼配", instant: "速溶", specialty: "精品"
};

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = PRODUCTS.map(p => `
    <article class="product-card" data-uses="${p.uses.join(',')}">
      <div class="product-head">
        <div class="product-name">${p.name}<span class="cn">${p.cn}</span></div>
        <span class="product-origin">${p.origin}</span>
      </div>
      <p class="product-desc">${p.desc}</p>
      <div class="product-foot">
        <span class="product-tier ${p.tierClass}">${p.tier}</span>
        <span class="product-uses">
          ${p.uses.map(u => `<span class="use-tag">${USE_LABEL[u]}</span>`).join("")}
        </span>
      </div>
    </article>
  `).join("");
}

function renderRecommender() {
  const form = document.getElementById("recoForm");
  const results = document.getElementById("recoResults");
  if (!form || !results) return;

  const scoreItem = (item, prefs) => {
    let score = 0;
    if (item.taste.includes(prefs.taste)) score += 4;
    if (item.brew.includes(prefs.brew)) score += 3;
    if ((item.drinks || []).includes(prefs.drink)) score += 2;
    if (item.budgets.includes(prefs.budget)) score += 2;
    if (["latte", "flatwhite", "oat", "sweet"].includes(prefs.drink) && item.taste.some(t => ["chocolate", "nutty", "lowacid", "heavy", "balanced"].includes(t))) score += 1;
    if (["iced-americano", "coldbrew"].includes(prefs.drink) && item.taste.some(t => ["fruity", "floral", "bright", "sweet"].includes(t))) score += 1;
    return score;
  };

  const run = () => {
    const prefs = Object.fromEntries(new FormData(form).entries());
    const picks = RECOMMENDATIONS
      .map(item => ({ ...item, score: scoreItem(item, prefs) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    results.innerHTML = picks.map((item, index) => `
      <article class="reco-card">
        <div class="reco-rank">${String(index + 1).padStart(2, "0")}</div>
        <div class="reco-main">
          <h4>${item.cn}</h4>
          <span>${item.bean}</span>
          <p>${item.profile}</p>
          <div class="reco-reason">${item.why}</div>
          <div class="reco-sku-list">
            <span>国内电商可搜</span>
            <div>${(item.skus || [item.sku]).map(sku => `<b>${sku}</b>`).join("")}</div>
          </div>
        </div>
      </article>
    `).join("");
  };

  form.addEventListener("change", run);
  form.addEventListener("submit", event => {
    event.preventDefault();
    run();
  });
  run();
}

/* ---------- FILTERS ---------- */

function bindFilters() {
  document.querySelectorAll(".chip[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      const group = btn.dataset.filter;
      const value = btn.dataset.value;

      // toggle active state within group
      document.querySelectorAll(`.chip[data-filter="${group}"]`).forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (group === "country") {
        document.querySelectorAll(".country-card").forEach(card => {
          const match = value === "all" || card.dataset.bean === value;
          card.classList.toggle("dimmed", !match);
        });
      } else if (group === "product") {
        document.querySelectorAll(".product-card").forEach(card => {
          const uses = (card.dataset.uses || "").split(",");
          const match = value === "all" || uses.includes(value);
          card.classList.toggle("dimmed", !match);
        });
      }
    });
  });
}

function bindCountryDetails() {
  ensureCountryDialog();
  document.querySelectorAll("[data-country-open]").forEach(btn => {
    btn.addEventListener("click", () => openCountryDialog(btn.dataset.countryOpen));
  });
  document.querySelectorAll("[data-country-close]").forEach(btn => {
    btn.addEventListener("click", closeCountryDialog);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeCountryDialog();
  });
}

function ensureCountryDialog() {
  if (document.getElementById("countryDialog")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="country-dialog" id="countryDialog" hidden>
      <button class="dialog-backdrop" type="button" data-country-close aria-label="关闭产国详情"></button>
      <section class="dialog-panel" role="dialog" aria-modal="true" aria-labelledby="dialogTitle">
        <button class="dialog-close" type="button" data-country-close aria-label="关闭">×</button>
        <div id="countryDialogContent"></div>
      </section>
    </div>
  `);
}

function openCountryDialog(index) {
  ensureCountryDialog();
  const c = COUNTRIES[Number(index)];
  const dialog = document.getElementById("countryDialog");
  const content = document.getElementById("countryDialogContent");
  if (!c || !dialog || !content) return;
  content.innerHTML = `
    <div class="dialog-hero" style="background:${c.color}">
      <span>#${c.rank}</span>
      <h3 id="dialogTitle">${c.name} · ${c.en}</h3>
      <p>${c.note}</p>
    </div>
    <div class="dialog-content">
      <div class="dialog-profile-grid">
        <div class="origin-map-card">
          <div class="detail-label">核心产区地图</div>
          <div class="origin-map">
            <div class="map-compass"><span>N</span><i></i></div>
            <div class="map-country-label">${c.en}</div>
            <svg class="real-country-map" id="countryMapSvg" viewBox="0 0 420 240" role="img" aria-label="${c.name}核心咖啡产区真实国家轮廓地图">
              <text class="map-loading" x="210" y="120" text-anchor="middle">地图加载中…</text>
            </svg>
          </div>
          <p>使用真实国家轮廓投影，并按经纬度标注核心咖啡产区的近似位置；产区点用于建立地理感，不代表精确地块边界。</p>
        </div>
        <div class="dialog-kpis">
          <div><strong>${c.production.toFixed(1)}M</strong><span>60kg 袋</span></div>
          <div><strong>${c.share.toFixed(1)}%</strong><span>全球占比</span></div>
          <div><strong>${c.beanLabel}</strong><span>主力豆种</span></div>
        </div>
      </div>
      <div class="detail-block">
        <div class="detail-label">核心产区</div>
        <div class="detail-chips">${c.regions.map(r => `<span>${r}</span>`).join("")}</div>
      </div>
      <div class="detail-block">
        <div class="detail-label">代表庄园 / 合作社</div>
        <ul>${c.estates.map(e => `<li>${e}</li>`).join("")}</ul>
      </div>
      <div class="detail-grid">
        <div><strong>常见品种</strong><span>${c.varieties.join(" · ")}</span></div>
        <div><strong>采收窗口</strong><span>${c.harvest}</span></div>
      </div>
      <div class="purchase-note">${c.purchase}</div>
    </div>
  `;
  dialog.hidden = false;
  document.body.classList.add("dialog-open");
  renderCountryMap(c);
}

function renderCountryMap(country) {
  const svg = document.getElementById("countryMapSvg");
  if (!svg) return;

  const width = 420;
  const height = 240;
  const renderMapError = () => {
    svg.innerHTML = `<text class="map-loading" x="210" y="112" text-anchor="middle">国家地图暂时加载失败</text>
      <text class="map-loading map-loading-sub" x="210" y="134" text-anchor="middle">可继续查看下方产区列表</text>`;
  };

  if (!window.d3 || !window.topojson || !country.mapId) {
    renderMapError();
    return;
  }

  loadWorldMapFeatures()
    .then(features => {
      const feature = features.find(item => String(item.id).padStart(3, "0") === country.mapId);
      if (!feature) {
        renderMapError();
        return;
      }

      const projection = d3.geoMercator().fitExtent([[28, 22], [width - 28, height - 24]], feature);
      const path = d3.geoPath(projection);
      const points = (country.regionPoints || []).map((point, index) => {
        const projected = projection([point.lon, point.lat]) || [width / 2, height / 2];
        const labelAnchor = projected[0] > width * 0.62 ? "end" : "start";
        const labelX = labelAnchor === "end" ? projected[0] - 10 : projected[0] + 10;
        return { ...point, index, x: projected[0], y: projected[1], labelAnchor, labelX };
      });
      const chinaTaiwanOverlay = country.mapId === "156"
        ? (() => {
          const taiwan = projection([121.0, 23.7]);
          if (!taiwan) return "";
          const [tx, ty] = taiwan;
          return `
            <g class="country-extra-island">
              <ellipse cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" rx="5.2" ry="12.2" transform="rotate(-18 ${tx.toFixed(1)} ${ty.toFixed(1)})"></ellipse>
              <text class="extra-island-label" x="${(tx - 8).toFixed(1)}" y="${(ty + 22).toFixed(1)}" text-anchor="end">台湾</text>
            </g>
          `;
        })()
        : "";

      svg.innerHTML = `
        <defs>
          <filter id="mapShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#2A1B12" flood-opacity="0.16"/>
          </filter>
        </defs>
        <path class="country-shape" d="${path(feature)}" filter="url(#mapShadow)"></path>
        ${chinaTaiwanOverlay}
        ${points.map(point => `
          <g class="map-pin-svg" transform="translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})">
            <circle class="pin-halo" r="10"></circle>
            <circle class="pin-dot" r="4.8"></circle>
          </g>
          <text class="pin-label" x="${point.labelX.toFixed(1)}" y="${(point.y - 7).toFixed(1)}" text-anchor="${point.labelAnchor}">
            ${point.index + 1}. ${point.name}
          </text>
        `).join("")}
      `;
    })
    .catch(renderMapError);
}

function closeCountryDialog() {
  const dialog = document.getElementById("countryDialog");
  if (!dialog) return;
  dialog.hidden = true;
  document.body.classList.remove("dialog-open");
}

/* ---------- NAV SCROLL SPY ---------- */

function bindScrollSpy() {
  const links = Array.from(document.querySelectorAll(".nav a[data-nav]"));
  const sections = links
    .map(l => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          const active = l.getAttribute("href") === `#${id}`;
          l.classList.toggle("active", active);
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/* ---------- MOBILE NAV ---------- */

function bindMobileNav() {
  const toggle = document.getElementById("mobileToggle");
  const sidebar = document.getElementById("sidebar");
  if (!toggle || !sidebar) return;
  toggle.addEventListener("click", () => sidebar.classList.toggle("open"));
  // close on link click (mobile)
  sidebar.querySelectorAll(".nav a").forEach(a => {
    a.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 960px)").matches) {
        sidebar.classList.remove("open");
      }
    });
  });
}

/* ---------- INIT ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderCountries();
  renderConditions();
  renderProcesses();
  renderProducts();
  renderRecommender();
  renderPrices();
  bindFilters();
  bindCountryDetails();
  bindScrollSpy();
  bindMobileNav();
});
