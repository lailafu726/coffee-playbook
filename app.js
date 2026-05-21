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
    production: 65.0, share: 36.3,
    bean: "mixed",
    beanLabel: "Arabica 主 + Conilon Robusta",
    flavor: ["醇厚", "巧克力", "坚果", "低酸"],
    note: "全球第一大产国，定义商业 Arabica 基准",
    regions: ["Sul de Minas", "Cerrado Mineiro", "Mogiana", "Espírito Santo"],
    estates: ["Fazenda Cachoeira", "Fazenda Santa Alina", "Fazenda São Francisco", "Nossa Senhora de Fatima"],
    varieties: ["Mundo Novo", "Catuaí", "Yellow Bourbon", "Conilon"],
    harvest: "5–9 月主采，机械化程度高",
    purchase: "适合做意式基底、商业拼配和低酸巧克力调单品。",
    color: "linear-gradient(135deg,#3F6B3A,#7BA05B,#E8C570)"
  },
  {
    rank: 2, name: "越南", en: "Vietnam",
    production: 31.0, share: 17.3,
    bean: "robusta",
    beanLabel: "Robusta 主导（>95%）",
    flavor: ["浓苦", "焦烤", "高咖啡因", "醇厚"],
    note: "世界 Robusta 主产国，速溶与意式拼配支柱",
    regions: ["Đắk Lắk", "Lâm Đồng", "Gia Lai", "Đắk Nông", "Kon Tum"],
    estates: ["Buôn Ma Thuột 小农批次", "Cầu Đất Arabica", "Lam Dong 合作社"],
    varieties: ["Robusta", "Catimor", "Typica 少量"],
    harvest: "10–1 月主采，中部高原集中上市",
    purchase: "适合速溶、奶咖、意式 crema 和成本敏感型拼配。",
    color: "linear-gradient(135deg,#B7282E,#D8B73A,#3F4B5C)"
  },
  {
    rank: 3, name: "哥伦比亚", en: "Colombia",
    production: 13.0, share: 7.3,
    bean: "arabica",
    beanLabel: "100% Arabica（水洗）",
    flavor: ["明亮酸", "焦糖", "红苹果", "干净"],
    note: "全球水洗 Arabica 标杆，Supremo / Excelso 分级",
    regions: ["Huila", "Nariño", "Tolima", "Cauca", "Antioquia"],
    estates: ["Finca El Diviso", "Finca La Palma y El Tucán", "Finca El Paraíso", "小农合作社微批次"],
    varieties: ["Caturra", "Castillo", "Colombia", "Bourbon"],
    harvest: "南北产区错峰，全年有货源窗口",
    purchase: "适合稳定水洗单品、门店常规手冲和单品意式。",
    color: "linear-gradient(135deg,#FCD116,#003893,#CE1126)"
  },
  {
    rank: 4, name: "印度尼西亚", en: "Indonesia",
    production: 10.5, share: 5.9,
    bean: "mixed",
    beanLabel: "Robusta 75% + Arabica 25%",
    flavor: ["低酸", "土味", "草本", "厚 body"],
    note: "湿刨法 Mandheling 风格独特，苏门答腊代表",
    regions: ["Aceh Gayo", "Lintong", "Mandheling / Tapanuli", "Java Ijen", "Sulawesi Toraja"],
    estates: ["Blawan Estate", "Jampit Estate", "Kayumas Estate", "Gayo 小农合作社"],
    varieties: ["Typica", "Catimor", "S-795", "Robusta"],
    harvest: "多岛屿错峰，苏门答腊常见小农湿刨批次",
    purchase: "适合低酸厚重型拼配、深烘单品和 Mocha-Java 风格。",
    color: "linear-gradient(135deg,#B7282E,#3F4B5C,#1F2933)"
  },
  {
    rank: 5, name: "埃塞俄比亚", en: "Ethiopia",
    production: 8.4, share: 4.7,
    bean: "arabica",
    beanLabel: "100% Arabica（古老原生种）",
    flavor: ["花香", "柑橘", "蓝莓", "茶感"],
    note: "咖啡发源地，Yirgacheffe / Sidamo / Guji 三大产区",
    regions: ["Yirgacheffe", "Sidamo", "Guji", "Harrar", "Jimma / Limu"],
    estates: ["Chelbesa washing station", "Konga cooperative", "Bensa washing station", "Kayon Mountain"],
    varieties: ["Heirloom", "JARC 74110", "JARC 74112"],
    harvest: "10–1 月采收，水洗站批次差异明显",
    purchase: "适合花果香手冲、浅烘精品和风味教育菜单。",
    color: "linear-gradient(135deg,#078930,#FCDD09,#DA121A)"
  },
  {
    rank: 6, name: "乌干达", en: "Uganda",
    production: 6.8, share: 3.8,
    bean: "mixed",
    beanLabel: "Robusta 80% + Arabica 20%",
    flavor: ["扎实", "巧克力", "黑糖", "中等酸"],
    note: "非洲第二大产国，Robusta 原生地之一",
    regions: ["Bugisu / Mount Elgon", "Rwenzori", "Kisoro", "Central Robusta belt"],
    estates: ["Kawacom Sipi Falls", "Kisinga washing station", "Kisoro Estate"],
    varieties: ["Robusta 原生系", "SL14", "SL28", "Nyasaland"],
    harvest: "Arabica 与 Robusta 分区错峰，出口节奏灵活",
    purchase: "适合非洲 Robusta、巧克力调拼配和价格替代来源。",
    color: "linear-gradient(135deg,#000000,#FCDC04,#D90000)"
  },
  {
    rank: 7, name: "印度", en: "India",
    production: 6.0, share: 3.4,
    bean: "mixed",
    beanLabel: "Robusta 70% + Arabica 30%",
    flavor: ["浓郁", "香料", "黑巧克力", "低酸"],
    note: "Monsooned Malabar 季风处理工艺独特",
    regions: ["Karnataka", "Kerala", "Tamil Nadu", "Bababudangiri", "Coorg"],
    estates: ["Tata Coffee estates", "Badra Estate", "Balanoor Estate", "Riverdale Estate"],
    varieties: ["S-795", "SLN9", "Cauvery", "Robusta"],
    harvest: "11–3 月，季风马拉巴另有熟成周期",
    purchase: "适合香料调意式、季风处理特色豆和 Robusta 拼配。",
    color: "linear-gradient(135deg,#FF9933,#FFFFFF,#138808)"
  },
  {
    rank: 8, name: "洪都拉斯", en: "Honduras",
    production: 5.7, share: 3.2,
    bean: "arabica",
    beanLabel: "100% Arabica（水洗）",
    flavor: ["焦糖", "柑橘", "干净", "平衡"],
    note: "中美洲第二大 Arabica 产国，价格友好",
    regions: ["Copán", "Marcala / Montecillos", "Opalaca", "El Paraíso", "Comayagua"],
    estates: ["Finca El Puente", "Finca Liquidambar", "COMSA cooperative", "Café de Marcala producers"],
    varieties: ["Bourbon", "Caturra", "Catuaí", "Pacas", "Parainema"],
    harvest: "11–4 月，高海拔产区后段更集中",
    purchase: "适合性价比精品、稳定水洗拼配和中美洲风味替代。",
    color: "linear-gradient(135deg,#0073CF,#FFFFFF,#0073CF)"
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
            <div class="share-bar-track"><div class="share-bar-fill" style="width:${Math.min(c.share * 2.4, 100)}%"></div></div>
          </div>
        </div>
        <div>
          <span class="bean-tag bean-${c.bean === 'mixed' ? 'mixed' : c.bean}">${c.beanLabel}</span>
        </div>
        <p style="font-size:var(--text-sm);color:var(--ink-2);line-height:1.55">${c.note}</p>
        <div class="flavor-tags">
          ${c.flavor.map(f => `<span class="flavor-tag">${f}</span>`).join("")}
        </div>
        <button class="country-toggle" type="button" data-country-toggle="${index}" aria-expanded="false">
          <span>查看核心产区与庄园</span>
          <span class="toggle-arrow">⌄</span>
        </button>
        <div class="country-details" id="country-details-${index}" hidden>
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
      </div>
    </article>
  `).join("");
}

function renderConditions() {
  const grid = document.getElementById("conditionsGrid");
  grid.innerHTML = CONDITIONS.map(c => `
    <article class="condition visual-condition" data-motion="${c.motion}">
      <div class="condition-top">
        <div class="condition-icon">${ICONS[c.icon] || ""}</div>
        <div>
          <h4>${c.name}</h4>
          <span>${c.metric}</span>
        </div>
      </div>
      <div class="condition-bars">
        <div class="species-meter arabica-meter">
          <div class="meter-row"><span>Arabica</span><strong>${c.arabicaLevel}</strong></div>
          <div class="meter-track"><i style="--target:${c.arabicaLevel}%"></i></div>
          <p>${c.arabica}</p>
        </div>
        <div class="species-meter robusta-meter">
          <div class="meter-row"><span>Robusta</span><strong>${c.robustaLevel}</strong></div>
          <div class="meter-track"><i style="--target:${c.robustaLevel}%"></i></div>
          <p>${c.robusta}</p>
        </div>
      </div>
      <div class="visual-note">${c.visual}</div>
    </article>
  `).join("");
}

function renderPrices() {
  const wrap = document.getElementById("priceViz");
  if (!wrap) return;
  const max = Math.max(...PRICES.map(p => p.value));
  wrap.innerHTML = `
    <div class="price-dashboard">
      <div class="price-ladder">
        ${PRICES.map((p, i) => `
          <article class="price-tile ${p.level}" style="--bar:${(p.value / max * 100).toFixed(1)}%; --delay:${i * 70}ms">
            <div class="price-tile-main">
              <div>
                <h4>${p.name}</h4>
                <span>${p.cn} · ${p.type}</span>
              </div>
              <strong>${p.value.toFixed(2)}<small>¢/lb</small></strong>
            </div>
            <div class="price-rail"><i></i></div>
            <p>${p.note}</p>
          </article>
        `).join("")}
      </div>
      <aside class="price-flow" aria-label="咖啡价格形成链条">
        <div class="flow-node futures"><span>01</span><strong>ICE 期货</strong><p>全球交易锚点</p></div>
        <div class="flow-arrow">↓</div>
        <div class="flow-node ico"><span>02</span><strong>ICO 指标价</strong><p>跨组别市场温度计</p></div>
        <div class="flow-arrow">↓</div>
        <div class="flow-node origin"><span>03</span><strong>FOB / Farmgate</strong><p>产地升贴水与出口成本</p></div>
        <div class="flow-arrow">↓</div>
        <div class="flow-node specialty"><span>04</span><strong>精品溢价</strong><p>杯测分、稀缺品种、庄园批次</p></div>
      </aside>
    </div>
    <div class="price-callouts">
      <div><strong>Arabica vs Robusta</strong><span>NY Arabica 与 London Robusta 价差约 134 ¢/lb，决定拼配成本结构。</span></div>
      <div><strong>水洗溢价</strong><span>Colombian Milds / Other Milds 位于价格顶部，反映高海拔水洗稳定性。</span></div>
      <div><strong>采购动作</strong><span>商业豆看期货和升贴水，精品豆看杯测分、微批次和可追溯性。</span></div>
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
  document.querySelectorAll("[data-country-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const details = document.getElementById(`country-details-${btn.dataset.countryToggle}`);
      if (!details) return;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      btn.closest(".country-card")?.classList.toggle("expanded", !expanded);
      details.hidden = expanded;
    });
  });
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
  renderPrices();
  bindFilters();
  bindCountryDetails();
  bindScrollSpy();
  bindMobileNav();
});
