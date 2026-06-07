const NATURE_META = {
  寒: { tone: "#507b8c", pale: "#e1edf0", label: "偏寒" },
  凉: { tone: "#6f98a4", pale: "#e9f1f2", label: "偏凉" },
  平: { tone: "#817964", pale: "#eee9dd", label: "平和" },
  温: { tone: "#b36a45", pale: "#f4e5da", label: "偏温" },
  热: { tone: "#a94a38", pale: "#f4dfda", label: "偏热" },
  复合: { tone: "#756c82", pale: "#eeeaf2", label: "复合" }
};

const REGION_LABELS = {
  CN: "中国",
  JP: "日本",
  KR: "韩国",
  US: "美国",
  UK: "英国",
  SG: "新加坡",
  MY: "马来西亚",
  TH: "泰国",
  FR: "法国",
  DE: "德国",
  AU: "澳大利亚",
  RU: "俄罗斯",
  IN: "印度",
  AR: "阿根廷",
  IT: "意大利",
  NZ: "新西兰",
  ES: "西班牙",
  VN: "越南",
  ID: "印度尼西亚",
  PH: "菲律宾",
  CA: "加拿大",
  MX: "墨西哥",
  BR: "巴西",
  NL: "荷兰",
  CH: "瑞士",
  SE: "瑞典",
  NO: "挪威",
  PT: "葡萄牙",
  GR: "希腊",
  TR: "土耳其",
  EG: "埃及",
  SA: "沙特阿拉伯",
  AE: "阿联酋",
  IL: "以色列",
  PK: "巴基斯坦",
  BD: "孟加拉国",
  LK: "斯里兰卡",
  MM: "缅甸",
  KH: "柬埔寨",
  LA: "老挝",
  NP: "尼泊尔",
  MN: "蒙古"
};

const QI_TERM_META = {
  行气: { tone: "#4a7c59", pale: "#e3f0e8", hint: "气机郁滞 · 饭后胀" },
  理气: { tone: "#8a7340", pale: "#f3ecda", hint: "嗳气 · 胃堵 · 胀满" },
  破气: { tone: "#a65d45", pale: "#f5e8e2", hint: "积滞 · 行气偏猛" },
  降气: { tone: "#6b5b8a", pale: "#ece8f2", hint: "反胃 · 嗳气上逆" }
};

const QI_TERMS_HOME = ["行气", "理气", "破气", "降气"];
const PROVINCE_FILTER_EXPAND_LIMIT = 12;
const ETHNIC_FILTER_EXPAND_LIMIT = 10;
const PAIRING_CATEGORY_ORDER = ["现代安全", "传统食养", "民间迷思"];

function isCountryCodeTag(tag) {
  return /^[A-Z]{2,3}$/.test(tag);
}

function isProvinceFilterTag(tag) {
  if (!tag || isCountryCodeTag(tag) || REGION_LABELS[tag]) return false;
  if (CN_PROVINCES.includes(tag)) return true;
  return /[\u4e00-\u9fff]/.test(tag);
}

function regionDisplayLabel(tag) {
  return REGION_LABELS[tag] || tag;
}

const CN_PROVINCES = [
  "北京", "天津", "上海", "重庆", "河北", "山西", "辽宁", "吉林", "黑龙江",
  "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南",
  "广东", "海南", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "台湾",
  "内蒙古", "广西", "西藏", "宁夏", "新疆", "香港", "澳门"
];

const CN_ETHNIC_GROUPS = [
  "汉族", "壮族", "回族", "满族", "维吾尔族", "苗族", "彝族", "土家族", "藏族",
  "蒙古族", "侗族", "布依族", "瑶族", "朝鲜族", "白族", "哈尼族", "哈萨克族",
  "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族",
  "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族", "柯尔克孜族",
  "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族",
  "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族",
  "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族",
  "塔塔尔族", "赫哲族", "珞巴族"
];

const CATEGORY_ORDER = [
  "食药物质",
  "中药材",
  "调料",
  "茶饮",
  "饮品",
  "谷物",
  "主食",
  "豆类",
  "豆制品",
  "蔬菜",
  "野菜",
  "水生蔬菜",
  "菌菇",
  "水果",
  "肉蛋奶",
  "海产",
  "坚果种子",
  "发酵食品",
  "腌菜",
  "薯类",
  "滋补食材"
];

const PROFILE_OPTIONS = [
  { id: "medication", label: "正在服用处方药或长期用药" },
  { id: "pregnancy", label: "孕期、哺乳期或备孕" },
  { id: "reflux", label: "胃食管反流或胃部敏感" },
  { id: "diarrhea", label: "容易腹泻、怕冷或消化较弱" },
  { id: "iron", label: "缺铁、贫血或关注铁吸收" },
  { id: "hypertension", label: "高血压、心脏或肾脏问题" }
];

const QUICK_TERMS = ["行气", "理气", "破气", "降气", "药食同源"];

const RECIPE_SCENARIO_SHORTCUTS = [
  { label: "想暖胃", nature: "温", syndrome: "全部" },
  { label: "饭后胀满", nature: "全部", syndrome: "肝胃不和" },
  { label: "想润燥", nature: "凉", syndrome: "胃阴虚" },
  { label: "健脾祛湿", nature: "平", syndrome: "痰湿困脾" },
  { label: "气虚乏力", nature: "全部", syndrome: "脾气虚" },
  { label: "干咳咽干", nature: "凉", syndrome: "肺阴虚" },
  { label: "暑湿困重", nature: "全部", syndrome: "湿热内蕴" },
  { label: "情绪郁闷", nature: "全部", syndrome: "肝郁气滞" }
];

const RECIPE_SEASON_SHORTCUTS = [
  { label: "春令", season: "春季" },
  { label: "夏令", season: "夏季" },
  { label: "秋令", season: "秋季" },
  { label: "冬令", season: "冬季" },
  { label: "芒种", season: "夏季", timing: "午餐" },
  { label: "四时", season: "四季" }
];

const RECIPE_SOLAR_TERM_SHORTCUTS = [
  { label: "立春", solarTerm: "立春", season: "春季" },
  { label: "雨水", solarTerm: "雨水", season: "春季" },
  { label: "春分", solarTerm: "春分", season: "春季" },
  { label: "清明", solarTerm: "清明", season: "春季" },
  { label: "小满", solarTerm: "小满", season: "夏季" },
  { label: "夏至", solarTerm: "夏至", season: "夏季" },
  { label: "小暑", solarTerm: "小暑", season: "夏季" },
  { label: "大暑", solarTerm: "大暑", season: "夏季" },
  { label: "立秋", solarTerm: "立秋", season: "秋季" },
  { label: "秋分", solarTerm: "秋分", season: "秋季" },
  { label: "白露", solarTerm: "白露", season: "秋季" },
  { label: "霜降", solarTerm: "霜降", season: "秋季" },
  { label: "立冬", solarTerm: "立冬", season: "冬季" },
  { label: "冬至", solarTerm: "冬至", season: "冬季" },
  { label: "小雪", solarTerm: "小雪", season: "冬季" },
  { label: "大寒", solarTerm: "大寒", season: "冬季" }
];

const LIBRARY_QI_TOPICS = ["药食同源", "中药材", "行气", "理气", "破气", "降气"];
const LIBRARY_TEA_TOPICS = ["茶", "绿茶", "白茶", "黄茶", "乌龙茶", "黑茶", "红茶"];

const RECENT_LIMIT = 12;

const EXTRA_SHORTCUTS = {
  "辣椒": ["lj"],
  "空心菜": ["kxc"],
  "豆浆": ["dj"],
  "皮蛋": ["pd"],
  "田螺": ["tl"],
  "鸭血": ["yx"],
  "木姜子": ["mjz"],
  "红菇": ["hg"],
  "见手青": ["jsq"],
  "香兰叶": ["xly"],
  "咖椰酱": ["kyj"],
  "参巴酱": ["cbj"],
  "马六甲椰糖": ["mljyt"],
  "冬阴功酱": ["dygj"],
  "南姜": ["nj"],
  "卡菲尔酸橙叶": ["kfescy"],
  "第戎芥末": ["drjm"],
  "普罗旺斯香草": ["plwsxc"],
  "澳洲坚果": ["azjg"],
  "指橙": ["zc"],
  "维吉麦": ["wjm"],
  "斯美塔那酸奶油": ["smtn"]
};

const FOOD_SEARCH_INDEX = [
  { name: "肉苁蓉", aliases: ["苁蓉", "大芸", "甜苁蓉", "荒漠肉苁蓉"], pinyin: "roucongrong", initials: "rcr", regional: ["内蒙古苁蓉", "新疆大芸"], english: ["cistanche"] },
  { name: "铁皮石斛", aliases: ["铁皮枫斗", "枫斗", "霍山石斛", "石斛"], pinyin: "tiepishihu", initials: "tpsh", regional: ["浙石斛", "霍斗"], english: ["dendrobium"] },
  { name: "白术", aliases: ["於术", "冬术", "浙术"], pinyin: "baizhu", initials: "bz", regional: ["浙江白术"], english: ["atractylodes"] },
  { name: "螃蟹", aliases: ["蟹", "河蟹", "大闸蟹", "毛蟹"], pinyin: "pangxie", initials: "px", regional: ["湖蟹", "清水蟹"], english: ["crab"] },
  { name: "虾", aliases: ["鲜虾", "海虾", "河虾"], pinyin: "xia", initials: "x", regional: ["虾仁"], english: ["shrimp", "prawn"] },
  { name: "龙虾", aliases: ["大龙虾", "澳龙", "波龙"], pinyin: "longxia", initials: "lx", regional: ["澳洲龙虾", "波士顿龙虾"], english: ["lobster"] },
  { name: "黑虎虾", aliases: ["草虾", "斑节虾"], pinyin: "heihuxia", initials: "hhx", regional: ["虎虾"], english: ["black tiger shrimp"] },
  { name: "南美白对虾", aliases: ["白虾", "凡纳滨对虾"], pinyin: "nanmeibaiduixia", initials: "nmbdx", regional: ["南美白虾"], english: ["whiteleg shrimp"] },
  { name: "竹节虾", aliases: ["竹节对虾", "九节虾"], pinyin: "zhujiexia", initials: "zjx", regional: ["花虾"], english: ["kuruma prawn"] },
  { name: "明虾", aliases: ["对虾", "大明虾"], pinyin: "mingxia", initials: "mx", regional: ["海捕明虾"], english: ["prawn"] },
  { name: "阿根廷红虾", aliases: ["红虾", "阿根廷甜虾"], pinyin: "agentinghongxia", initials: "agthx", regional: ["船冻红虾"], english: ["argentine red shrimp"] },
  { name: "基围虾", aliases: ["基围", "沙虾"], pinyin: "jiweixia", initials: "jwx", regional: ["广东基围虾"], english: ["greasyback shrimp"] },
  { name: "鱼", aliases: ["鲜鱼", "鱼肉"], pinyin: "yu", initials: "y", regional: ["淡水鱼", "海鱼"], english: ["fish"] },
  { name: "斑斓叶", aliases: ["班兰叶", "香兰叶", "香茅兰"], pinyin: "banlanye", initials: "bly", regional: ["新加坡班兰", "马来香兰叶"], english: ["pandan", "pandan leaf"] },
  { name: "桃", aliases: ["桃子", "水蜜桃", "毛桃"], pinyin: "tao", initials: "t", regional: ["奉化水蜜桃", "阳山水蜜桃"], english: ["peach"] },
  { name: "榴莲", aliases: ["榴梿", "金枕榴莲", "猫山王"], pinyin: "liulian", initials: "ll", regional: ["泰国金枕", "马来猫山王"], english: ["durian"] },
  { name: "米", aliases: ["大米", "粳米", "籼米"], pinyin: "mi", initials: "m", regional: ["柴米油盐酱醋茶"], english: ["rice"] },
  { name: "油", aliases: ["食用油", "菜籽油", "花生油", "芝麻油"], pinyin: "you", initials: "y", regional: ["柴米油盐酱醋茶"], english: ["cooking oil"] },
  { name: "盐", aliases: ["食盐", "海盐", "井盐"], pinyin: "yan", initials: "y", regional: ["柴米油盐酱醋茶"], english: ["salt"] },
  { name: "酱", aliases: ["酱油", "黄豆酱", "豆瓣酱", "甜面酱"], pinyin: "jiang", initials: "j", regional: ["柴米油盐酱醋茶"], english: ["sauce", "soy sauce"] },
  { name: "醋", aliases: ["米醋", "陈醋", "香醋", "镇江香醋"], pinyin: "cu", initials: "c", regional: ["柴米油盐酱醋茶"], english: ["vinegar"] },
  { name: "甲鱼", aliases: ["鳖", "团鱼", "水鱼"], pinyin: "jiayu", initials: "jy", regional: ["湖北甲鱼", "江浙团鱼"], english: ["softshell turtle"] },
  { name: "罗非鱼", aliases: ["罗非", "非洲鲫鱼"], pinyin: "luofeiyu", initials: "lfy", regional: ["广东罗非", "海南罗非"], english: ["tilapia"] },
  { name: "黑鱼", aliases: ["乌鳢", "财鱼", "生鱼"], pinyin: "heiyu", initials: "hy", regional: ["湖北财鱼", "广东生鱼"], english: ["snakehead"] },
  { name: "鲫鱼", aliases: ["鲫瓜子"], pinyin: "jiyu", initials: "jy", regional: ["鲫鱼汤"], english: ["crucian carp"] },
  { name: "鲤鱼", aliases: [], pinyin: "liyu", initials: "ly", regional: ["黄河鲤鱼"], english: ["carp"] },
  { name: "草鱼", aliases: ["鲩鱼", "脆肉鲩", "脆肉皖"], pinyin: "caoyu", initials: "cy", regional: ["广东鲩鱼", "中山脆肉鲩"], english: ["grass carp"] },
  { name: "笋壳鱼", aliases: ["尖塘鳢", "珍珠笋壳鱼"], pinyin: "sunkaiyu", initials: "sky", regional: ["华南笋壳鱼"], english: ["marble goby"] },
  { name: "鳜鱼", aliases: ["桂鱼", "季花鱼"], pinyin: "guiyu", initials: "gy", regional: ["松鼠桂鱼"], english: ["mandarin fish"] },
  { name: "鲶鱼", aliases: ["胡子鲶"], pinyin: "nianyu", initials: "ny", regional: ["塘鲺"], english: ["catfish"] },
  { name: "黄骨鱼", aliases: ["黄颡鱼", "嘎鱼", "昂刺鱼"], pinyin: "huangguyu", initials: "hgy", regional: ["湖北黄骨鱼", "江西昂刺鱼"], english: ["yellow catfish"] },
  { name: "驴肉", aliases: ["驴肉火烧料"], pinyin: "lvrou", initials: "lr", regional: ["保定驴肉", "河间驴肉火烧"], english: ["donkey meat"] },
  { name: "兔肉", aliases: [], pinyin: "turou", initials: "tr", regional: ["四川兔", "冷吃兔"], english: ["rabbit meat"] },
  { name: "乳鸽", aliases: ["鸽子"], pinyin: "ruge", initials: "rg", regional: ["广东乳鸽"], english: ["young pigeon"] },
  { name: "白蘑菇", aliases: ["白蘑", "口蘑"], pinyin: "baimogu", initials: "bmg", regional: ["张北口蘑", "内蒙古白蘑"], english: ["button mushroom"] },
  { name: "草菇", aliases: [], pinyin: "caogu", initials: "cg", regional: ["广东草菇"], english: ["straw mushroom"] },
  { name: "鸡枞", aliases: ["鸡枞菌"], pinyin: "jizong", initials: "jz", regional: ["云南鸡枞"], english: ["termitomyces"] },
  { name: "松茸", aliases: [], pinyin: "songrong", initials: "sr", regional: ["香格里拉松茸"], english: ["matsutake"] },
  { name: "牛肝菌", aliases: [], pinyin: "niuganjun", initials: "ngj", regional: ["云南牛肝菌"], english: ["boletus"] },
  { name: "红菜苔", aliases: ["菜苔", "紫菜苔"], pinyin: "hongcaitai", initials: "hct", regional: ["武汉红菜苔"], english: ["purple cai tai"] },
  { name: "夜香花", aliases: ["夜来香花", "夜香花蕾"], pinyin: "yexianghua", initials: "yxh", regional: ["广东夜香花"], english: ["night blooming flower"] },
  { name: "芥兰", aliases: ["广东芥兰"], pinyin: "jielan", initials: "jl", regional: ["粤式芥兰"], english: ["gai lan", "Chinese broccoli"] },
  { name: "红脚芥兰", aliases: ["红梗芥兰"], pinyin: "hongjiaojielan", initials: "hjjl", regional: ["潮汕红脚芥兰"], english: ["red stem gai lan"] },
  { name: "麻叶", aliases: ["芝麻叶", "麻叶菜"], pinyin: "maye", initials: "my", regional: ["河南麻叶菜"], english: ["sesame leaf"] },
  { name: "折耳根", aliases: ["鱼腥草", "折耳根菜"], pinyin: "zheergen", initials: "zeg", regional: ["贵州折耳根", "云南折耳根"], english: ["houttuynia"] },
  { name: "莴笋", aliases: ["莴苣笋"], pinyin: "wosun", initials: "ws", regional: ["川式莴笋"], english: ["celtuce"] },
  { name: "荸荠", aliases: ["马蹄", "地栗"], pinyin: "biqi", initials: "bq", regional: ["广东马蹄"], english: ["water chestnut"] },
  { name: "莼菜", aliases: ["水葵"], pinyin: "chuncai", initials: "cc", regional: ["西湖莼菜"], english: ["water shield"] },
  { name: "香椿", aliases: ["香椿芽"], pinyin: "xiangchun", initials: "xc", regional: ["华北香椿"], english: ["toon bud"] },
  { name: "茭白", aliases: ["高笋"], pinyin: "jiaobai", initials: "jb", regional: ["江南茭白"], english: ["water bamboo"] },
  { name: "酸笋", aliases: ["酸竹笋", "发酵笋"], pinyin: "suansun", initials: "ss", regional: ["广西酸笋"], english: ["sour bamboo shoot"] },
  { name: "哈密瓜", aliases: ["新疆哈密瓜"], pinyin: "hamigua", initials: "hmg", regional: ["新疆哈密瓜"], english: ["hami melon"] },
  { name: "莲雾", aliases: ["洋蒲桃"], pinyin: "lianwu", initials: "lw", regional: ["台湾莲雾"], english: ["wax apple"] },
  { name: "菠萝蜜", aliases: ["木菠萝"], pinyin: "boluomi", initials: "blm", regional: ["海南菠萝蜜"], english: ["jackfruit"] },
  { name: "竹荪", aliases: ["竹笙"], pinyin: "zhusun", initials: "zs", regional: ["云南竹荪", "贵州竹荪"], english: ["bamboo fungus"] },
  { name: "干巴菌", aliases: [], pinyin: "ganbajun", initials: "gbj", regional: ["云南干巴菌"], english: ["thelephora"] },
  { name: "羊肚菌", aliases: [], pinyin: "yangdujun", initials: "ydj", regional: ["川滇羊肚菌"], english: ["morel"] },
  { name: "木姜叶", aliases: ["山胡椒叶", "木姜菜"], pinyin: "mujiangye", initials: "mjy", regional: ["贵州木姜叶", "侗族香料", "土家木姜菜"], english: ["wild pepper leaf"] },
  { name: "红酸汤", aliases: ["凯里酸汤", "番茄酸汤"], pinyin: "hongsuantang", initials: "hst", regional: ["贵州苗族酸汤", "侗族酸汤"], english: ["red sour soup"] },
  { name: "糍粑辣椒", aliases: ["贵州糍粑海椒"], pinyin: "cibalajiao", initials: "cblj", regional: ["贵州糍粑辣椒"], english: ["pounded chili paste"] },
  { name: "榨菜", aliases: ["涪陵榨菜"], pinyin: "zhacai", initials: "zc", regional: ["重庆涪陵榨菜"], english: ["preserved mustard stem"] },
  { name: "芽菜", aliases: ["宜宾芽菜", "碎米芽菜"], pinyin: "yacai", initials: "yc", regional: ["四川宜宾芽菜"], english: ["preserved yacai"] },
  { name: "泡椒", aliases: ["泡海椒"], pinyin: "paojiao", initials: "pj", regional: ["川渝泡椒"], english: ["pickled chili"] },
  { name: "菜心", aliases: ["广东菜心"], pinyin: "caixin", initials: "cx", regional: ["粤式菜心"], english: ["choy sum"] },
  { name: "西洋菜", aliases: ["豆瓣菜"], pinyin: "xiyangcai", initials: "xyc", regional: ["港式西洋菜"], english: ["watercress"] },
  { name: "枸杞叶", aliases: ["枸杞苗"], pinyin: "gouqiye", initials: "gqy", regional: ["客家枸杞叶汤"], english: ["wolfberry leaf"] },
  { name: "五指毛桃", aliases: ["南芪", "土黄芪"], pinyin: "wuzhimaotao", initials: "wzmt", regional: ["客家煲汤料"], english: ["radix fici hirtae"] },
  { name: "土茯苓", aliases: ["硬饭头", "土萆薢"], pinyin: "tufuling", initials: "tfl", regional: ["岭南土茯苓"], english: ["smilax glabra"] },
  { name: "沙姜", aliases: ["山柰"], pinyin: "shajiang", initials: "sj", regional: ["广西沙姜", "广东沙姜"], english: ["sand ginger"] },
  { name: "生蚝", aliases: ["牡蛎", "蚝"], pinyin: "shenghao", initials: "sh", regional: ["湛江生蚝", "珠海蚝"], english: ["oyster"] },
  { name: "花甲", aliases: ["蛤蜊", "文蛤"], pinyin: "huajia", initials: "hj", regional: ["粤式花甲"], english: ["clam"] },
  { name: "蛏子", aliases: ["竹蛏"], pinyin: "chengzi", initials: "cz", regional: ["闽浙蛏子"], english: ["razor clam"] },
  { name: "泥螺", aliases: ["黄泥螺"], pinyin: "niluo", initials: "nl", regional: ["宁波泥螺", "上海醉泥螺"], english: ["mud snail"] },
  { name: "河虾", aliases: ["青虾"], pinyin: "hexia", initials: "hx", regional: ["太湖河虾"], english: ["river shrimp"] },
  { name: "刀鱼", aliases: ["长江刀鱼"], pinyin: "daoyu", initials: "dy", regional: ["江阴刀鱼", "上海刀鱼"], english: ["knife fish"] },
  { name: "马兰头", aliases: ["马兰", "鸡儿肠"], pinyin: "malantou", initials: "mlt", regional: ["江南马兰头"], english: ["kalimeris"] },
  { name: "荠菜", aliases: ["地菜"], pinyin: "jicai", initials: "jc", regional: ["江南荠菜", "北方地菜"], english: ["shepherd's purse"] },
  { name: "枇杷", aliases: [], pinyin: "pipa", initials: "pp", regional: ["苏州东山枇杷", "福建枇杷"], english: ["loquat"] },
  { name: "红糟", aliases: ["福州红糟", "红曲糟"], pinyin: "hongzao", initials: "hz", regional: ["福州红糟"], english: ["red yeast rice lees"] },
  { name: "九层塔", aliases: ["罗勒", "台湾九层塔"], pinyin: "jiucengta", initials: "jct", regional: ["台式九层塔"], english: ["basil"] },
  { name: "破布子", aliases: ["树子", "破布果"], pinyin: "pobuzi", initials: "pbz", regional: ["台湾破布子"], english: ["cordia fruit pickle"] },
  { name: "沙葛", aliases: ["凉薯"], pinyin: "shage", initials: "sg", regional: ["闽粤沙葛"], english: ["yam bean"] },
  { name: "榛蘑", aliases: [], pinyin: "zhenmo", initials: "zm", regional: ["东北榛蘑"], english: ["hazel mushroom"] },
  { name: "元蘑", aliases: [], pinyin: "yuanmo", initials: "ym", regional: ["东北元蘑"], english: ["yuan mushroom"] },
  { name: "松子仁", aliases: ["松仁"], pinyin: "songziren", initials: "szr", regional: ["东北松仁"], english: ["pine nut kernel"] },
  { name: "酸菜", aliases: ["东北酸菜", "西北酸菜"], pinyin: "suancai", initials: "sc", regional: ["东北酸菜", "西北酸菜"], english: ["pickled cabbage"] },
  { name: "沙棘果", aliases: ["沙棘"], pinyin: "shajiguo", initials: "sjg", regional: ["西北沙棘"], english: ["sea buckthorn fruit"] },
  { name: "沙棘汁", aliases: ["沙棘饮"], pinyin: "shajizhi", initials: "sjz", regional: ["西北沙棘饮"], english: ["sea buckthorn juice"] },
  { name: "莜麦", aliases: ["燕麦面"], pinyin: "youmai", initials: "ym", regional: ["山西莜麦", "内蒙古莜面"], english: ["naked oats"] },
  { name: "荞面", aliases: ["荞麦面"], pinyin: "qiaomian", initials: "qm", regional: ["西北荞面"], english: ["buckwheat noodle"] },
  { name: "高粱米", aliases: ["红高粱"], pinyin: "gaoliangmi", initials: "glm", regional: ["华北高粱米"], english: ["sorghum grain"] },
  { name: "糜子", aliases: ["黄米"], pinyin: "mizi", initials: "mz", regional: ["陕北糜子"], english: ["broomcorn millet"] },
  { name: "黄花菜", aliases: ["金针菜"], pinyin: "huanghuacai", initials: "hhc", regional: ["山西黄花菜"], english: ["daylily"] },
  { name: "木姜油", aliases: ["木姜子油"], pinyin: "mujiangyou", initials: "mjy", regional: ["贵州木姜油", "苗族木姜油"], english: ["litsea oil"] },
  { name: "白酸汤", aliases: ["清酸汤", "米汤酸汤"], pinyin: "baisuantang", initials: "bst", regional: ["贵州白酸汤"], english: ["white sour soup"] },
  { name: "蘸水", aliases: ["贵州蘸水", "糊辣椒蘸水"], pinyin: "zhanshui", initials: "zs", regional: ["苗家蘸水", "云南蘸水"], english: ["dipping chili sauce"] },
  { name: "刺芫荽", aliases: ["大芫荽", "假香菜"], pinyin: "ciyuansui", initials: "cys", regional: ["傣味刺芫荽", "景颇香草"], english: ["sawtooth coriander"] },
  { name: "水蕨菜", aliases: ["水蕨"], pinyin: "shuijuecai", initials: "sjc", regional: ["贵州水蕨菜"], english: ["water fern"] },
  { name: "蕨菜尖", aliases: ["拳头菜"], pinyin: "juecaijian", initials: "jcj", regional: ["山野蕨菜尖"], english: ["fiddlehead"] },
  { name: "腊肉", aliases: ["熏肉", "苗家腊肉", "川味腊肉"], pinyin: "larou", initials: "lr", regional: ["川渝腊肉", "苗家腊肉"], english: ["cured pork"] },
  { name: "腊排骨", aliases: ["风干排骨"], pinyin: "lapaigu", initials: "lpg", regional: ["纳西腊排骨"], english: ["cured pork ribs"] },
  { name: "腊豆腐", aliases: ["烟熏豆腐"], pinyin: "ladoufu", initials: "ldf", regional: ["贵州腊豆腐"], english: ["smoked tofu"] },
  { name: "凉粉草", aliases: ["仙草"], pinyin: "liangfencao", initials: "lfc", regional: ["客家仙草"], english: ["mesona"] },
  { name: "木棉花", aliases: ["攀枝花"], pinyin: "mumianhua", initials: "mmh", regional: ["广东木棉花"], english: ["kapok flower"] },
  { name: "鸡骨草", aliases: ["黄头草"], pinyin: "jigucao", initials: "jgc", regional: ["广东鸡骨草"], english: ["abrus cantoniensis"] },
  { name: "夏枯草", aliases: ["棒槌草"], pinyin: "xiakucao", initials: "xkc", regional: ["岭南凉茶"], english: ["selfheal spike"] },
  { name: "藿香", aliases: ["广藿香"], pinyin: "huoxiang", initials: "hx", regional: ["广东藿香"], english: ["patchouli"] },
  { name: "虫草花", aliases: ["蛹虫草"], pinyin: "chongcaohua", initials: "cch", regional: ["粤式煲汤料"], english: ["cordyceps flower"] },
  { name: "瑶柱", aliases: ["干贝", "江珧柱"], pinyin: "yaozhu", initials: "yz", regional: ["广东瑶柱"], english: ["dried scallop"] },
  { name: "蚝豉", aliases: ["蚝干"], pinyin: "haochi", initials: "hc", regional: ["粤式蚝豉"], english: ["dried oyster"] },
  { name: "通菜梗", aliases: ["空心菜梗"], pinyin: "tongcaigeng", initials: "tcg", regional: ["粤式通菜梗"], english: ["water spinach stem"] },
  { name: "大头菜", aliases: ["榨菜头", "客家大头菜"], pinyin: "datoucai", initials: "dtc", regional: ["客家大头菜"], english: ["pickled mustard tuber"] },
  { name: "芋荷梗", aliases: ["芋梗"], pinyin: "yuhegeng", initials: "yhg", regional: ["粤式芋荷梗"], english: ["taro stem"] },
  { name: "鳝鱼", aliases: ["黄鳝"], pinyin: "shanyu", initials: "sy", regional: ["江南黄鳝"], english: ["eel"] },
  { name: "鳗鱼", aliases: ["白鳝", "河鳗"], pinyin: "manyu", initials: "my", regional: ["福建河鳗"], english: ["river eel"] },
  { name: "鲳鱼", aliases: ["平鱼", "银鲳"], pinyin: "changyu", initials: "cy", regional: ["东海鲳鱼"], english: ["pomfret"] },
  { name: "带鱼", aliases: [], pinyin: "daiyu", initials: "dy", regional: ["舟山带鱼"], english: ["hairtail"] },
  { name: "海白菜", aliases: ["石莼"], pinyin: "haibaicai", initials: "hbc", regional: ["福建海白菜"], english: ["sea lettuce"] },
  { name: "紫菜", aliases: ["坛紫菜", "条斑紫菜"], pinyin: "zicai", initials: "zc", regional: ["霞浦紫菜"], english: ["laver"] },
  { name: "茴香苗", aliases: ["小茴香苗"], pinyin: "huixiangmiao", initials: "hxm", regional: ["江南茴香苗"], english: ["fennel shoot"] },
  { name: "茨菇", aliases: ["慈姑"], pinyin: "cigu", initials: "cg", regional: ["苏式茨菇"], english: ["arrowhead tuber"] },
  { name: "香橼", aliases: ["香圆"], pinyin: "xiangyuan", initials: "xy", regional: ["浙江香橼"], english: ["citron"] },
  { name: "酒酿", aliases: ["醪糟", "甜酒酿"], pinyin: "jiuniang", initials: "jn", regional: ["江南酒酿"], english: ["fermented rice wine"] },
  { name: "番鸭", aliases: ["麝香鸭"], pinyin: "fanya", initials: "fy", regional: ["福建番鸭"], english: ["muscovy duck"] },
  { name: "山药豆", aliases: ["零余子"], pinyin: "shanyaodou", initials: "syd", regional: ["北方山药豆"], english: ["yam bulbil"] },
  { name: "蒲黄", aliases: ["香蒲黄粉"], pinyin: "puhuang", initials: "ph", regional: ["西北蒲黄"], english: ["cattail pollen"] },
  { name: "百合根", aliases: ["食用百合"], pinyin: "baihegen", initials: "bhg", regional: ["兰州百合"], english: ["lily bulb"] },
  { name: "沙棘叶", aliases: ["沙棘嫩叶"], pinyin: "shajiye", initials: "sjy", regional: ["西北沙棘叶"], english: ["sea buckthorn leaf"] },
  { name: "沙葱", aliases: ["蒙古韭"], pinyin: "shacong", initials: "sc", regional: ["蒙古族沙葱", "宁夏沙葱"], english: ["wild onion"] },
  { name: "黄米", aliases: ["黍米"], pinyin: "huangmi", initials: "hm", regional: ["陕北黄米"], english: ["yellow millet"] },
  { name: "炒米", aliases: ["内蒙古炒米", "蒙古炒米"], pinyin: "chaomi", initials: "cm", regional: ["蒙古族炒米"], english: ["parched millet"] },
  { name: "血肠", aliases: ["东北血肠"], pinyin: "xuechang", initials: "xc", regional: ["东北血肠"], english: ["blood sausage"] },
  { name: "鹿肉", aliases: ["梅花鹿肉"], pinyin: "lurou", initials: "lr", regional: ["东北鹿肉"], english: ["venison"] },
  { name: "榛子", aliases: ["平榛"], pinyin: "zhenzi", initials: "zz", regional: ["东北榛子"], english: ["hazelnut"] },
  { name: "猴头蘑", aliases: [], pinyin: "houtoumo", initials: "htm", regional: ["东北猴头蘑"], english: ["bear's head mushroom"] },
  { name: "厥麻", aliases: ["蕨麻米", "人参果芋"], pinyin: "juema", initials: "jm", regional: ["青海厥麻", "藏区厥麻"], english: ["potentilla anserina"] },
  { name: "羊奶", aliases: ["山羊奶"], pinyin: "yangnai", initials: "yn", regional: ["西北羊奶"], english: ["goat milk"] }
];

const FOOD_SEARCH_INDEX_MAP = new Map(
  FOOD_SEARCH_INDEX.flatMap((entry) => [entry.name, ...(entry.aliases || [])].map((key) => [key, entry]))
);

const CLASSIC_SOURCE_HINTS = {
  山药: ["《神农本草经》", "《本草纲目》", "《饮膳正要》"],
  莲子: ["《本草纲目》", "《养老奉亲书》"],
  黄芪: ["《本草纲目》", "《脾胃论》"],
  银耳: ["《本草从新》", "《随息居饮食谱》"],
  百合: ["《神农本草经》", "《食疗本草》"],
  陈皮: ["《本草纲目》", "《食疗本草》"],
  生姜: ["《神农本草经》", "《千金要方》", "《本草纲目》"],
  干姜: ["《神农本草经》", "《本草纲目》"],
  红枣: ["《本草纲目》", "《千金要方》"],
  党参: ["《本草从新》", "《脾胃论》"],
  茯苓: ["《神农本草经》", "《本草纲目》"]
};

const PAIRING_RULES = typeof PAIRING_RULES_ALL !== "undefined" ? PAIRING_RULES_ALL : [];

const RECIPE_CLASSIC_SOURCES = {
  "ginger-jujube-tea": [{ title: "《千金要方·食治》", summary: "姜枣类饮品常用于温中、和营的日常食治整理。" }, { title: "《饮膳正要》", summary: "将生姜、红枣纳入日常饮食调养场景。" }],
  "yam-red-date-porridge": [{ title: "《本草纲目》", summary: "山药与红枣并用的健脾养胃思路。" }, { title: "《神农本草经》", summary: "山药列为药食同源类平和食材。" }],
  "lotus-lily-congee": [{ title: "《本草纲目》", summary: "莲子、百合用于清心安神、润肺。" }],
  "white-fungus-pear-soup": [{ title: "《随园食单》", summary: "银耳、梨类润燥汤羹的民间食养传统。" }],
  "codonopsis-astragalus-congee": [{ title: "《脾胃论》", summary: "党参、黄芪类补气粥方思路。" }, { title: "《千金要方·食治》", summary: "以粥养脾胃、益气的食治路径。" }],
  "poria-coix-congee": [{ title: "《本草纲目》", summary: "茯苓、薏米渗湿健脾。" }],
  "chenpi-millet-congee": [{ title: "《食疗本草》", summary: "陈皮理气和胃，常与米粥同用。" }],
  "radish-soup": [{ title: "《食疗本草》", summary: "萝卜顺气消食，陈皮和胃。" }],
  "lamb-ginger-soup": [{ title: "《饮膳正要》", summary: "羊肉温补，生姜散寒，为北方常见冬令食养。" }],
  "lotus-root-soup": [{ title: "《本草纲目》", summary: "莲藕与排骨同炖的民间养血和中方。" }],
  "hawthorn-malt-drink": [{ title: "《丹溪心法》", summary: "山楂、麦芽消食导滞的常用组合。" }],
  "sharen-chenpi-fish": [{ title: "《本草纲目》", summary: "砂仁、陈皮理气和胃，鲫鱼和中。" }],
  "danggui-huangqi-chicken": [{ title: "《千金要方·食治》", summary: "当归、黄芪与鸡肉同炖的补气养血食治方。" }],
  "chuanbei-pear": [{ title: "《本草纲目》", summary: "川贝与梨用于润肺止咳类整理。" }],
  "shashen-yuzhu-duck": [{ title: "《本草纲目》", summary: "沙参、玉竹养阴润燥，老鸭为血肉有情之品。" }],
  "longan-millet-porridge": [{ title: "《随园食单》", summary: "桂圆与小米粥的养血安神类民间食养。" }],
  "black-sesame-walnut-paste": [{ title: "《本草纲目》", summary: "黑芝麻、核桃用于润燥补益类整理。" }],
  "mulberry-red-date-drink": [{ title: "《本草纲目》", summary: "桑葚与红枣并用的养血生津思路。" }],
  "duck-pear-soup": [{ title: "《饮膳正要》", summary: "禽肉与梨类同炖的润养汤方传统。" }],
  "apricot-lily-soup": [{ title: "《本草纲目》", summary: "杏仁、百合用于润肺和中。" }],
  "shepherd-purse-lean-soup": [{ title: "《本草纲目》", summary: "荠菜为民间常用春令菜，常入汤羹。" }],
  "beef-yam-soup": [{ title: "《千金要方·食治》", summary: "牛肉与山药并用的益气健脾食治思路。" }],
  "pumpkin-rice-paste": [{ title: "《随园食单》", summary: "南瓜与米类同煮的和中辅食传统。" }],
  "chicken-poria-stew": [{ title: "《本草纲目》", summary: "茯苓与鸡肉同炖的健脾祛湿方。" }],
  "yam-lotus-bowl": [{ title: "《本草纲目》", summary: "山药、莲子健脾和中。" }],
  "astragalus-chicken-soup": [{ title: "《脾胃论》", summary: "黄芪与鸡肉补气养中的常见食治方。" }],
  "chenpi-rice-water": [{ title: "《食疗本草》", summary: "陈皮与米汤理气和胃。" }],
  "white-fungus-lily-bowl": [{ title: "《随园食单》", summary: "银耳、百合润养生津。" }],
  "lotus-jujube-congee": [{ title: "《本草纲目》", summary: "莲子、红枣补脾养心。" }],
  "ginger-chenpi-drink": [{ title: "《食疗本草》", summary: "生姜、陈皮温中理气。" }],
  "millet-poria-bowl": [{ title: "《本草纲目》", summary: "小米与茯苓健脾渗湿。" }],
  "bergamot-pear-drink": [{ title: "《本草纲目》", summary: "佛手理气，梨类生津。" }],
  "biandou-yam-congee": [{ title: "《本草纲目》", summary: "白扁豆健脾化湿，常与山药同用。" }],
  "lianzi-qianshi-millet": [{ title: "《本草纲目》", summary: "莲子、芡实固摄，小米养胃。" }],
  "dangshen-baizhu-lean-soup": [{ title: "《脾胃论》", summary: "党参、白术益气健脾的经典组合。" }],
  "chaomi-shanzha-drink": [{ title: "《丹溪心法》", summary: "炒米与山楂消食和胃。" }],
  "pumpkin-biancong-soup": [{ title: "《本草纲目》", summary: "南瓜、白扁豆补中助运。" }],
  "longan-goji-steamed-egg": [{ title: "《随园食单》", summary: "桂圆、枸杞与蛋羹的养血安神整理。" }],
  "redbean-jujube-congee": [{ title: "《本草纲目》", summary: "红豆、红枣养血和中。" }],
  "black-chicken-danggui": [{ title: "《千金要方·食治》", summary: "乌鸡与当归养血调中。" }],
  "rose-chenpi-drink": [{ title: "《随园食单》", summary: "玫瑰、陈皮疏肝理气类茶饮整理。" }],
  "foshou-maiya-drink": [{ title: "《本草纲目》", summary: "佛手、麦芽理气和胃。" }],
  "radish-beef-soup": [{ title: "《食疗本草》", summary: "萝卜顺气，牛肉补形。" }],
  "zisu-sharen-congee": [{ title: "《本草纲目》", summary: "紫苏、砂仁醒脾和胃。" }],
  "huangqi-longan-millet": [{ title: "《脾胃论》", summary: "黄芪、桂圆补气养血。" }],
  "yuzhu-maidong-congee": [{ title: "《本草纲目》", summary: "玉竹、麦冬养阴润燥。" }],
  "almond-lily-soup": [{ title: "《本草纲目》", summary: "南北杏与百合润肺。" }],
  "whitefungus-loquat-drink": [{ title: "《随园食单》", summary: "银耳、枇杷清润生津。" }],
  "luohanguo-wuhuaguo": [{ title: "《本草纲目》", summary: "罗汉果、无花果润肺利咽。" }],
  "yinchen-redbean-soup": [{ title: "《本草纲目》", summary: "茵陈、赤小豆清利湿热。" }],
  "coix-wintermelon-soup": [{ title: "《本草纲目》", summary: "薏米、冬瓜、赤小豆利湿。" }],
  "cornsilk-heye-drink": [{ title: "《本草纲目》", summary: "玉米须、荷叶轻清利湿。" }],
  "meigui-foshou-tea": [{ title: "《随园食单》", summary: "玫瑰、佛手疏肝解郁。" }],
  "qingpi-chenpi-lean": [{ title: "《丹溪心法》", summary: "青皮、陈皮理气和中。" }],
  "celery-mungbean-drink": [{ title: "《本草纲目》", summary: "芹菜、绿豆清利轻养。" }],
  "mumian-fuling-lean": [{ title: "《本草纲目》", summary: "木棉花、茯苓健脾祛湿。" }],
  "jigucao-lean-soup": [{ title: "《岭南采药录》", summary: "鸡骨草为岭南常用利湿药食材。" }],
  "xiakucao-chrysanthemum": [{ title: "《本草纲目》", summary: "夏枯草、菊花清舒头目。" }]
};

let RECIPES = [];

function mergeRecipeBundles() {
  RECIPES = [];
  const handcrafted = typeof HANDCRAFTED_RECIPES !== "undefined" ? HANDCRAFTED_RECIPES : [];
  handcrafted.forEach((item) => {
    RECIPES.push({
      ...item,
      sources: item.sources?.length ? item.sources : (RECIPE_CLASSIC_SOURCES[item.id] || []),
      draft: false
    });
  });
  if (typeof BULK_RECIPES_ENHANCED !== "undefined") RECIPES.push(...BULK_RECIPES_ENHANCED);
  if (typeof CLASSIC_DIET_RECIPES !== "undefined") RECIPES.push(...CLASSIC_DIET_RECIPES);
}

const app = document.getElementById("app");
const toastEl = document.getElementById("toast");
const sheet = document.getElementById("detailSheet");
const sheetContent = document.getElementById("sheetContent");
const sheetBackdrop = document.getElementById("sheetBackdrop");
const closeSheet = document.getElementById("closeSheet");

const state = {
  view: "home",
  homeQuery: "",
  libraryQuery: "",
  libraryNature: "全部",
  libraryCategory: "全部",
  libraryRegion: "ALL",
  libraryProvince: "全部",
  libraryEthnic: "全部",
  libraryTopic: "",
  libraryKind: "全部",
  libraryOfficialBatch: "全部",
  libraryProvincesExpanded: false,
  libraryEthnicsExpanded: false,
  checkerQuery: "",
  checkerSelected: [],
  checkerScrollPending: false,
  checkerRulesOpen: false,
  checkerRulesQuery: "",
  recipesQuery: "",
  recipesNature: "全部",
  recipesSyndrome: "全部",
  recipesUseFor: "全部",
  recipesAvoidFor: "全部",
  recipesTiming: "全部",
  recipesCooking: "全部",
  recipesCoreFood: "全部",
  recipesSeason: "全部",
  recipesSolarTerm: "全部",
  recipesBodyFeel: "全部",
  recipesTonify: "全部",
  recipesClear: "全部",
  profile: loadJson("foodwise-profile", {}),
  favorites: loadJson("foodwise-favorites", []),
  favoriteRecipes: loadJson("foodwise-favorite-recipes", []),
  recentFoods: loadJson("foodwise-recent-foods", []),
  recentRecipes: loadJson("foodwise-recent-recipes", []),
  sheet: null
};

const FOOD_DETAIL_ENRICHMENTS = {
  "river-snail": { faCategory: "腥寒发物", faNote: "传统饮食里多归为腥寒之品，重点不是“绝对不能吃”，而是脾胃虚寒、腹泻体质和生冷同食时更容易不适。", suitableFor: ["夏季清淡饮食场景", "偏热、口渴、想吃清鲜水产的人"], avoidFor: ["脾胃虚寒", "腹泻或经常腹痛", "痛风急性发作期"], contraindications: ["来源不明或未熟透时避免食用"] },
  "duck-blood": { faCategory: "腥发类（个体差异）", faNote: "更适合作为高蛋白、偏清润的家常食材理解；对海鲜腥膻、血制品敏感的人群不宜大量进食。", suitableFor: ["想做成清淡汤煮的人", "需要高蛋白、少油烹调的人"], avoidFor: ["腹泻时", "胆固醇管理严格期需控制分量", "血制品接受度差的人"] },
  "century-egg": { faCategory: "腥发类（争议）", faNote: "更像重口味加工蛋制品，重点在钠含量、搭配和胃肠耐受，不宜长期高频大量吃。", suitableFor: ["偶尔做凉拌、粥配菜时少量使用"], avoidFor: ["胃酸反流", "高血压或严格控盐人群", "儿童高频食用场景"] },
  "ice-cream": { faCategory: "寒凉助湿", faNote: "不是中医意义上的“发物主角”，但寒凉、甜腻、乳脂叠加，容易放大胃肠敏感和痰湿感。", suitableFor: ["炎热天气少量食用且整体饮食不过凉时"], avoidFor: ["腹泻", "胃食管反流", "咽喉敏感", "怕冷或脾胃虚寒"] },
  bracken: { faCategory: "山野菜类", faNote: "重点在处理方式和频率，不建议因为“野菜”就高频长期吃。", suitableFor: ["偶尔应季食用", "焯水后清炒或配肉少量食用"], avoidFor: ["胃肠敏感", "腹泻时", "不明确来源的野菜采食场景"], contraindications: ["必须规范处理后再食用"] },
  konjac: { faCategory: "寒滑助滞", faNote: "魔芋的重点是规范加工和个体肠胃耐受，不是盲目拿来大量替代正餐。", suitableFor: ["想做成低能量配菜的人", "搭配热汤热菜时"], avoidFor: ["胃肠过敏", "吞咽困难", "腹泻时"], contraindications: ["生魔芋不可直接食用"] },
  "garlic-yellow": { faCategory: "辛温发物", faNote: "蒜黄偏辛温，容易推动食欲和气机，阴虚火旺或明显口干咽痛时不宜过多。", suitableFor: ["怕冷", "胃口差", "冬季热炒配菜场景"], avoidFor: ["口腔溃疡", "胃酸反流", "明显上火感"] },
  xuelihong: { faCategory: "辛散发物", faNote: "雪里红更要注意腌制盐分与整体搭配，不适合把“开胃”理解成多多益善。", suitableFor: ["食欲差时少量佐餐", "搭配主食、豆制品或瘦肉"], avoidFor: ["高血压", "水肿", "胃炎急性期"] },
  "sea-cucumber": { faCategory: "海鲜腥发", faNote: "海参常被归到腥发类，更适合病后恢复或想做温和滋养汤羹时少量使用。", suitableFor: ["恢复期少量滋养", "冬季炖汤"], avoidFor: ["痰湿偏重、食欲差时", "海鲜过敏", "痛风急性期"] },
  "longan-dried": { faCategory: "温热助火发物", faNote: "桂圆干偏温而甜，养血安神的同时也容易偏燥偏腻，重点是分量和频率。", suitableFor: ["血虚、乏力、睡眠浅且不明显上火的人"], avoidFor: ["口舌生疮", "便秘", "明显上火", "痰湿偏重"] },
  quail: { suitableFor: ["脾胃虚弱想吃得更细软的人", "病后恢复期少量炖汤"], avoidFor: ["痛风急性期", "对禽肉不耐受的人"] },
  citrus: { suitableFor: ["食欲差", "油腻后想吃得清爽一点的人"], avoidFor: ["胃酸反流", "空腹时胃部敏感的人"], faCategory: "芳香辛散类", faNote: "柑橘类更多是按品种、成熟度和吃法判断，不宜一概而论。" },
  "malabar-spinach": { suitableFor: ["大便偏干", "想做成清润叶菜的人"], avoidFor: ["腹泻", "胃寒明显", "生食场景"], faCategory: "寒滑菜蔬" },
  "baby-cabbage": { suitableFor: ["清淡家常饮食", "胃口弱时煮汤、汆烫"], avoidFor: ["腹泻时大量凉拌生食"], faCategory: "平和菜蔬" },
  "swallow-nest": { suitableFor: ["恢复期想做清润羹品的人", "少量长期整理饮食结构的人"], avoidFor: ["蛋白过敏体质", "来源不清的滋补品场景"], faCategory: "滋腻补益类" },
  "cherry-tomato": { suitableFor: ["想做成清爽水果或沙拉的人", "天气热时少量生食"], avoidFor: ["胃酸反流", "空腹大量食用", "胃寒明显的人"], faCategory: "凉润果蔬" },
  ercai: { suitableFor: ["清炒或配肉做家常菜", "想吃脆嫩根茎菜时"], avoidFor: ["腹泻时大量凉拌", "胃寒明显的人"], faCategory: "平凉菜蔬" },
  "pea-shoot": { suitableFor: ["春季时蔬搭配", "想吃得清爽一点的人"], avoidFor: ["腹胀明显", "粗纤维敏感的人"], faCategory: "平和菜蔬" },
  "lion-mane": { suitableFor: ["想做成温和养胃汤羹的人", "病后恢复期清炖场景"], avoidFor: ["菌菇过敏", "痛风急性期大量浓汤场景"], faCategory: "菌菇补益类" },
  "softshell-turtle": { faCategory: "滋腻腥发", faNote: "甲鱼偏滋补、偏腻，传统上常用于虚损调养，但脾胃弱、痰湿重时不宜硬补。", suitableFor: ["病后恢复期少量炖汤", "想做成滋养型主菜的人"], avoidFor: ["脾胃虚寒", "消化差", "痛风急性期", "孕期自行进补场景"] },
  tilapia: { suitableFor: ["日常清蒸、煮汤补充蛋白", "胃口弱想吃软嫩鱼肉的人"], avoidFor: ["海鲜或鱼类过敏", "痛风急性期"], faCategory: "腥发类（个体差异）" },
  "donkey-meat": { suitableFor: ["怕冷、食欲差但消化尚可的人", "秋冬少量炖煮场景"], avoidFor: ["口干便秘", "上火明显", "高脂饮食管理期"], faCategory: "温补肉类" },
  "button-mushroom": { suitableFor: ["清炒、炖汤、和主食搭配", "想吃得轻一点的人"], avoidFor: ["菌菇过敏", "腹泻时大量食用"], faCategory: "菌菇类" },
  "snakehead-fish": { suitableFor: ["术后恢复期", "高蛋白清炖场景", "食欲弱但想补充蛋白的人"], avoidFor: ["鱼类过敏", "痛风急性期"], faCategory: "腥发类（个体差异）" },
  caitai: { suitableFor: ["冬春季热炒", "搭配肉类主食做家常菜"], avoidFor: ["腹泻", "生冷敏感时大量食用"], faCategory: "平和时蔬" },
  "night-blooming-flower": { suitableFor: ["煲汤、清炒点缀", "夏秋时令清香菜式"], avoidFor: ["对花粉香气敏感的人", "来源不明的采食场景"], faCategory: "芳香花菜" },
  "gai-lan": { suitableFor: ["热炒、白灼、配肉类海鲜"], avoidFor: ["腹泻时大量生冷吃法"], faCategory: "平凉菜蔬" },
  "red-stem-gai-lan": { suitableFor: ["快炒", "想吃脆嫩菜梗的人"], avoidFor: ["腹泻时大量生冷吃法"], faCategory: "平凉菜蔬" },
  "sesame-leaf": { suitableFor: ["地方家常快炒", "搭配蒜姜做熟食"], avoidFor: ["胃寒腹泻", "不明品种误采误食场景"], faCategory: "地方叶菜" }
};

const RUNTIME_SEARCH_INDEX = [
  { name: "苦瓜茶", aliases: [], pinyin: "kuguacha", initials: "kgc", regional: ["岭南凉茶"], english: ["bitter melon tea"] },
  { name: "苦荞", aliases: ["苦荞麦"], pinyin: "kuqiao", initials: "kq", regional: ["西北苦荞"], english: ["tartary buckwheat"] },
  { name: "莴苣", aliases: ["生菜笋"], pinyin: "woju", initials: "wj", regional: ["北方莴苣"], english: ["lettuce stem"] },
  { name: "西葫芦", aliases: ["角瓜"], pinyin: "xihulu", initials: "xhl", regional: ["东北角瓜"], english: ["zucchini"] },
  { name: "黄豆芽", aliases: [], pinyin: "huangdouya", initials: "hdy", regional: ["家常豆芽"], english: ["soybean sprouts"] },
  { name: "绿豆芽", aliases: [], pinyin: "lvdouya", initials: "ldy", regional: ["家常豆芽"], english: ["mung bean sprouts"] },
  { name: "西兰花", aliases: ["青花菜"], pinyin: "xilanhua", initials: "xlh", regional: ["家常西兰花"], english: ["broccoli"] },
  { name: "苦苣", aliases: ["曲曲菜"], pinyin: "kuju", initials: "kj", regional: ["北方野菜"], english: ["chicory"] },
  { name: "苋菜", aliases: ["红苋菜"], pinyin: "xiancai", initials: "xc", regional: ["江南苋菜"], english: ["amaranth greens"] },
  { name: "丝瓜", aliases: ["水瓜"], pinyin: "sigua", initials: "sg", regional: ["岭南丝瓜"], english: ["loofah"] },
  { name: "香菜", aliases: ["芫荽"], pinyin: "xiangcai", initials: "xc", regional: ["家常香菜"], english: ["coriander"] },
  { name: "洋葱", aliases: [], pinyin: "yangcong", initials: "yc", regional: ["西式洋葱"], english: ["onion"] },
  { name: "韭菜", aliases: [], pinyin: "jiucai", initials: "jc", regional: ["北方韭菜"], english: ["chives"] },
  { name: "花椒", aliases: ["川椒"], pinyin: "huajiao", initials: "hj", regional: ["川渝花椒"], english: ["sichuan pepper"] },
  { name: "胡椒", aliases: ["白胡椒", "黑胡椒"], pinyin: "hujiao", initials: "hj", regional: ["南洋胡椒"], english: ["pepper"] },
  { name: "桂皮", aliases: ["肉桂皮"], pinyin: "guipi", initials: "gp", regional: ["卤味香料"], english: ["cassia bark"] },
  { name: "丁香", aliases: [], pinyin: "dingxiang", initials: "dx", regional: ["香料"], english: ["clove"] },
  { name: "辣椒", aliases: ["海椒"], pinyin: "lajiao", initials: "lj", regional: ["川渝辣椒"], english: ["chili pepper"] },
  { name: "生蚝干", aliases: ["蚝干"], pinyin: "haogan", initials: "hg", regional: ["广式汤料"], english: ["dried oyster"] },
  { name: "乌梅", aliases: [], pinyin: "wumei", initials: "wm", regional: ["酸梅饮"], english: ["smoked plum"] }
];

RUNTIME_SEARCH_INDEX.push(
  { name: "朝天椒", aliases: ["小米辣", "朝天红椒"], pinyin: "chaotianjiao", initials: "ctj", regional: ["川渝朝天椒"], english: ["facing heaven pepper"] },
  { name: "魔鬼椒", aliases: ["神鬼椒", "超辣椒"], pinyin: "moguijiao", initials: "mgj", regional: ["特辣椒"], english: ["ghost pepper", "bhut jolokia"] },
  { name: "刺嫩芽", aliases: ["刺老芽", "树头菜"], pinyin: "cinenya", initials: "cny", regional: ["东北山野菜"], english: ["aralia bud"] },
  { name: "沙姜粉", aliases: ["山奈粉"], pinyin: "shajiangfen", initials: "sjf", regional: ["粤桂蘸料"], english: ["sand ginger powder"] }
);

RUNTIME_SEARCH_INDEX.push(
  { name: "花螺", aliases: ["花螺肉"], pinyin: "hualuo", initials: "hl", regional: ["沿海河鲜"], english: ["babylon snail"] },
  { name: "青口贝", aliases: ["贻贝", "海虹"], pinyin: "qingkoubei", initials: "qkb", regional: ["沿海贝类"], english: ["mussel"] },
  { name: "海鲈鱼", aliases: ["鲈鱼"], pinyin: "hailuyu", initials: "hly", regional: ["沿海河鲜"], english: ["sea bass"] },
  { name: "乌头鱼", aliases: [], pinyin: "wutouyu", initials: "wty", regional: ["南方河鲜"], english: ["mullet"] },
  { name: "石斑鱼", aliases: [], pinyin: "shibanyu", initials: "sby", regional: ["沿海海鲜"], english: ["grouper"] },
  { name: "海蓬子", aliases: [], pinyin: "haipengzi", initials: "hpz", regional: ["沿海野菜"], english: ["samphire"] },
  { name: "盐碱草", aliases: [], pinyin: "yanjiaocao", initials: "yjc", regional: ["沿海野菜"], english: ["seablite"] },
  { name: "花椒芽", aliases: [], pinyin: "huajiaoya", initials: "hjy", regional: ["北方山野菜"], english: ["pepper sprout"] },
  { name: "野蒜", aliases: [], pinyin: "yesuan", initials: "ys", regional: ["山野调味"], english: ["wild garlic"] },
  { name: "酸笋丝", aliases: ["酸笋"], pinyin: "suansunsi", initials: "sss", regional: ["西南腌渍"], english: ["pickled bamboo shoot"] },
  { name: "酸菜心", aliases: [], pinyin: "suancaixin", initials: "scx", regional: ["东北腌渍"], english: ["pickled greens heart"] },
  { name: "豆瓣辣椒酱", aliases: ["豆瓣辣酱"], pinyin: "doubanlajiang", initials: "dblj", regional: ["川味调料"], english: ["chili bean paste"] },
  { name: "泡辣椒酱", aliases: [], pinyin: "paojiaojiang", initials: "pjj", regional: ["西南泡菜"], english: ["pickled chili sauce"] },
  { name: "芥末油", aliases: [], pinyin: "jiemoyou", initials: "jmy", regional: ["调味油料"], english: ["mustard oil"] },
  { name: "紫苏盐", aliases: [], pinyin: "zisuyan", initials: "zsy", regional: ["客家调味"], english: ["perilla salt"] }
);

const RUNTIME_SEARCH_INDEX_MAP = new Map(
  RUNTIME_SEARCH_INDEX.flatMap((entry) => [entry.name, ...(entry.aliases || [])].map((key) => [key, entry]))
);

const RUNTIME_FOOD_EXPANSION = [
  { id: "bitter-melon-tea", name: "苦瓜茶", en: "bitter melon tea", category: "茶饮", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["kuguacha", "kgc"], aliases: ["苦瓜茶饮"], summary: "偏寒凉的茶饮整理条目，更适合暑热、油腻后想喝得轻一点的场景。", caution: "脾胃虚寒、腹泻或空腹时不宜多饮。" },
  { id: "tartary-buckwheat", name: "苦荞", en: "tartary buckwheat", category: "谷物", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["kuqiao", "kq"], aliases: ["苦荞麦"], summary: "常见于西北与代餐饮食场景，偏清利。", caution: "胃寒、腹泻时不宜大量长期吃。" },
  { id: "lettuce-stem", name: "莴苣", en: "lettuce stem", category: "蔬菜", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["woju", "wj"], aliases: ["生菜笋"], summary: "比莴笋更偏鲜脆，属于偏凉家常菜蔬。 " },
  { id: "zucchini", name: "西葫芦", en: "zucchini", category: "蔬菜", nature: "凉", effects: ["和中"], regions: ["CN", "US"], searchTerms: ["xihulu", "xhl", "jiaogua"], aliases: ["角瓜"], summary: "家常度高、做法广，偏凉而不算极寒。" },
  { id: "soybean-sprouts", name: "黄豆芽", en: "soybean sprouts", category: "蔬菜", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["huangdouya", "hdy"], summary: "常见家常蔬菜，偏凉偏爽口。" },
  { id: "mungbean-sprouts", name: "绿豆芽", en: "mung bean sprouts", category: "蔬菜", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["lvdouya", "ldy"], summary: "常见家常蔬菜，油腻后吃会更清爽。" },
  { id: "broccoli", name: "西兰花", en: "broccoli", category: "蔬菜", nature: "凉", effects: ["和中"], regions: ["CN", "US", "UK"], searchTerms: ["xilanhua", "xlh", "qinghuacai"], aliases: ["青花菜"], summary: "日常高频蔬菜，偏凉平和。" },
  { id: "chicory", name: "苦苣", en: "chicory", category: "野菜", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["kuju", "kj", "ququcai"], aliases: ["曲曲菜"], summary: "偏苦寒，常见于野菜或凉拌场景。", caution: "脾胃虚寒、腹泻者不宜多食。" },
  { id: "amaranth-greens", name: "苋菜", en: "amaranth greens", category: "蔬菜", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["xiancai", "xc"], aliases: ["红苋菜"], summary: "夏秋常见叶菜，偏凉清爽。" },
  { id: "loofah", name: "丝瓜", en: "loofah", category: "蔬菜", nature: "凉", effects: ["清润"], regions: ["CN"], searchTerms: ["sigua", "sg", "shuigua"], aliases: ["水瓜"], summary: "偏凉而润，适合清炒、煮汤。 " },
  { id: "lotus-leaf", name: "荷叶", en: "lotus leaf", category: "食药物质", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["heye", "hy"], summary: "常见于轻饮、夏季整理饮食场景。", officialFoodMedicine: true },
  { id: "dandelion", name: "蒲公英", en: "dandelion", category: "食药物质", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["pugongying", "pgy"], summary: "偏寒凉，整理时更适合放在清利类场景。", officialFoodMedicine: true },
  { id: "honeysuckle", name: "金银花", en: "honeysuckle", category: "食药物质", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["jinyinhua", "jyh"], summary: "常见于清利茶饮与夏季饮食整理。", officialFoodMedicine: true },
  { id: "mulberry-leaf", name: "桑叶", en: "mulberry leaf", category: "食药物质", nature: "凉", effects: ["清润"], regions: ["CN"], searchTerms: ["sangye", "sy"], summary: "偏凉润，常见于秋燥和轻润饮。", officialFoodMedicine: true },
  { id: "coriander", name: "香菜", en: "coriander", category: "蔬菜", nature: "温", effects: ["行气"], regions: ["CN"], searchTerms: ["xiangcai", "xc", "yuansui"], aliases: ["芫荽"], summary: "芳香辛散，偏温，适合点缀与去腥提香。" },
  { id: "onion", name: "洋葱", en: "onion", category: "蔬菜", nature: "温", effects: ["理气"], regions: ["CN", "US", "UK"], searchTerms: ["yangcong", "yc"], summary: "偏温而辛香，常见于炒菜、煎烤、炖煮。" },
  { id: "chives", name: "韭菜", en: "chives", category: "蔬菜", nature: "温", effects: ["温中"], regions: ["CN"], searchTerms: ["jiucai", "jc"], summary: "偏温辛散，常见于春季和家常炒菜。", caution: "口干、口腔溃疡、上火时不宜多吃。" },
  { id: "sichuan-pepper", name: "花椒", en: "sichuan pepper", category: "调料", nature: "热", effects: ["温中"], regions: ["CN"], searchTerms: ["huajiao", "hj", "chuanjiao"], aliases: ["川椒"], summary: "偏热而香麻，适合少量做调味和去腥。" },
  { id: "pepper-spice", name: "胡椒", en: "pepper", category: "调料", nature: "热", effects: ["温中"], regions: ["CN", "MY", "SG"], searchTerms: ["hujiao", "hj", "baihujiao", "heihujiao"], aliases: ["白胡椒", "黑胡椒"], summary: "辛热调料，适合寒凉菜肴少量提味。", caution: "胃热、咽痛、便秘时不宜重用。" },
  { id: "cassia-bark", name: "桂皮", en: "cassia bark", category: "调料", nature: "热", effects: ["温中"], regions: ["CN"], searchTerms: ["guipi", "gp", "rouguipi"], aliases: ["肉桂皮"], summary: "偏热香料，更多用于炖煮卤味。", caution: "明显上火、口干便秘时不宜多用。" },
  { id: "clove-spice", name: "丁香", en: "clove", category: "调料", nature: "热", effects: ["温中"], regions: ["CN"], searchTerms: ["dingxiang", "dx"], summary: "辛热香料，适合小量用于炖汤和卤味。" },
  { id: "chili-pepper", name: "辣椒", en: "chili pepper", category: "调料", nature: "热", effects: ["温中"], regions: ["CN", "TH", "MY"], searchTerms: ["lajiao", "lj", "haijiao"], aliases: ["海椒"], summary: "典型偏热食材，适合寒凉地区或冬季少量使用。", caution: "反流、痔疮、口腔溃疡和明显上火时不宜多吃。" },
  { id: "dried-oyster", name: "生蚝干", en: "dried oyster", category: "海产", nature: "温", effects: ["滋养"], regions: ["CN"], searchTerms: ["haogan", "hg"], aliases: ["蚝干"], summary: "偏温、偏鲜的岭南汤料。" },
  { id: "smoked-plum", name: "乌梅", en: "smoked plum", category: "食药物质", nature: "平", effects: ["生津"], regions: ["CN"], searchTerms: ["wumei", "wm"], summary: "常见于饮品和酸收类整理条目。", officialFoodMedicine: true },
  { id: "water-caltrop", name: "菱角", en: "water caltrop", category: "水果", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["lingjiao", "lj"], summary: "偏凉而爽，常见于秋季熟食或煲汤场景。" },
  { id: "water-chestnut", name: "荸荠", en: "water chestnut", category: "水果", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["biqi", "bq", "madi"], aliases: ["马蹄"], summary: "偏寒而脆，适合熟食、煮糖水或搭汤。", caution: "脾胃虚寒、腹泻时不宜多吃生品。" },
  { id: "winter-melon", name: "冬瓜", en: "winter melon", category: "蔬菜", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["donggua", "dg"], summary: "典型偏寒凉的家常蔬菜，常用于汤羹。", caution: "畏寒、腹泻时不宜大量单独食用。" },
  { id: "wax-gourd-peel", name: "冬瓜皮", en: "wax gourd peel", category: "食药物质", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["dongguapi", "dgp"], summary: "常见于清利型汤饮整理条目。" },
  { id: "kelp", name: "海带", en: "kelp", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN", "JP", "KR"], searchTerms: ["haidai", "hd", "kombu"], aliases: ["昆布"], summary: "偏寒凉的海产食材，适合煮汤或凉拌熟食。", caution: "甲状腺特殊疾病、脾胃虚寒者需注意总量。" },
  { id: "seaweed", name: "紫菜", en: "seaweed", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN", "JP", "KR"], searchTerms: ["zicai", "zc", "nori"], summary: "偏寒凉，常见于汤羹、饭团和海苔制品。" },
  { id: "laver", name: "海苔", en: "laver", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN", "JP", "KR"], searchTerms: ["haitai", "ht"], summary: "由紫菜类加工而成，整体偏寒凉。" },
  { id: "mung-bean", name: "绿豆", en: "mung bean", category: "豆类", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["lvdou", "ld", "mungbean"], summary: "经典偏寒凉豆类，常见于夏季饮食整理。", caution: "脾胃虚寒、腹泻者不宜长期大量食用。" },
  { id: "pear", name: "梨", en: "pear", category: "水果", nature: "凉", effects: ["清润"], regions: ["CN", "US", "UK"], searchTerms: ["li", "pear"], summary: "偏凉润，适合秋燥、咽干场景的熟食与炖煮。" },
  { id: "pomelo", name: "柚子", en: "pomelo", category: "水果", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["youzi", "yz", "pomelo"], summary: "偏寒凉、汁水足，常见于秋冬水果。", caution: "胃寒腹泻、与部分药物同用时需留意相互作用。" },
  { id: "persimmon", name: "柿子", en: "persimmon", category: "水果", nature: "寒", effects: ["清利"], regions: ["CN", "JP", "KR"], searchTerms: ["shizi", "sz", "persimmon"], summary: "偏寒凉水果，宜熟食、适量。", caution: "空腹、大量与高鞣酸饮食同食都不合适。" },
  { id: "kiwifruit", name: "猕猴桃", en: "kiwifruit", category: "水果", nature: "寒", effects: ["清利"], regions: ["CN", "NZ"], searchTerms: ["mihoutao", "mht", "kiwi"], summary: "偏寒凉、酸甜，适合饭后少量。", caution: "胃寒、反流明显者不宜空腹多吃。" },
  { id: "banana", name: "香蕉", en: "banana", category: "水果", nature: "寒", effects: ["清利"], regions: ["CN", "TH", "MY"], searchTerms: ["xiangjiao", "xj", "banana"], summary: "偏寒凉水果，熟果口感柔软。", caution: "腹泻、胃寒明显时不宜多吃。" },
  { id: "crab", name: "螃蟹", en: "crab", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN", "JP", "KR"], searchTerms: ["pangxie", "px", "crab"], summary: "偏寒凉的高频水产条目。", caution: "脾胃虚寒、腹泻和部分过敏体质要格外留意。" },
  { id: "river-crab", name: "河蟹", en: "river crab", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["hexie", "hx"], summary: "典型偏寒凉河鲜，适合少量熟食。" },
  { id: "clam", name: "蛤蜊", en: "clam", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN", "JP", "KR"], searchTerms: ["geli", "gl", "clam"], aliases: ["文蛤"], summary: "偏寒凉贝类，常见于汤羹和蒸煮。", caution: "脾胃虚寒、腹泻和过敏体质者慎多食。" },
  { id: "water-spinach", name: "空心菜", en: "water spinach", category: "蔬菜", nature: "凉", effects: ["清利"], regions: ["CN", "TH", "MY"], searchTerms: ["kongxincai", "kxc"], summary: "偏凉的高频绿叶菜，适合快炒熟食。" },
  { id: "lotus-root", name: "莲藕", en: "lotus root", category: "蔬菜", nature: "凉", effects: ["清润"], regions: ["CN"], searchTerms: ["lianou", "lo"], summary: "偏凉而兼顾爽脆和粉糯，适合煲汤与炒食。" },
  { id: "cucumber", name: "黄瓜", en: "cucumber", category: "蔬菜", nature: "凉", effects: ["清利"], regions: ["CN", "US", "UK"], searchTerms: ["huanggua", "hg", "cucumber"], summary: "高频偏凉蔬菜，适合熟食或少量凉拌。" },
  { id: "eggplant", name: "茄子", en: "eggplant", category: "蔬菜", nature: "凉", effects: ["和中"], regions: ["CN", "JP"], searchTerms: ["qiezi", "qz", "eggplant"], summary: "偏凉但常通过油润、蒜香和热烹去平衡。" },
  { id: "garlic", name: "大蒜", en: "garlic", category: "调料", nature: "温", effects: ["行气"], regions: ["CN"], searchTerms: ["dasuan", "ds", "garlic"], summary: "典型偏温辛香调料，适合少量入菜提味。", caution: "胃黏膜敏感、反流明显时不宜生食多食。" },
  { id: "ginger", name: "生姜", en: "ginger", category: "调料", nature: "温", effects: ["温中"], regions: ["CN"], searchTerms: ["shengjiang", "sj", "ginger"], summary: "偏温、去腥、和中，是高频家常调味基础项。" },
  { id: "fennel-seed", name: "小茴香", en: "fennel seed", category: "调料", nature: "温", effects: ["理气"], regions: ["CN"], searchTerms: ["xiaohuixiang", "xhx", "fennel"], summary: "偏温辛香的北方与西北常见调料。" },
  { id: "star-anise", name: "八角", en: "star anise", category: "调料", nature: "温", effects: ["温中"], regions: ["CN"], searchTerms: ["bajiao", "bj", "staranise"], summary: "偏温香料，常见于卤味和红烧。", caution: "上火、口干便秘时不宜重用。" },
  { id: "lamb", name: "羊肉", en: "lamb", category: "肉蛋奶", nature: "热", effects: ["温中"], regions: ["CN"], searchTerms: ["yangrou", "yr", "lamb"], summary: "典型偏热肉类，常见于冬季炖煮和进补场景。", caution: "内热明显、咽痛、便秘时不宜多吃。" },
  { id: "venison", name: "鹿肉", en: "venison", category: "肉蛋奶", nature: "热", effects: ["温中"], regions: ["CN"], searchTerms: ["lurou", "lr", "venison"], summary: "偏热的滋补型肉类，多用于少量炖煮整理。", caution: "实热、明显上火时不宜多食。" },
  { id: "durian", name: "榴莲", en: "durian", category: "水果", nature: "热", effects: ["温中"], regions: ["TH", "MY", "SG", "CN"], searchTerms: ["liulian", "ll", "durian"], summary: "偏热水果，适合少量、分次食用。", caution: "口干、咽痛、便秘和反流明显时不宜多吃。" },
  { id: "lychee", name: "荔枝", en: "lychee", category: "水果", nature: "热", effects: ["生津"], regions: ["CN"], searchTerms: ["lizhi", "lz", "lychee"], summary: "偏热水果，风味佳但不宜一次吃太多。", caution: "儿童、口腔溃疡或血糖波动人群应控制总量。" },
  { id: "longan", name: "龙眼", en: "longan", category: "水果", nature: "温", effects: ["滋养"], regions: ["CN"], searchTerms: ["longyan", "ly", "guiyuan"], aliases: ["桂圆"], summary: "偏温甜润，适合做羹汤、甜饮和少量点心。" },
  { id: "walnut", name: "核桃", en: "walnut", category: "坚果种子", nature: "温", effects: ["滋养"], regions: ["CN", "US", "UK"], searchTerms: ["hetao", "ht", "walnut"], summary: "偏温的坚果类，适合少量配粥、配早餐。" },
  { id: "chestnut", name: "栗子", en: "chestnut", category: "坚果种子", nature: "温", effects: ["温中"], regions: ["CN"], searchTerms: ["lizi", "lz", "chestnut"], summary: "偏温，适合炖肉、煮粥和做点心。", caution: "胃胀、积食时不宜多吃。" },
  { id: "sea-cucumber-fresh", name: "海参", en: "sea cucumber", category: "海产", nature: "温", effects: ["滋养"], regions: ["CN", "JP", "KR"], searchTerms: ["haishen", "hs", "sea cucumber"], summary: "偏温润、偏滋养，常见于炖汤和进补场景。", caution: "感冒发热、痰湿壅盛和消化功能差时不宜多食。" },
  { id: "shrimp-fresh", name: "虾", en: "shrimp", category: "海产", nature: "温", effects: ["滋养"], regions: ["CN", "JP", "KR", "TH"], searchTerms: ["xia", "shrimp", "prawn"], summary: "高频水产，整体偏温，常见蒸煮炒烩。", caution: "甲壳类过敏、皮肤瘙痒明显者需谨慎。" },
  { id: "lobster-fresh", name: "龙虾", en: "lobster", category: "海产", nature: "温", effects: ["滋养"], regions: ["CN", "US", "AU"], searchTerms: ["longxia", "lx", "lobster"], summary: "偏温鲜、偏滋补型海产，适合熟食少量。", caution: "甲壳类过敏和急性胃肠不适者慎食。" },
  { id: "prawn-black-tiger", name: "黑虎虾", en: "black tiger shrimp", category: "海产", nature: "温", effects: ["滋养"], regions: ["CN", "TH", "MY"], searchTerms: ["heihuxia", "hhx"], summary: "偏温的高频虾类条目。", caution: "海鲜过敏或皮肤瘙痒明显时慎食。" },
  { id: "prawn-whiteleg", name: "南美白对虾", en: "whiteleg shrimp", category: "海产", nature: "温", effects: ["滋养"], regions: ["CN"], searchTerms: ["nanmeibaiduixia", "nmbdx"], aliases: ["南美白虾"], summary: "养殖常见虾类，整体偏温。", caution: "过敏、痛风急性期人群控制总量。" },
  { id: "prawn-kuruma", name: "竹节虾", en: "kuruma prawn", category: "海产", nature: "温", effects: ["滋养"], regions: ["CN", "JP"], searchTerms: ["zhujiexia", "zjx"], aliases: ["九节虾"], summary: "偏温鲜，常见于粤菜和日料熟食。" },
  { id: "prawn-ming", name: "明虾", en: "prawn", category: "海产", nature: "温", effects: ["滋养"], regions: ["CN"], searchTerms: ["mingxia", "mx"], summary: "高频虾类，整体偏温。", caution: "海鲜过敏人群慎食。" },
  { id: "prawn-red-argentine", name: "阿根廷红虾", en: "argentine red shrimp", category: "海产", nature: "温", effects: ["滋养"], regions: ["CN", "AR"], searchTerms: ["agentinghongxia", "agthx"], summary: "偏温鲜，常见冷冻海产条目。", caution: "过敏和急性腹泻时不宜。" },
  { id: "prawn-jwei", name: "基围虾", en: "greasyback shrimp", category: "海产", nature: "温", effects: ["滋养"], regions: ["CN"], searchTerms: ["jiweixia", "jwx"], summary: "南方高频虾类，整体偏温。", caution: "海鲜过敏人群慎食。" },
  { id: "oyster-fresh", name: "生蚝", en: "oyster", category: "海产", nature: "凉", effects: ["清利"], regions: ["CN", "JP", "KR"], searchTerms: ["shenghao", "sh", "oyster"], summary: "偏凉鲜食海产，常见炭烤、蒸煮和煲汤。", caution: "脾胃虚寒、腹泻和生食场景都要更谨慎。" },
  { id: "mussel", name: "淡菜", en: "mussel", category: "海产", nature: "温", effects: ["滋养"], regions: ["CN"], searchTerms: ["dancai", "dc", "mussel"], summary: "偏温鲜，常见于煲汤和炖煮场景。" },
  { id: "snail", name: "田螺", en: "river snail", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["tianluo", "tl", "snail"], summary: "典型偏寒凉水产，适合完全熟食。", caution: "脾胃虚寒、腹泻和处理不当时风险更高。" },
  { id: "bamboo-shoot-fresh", name: "竹笋", en: "bamboo shoot", category: "蔬菜", nature: "寒", effects: ["清利"], regions: ["CN", "JP"], searchTerms: ["zhusun", "zs", "bamboo shoot"], summary: "偏寒凉、纤维感强，适合焯水熟食。", caution: "胃寒、腹泻和胃肠敏感者不宜多食。" },
  { id: "water-bamboo", name: "茭白", en: "water bamboo", category: "水生蔬菜", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["jiaobai", "jb"], summary: "偏寒凉的江南高频时蔬。", caution: "脾胃虚寒时不宜多吃。" },
  { id: "amaranth-red", name: "红苋菜", en: "red amaranth", category: "蔬菜", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["hongxiancai", "hxc"], summary: "比普通苋菜更常见于夏季家常清炒。" },
  { id: "watermelon", name: "西瓜", en: "watermelon", category: "水果", nature: "寒", effects: ["清利"], regions: ["CN", "US"], searchTerms: ["xigua", "xg", "watermelon"], summary: "典型偏寒凉水果，适合暑热季节少量分次吃。", caution: "胃寒、腹泻、经期腹冷者不宜多吃冰镇品。" },
  { id: "starfruit", name: "杨桃", en: "starfruit", category: "水果", nature: "寒", effects: ["清利"], regions: ["CN", "MY", "SG"], searchTerms: ["yangtao", "yt", "starfruit"], summary: "偏寒凉而酸甜，适合饭后少量。", caution: "肾功能异常者尤其需要谨慎。" },
  { id: "mangosteen", name: "山竹", en: "mangosteen", category: "水果", nature: "凉", effects: ["清润"], regions: ["TH", "MY", "SG", "CN"], searchTerms: ["shanzhu", "sz", "mangosteen"], summary: "偏凉润，适合热盛口干时少量鲜食。" },
  { id: "sugarcane", name: "甘蔗", en: "sugarcane", category: "水果", nature: "寒", effects: ["清润"], regions: ["CN"], searchTerms: ["ganzhe", "gz", "sugarcane"], summary: "偏寒凉、汁多，常见鲜食或煮水。", caution: "脾胃虚寒、糖代谢异常者需控量。" },
  { id: "orange-blood", name: "血橙", en: "blood orange", category: "水果", nature: "凉", effects: ["生津"], regions: ["CN", "IT"], searchTerms: ["xuecheng", "xc", "blood orange"], summary: "偏凉润，适合饭后少量鲜食。" },
  { id: "bayberry", name: "杨梅", en: "bayberry", category: "水果", nature: "温", effects: ["生津"], regions: ["CN"], searchTerms: ["yangmei", "ym", "bayberry"], summary: "偏温酸甜，常见于江浙夏季水果。" },
  { id: "peach-fruit", name: "桃", en: "peach", category: "水果", nature: "温", effects: ["生津"], regions: ["CN"], searchTerms: ["tao", "peach"], aliases: ["桃子"], summary: "偏温润，适合当季鲜食和炖品。" },
  { id: "mango", name: "芒果", en: "mango", category: "水果", nature: "凉", effects: ["生津"], regions: ["CN", "TH", "MY"], searchTerms: ["mangguo", "mg", "mango"], summary: "偏凉润，但个体差异和过敏反应更需要留意。" },
  { id: "peppercorn-green", name: "青花椒", en: "green sichuan pepper", category: "调料", nature: "热", effects: ["温中"], regions: ["CN"], searchTerms: ["qinghuajiao", "qhj"], summary: "偏热而清麻，常见于川味冷吃与藤椒场景。" },
  { id: "dried-ginger", name: "干姜", en: "dried ginger", category: "调料", nature: "热", effects: ["温中"], regions: ["CN"], searchTerms: ["ganjiang", "gj"], summary: "比生姜更偏热，适合寒凉汤羹少量点到为止。", caution: "阴虚内热、咽干口燥时不宜多用。" },
  { id: "mutton-fat-hotpot-base", name: "牛油火锅底料", en: "beef tallow hotpot base", category: "调料", nature: "热", effects: ["温中"], regions: ["CN"], searchTerms: ["niuyouhuoguodiliao", "nyhgdl"], summary: "明显偏热偏腻的复合调味底料。" },
  { id: "cinnamon", name: "肉桂", en: "cinnamon", category: "调料", nature: "热", effects: ["温中"], regions: ["CN"], searchTerms: ["rougui", "rg", "cinnamon"], summary: "偏热香辛，适合炖煮、甜香饮和冬季少量使用。" },
  { id: "mustard-seed", name: "芥末", en: "mustard", category: "调料", nature: "热", effects: ["行气"], regions: ["JP", "KR", "CN"], searchTerms: ["jiemo", "jm", "mustard"], summary: "刺激性强、偏热，更多作为少量蘸料。" },
  { id: "needle-mushroom", name: "金针菇", en: "enoki", category: "菌菇", nature: "寒", effects: ["清利"], regions: ["CN", "JP", "KR"], searchTerms: ["jinzhengu", "jzg", "enoki"], summary: "偏寒凉菌菇，适合完全熟食。", caution: "胃肠敏感时不宜多食。" },
  { id: "oyster-mushroom", name: "平菇", en: "oyster mushroom", category: "菌菇", nature: "寒", effects: ["和中"], regions: ["CN"], searchTerms: ["pinggu", "pg", "oyster mushroom"], summary: "偏寒凉的高频菌菇条目。" },
  { id: "shiitake", name: "香菇", en: "shiitake", category: "菌菇", nature: "平", effects: ["滋养"], regions: ["CN", "JP"], searchTerms: ["xianggu", "xg", "shiitake"], summary: "高频家常菌菇，整体偏平，兼顾鲜味与日常度。" }
];

RUNTIME_FOOD_EXPANSION.push(
  { id: "chaotianjiao", name: "朝天椒", en: "facing heaven pepper", category: "调料", nature: "热", effects: ["行气"], regions: ["CN"], searchTerms: ["chaotianjiao", "ctj", "xiaomila"], aliases: ["小米辣", "朝天红椒"], summary: "典型重口辣椒，辛热刺激更明显，适合作为少量提辣调味。", caution: "反流、胃黏膜敏感、痔疮发作、咽喉灼痛和口腔溃疡时不宜重用。" },
  { id: "moguijiao", name: "魔鬼椒", en: "ghost pepper", category: "调料", nature: "热", effects: ["行气"], regions: ["CN", "IN"], searchTerms: ["moguijiao", "mgj", "ghost pepper", "bhut jolokia"], aliases: ["神鬼椒", "超辣椒"], summary: "超高辣度辣椒，适合极少量调味，不适合作为普通日常蔬菜食材。", caution: "胃肠敏感、口腔咽喉炎症、反流、痔疮和儿童饮食场景都不宜使用。" },
  { id: "sea-urchin", name: "海胆", en: "sea urchin", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN", "JP"], searchTerms: ["haidan", "hd", "sea urchin"], summary: "偏寒凉的海产细分条目，更适合完全熟食或冷鲜少量食用。", caution: "脾胃虚寒、腹泻和生食场景要更谨慎。" },
  { id: "razor-clam", name: "蛏子", en: "razor clam", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["chengzi", "cz", "razor clam"], summary: "常见贝类海产，整体偏寒凉，适合熟食清烹。", caution: "腹泻、胃寒和贝类过敏人群慎食。" },
  { id: "whelk", name: "海螺", en: "whelk", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["hailuo", "hl", "whelk"], summary: "偏寒凉的海产条目，强调来源和熟制。", caution: "来源不明或未熟透时避免食用，脾胃虚寒者少吃。" },
  { id: "seaweed-green", name: "裙带菜", en: "wakame", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN", "JP", "KR"], searchTerms: ["qundaicai", "qdc", "wakame"], summary: "偏寒凉海藻类，适合汤煮或凉拌少量。", caution: "胃寒腹泻和甲状腺管理严格阶段需注意总量。" },
  { id: "sea-grape", name: "海葡萄", en: "sea grapes", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN", "JP"], searchTerms: ["haiputao", "hpt", "sea grapes"], summary: "偏寒凉、口感脆嫩的海藻型海产。", caution: "冷食量大时更易刺激胃肠，脾胃虚寒者慎食。" },
  { id: "wild-kiwiberry", name: "软枣猕猴桃", en: "kiwiberry", category: "水果", nature: "寒", effects: ["清润"], regions: ["CN"], searchTerms: ["ruanzaomihoutao", "rzmht", "kiwiberry"], summary: "偏寒凉的小果型猕猴桃，适合少量鲜食。", caution: "胃寒、腹泻和空腹大量食用时更易不适。" },
  { id: "wild-blueberry", name: "笃斯越橘", en: "wild blueberry", category: "水果", nature: "凉", effects: ["清润"], regions: ["CN"], searchTerms: ["dusiyueju", "dsyj", "wild blueberry"], aliases: ["越橘"], summary: "东北山地常见小浆果，偏凉润。", caution: "胃酸明显或空腹大量食用时需注意刺激感。" },
  { id: "sea-buckthorn-berry", name: "沙棘果", en: "sea buckthorn berry", category: "水果", nature: "温", effects: ["生津"], regions: ["CN"], searchTerms: ["shajiguo", "sjg", "sea buckthorn berry"], summary: "西北高频野果，酸收而偏温，适合少量做饮。", caution: "反流、胃酸过多和空腹场景下不宜多食。" },
  { id: "wild-raspberry", name: "树莓", en: "raspberry", category: "水果", nature: "温", effects: ["生津"], regions: ["CN"], searchTerms: ["shumei", "sm", "raspberry"], summary: "山地浆果条目，整体偏温而酸甜。", caution: "口干便秘明显时不宜大量浓缩果酱式食用。" },
  { id: "fishmint-shoot", name: "折耳根尖", en: "fish mint shoot", category: "野菜", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["zheergenjian", "zegj"], summary: "折耳根更细分的春季嫩尖条目，偏寒凉更明显。", caution: "胃寒腹泻和生食耐受差者慎食。" },
  { id: "bracken-tip", name: "蕨菜尖", en: "bracken tip", category: "野菜", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["juecaijian", "jcj"], summary: "山野菜细分条目，重点仍是规范处理后少量熟食。", caution: "不建议高频长期食用，胃肠敏感者慎食。" },
  { id: "cinenya", name: "刺嫩芽", en: "aralia bud", category: "野菜", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["cinenya", "cny", "cilaoya"], aliases: ["刺老芽", "树头菜"], summary: "东北山野菜，高频做法是焯后凉拌或快炒。", caution: "胃寒腹泻和来源不明采摘场景都要谨慎。" },
  { id: "wild-allium", name: "沙葱", en: "wild allium", category: "野菜", nature: "热", effects: ["行气"], regions: ["CN"], searchTerms: ["shacong", "sc", "wild allium"], summary: "西北地方香草型野菜，辛香偏热，适合少量提味。", caution: "口干、便秘、咽痛和反流明显时不宜重食。" },
  { id: "pickled-chili-mix", name: "剁椒", en: "chopped chili", category: "调料", nature: "热", effects: ["行气"], regions: ["CN"], searchTerms: ["duojiao", "dj", "chopped chili"], summary: "重口发酵辣味调料，适合少量提味。", caution: "胃炎、反流、口腔溃疡和高盐饮食管理阶段慎用。" },
  { id: "yellow-lantern-chili", name: "黄灯笼椒", en: "yellow lantern chili", category: "调料", nature: "热", effects: ["行气"], regions: ["CN"], searchTerms: ["huangdenglongjiao", "hdlj"], summary: "海南高频辣椒调味，热性更集中。", caution: "胃肠敏感和咽喉炎症期不宜多吃。" },
  { id: "pickled-mustard", name: "酸芥菜", en: "pickled mustard greens", category: "腌菜", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["suanjiecai", "sjc"], summary: "发酵酸菜型地方配菜，整体偏寒凉且偏咸。", caution: "胃酸明显、腹泻和高盐管理阶段不宜多食。" },
  { id: "perilla-leaf-purple", name: "紫苏叶", en: "perilla leaf", category: "调料", nature: "温", effects: ["行气"], regions: ["CN", "JP", "KR"], searchTerms: ["zisuye", "zsy", "perilla"], summary: "芳香温散型叶类调味，适合鱼蟹、凉拌与煮汤点到为止。", caution: "阴虚内热、口干明显时不宜长期重用。" }
);

RUNTIME_FOOD_EXPANSION.push(
  { id: "sha-ginger-powder", name: "沙姜粉", en: "sand ginger powder", category: "调料", nature: "热", effects: ["行气"], regions: ["CN"], searchTerms: ["shajiangfen", "sjf", "shannaifen"], aliases: ["山奈粉"], summary: "粤桂常见重香型蘸料，辛香偏热，适合少量提味。", caution: "反流、胃热、咽痛和口腔溃疡时不宜重用。" },
  { id: "jellyfish-head", name: "海蜇头", en: "jellyfish head", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["haizhetou", "hzt"], summary: "偏寒凉海产冷菜条目，适合少量凉拌熟制。", caution: "胃寒腹泻、高盐饮食管理和来源不明加工场景需谨慎。" },
  { id: "mud-clam", name: "泥蚶", en: "blood clam", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["nihan", "nh", "blood clam"], summary: "地方高频贝类，整体偏寒凉，强调熟制。", caution: "生食风险高，脾胃虚寒与贝类过敏人群慎食。" },
  { id: "chili-flakes", name: "辣椒面", en: "chili flakes", category: "调料", nature: "热", effects: ["行气"], regions: ["CN"], searchTerms: ["lajiaomian", "ljm"], summary: "重口辣味粉料，适合少量提辣，不宜当主食材。", caution: "胃肠敏感、痔疮、口咽发炎时不宜重用。" },
  { id: "tengjiao-oil", name: "藤椒油", en: "green pepper oil", category: "调料", nature: "热", effects: ["行气"], regions: ["CN"], searchTerms: ["tengjiaoyou", "tjy"], summary: "麻香型重口调味油，偏热且刺激性更集中。", caution: "反流、胃炎和咽喉不适时不宜重口连续食用。" }
);

RUNTIME_FOOD_EXPANSION.push(
  { id: "pomfret", name: "鲳鱼", en: "pomfret", category: "海产", nature: "平", effects: ["和中"], regions: ["CN"], searchTerms: ["changyu", "cy", "pomfret"], summary: "沿海高频海鱼，整体偏平和，适合清蒸与煮汤。", caution: "海鱼过敏人群慎食。" },
  { id: "yellow-croaker", name: "黄鱼", en: "yellow croaker", category: "海产", nature: "温", effects: ["补益"], regions: ["CN"], searchTerms: ["huangyu", "hy", "yellow croaker"], summary: "沿海家常海鱼，偏温和，适合蒸煮。", caution: "发热、口干明显时不宜重油重辣。" },
  { id: "hairtail", name: "带鱼", en: "hairtail", category: "海产", nature: "温", effects: ["补益"], regions: ["CN"], searchTerms: ["daiyu", "dy", "hairtail"], summary: "高频家常海鱼，偏温，适合煎烧与清蒸。", caution: "油炸做法更易腻滞，反流人群少食。" },
  { id: "silver-cod", name: "银鳕鱼", en: "silver cod", category: "海产", nature: "平", effects: ["补益"], regions: ["CN"], searchTerms: ["yinxueyu", "yxy", "silver cod"], summary: "脂肪感较高的海鱼条目，适合蒸烤少量。", caution: "反流、胆囊敏感和高脂管理阶段注意总量。" },
  { id: "mackerel", name: "鲅鱼", en: "mackerel", category: "海产", nature: "温", effects: ["补益"], regions: ["CN"], searchTerms: ["bayu", "by", "mackerel"], summary: "北方高频海鱼，偏温，适合炖煮与做馅。", caution: "鱼类过敏和痛风急性期慎食。" },
  { id: "scallop-fresh", name: "扇贝", en: "scallop", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["shanbei", "sb", "scallop"], summary: "高频贝类，偏寒凉，适合熟食清烹。", caution: "脾胃虚寒、腹泻和贝类过敏人群慎食。" },
  { id: "surf-clam", name: "花蛤", en: "clam", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["huage", "hg", "clam"], aliases: ["蛤蜊"], summary: "高频贝类，偏寒凉，适合熟食少量。", caution: "胃寒腹泻和贝类过敏人群慎食。" },
  { id: "winkle", name: "香螺", en: "sea snail", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["xiangluo", "xl", "sea snail"], summary: "沿海常见螺类海产，偏寒凉。", caution: "必须熟透，脾胃虚寒者不宜多食。" },
  { id: "sea-anemone-veg", name: "石花菜", en: "agar seaweed", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["shihuacai", "shc"], summary: "海藻型凉菜条目，偏寒凉。", caution: "胃寒腹泻和冷食大量场景慎食。" },
  { id: "shepherds-purse", name: "荠菜", en: "shepherds purse", category: "野菜", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["jicai", "jc", "shepherds purse"], summary: "春季高频野菜，偏凉平，适合汆烫、煮汤和做馅。", caution: "胃寒腹泻时不宜生冷多食。" },
  { id: "purslane", name: "马齿苋", en: "purslane", category: "野菜", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["machixian", "mcx", "purslane"], summary: "偏寒凉的常见野菜，适合熟食少量。", caution: "脾胃虚寒和孕期自行大量食用需谨慎。" },
  { id: "toon-sprout", name: "香椿芽", en: "toon sprout", category: "野菜", nature: "温", effects: ["行气"], regions: ["CN"], searchTerms: ["xiangchunya", "xcy", "toon sprout"], summary: "春季高频芽菜，香气明显，偏温散。", caution: "上火、咽痛和重口炒制场景不宜过量。" },
  { id: "osmund-shoot", name: "紫萁", en: "osmund fern", category: "野菜", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["ziqi", "zq", "osmund fern"], summary: "山野菜细分条目，偏寒凉，适合焯后熟食。", caution: "胃寒腹泻和来源不明采食场景慎用。" },
  { id: "pickled-radish", name: "萝卜干", en: "dried radish", category: "腌菜", nature: "温", effects: ["理气"], regions: ["CN"], searchTerms: ["luobogan", "lbg"], summary: "高频下饭腌菜，偏温而咸。", caution: "高盐管理、胃炎和反流场景少食。" },
  { id: "pickled-longbean", name: "酸豆角", en: "pickled long bean", category: "腌菜", nature: "温", effects: ["理气"], regions: ["CN"], searchTerms: ["suandoujiao", "sdj"], summary: "重口腌菜条目，偏温散而偏咸。", caution: "高盐饮食管理和胃酸明显时注意总量。" },
  { id: "pickled-turnip", name: "榨菜丝", en: "pickled mustard stem", category: "腌菜", nature: "温", effects: ["理气"], regions: ["CN"], searchTerms: ["zhacaisi", "zcs"], summary: "高频佐餐腌菜，偏温而咸鲜。", caution: "高血压、水肿和胃炎人群不宜多食。" },
  { id: "fish-sauce", name: "鱼露", en: "fish sauce", category: "调料", nature: "温", effects: ["行气"], regions: ["TH", "MY", "SG", "CN"], searchTerms: ["yulu", "yl", "fish sauce"], summary: "重鲜咸型调味料，偏温。", caution: "高盐饮食管理和海鲜过敏人群慎用。" },
  { id: "shrimp-paste", name: "虾酱", en: "shrimp paste", category: "调料", nature: "热", effects: ["行气"], regions: ["CN", "MY", "TH"], searchTerms: ["xiajiang", "xj", "shrimp paste"], summary: "重口发酵调味，偏热且腥鲜感重。", caution: "反流、胃炎、口腔炎症和高盐管理阶段慎用。" },
  { id: "fermented-bean-curd-red", name: "红腐乳", en: "red fermented tofu", category: "调料", nature: "温", effects: ["和中"], regions: ["CN"], searchTerms: ["hongfuru", "hfr"], summary: "重口发酵豆制调味，偏温而咸鲜。", caution: "高盐饮食管理、痛风和反流人群注意总量。" },
  { id: "mustard-greens-pickle", name: "梅干菜", en: "preserved mustard greens", category: "腌菜", nature: "温", effects: ["理气"], regions: ["CN"], searchTerms: ["meigancai", "mgc"], summary: "江南高频腌菜条目，偏温而咸香。", caution: "高盐管理和胃炎阶段少食。" }
);

RUNTIME_FOOD_EXPANSION.push(
  { id: "sea-bass-local", name: "海鲈鱼", en: "sea bass", category: "海产", nature: "平", effects: ["滋养"], regions: ["CN"], searchTerms: ["hailuyu", "hly", "sea bass"], summary: "沿海常见鲈鱼，适合清蒸或煮汤。", caution: "海鲜过敏、痛风急性期注意总量。" },
  { id: "mullet", name: "乌头鱼", en: "mullet", category: "海产", nature: "平", effects: ["滋养"], regions: ["CN"], searchTerms: ["wutouyu", "wty", "mullet"], summary: "南方河海鲜鱼，肉质细嫩。", caution: "海鲜过敏者慎食，需彻底做熟。" },
  { id: "red-grouper", name: "石斑鱼", en: "grouper", category: "海产", nature: "平", effects: ["滋养"], regions: ["CN"], searchTerms: ["shibanyu", "sby", "grouper"], summary: "高档海鱼，常见于清蒸与煲汤。", caution: "海鲜过敏、痛风人群控制频率。" },
  { id: "moon-shell", name: "花螺", en: "babylon snail", category: "海产", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["hualuo", "hl", "babylon snail"], summary: "沿海螺类，需彻底做熟后食用。", caution: "脾胃虚寒、腹泻者不宜多食。" },
  { id: "sea-clam", name: "青口贝", en: "mussel", category: "海产", nature: "寒", effects: ["清利"], regions: ["CN"], searchTerms: ["qingkoubei", "qkb", "mussel"], summary: "常见贝类，多用于煮汤或蒜蓉蒸。", caution: "贝类过敏、痛风及体寒者注意总量。" },
  { id: "marsh-samphire", name: "海蓬子", en: "samphire", category: "野菜", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["haipengzi", "hpz", "samphire"], summary: "沿海盐碱地野菜，口感脆嫩。", caution: "来源不明或未熟透时不宜食用。" },
  { id: "seablite", name: "盐碱草", en: "seablite", category: "野菜", nature: "凉", effects: ["清利"], regions: ["CN"], searchTerms: ["yanjiaocao", "yjc", "seablite"], summary: "海边常见野菜，宜焯水后熟食。", caution: "脾胃虚寒、腹泻者少食。" },
  { id: "wild-pepper-leaf", name: "花椒芽", en: "pepper sprout", category: "野菜", nature: "温", effects: ["行气"], regions: ["CN"], searchTerms: ["huajiaoya", "hjy", "pepper sprout"], summary: "春季山野菜，辛香开胃。", caution: "上火、咽痛时不宜多吃。" },
  { id: "wild-garlic-leaf", name: "野蒜", en: "wild garlic", category: "野菜", nature: "温", effects: ["行气"], regions: ["CN"], searchTerms: ["yesuan", "ys", "wild garlic"], summary: "山野蒜类，香气浓，宜做配菜。", caution: "胃热、口腔溃疡者少食。" },
  { id: "pickled-bamboo-shoot", name: "酸笋丝", en: "pickled bamboo shoot", category: "腌菜", nature: "凉", effects: ["开胃"], regions: ["CN"], searchTerms: ["suansunsi", "sss"], summary: "西南常见腌渍笋丝，酸辣开胃。", caution: "高盐、胃酸反流者控制总量。" },
  { id: "pickled-greens", name: "酸菜心", en: "pickled greens heart", category: "腌菜", nature: "凉", effects: ["开胃"], regions: ["CN"], searchTerms: ["suancaixin", "scx"], summary: "东北腌渍菜心，咸酸爽脆。", caution: "高血压、水肿期注意控盐。" },
  { id: "fermented-chili-bean", name: "豆瓣辣椒酱", en: "chili bean paste", category: "调料", nature: "热", effects: ["温中"], regions: ["CN"], searchTerms: ["doubanlajiang", "dblj"], summary: "川味重口调味，辛辣鲜香。", caution: "反流、痔疮、上火明显时慎用。" },
  { id: "pickled-pepper-sauce", name: "泡辣椒酱", en: "pickled chili sauce", category: "腌菜", nature: "热", effects: ["温中"], regions: ["CN"], searchTerms: ["paojiaojiang", "pjj"], summary: "泡椒类腌渍调味，偏热辣。", caution: "胃病患者、控盐期注意总量。" },
  { id: "mustard-oil", name: "芥末油", en: "mustard oil", category: "调料", nature: "温", effects: ["温中"], regions: ["CN", "IN"], searchTerms: ["jiemoyou", "jmy", "mustard oil"], summary: "辛香调味油，用量宜少。", caution: "胃黏膜敏感、甲状腺问题者慎用。" },
  { id: "perilla-salt", name: "紫苏盐", en: "perilla salt", category: "调料", nature: "温", effects: ["行气"], regions: ["CN", "JP"], searchTerms: ["zisuyan", "zsy", "perilla salt"], summary: "客家风味调味盐，辛香提味。", caution: "控盐期不宜多用。" },
  { id: "devils-tongue-berry", name: "刺泡果", en: "wild raspberry", category: "水果", nature: "平", effects: ["生津"], regions: ["CN"], searchTerms: ["cipaoguo", "cpg"], summary: "山野浆果，酸甜，宜熟食少量。", caution: "未成熟或来源不明时不要采食。" }
);

[
  {
    english: "babylon snail",
    patch: { name: "花螺", aliases: ["东风螺"], regional: ["岭南海产"] }
  },
  {
    english: "mussel",
    patch: { name: "青口贝", aliases: ["贻贝", "淡菜鲜贝"], regional: ["沿海贝类"] }
  },
  {
    english: "sea bass",
    patch: { name: "海鲈鱼", aliases: ["鲈鱼"], regional: ["沿海鲜鱼"] }
  },
  {
    english: "mullet",
    patch: { name: "乌头鱼", aliases: ["乌鱼"], regional: ["粤港海鱼"] }
  },
  {
    english: "grouper",
    patch: { name: "石斑鱼", aliases: [], regional: ["南方海鱼"] }
  },
  {
    english: "samphire",
    patch: { name: "海蓬子", aliases: [], regional: ["滨海野菜"] }
  },
  {
    english: "seablite",
    patch: { name: "盐角草", aliases: [], regional: ["滨海野菜"] }
  },
  {
    english: "pepper sprout",
    patch: { name: "花椒芽", aliases: [], regional: ["北方芽菜"] }
  },
  {
    english: "wild garlic",
    patch: { name: "野蒜", aliases: [], regional: ["山野菜"] }
  },
  {
    english: "pickled bamboo shoot",
    patch: { name: "酸笋丝", aliases: ["酸笋"], regional: ["西南腌菜"] }
  },
  {
    english: "pickled greens heart",
    patch: { name: "酸菜芯", aliases: [], regional: ["北方腌菜"] }
  },
  {
    english: "chili bean paste",
    patch: { name: "豆瓣辣酱", aliases: ["郫县豆瓣"], regional: ["川式调味"] }
  },
  {
    english: "pickled chili sauce",
    patch: { name: "泡椒酱", aliases: [], regional: ["川渝调味"] }
  },
  {
    english: "mustard oil",
    patch: { name: "芥末油", aliases: [], regional: ["辛香调味"] }
  },
  {
    english: "perilla salt",
    patch: { name: "紫苏盐", aliases: [], regional: ["日式调味"] }
  }
].forEach(({ english, patch }) => {
  const entry = RUNTIME_SEARCH_INDEX.find((item) => (item.english || []).includes(english));
  if (entry) Object.assign(entry, patch);
});

[
  {
    id: "sea-bass-local",
    patch: {
      name: "海鲈鱼",
      category: "海产",
      nature: "平",
      effects: ["和中"],
      summary: "日常高频海鱼，肉质细嫩，适合清蒸、煮汤和家常熟食。",
      caution: "海鲜过敏、痛风急性期或来源不明未熟透时需谨慎。"
    }
  },
  {
    id: "mullet",
    patch: {
      name: "乌头鱼",
      category: "海产",
      nature: "平",
      effects: ["和中"],
      summary: "粤港澳常见海鱼，适合蒸煮和清淡家常做法。",
      caution: "鱼类过敏、胆固醇管理严格或处理不当时需注意。"
    }
  },
  {
    id: "red-grouper",
    patch: {
      name: "石斑鱼",
      category: "海产",
      nature: "平",
      effects: ["滋养"],
      summary: "常见高频海鱼，适合蒸煮、炖汤和恢复期少量补充蛋白。",
      caution: "海鱼过敏、痛风急性期或浓汤高频进食时不宜过量。"
    }
  },
  {
    id: "moon-shell",
    patch: {
      name: "花螺",
      category: "海产",
      nature: "凉",
      effects: ["清鲜"],
      summary: "沿海常见贝螺类水产，风味鲜，适合完全熟食后少量食用。",
      caution: "脾胃虚寒、腹泻、贝类过敏和来源不明时需谨慎。"
    }
  },
  {
    id: "sea-clam",
    patch: {
      name: "青口贝",
      category: "海产",
      nature: "凉",
      effects: ["滋养"],
      summary: "沿海常见贝类，适合煮汤、炖煮和熟食搭配。",
      caution: "贝类过敏、海鲜来源不稳或痛风急性期应谨慎。"
    }
  },
  {
    id: "marsh-samphire",
    patch: {
      name: "海蓬子",
      category: "野菜",
      nature: "凉",
      effects: ["清利"],
      summary: "滨海野菜，口感清脆，适合焯水后凉拌或快炒。",
      caution: "脾胃虚寒、腹泻和高盐加工吃法下不宜多食。"
    }
  },
  {
    id: "seablite",
    patch: {
      name: "盐角草",
      category: "野菜",
      nature: "凉",
      effects: ["清鲜"],
      summary: "滨海常见植物，味带咸鲜，适合熟食搭配主菜。",
      caution: "本身偏咸鲜，合并重口调味时需注意盐分负担。"
    }
  },
  {
    id: "wild-pepper-leaf",
    patch: {
      name: "花椒芽",
      category: "野菜",
      nature: "温",
      effects: ["行气"],
      summary: "有明显辛香气味，适合点缀凉拌、热菜和蘸料。",
      caution: "口腔溃疡、胃热、反流和明显上火时不宜多食。"
    }
  },
  {
    id: "wild-garlic-leaf",
    patch: {
      name: "野蒜",
      category: "野菜",
      nature: "温",
      effects: ["温中"],
      summary: "山野菜中常见辛香类，适合熟食和提味。",
      caution: "胃热、口干咽痛、空腹大量食用时容易刺激胃部。"
    }
  },
  {
    id: "pickled-bamboo-shoot",
    patch: {
      name: "酸笋丝",
      category: "腌菜",
      nature: "凉",
      effects: ["开胃"],
      summary: "西南高频腌菜配料，风味酸鲜，适合少量搭配正餐。",
      caution: "胃酸反流、胃炎活动期和高盐饮食管理时不宜多吃。"
    }
  },
  {
    id: "pickled-greens",
    patch: {
      name: "酸菜芯",
      category: "腌菜",
      nature: "平",
      effects: ["开胃"],
      summary: "常见腌菜细分条目，适合做配菜和汤底点缀。",
      caution: "注意盐分、亚硝酸盐控制和整体摄入频率。"
    }
  },
  {
    id: "fermented-chili-bean",
    patch: {
      name: "豆瓣辣酱",
      category: "调料",
      nature: "热",
      effects: ["温中"],
      summary: "川式高频复合调味，适合少量提香提辣。",
      caution: "辛辣刺激和盐分都较高，反流、痔疮、口腔溃疡时不宜重用。"
    }
  },
  {
    id: "pickled-pepper-sauce",
    patch: {
      name: "泡椒酱",
      category: "调料",
      nature: "热",
      effects: ["开胃"],
      summary: "带酸辣感的复合调味，适合少量做蘸料或炒菜底味。",
      caution: "胃酸、腹泻、口腔刺激和高盐饮食管理时应谨慎。"
    }
  },
  {
    id: "mustard-oil",
    patch: {
      name: "芥末油",
      category: "调料",
      nature: "热",
      effects: ["辛散"],
      summary: "辛香刺激明显，适合少量提味，不适合大剂量直接食用。",
      caution: "胃黏膜敏感、反流、咽喉刺激和儿童场景需谨慎。"
    }
  },
  {
    id: "perilla-salt",
    patch: {
      name: "紫苏盐",
      category: "调料",
      nature: "温",
      effects: ["行气"],
      summary: "偏芳香型复合调味，适合搭配饭团、烤物和清淡主食。",
      caution: "注意盐分摄入，水肿或高血压管理期不宜多用。"
    }
  },
  {
    id: "devils-tongue-berry",
    patch: {
      name: "刺泡果",
      category: "水果",
      nature: "平",
      effects: ["生津"],
      summary: "地方野果条目，适合应季少量鲜食。",
      caution: "来源不明、未熟或胃肠敏感时不宜多食。"
    }
  }
].forEach(({ id, patch }) => {
  const entry = RUNTIME_FOOD_EXPANSION.find((item) => item.id === id);
  if (entry) Object.assign(entry, patch);
});

let foods = [];
let foodMap = new Map();
let ORIGIN_BY_BASE_ID = new Map();
let DAO_DI_BY_CANONICAL = new Map();

const FOOD_CATEGORY_ALIASES = {
  水产: "海产",
  果类: "水果"
};

function resolveFoodId(id) {
  if (typeof FOOD_ID_ALIASES !== "undefined" && FOOD_ID_ALIASES[id]) {
    return FOOD_ID_ALIASES[id];
  }
  return id;
}

function foodByRecipeId(id) {
  const resolved = resolveFoodId(id);
  return foodMap.get(resolved) || foodMap.get(id);
}
let publishedRecipeItems = [];
const RECIPE_SYNDROME_META = {
  "脾气虚": {
    useFor: ["食欲差", "饭后易胀", "疲乏乏力", "大便偏稀"],
    avoidFor: ["湿热壅盛", "舌苔黄腻且口苦明显时不宜重补"]
  },
  "胃气虚": {
    useFor: ["胃口弱", "吃少易饱", "饭后胃胀", "喜温食"],
    avoidFor: ["反酸灼热明显", "食积未解时不宜过补"]
  },
  "胃阴虚": {
    useFor: ["口干", "胃中燥热感", "干呕", "食欲减退"],
    avoidFor: ["腹泻畏寒", "脾胃虚寒明显时不宜过用凉润方"]
  },
  "脾阳虚": {
    useFor: ["怕冷", "腹部喜温喜按", "清晨腹泻", "精神不振"],
    avoidFor: ["口苦便秘", "内热明显时不宜多用辛热温补"]
  },
  "中气下陷": {
    useFor: ["疲乏下坠感", "久泻", "食少乏力", "站久更累"],
    avoidFor: ["食积未消", "湿热明显时不宜重补升提"]
  },
  "脾不统血": {
    useFor: ["面色少华", "久病体虚", "大便偏稀", "易疲乏"],
    avoidFor: ["出血性疾病活动期需先面诊", "湿热炽盛时不宜盲补"]
  },
  "痰湿困脾": {
    useFor: ["身体困重", "口黏", "舌苔厚腻", "纳差腹胀"],
    avoidFor: ["甜腻厚味", "夜宵频繁和酒精场景"]
  },
  "肝胃不和": {
    useFor: ["嗳气", "胸闷", "胃胀", "情绪影响胃口"],
    avoidFor: ["空腹浓茶咖啡", "辛辣油炸后症状明显者"]
  },
  "气血两虚": {
    useFor: ["乏力", "面色淡", "恢复期", "容易心悸或睡浅"],
    avoidFor: ["痰湿重", "湿热重", "补而更腻时需减量"]
  },
  "血虚": {
    useFor: ["面色少华", "头晕", "唇甲淡", "睡眠浅"],
    avoidFor: ["甜腻过量", "湿热与积滞明显时不宜重补"]
  },
  "肺阴虚": {
    useFor: ["咽干", "干咳", "燥热感", "天气干燥时不适"],
    avoidFor: ["冷饮过量", "脾胃虚寒腹泻时不宜偏凉多食"]
  },
  "肺气虚": {
    useFor: ["久咳后疲乏", "说话多易累", "食欲一般", "体虚易倦"],
    avoidFor: ["油炸辛辣过量", "咳嗽急性加重时不替代就医"]
  },
  "湿热内蕴": {
    useFor: ["口苦口黏", "暑湿困重", "纳呆油腻", "小便黄"],
    avoidFor: ["辛辣烧烤酒精", "甜腻厚味"]
  },
  "肝郁气滞": {
    useFor: ["情绪郁闷", "胸胁不舒", "食欲波动", "嗳气叹气多"],
    avoidFor: ["空腹浓咖啡", "夜晚重口刺激饮食"]
  },
  "阴虚内热": {
    useFor: ["口干", "心烦", "手足心热", "睡眠浅"],
    avoidFor: ["辛辣燥热", "酒精和浓烈香辛料"]
  },
  "肾阳虚": {
    useFor: ["怕冷", "腰膝酸软", "晨起精神弱", "偏寒体感明显"],
    avoidFor: ["内热便秘", "咽痛口干明显时不宜多用热补"]
  },
  "食积": {
    useFor: ["油腻后胀", "口中黏腻", "食后不舒", "偶发胃堵"],
    avoidFor: ["空腹长期饮用消食饮", "胃酸反流明显时需减量"]
  },
  "理气": {
    useFor: ["嗳气", "胃堵", "胀满", "吃后不舒"],
    avoidFor: ["阴虚燥热明显", "空腹过用辛散之品"]
  },
  "行气": {
    useFor: ["气机郁滞", "饭后胀", "情绪郁闷时胃口差"],
    avoidFor: ["气阴两伤、明显虚热时不宜太辛散"]
  },
  "降气": {
    useFor: ["反胃", "嗳气上逆", "胸膈不舒"],
    avoidFor: ["胃寒明显、腹泻时避免偏凉降气过度"]
  }
};

const RECIPE_FILTER_AVOID_SHORT = {
  "湿热壅盛": "湿热壅盛",
  "舌苔黄腻且口苦明显时不宜重补": "黄腻忌重补",
  "反酸灼热明显": "反酸忌补",
  "食积未解时不宜过补": "食积忌过补",
  "腹泻畏寒": "腹泻畏寒",
  "脾胃虚寒明显时不宜过用凉润方": "虚寒忌凉润",
  "口苦便秘": "口苦便秘",
  "内热明显时不宜多用辛热温补": "内热忌温补",
  "食积未消": "食积未消",
  "湿热明显时不宜重补升提": "湿热忌升提",
  "出血性疾病活动期需先面诊": "出血先面诊",
  "湿热炽盛时不宜盲补": "湿热忌盲补",
  "甜腻厚味": "甜腻厚味",
  "夜宵频繁和酒精场景": "忌夜宵酒",
  "空腹浓茶咖啡": "忌空腹茶咖",
  "辛辣油炸后症状明显者": "忌辛辣油炸",
  "痰湿重": "痰湿重",
  "湿热重": "湿热重",
  "补而更腻时需减量": "补腻减量",
  "甜腻过量": "甜腻过量",
  "湿热与积滞明显时不宜重补": "湿热积滞忌补",
  "冷饮过量": "冷饮过量",
  "脾胃虚寒腹泻时不宜偏凉多食": "虚寒腹泻忌凉",
  "油炸辛辣过量": "忌油炸辛辣",
  "咳嗽急性加重时不替代就医": "咳重需就医",
  "辛辣烧烤酒精": "忌辣烤酒",
  "空腹浓咖啡": "忌空腹咖啡",
  "夜晚重口刺激饮食": "忌夜宵重口",
  "辛辣燥热": "辛辣燥热",
  "酒精和浓烈香辛料": "忌酒香辛",
  "内热便秘": "内热便秘",
  "咽痛口干明显时不宜多用热补": "咽痛忌热补",
  "空腹长期饮用消食饮": "忌空腹消食",
  "胃酸反流明显时需减量": "反流需减量",
  "阴虚燥热明显": "阴虚燥热",
  "空腹过用辛散之品": "忌空腹辛散",
  "气阴两伤、明显虚热时不宜太辛散": "虚热忌辛散",
  "胃寒明显、腹泻时避免偏凉降气过度": "胃寒忌凉降"
};

function buildRecipeFilterTags(corpusItems = []) {
  const useForTexts = new Set();
  const avoidForTexts = new Set();
  Object.values(RECIPE_SYNDROME_META).forEach((meta) => {
    (meta.useFor || []).forEach((text) => useForTexts.add(text));
    (meta.avoidFor || []).forEach((text) => avoidForTexts.add(text));
  });
  corpusItems.forEach((item) => {
    (item.useFor || []).forEach((text) => useForTexts.add(text));
    (item.avoidFor || []).forEach((text) => avoidForTexts.add(text));
  });
  const tags = [];
  useForTexts.forEach((text) => {
    tags.push({ id: text, kind: "useFor", short: text, full: text, match: [text] });
  });
  avoidForTexts.forEach((text) => {
    const short = RECIPE_FILTER_AVOID_SHORT[text] || (text.length <= 8 ? text : `${text.slice(0, 7)}…`);
    tags.push({ id: short, kind: "avoidFor", short, full: text, match: [text] });
  });
  return tags;
}

function buildRecipeFilterTagLookups(tags) {
  const byId = Object.fromEntries(tags.map((tag) => [tag.id, tag]));
  const byMatch = new Map();
  tags.forEach((tag) => {
    (tag.match || []).forEach((text) => byMatch.set(text, tag.id));
  });
  return { byId, byMatch };
}

function stringsToFilterTagIds(strings, kind, lookup) {
  const ids = new Set();
  (strings || []).forEach((text) => {
    const tagId = lookup.byMatch.get(text);
    if (!tagId) return;
    const tag = lookup.byId[tagId];
    if (tag?.kind === kind) ids.add(tagId);
  });
  return [...ids];
}

function normalizeRecipeFilterValue(value, kind, lookup) {
  if (!value || value === "全部") return "全部";
  if (lookup.byId[value]?.kind === kind) return value;
  const fromMatch = lookup.byMatch.get(value);
  if (fromMatch && lookup.byId[fromMatch]?.kind === kind) return fromMatch;
  return value;
}

function recipeFilterTagLabel(tagId, lookup) {
  return lookup.byId[tagId]?.short || tagId;
}

function recipeFilterTagTooltip(tagId, lookup) {
  const tag = lookup.byId[tagId];
  if (!tag || tag.full === tag.short) return "";
  return tag.full;
}

let RECIPE_FILTER_TAGS = [];
let RECIPE_FILTER_TAG_LOOKUP = buildRecipeFilterTagLookups([]);

const RECIPE_STRUCTURE_META = {
  "脾气虚": { timing: ["早餐", "晚餐", "恢复期"], cooking: ["煮粥", "炖煮"], keywords: ["山药", "莲子", "小米", "大枣", "鸡肉"] },
  "胃气虚": { timing: ["早餐", "午餐", "晚餐"], cooking: ["煮粥", "炖汤"], keywords: ["山药", "大米", "鸡肉", "猪肚", "红枣"] },
  "胃阴虚": { timing: ["午后", "晚餐", "口干时"], cooking: ["煮粥", "炖汤", "蒸炖"], keywords: ["银耳", "百合", "梨", "莲子", "麦冬"] },
  "脾阳虚": { timing: ["早餐", "晚餐", "天冷时"], cooking: ["炖汤", "煮粥", "焖煮"], keywords: ["生姜", "羊肉", "山药", "糯米", "胡椒"] },
  "中气下陷": { timing: ["早餐", "午餐", "恢复期"], cooking: ["煮粥", "炖汤"], keywords: ["黄芪", "党参", "山药", "鸡肉", "大枣"] },
  "脾不统血": { timing: ["早餐", "晚餐", "恢复期"], cooking: ["煮粥", "炖汤"], keywords: ["黄芪", "当归", "红枣", "桂圆", "山药"] },
  "气血两虚": { timing: ["早餐", "晚餐", "恢复期"], cooking: ["炖汤", "煮粥", "蒸炖"], keywords: ["当归", "黄芪", "红枣", "鸡肉", "桂圆"] },
  "血虚": { timing: ["晚餐", "恢复期"], cooking: ["炖汤", "煮粥"], keywords: ["红枣", "桂圆", "黑芝麻", "鸡肉", "当归"] },
  "肺阴虚": { timing: ["午后", "晚餐", "干咳时"], cooking: ["炖汤", "蒸炖", "煮饮"], keywords: ["银耳", "百合", "梨", "川贝", "沙参"] },
  "肺气虚": { timing: ["早餐", "午后", "恢复期"], cooking: ["炖汤", "煮饮", "煮粥"], keywords: ["山药", "百合", "党参", "鸡肉", "梨"] },
  "肝胃不和": { timing: ["饭后", "午后"], cooking: ["煮饮", "煮粥", "炖煮"], keywords: ["陈皮", "佛手", "玫瑰", "小米", "山楂"] },
  "湿热内蕴": { timing: ["午餐", "暑湿天"], cooking: ["煮汤", "煮饮", "清炖"], keywords: ["薏米", "赤小豆", "冬瓜", "茯苓", "荷叶"] },
  "痰湿困脾": { timing: ["早餐", "午餐"], cooking: ["煮粥", "炖汤"], keywords: ["薏米", "茯苓", "白扁豆", "陈皮", "山药"] },
  "肝郁气滞": { timing: ["午后", "饭后"], cooking: ["煮饮", "蒸炖"], keywords: ["玫瑰", "佛手", "陈皮", "紫苏", "麦芽"] },
  "阴虚内热": { timing: ["午后", "晚餐", "口干时"], cooking: ["煮饮", "蒸炖", "煮粥"], keywords: ["百合", "银耳", "麦冬", "梨", "桑叶"] },
  "肾阳虚": { timing: ["早餐", "晚餐", "冬季"], cooking: ["炖汤", "焖煮"], keywords: ["羊肉", "核桃", "生姜", "栗子", "韭菜"] },
  "理气": { timing: ["饭后", "午后"], cooking: ["煮饮", "煮粥"], keywords: ["陈皮", "佛手", "玫瑰", "麦芽", "山楂"] },
  "行气": { timing: ["饭后", "午后"], cooking: ["煮饮", "快炒", "煮粥"], keywords: ["紫苏", "陈皮", "佛手", "青皮", "萝卜"] },
  "降气": { timing: ["饭后", "晚餐"], cooking: ["煮饮", "炖煮"], keywords: ["萝卜", "陈皮", "佛手", "紫苏", "山楂"] },
  "食积": { timing: ["饭后", "油腻后"], cooking: ["煮饮", "煮粥"], keywords: ["山楂", "麦芽", "萝卜", "陈皮", "鸡内金"] }
};

function inferRecipeStructure(item) {
  const meta = RECIPE_STRUCTURE_META[item.primarySyndrome] || {};
  const textBlob = [item.name, item.subtitle, item.note, ...(item.ingredients || []), ...(item.steps || [])].join(" ");
  const foodNames = uniq((item.foods || []).map((food) => food.name).filter(Boolean));
  const timing = uniq([
    ...(meta.timing || []),
    ...(/\u65e9\u9910|\u65e9\u665a|\u6668\u8d77/u.test(textBlob) ? ["\u65e9\u9910"] : []),
    ...(/\u5348\u540e|\u4e0b\u5348/u.test(textBlob) ? ["\u5348\u540e"] : []),
    ...(/\u665a\u9910|\u591c\u95f4|\u7761\u524d/u.test(textBlob) ? ["\u665a\u9910"] : []),
    ...(/\u996d\u540e/u.test(textBlob) ? ["\u996d\u540e"] : []),
    ...(/\u6062\u590d\u671f|\u75c5\u540e/u.test(textBlob) ? ["\u6062\u590d\u671f"] : [])
  ]);
  const cooking = uniq([
    ...(meta.cooking || []),
    ...(/\u7ca5/u.test(item.name) ? ["\u716e\u7ca5"] : []),
    ...(/\u6c64|\u7fb9/u.test(item.name) ? ["\u7096\u6c64"] : []),
    ...(/\u996e|\u8336/u.test(item.name) ? ["\u714e\u996e"] : []),
    ...(/\u84b8/u.test(item.name + textBlob) ? ["\u84b8\u7096"] : []),
    ...(/\u7092/u.test(item.name + textBlob) ? ["\u5feb\u7092"] : []),
    ...(/\u7096|\u7168|\u716e/u.test(item.name + textBlob) ? ["\u7096\u716e"] : [])
  ]);
  const coreFoods = uniq([
    ...foodNames.slice(0, 4),
    ...(meta.keywords || [])
  ]).slice(0, 6);
  const season = uniq([
    ...(/\u6625|\u98ce\u71e5|\u6625\u71e5/u.test(textBlob) ? ["\u6625\u5b63"] : []),
    ...(/\u590f|\u6691|\u6691\u6e7f/u.test(textBlob) ? ["\u590f\u5b63"] : []),
    ...(/\u79cb|\u79cb\u71e5|\u71e5\u54b3/u.test(textBlob) ? ["\u79cb\u5b63"] : []),
    ...(/\u51ac|\u754f\u5bd2|\u6e29\u8865/u.test(textBlob) ? ["\u51ac\u5b63"] : []),
    ...((/\u56db\u5b63|\u65e5\u5e38|\u5e73\u8865/u.test(textBlob) || (!/\u6625\u5b63|\u590f\u5b63|\u79cb\u5b63|\u51ac\u5b63/u.test(textBlob) && ["\u813e\u6c14\u865a", "\u80c3\u6c14\u865a", "\u4e2d\u6c14\u4e0b\u9677", "\u6c14\u8840\u4e24\u865a"].includes(item.primarySyndrome))) ? ["\u56db\u5b63"] : [])
  ]);
  const bodyFeel = uniq([
    ...((item.useFor || []).filter((tag) => /\u6015\u51b7|\u53e3\u5e72|\u996d\u540e\u6613\u80c0|\u6613\u5026|\u56f0\u91cd|\u80c3\u53e3\u5dee|\u54b3\u55fd|\u5fc3\u70e6|\u53cd\u80c3|\u54bd\u5e72|\u624b\u8db3\u5fc3\u70ed/u.test(tag))),
    ...(/\u6015\u51b7|\u754f\u5bd2/u.test(textBlob) ? ["\u6015\u51b7"] : []),
    ...(/\u53e3\u5e72|\u54bd\u5e72|\u71e5/u.test(textBlob) ? ["\u53e3\u5e72"] : []),
    ...(/\u996d\u540e|\u8179\u80c0|\u55f3\u6c14|\u80c3\u80c0/u.test(textBlob) ? ["\u996d\u540e\u6613\u80c0"] : []),
    ...(/\u4e4f\u529b|\u75b2\u5026|\u5026\u6020/u.test(textBlob) ? ["\u6613\u5026"] : []),
    ...(/\u56f0\u91cd|\u6691\u6e7f|\u53e3\u9ecf/u.test(textBlob) ? ["\u6691\u6e7f\u91cd"] : []),
    ...(/\u54b3|\u80ba/u.test(textBlob) ? ["\u54b3\u55fd\u5e72\u54b3"] : [])
  ]).slice(0, 5);
  const tonify = ["\u813e\u6c14\u865a", "\u80c3\u6c14\u865a", "\u813e\u9633\u865a", "\u4e2d\u6c14\u4e0b\u9677", "\u813e\u4e0d\u7edf\u8840", "\u6c14\u8840\u4e24\u865a", "\u8840\u865a", "\u80be\u9633\u865a", "\u80ba\u6c14\u865a"].includes(item.primarySyndrome)
    ? "\u504f\u8865"
    : (["\u80c3\u9634\u865a", "\u80ba\u9634\u865a", "\u6e7f\u70ed\u5185\u8574", "\u75f0\u6e7f\u56f0\u813e", "\u9634\u865a\u5185\u70ed"].includes(item.primarySyndrome) ? "\u4e0d\u504f\u8865" : "\u5e73\u8865");
  const clear = ["\u80c3\u9634\u865a", "\u80ba\u9634\u865a", "\u6e7f\u70ed\u5185\u8574", "\u75f0\u6e7f\u56f0\u813e", "\u9634\u865a\u5185\u70ed", "\u964d\u6c14", "\u7406\u6c14"].includes(item.primarySyndrome)
    ? "\u504f\u6e05\u5229"
    : (["\u813e\u9633\u865a", "\u80be\u9633\u865a", "\u6c14\u8840\u4e24\u865a", "\u813e\u6c14\u865a"].includes(item.primarySyndrome) ? "\u4e0d\u504f\u6e05\u5229" : "\u517c\u987e");
  return {
    timing: timing.length ? timing : ["\u65e5\u5e38\u6b63\u9910"],
    cooking: cooking.length ? cooking : ["\u7096\u716e"],
    coreFoods,
    season: season.length ? season : ["\u56db\u5b63"],
    bodyFeel: bodyFeel.length ? bodyFeel : ["\u65e5\u5e38\u8c03\u517b"],
    tonify,
    clear
  };
}

let recipes = [];

function recipeFilterTagsInUse(kind) {
  const field = kind === "useFor" ? "useForTags" : "avoidForTags";
  const counts = {};
  recipes.forEach((item) => {
    (item[field] || []).forEach((tagId) => {
      counts[tagId] = (counts[tagId] || 0) + 1;
    });
  });
  return RECIPE_FILTER_TAGS
    .filter((tag) => tag.kind === kind && counts[tag.id])
    .sort((a, b) => (counts[b.id] - counts[a.id]) || a.short.localeCompare(b.short, "zh-CN"))
    .slice(0, kind === "useFor" ? 18 : 16);
}

let RECIPE_USE_FOR_TAG_OPTIONS = [];
let RECIPE_AVOID_FOR_TAG_OPTIONS = [];
let RECIPE_TIMING_OPTIONS = [];
let RECIPE_COOKING_OPTIONS = [];
let RECIPE_CORE_FOOD_OPTIONS = [];
let RECIPE_SEASON_OPTIONS = [];
let RECIPE_SOLAR_TERM_OPTIONS = [];
let RECIPE_BODY_FEEL_OPTIONS = [];
let RECIPE_TONIFY_OPTIONS = [];
let RECIPE_CLEAR_OPTIONS = [];
let OFFICIAL_COUNT = 0;
let FOOD_MEDICINE_CATALOG_ENTRIES = [];
let FOOD_MEDICINE_CATALOG_BY_ID = new Map();
let CATALOG_OFFICIAL_COUNT = 0;
let TCM_HERB_COUNT = 0;
let TEA_COUNT = 0;
let CATEGORY_COUNTS = {};
let NATURE_COUNTS = {};
let REGION_COUNTS = {};

function collectTagCounts(items, tagKey) {
  const counts = {};
  items.forEach((food) => {
    (food[tagKey] || []).forEach((tag) => {
      if (!tag) return;
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return counts;
}

let libraryCatalog = [];
let PROVINCE_COUNTS = {};
let ETHNIC_COUNTS = {};
let PROVINCES_IN_CATALOG = [];
let ETHNICS_IN_CATALOG = [];
let LIBRARY_ETHNIC_QUICK = [];

function getVisibleEthnics() {
  if (state.libraryEthnicsExpanded || ETHNICS_IN_CATALOG.length <= ETHNIC_FILTER_EXPAND_LIMIT) {
    return ETHNICS_IN_CATALOG;
  }
  const head = ETHNICS_IN_CATALOG.slice(0, ETHNIC_FILTER_EXPAND_LIMIT);
  if (state.libraryEthnic !== "全部" && !head.includes(state.libraryEthnic)) {
    return [...head, state.libraryEthnic];
  }
  return head;
}

function renderLibraryEthnicShortcuts() {
  if (!LIBRARY_ETHNIC_QUICK.length) return "";
  return `
    <div class="library-shortcut-stack">
      <div class="recipe-scenario-row library-ethnic-row">
        <span class="recipe-shortcut-label">民族</span>
        ${chip("全部", "全部", "data-library-ethnic-quick", state.libraryEthnic === "全部")}
        ${LIBRARY_ETHNIC_QUICK.map((ethnic) => chip(
          ethnic,
          ethnic,
          "data-library-ethnic-quick",
          state.libraryEthnic === ethnic
        )).join("")}
        ${ETHNICS_IN_CATALOG.length > LIBRARY_ETHNIC_QUICK.length
          ? `<button type="button" class="plain-button library-more-filters" data-open-filters="library">更多民族</button>`
          : ""}
      </div>
    </div>
  `;
}

function foodMatchesQiTerm(food, term) {
  return (food.effects || []).includes(term) || (food.qiTerms || []).includes(term);
}

let QI_TERM_COUNTS = {};

function rebuildAppIndexes() {
  foods = dedupeFoods(normalizeFoods([
    ...(Array.isArray(EXPANDED_FOODS) ? EXPANDED_FOODS : []),
    ...(typeof CN_SUPPLEMENT_FOODS !== "undefined" ? CN_SUPPLEMENT_FOODS : []),
    ...(typeof TCM_HERBS_CORE !== "undefined" ? TCM_HERBS_CORE : []),
    ...filterRuntimeFoodExpansion(RUNTIME_FOOD_EXPANSION, [
      ...(Array.isArray(EXPANDED_FOODS) ? EXPANDED_FOODS : []),
      ...(typeof CN_SUPPLEMENT_FOODS !== "undefined" ? CN_SUPPLEMENT_FOODS : []),
      ...(typeof TCM_HERBS_CORE !== "undefined" ? TCM_HERBS_CORE : [])
    ]),
    ...(typeof ORIGIN_PRODUCT_FOODS !== "undefined" ? ORIGIN_PRODUCT_FOODS : [])
  ]));
  foodMap = new Map(foods.map((food) => [food.id, food]));
  ORIGIN_BY_BASE_ID = new Map();
  foods.filter((food) => food.isOriginProduct).forEach((food) => {
    const baseId = food.baseFoodId ? resolveFoodId(food.baseFoodId) : null;
    if (!baseId) return;
    if (!ORIGIN_BY_BASE_ID.has(baseId)) ORIGIN_BY_BASE_ID.set(baseId, []);
    ORIGIN_BY_BASE_ID.get(baseId).push(food);
  });
  DAO_DI_BY_CANONICAL = new Map(
    (typeof DAO_DI_REGIONS !== "undefined" ? DAO_DI_REGIONS : []).map((row) => [resolveFoodId(row.canonicalId), row])
  );
  mergeRecipeBundles();
  publishedRecipeItems = RECIPES.filter((item) => !item.draft);
  RECIPE_FILTER_TAGS = buildRecipeFilterTags(publishedRecipeItems);
  RECIPE_FILTER_TAG_LOOKUP = buildRecipeFilterTagLookups(RECIPE_FILTER_TAGS);
  recipes = publishedRecipeItems.map((item) => ({
    ...item,
    sources: item.sources || RECIPE_CLASSIC_SOURCES[item.id] || [],
    primarySyndrome: item.primarySyndrome || item.syndromes[0] || "",
    secondarySyndromes: (item.syndromes || []).slice(1),
    useFor: uniq((item.useFor || []).concat(RECIPE_SYNDROME_META[item.primarySyndrome || item.syndromes[0] || ""]?.useFor || [])),
    avoidFor: uniq((item.avoidFor || []).concat(RECIPE_SYNDROME_META[item.primarySyndrome || item.syndromes[0] || ""]?.avoidFor || [])),
    foods: item.foodIds.map((id) => foodByRecipeId(id)).filter(Boolean)
  })).map((item) => {
    const inferred = inferRecipeStructure(item);
    return {
      ...item,
      ...inferred,
      season: (item.season && item.season.length) ? item.season : inferred.season,
      solarTerm: cleanString(item.solarTerm || ""),
      useForTags: stringsToFilterTagIds(item.useFor, "useFor", RECIPE_FILTER_TAG_LOOKUP),
      avoidForTags: stringsToFilterTagIds(item.avoidFor, "avoidFor", RECIPE_FILTER_TAG_LOOKUP)
    };
  });
  RECIPE_USE_FOR_TAG_OPTIONS = recipeFilterTagsInUse("useFor");
  RECIPE_AVOID_FOR_TAG_OPTIONS = recipeFilterTagsInUse("avoidFor");
  RECIPE_TIMING_OPTIONS = uniq(recipes.flatMap((item) => item.timing || [])).slice(0, 12);
  RECIPE_COOKING_OPTIONS = uniq(recipes.flatMap((item) => item.cooking || [])).slice(0, 12);
  RECIPE_CORE_FOOD_OPTIONS = uniq(recipes.flatMap((item) => item.coreFoods || [])).slice(0, 18);
  RECIPE_SEASON_OPTIONS = uniq(recipes.flatMap((item) => item.season || [])).slice(0, 8);
  RECIPE_SOLAR_TERM_OPTIONS = uniq(recipes.map((item) => item.solarTerm).filter(Boolean))
    .sort((a, b) => a.localeCompare(b, "zh-CN"));
  RECIPE_BODY_FEEL_OPTIONS = uniq(recipes.flatMap((item) => item.bodyFeel || [])).slice(0, 12);
  RECIPE_TONIFY_OPTIONS = uniq(recipes.map((item) => item.tonify).filter(Boolean)).slice(0, 4);
  RECIPE_CLEAR_OPTIONS = uniq(recipes.map((item) => item.clear).filter(Boolean)).slice(0, 4);
  OFFICIAL_COUNT = foods.filter((food) => food.officialFoodMedicine).length;
  FOOD_MEDICINE_CATALOG_ENTRIES = typeof FOOD_MEDICINE_CATALOG !== "undefined" ? FOOD_MEDICINE_CATALOG : [];
  FOOD_MEDICINE_CATALOG_BY_ID = new Map(
    FOOD_MEDICINE_CATALOG_ENTRIES.map((row) => [resolveFoodId(row.canonicalId), row])
  );
  CATALOG_OFFICIAL_COUNT = FOOD_MEDICINE_CATALOG_ENTRIES.length;
  TCM_HERB_COUNT = foods.filter((food) => food.itemKind === "tcm-herb" || food.category === "中药材").length;
  TEA_COUNT = foods.filter((food) => food.category === "茶饮").length;
  CATEGORY_COUNTS = countBy(foods, (food) => food.category);
  NATURE_COUNTS = countBy(foods, (food) => food.nature);
  REGION_COUNTS = countBy(
    foods.flatMap((food) => food.regions.map((region) => ({ region }))),
    (item) => item.region
  );
  libraryCatalog = foods.filter((food) => !food.hiddenFromLibrary);
  PROVINCE_COUNTS = collectTagCounts(libraryCatalog, "provinces");
  ETHNIC_COUNTS = collectTagCounts(libraryCatalog, "ethnicGroups");
  PROVINCES_IN_CATALOG = Object.keys(PROVINCE_COUNTS)
    .filter(isProvinceFilterTag)
    .sort(
      (a, b) => PROVINCE_COUNTS[b] - PROVINCE_COUNTS[a] || a.localeCompare(b, "zh-CN")
    );
  ETHNICS_IN_CATALOG = Object.keys(ETHNIC_COUNTS).sort(
    (a, b) => ETHNIC_COUNTS[b] - ETHNIC_COUNTS[a] || a.localeCompare(b, "zh-CN")
  );
  LIBRARY_ETHNIC_QUICK = ETHNICS_IN_CATALOG.slice(0, 8);
  QI_TERM_COUNTS = Object.fromEntries(
    QI_TERMS_HOME.map((term) => [
      term,
      libraryCatalog.filter((food) => food.itemKind !== "tcm-herb" && foodMatchesQiTerm(food, term)).length
    ])
  );
}

rebuildAppIndexes();

window.atlasMergeDeferredBundles = function atlasMergeDeferredBundles() {
  rebuildAppIndexes();
  if (typeof render === "function" && document.getElementById("app")) {
    render();
  }
};

if (!window.__atlasDeferBoot) boot();
else window.atlasBoot = boot;

let navStackDepth = 0;

function isPwaStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function hasPwaInstallPrompt() {
  return Boolean(window.__atlasInstallPrompt);
}

function getPwaBrowserKind() {
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/SamsungBrowser/i.test(ua)) return "samsung";
  if (/EdgA|EdgiOS|Edg\//i.test(ua)) return "edge";
  if (/Chrome/i.test(ua) && /Android/i.test(ua)) return "chrome-android";
  if (/MSIE|Trident/i.test(ua)) return "legacy";
  return "generic";
}

function setupPwaInstallUi() {
  const refreshProfileInstall = () => {
    if (state.view === "profile") render();
  };
  window.addEventListener("atlas:beforeinstallprompt", refreshProfileInstall);
  window.addEventListener("appinstalled", () => {
    window.__atlasInstallPrompt = null;
    if (state.view === "profile") render();
    showToast("已安装到主屏幕");
  });
  if (window.__atlasInstallPrompt) refreshProfileInstall();
}

async function triggerPwaInstall() {
  const prompt = window.__atlasInstallPrompt;
  if (!prompt) {
    openPwaInstallGuide();
    return;
  }
  try {
    prompt.prompt();
    const choice = await prompt.userChoice;
    window.__atlasInstallPrompt = null;
    if (choice.outcome === "accepted") {
      showToast("正在安装…");
    } else {
      showToast("已取消安装");
    }
    render();
  } catch {
    openPwaInstallGuide();
  }
}

function renderPwaInstallGuideSheet() {
  const kind = getPwaBrowserKind();
  const guides = {
    "chrome-android": {
      title: "Chrome 安装步骤",
      steps: [
        "确认地址栏为 atlas.282913.xyz（或你的部署域名）",
        "点右上角 ⋮ 菜单",
        "选择「安装应用」或「添加到主屏幕」",
        "在弹窗中确认安装"
      ],
      note: "若菜单里没有「安装应用」，可多访问几次本站或先进入「我的」再试一键安装。"
    },
    edge: {
      title: "Edge 安装步骤",
      steps: [
        "点底部或右上角菜单",
        "选择「添加到手机」或「安装此站点」",
        "按提示确认"
      ],
      note: "部分 Edge 版本名称略有不同，找带「安装」或「主屏幕」的项即可。"
    },
    samsung: {
      title: "三星浏览器安装步骤",
      steps: [
        "点右下角菜单",
        "选择「添加页面到」→「主屏幕」",
        "确认添加"
      ],
      note: "三星浏览器不支持一键安装 API，需用手动添加。"
    },
    ios: {
      title: "iPhone 安装步骤",
      steps: [
        "必须使用 Safari 打开本站（微信内请点右上角用浏览器打开）",
        "点底部分享按钮",
        "选择「添加到主屏幕」",
        "点「添加」"
      ],
      note: "iOS 不支持网站内一键安装，只能手动添加。"
    },
    legacy: {
      title: "当前浏览器不支持",
      steps: [
        "系统自带/IE 内核浏览器无法安装 PWA",
        "请复制网址，用 Chrome 或 Edge 打开",
        "再到「我的」页按提示安装"
      ],
      note: ""
    },
    generic: {
      title: "手动安装步骤",
      steps: [
        "使用 Chrome 或 Edge 打开本站",
        "打开浏览器菜单",
        "选择「安装应用」或「添加到主屏幕」"
      ],
      note: "安装入口因浏览器而异，一般在菜单中。"
    }
  };
  const guide = guides[kind] || guides.generic;
  return `
    <section class="detail-section">
      <h2>${guide.title}</h2>
      <ol class="pwa-guide-steps">
        ${guide.steps.map((step) => `<li>${step}</li>`).join("")}
      </ol>
      ${guide.note ? `<p class="section-copy">${guide.note}</p>` : ""}
      <p class="section-copy">说明：网站无法关闭 Chrome 地址栏旁的安装图标，但不会在首页弹出我们自己的安装条；请只在需要时从这里操作。</p>
    </section>
  `;
}

function openAuxiliarySheet(type, html) {
  state.sheet = { type };
  showSheet(html);
}

function openPwaInstallGuide() {
  openAuxiliarySheet("pwa-guide", renderPwaInstallGuideSheet());
}

function renderPwaInstallSection() {
  if (isPwaStandalone()) {
    return `
      <section class="detail-section pwa-install-panel">
        <h2 class="section-title">安装应用</h2>
        <p class="section-copy">你正在以独立应用方式使用食养知行，数据会缓存在本机以便更快打开。</p>
      </section>
    `;
  }

  const canInstall = hasPwaInstallPrompt();
  const browserKind = getPwaBrowserKind();
  const browserNote = browserKind === "legacy"
    ? "当前浏览器不支持安装，请换用 Chrome 或 Edge。"
    : canInstall
      ? "浏览器已就绪，可一键安装。"
      : "一键安装暂不可用时可查看分步说明（三星浏览器、部分内置浏览器需手动添加）。";

  return `
    <section class="detail-section pwa-install-panel">
      <h2 class="section-title">安装到主屏幕</h2>
      <p class="section-copy">可选安装为桌面应用，离线缓存食材与食疗数据。仅在此页操作，首页不会弹出安装条。</p>
      <button type="button" class="action-button pwa-install-button" id="pwaInstallBtn">
        ${canInstall ? "一键安装" : "安装到主屏幕"}
      </button>
      <button type="button" class="plain-button pwa-install-guide-button" id="pwaInstallGuideBtn">查看安装说明</button>
      <p class="section-copy pwa-install-hint">${browserNote}</p>
    </section>
  `;
}

function boot() {
  bindShellEvents();
  setupPwaInstallUi();
  applyUrlState();
  syncUrl();
  window.addEventListener("popstate", handlePopState);
  state.isNavigating = !document.startViewTransition;
  if ((state.view === "library" || state.view === "recipes") && typeof window.atlasEnsureDeferredBundles === "function") {
    window.atlasEnsureDeferredBundles();
  }
  render();
  setTimeout(() => {
    state.isNavigating = false;
    const appContainer = document.getElementById("app");
    if (appContainer) {
      appContainer.classList.remove("ios-navigation-active");
    }
  }, 420);
}

function handlePopState() {
  navStackDepth = Math.max(0, navStackDepth - 1);
  const sheetWasVisible = Boolean(state.sheet) || sheet.classList.contains("visible");
  applyUrlState();
  syncNav();
  if (sheetWasVisible && !state.sheet) {
    dismissSheetChrome();
  }
  render();
}

function buildHistorySnapshot() {
  return {
    foodwiseNav: true,
    view: state.view,
    sheet: state.sheet ? { ...state.sheet } : null
  };
}

function bindShellEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      navigate(button.dataset.view);
    });
  });

  closeSheet.addEventListener("click", closeDetailSheet);
  sheetBackdrop.addEventListener("click", closeDetailSheet);
  bindSheetSwipeClose();
  bindZoomGuards();
  document.addEventListener("click", handleDelegatedActionClick);
  document.addEventListener("keydown", handleDelegatedActionKeydown);
}

function bindZoomGuards() {
  document.addEventListener("touchmove", (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });

  document.addEventListener("gesturestart", (event) => {
    event.preventDefault();
  }, { passive: false });

  document.addEventListener("wheel", (event) => {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  }, { passive: false });
}

function handleDelegatedActionClick(event) {
  const filterTrigger = event.target.closest("[data-open-filters]");
  if (filterTrigger) {
    event.preventDefault();
    event.stopPropagation();
    openFilterSheet(filterTrigger.dataset.openFilters);
    return;
  }

  const recipeTrigger = event.target.closest("[data-open-recipe]");
  if (recipeTrigger) {
    event.preventDefault();
    event.stopPropagation();
    triggerHapticFeedback();
    openRecipeDetail(recipeTrigger.dataset.openRecipe);
    return;
  }

  const foodTrigger = event.target.closest("[data-open-food]");
  if (foodTrigger) {
    event.preventDefault();
    event.stopPropagation();
    triggerHapticFeedback();
    openFoodDetail(foodTrigger.dataset.openFood);
    return;
  }

  const feedbackTrigger = event.target.closest("[data-trigger-feedback]");
  if (feedbackTrigger) {
    event.preventDefault();
    event.stopPropagation();
    triggerHapticFeedback();
    openAuxiliarySheet("feedback", renderFeedbackForm());
    return;
  }

  const favoriteTrigger = event.target.closest("[data-toggle-favorite]");
  if (favoriteTrigger) {
    event.preventDefault();
    event.stopPropagation();
    triggerHapticFeedback();
    toggleFavorite(favoriteTrigger.dataset.toggleFavorite);
    return;
  }

  const recipeFavoriteTrigger = event.target.closest("[data-toggle-recipe-favorite]");
  if (recipeFavoriteTrigger) {
    event.preventDefault();
    event.stopPropagation();
    triggerHapticFeedback();
    toggleRecipeFavorite(recipeFavoriteTrigger.dataset.toggleRecipeFavorite);
  }
}

function handleDelegatedActionKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;

  const recipeTrigger = event.target.closest("[data-open-recipe]");
  if (!recipeTrigger) return;
  event.preventDefault();
  openRecipeDetail(recipeTrigger.dataset.openRecipe);
}

function pushRecentFood(id) {
  if (!foodMap.has(id)) return;
  state.recentFoods = uniq([id, ...state.recentFoods.filter((item) => item !== id)]).slice(0, RECENT_LIMIT);
  saveJson("foodwise-recent-foods", state.recentFoods);
}

function pushRecentRecipe(id) {
  if (!recipes.find((item) => item.id === id)) return;
  state.recentRecipes = uniq([id, ...state.recentRecipes.filter((item) => item !== id)]).slice(0, RECENT_LIMIT);
  saveJson("foodwise-recent-recipes", state.recentRecipes);
}

function navigateToLibraryFromHome({ nature, topic, query } = {}) {
  if (nature) {
    state.libraryNature = nature;
    state.libraryTopic = "";
  }
  if (topic !== undefined) {
    state.libraryTopic = topic;
    state.libraryNature = "全部";
  }
  if (query !== undefined) {
    state.libraryQuery = query;
  }
  state.homeQuery = "";
  navigate("library");
}

function applyRecipeScenario(scenario) {
  resetRecipesAdvancedFilters();
  state.recipesNature = scenario.nature || "全部";
  state.recipesSyndrome = scenario.syndrome || "全部";
  state.recipesCoreFood = "全部";
  state.recipesSeason = "全部";
  state.recipesSolarTerm = "全部";
  state.recipesTiming = "全部";
}

function applyRecipeSeasonShortcut(shortcut) {
  resetRecipesAdvancedFilters();
  state.recipesNature = "全部";
  state.recipesSyndrome = "全部";
  state.recipesCoreFood = "全部";
  state.recipesSolarTerm = "全部";
  state.recipesSeason = shortcut.season || "全部";
  state.recipesTiming = shortcut.timing || "全部";
}

function applyRecipeSolarTermShortcut(shortcut) {
  resetRecipesAdvancedFilters();
  state.recipesNature = "全部";
  state.recipesSyndrome = "全部";
  state.recipesCoreFood = "全部";
  state.recipesSolarTerm = shortcut.solarTerm || "全部";
  state.recipesSeason = shortcut.season || "全部";
  state.recipesTiming = "全部";
}

function isRecipeScenarioActive(scenario) {
  return state.recipesNature === (scenario.nature || "全部")
    && state.recipesSyndrome === (scenario.syndrome || "全部")
    && state.recipesSeason === "全部"
    && state.recipesSolarTerm === "全部"
    && state.recipesTiming === "全部"
    && countRecipesAdvancedFilters() === 0
    && state.recipesCoreFood === "全部";
}

function isRecipeSeasonShortcutActive(shortcut) {
  return state.recipesSeason === (shortcut.season || "全部")
    && state.recipesTiming === (shortcut.timing || "全部")
    && state.recipesSolarTerm === "全部"
    && state.recipesNature === "全部"
    && state.recipesSyndrome === "全部"
    && state.recipesCoreFood === "全部"
    && countRecipesAdvancedFilters() === 0;
}

function isRecipeSolarTermShortcutActive(shortcut) {
  return state.recipesSolarTerm === (shortcut.solarTerm || "全部")
    && state.recipesSeason === (shortcut.season || "全部")
    && state.recipesTiming === "全部"
    && state.recipesNature === "全部"
    && state.recipesSyndrome === "全部"
    && state.recipesCoreFood === "全部"
    && countRecipesAdvancedFilters() === 0;
}

function applyUrlState() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view");
  if (view && ["home", "library", "checker", "recipes", "profile"].includes(view)) {
    state.view = view;
  } else {
    state.view = "home";
  }

  const query = params.get("q");
  if (query) {
    if (state.view === "recipes") {
      state.recipesQuery = query;
    } else if (state.view === "home") {
      state.homeQuery = query;
    } else if (state.view === "checker") {
      state.checkerQuery = query;
    } else if (state.view === "library") {
      state.libraryQuery = query;
    } else {
      state.libraryQuery = query;
    }
  }

  if (params.get("ln")) state.libraryNature = params.get("ln");
  if (params.get("lc")) state.libraryCategory = params.get("lc");
  if (params.get("lr")) state.libraryRegion = params.get("lr");
  if (params.get("lp")) state.libraryProvince = params.get("lp") || "全部";
  if (params.get("le")) state.libraryEthnic = params.get("le") || "全部";
  if (params.has("lt")) state.libraryTopic = params.get("lt") || "";
  if (params.get("lk")) state.libraryKind = params.get("lk");
  if (params.get("lob")) state.libraryOfficialBatch = params.get("lob") || "全部";

  if (params.get("rn")) state.recipesNature = params.get("rn");
  if (params.get("rs")) state.recipesSyndrome = params.get("rs");
  if (params.get("rcf")) state.recipesCoreFood = params.get("rcf");
  if (params.get("ruf")) state.recipesUseFor = normalizeRecipeFilterValue(params.get("ruf"), "useFor", RECIPE_FILTER_TAG_LOOKUP);
  if (params.get("raf")) state.recipesAvoidFor = normalizeRecipeFilterValue(params.get("raf"), "avoidFor", RECIPE_FILTER_TAG_LOOKUP);
  if (params.get("rst")) state.recipesSolarTerm = params.get("rst") || "全部";

  const foodId = params.get("food");
  const recipeId = params.get("recipe");
  const filtersScope = params.get("filters");
  const pair = params.get("pair");

  if (pair) {
    state.view = "checker";
    state.checkerSelected = pair.split(",").filter((id) => foodMap.has(id)).slice(0, 4);
  }

  state.sheet = null;

  if (foodId && foodMap.has(foodId)) {
    state.sheet = { type: "food", id: foodId };
  } else if (recipeId && recipes.find((item) => item.id === recipeId)) {
    state.view = "recipes";
    state.sheet = { type: "recipe", id: recipeId };
  } else if (filtersScope === "library" || filtersScope === "recipes") {
    state.view = filtersScope;
    state.sheet = { type: "filters", scope: filtersScope };
  }
}

function partitionRegionTags(rawRegions = [], explicit = {}) {
  const countries = [];
  const provinces = [...(explicit.provinces || [])];
  const ethnicGroups = [...(explicit.ethnicGroups || [])];
  (rawRegions || []).forEach((tag) => {
    const value = cleanString(tag);
    if (!value) return;
    if (REGION_LABELS[value] || isCountryCodeTag(value)) {
      countries.push(value);
    } else if (value.endsWith("族") || CN_ETHNIC_GROUPS.includes(value)) {
      ethnicGroups.push(value);
    } else {
      provinces.push(value);
    }
  });
  return {
    regions: countries.length ? uniq(countries) : ["CN"],
    provinces: uniq(provinces),
    ethnicGroups: uniq(ethnicGroups)
  };
}

function normalizeFoods(items) {
  return items.map((food) => {
    const enrichment = FOOD_DETAIL_ENRICHMENTS[food.id] || FOOD_DETAIL_ENRICHMENTS[food.name] || {};
    const regionParts = partitionRegionTags(food.regions, food);
    const indexEntry =
      FOOD_SEARCH_INDEX_MAP.get(food.id) ||
      FOOD_SEARCH_INDEX_MAP.get(food.name) ||
      RUNTIME_SEARCH_INDEX_MAP.get(food.id) ||
      RUNTIME_SEARCH_INDEX_MAP.get(food.name);
    const indexTerms = indexEntry
      ? [
          indexEntry.name,
          ...(indexEntry.aliases || []),
          indexEntry.pinyin,
          indexEntry.initials,
          ...(indexEntry.regional || []),
          ...(indexEntry.english || [])
        ]
      : [];
    const aliases = uniq([...(food.aliases || []), food.en, food.jp, food.kr, ...(indexEntry?.aliases || []), ...(indexEntry?.regional || []), ...(indexEntry?.english || [])].filter(Boolean));
    const searchTerms = uniq([
      food.name,
      ...aliases,
      ...indexTerms,
      ...(food.searchTerms || []),
      ...(food.effects || []),
      ...(food.qiTerms || []),
      ...(EXTRA_SHORTCUTS[food.name] || [])
    ]).map(cleanString);

    return {
      ...food,
      ...enrichment,
      name: cleanString(food.name),
      en: cleanString(food.en),
      category: normalizeFoodCategory(cleanString(food.category)),
      nature: cleanNature(food.nature),
      flavor: cleanString(food.flavor),
      summary: cleanString(food.summary),
      confidence: cleanString(food.confidence),
      caution: cleanString(food.caution),
      teaClass: cleanString(food.teaClass || ""),
      teaNote: cleanString(food.teaNote || ""),
      qiTermNote: cleanString(food.qiTermNote || ""),
      officialBatch: cleanString(food.officialBatch || ""),
      regulatoryNote: cleanString(food.regulatoryNote || ""),
      varietyNote: cleanString(food.varietyNote || ""),
      faCategory: cleanString(enrichment.faCategory || food.faCategory || ""),
      faNote: cleanString(enrichment.faNote || food.faNote || ""),
      itemKind: cleanString(food.itemKind || (food.category === "中药材" ? "tcm-herb" : food.officialFoodMedicine ? "food-medicine" : "food")),
      usageScope: cleanString(food.usageScope || (food.officialFoodMedicine ? "dietary-therapy" : food.category === "中药材" ? "reference-only" : "food")),
      partUsed: cleanString(food.partUsed || ""),
      pharmacopoeiaEdition: cleanString(food.pharmacopoeiaEdition || ""),
      pinyin: cleanString(food.pinyin || ""),
      initials: cleanString(food.initials || ""),
      meridians: uniq((food.meridians || []).map(cleanString).filter(Boolean)),
      relatedForms: uniq((food.relatedForms || []).map(cleanString).filter(Boolean)),
      sources: Array.isArray(food.sources) ? food.sources : [],
      aliases,
      ...regionParts,
      effects: uniq((food.effects || []).map(cleanString).filter(Boolean)),
      benefits: uniq([...(food.benefits || []), ...(enrichment.benefits || [])].map(cleanString).filter(Boolean)),
      suitableFor: uniq([...(food.suitableFor || []), ...(enrichment.suitableFor || [])].map(cleanString).filter(Boolean)),
      avoidFor: uniq([...(food.avoidFor || []), ...(enrichment.avoidFor || [])].map(cleanString).filter(Boolean)),
    contraindications: uniq([...(food.contraindications || []), ...(enrichment.contraindications || [])].map(cleanString).filter(Boolean)),
    cautionTags: uniq([...(food.cautionTags || []), ...(enrichment.cautionTags || [])].map(cleanString).filter(Boolean)),
    searchTerms,
    searchBlob: uniq(searchTerms).join(" ").toLowerCase(),
    alone: cleanString(food.alone || enrichment.alone || ""),
    timing: cleanString(food.timing || enrichment.timing || ""),
    pair: cleanString(food.pair || enrichment.pair || "")
  };
  });
}

function filterRuntimeFoodExpansion(items, priorFoods = []) {
  const priorIds = new Set(priorFoods.map((food) => food.id).filter(Boolean));
  return items.filter((food) => food?.id && !priorIds.has(food.id));
}

function dedupeFoods(items) {
  const byId = new Map();
  items.forEach((food) => {
    const id = cleanString(food.id);
    if (!id) return;
    byId.set(id, byId.has(id) ? mergeFoodEntries(byId.get(id), food) : food);
  });

  const merged = new Map();
  [...byId.values()].forEach((food) => {
    const key = cleanString(food.name).toLowerCase();
    if (!key) return;

    if (!merged.has(key)) {
      merged.set(key, food);
      return;
    }

    merged.set(key, mergeFoodEntries(merged.get(key), food));
  });

  return [...merged.values()];
}

function mergeFoodEntries(current, incoming) {
  const primary = foodCompletenessScore(incoming) > foodCompletenessScore(current) ? incoming : current;
  const secondary = primary === incoming ? current : incoming;

  const merged = {
    ...secondary,
    ...primary,
    aliases: uniq([...(current.aliases || []), ...(incoming.aliases || [])].map(cleanString)),
    regions: uniq([...(current.regions || []), ...(incoming.regions || [])].filter(Boolean)),
    provinces: uniq([...(current.provinces || []), ...(incoming.provinces || [])].filter(Boolean)),
    ethnicGroups: uniq([...(current.ethnicGroups || []), ...(incoming.ethnicGroups || [])].filter(Boolean)),
    effects: uniq([...(current.effects || []), ...(incoming.effects || [])].map(cleanString)),
    benefits: uniq([...(current.benefits || []), ...(incoming.benefits || [])].map(cleanString)),
    suitableFor: uniq([...(current.suitableFor || []), ...(incoming.suitableFor || [])].map(cleanString)),
    avoidFor: uniq([...(current.avoidFor || []), ...(incoming.avoidFor || [])].map(cleanString)),
    contraindications: uniq([...(current.contraindications || []), ...(incoming.contraindications || [])].map(cleanString)),
    cautionTags: uniq([...(current.cautionTags || []), ...(incoming.cautionTags || [])].map(cleanString)),
    searchTerms: uniq([...(current.searchTerms || []), ...(incoming.searchTerms || [])].map(cleanString))
  };

  merged.summary = primary.summary || secondary.summary || "";
  merged.caution = primary.caution || secondary.caution || "";
  merged.faCategory = primary.faCategory || secondary.faCategory || "";
  merged.faNote = primary.faNote || secondary.faNote || "";
  merged.officialFoodMedicine = Boolean(current.officialFoodMedicine || incoming.officialFoodMedicine);
  merged.itemKind = primary.itemKind || secondary.itemKind || merged.itemKind;
  merged.usageScope = primary.usageScope || secondary.usageScope || merged.usageScope;
  merged.partUsed = primary.partUsed || secondary.partUsed || "";
  merged.pharmacopoeiaEdition = primary.pharmacopoeiaEdition || secondary.pharmacopoeiaEdition || "";
  merged.meridians = uniq([...(current.meridians || []), ...(incoming.meridians || [])].map(cleanString));
  merged.relatedForms = uniq([...(current.relatedForms || []), ...(incoming.relatedForms || [])].map(cleanString));
  merged.sources = (primary.sources?.length ? primary.sources : secondary.sources) || [];
  merged.pinyin = primary.pinyin || secondary.pinyin || "";
  merged.initials = primary.initials || secondary.initials || "";
  merged.isOriginProduct = Boolean(current.isOriginProduct || incoming.isOriginProduct);
  merged.baseFoodId = primary.baseFoodId || secondary.baseFoodId || "";
  merged.giSystems = (primary.giSystems?.length ? primary.giSystems : secondary.giSystems) || [];
  merged.peop = primary.peop || secondary.peop || null;
  merged.daoDi = primary.daoDi || secondary.daoDi || null;
  merged.provenance = primary.provenance || secondary.provenance || null;
  merged.regulatoryNote = primary.regulatoryNote || secondary.regulatoryNote || "";
  merged.searchBlob = uniq([merged.name, ...(merged.searchTerms || []), ...(merged.aliases || [])])
    .map((item) => cleanString(item).toLowerCase())
    .filter(Boolean)
    .join(" ");

  return merged;
}

function foodCompletenessScore(food) {
  return [
    food.summary,
    food.caution,
    food.flavor,
    food.faCategory,
    food.faNote,
    ...(food.aliases || []),
    ...(food.searchTerms || []),
    ...(food.effects || []),
    ...(food.benefits || []),
    ...(food.suitableFor || []),
    ...(food.avoidFor || []),
    ...(food.contraindications || []),
    ...(food.regions || [])
  ].filter(Boolean).length
    + (food.officialFoodMedicine ? 20 : 0)
    + (food.pharmacopoeiaEdition ? 15 : 0)
    + (food.meridians?.length ? 5 : 0)
    + (food.isOriginProduct ? 25 : 0)
    + ((food.giSystems || []).length ? 10 : 0)
    + (food.peop ? 6 : 0);
}

function decodeUnicodeLiterals(value) {
  const text = String(value ?? "").trim();
  if (!text || !/\\u[0-9a-fA-F]{4}/.test(text)) return text;
  return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function normalizeFoodCategory(category) {
  const decoded = decodeUnicodeLiterals(category);
  return FOOD_CATEGORY_ALIASES[decoded] || decoded;
}

function cleanNature(value) {
  const normalized = decodeUnicodeLiterals(cleanString(value));
  const aliases = { 微寒: "寒", 大寒: "寒", 微温: "温", 大温: "温", 大热: "热" };
  const mapped = aliases[normalized] || normalized;
  return ["寒", "凉", "平", "温", "热", "复合"].includes(mapped) ? mapped : "复合";
}

function cleanString(value) {
  return decodeUnicodeLiterals(String(value || "")
    .replace(/\uFFFD/g, "")
    .replace(/\s+/g, " ")
    .trim());
}

function uniq(items) {
  return [...new Set(items.filter(Boolean))];
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function navigate(view) {
  if (state.view === view) return;

  if ((view === "library" || view === "recipes") && typeof window.atlasEnsureDeferredBundles === "function") {
    window.atlasEnsureDeferredBundles();
  }

  state.view = view;
  if (state.sheet) {
    state.sheet = null;
    dismissSheetChrome();
  }
  syncNav();

  const transitionUpdate = () => {
    render();
  };

  if (document.startViewTransition) {
    document.documentElement.classList.add("ios-silk-transition");
    state.isNavigating = false; // Disable children stagger to let startViewTransition animate perfectly
    const vt = document.startViewTransition(() => {
      transitionUpdate();
    });
    vt.finished.finally(() => {
      document.documentElement.classList.remove("ios-silk-transition");
      const appContainer = document.getElementById("app");
      if (appContainer) {
        appContainer.classList.remove("ios-navigation-active");
      }
    });
  } else {
    state.isNavigating = true; // Enabled for beautiful fallback card-rise animation
    const appContainer = document.getElementById("app");
    if (appContainer) {
      appContainer.classList.remove("ios-silk-fallback");
      void appContainer.offsetWidth;
      appContainer.classList.add("ios-silk-fallback");
      setTimeout(() => {
        appContainer.classList.remove("ios-silk-fallback");
        state.isNavigating = false;
        appContainer.classList.remove("ios-navigation-active");
      }, 340);
    }
    transitionUpdate();
  }
  syncUrl({ push: true });
}

function syncNav() {
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
  });
}

function triggerStaggeredAnimation() {
  if (!state.isNavigating) return;
  const items = app.querySelectorAll(".food-row, .recipe-row, .suggestion-row, .chip, .nature-tile");
  if (!items.length) return;

  items.forEach((item) => {
    item.classList.add("ios-stagger-item");
  });

  let index = 0;
  function revealNext() {
    const batchSize = 3;
    const limit = Math.min(index + batchSize, items.length);
    for (let i = index; i < limit; i++) {
      items[i].classList.add("ios-stagger-visible");
    }
    index = limit;
    if (index < items.length) {
      requestAnimationFrame(revealNext);
    }
  }
  requestAnimationFrame(revealNext);
}

function render() {
  syncNav();
  const views = {
    home: renderHomeV2,
    library: renderLibrary,
    checker: renderChecker,
    recipes: renderRecipes,
    profile: renderProfile
  };

  if (state.isNavigating) {
    app.classList.add("ios-navigation-active");
  } else {
    app.classList.remove("ios-navigation-active");
  }

  app.innerHTML = views[state.view]();
  bindViewEvents();
  if (state.sheet?.type === "filters") {
    const validScope = (state.sheet.scope === "library" && state.view === "library")
      || (state.sheet.scope === "recipes" && state.view === "recipes");
    if (!validScope) {
      state.sheet = null;
      sheet.classList.remove("visible", "filter-sheet");
      sheetBackdrop.classList.remove("visible");
      sheet.hidden = true;
      sheetBackdrop.hidden = true;
      sheetContent.innerHTML = "";
    }
  }
  if (state.sheet) {
    openSheetFromState();
  } else if (sheet.classList.contains("visible")) {
    dismissSheetChrome();
  }
  triggerStaggeredAnimation();
}

function bindViewEvents() {
  app.querySelectorAll("[data-open-food]").forEach((row) => {
    row.addEventListener("click", () => {
      triggerHapticFeedback();
      openFoodDetail(row.dataset.openFood);
    });
  });

  app.querySelectorAll("[data-open-recipe]").forEach((row) => {
    row.addEventListener("click", () => {
      triggerHapticFeedback();
      openRecipeDetail(row.dataset.openRecipe);
    });
  });

  app.querySelectorAll("[data-quick-term]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      if (state.view === "home") {
        navigateToLibraryFromHome({ topic: button.dataset.quickTerm });
        return;
      }
      state.libraryQuery = button.dataset.quickTerm;
      navigate("library");
    });
  });

  app.querySelectorAll("[data-library-nature-link]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      if (state.view === "home") {
        navigateToLibraryFromHome({ nature: button.dataset.libraryNatureLink });
        return;
      }
      state.libraryNature = button.dataset.libraryNatureLink;
      state.libraryQuery = "";
      navigate("library");
    });
  });

  app.querySelectorAll("[data-home-view-library]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      navigateToLibraryFromHome({ query: state.homeQuery });
    });
  });

  app.querySelectorAll("[data-recipe-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      const index = Number(button.dataset.recipeScenario);
      const scenario = RECIPE_SCENARIO_SHORTCUTS[index];
      if (!scenario) return;
      applyRecipeScenario(scenario);
      afterRecipeFilterChange({ scrollToResults: true });
    });
  });

  app.querySelectorAll("[data-recipe-season]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      const index = Number(button.dataset.recipeSeason);
      const shortcut = RECIPE_SEASON_SHORTCUTS[index];
      if (!shortcut) return;
      applyRecipeSeasonShortcut(shortcut);
      afterRecipeFilterChange({ scrollToResults: true });
    });
  });

  app.querySelectorAll("[data-recipe-solar-term]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      const index = Number(button.dataset.recipeSolarTerm);
      const shortcut = RECIPE_SOLAR_TERM_SHORTCUTS[index];
      if (!shortcut) return;
      applyRecipeSolarTermShortcut(shortcut);
      afterRecipeFilterChange({ scrollToResults: true });
    });
  });

  const homeSearch = app.querySelector("#homeSearch");
  if (homeSearch) {
    bindReactiveInput(homeSearch, (value) => {
      state.homeQuery = cleanString(value);
      rerenderCurrent({ preserveFocusId: "homeSearch" });
    });

    homeSearch.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        triggerHapticFeedback();
        handleHomeSearchSubmit();
      }
    });
  }

  const homeSearchButton = app.querySelector("[data-home-search]");
  if (homeSearchButton && homeSearch) {
    homeSearchButton.addEventListener("click", () => {
      triggerHapticFeedback();
      handleHomeSearchSubmit();
    });
  }

  app.querySelectorAll("[data-open-home-food]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.homeQuery = "";
      openFoodDetail(button.dataset.openHomeFood);
      render();
    });
  });

  bindLibraryEvents();
  bindCheckerEvents();
  bindRecipeEvents();
  bindProfileEvents();
}

function bindLibraryEvents() {
  const input = app.querySelector("#libraryQuery");
  if (input) {
    input.value = state.libraryQuery;
    bindReactiveInput(input, (value) => {
      state.libraryQuery = cleanString(value);
      afterLibraryFilterChange({ preserveFocusId: "libraryQuery", scrollToResults: true });
    });
  }

  bindLibraryFilterControls(app);
}

function bindLibraryFilterControls(root) {
  root.querySelectorAll("[data-library-kind]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryKind = button.dataset.libraryKind;
      afterLibraryFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-library-nature]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryNature = button.dataset.libraryNature;
      afterLibraryFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-library-category]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryCategory = button.dataset.libraryCategory;
      afterLibraryFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-library-region]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryRegion = button.dataset.libraryRegion;
      afterLibraryFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-library-province]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryProvince = button.dataset.libraryProvince;
      afterLibraryFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-library-ethnic]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryEthnic = button.dataset.libraryEthnic;
      afterLibraryFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-library-ethnic-quick]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryEthnic = button.dataset.libraryEthnicQuick;
      afterLibraryFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-toggle-library-ethnics]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryEthnicsExpanded = !state.libraryEthnicsExpanded;
      afterLibraryFilterChange();
    });
  });

  root.querySelectorAll("[data-library-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryTopic = button.dataset.libraryTopic === state.libraryTopic ? "" : button.dataset.libraryTopic;
      if (state.libraryTopic !== "药食同源" && state.libraryOfficialBatch !== "全部") {
        state.libraryOfficialBatch = "全部";
      }
      afterLibraryFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-library-official-batch]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryOfficialBatch = button.dataset.libraryOfficialBatch;
      afterLibraryFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-toggle-library-provinces]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryProvincesExpanded = !state.libraryProvincesExpanded;
      refreshOpenFilterSheet();
    });
  });
}

function bindCheckerEvents() {
  const input = app.querySelector("#checkerQuery");
  if (!input) return;
  input.value = state.checkerQuery;
  bindReactiveInput(input, (value) => {
    state.checkerQuery = cleanString(value);
    rerenderCurrent({ preserveFocusId: "checkerQuery" });
  });

  app.querySelectorAll("[data-add-food]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      const id = button.dataset.addFood;
      if (!state.checkerSelected.includes(id) && state.checkerSelected.length < 4) {
        state.checkerSelected.push(id);
        state.checkerQuery = "";
        state.checkerScrollPending = true;
        rerenderCurrent();
      }
    });
  });

  app.querySelectorAll("[data-remove-food]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      triggerHapticFeedback();
      state.checkerSelected = state.checkerSelected.filter((id) => id !== button.dataset.removeFood);
      state.checkerScrollPending = state.checkerSelected.length >= 2;
      rerenderCurrent();
    });
  });

  app.querySelectorAll("[data-open-checker-food]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      openFoodDetail(button.dataset.openCheckerFood);
    });
  });

  app.querySelectorAll("[data-toggle-pairing-rules]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.checkerRulesOpen = !state.checkerRulesOpen;
      rerenderCurrent();
    });
  });

  const rulesInput = app.querySelector("#checkerRulesQuery");
  if (rulesInput) {
    rulesInput.value = state.checkerRulesQuery;
    bindReactiveInput(rulesInput, (value) => {
      state.checkerRulesQuery = cleanString(value);
      rerenderCurrent({ preserveFocusId: "checkerRulesQuery" });
    });
  }

  app.querySelectorAll("[data-apply-pairing-rule]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      const ids = (button.dataset.applyPairingRule || "").split(",").filter((id) => foodMap.has(id));
      if (!ids.length) return;
      state.checkerSelected = ids.slice(0, 4);
      state.checkerScrollPending = true;
      rerenderCurrent();
    });
  });

  if (state.checkerScrollPending && state.checkerSelected.length >= 2) {
    state.checkerScrollPending = false;
    requestAnimationFrame(() => scrollCheckerResults());
  }
}

function bindRecipeEvents() {
  const input = app.querySelector("#recipesQuery");
  if (!input) return;
  input.value = state.recipesQuery;
  bindReactiveInput(input, (value) => {
    state.recipesQuery = cleanString(value);
    afterRecipeFilterChange({ preserveFocusId: "recipesQuery", scrollToResults: true });
  });

  bindRecipeFilterControls(app);
}

function bindRecipeFilterControls(root, options = {}) {
  const { advancedOnly = false } = options;

  if (!advancedOnly) {
    root.querySelectorAll("[data-recipes-nature]").forEach((button) => {
      button.addEventListener("click", () => {
        triggerHapticFeedback();
        state.recipesNature = button.dataset.recipesNature;
        afterRecipeFilterChange({ scrollToResults: true });
      });
    });

    root.querySelectorAll("[data-recipes-syndrome]").forEach((button) => {
      button.addEventListener("click", () => {
        triggerHapticFeedback();
        state.recipesSyndrome = button.dataset.recipesSyndrome;
        afterRecipeFilterChange({ scrollToResults: true });
      });
    });

    root.querySelectorAll("[data-recipes-corefood]").forEach((button) => {
      button.addEventListener("click", () => {
        triggerHapticFeedback();
        state.recipesCoreFood = button.dataset.recipesCorefood;
        afterRecipeFilterChange({ scrollToResults: true });
      });
    });
  }

  root.querySelectorAll("[data-recipes-usefor]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.recipesUseFor = button.dataset.recipesUsefor;
      afterRecipeFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-recipes-avoidfor]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.recipesAvoidFor = button.dataset.recipesAvoidfor;
      afterRecipeFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-recipes-timing]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.recipesTiming = button.dataset.recipesTiming;
      afterRecipeFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-recipes-cooking]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.recipesCooking = button.dataset.recipesCooking;
      afterRecipeFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-recipes-season]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.recipesSeason = button.dataset.recipesSeason;
      afterRecipeFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-recipes-solarterm]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.recipesSolarTerm = button.dataset.recipesSolarterm;
      afterRecipeFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-recipes-bodyfeel]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.recipesBodyFeel = button.dataset.recipesBodyfeel;
      afterRecipeFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-recipes-tonify]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.recipesTonify = button.dataset.recipesTonify;
      afterRecipeFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-recipes-clear]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.recipesClear = button.dataset.recipesClear;
      afterRecipeFilterChange({ scrollToResults: true });
    });
  });
}

function bindProfileEvents() {
  app.querySelectorAll("[data-profile-toggle]").forEach((checkbox) => {
    checkbox.checked = Boolean(state.profile[checkbox.dataset.profileToggle]);
    checkbox.addEventListener("change", () => {
      state.profile[checkbox.dataset.profileToggle] = checkbox.checked;
      saveJson("foodwise-profile", state.profile);
      showToast("个人提醒已更新");
    });
  });

  const installBtn = app.querySelector("#pwaInstallBtn");
  if (installBtn) {
    installBtn.addEventListener("click", () => {
      triggerHapticFeedback();
      triggerPwaInstall();
    });
  }

  const guideBtn = app.querySelector("#pwaInstallGuideBtn");
  if (guideBtn) {
    guideBtn.addEventListener("click", () => {
      triggerHapticFeedback();
      openPwaInstallGuide();
    });
  }
}

function rerenderCurrent(options = {}) {
  render();
  syncUrl();
  if (options.preserveFocusId) {
    restoreInputFocus(options.preserveFocusId);
  }
  if (options.scrollToResults) {
    scrollToResultAnchor();
  }
}

function scrollToResultAnchor() {
  requestAnimationFrame(() => {
    const anchor = document.getElementById("result-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

function countLibraryActiveFilters() {
  let count = 0;
  if (state.libraryKind !== "全部") count += 1;
  if (state.libraryNature !== "全部") count += 1;
  if (state.libraryTopic) count += 1;
  if (state.libraryCategory !== "全部") count += 1;
  if (state.libraryRegion !== "ALL") count += 1;
  if (state.libraryProvince !== "全部") count += 1;
  if (state.libraryEthnic !== "全部") count += 1;
  if (state.libraryOfficialBatch !== "全部") count += 1;
  return count;
}

function countRecipesAdvancedFilters() {
  let count = 0;
  if (state.recipesUseFor !== "全部") count += 1;
  if (state.recipesAvoidFor !== "全部") count += 1;
  if (state.recipesTiming !== "全部") count += 1;
  if (state.recipesCooking !== "全部") count += 1;
  if (state.recipesSeason !== "全部") count += 1;
  if (state.recipesSolarTerm !== "全部") count += 1;
  if (state.recipesBodyFeel !== "全部") count += 1;
  if (state.recipesTonify !== "全部") count += 1;
  if (state.recipesClear !== "全部") count += 1;
  return count;
}

function countRecipesActiveFilters() {
  let count = countRecipesAdvancedFilters();
  if (state.recipesNature !== "全部") count += 1;
  if (state.recipesSyndrome !== "全部") count += 1;
  if (state.recipesCoreFood !== "全部") count += 1;
  return count;
}

function getLibraryFilterSummary() {
  const parts = [];
  if (state.libraryKind !== "全部") {
    parts.push({ 全部: "全部", food: "食材", "food-medicine": "药食同源", "tcm-herb": "中药材" }[state.libraryKind] || state.libraryKind);
  }
  if (state.libraryNature !== "全部") parts.push(state.libraryNature);
  if (state.libraryTopic) parts.push(state.libraryTopic);
  if (state.libraryCategory !== "全部") parts.push(state.libraryCategory);
  if (state.libraryRegion !== "ALL") parts.push(REGION_LABELS[state.libraryRegion] || state.libraryRegion);
  if (state.libraryProvince !== "全部") parts.push(state.libraryProvince);
  if (state.libraryEthnic !== "全部") parts.push(state.libraryEthnic);
  if (state.libraryOfficialBatch !== "全部") parts.push(`${state.libraryOfficialBatch} 批`);
  return parts.length ? parts.join(" · ") : "全部食材";
}

function getRecipesFilterSummary() {
  const parts = [];
  if (state.recipesNature !== "全部") parts.push(state.recipesNature);
  if (state.recipesSyndrome !== "全部") parts.push(state.recipesSyndrome);
  if (state.recipesCoreFood !== "全部") parts.push(state.recipesCoreFood);
  if (state.recipesUseFor !== "全部") parts.push(recipeFilterTagLabel(state.recipesUseFor, RECIPE_FILTER_TAG_LOOKUP));
  if (state.recipesAvoidFor !== "全部") parts.push(recipeFilterTagLabel(state.recipesAvoidFor, RECIPE_FILTER_TAG_LOOKUP));
  if (state.recipesTiming !== "全部") parts.push(state.recipesTiming);
  if (state.recipesCooking !== "全部") parts.push(state.recipesCooking);
  if (state.recipesSeason !== "全部") parts.push(state.recipesSeason);
  if (state.recipesSolarTerm !== "全部") parts.push(state.recipesSolarTerm);
  if (state.recipesBodyFeel !== "全部") parts.push(state.recipesBodyFeel);
  if (state.recipesTonify !== "全部") parts.push(state.recipesTonify);
  if (state.recipesClear !== "全部") parts.push(state.recipesClear);
  return parts.length ? parts.join(" · ") : "全部食疗方";
}

function renderStickyBrowseToolbar({
  searchId,
  placeholder,
  queryValue,
  filterScope,
  summary,
  activeFilterCount,
  resultCount,
  resultUnit,
  resultMeta = "",
  quickFiltersHtml = "",
  filterButtonLabel = ""
}) {
  const filterLabel = filterButtonLabel || (activeFilterCount > 0 ? `筛选 · ${activeFilterCount}` : "筛选");
  return `
    <section class="sticky-toolbar">
      ${searchField({ id: searchId, placeholder, value: queryValue })}
      ${quickFiltersHtml}
      <div class="sticky-toolbar-meta">
        <p class="sticky-toolbar-summary">${summary}</p>
        <button type="button" class="filter-open-button" data-open-filters="${filterScope}">${filterLabel}</button>
      </div>
      <div class="result-summary result-summary-sticky" id="result-anchor">
        <span>找到 ${resultCount} 个${resultUnit}</span>
        ${resultMeta ? `<span>${resultMeta}</span>` : ""}
      </div>
    </section>
  `;
}

function resetLibraryFilters() {
  state.libraryKind = "全部";
  state.libraryNature = "全部";
  state.libraryCategory = "全部";
  state.libraryRegion = "ALL";
  state.libraryProvince = "全部";
  state.libraryEthnic = "全部";
  state.libraryTopic = "";
  state.libraryOfficialBatch = "全部";
  state.libraryProvincesExpanded = false;
  state.libraryEthnicsExpanded = false;
}

function getVisibleProvinces() {
  if (state.libraryProvincesExpanded || PROVINCES_IN_CATALOG.length <= PROVINCE_FILTER_EXPAND_LIMIT) {
    return PROVINCES_IN_CATALOG;
  }
  const head = PROVINCES_IN_CATALOG.slice(0, PROVINCE_FILTER_EXPAND_LIMIT);
  if (state.libraryProvince !== "全部" && !head.includes(state.libraryProvince)) {
    return [...head, state.libraryProvince];
  }
  return head;
}

function refreshOpenFilterSheet() {
  if (state.sheet?.type !== "filters") return;
  const html = state.sheet.scope === "library"
    ? renderLibraryFilterDrawerContent(filterFoods().length)
    : renderRecipesFilterDrawerContent(filterRecipes().length);
  sheetContent.innerHTML = html;
  bindFilterSheetEvents();
}

function resetRecipesAdvancedFilters() {
  state.recipesUseFor = "全部";
  state.recipesAvoidFor = "全部";
  state.recipesTiming = "全部";
  state.recipesCooking = "全部";
  state.recipesSeason = "全部";
  state.recipesBodyFeel = "全部";
  state.recipesTonify = "全部";
  state.recipesClear = "全部";
}

function renderLibraryFilterDrawerContent(resultCount) {
  return `
    <section class="filter-drawer">
      <div class="filter-drawer-head">
        <h2 class="filter-drawer-title">筛选食材库</h2>
        <p class="filter-drawer-copy">按食性、专题、分类与地区组合查找。</p>
      </div>
      ${renderLibraryFilterSections()}
      <div class="filter-drawer-footer">
        <button type="button" class="plain-button" data-reset-filters="library">重置</button>
        <button type="button" class="action-button filter-drawer-apply" data-close-filter-sheet="true">查看 ${resultCount} 个食材</button>
      </div>
    </section>
  `;
}

function renderRecipesFilterDrawerContent(resultCount) {
  const compact = "filter-chip-compact";
  const renderChipSection = (label, options, dataAttr, activeValue) => `
    <div class="filter-subsection">
      <div class="filter-label">${label}</div>
      <div class="filter-group filter-group-wrap recipe-syndrome-group">
        ${["全部", ...options].map((item) => chip(item, item, dataAttr, activeValue === item, compact)).join("")}
      </div>
    </div>
  `;

  return `
    <section class="filter-drawer">
      <div class="filter-drawer-head">
        <h2 class="filter-drawer-title">更多筛选</h2>
        <p class="filter-drawer-copy">按适用场景、慎用提示与时段季节组合查找。虚线短标签悬停可看完整说明。</p>
      </div>
      <section class="filter-panel recipe-filter-panel filter-drawer-panel">
        ${renderFilterDisclosureGroup({
          id: "body-fit",
          title: "适用与慎用",
          open: isRecipeFilterGroupOpen("body-fit"),
          bodyHtml: [
            renderRecipeFilterTagSection("适用场景", RECIPE_USE_FOR_TAG_OPTIONS, "data-recipes-usefor", state.recipesUseFor),
            renderRecipeFilterTagSection("慎用提示", RECIPE_AVOID_FOR_TAG_OPTIONS, "data-recipes-avoidfor", state.recipesAvoidFor)
          ].join("")
        })}
        ${renderFilterDisclosureGroup({
          id: "timing-cooking",
          title: "时段与做法",
          open: isRecipeFilterGroupOpen("timing-cooking"),
          bodyHtml: [
            renderChipSection("建议时段", RECIPE_TIMING_OPTIONS, "data-recipes-timing", state.recipesTiming),
            renderChipSection("烹调方式", RECIPE_COOKING_OPTIONS, "data-recipes-cooking", state.recipesCooking)
          ].join("")
        })}
        ${renderFilterDisclosureGroup({
          id: "season-feel",
          title: "季节与感受",
          open: isRecipeFilterGroupOpen("season-feel"),
          bodyHtml: [
            renderChipSection("适宜季节", RECIPE_SEASON_OPTIONS, "data-recipes-season", state.recipesSeason),
            renderChipSection("节气", RECIPE_SOLAR_TERM_OPTIONS, "data-recipes-solarterm", state.recipesSolarTerm),
            renderChipSection("身体感受", RECIPE_BODY_FEEL_OPTIONS, "data-recipes-bodyfeel", state.recipesBodyFeel)
          ].join("")
        })}
        ${renderFilterDisclosureGroup({
          id: "tonify-clear",
          title: "补泻倾向",
          open: isRecipeFilterGroupOpen("tonify-clear"),
          bodyHtml: [
            renderChipSection("补神/益气", RECIPE_TONIFY_OPTIONS, "data-recipes-tonify", state.recipesTonify),
            renderChipSection("清热/祛湿", RECIPE_CLEAR_OPTIONS, "data-recipes-clear", state.recipesClear)
          ].join("")
        })}
      </section>
      <div class="filter-drawer-footer">
        <button type="button" class="plain-button" data-reset-filters="recipes-advanced">重置</button>
        <button type="button" class="action-button filter-drawer-apply" data-close-filter-sheet="true">查看 ${resultCount} 个食疗方</button>
      </div>
    </section>
  `;
}

function renderRecipesQuickFilters(syndromes) {
  return `
    <div class="quick-filter-stack">
      <div class="filter-subsection quick-filter-block">
        <div class="filter-label">食性</div>
        <div class="filter-group filter-group-scroll quick-filter-row">
          ${["全部", "平", "温", "热", "凉", "寒"].map((item) => chip(item, item, "data-recipes-nature", state.recipesNature === item)).join("")}
        </div>
      </div>
      <div class="filter-subsection quick-filter-block">
        <div class="filter-label">证候</div>
        <div class="filter-group filter-group-scroll quick-filter-row">
          ${["全部", ...syndromes].map((item) => chip(item, item, "data-recipes-syndrome", state.recipesSyndrome === item)).join("")}
        </div>
      </div>
      <div class="filter-subsection quick-filter-block">
        <div class="filter-label">核心食材</div>
        <div class="filter-group filter-group-scroll quick-filter-row">
          ${["全部", ...RECIPE_CORE_FOOD_OPTIONS].map((item) => chip(item, item, "data-recipes-corefood", state.recipesCoreFood === item)).join("")}
        </div>
      </div>
    </div>
  `;
}

function afterLibraryFilterChange(options = {}) {
  rerenderCurrent({
    preserveFocusId: options.preserveFocusId,
    scrollToResults: options.scrollToResults && state.sheet?.type !== "filters"
  });
}

function afterRecipeFilterChange(options = {}) {
  rerenderCurrent({
    preserveFocusId: options.preserveFocusId,
    scrollToResults: options.scrollToResults && state.sheet?.type !== "filters"
  });
}

function openFilterSheet(scope) {
  triggerHapticFeedback();
  state.sheet = { type: "filters", scope };
  const html = scope === "library"
    ? renderLibraryFilterDrawerContent(filterFoods().length)
    : renderRecipesFilterDrawerContent(filterRecipes().length);
  showFilterSheet(html);
  syncUrl({ push: true });
}

function showFilterSheet(html) {
  sheet.classList.add("filter-sheet");
  sheetContent.innerHTML = html;
  sheet.hidden = false;
  sheetBackdrop.hidden = false;
  requestAnimationFrame(() => {
    sheet.classList.add("visible");
    sheetBackdrop.classList.add("visible");
  });
  bindFilterSheetEvents();
}

function bindFilterSheetEvents() {
  bindLibraryFilterControls(sheetContent);
  bindRecipeFilterControls(sheetContent, { advancedOnly: true });

  sheetContent.querySelectorAll("[data-close-filter-sheet]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      closeDetailSheet();
    });
  });

  sheetContent.querySelectorAll("[data-reset-filters]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      if (button.dataset.resetFilters === "library") {
        resetLibraryFilters();
        afterLibraryFilterChange();
        return;
      }
      if (button.dataset.resetFilters === "recipes-advanced") {
        resetRecipesAdvancedFilters();
        afterRecipeFilterChange();
      }
    });
  });
}

function renderLibraryFilterSections() {
  const kindOptions = [
    { label: "全部", value: "全部" },
    { label: "食材", value: "food" },
    { label: "药食同源", value: "food-medicine" },
    { label: "中药材", value: "tcm-herb" }
  ];
  const compact = "filter-chip-compact";
  const visibleProvinces = getVisibleProvinces();
  const visibleEthnics = getVisibleEthnics();
  const provinceToggle = PROVINCES_IN_CATALOG.length > PROVINCE_FILTER_EXPAND_LIMIT
    ? `<button type="button" class="plain-button filter-expand-button" data-toggle-library-provinces>${state.libraryProvincesExpanded ? "收起省份" : `展开全部 ${PROVINCES_IN_CATALOG.length} 个`}</button>`
    : "";
  const ethnicToggle = ETHNICS_IN_CATALOG.length > ETHNIC_FILTER_EXPAND_LIMIT
    ? `<button type="button" class="plain-button filter-expand-button" data-toggle-library-ethnics>${state.libraryEthnicsExpanded ? "收起民族" : `展开全部 ${ETHNICS_IN_CATALOG.length} 个`}</button>`
    : "";
  const teaTopicActive = LIBRARY_TEA_TOPICS.includes(state.libraryTopic);
  const showOfficialBatchFilter = state.libraryTopic === "药食同源" || state.libraryKind === "food-medicine" || state.libraryOfficialBatch !== "全部";
  return `
    <section class="filter-panel filter-panel-library filter-drawer-panel">
      <div class="filter-subsection">
        <div class="filter-label">条目类型</div>
        <div class="filter-group filter-group-wrap">
          ${kindOptions.map((item) => chip(item.label, item.value, "data-library-kind", state.libraryKind === item.value, compact)).join("")}
        </div>
      </div>
      <div class="filter-subsection">
        <div class="filter-label">传统食性</div>
        <div class="filter-group filter-group-wrap">
          ${["全部", "寒", "凉", "平", "温", "热", "复合"].map((item) => chip(item, item, "data-library-nature", state.libraryNature === item, compact)).join("")}
        </div>
      </div>
      <div class="filter-subsection">
        <div class="filter-label">气机与专题</div>
        <div class="filter-group filter-group-wrap">
          ${LIBRARY_QI_TOPICS.map((item) => chip(item, item, "data-library-topic", state.libraryTopic === item, compact)).join("")}
        </div>
      </div>
      ${showOfficialBatchFilter ? `
      <div class="filter-subsection">
        <div class="filter-label">食药同源目录批次</div>
        <div class="filter-group filter-group-wrap">
          ${["全部", "2002", "2019", "2023"].map((item) => chip(item, item, "data-library-official-batch", state.libraryOfficialBatch === item, compact)).join("")}
        </div>
        <p class="filter-hint">按国家目录公布批次筛选；目录共 ${CATALOG_OFFICIAL_COUNT} 项可追溯条目。</p>
      </div>
      ` : ""}
      ${renderFilterDisclosureGroup({
        id: "library-tea",
        title: "茶类细分",
        open: teaTopicActive || state.libraryCategory === "茶饮",
        bodyHtml: `
          <div class="filter-subsection filter-subsection-nested">
            <div class="filter-label">按茶类筛选</div>
            <div class="filter-group filter-group-wrap">
              ${LIBRARY_TEA_TOPICS.map((item) => chip(item, item, "data-library-topic", state.libraryTopic === item, compact)).join("")}
            </div>
            <p class="filter-hint">选「茶」看全部茶饮；选具体茶类可进一步缩小范围。</p>
          </div>
        `
      })}
      <div class="filter-subsection">
        <div class="filter-label">食材分类</div>
        <div class="filter-group filter-group-wrap">
          ${["全部", ...CATEGORY_ORDER.filter((category) => CATEGORY_COUNTS[category])].map((item) => chip(item, item, "data-library-category", state.libraryCategory === item, compact)).join("")}
        </div>
      </div>
      <div class="filter-subsection">
        <div class="filter-label">地区来源</div>
        <div class="filter-group filter-group-wrap">
          ${chip("全部地区", "ALL", "data-library-region", state.libraryRegion === "ALL", compact)}
          ${Object.entries(REGION_LABELS)
            .filter(([region]) => REGION_COUNTS[region])
            .map(([region, label]) => chip(label, region, "data-library-region", state.libraryRegion === region, compact))
            .join("")}
        </div>
      </div>
      <div class="filter-subsection">
        <div class="filter-label-row">
          <div class="filter-label">中国省份 / 地区</div>
          ${provinceToggle}
        </div>
        <div class="filter-group filter-province-grid">
          ${chip("全部", "全部", "data-library-province", state.libraryProvince === "全部", compact)}
          ${visibleProvinces.map((province) => chip(province, province, "data-library-province", state.libraryProvince === province, compact)).join("")}
        </div>
      </div>
      ${ETHNICS_IN_CATALOG.length ? `
      ${renderFilterDisclosureGroup({
        id: "library-ethnic",
        title: "民族风味",
        open: state.libraryEthnic !== "全部" || state.libraryEthnicsExpanded,
        bodyHtml: `
          <div class="filter-subsection filter-subsection-nested">
            <div class="filter-label-row">
              <div class="filter-label">按民族筛选</div>
              ${ethnicToggle}
            </div>
            <div class="filter-group filter-group-wrap">
              ${chip("全部", "全部", "data-library-ethnic", state.libraryEthnic === "全部", compact)}
              ${visibleEthnics.map((ethnic) => chip(ethnic, ethnic, "data-library-ethnic", state.libraryEthnic === ethnic, compact)).join("")}
            </div>
            <p class="filter-hint">按条目标注的民族风味标签筛选，可与省份、专题组合使用。</p>
          </div>
        `
      })}
      ` : ""}
    </section>
  `;
}

function renderHomeV2() {
  const homeMatches = state.homeQuery ? searchFoods(state.homeQuery, { limit: 6 }) : [];
  const totalHomeMatches = state.homeQuery ? searchFoods(state.homeQuery).length : 0;
  const natureTiles = ["寒", "凉", "平", "温", "热"]
    .map((nature) => {
      const meta = NATURE_META[nature];
      return `
        <button class="nature-tile" data-library-nature-link="${nature}" style="background:${meta.pale};border-color:${meta.tone}22">
          <strong style="color:${meta.tone}">${nature}</strong>
          <small>${NATURE_COUNTS[nature] || 0}种</small>
        </button>
      `;
    })
    .join("");

  const qiTermTiles = QI_TERMS_HOME
    .map((term) => {
      const meta = QI_TERM_META[term];
      return `
        <button class="qi-term-tile" data-quick-term="${term}" style="background:${meta.pale};border-color:${meta.tone}22">
          <strong style="color:${meta.tone}">${term}</strong>
          <span>${meta.hint}</span>
          <small>${QI_TERM_COUNTS[term] || 0}种</small>
        </button>
      `;
    })
    .join("");

  return `
    <section class="hero">
      <h1>察食性，明食理<br>知食性，辨宜忌</h1>
      ${searchField({
        id: "homeSearch",
        placeholder: "搜索食材、别名、功效或首字母，如：木姜子 / mjz",
        buttonAttr: "data-home-search",
        buttonLabel: "搜索食材",
        action: true,
        value: state.homeQuery
      })}
      ${state.homeQuery
        ? `<div class="hero-search-results">
            ${homeMatches.length
              ? homeMatches.map((food) => `
                <button class="suggestion-row hero-suggestion-row" data-open-home-food="${food.id}">
                  <div class="food-main">
                    <strong>${food.name}</strong>
                    <small>${foodListMeta(food)}</small>
                  </div>
                  ${natureBadge(food.nature)}
                </button>
              `).join("")
              : `<div class="empty-inline">没搜到匹配食材，试试别名、拼音首字母或功效词。</div>`}
            ${totalHomeMatches > homeMatches.length
              ? `<button class="plain-button hero-view-all" type="button" data-home-view-library="true">在食材库查看全部 ${totalHomeMatches} 条</button>`
              : totalHomeMatches > 1
                ? `<button class="plain-button hero-view-all" type="button" data-home-view-library="true">在食材库查看 ${totalHomeMatches} 条结果</button>`
                : ""}
          </div>`
        : ""}
    </section>

    <section class="home-section">
      <h2 class="section-title">按传统食性浏览</h2>
      <p class="section-copy">点选食性，直接进入食材库查看。</p>
    </section>

    <section class="nature-grid">${natureTiles}</section>

    <section class="home-section">
      <h2 class="section-title">传统气机术语</h2>
      <p class="section-copy">进阶专题入口，点击后进入食材库继续筛选。</p>
    </section>

    <section class="qi-term-grid">${qiTermTiles}</section>

    <section class="notice gold">
      <strong>数据边界</strong>
      传统食养条目用于日常整理，不替代诊断、处方或疾病治疗；正在服药、孕期、慢病和持续不适者优先就医。
    </section>
  `;
}

function renderLibrary() {
  const items = filterFoods();

  return `
    <section class="page-title page-title-compact">
      <h1>食材库</h1>
    </section>

    ${renderLibraryEthnicShortcuts()}

    ${renderStickyBrowseToolbar({
      searchId: "libraryQuery",
      placeholder: "搜索食材、茶类、别名或首字母，如：木姜子 / mjz",
      queryValue: state.libraryQuery,
      filterScope: "library",
      summary: getLibraryFilterSummary(),
      activeFilterCount: countLibraryActiveFilters(),
      resultCount: items.length,
      resultUnit: "食材",
      resultMeta: `药食同源 ${OFFICIAL_COUNT}${CATALOG_OFFICIAL_COUNT ? ` · 目录 ${CATALOG_OFFICIAL_COUNT}` : ""} · 中药材 ${TCM_HERB_COUNT} · 茶类 ${TEA_COUNT}`
    })}

    <section class="food-list">
      ${items.length ? items.map(foodRow).join("") : emptyState("暂时没有匹配项", "换个别名、功效词或地区试试。", true)}
    </section>
  `;
}

function pairingLevelLabel(level) {
  if (level === "caution") return "注意";
  if (level === "gold") return "提示";
  return "留意";
}

function renderPairingRulesBrowse() {
  const query = state.checkerRulesQuery.trim().toLowerCase();
  const filtered = PAIRING_RULES.filter((rule) => {
    if (!query) return true;
    const blob = `${rule.title} ${rule.text} ${rule.category} ${(rule.ids || []).join(" ")}`.toLowerCase();
    return blob.includes(query);
  });
  const byCategory = {};
  PAIRING_CATEGORY_ORDER.forEach((cat) => { byCategory[cat] = []; });
  filtered.forEach((rule) => {
    const cat = rule.category || "其他";
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(rule);
  });
  const categories = [...PAIRING_CATEGORY_ORDER, ...Object.keys(byCategory).filter((c) => !PAIRING_CATEGORY_ORDER.includes(c))];

  return `
    <section class="detail-section pairing-rules-browse">
      <button type="button" class="pairing-rules-toggle" data-toggle-pairing-rules aria-expanded="${state.checkerRulesOpen}">
        <span class="section-title">规则库</span>
        <span class="pairing-rules-toggle-meta">${PAIRING_RULES.length} 条 · ${state.checkerRulesOpen ? "收起" : "展开浏览"}</span>
      </button>
      ${state.checkerRulesOpen ? `
        <p class="section-copy">按类别浏览已整理的搭配规则，点击可快速加入检查。</p>
        ${searchField({
          id: "checkerRulesQuery",
          placeholder: "筛选规则，如：蟹 / 柿子 / 现代安全",
          value: state.checkerRulesQuery
        })}
        ${filtered.length
          ? categories.map((category) => {
            const rules = byCategory[category] || [];
            if (!rules.length) return "";
            return `
              <div class="pairing-rules-group">
                <h3 class="pairing-rules-group-title">${category} <small>${rules.length}</small></h3>
                <div class="pairing-rules-list">
                  ${rules.map((rule) => {
                    const names = rule.ids.map((id) => foodMap.get(id)?.name || id).join(" + ");
                    return `
                      <article class="pairing-rule-card pairing-rule-${rule.level || "notice"}">
                        <div class="pairing-rule-card-head">
                          <strong>${rule.title}</strong>
                          <span class="pairing-rule-level">${pairingLevelLabel(rule.level)}</span>
                        </div>
                        <p class="pairing-rule-foods">${names}</p>
                        <p class="pairing-rule-text">${rule.text}</p>
                        <button type="button" class="plain-button pairing-rule-apply" data-apply-pairing-rule="${rule.ids.join(",")}">加入检查</button>
                      </article>
                    `;
                  }).join("")}
                </div>
              </div>
            `;
          }).join("")
          : emptyState("没有匹配规则", "换个关键词试试。")}
      ` : ""}
    </section>
  `;
}

function renderChecker() {
  const selectedFoods = state.checkerSelected.map((id) => foodMap.get(id)).filter(Boolean);
  const showSuggestions = state.checkerQuery.trim().length > 0;
  const suggestions = showSuggestions ? searchFoods(state.checkerQuery, { limit: 10, excludeIds: state.checkerSelected }) : [];
  const result = buildCheckerResult(selectedFoods);

  return `
    <section class="page-title">
      <h1>搭配检查</h1>
      <p>一次选择 2–4 种食材，查看传统搭配、现代安全提醒和常见“相克”迷思。</p>
    </section>

    <section>
      <h2 class="section-title">已选食材</h2>
      <p class="section-copy">不是安全认证，只提示已知的高优先级问题。</p>
      <div class="selected-tray">
        ${selectedFoods.length
          ? selectedFoods.map((food) => `
            <button class="selected-chip selected-chip-button" type="button" data-open-checker-food="${food.id}">
              ${food.name}
              <span class="remove-chip" data-remove-food="${food.id}" aria-label="移除 ${food.name}">×</span>
            </button>
          `).join("")
          : "<span class='section-copy'>从下方搜索并添加食材</span>"}
      </div>
    </section>

    <section class="picker-panel">
      ${searchField({
        id: "checkerQuery",
        placeholder: "搜索要检查的食材，如：见手青 / jsq",
        value: state.checkerQuery
      })}
      ${showSuggestions
        ? `
          <div class="suggestion-list suggestion-list-card">
            ${suggestions.length
              ? suggestions.map((food) => `
                <button class="suggestion-row" data-add-food="${food.id}">
                  <div class="food-main">
                    <strong>${food.name}</strong>
                    <small>${foodListMeta(food) || food.category}</small>
                  </div>
                  ${natureBadge(food.nature)}
                </button>
              `).join("")
              : `
                <div class="empty-suggestion-state" style="text-align: center; padding: 18px 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
                  <span style="color: var(--ink-soft); font-size: 13px;">没搜到对应食材，试试名称、别名、全拼或首字母。</span>
                  <button class="action-button feedback-trigger-btn" data-trigger-feedback="true" style="max-width: 130px; min-height: 32px; padding: 0 14px; border-radius: var(--radius-pill); font-size: 12px;" type="button">建议收录此食材</button>
                </div>
              `}
          </div>
        `
        : ""}
    </section>

    <section class="detail-section checker-results" id="checker-results">
      <h2 class="section-title">检查结果</h2>
      <p class="section-copy">优先级：药物与过敏 &gt; 营养与疾病状态 &gt; 传统食养。标签：现代安全 / 传统食养 / 民间迷思。</p>
      ${result}
    </section>

    ${renderPairingRulesBrowse()}
  `;
}

function renderRecipeScenarioShortcuts() {
  return `
    <div class="recipe-shortcut-stack">
      <div class="recipe-scenario-row">
        <span class="recipe-shortcut-label">场景</span>
        ${RECIPE_SCENARIO_SHORTCUTS.map((scenario, index) => chip(
          scenario.label,
          String(index),
          "data-recipe-scenario",
          isRecipeScenarioActive(scenario)
        )).join("")}
      </div>
      <div class="recipe-scenario-row">
        <span class="recipe-shortcut-label">时令</span>
        ${RECIPE_SEASON_SHORTCUTS.map((shortcut, index) => chip(
          shortcut.label,
          String(index),
          "data-recipe-season",
          isRecipeSeasonShortcutActive(shortcut)
        )).join("")}
      </div>
      <div class="recipe-scenario-row">
        <span class="recipe-shortcut-label">节气</span>
        ${RECIPE_SOLAR_TERM_SHORTCUTS.map((shortcut, index) => chip(
          shortcut.label,
          String(index),
          "data-recipe-solar-term",
          isRecipeSolarTermShortcutActive(shortcut)
        )).join("")}
      </div>
    </div>
  `;
}

function renderRecipes() {
  const items = filterRecipes();
  const syndromes = uniq(recipes.map((item) => item.primarySyndrome).filter(Boolean));
  const advancedCount = countRecipesAdvancedFilters();

  return `
    <section class="page-title page-title-compact">
      <h1>食疗方</h1>
    </section>

    ${renderRecipeScenarioShortcuts()}

    ${renderStickyBrowseToolbar({
      searchId: "recipesQuery",
      placeholder: "搜索食疗方、食材、证候，如：胃阴虚 / 脾气虚 / 银耳",
      queryValue: state.recipesQuery,
      filterScope: "recipes",
      summary: getRecipesFilterSummary(),
      activeFilterCount: countRecipesActiveFilters(),
      resultCount: items.length,
      resultUnit: "食疗方",
      quickFiltersHtml: renderRecipesQuickFilters(syndromes),
      filterButtonLabel: advancedCount > 0 ? `更多 · ${advancedCount}` : "更多筛选"
    })}

    <section class="recipe-list">
      ${items.length ? items.map(recipeRow).join("") : emptyState("没搜到对应食疗方", "可换证候词、核心食材或放宽筛选条件。", true)}
    </section>

    <section class="notice notice-compact">
      <strong>使用提示</strong>
      食疗方用于日常饮食整理，不替代面诊、处方和疾病治疗，孕期、慢病、正在用药或症状持续加重者优先就医。
    </section>
  `;
}

function renderProfile() {
  const favorites = state.favorites.map((id) => foodMap.get(id)).filter(Boolean);
  const recentFoodItems = state.recentFoods.map((id) => foodMap.get(id)).filter(Boolean);
  const favoriteRecipeItems = state.favoriteRecipes
    .map((id) => recipes.find((item) => item.id === id))
    .filter(Boolean);
  const recentRecipeItems = state.recentRecipes
    .map((id) => recipes.find((item) => item.id === id))
    .filter(Boolean);

  return `
    <section class="page-title page-title-compact">
      <h1>我的食养档案</h1>
      <p>个人提醒会影响食材详情与搭配检查的提示优先级，数据仅保存在当前浏览器。</p>
    </section>

    ${renderPwaInstallSection()}

    <section class="profile-panel">
      <h2 class="section-title">个人提醒</h2>
      <p class="section-copy">这些选项不会用于诊断，只用于把高优先级提示放到前面。</p>
      ${PROFILE_OPTIONS.map((option) => `
        <label class="profile-toggle">
          <span>${option.label}</span>
          <input type="checkbox" data-profile-toggle="${option.id}">
        </label>
      `).join("")}
    </section>

    <section class="detail-section">
      <h2 class="section-title">最近查看</h2>
      <p class="section-copy">最近打开的食材与食疗方，方便快速回到常查内容。</p>
      <h3 class="section-subtitle">食材</h3>
      <div class="food-list">
        ${recentFoodItems.length ? recentFoodItems.map(foodRow).join("") : emptyState("还没有浏览记录", "打开食材详情后会出现在这里。")}
      </div>
      <h3 class="section-subtitle">食疗方</h3>
      <div class="recipe-list">
        ${recentRecipeItems.length ? recentRecipeItems.map(recipeRow).join("") : emptyState("还没有浏览记录", "打开食疗方详情后会出现在这里。")}
      </div>
    </section>

    <section class="detail-section">
      <h2 class="section-title">我的收藏</h2>
      <p class="section-copy">收藏常查食材和食疗方，方便反复查看。</p>
      <h3 class="section-subtitle">食材</h3>
      <div class="food-list">
        ${favorites.length ? favorites.map(foodRow).join("") : emptyState("还没有收藏食材", "在食材详情里点“收藏这个食材”。")}
      </div>
      <h3 class="section-subtitle">食疗方</h3>
      <div class="recipe-list">
        ${favoriteRecipeItems.length ? favoriteRecipeItems.map(recipeRow).join("") : emptyState("还没有收藏食疗方", "在食疗方详情里点“收藏这个食疗方”。")}
      </div>
    </section>

    <section class="detail-section">
      <h2 class="section-title">数据说明</h2>
      <ul>
        <li>药食同源专题以可追溯条目方式持续补全，当前库内已整理 ${OFFICIAL_COUNT} 项${CATALOG_OFFICIAL_COUNT ? `；官方目录 manifest 已收录 ${CATALOG_OFFICIAL_COUNT} 项（2002 / 2019 / 2023 批次）` : ""}。中药材核心目录 ${TCM_HERB_COUNT} 项，正名与规格以《中华人民共和国药典》2025年版为基准。</li>
        <li>非药食同源的中药材条目标注为「参考查阅」，仅供信息整理，不替代诊断、处方或药典医嘱。</li>
        <li>传统食性、气机术语、发物和证候提示属于整理性注释，不替代医疗判断。</li>
        <li>当前页面以中国、日本、韩国、美国、英国等常见日常食材为主，地区扩库会继续分批补充。</li>
        <li>经典依据优先整理自《本草拾遗》《黄帝内经》《神农本草经》《食疗本草》《千金要方·食治篇》《饮膳正要》《脾胃论》《本草纲目》《养老奉亲书》《齐民要术》《随园食单》等食养与本草文献。</li>
      </ul>
    </section>
  `;
}

function filterFoods() {
  const term = cleanString(state.libraryQuery).toLowerCase();
  return searchFoods(state.libraryQuery).filter((food) => {
    if (food.hiddenFromLibrary) return false;
    if (term) return true;
    const byNature = state.libraryNature === "全部" || food.nature === state.libraryNature;
    const byCategory = state.libraryCategory === "全部" || food.category === state.libraryCategory;
    const byRegion = state.libraryRegion === "ALL" || food.regions.includes(state.libraryRegion);
    const byProvince = state.libraryProvince === "全部"
      || (food.provinces || []).includes(state.libraryProvince)
      || (food.regions || []).includes(state.libraryProvince);
    const byEthnic = state.libraryEthnic === "全部"
      || (food.ethnicGroups || []).includes(state.libraryEthnic);
    const byTopic = !state.libraryTopic || matchTopic(food, state.libraryTopic);
    const byKind = matchLibraryKind(food, state.libraryKind);
    const byOfficialBatch = matchOfficialBatch(food);
    return byNature && byCategory && byRegion && byProvince && byEthnic && byTopic && byKind && byOfficialBatch;
  });
}

function matchOfficialBatch(food) {
  if (state.libraryOfficialBatch === "全部") return true;
  const catalogRow = FOOD_MEDICINE_CATALOG_BY_ID.get(resolveFoodId(food.id));
  return catalogRow?.officialBatch === state.libraryOfficialBatch;
}

function matchLibraryKind(food, kind) {
  if (!kind || kind === "全部") return true;
  const itemKind = food.itemKind
    || (food.category === "中药材" ? "tcm-herb" : food.officialFoodMedicine ? "food-medicine" : "food");
  if (kind === "food") return itemKind === "food";
  if (kind === "food-medicine") return itemKind === "food-medicine" || food.officialFoodMedicine;
  if (kind === "tcm-herb") return itemKind === "tcm-herb" || food.category === "中药材";
  return true;
}

function searchFoods(query, options = {}) {
  const term = cleanString(query).toLowerCase();
  const excludeIds = options.excludeIds || [];
  let items = foods.filter((food) => !excludeIds.includes(food.id));

  if (term) {
    items = items.filter((food) => food.searchBlob.includes(term));
  }

  items.sort((a, b) => scoreFood(b, term) - scoreFood(a, term) || a.name.localeCompare(b.name, "zh-CN"));
  const deduped = [];
  const seen = new Set();

  items.forEach((food) => {
    const key = cleanString(food.name).toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    deduped.push(food);
  });

  return deduped.slice(0, options.limit || deduped.length);
}

function scoreFood(food, term) {
  if (!term) return Number(food.officialFoodMedicine) * 10 + Number(food.category === "茶饮");
  let score = 0;
  if (food.name.toLowerCase() === term) score += 100;
  if (food.aliases.some((alias) => alias.toLowerCase() === term)) score += 80;
  if (food.name.toLowerCase().includes(term)) score += 60;
  if (food.searchTerms.some((item) => item.toLowerCase() === term)) score += 40;
  if (food.searchBlob.includes(term)) score += 10;
  return score;
}

function matchTopic(food, topic) {
  if (topic === "药食同源") return food.officialFoodMedicine || food.itemKind === "food-medicine";
  if (topic === "中药材") return food.itemKind === "tcm-herb" || food.category === "中药材";
  if (topic === "茶") return food.category === "茶饮";
  if (["绿茶", "白茶", "黄茶", "乌龙茶", "黑茶", "红茶"].includes(topic)) return food.teaClass === topic || food.name === topic;
  return food.effects.includes(topic) || (food.qiTerms || []).includes(topic) || food.searchTerms.includes(topic);
}

function filterRecipes() {
  const query = cleanString(state.recipesQuery).toLowerCase();
  return recipes.filter((item) => {
    const byNature = state.recipesNature === "全部" || item.nature === state.recipesNature;
    const bySyndrome = state.recipesSyndrome === "全部"
      || item.primarySyndrome === state.recipesSyndrome
      || item.syndromes.includes(state.recipesSyndrome);
    const byUseFor = state.recipesUseFor === "全部" || (item.useForTags || []).includes(state.recipesUseFor);
    const byAvoidFor = state.recipesAvoidFor === "全部" || (item.avoidForTags || []).includes(state.recipesAvoidFor);
    const byTiming = state.recipesTiming === "全部" || (item.timing || []).includes(state.recipesTiming);
    const byCooking = state.recipesCooking === "全部" || (item.cooking || []).includes(state.recipesCooking);
    const byCoreFood = state.recipesCoreFood === "全部" || (item.coreFoods || []).includes(state.recipesCoreFood);
    const bySeason = state.recipesSeason === "全部" || (item.season || []).includes(state.recipesSeason);
    const bySolarTerm = state.recipesSolarTerm === "全部" || item.solarTerm === state.recipesSolarTerm;
    const byBodyFeel = state.recipesBodyFeel === "全部" || (item.bodyFeel || []).includes(state.recipesBodyFeel);
    const byTonify = state.recipesTonify === "全部" || item.tonify === state.recipesTonify;
    const byClear = state.recipesClear === "全部" || item.clear === state.recipesClear;
    const blob = [
      item.name,
      item.subtitle,
      item.note,
      ...item.ingredients,
      ...item.syndromes,
      ...(item.useFor || []),
      ...(item.avoidFor || []),
      ...(item.timing || []),
      ...(item.cooking || []),
      ...(item.coreFoods || []),
      ...(item.season || []),
      item.solarTerm || "",
      ...(item.bodyFeel || []),
      item.tonify || "",
      item.clear || "",
      ...item.foods.map((food) => food.name)
    ].join(" ").toLowerCase();
    const byQuery = !query || blob.includes(query);
    return byNature && bySyndrome && byUseFor && byAvoidFor && byTiming && byCooking && byCoreFood && bySeason && bySolarTerm && byBodyFeel && byTonify && byClear && byQuery;
  });
}

function buildCheckerResult(selectedFoods) {
  if (selectedFoods.length < 2) {
    return emptyState("先选 2 种以上食材", "这样我才能判断寒热叠加、证候方向和高优先级提醒。");
  }

  const notices = [];
  const activeProfileTags = PROFILE_OPTIONS.filter((option) => state.profile[option.id]).map((option) => option.id);
  const selectedIds = selectedFoods.map((food) => food.id);

  PAIRING_RULES.forEach((rule) => {
    if (rule.ids.every((id) => selectedIds.includes(id))) {
      notices.push({ level: rule.level, title: rule.title, text: rule.text, foodId: "", category: rule.category || "" });
    }
  });

  const coldCount = selectedFoods.filter((food) => ["寒", "凉"].includes(food.nature)).length;
  const warmCount = selectedFoods.filter((food) => ["温", "热"].includes(food.nature)).length;

  if (coldCount >= 2) {
    notices.push({ level: "notice", title: "整体偏寒", text: "这一组里寒凉食材偏多。容易腹泻、怕冷、胃部敏感的人群，更适合减少生冷做法或与温性主食搭配。", foodId: "", category: "传统食养" });
  }

  if (warmCount >= 2) {
    notices.push({ level: "gold", title: "整体偏温热", text: "温热食材叠加时，更要留意辣度、油量和个体耐受。口干、便秘、反流或炎症期的人群别一次吃太重。", foodId: "", category: "传统食养" });
  }

  selectedFoods.forEach((food) => {
    const hitTags = food.cautionTags.filter((tag) => activeProfileTags.includes(tag));
    if (hitTags.length) {
      notices.push({
        level: "caution",
        title: `${food.name} 与你的个人提醒有关`,
        text: `${food.name} 在当前档案下需要优先看安全提示：${hitTags.map(profileLabel).join("、")}。`,
        foodId: food.id,
        category: "现代安全"
      });
    }
  });

  if (!notices.length) {
    notices.push({ level: "notice", title: "暂未命中高优先级风险", text: "这不代表“完全没问题”，只是当前没有命中已整理的重点提醒。仍要结合份量、烹调方式和个人耐受。", foodId: "", category: "" });
  }

  const sortedNotices = notices.sort((a, b) => {
    const rank = (item) => {
      const idx = PAIRING_CATEGORY_ORDER.indexOf(item.category);
      return idx === -1 ? PAIRING_CATEGORY_ORDER.length : idx;
    };
    return rank(a) - rank(b) || (a.level === "caution" ? -1 : 0);
  });

  const noticeHtml = sortedNotices.map((item) => renderNotice(item.level, item.title, item.text, item.foodId, item.category)).join("");

  const balance = `
    <section class="detail-section">
      <h3>均衡搭配建议</h3>
      <ul>
        <li>优先让主食、蛋白质和蔬菜结构完整，再看寒热标签。</li>
        <li>寒凉组可配温热主食或熟食，温热组可配清润蔬菜或汤水。</li>
        <li>若其中有高盐酱料、酒精或刺激性调味，优先关注现代安全和基础疾病状态。</li>
      </ul>
    </section>
  `;

  return noticeHtml + balance;
}

function renderNotice(level, title, text, foodId = "", category = "") {
  const className = level === "caution" ? "notice caution" : level === "gold" ? "notice gold" : "notice";
  const categoryTag = category ? `<span class="notice-category">${category}</span>` : "";
  return `<section class="${className}"><strong>${title}</strong>${categoryTag}<p>${text}</p>${foodId ? `<button type="button" class="checker-food-link" data-open-checker-food="${foodId}">查看食材详情</button>` : ""}</section>`;
}

function foodRow(food) {
  return `
    <button class="food-row" data-open-food="${food.id}">
      <div class="food-main">
        <strong>${food.name}</strong>
        <small>${foodListMeta(food)}</small>
      </div>
      ${natureBadge(food.nature)}
    </button>
  `;
}



function emptyState(title, copy, showFeedbackButton = false) {
  return `
    <div class="empty-state" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 16px; gap: 8px;">
      <strong>${title}</strong>
      <span>${copy}</span>
      ${showFeedbackButton ? `
        <button class="action-button feedback-trigger-btn" data-trigger-feedback="true" style="margin-top: 14px; min-height: 38px; border-radius: var(--radius-pill); font-size: 13px; font-weight: 600; padding: 0 20px; box-shadow: var(--shadow-sm); display: inline-flex; align-items: center; justify-content: center; gap: 6px;" type="button">
          建议补充此主题
        </button>
      ` : ""}
    </div>
  `;
}

function triggerHapticFeedback() {
  if (typeof window !== "undefined" && window.navigator && typeof window.navigator.vibrate === "function") {
    try {
      window.navigator.vibrate(12);
    } catch (e) {
      // Ignore vibration error under restricted iframe policies
    }
  }
}

function renderFeedbackForm() {
  return `
    <div class="sheet-hero" style="border-bottom: 0; padding-bottom: 8px; text-align: left;">
      <div class="sheet-hero-top" style="margin-bottom: 12px; display: flex; gap: 14px; align-items: center;">
        <div class="nature-seal" style="border-color: var(--green); background: var(--green-pale); color: var(--green); width: 44px; height: 44px; min-width: 44px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 18px;">
          评
        </div>
        <div>
          <h2 class="sheet-title" style="margin: 0; font-size: 20px; font-family: var(--serif);">提交建议反馈</h2>
          <p class="sheet-subtitle" style="margin: 2px 0 0; font-size: 13px; color: var(--ink-soft);">告诉我们您想查询的食材、搭配或传统食疗方</p>
        </div>
      </div>
      <p style="margin: 0 0 16px; font-size: 13px; line-height: 1.6; color: var(--ink-soft); border-bottom: 1px solid var(--line); padding-bottom: 16px;">
        「食养知行」旨在认真整理日常食性分类、古代食法和现代临床安全提示。若检索未果，请在此极简登记，整理团队会参考文献排期汇编。
      </p>
    </div>

    <form id="feedbackForm" style="display: flex; flex-direction: column; gap: 16px; margin-top: 10px; width: 100%;">
      <div>
        <label class="filter-label" style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: var(--ink);">建议收录类型</label>
        <div class="filter-group filter-group-wrap" style="gap: 8px; display: flex; flex-wrap: wrap;">
          <label style="cursor: pointer; display: inline-flex; align-items: center; gap: 6px; min-height: 36px; padding: 0 12px; border: 1px solid var(--line); border-radius: var(--radius-pill); background: var(--surface); color: var(--ink-soft); font-size: 12px; transition: all 180ms ease;">
            <input type="radio" name="feedbackType" value="食材" checked style="accent-color: var(--green);"> 食材补全
          </label>
          <label style="cursor: pointer; display: inline-flex; align-items: center; gap: 6px; min-height: 36px; padding: 0 12px; border: 1px solid var(--line); border-radius: var(--radius-pill); background: var(--surface); color: var(--ink-soft); font-size: 12px; transition: all 180ms ease;">
            <input type="radio" name="feedbackType" value="搭配" style="accent-color: var(--green);"> 食性/配伍
          </label>
          <label style="cursor: pointer; display: inline-flex; align-items: center; gap: 6px; min-height: 36px; padding: 0 12px; border: 1px solid var(--line); border-radius: var(--radius-pill); background: var(--surface); color: var(--ink-soft); font-size: 12px; transition: all 180ms ease;">
            <input type="radio" name="feedbackType" value="食疗方" style="accent-color: var(--green);"> 食疗古方
          </label>
          <label style="cursor: pointer; display: inline-flex; align-items: center; gap: 6px; min-height: 36px; padding: 0 12px; border: 1px solid var(--line); border-radius: var(--radius-pill); background: var(--surface); color: var(--ink-soft); font-size: 12px; transition: all 180ms ease;">
            <input type="radio" name="feedbackType" value="其他" style="accent-color: var(--green);"> 其他建议
          </label>
        </div>
      </div>

      <div>
        <label class="filter-label" style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: var(--ink);">建议具体内容 <span style="color: var(--caution); margin-left: 2px;">*</span></label>
        <textarea id="feedbackContent" required placeholder="请说明您想补充的具体词条或组合。例如：'希望补充食材：欧芹' 或 '建议配伍增加百合配龙眼'" style="width: 100%; min-height: 100px; padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--radius-card); background: var(--surface); color: var(--ink); font-size: 14px; line-height: 1.6; outline: none; transition: border-color 150ms ease; box-shadow: none; resize: vertical; font-family: inherit;"></textarea>
      </div>

      <div>
        <label class="filter-label" style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: var(--ink);">联系方式 (可选)</label>
        <input type="text" id="feedbackContact" placeholder="您的微信号或邮箱，以便补全通过后通知您" style="width: 100%; height: 42px; padding: 0 14px; border: 1px solid var(--line); border-radius: var(--radius-card); background: var(--surface); color: var(--ink); font-size: 14px; outline: none; transition: border-color 150ms ease;">
      </div>

      <button type="submit" class="action-button" style="min-height: 44px; border-radius: var(--radius-pill); background: var(--green-deep); color: white; border: 0; font-size: 14px; font-weight: 600; width: 100%; cursor: pointer; margin-top: 8px;">
        提交建议反馈
      </button>
    </form>
  `;
}

function handleFeedbackSubmit(event) {
  event.preventDefault();
  const typeSelection = document.querySelector('input[name="feedbackType"]:checked');
  const type = typeSelection ? typeSelection.value : "食材";
  const contentEl = document.getElementById("feedbackContent");
  const content = contentEl ? contentEl.value : "";
  const contactEl = document.getElementById("feedbackContact");
  const contact = contactEl ? contactEl.value : "";

  if (!content.trim()) {
    showToast("请填写建议补充的内容哦");
    return;
  }

  showToast("反馈提交成功，非常感谢！");

  const successHtml = `
    <div style="padding: 32px 16px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;">
      <div class="nature-seal" style="border-color: var(--green); background: var(--green-pale); color: var(--green); width: 58px; height: 58px; font-size: 24px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
        ✓
      </div>
      <div>
        <h3 style="font-family: var(--serif); font-size: 20px; font-weight: 600; color: var(--ink); margin: 0 0 6px;">提交成功</h3>
        <p style="color: var(--ink-soft); font-size: 13px; line-height: 1.6; max-width: 320px; margin: 0 auto;">
          已妥善记录您关于【${type}】的补充反馈：<br>
          <em style="font-style: normal; display: block; background: var(--surface); padding: 8px 12px; border-radius: 8px; margin: 8px 0; color: var(--ink); font-size: 12px; text-align: left;">"${content.length > 50 ? content.slice(0, 47) + '...' : content}"</em>
          编辑团队会参考古今文献与医学安全论证，在下期版本中优先录入并排期。
        </p>
      </div>
      <button class="action-button" id="closeSuccessSheet" style="max-width: 140px; height: 38px; border-radius: var(--radius-pill); background: var(--green-deep); border: 0; color: white; font-size: 13px; font-weight: 600; margin-top: 10px; cursor: pointer;">
        我知道了
      </button>
    </div>
  `;
  sheetContent.innerHTML = successHtml;
  
  const closeBtn = document.getElementById("closeSuccessSheet");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeDetailSheet);
  }
}



function foodListMeta(food) {
  const parts = [food.category, food.teaClass];
  if (food.isOriginProduct || (food.giSystems || []).length) parts.push("地理标志");
  if (food.peop) parts.push("PEOP");
  if (food.daoDi?.isAuthentic || DAO_DI_BY_CANONICAL.has(resolveFoodId(food.id))) parts.push("道地");
  if (food.pharmacopoeiaEdition === "2025" && (food.itemKind === "tcm-herb" || food.category === "中药材")) {
    parts.push("药典2025");
  }
  return parts.filter(Boolean).join(" · ");
}

function chip(label, value, dataAttr, active = false, extraClass = "", title = "") {
  const attr = dataAttr ? `${dataAttr}="${escapeHtml(value)}"` : "";
  const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
  const classes = ["chip", extraClass, active ? "active" : ""].filter(Boolean).join(" ");
  return `<button type="button" class="${classes}" ${attr}${titleAttr}>${label}</button>`;
}

function filterTagChip(tag, dataAttr, active, extraClass = "filter-chip-compact") {
  const tooltip = recipeFilterTagTooltip(tag.id, RECIPE_FILTER_TAG_LOOKUP);
  return chip(tag.short, tag.id, dataAttr, active, extraClass, tooltip);
}

function isRecipeFilterGroupOpen(groupId) {
  const activeChecks = {
    "body-fit": () => state.recipesUseFor !== "全部" || state.recipesAvoidFor !== "全部",
    "timing-cooking": () => state.recipesTiming !== "全部" || state.recipesCooking !== "全部",
    "season-feel": () => state.recipesSeason !== "全部" || state.recipesSolarTerm !== "全部" || state.recipesBodyFeel !== "全部",
    "tonify-clear": () => state.recipesTonify !== "全部" || state.recipesClear !== "全部"
  };
  if (activeChecks[groupId]?.()) return true;
  return groupId === "body-fit";
}

function renderFilterDisclosureGroup({ id, title, open, bodyHtml }) {
  return `
    <details class="disclosure filter-disclosure" ${open ? "open" : ""} data-filter-group="${id}">
      <summary>
        <span>${title}</span>
        <span class="disclosure-chevron" aria-hidden="true"></span>
      </summary>
      <div class="disclosure-body filter-disclosure-body">
        ${bodyHtml}
      </div>
    </details>
  `;
}

function renderRecipeFilterTagSection(label, tags, dataAttr, activeValue) {
  return `
    <div class="filter-subsection">
      <div class="filter-label">${label}</div>
      <div class="filter-group filter-group-wrap recipe-filter-tag-group">
        ${chip("全部", "全部", dataAttr, activeValue === "全部", "filter-chip-compact")}
        ${tags.map((tag) => filterTagChip(tag, dataAttr, activeValue === tag.id)).join("")}
      </div>
    </div>
  `;
}

function getRecipeTierMeta(item) {
  if (item.solarTerm || item.id?.startsWith("solar-")) {
    return { label: "节气方", tone: "#6b5b3d", pale: "rgba(107, 91, 61, 0.12)" };
  }
  if (item.classicTier === 1 || (item.sources?.length && item.id?.startsWith("classic-"))) {
    return { label: "经典方", tone: "#8a6b2d", pale: "rgba(138, 107, 45, 0.12)" };
  }
  if (item.bulkTier === 2 || item.id?.startsWith("restored-recipe-")) {
    return { label: "参考方", tone: "#5f6b7a", pale: "rgba(95, 107, 122, 0.12)" };
  }
  if (item.sources?.length) {
    return { label: "有出处", tone: "#3d6b52", pale: "rgba(61, 107, 82, 0.12)" };
  }
  return { label: "精选", tone: "#3d6b52", pale: "rgba(61, 107, 82, 0.1)" };
}

function recipeTierBadge(item) {
  const meta = getRecipeTierMeta(item);
  return `<span class="pill-badge recipe-tier-badge" style="color:${meta.tone};background:${meta.pale}">${meta.label}</span>`;
}

function recipeRow(item) {
  const secondarySyndromes = Array.isArray(item.secondarySyndromes) ? item.secondarySyndromes : [];
  const syndromeLine = [
    item.primarySyndrome ? `主证：${item.primarySyndrome}` : "主证：未标注",
    secondarySyndromes.length ? `兼见：${secondarySyndromes.join(" / ")}` : ""
  ].filter(Boolean).join(" · ");
  const natureMeta = NATURE_META[item.nature] || NATURE_META.复合;

  return `
    <article class="recipe-row" data-open-recipe="${item.id}" role="button" tabindex="0">
      <div class="nature-seal" style="background:${natureMeta.pale};color:${natureMeta.tone}">${item.nature || "平"}</div>
      <div class="food-main recipe-row-main">
        <div class="recipe-row-head">
          <strong>${item.name}</strong>
          <div class="recipe-row-badges">${recipeTierBadge(item)}</div>
        </div>
        ${item.subtitle ? `<small class="recipe-row-subtitle">${item.subtitle}</small>` : ""}
        <small class="recipe-row-syndrome">${syndromeLine}</small>
      </div>
    </article>
  `;
}

function renderFoodProfileAlert(food) {
  const activeProfileTags = PROFILE_OPTIONS.filter((option) => state.profile[option.id]).map((option) => option.id);
  const hitTags = food.cautionTags.filter((tag) => activeProfileTags.includes(tag));
  if (!hitTags.length) return "";
  return `
    <section class="notice caution sheet-profile-alert">
      <strong>与你的个人提醒相关</strong>
      ${hitTags.map(profileLabel).join("、")}：请优先阅读下方「宜忌」与「怎么吃」。
    </section>
  `;
}

function renderSheetSubnav(items) {
  return `
    <nav class="sheet-subnav" aria-label="详情导航">
      ${items.map((item) => `<a class="sheet-subnav-link" href="#${item.id}">${item.label}</a>`).join("")}
    </nav>
  `;
}

function searchField({ id, placeholder, buttonAttr = "", buttonLabel = "搜索", action = false, value = "" }) {
  const safeValue = value ? `value="${escapeHtml(value)}"` : "";
  return `
    <label class="search-input">
      <input id="${id}" type="search" placeholder="${placeholder}" ${safeValue} autocomplete="off" enterkeyhint="search">
      ${action
        ? `<button class="icon-button search-button" type="button" ${buttonAttr} aria-label="${buttonLabel}"><span class="search-icon" aria-hidden="true"></span></button>`
        : `<span class="search-icon" aria-hidden="true"></span>`}
    </label>
  `;
}

function natureBadge(nature) {
  const meta = NATURE_META[nature] || NATURE_META.复合;
  return `<span class="pill-badge" style="color:${meta.tone};background:${meta.pale}">${meta.label}</span>`;
}

function renderSourceEntry(source) {
  return `
    <article class="source-entry">
      <strong>${source.title}</strong>
      <p>${source.summary}</p>
    </article>
  `;
}

function bindReactiveInput(input, onUpdate) {
  let isComposing = false;

  input.addEventListener("compositionstart", () => {
    isComposing = true;
  });

  input.addEventListener("compositionend", () => {
    isComposing = false;
    onUpdate(input.value);
  });

  input.addEventListener("input", () => {
    if (isComposing) return;
    onUpdate(input.value);
  });
}

function restoreInputFocus(id) {
  const input = document.getElementById(id);
  if (!input) return;
  const length = input.value.length;
  input.focus({ preventScroll: true });
  if (typeof input.setSelectionRange === "function") {
    input.setSelectionRange(length, length);
  }
}

function handleHomeSearchSubmit() {
  const term = cleanString(state.homeQuery);
  if (!term) return;

  const matches = searchFoods(term, { limit: 8 });
  const exact = findExactFoodMatch(matches, term);

  if (exact) {
    state.homeQuery = "";
    openFoodDetail(exact.id);
    render();
    return;
  }

  if (matches.length === 1) {
    state.homeQuery = "";
    openFoodDetail(matches[0].id);
    render();
    return;
  }

  if (matches.length > 1) {
    navigateToLibraryFromHome({ query: term });
    return;
  }

  showToast("没有搜到匹配食材，换个别名或拼音试试。");
}

function findExactFoodMatch(items, term) {
  const normalized = term.toLowerCase();
  return items.find((food) => {
    if (food.name.toLowerCase() === normalized) return true;
    if (food.aliases.some((alias) => alias.toLowerCase() === normalized)) return true;
    if (food.searchTerms.some((alias) => alias.toLowerCase() === normalized)) return true;
    return false;
  }) || null;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function openSheetFromState() {
  if (!state.sheet) return;
  if (state.sheet.type === "filters") {
    const html = state.sheet.scope === "library"
      ? renderLibraryFilterDrawerContent(filterFoods().length)
      : renderRecipesFilterDrawerContent(filterRecipes().length);
    showFilterSheet(html);
    return;
  }
  if (state.sheet.type === "food") {
    const food = foodMap.get(state.sheet.id);
    if (food) showSheet(renderFoodDetail(food));
  }
  if (state.sheet.type === "recipe") {
    const item = recipes.find((recipeItem) => recipeItem.id === state.sheet.id);
    if (item) showSheet(renderRecipeDetail(item));
  }
  if (state.sheet.type === "pwa-guide") {
    showSheet(renderPwaInstallGuideSheet());
  }
  if (state.sheet.type === "feedback") {
    showSheet(renderFeedbackForm());
  }
}

function openFoodDetail(id) {
  if (!foodMap.has(id)) return;
  pushRecentFood(id);
  state.sheet = { type: "food", id };
  showSheet(renderFoodDetail(foodMap.get(id)));
  syncUrl({ push: true });
}

function openRecipeDetail(id) {
  const item = recipes.find((recipeItem) => recipeItem.id === id);
  if (!item) {
    showToast("这个食疗方暂时没加载完整，请刷新后再试。");
    return;
  }
  pushRecentRecipe(id);
  state.sheet = { type: "recipe", id };
  showSheet(renderRecipeDetail(item));
  syncUrl({ push: true });
}

function dismissSheetChrome() {
  sheet.classList.remove("visible", "filter-sheet");
  sheetBackdrop.classList.remove("visible");
  setTimeout(() => {
    if (state.sheet) return;
    sheet.hidden = true;
    sheetBackdrop.hidden = true;
    sheetContent.innerHTML = "";
  }, 180);
}

function finalizeCloseDetailSheet(options = {}) {
  const wasFilterSheet = options.wasFilterSheet ?? state.sheet?.type === "filters";
  state.sheet = null;
  dismissSheetChrome();
  if (!options.skipUrl) syncUrl();
  if (wasFilterSheet) {
    scrollToResultAnchor();
  }
}

function closeDetailSheet() {
  if (!state.sheet) return;

  if (navStackDepth > 0) {
    history.back();
    return;
  }

  finalizeCloseDetailSheet();
}

function showSheet(html) {
  sheet.classList.remove("filter-sheet");
  sheetContent.innerHTML = html;
  sheet.hidden = false;
  sheetBackdrop.hidden = false;
  requestAnimationFrame(() => {
    sheet.classList.add("visible");
    sheetBackdrop.classList.add("visible");
  });

  sheetContent.querySelectorAll("[data-open-food]").forEach((button) => {
    button.addEventListener("click", () => openFoodDetail(button.dataset.openFood));
  });
  sheetContent.querySelectorAll("[data-open-recipe]").forEach((button) => {
    button.addEventListener("click", () => openRecipeDetail(button.dataset.openRecipe));
  });
  sheetContent.querySelectorAll("[data-open-checker-food]").forEach((button) => {
    button.addEventListener("click", () => openFoodDetail(button.dataset.openCheckerFood));
  });

  const feedbackForm = sheetContent.querySelector("#feedbackForm");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", handleFeedbackSubmit);
  }

  bindSheetSubnavSpy(sheetContent);
}

function recipesForFood(foodId, limit = 6) {
  const food = foodMap.get(foodId);
  const relatedIds = uniq([
    foodId,
    resolveFoodId(foodId),
    food?.baseFoodId ? resolveFoodId(food.baseFoodId) : ""
  ].filter(Boolean));
  return publishedRecipeItems
    .filter((item) => (item.foodIds || []).some((id) => relatedIds.includes(foodByRecipeId(id)?.id)))
    .slice(0, limit)
    .map((item) => recipes.find((recipe) => recipe.id === item.id) || item);
}

function pairingRulesForFood(foodId, limit = 4) {
  const food = foodMap.get(foodId);
  const relatedIds = new Set([
    foodId,
    resolveFoodId(foodId),
    food?.baseFoodId ? resolveFoodId(food.baseFoodId) : ""
  ].filter(Boolean));
  return PAIRING_RULES
    .filter((rule) => (rule.ids || []).some((id) => relatedIds.has(resolveFoodId(id))))
    .slice(0, limit);
}

function giSystemLabel(system) {
  return ({
    cnipa: "国知局 GI",
    mara: "农产品 GI",
    provincial: "省级 GI",
    peop: "PEOP"
  })[system] || system;
}

function renderOriginCertificationSection(food) {
  const relatedOrigin = food.isOriginProduct
    ? [food]
    : (ORIGIN_BY_BASE_ID.get(resolveFoodId(food.id)) || []);
  const daoDi = food.daoDi || DAO_DI_BY_CANONICAL.get(resolveFoodId(food.id));
  const hasGi = relatedOrigin.some((item) => (item.giSystems || []).length);
  const hasPeop = relatedOrigin.some((item) => item.peop);
  const hasDaoDi = Boolean(daoDi?.daoDiRegions?.length) || relatedOrigin.some((item) => item.daoDi?.isAuthentic);
  if (!hasGi && !hasPeop && !hasDaoDi && !relatedOrigin.length) return "";

  const giBadges = uniq(relatedOrigin.flatMap((item) => (item.giSystems || []).map((row) => `${giSystemLabel(row.system)} · ${row.type || row.label || ""}`)));
  const peopLines = relatedOrigin.filter((item) => item.peop).map((item) => item.peop.label || "生态原产地（历史认证）");
  const daoDiPlaces = uniq([
    ...(daoDi?.daoDiRegions || []).map((row) => row.place),
    ...relatedOrigin.flatMap((item) => (item.daoDi?.isAuthentic ? (item.daoDi.regions || []) : []))
  ]);

  const provenanceBlocks = relatedOrigin
    .filter((item) => item.provenance)
    .map((item) => {
      const p = item.provenance;
      const link = p.sourceUrl
        ? `<a class="plain-button inline-link" href="${p.sourceUrl}" target="_blank" rel="noopener noreferrer">查看公开来源</a>`
        : "";
      return `
        <li>
          <strong>${item.name}</strong> · ${p.source || "公开名录"}
          ${p.sourceId ? `<small>登记引用：${p.sourceId}</small>` : ""}
          ${p.fetchedAt ? `<small>整理日期：${p.fetchedAt}</small>` : ""}
          ${link}
        </li>
      `;
    })
    .join("");

  const relatedLinks = (!food.isOriginProduct && relatedOrigin.length)
    ? `<p class="section-copy">相关产地产品：
        ${relatedOrigin.map((item) => `<button type="button" class="plain-button inline-link" data-open-food="${item.id}">${item.name}</button>`).join("、")}
      </p>`
    : "";

  const baseLink = (food.isOriginProduct && food.baseFoodId && foodMap.has(resolveFoodId(food.baseFoodId)))
    ? `<p class="section-copy">基原条目：<button type="button" class="plain-button inline-link" data-open-food="${resolveFoodId(food.baseFoodId)}">${foodMap.get(resolveFoodId(food.baseFoodId)).name}</button></p>`
    : "";

  return `
    <section class="detail-section origin-cert-section">
      <h3>产地与公开认证</h3>
      ${giBadges.length ? `<div class="filter-group filter-group-wrap">${giBadges.map((label) => `<span class="pill-badge origin-gi-badge">${label}</span>`).join("")}</div>` : ""}
      ${peopLines.length ? `<p><strong>PEOP：</strong>${uniq(peopLines).join("；")}</p>` : ""}
      ${daoDiPlaces.length ? `<p><strong>道地产区：</strong>${daoDiPlaces.join("、")}</p>` : ""}
      ${daoDi?.sources?.length ? `<p class="section-copy">道地依据：${daoDi.sources.join("、")}</p>` : ""}
      ${baseLink}
      ${relatedLinks}
      ${provenanceBlocks ? `<ul class="origin-provenance-list">${provenanceBlocks}</ul>` : ""}
      <p class="section-copy">${food.regulatoryNote || "产地与认证信息整理自公开登记名录，以登记机关最新公告为准，不替代官方证明。"}</p>
    </section>
  `;
}

function renderFoodDetail(food) {
  const relatedRecipes = recipesForFood(food.id, 6);
  const pairingHits = pairingRulesForFood(food.id, 4);
  const classics = buildClassicNotes(food);
  const sources = Array.isArray(food.sources) ? food.sources : [];
  const favorite = state.favorites.includes(food.id);
  const hasSuitability = Boolean(food.faCategory || food.faNote || food.suitableFor.length || food.avoidFor.length || food.contraindications.length);
  const isTcmHerb = food.itemKind === "tcm-herb" || food.category === "中药材";
  const isReferenceOnly = food.usageScope === "reference-only";
  const relatedFormFoods = (food.relatedForms || []).map((id) => foodMap.get(id)).filter(Boolean);
  const originSection = renderOriginCertificationSection(food);
  const sheetNav = renderSheetSubnav([
    { id: "sheet-overview", label: "概览" },
    ...(originSection ? [{ id: "sheet-origin", label: "产地认证" }] : []),
    { id: "sheet-eating", label: isTcmHerb ? "使用提示" : "怎么吃" },
    ...(hasSuitability ? [{ id: "sheet-suitability", label: "宜忌" }] : []),
    ...(pairingHits.length ? [{ id: "sheet-pairing", label: "搭配提醒" }] : []),
    { id: "sheet-sources", label: "依据" }
  ]);

  return `
    ${renderFoodProfileAlert(food)}
    ${isReferenceOnly ? `
    <section class="notice caution sheet-profile-alert">
      <strong>中药信息参考</strong>
      本条为《中国药典》2025年版整理信息，仅供查阅，不替代诊断、处方或医嘱；不可自行当作普通食材大量食用。
    </section>` : ""}
    ${sheetNav}
    <section class="sheet-hero" id="sheet-overview">
      <div class="sheet-hero-top">
        <div class="nature-seal" style="background:${(NATURE_META[food.nature] || NATURE_META.复合).pale};color:${(NATURE_META[food.nature] || NATURE_META.复合).tone}">${food.nature}</div>
        <div>
          <h2 class="sheet-title">${food.name}</h2>
          <p class="sheet-subtitle">${[food.category, food.teaClass, food.en].filter(Boolean).join(" · ")}</p>
        </div>
      </div>
      <div class="filter-group filter-group-wrap">
        <span class="pill-badge">${food.category}</span>
        ${food.officialFoodMedicine ? '<span class="pill-badge">药食同源</span>' : ""}
        ${(food.giSystems || []).length ? '<span class="pill-badge origin-gi-badge">地理标志</span>' : ""}
        ${food.peop ? '<span class="pill-badge">PEOP</span>' : ""}
        ${(food.daoDi?.isAuthentic || DAO_DI_BY_CANONICAL.has(resolveFoodId(food.id))) ? '<span class="pill-badge">道地产区</span>' : ""}
        ${food.pharmacopoeiaEdition === "2025" ? '<span class="pill-badge">药典2025</span>' : ""}
        ${isReferenceOnly ? '<span class="pill-badge">参考查阅</span>' : ""}
        ${food.effects.slice(0, 3).map((effect) => `<span class="pill-badge">${effect}</span>`).join("")}
      </div>
      ${food.aliases.length ? `<p class="sheet-subtitle">别名：${food.aliases.slice(0, 8).join("、")}</p>` : ""}
      <p class="sheet-summary">${food.summary || "暂无摘要。"}</p>
      <button class="plain-button cta-button" data-toggle-favorite="${food.id}">${favorite ? "已收藏" : isTcmHerb ? "收藏此条目" : "收藏这个食材"}</button>
    </section>

    ${originSection ? `<div id="sheet-origin">${originSection}</div>` : ""}

    <section class="detail-section">
      <h3 id="sheet-nature">${isTcmHerb ? "传统中药属性" : "传统食养属性"}</h3>
      <div class="detail-grid">
        <div class="detail-block"><strong>性</strong><p>${food.nature} · ${(NATURE_META[food.nature] || NATURE_META.复合).label}</p></div>
        <div class="detail-block"><strong>味</strong><p>${food.flavor || "未标注"}</p></div>
        ${isTcmHerb ? `<div class="detail-block"><strong>归经</strong><p>${food.meridians.length ? food.meridians.join("、") : "未标注"}</p></div>` : ""}
        ${isTcmHerb ? `<div class="detail-block"><strong>药用部位</strong><p>${food.partUsed || "未标注"}</p></div>` : ""}
        <div class="detail-block"><strong>地区来源</strong><p>${renderRegionSummary(food)}</p></div>
        <div class="detail-block"><strong>传统关键词</strong><p>${food.effects.join("、") || "未标注"}</p></div>
      </div>
      ${relatedFormFoods.length ? `
      <p><strong>相关规格：</strong>
        ${relatedFormFoods.map((item) => `<button type="button" class="plain-button inline-link" data-open-food="${item.id}">${item.name}</button>`).join("、")}
      </p>` : ""}
    </section>

    <section class="detail-section" id="sheet-eating">
      <h3>${isTcmHerb ? "使用与食养提示" : "食用建议"}</h3>
      <div class="detail-grid">
        ${isTcmHerb
          ? `<div class="detail-block"><strong>适用范围</strong><p>${isReferenceOnly ? "中药信息参考，非日常食材目录。" : "可在药食同源场景下少量入膳。"}</p></div>`
          : `<div class="detail-block"><strong>单独吃是否合适</strong><p>${food.alone || "少量、熟食、结合个人耐受来判断。"}</p></div>`}
        <div class="detail-block"><strong>更适合什么时候${isTcmHerb ? "参考" : "吃"}</strong><p>${food.timing || (isTcmHerb ? "按证候与个体状态，由专业人士指导。" : "优先放在规律正餐里，而不是靠极端做法放大寒热。")} </p></div>
        <div class="detail-block"><strong>${isTcmHerb ? "常见配伍思路" : "如何搭配"}</strong><p>${food.pair || (isTcmHerb ? "详见相关食疗方与经典依据，勿自行拼凑处方。" : "与主食、蛋白质、蔬菜一起看整体结构。")} </p></div>
        <div class="detail-block"><strong>安全提示</strong><p>${food.caution || "结合剂量、加工方式和个人状态综合判断。"} </p></div>
      </div>
    </section>

    ${pairingHits.length ? `
      <section class="detail-section" id="sheet-pairing">
        <h3>搭配提醒</h3>
        <div class="pairing-rules-list">
          ${pairingHits.map((rule) => `
            <article class="pairing-rule-card pairing-rule-${rule.level || "notice"}">
              <div class="pairing-rule-card-head">
                <strong>${rule.title}</strong>
                <span class="pairing-rule-level">${pairingLevelLabel(rule.level)}</span>
              </div>
              <p class="pairing-rule-text">${rule.text}</p>
            </article>
          `).join("")}
        </div>
      </section>` : ""}

    ${hasSuitability
      ? `
      <section class="detail-section" id="sheet-suitability">
        <h3>宜食与忌食人群</h3>
        ${food.faCategory ? `<p><strong>发物分类：</strong>${food.faCategory}${food.faNote ? `；${food.faNote}` : ""}</p>` : ""}
        ${food.suitableFor.length ? `<p><strong>更适合：</strong>${food.suitableFor.join("、")}</p>` : ""}
        ${food.avoidFor.length ? `<p><strong>不太适合：</strong>${food.avoidFor.join("、")}</p>` : ""}
        ${food.contraindications.length ? `<p><strong>禁忌提示：</strong>${food.contraindications.join("、")}</p>` : ""}
      </section>` : ""}

    <section class="detail-section" id="sheet-sources">
      <h3>经典依据</h3>
      ${sources.length
        ? `<div class="source-list">${sources.map(renderSourceEntry).join("")}</div>`
        : ""}
      <ul>
        ${classics.map((item) => `<li>${item}</li>`).join("") || "<li>当前以整理性摘要为主，条目级出典仍在继续补全。</li>"}
      </ul>
      ${food.safetyNote ? `<p><strong>现代安全注释：</strong>${food.safetyNote}</p>` : ""}
    </section>

    <section class="detail-section">
      <h3>相关食疗方</h3>
      <div class="recipe-list">
        ${relatedRecipes.length ? relatedRecipes.map(recipeRow).join("") : emptyState("还没有收录到对应食疗方", "这部分会继续按证候和高频食材扩充。")}
      </div>
    </section>
  `;
}

function scrollCheckerResults() {
  const anchor = app.querySelector("#checker-results");
  if (!anchor) return;
  anchor.classList.add("checker-results-highlight");
  anchor.scrollIntoView({ behavior: "smooth", block: "nearest" });
  clearTimeout(scrollCheckerResults.timer);
  scrollCheckerResults.timer = setTimeout(() => {
    anchor.classList.remove("checker-results-highlight");
  }, 1400);
}

function bindSheetSubnavSpy(container = sheetContent) {
  const nav = container.querySelector(".sheet-subnav");
  if (!nav) return;

  const links = [...nav.querySelectorAll(".sheet-subnav-link")];
  const sections = links
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1);
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const id = link.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setActive(id);
      }
    });
  });

  if (bindSheetSubnavSpy.observer) {
    bindSheetSubnavSpy.observer.disconnect();
  }

  bindSheetSubnavSpy.observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target?.id) {
        setActive(visible[0].target.id);
      }
    },
    { root: container, rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] }
  );

  sections.forEach((section) => bindSheetSubnavSpy.observer.observe(section));
  setActive(sections[0].id);
}

function bindSheetSwipeClose() {
  const handle = sheet.querySelector(".sheet-handle");
  if (!handle || handle.dataset.swipeBound === "true") return;
  handle.dataset.swipeBound = "true";

  let startY = 0;
  let dragging = false;

  handle.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1) return;
    startY = event.touches[0].clientY;
    dragging = true;
  }, { passive: true });

  handle.addEventListener("touchmove", (event) => {
    if (!dragging || event.touches.length !== 1) return;
    const delta = event.touches[0].clientY - startY;
    if (delta > 72) {
      dragging = false;
      closeDetailSheet();
    }
  }, { passive: true });

  handle.addEventListener("touchend", () => {
    dragging = false;
  }, { passive: true });
}

function renderRegionSummary(food) {
  const country = (food.regions || []).map((region) => REGION_LABELS[region]).filter(Boolean);
  const provinces = food.provinces || [];
  const ethnic = food.ethnicGroups || [];
  const parts = [...country, ...provinces, ...ethnic];
  return parts.length ? parts.join("、") : "未标注";
}

function renderRecipeDetail(item) {
  const secondarySyndromes = Array.isArray(item.secondarySyndromes) ? item.secondarySyndromes : [];
  const ingredients = Array.isArray(item.ingredients) ? item.ingredients : [];
  const steps = Array.isArray(item.steps) ? item.steps : [];
  const useFor = Array.isArray(item.useFor) ? item.useFor : [];
  const avoidFor = Array.isArray(item.avoidFor) ? item.avoidFor : [];
  const timing = Array.isArray(item.timing) ? item.timing : [];
  const cooking = Array.isArray(item.cooking) ? item.cooking : [];
  const coreFoods = Array.isArray(item.coreFoods) ? item.coreFoods : [];
  const foods = Array.isArray(item.foods) ? item.foods : [];
  const sources = Array.isArray(item.sources) ? item.sources : [];
  const favorite = state.favoriteRecipes.includes(item.id);
  const sheetNav = renderSheetSubnav([
    { id: "recipe-overview", label: "概览" },
    { id: "recipe-ingredients", label: "材料" },
    { id: "recipe-steps", label: "做法" },
    ...(sources.length ? [{ id: "recipe-sources", label: "依据" }] : [])
  ]);

  return `
    ${sheetNav}
    <section class="sheet-hero" id="recipe-overview">
      <div class="sheet-hero-top">
        <div class="nature-seal" style="background:${(NATURE_META[item.nature] || NATURE_META.复合).pale};color:${(NATURE_META[item.nature] || NATURE_META.复合).tone}">${item.nature}</div>
        <div>
          <h2 class="sheet-title">${item.name}</h2>
          <p class="sheet-subtitle">${item.subtitle}</p>
        </div>
      </div>
      <div class="filter-group filter-group-wrap">
        ${recipeTierBadge(item)}${item.solarTerm ? `<span class="pill-badge">节气：${item.solarTerm}</span>` : ""}${item.primarySyndrome ? `<span class="pill-badge">主证：${item.primarySyndrome}</span>` : ""}${secondarySyndromes.map((syndrome) => `<span class="pill-badge">兼见：${syndrome}</span>`).join("")}
      </div>
      <p class="sheet-summary">${item.note || "这是一条用于日常饮食整理的食疗方条目。"}${item.bulkTier === 2 ? " 本条为参考方，步骤按通用食养思路整理，请结合个体情况调整。" : ""}</p>
      <button class="plain-button cta-button" data-toggle-recipe-favorite="${item.id}">${favorite ? "已收藏" : "收藏这个食疗方"}</button>
    </section>

    <section class="detail-section" id="recipe-ingredients">
      <h3>材料</h3>
      <ul>${ingredients.length ? ingredients.map((line) => `<li>${line}</li>`).join("") : "<li>材料信息还在继续补全。</li>"}</ul>
    </section>

    <section class="detail-section">
      <h3>适用场景与慎用提示</h3>
      ${useFor.length ? `<p><strong>更适合：</strong>${useFor.join("、")}</p>` : ""}
      ${avoidFor.length ? `<div class="recipe-caution-list"><strong>谨慎参考：</strong><ul>${avoidFor.map((line) => {
    const tagId = RECIPE_FILTER_TAG_LOOKUP.byMatch.get(line);
    const tag = tagId ? RECIPE_FILTER_TAG_LOOKUP.byId[tagId] : null;
    const label = tag && tag.full !== tag.short ? `<span class="recipe-caution-short">${tag.short}</span><span class="recipe-caution-full">${tag.full}</span>` : line;
    return `<li>${label}</li>`;
  }).join("")}</ul></div>` : ""}
      ${timing.length ? `<p><strong>进食时段：</strong>${timing.join("、")}</p>` : ""}
      ${cooking.length ? `<p><strong>烹调方式：</strong>${cooking.join("、")}</p>` : ""}
      ${coreFoods.length ? `<p><strong>核心食材：</strong>${coreFoods.join("、")}</p>` : ""}
      <p><strong>使用方式：</strong>更适合作为正餐结构、阶段性轻调养或恢复期饮食整理，不替代辨证处方。</p>
    </section>

    <section class="detail-section" id="recipe-steps">
      <h3>做法</h3>
      <ol class="recipe-steps">${steps.length ? steps.map((line) => `<li>${line}</li>`).join("") : "<li>做法步骤还在继续补全。</li>"}</ol>
    </section>

    ${sources.length ? `
    <section class="detail-section" id="recipe-sources">
      <h3>经典依据</h3>
      <div class="source-list">
        ${sources.map(renderSourceEntry).join("")}
      </div>
      <p class="section-copy">依据条目用于说明整理来源，不替代个体辨证与医嘱。</p>
    </section>
    ` : ""}

    <section class="detail-section">
      <h3>相关食材</h3>
      <div class="food-list">${foods.length ? foods.map(foodRow).join("") : emptyState("暂时还没有挂上相关食材", "这条方子的食材关联会继续补全。")}</div>
    </section>

    <section class="detail-section">
      <h3>专业边界</h3>
      <p>这类食疗方用于日常调养整理，不替代辨证开方与面诊。若症状持续、反复或处于孕期、慢病、正在用药阶段，请先咨询专业医生。</p>
    </section>
  `;
}



function buildClassicNotes(food) {
  const notes = [...food.benefits];
  if (!food.sources?.length) {
    CLASSIC_SOURCE_HINTS[food.name]?.forEach((source) => {
      notes.push(`可进一步补入条目级出处：${source}`);
    });
  }

  if (food.name.includes("姜")) {
    notes.push("生姜、干姜、老姜不应混为同一使用场景，具体仍要按品种、剂量和加工方式区分。");
  }
  if (food.officialFoodMedicine) {
    notes.push("目录身份解决的是法规边界，不直接等于“人人适合日常长期大量食用”。");
  }
  return uniq(notes);
}

function toggleFavorite(foodId) {
  const wasFavorite = state.favorites.includes(foodId);
  if (wasFavorite) {
    state.favorites = state.favorites.filter((id) => id !== foodId);
    saveJson("foodwise-favorites", state.favorites);
    showToast("已取消收藏", {
      undoLabel: "撤销",
      onUndo: () => {
        state.favorites = uniq([...state.favorites, foodId]);
        saveJson("foodwise-favorites", state.favorites);
        refreshFavoriteUi(foodId, "food");
      }
    });
  } else {
    state.favorites = uniq([...state.favorites, foodId]);
    saveJson("foodwise-favorites", state.favorites);
    showToast("已加入收藏", {
      undoLabel: "撤销",
      onUndo: () => {
        state.favorites = state.favorites.filter((id) => id !== foodId);
        saveJson("foodwise-favorites", state.favorites);
        refreshFavoriteUi(foodId, "food");
      }
    });
  }
  refreshFavoriteUi(foodId, "food");
}

function toggleRecipeFavorite(recipeId) {
  const wasFavorite = state.favoriteRecipes.includes(recipeId);
  if (wasFavorite) {
    state.favoriteRecipes = state.favoriteRecipes.filter((id) => id !== recipeId);
    saveJson("foodwise-favorite-recipes", state.favoriteRecipes);
    showToast("已取消收藏", {
      undoLabel: "撤销",
      onUndo: () => {
        state.favoriteRecipes = uniq([...state.favoriteRecipes, recipeId]);
        saveJson("foodwise-favorite-recipes", state.favoriteRecipes);
        refreshFavoriteUi(recipeId, "recipe");
      }
    });
  } else {
    state.favoriteRecipes = uniq([...state.favoriteRecipes, recipeId]);
    saveJson("foodwise-favorite-recipes", state.favoriteRecipes);
    showToast("已加入收藏", {
      undoLabel: "撤销",
      onUndo: () => {
        state.favoriteRecipes = state.favoriteRecipes.filter((id) => id !== recipeId);
        saveJson("foodwise-favorite-recipes", state.favoriteRecipes);
        refreshFavoriteUi(recipeId, "recipe");
      }
    });
  }
  refreshFavoriteUi(recipeId, "recipe");
}

function refreshFavoriteUi(id, type) {
  if (type === "food" && state.sheet?.type === "food" && state.sheet.id === id) {
    showSheet(renderFoodDetail(foodMap.get(id)));
    return;
  }
  const item = recipes.find((recipeItem) => recipeItem.id === id);
  if (type === "recipe" && state.sheet?.type === "recipe" && state.sheet.id === id && item) {
    showSheet(renderRecipeDetail(item));
    return;
  }
  render();
}

function profileLabel(id) {
  return PROFILE_OPTIONS.find((option) => option.id === id)?.label || id;
}

function syncUrl(options = {}) {
  const { push = false } = options;
  const params = new URLSearchParams();
  if (state.view !== "home") params.set("view", state.view);
  if (state.view === "home" && state.homeQuery) params.set("q", state.homeQuery);
  if (state.view === "library") {
    if (state.libraryQuery) params.set("q", state.libraryQuery);
    if (state.libraryNature !== "全部") params.set("ln", state.libraryNature);
    if (state.libraryCategory !== "全部") params.set("lc", state.libraryCategory);
    if (state.libraryRegion !== "ALL") params.set("lr", state.libraryRegion);
    if (state.libraryProvince !== "全部") params.set("lp", state.libraryProvince);
    if (state.libraryEthnic !== "全部") params.set("le", state.libraryEthnic);
    if (state.libraryTopic) params.set("lt", state.libraryTopic);
    if (state.libraryKind !== "全部") params.set("lk", state.libraryKind);
    if (state.libraryOfficialBatch !== "全部") params.set("lob", state.libraryOfficialBatch);
  }
  if (state.view === "recipes") {
    if (state.recipesQuery) params.set("q", state.recipesQuery);
    if (state.recipesNature !== "全部") params.set("rn", state.recipesNature);
    if (state.recipesSyndrome !== "全部") params.set("rs", state.recipesSyndrome);
    if (state.recipesCoreFood !== "全部") params.set("rcf", state.recipesCoreFood);
    if (state.recipesUseFor !== "全部") params.set("ruf", state.recipesUseFor);
    if (state.recipesAvoidFor !== "全部") params.set("raf", state.recipesAvoidFor);
    if (state.recipesSolarTerm !== "全部") params.set("rst", state.recipesSolarTerm);
  }
  if (state.view === "checker" && state.checkerQuery) params.set("q", state.checkerQuery);
  if (state.view === "checker" && state.checkerSelected.length) params.set("pair", state.checkerSelected.join(","));
  if (state.sheet?.type === "food") params.set("food", state.sheet.id);
  if (state.sheet?.type === "recipe") params.set("recipe", state.sheet.id);
  if (state.sheet?.type === "filters") params.set("filters", state.sheet.scope);
  const url = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
  const snapshot = buildHistorySnapshot();
  if (push) {
    history.pushState(snapshot, "", url);
    navStackDepth += 1;
  } else {
    history.replaceState(snapshot, "", url);
  }
}

function showToast(message, options = {}) {
  const { undoLabel = "", onUndo } = options;
  clearTimeout(showToast.timer);

  if (undoLabel && typeof onUndo === "function") {
    toastEl.innerHTML = `<span class="toast-message">${escapeHtml(message)}</span><button type="button" class="toast-undo">${escapeHtml(undoLabel)}</button>`;
    toastEl.classList.add("toast-with-action");
    toastEl.querySelector(".toast-undo")?.addEventListener("click", () => {
      clearTimeout(showToast.timer);
      toastEl.classList.remove("visible", "toast-with-action");
      onUndo();
    });
  } else {
    toastEl.textContent = message;
    toastEl.classList.remove("toast-with-action");
  }

  toastEl.classList.add("visible");
  showToast.timer = setTimeout(() => {
    toastEl.classList.remove("visible", "toast-with-action");
  }, undoLabel ? 3200 : 1800);
}
