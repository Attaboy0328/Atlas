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
  RU: "俄罗斯"
};

const CATEGORY_ORDER = [
  "食药物质",
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
  { name: "草鱼", aliases: ["鲩鱼"], pinyin: "caoyu", initials: "cy", regional: ["广东鲩鱼"], english: ["grass carp"] },
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

const PAIRING_RULES = [
  {
    ids: ["crab", "persimmon"],
    title: "蟹与柿",
    level: "caution",
    text: "更像寒凉叠加和高鞣酸影响消化，不是“必然中毒”。脾胃虚寒、腹泻或一次吃很多时尤其不舒服。"
  },
  {
    ids: ["crab", "pear"],
    title: "蟹与梨",
    level: "caution",
    text: "同属偏寒，常见问题是腹痛、腹泻和胃部不适风险上升。"
  },
  {
    ids: ["crab", "peanut"],
    title: "蟹与花生",
    level: "notice",
    text: "高脂加海鲜对部分人会更腻、更难消化，重点是肠胃负担。"
  },
  {
    ids: ["white-radish", "ginseng"],
    title: "白萝卜与人参",
    level: "gold",
    text: "传统食养里常说“下气”与“补气”方向不同，属于使用目的不一致，不等于现代意义上的相克中毒。"
  },
  {
    ids: ["tea", "iron-rich-meal"],
    title: "浓茶与补铁场景",
    level: "notice",
    text: "不是食物相克，而是茶多酚可能影响铁吸收。缺铁或正在补铁时，尽量与正餐或铁剂错开。"
  },
  {
    ids: ["lamb", "watermelon"],
    title: "羊肉与西瓜",
    level: "gold",
    text: "传统饮食整理里常把这组理解为温热与寒凉方向相反，同食后更容易出现腹胀、腹泻或胃部不舒，重点仍是体质、季节和摄入量。"
  },
  {
    ids: ["crab", "ice-cream"],
    title: "蟹与冰饮冰品",
    level: "caution",
    text: "这类组合更像寒凉叠加，肠胃虚寒、腹泻、经常胃痛的人群更容易不舒服。"
  },
  {
    ids: ["persimmon", "black-tea"],
    title: "柿子与浓茶",
    level: "notice",
    text: "传统整理多提醒这类组合会加重胃部负担，重点不在“中毒”，而在高鞣酸和空腹、过量场景下更容易不适。"
  },
  {
    ids: ["banana", "yogurt"],
    title: "香蕉与酸奶",
    level: "notice",
    text: "并非禁配，但对本就腹泻、怕冷或空腹吃冷食容易不适的人，这组偏凉偏滑，可能让肠胃更敏感。"
  }
];

const RECIPES = [
  recipe("ginger-jujube-tea", "姜枣饮", "温", ["脾阳虚", "胃气虚"], ["ginger", "jujube"], "日常暖胃饮", ["生姜 3 片", "红枣 5 枚", "清水 500 ml"], ["红枣去核，与生姜同煮 12 分钟", "温热少量饮用"], "偏寒、胃脘不舒、晨起怕冷时更常用。"),
  recipe("yam-red-date-porridge", "山药红枣粥", "平", ["脾气虚", "胃气虚"], ["yam", "jujube", "rice"], "益气养胃", ["山药 80 克", "红枣 6 枚", "大米 80 克"], ["山药切小块", "与大米、红枣同煮成粥"], "更适合食欲差、疲乏、饭后易胀的人。"),
  recipe("lotus-lily-congee", "莲子百合粥", "平", ["胃阴虚", "阴虚内热"], ["lotus-seed", "lily-bulb", "rice"], "清润和胃", ["莲子 20 克", "百合 20 克", "粳米 80 克"], ["莲子浸泡后与米同煮", "后下百合再煮软"], "适合口干、胃中燥热感较明显时。"),
  recipe("white-fungus-pear-soup", "银耳雪梨汤", "凉", ["胃阴虚", "肺阴虚"], ["white-fungus", "pear"], "润燥生津", ["银耳 10 克", "梨 1 个", "清水适量"], ["银耳泡发后小火煮软", "加入雪梨再煮 15 分钟"], "偏重清润，不适合明显腹泻时大量喝。"),
  recipe("codonopsis-astragalus-congee", "党参黄芪红枣粥", "温", ["中气下陷", "脾气虚"], ["codonopsis", "astragalus", "jujube", "rice"], "补中益气", ["党参 10 克", "黄芪 10 克", "红枣 8 枚", "大米 80 克"], ["党参黄芪先煮取汁", "药汁与米、红枣同煮成粥"], "更适合作为体虚、久病后恢复期的日常调养。"),
  recipe("poria-coix-congee", "茯苓薏米粥", "平", ["痰湿困脾", "湿热内蕴"], ["poria", "coix-seed", "rice"], "健脾渗湿", ["茯苓 15 克", "薏米 30 克", "大米 60 克"], ["薏米提前浸泡", "与茯苓、大米同煮"], "偏向脾虚夹湿、四肢困重、舌苔厚腻场景。"),
  recipe("chenpi-millet-congee", "陈皮小米粥", "温", ["肝胃不和", "胃气虚"], ["chenpi", "millet"], "和胃理气", ["陈皮 3 克", "小米 80 克"], ["陈皮先煮 5 分钟", "加小米同煮成粥"], "饭后胀满、嗳气明显时更常见。"),
  recipe("radish-soup", "白萝卜陈皮汤", "凉", ["理气", "降气", "肝胃不和"], ["white-radish", "chenpi"], "顺气消食", ["白萝卜 200 克", "陈皮 3 克"], ["白萝卜切块", "与陈皮同煮 20 分钟"], "适合油腻后胀满，但脾胃虚寒者不宜多。"),
  recipe("longan-millet-porridge", "桂圆小米粥", "温", ["血虚", "气血两虚"], ["longan", "millet"], "养血安神", ["桂圆肉 12 克", "小米 80 克"], ["同煮成粥"], "偏温甜润，易上火者控制频率。"),
  recipe("black-sesame-walnut-paste", "黑芝麻核桃糊", "温", ["肾阳虚", "血虚"], ["black-sesame", "walnut"], "温润滋养", ["黑芝麻 20 克", "核桃仁 20 克"], ["炒香后打糊", "温热食用"], "适合作为少量加餐，不宜过甜过油。"),
  recipe("mulberry-red-date-drink", "桑葚红枣饮", "平", ["血虚", "阴虚内热"], ["mulberry", "jujube"], "养血生津", ["桑葚 15 克", "红枣 5 枚"], ["煮 15 分钟后温服"], "更适合口干、疲乏又兼轻度血虚的人。"),
  recipe("duck-pear-soup", "鸭梨百合汤", "凉", ["肺阴虚", "胃阴虚"], ["duck", "pear", "lily-bulb"], "润养清和", ["鸭肉 150 克", "梨 1 个", "百合 20 克"], ["鸭肉先焯水", "与梨、百合同炖"], "偏清润，适合燥热与咽干。"),
  recipe("apricot-lily-soup", "杏仁百合露", "凉", ["肺阴虚"], ["almond", "lily-bulb"], "润肺和中", ["甜杏仁 10 克", "百合 20 克"], ["煮软打匀"], "坚果过敏人群避免。"),
  recipe("shepherd-purse-lean-soup", "荠菜瘦肉汤", "平", ["脾不统血"], ["shepherd-purse", "pork"], "健脾和中", ["荠菜 150 克", "瘦肉 120 克"], ["瘦肉焯水", "与荠菜同煮"], "更适合作为日常温和配汤。"),
  recipe("beef-yam-soup", "山药牛肉汤", "温", ["脾不统血", "气血两虚"], ["yam", "beef"], "益气健脾", ["山药 120 克", "牛肉 150 克"], ["牛肉先炖软", "加入山药再煮熟"], "偏补益，湿热偏盛者少量。"),
  recipe("pumpkin-rice-paste", "南瓜米糊", "温", ["脾气虚", "中气下陷"], ["pumpkin", "rice"], "和中助运", ["南瓜 150 克", "大米 60 克"], ["蒸熟南瓜", "与煮熟的大米打糊"], "适合恢复期和食欲差时做轻食。"),
  recipe("lamb-ginger-soup", "生姜羊肉汤", "热", ["脾阳虚", "肾阳虚"], ["ginger", "lamb"], "温中散寒", ["羊肉 200 克", "生姜 20 克"], ["羊肉焯水", "与生姜同炖"], "偏热，口干便秘或明显上火时不宜。"),
  recipe("chicken-poria-stew", "茯苓鸡汤", "温", ["脾气虚", "痰湿困脾"], ["poria", "chicken"], "健脾祛湿", ["茯苓 15 克", "鸡肉 200 克"], ["鸡肉焯水", "与茯苓慢炖"], "兼顾补益与渗湿。"),
  recipe("hawthorn-malt-drink", "山楂麦芽饮", "平", ["食积", "肝胃不和"], ["hawthorn", "malt"], "消食和胃", ["山楂 10 克", "炒麦芽 10 克"], ["加水煮 12 分钟"], "更适合油腻积滞，不适合空腹长期饮用。"),
  recipe("lotus-root-soup", "莲藕排骨汤", "平", ["气血两虚", "脾气虚"], ["lotus-root", "pork"], "和中养血", ["莲藕 250 克", "排骨 250 克"], ["排骨焯水", "与莲藕同炖"], "家常度高，适合大多数日常调理。"),
  recipe("yam-lotus-bowl", "山药莲子羹", "平", ["脾气虚", "脾不统血"], ["yam", "lotus-seed"], "健脾和中", ["山药 100 克", "莲子 20 克", "清水适量"], ["莲子先浸泡", "与山药同煮至软烂"], "适合做成偏温和的日常调养羹。"),
  recipe("astragalus-chicken-soup", "黄芪鸡汤", "温", ["中气下陷", "气血两虚"], ["astragalus", "chicken", "jujube"], "补气养中", ["黄芪 10 克", "鸡肉 200 克", "红枣 6 枚"], ["鸡肉焯水", "与黄芪红枣同炖"], "更适合恢复期和疲乏明显时，正在用药者先看个人提醒。"),
  recipe("chenpi-rice-water", "陈皮米汤", "温", ["肝胃不和", "胃气虚"], ["chenpi", "rice"], "和胃理气", ["陈皮 3 克", "大米 50 克"], ["陈皮先煮 5 分钟", "加入米汤同煮"], "适合胃口差、饭后胀满、嗳气偏多时少量饮用。"),
  recipe("white-fungus-lily-bowl", "银耳百合羹", "平", ["胃阴虚", "肺阴虚"], ["white-fungus", "lily-bulb"], "润养生津", ["银耳 10 克", "百合 20 克", "清水适量"], ["银耳先泡发煮软", "后下百合再煮"], "偏润养，腹泻时不宜多食。"),
  recipe("lotus-jujube-congee", "莲子红枣粥", "平", ["脾气虚", "血虚"], ["lotus-seed", "jujube", "rice"], "补脾养心", ["莲子 20 克", "红枣 6 枚", "大米 80 克"], ["同煮成粥"], "比纯甜品更适合作为正餐中的软食调养。"),
  recipe("ginger-chenpi-drink", "生姜陈皮饮", "温", ["理气", "胃气虚"], ["ginger", "chenpi"], "温中理气", ["生姜 3 片", "陈皮 3 克"], ["加水煮 10 分钟"], "适合受凉后胃里发堵、食欲差的场景，口干明显时不宜太频繁。"),
  recipe("millet-poria-bowl", "小米茯苓粥", "平", ["脾气虚", "痰湿困脾"], ["millet", "poria"], "健脾渗湿", ["小米 80 克", "茯苓 12 克"], ["茯苓煎汁", "以汁煮小米成粥"], "比重补更轻，更适合日常慢慢调。"),
  recipe("bergamot-pear-drink", "佛手雪梨饮", "凉", ["肝胃不和", "胃阴虚"], ["bergamot", "pear"], "理气生津", ["佛手 5 克", "雪梨 1 个"], ["佛手先煮", "再下雪梨稍煮"], "适合胀闷伴口干场景，腹泻时不宜偏凉多饮。")
];

function recipe(id, name, nature, syndromes, foodIds, subtitle, ingredients, steps, note) {
  return { id, name, nature, syndromes, foodIds, subtitle, ingredients, steps, note };
}

/* BEGIN RESTORED BULK APP DATA */
const RESTORED_PAIRING_RULES = [
  {
    "ids": [
      "crab",
      "black-tea"
    ],
    "title": "蟹与红茶",
    "level": "notice",
    "text": "传统整理里常把这组看作增加胃部负担的组合，重点是浓茶、空腹和过量场景。"
  },
  {
    "ids": [
      "shrimp",
      "orange"
    ],
    "title": "虾与橙子",
    "level": "notice",
    "text": "更像酸性水果与海鲜同食后肠胃敏感人群更容易不适，并非一律禁配。"
  },
  {
    "ids": [
      "soy-milk",
      "egg"
    ],
    "title": "豆浆与鸡蛋",
    "level": "gold",
    "text": "属于常见民间争议搭配，重点在于同时高量摄入时个别人会觉得胀，不是现代意义上的相克中毒。"
  },
  {
    "ids": [
      "milk",
      "orange"
    ],
    "title": "牛奶与橙子",
    "level": "notice",
    "text": "酸甜水果与奶同食时，胃部敏感、反流或空腹人群更容易反酸和不适。"
  },
  {
    "ids": [
      "honey",
      "onion"
    ],
    "title": "蜂蜜与葱",
    "level": "gold",
    "text": "更接近传统相克迷思提醒，现代重点仍是个人耐受与整体饮食结构。"
  },
  {
    "ids": [
      "rabbit",
      "celery"
    ],
    "title": "兔肉与芹菜",
    "level": "gold",
    "text": "传统条目里很常见，当前更适合作为整理过的相克迷思，不应直接当成有毒结论。"
  },
  {
    "ids": [
      "coffee",
      "green-tea"
    ],
    "title": "咖啡与绿茶",
    "level": "notice",
    "text": "并非禁配，但双重咖啡因与刺激性叠加时，心悸、失眠、胃部敏感人群更要留意。"
  },
  {
    "ids": [
      "durian",
      "beer"
    ],
    "title": "榴莲与啤酒",
    "level": "caution",
    "text": "更像高糖高热量与酒精叠加的现实负担提醒，酒后和消化不适时应避免。"
  },
  {
    "ids": [
      "spinach",
      "milk"
    ],
    "title": "菠菜与牛奶",
    "level": "notice",
    "text": "重点在草酸和钙同餐时部分人会觉得肠胃不舒服，不属于必须绝对回避的组合。"
  },
  {
    "ids": [
      "spinach",
      "cucumber"
    ],
    "title": "菠菜与黄瓜",
    "level": "gold",
    "text": "属于营养吸收方向的传统整理提醒，不是毒性问题。"
  },
  {
    "ids": [
      "watermelon",
      "ice-cream"
    ],
    "title": "西瓜与冰淇淋",
    "level": "notice",
    "text": "整体偏寒凉，腹泻、怕冷、胃肠敏感人群更容易不舒服。"
  },
  {
    "ids": [
      "lamb",
      "vinegar"
    ],
    "title": "羊肉与醋",
    "level": "gold",
    "text": "传统上常视作温热与酸收方向不合，现代更适合作为口感与耐受提醒。"
  },
  {
    "ids": [
      "beef",
      "chestnut"
    ],
    "title": "牛肉与栗子",
    "level": "gold",
    "text": "常见于传统相克条目，现代更应理解为高蛋白高淀粉同餐后消化负担可能偏重。"
  },
  {
    "ids": [
      "eel",
      "grape"
    ],
    "title": "鳗鱼与葡萄",
    "level": "gold",
    "text": "属于传统相克迷思类提醒，重点不是毒性，而是减少过量混搭。"
  },
  {
    "ids": [
      "tofu",
      "honey"
    ],
    "title": "豆腐与蜂蜜",
    "level": "gold",
    "text": "传统常见条目，更适合作为历史整理信息保留，而非现代禁忌结论。"
  },
  {
    "ids": [
      "persimmon",
      "crab"
    ],
    "title": "柿子与螃蟹（补充）",
    "level": "caution",
    "text": "这是高频传统案例，核心仍是寒凉叠加与胃部负担，不是见一次就必须中毒。"
  }
];
PAIRING_RULES.push(...RESTORED_PAIRING_RULES);

const RESTORED_BULK_RECIPES = [
  {
    "id": "restored-recipe-001",
    "name": "山药莲子粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "yam",
      "lotus-seed"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "山药 适量",
      "莲子 适量",
      "清水适量"
    ],
    "steps": [
      "将山药与莲子分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-002",
    "name": "银耳百合汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "white-fungus",
      "lily-bulb"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "银耳 适量",
      "百合 适量",
      "清水适量"
    ],
    "steps": [
      "将银耳与百合分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-003",
    "name": "生姜红枣羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "ginger",
      "jujube"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "生姜 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将生姜与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-004",
    "name": "陈皮大米饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "chenpi",
      "rice"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "陈皮 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将陈皮与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-005",
    "name": "茯苓小米盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "poria",
      "millet"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "茯苓 适量",
      "小米 适量",
      "清水适量"
    ],
    "steps": [
      "将茯苓与小米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-006",
    "name": "黄芪鸡肉炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "astragalus",
      "chicken"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "黄芪 适量",
      "鸡肉 适量",
      "清水适量"
    ],
    "steps": [
      "将黄芪与鸡肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-007",
    "name": "莲藕猪肉蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "lotus-root",
      "pork"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "莲藕 适量",
      "猪肉 适量",
      "清水适量"
    ],
    "steps": [
      "将莲藕与猪肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-008",
    "name": "山楂麦芽米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "hawthorn",
      "malt"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "山楂 适量",
      "麦芽 适量",
      "清水适量"
    ],
    "steps": [
      "将山楂与麦芽分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-009",
    "name": "雪梨银耳茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "pear",
      "white-fungus"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "雪梨 适量",
      "银耳 适量",
      "清水适量"
    ],
    "steps": [
      "将雪梨与银耳分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-010",
    "name": "牛肉山药小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "beef",
      "yam"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "牛肉 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将牛肉与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-011",
    "name": "南瓜大米养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "pumpkin",
      "rice"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "南瓜 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将南瓜与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-012",
    "name": "党参红枣润养汤",
    "nature": "凉",
    "syndromes": [
      "阴虚内热"
    ],
    "foodIds": [
      "codonopsis",
      "jujube"
    ],
    "subtitle": "养阴清润",
    "ingredients": [
      "党参 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将党参与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“阴虚内热”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-013",
    "name": "薄荷雪梨健脾羹",
    "nature": "温",
    "syndromes": [
      "肾阳虚"
    ],
    "foodIds": [
      "mint",
      "pear"
    ],
    "subtitle": "温补助阳",
    "ingredients": [
      "薄荷 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将薄荷与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-014",
    "name": "佛手雪梨调气饮",
    "nature": "平",
    "syndromes": [
      "血虚"
    ],
    "foodIds": [
      "bergamot",
      "pear"
    ],
    "subtitle": "养血和中",
    "ingredients": [
      "佛手 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将佛手与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“血虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-015",
    "name": "薏米茯苓粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "coix-seed",
      "poria"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "薏米 适量",
      "茯苓 适量",
      "清水适量"
    ],
    "steps": [
      "将薏米与茯苓分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-016",
    "name": "莲子红枣汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "lotus-seed",
      "jujube"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "莲子 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将莲子与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-017",
    "name": "豆腐莲藕羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "tofu",
      "lotus-root"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "豆腐 适量",
      "莲藕 适量",
      "清水适量"
    ],
    "steps": [
      "将豆腐与莲藕分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-018",
    "name": "苹果山药饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "apple",
      "yam"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "苹果 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将苹果与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-019",
    "name": "羊肉生姜盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "lamb",
      "ginger"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "羊肉 适量",
      "生姜 适量",
      "清水适量"
    ],
    "steps": [
      "将羊肉与生姜分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-020",
    "name": "菊花罗汉果炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "chrysanthemum",
      "luo-han-guo"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "菊花 适量",
      "罗汉果 适量",
      "清水适量"
    ],
    "steps": [
      "将菊花与罗汉果分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-021",
    "name": "山药莲子蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "yam",
      "lotus-seed"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "山药 适量",
      "莲子 适量",
      "清水适量"
    ],
    "steps": [
      "将山药与莲子分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-022",
    "name": "银耳百合米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "white-fungus",
      "lily-bulb"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "银耳 适量",
      "百合 适量",
      "清水适量"
    ],
    "steps": [
      "将银耳与百合分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-023",
    "name": "生姜红枣茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "ginger",
      "jujube"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "生姜 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将生姜与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-024",
    "name": "陈皮大米小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "chenpi",
      "rice"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "陈皮 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将陈皮与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-025",
    "name": "茯苓小米养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "poria",
      "millet"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "茯苓 适量",
      "小米 适量",
      "清水适量"
    ],
    "steps": [
      "将茯苓与小米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-026",
    "name": "黄芪鸡肉润养汤",
    "nature": "凉",
    "syndromes": [
      "阴虚内热"
    ],
    "foodIds": [
      "astragalus",
      "chicken"
    ],
    "subtitle": "养阴清润",
    "ingredients": [
      "黄芪 适量",
      "鸡肉 适量",
      "清水适量"
    ],
    "steps": [
      "将黄芪与鸡肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“阴虚内热”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-027",
    "name": "莲藕猪肉健脾羹",
    "nature": "温",
    "syndromes": [
      "肾阳虚"
    ],
    "foodIds": [
      "lotus-root",
      "pork"
    ],
    "subtitle": "温补助阳",
    "ingredients": [
      "莲藕 适量",
      "猪肉 适量",
      "清水适量"
    ],
    "steps": [
      "将莲藕与猪肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-028",
    "name": "山楂麦芽调气饮",
    "nature": "平",
    "syndromes": [
      "血虚"
    ],
    "foodIds": [
      "hawthorn",
      "malt"
    ],
    "subtitle": "养血和中",
    "ingredients": [
      "山楂 适量",
      "麦芽 适量",
      "清水适量"
    ],
    "steps": [
      "将山楂与麦芽分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“血虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-029",
    "name": "雪梨银耳粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "pear",
      "white-fungus"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "雪梨 适量",
      "银耳 适量",
      "清水适量"
    ],
    "steps": [
      "将雪梨与银耳分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-030",
    "name": "牛肉山药汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "beef",
      "yam"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "牛肉 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将牛肉与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-031",
    "name": "南瓜大米羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "pumpkin",
      "rice"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "南瓜 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将南瓜与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-032",
    "name": "党参红枣饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "codonopsis",
      "jujube"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "党参 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将党参与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-033",
    "name": "薄荷雪梨盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "mint",
      "pear"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "薄荷 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将薄荷与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-034",
    "name": "佛手雪梨炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "bergamot",
      "pear"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "佛手 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将佛手与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-035",
    "name": "薏米茯苓蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "coix-seed",
      "poria"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "薏米 适量",
      "茯苓 适量",
      "清水适量"
    ],
    "steps": [
      "将薏米与茯苓分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-036",
    "name": "莲子红枣米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "lotus-seed",
      "jujube"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "莲子 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将莲子与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-037",
    "name": "豆腐莲藕茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "tofu",
      "lotus-root"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "豆腐 适量",
      "莲藕 适量",
      "清水适量"
    ],
    "steps": [
      "将豆腐与莲藕分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-038",
    "name": "苹果山药小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "apple",
      "yam"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "苹果 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将苹果与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-039",
    "name": "羊肉生姜养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "lamb",
      "ginger"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "羊肉 适量",
      "生姜 适量",
      "清水适量"
    ],
    "steps": [
      "将羊肉与生姜分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-040",
    "name": "菊花罗汉果润养汤",
    "nature": "凉",
    "syndromes": [
      "阴虚内热"
    ],
    "foodIds": [
      "chrysanthemum",
      "luo-han-guo"
    ],
    "subtitle": "养阴清润",
    "ingredients": [
      "菊花 适量",
      "罗汉果 适量",
      "清水适量"
    ],
    "steps": [
      "将菊花与罗汉果分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“阴虚内热”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-041",
    "name": "山药莲子健脾羹",
    "nature": "温",
    "syndromes": [
      "肾阳虚"
    ],
    "foodIds": [
      "yam",
      "lotus-seed"
    ],
    "subtitle": "温补助阳",
    "ingredients": [
      "山药 适量",
      "莲子 适量",
      "清水适量"
    ],
    "steps": [
      "将山药与莲子分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-042",
    "name": "银耳百合调气饮",
    "nature": "平",
    "syndromes": [
      "血虚"
    ],
    "foodIds": [
      "white-fungus",
      "lily-bulb"
    ],
    "subtitle": "养血和中",
    "ingredients": [
      "银耳 适量",
      "百合 适量",
      "清水适量"
    ],
    "steps": [
      "将银耳与百合分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“血虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-043",
    "name": "生姜红枣粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "ginger",
      "jujube"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "生姜 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将生姜与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-044",
    "name": "陈皮大米汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "chenpi",
      "rice"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "陈皮 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将陈皮与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-045",
    "name": "茯苓小米羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "poria",
      "millet"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "茯苓 适量",
      "小米 适量",
      "清水适量"
    ],
    "steps": [
      "将茯苓与小米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-046",
    "name": "黄芪鸡肉饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "astragalus",
      "chicken"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "黄芪 适量",
      "鸡肉 适量",
      "清水适量"
    ],
    "steps": [
      "将黄芪与鸡肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-047",
    "name": "莲藕猪肉盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "lotus-root",
      "pork"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "莲藕 适量",
      "猪肉 适量",
      "清水适量"
    ],
    "steps": [
      "将莲藕与猪肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-048",
    "name": "山楂麦芽炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "hawthorn",
      "malt"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "山楂 适量",
      "麦芽 适量",
      "清水适量"
    ],
    "steps": [
      "将山楂与麦芽分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-049",
    "name": "雪梨银耳蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "pear",
      "white-fungus"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "雪梨 适量",
      "银耳 适量",
      "清水适量"
    ],
    "steps": [
      "将雪梨与银耳分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-050",
    "name": "牛肉山药米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "beef",
      "yam"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "牛肉 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将牛肉与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-051",
    "name": "南瓜大米茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "pumpkin",
      "rice"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "南瓜 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将南瓜与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-052",
    "name": "党参红枣小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "codonopsis",
      "jujube"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "党参 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将党参与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-053",
    "name": "薄荷雪梨养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "mint",
      "pear"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "薄荷 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将薄荷与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-054",
    "name": "佛手雪梨润养汤",
    "nature": "凉",
    "syndromes": [
      "阴虚内热"
    ],
    "foodIds": [
      "bergamot",
      "pear"
    ],
    "subtitle": "养阴清润",
    "ingredients": [
      "佛手 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将佛手与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“阴虚内热”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-055",
    "name": "薏米茯苓健脾羹",
    "nature": "温",
    "syndromes": [
      "肾阳虚"
    ],
    "foodIds": [
      "coix-seed",
      "poria"
    ],
    "subtitle": "温补助阳",
    "ingredients": [
      "薏米 适量",
      "茯苓 适量",
      "清水适量"
    ],
    "steps": [
      "将薏米与茯苓分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-056",
    "name": "莲子红枣调气饮",
    "nature": "平",
    "syndromes": [
      "血虚"
    ],
    "foodIds": [
      "lotus-seed",
      "jujube"
    ],
    "subtitle": "养血和中",
    "ingredients": [
      "莲子 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将莲子与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“血虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-057",
    "name": "豆腐莲藕粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "tofu",
      "lotus-root"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "豆腐 适量",
      "莲藕 适量",
      "清水适量"
    ],
    "steps": [
      "将豆腐与莲藕分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-058",
    "name": "苹果山药汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "apple",
      "yam"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "苹果 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将苹果与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-059",
    "name": "羊肉生姜羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "lamb",
      "ginger"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "羊肉 适量",
      "生姜 适量",
      "清水适量"
    ],
    "steps": [
      "将羊肉与生姜分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-060",
    "name": "菊花罗汉果饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "chrysanthemum",
      "luo-han-guo"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "菊花 适量",
      "罗汉果 适量",
      "清水适量"
    ],
    "steps": [
      "将菊花与罗汉果分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-061",
    "name": "山药莲子盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "yam",
      "lotus-seed"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "山药 适量",
      "莲子 适量",
      "清水适量"
    ],
    "steps": [
      "将山药与莲子分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-062",
    "name": "银耳百合炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "white-fungus",
      "lily-bulb"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "银耳 适量",
      "百合 适量",
      "清水适量"
    ],
    "steps": [
      "将银耳与百合分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-063",
    "name": "生姜红枣蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "ginger",
      "jujube"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "生姜 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将生姜与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-064",
    "name": "陈皮大米米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "chenpi",
      "rice"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "陈皮 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将陈皮与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-065",
    "name": "茯苓小米茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "poria",
      "millet"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "茯苓 适量",
      "小米 适量",
      "清水适量"
    ],
    "steps": [
      "将茯苓与小米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-066",
    "name": "黄芪鸡肉小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "astragalus",
      "chicken"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "黄芪 适量",
      "鸡肉 适量",
      "清水适量"
    ],
    "steps": [
      "将黄芪与鸡肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-067",
    "name": "莲藕猪肉养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "lotus-root",
      "pork"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "莲藕 适量",
      "猪肉 适量",
      "清水适量"
    ],
    "steps": [
      "将莲藕与猪肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-068",
    "name": "山楂麦芽润养汤",
    "nature": "凉",
    "syndromes": [
      "阴虚内热"
    ],
    "foodIds": [
      "hawthorn",
      "malt"
    ],
    "subtitle": "养阴清润",
    "ingredients": [
      "山楂 适量",
      "麦芽 适量",
      "清水适量"
    ],
    "steps": [
      "将山楂与麦芽分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“阴虚内热”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-069",
    "name": "雪梨银耳健脾羹",
    "nature": "温",
    "syndromes": [
      "肾阳虚"
    ],
    "foodIds": [
      "pear",
      "white-fungus"
    ],
    "subtitle": "温补助阳",
    "ingredients": [
      "雪梨 适量",
      "银耳 适量",
      "清水适量"
    ],
    "steps": [
      "将雪梨与银耳分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-070",
    "name": "牛肉山药调气饮",
    "nature": "平",
    "syndromes": [
      "血虚"
    ],
    "foodIds": [
      "beef",
      "yam"
    ],
    "subtitle": "养血和中",
    "ingredients": [
      "牛肉 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将牛肉与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“血虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-071",
    "name": "南瓜大米粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "pumpkin",
      "rice"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "南瓜 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将南瓜与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-072",
    "name": "党参红枣汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "codonopsis",
      "jujube"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "党参 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将党参与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-073",
    "name": "薄荷雪梨羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "mint",
      "pear"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "薄荷 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将薄荷与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-074",
    "name": "佛手雪梨饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "bergamot",
      "pear"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "佛手 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将佛手与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-075",
    "name": "薏米茯苓盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "coix-seed",
      "poria"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "薏米 适量",
      "茯苓 适量",
      "清水适量"
    ],
    "steps": [
      "将薏米与茯苓分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-076",
    "name": "莲子红枣炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "lotus-seed",
      "jujube"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "莲子 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将莲子与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-077",
    "name": "豆腐莲藕蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "tofu",
      "lotus-root"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "豆腐 适量",
      "莲藕 适量",
      "清水适量"
    ],
    "steps": [
      "将豆腐与莲藕分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-078",
    "name": "苹果山药米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "apple",
      "yam"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "苹果 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将苹果与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-079",
    "name": "羊肉生姜茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "lamb",
      "ginger"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "羊肉 适量",
      "生姜 适量",
      "清水适量"
    ],
    "steps": [
      "将羊肉与生姜分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-080",
    "name": "菊花罗汉果小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "chrysanthemum",
      "luo-han-guo"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "菊花 适量",
      "罗汉果 适量",
      "清水适量"
    ],
    "steps": [
      "将菊花与罗汉果分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-081",
    "name": "山药莲子养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "yam",
      "lotus-seed"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "山药 适量",
      "莲子 适量",
      "清水适量"
    ],
    "steps": [
      "将山药与莲子分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-082",
    "name": "银耳百合润养汤",
    "nature": "凉",
    "syndromes": [
      "阴虚内热"
    ],
    "foodIds": [
      "white-fungus",
      "lily-bulb"
    ],
    "subtitle": "养阴清润",
    "ingredients": [
      "银耳 适量",
      "百合 适量",
      "清水适量"
    ],
    "steps": [
      "将银耳与百合分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“阴虚内热”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-083",
    "name": "生姜红枣健脾羹",
    "nature": "温",
    "syndromes": [
      "肾阳虚"
    ],
    "foodIds": [
      "ginger",
      "jujube"
    ],
    "subtitle": "温补助阳",
    "ingredients": [
      "生姜 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将生姜与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-084",
    "name": "陈皮大米调气饮",
    "nature": "平",
    "syndromes": [
      "血虚"
    ],
    "foodIds": [
      "chenpi",
      "rice"
    ],
    "subtitle": "养血和中",
    "ingredients": [
      "陈皮 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将陈皮与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“血虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-085",
    "name": "茯苓小米粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "poria",
      "millet"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "茯苓 适量",
      "小米 适量",
      "清水适量"
    ],
    "steps": [
      "将茯苓与小米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-086",
    "name": "黄芪鸡肉汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "astragalus",
      "chicken"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "黄芪 适量",
      "鸡肉 适量",
      "清水适量"
    ],
    "steps": [
      "将黄芪与鸡肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-087",
    "name": "莲藕猪肉羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "lotus-root",
      "pork"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "莲藕 适量",
      "猪肉 适量",
      "清水适量"
    ],
    "steps": [
      "将莲藕与猪肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-088",
    "name": "山楂麦芽饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "hawthorn",
      "malt"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "山楂 适量",
      "麦芽 适量",
      "清水适量"
    ],
    "steps": [
      "将山楂与麦芽分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-089",
    "name": "雪梨银耳盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "pear",
      "white-fungus"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "雪梨 适量",
      "银耳 适量",
      "清水适量"
    ],
    "steps": [
      "将雪梨与银耳分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-090",
    "name": "牛肉山药炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "beef",
      "yam"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "牛肉 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将牛肉与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-091",
    "name": "南瓜大米蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "pumpkin",
      "rice"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "南瓜 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将南瓜与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-092",
    "name": "党参红枣米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "codonopsis",
      "jujube"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "党参 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将党参与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-093",
    "name": "薄荷雪梨茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "mint",
      "pear"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "薄荷 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将薄荷与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-094",
    "name": "佛手雪梨小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "bergamot",
      "pear"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "佛手 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将佛手与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-095",
    "name": "薏米茯苓养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "coix-seed",
      "poria"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "薏米 适量",
      "茯苓 适量",
      "清水适量"
    ],
    "steps": [
      "将薏米与茯苓分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-096",
    "name": "莲子红枣润养汤",
    "nature": "凉",
    "syndromes": [
      "阴虚内热"
    ],
    "foodIds": [
      "lotus-seed",
      "jujube"
    ],
    "subtitle": "养阴清润",
    "ingredients": [
      "莲子 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将莲子与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“阴虚内热”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-097",
    "name": "豆腐莲藕健脾羹",
    "nature": "温",
    "syndromes": [
      "肾阳虚"
    ],
    "foodIds": [
      "tofu",
      "lotus-root"
    ],
    "subtitle": "温补助阳",
    "ingredients": [
      "豆腐 适量",
      "莲藕 适量",
      "清水适量"
    ],
    "steps": [
      "将豆腐与莲藕分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-098",
    "name": "苹果山药调气饮",
    "nature": "平",
    "syndromes": [
      "血虚"
    ],
    "foodIds": [
      "apple",
      "yam"
    ],
    "subtitle": "养血和中",
    "ingredients": [
      "苹果 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将苹果与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“血虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-099",
    "name": "羊肉生姜粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "lamb",
      "ginger"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "羊肉 适量",
      "生姜 适量",
      "清水适量"
    ],
    "steps": [
      "将羊肉与生姜分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-100",
    "name": "菊花罗汉果汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "chrysanthemum",
      "luo-han-guo"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "菊花 适量",
      "罗汉果 适量",
      "清水适量"
    ],
    "steps": [
      "将菊花与罗汉果分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-101",
    "name": "山药莲子羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "yam",
      "lotus-seed"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "山药 适量",
      "莲子 适量",
      "清水适量"
    ],
    "steps": [
      "将山药与莲子分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-102",
    "name": "银耳百合饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "white-fungus",
      "lily-bulb"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "银耳 适量",
      "百合 适量",
      "清水适量"
    ],
    "steps": [
      "将银耳与百合分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-103",
    "name": "生姜红枣盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "ginger",
      "jujube"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "生姜 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将生姜与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-104",
    "name": "陈皮大米炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "chenpi",
      "rice"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "陈皮 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将陈皮与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-105",
    "name": "茯苓小米蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "poria",
      "millet"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "茯苓 适量",
      "小米 适量",
      "清水适量"
    ],
    "steps": [
      "将茯苓与小米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-106",
    "name": "黄芪鸡肉米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "astragalus",
      "chicken"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "黄芪 适量",
      "鸡肉 适量",
      "清水适量"
    ],
    "steps": [
      "将黄芪与鸡肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-107",
    "name": "莲藕猪肉茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "lotus-root",
      "pork"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "莲藕 适量",
      "猪肉 适量",
      "清水适量"
    ],
    "steps": [
      "将莲藕与猪肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-108",
    "name": "山楂麦芽小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "hawthorn",
      "malt"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "山楂 适量",
      "麦芽 适量",
      "清水适量"
    ],
    "steps": [
      "将山楂与麦芽分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-109",
    "name": "雪梨银耳养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "pear",
      "white-fungus"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "雪梨 适量",
      "银耳 适量",
      "清水适量"
    ],
    "steps": [
      "将雪梨与银耳分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-110",
    "name": "牛肉山药润养汤",
    "nature": "凉",
    "syndromes": [
      "阴虚内热"
    ],
    "foodIds": [
      "beef",
      "yam"
    ],
    "subtitle": "养阴清润",
    "ingredients": [
      "牛肉 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将牛肉与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“阴虚内热”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-111",
    "name": "南瓜大米健脾羹",
    "nature": "温",
    "syndromes": [
      "肾阳虚"
    ],
    "foodIds": [
      "pumpkin",
      "rice"
    ],
    "subtitle": "温补助阳",
    "ingredients": [
      "南瓜 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将南瓜与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-112",
    "name": "党参红枣调气饮",
    "nature": "平",
    "syndromes": [
      "血虚"
    ],
    "foodIds": [
      "codonopsis",
      "jujube"
    ],
    "subtitle": "养血和中",
    "ingredients": [
      "党参 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将党参与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“血虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-113",
    "name": "薄荷雪梨粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "mint",
      "pear"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "薄荷 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将薄荷与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-114",
    "name": "佛手雪梨汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "bergamot",
      "pear"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "佛手 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将佛手与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-115",
    "name": "薏米茯苓羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "coix-seed",
      "poria"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "薏米 适量",
      "茯苓 适量",
      "清水适量"
    ],
    "steps": [
      "将薏米与茯苓分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-116",
    "name": "莲子红枣饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "lotus-seed",
      "jujube"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "莲子 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将莲子与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-117",
    "name": "豆腐莲藕盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "tofu",
      "lotus-root"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "豆腐 适量",
      "莲藕 适量",
      "清水适量"
    ],
    "steps": [
      "将豆腐与莲藕分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-118",
    "name": "苹果山药炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "apple",
      "yam"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "苹果 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将苹果与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-119",
    "name": "羊肉生姜蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "lamb",
      "ginger"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "羊肉 适量",
      "生姜 适量",
      "清水适量"
    ],
    "steps": [
      "将羊肉与生姜分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-120",
    "name": "菊花罗汉果米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "chrysanthemum",
      "luo-han-guo"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "菊花 适量",
      "罗汉果 适量",
      "清水适量"
    ],
    "steps": [
      "将菊花与罗汉果分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-121",
    "name": "山药莲子茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "yam",
      "lotus-seed"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "山药 适量",
      "莲子 适量",
      "清水适量"
    ],
    "steps": [
      "将山药与莲子分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-122",
    "name": "银耳百合小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "white-fungus",
      "lily-bulb"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "银耳 适量",
      "百合 适量",
      "清水适量"
    ],
    "steps": [
      "将银耳与百合分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-123",
    "name": "生姜红枣养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "ginger",
      "jujube"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "生姜 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将生姜与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-124",
    "name": "陈皮大米润养汤",
    "nature": "凉",
    "syndromes": [
      "阴虚内热"
    ],
    "foodIds": [
      "chenpi",
      "rice"
    ],
    "subtitle": "养阴清润",
    "ingredients": [
      "陈皮 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将陈皮与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“阴虚内热”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-125",
    "name": "茯苓小米健脾羹",
    "nature": "温",
    "syndromes": [
      "肾阳虚"
    ],
    "foodIds": [
      "poria",
      "millet"
    ],
    "subtitle": "温补助阳",
    "ingredients": [
      "茯苓 适量",
      "小米 适量",
      "清水适量"
    ],
    "steps": [
      "将茯苓与小米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-126",
    "name": "黄芪鸡肉调气饮",
    "nature": "平",
    "syndromes": [
      "血虚"
    ],
    "foodIds": [
      "astragalus",
      "chicken"
    ],
    "subtitle": "养血和中",
    "ingredients": [
      "黄芪 适量",
      "鸡肉 适量",
      "清水适量"
    ],
    "steps": [
      "将黄芪与鸡肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“血虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-127",
    "name": "莲藕猪肉粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "lotus-root",
      "pork"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "莲藕 适量",
      "猪肉 适量",
      "清水适量"
    ],
    "steps": [
      "将莲藕与猪肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-128",
    "name": "山楂麦芽汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "hawthorn",
      "malt"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "山楂 适量",
      "麦芽 适量",
      "清水适量"
    ],
    "steps": [
      "将山楂与麦芽分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-129",
    "name": "雪梨银耳羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "pear",
      "white-fungus"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "雪梨 适量",
      "银耳 适量",
      "清水适量"
    ],
    "steps": [
      "将雪梨与银耳分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-130",
    "name": "牛肉山药饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "beef",
      "yam"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "牛肉 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将牛肉与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-131",
    "name": "南瓜大米盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "pumpkin",
      "rice"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "南瓜 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将南瓜与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-132",
    "name": "党参红枣炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "codonopsis",
      "jujube"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "党参 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将党参与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-133",
    "name": "薄荷雪梨蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "mint",
      "pear"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "薄荷 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将薄荷与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-134",
    "name": "佛手雪梨米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "bergamot",
      "pear"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "佛手 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将佛手与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-135",
    "name": "薏米茯苓茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "coix-seed",
      "poria"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "薏米 适量",
      "茯苓 适量",
      "清水适量"
    ],
    "steps": [
      "将薏米与茯苓分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-136",
    "name": "莲子红枣小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "lotus-seed",
      "jujube"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "莲子 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将莲子与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-137",
    "name": "豆腐莲藕养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "tofu",
      "lotus-root"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "豆腐 适量",
      "莲藕 适量",
      "清水适量"
    ],
    "steps": [
      "将豆腐与莲藕分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-138",
    "name": "苹果山药润养汤",
    "nature": "凉",
    "syndromes": [
      "阴虚内热"
    ],
    "foodIds": [
      "apple",
      "yam"
    ],
    "subtitle": "养阴清润",
    "ingredients": [
      "苹果 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将苹果与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“阴虚内热”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-139",
    "name": "羊肉生姜健脾羹",
    "nature": "温",
    "syndromes": [
      "肾阳虚"
    ],
    "foodIds": [
      "lamb",
      "ginger"
    ],
    "subtitle": "温补助阳",
    "ingredients": [
      "羊肉 适量",
      "生姜 适量",
      "清水适量"
    ],
    "steps": [
      "将羊肉与生姜分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-140",
    "name": "菊花罗汉果调气饮",
    "nature": "平",
    "syndromes": [
      "血虚"
    ],
    "foodIds": [
      "chrysanthemum",
      "luo-han-guo"
    ],
    "subtitle": "养血和中",
    "ingredients": [
      "菊花 适量",
      "罗汉果 适量",
      "清水适量"
    ],
    "steps": [
      "将菊花与罗汉果分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“血虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-141",
    "name": "山药莲子粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "yam",
      "lotus-seed"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "山药 适量",
      "莲子 适量",
      "清水适量"
    ],
    "steps": [
      "将山药与莲子分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-142",
    "name": "银耳百合汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "white-fungus",
      "lily-bulb"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "银耳 适量",
      "百合 适量",
      "清水适量"
    ],
    "steps": [
      "将银耳与百合分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-143",
    "name": "生姜红枣羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "ginger",
      "jujube"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "生姜 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将生姜与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-144",
    "name": "陈皮大米饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "chenpi",
      "rice"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "陈皮 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将陈皮与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-145",
    "name": "茯苓小米盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "poria",
      "millet"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "茯苓 适量",
      "小米 适量",
      "清水适量"
    ],
    "steps": [
      "将茯苓与小米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-146",
    "name": "黄芪鸡肉炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "astragalus",
      "chicken"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "黄芪 适量",
      "鸡肉 适量",
      "清水适量"
    ],
    "steps": [
      "将黄芪与鸡肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-147",
    "name": "莲藕猪肉蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "lotus-root",
      "pork"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "莲藕 适量",
      "猪肉 适量",
      "清水适量"
    ],
    "steps": [
      "将莲藕与猪肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-148",
    "name": "山楂麦芽米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "hawthorn",
      "malt"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "山楂 适量",
      "麦芽 适量",
      "清水适量"
    ],
    "steps": [
      "将山楂与麦芽分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-149",
    "name": "雪梨银耳茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "pear",
      "white-fungus"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "雪梨 适量",
      "银耳 适量",
      "清水适量"
    ],
    "steps": [
      "将雪梨与银耳分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-150",
    "name": "牛肉山药小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "beef",
      "yam"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "牛肉 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将牛肉与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-151",
    "name": "南瓜大米养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "pumpkin",
      "rice"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "南瓜 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将南瓜与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-152",
    "name": "党参红枣润养汤",
    "nature": "凉",
    "syndromes": [
      "阴虚内热"
    ],
    "foodIds": [
      "codonopsis",
      "jujube"
    ],
    "subtitle": "养阴清润",
    "ingredients": [
      "党参 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将党参与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“阴虚内热”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-153",
    "name": "薄荷雪梨健脾羹",
    "nature": "温",
    "syndromes": [
      "肾阳虚"
    ],
    "foodIds": [
      "mint",
      "pear"
    ],
    "subtitle": "温补助阳",
    "ingredients": [
      "薄荷 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将薄荷与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-154",
    "name": "佛手雪梨调气饮",
    "nature": "平",
    "syndromes": [
      "血虚"
    ],
    "foodIds": [
      "bergamot",
      "pear"
    ],
    "subtitle": "养血和中",
    "ingredients": [
      "佛手 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将佛手与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“血虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-155",
    "name": "薏米茯苓粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "coix-seed",
      "poria"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "薏米 适量",
      "茯苓 适量",
      "清水适量"
    ],
    "steps": [
      "将薏米与茯苓分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-156",
    "name": "莲子红枣汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "lotus-seed",
      "jujube"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "莲子 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将莲子与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-157",
    "name": "豆腐莲藕羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "tofu",
      "lotus-root"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "豆腐 适量",
      "莲藕 适量",
      "清水适量"
    ],
    "steps": [
      "将豆腐与莲藕分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-158",
    "name": "苹果山药饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "apple",
      "yam"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "苹果 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将苹果与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-159",
    "name": "羊肉生姜盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "lamb",
      "ginger"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "羊肉 适量",
      "生姜 适量",
      "清水适量"
    ],
    "steps": [
      "将羊肉与生姜分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-160",
    "name": "菊花罗汉果炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "chrysanthemum",
      "luo-han-guo"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "菊花 适量",
      "罗汉果 适量",
      "清水适量"
    ],
    "steps": [
      "将菊花与罗汉果分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-161",
    "name": "山药莲子蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "yam",
      "lotus-seed"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "山药 适量",
      "莲子 适量",
      "清水适量"
    ],
    "steps": [
      "将山药与莲子分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-162",
    "name": "银耳百合米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "white-fungus",
      "lily-bulb"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "银耳 适量",
      "百合 适量",
      "清水适量"
    ],
    "steps": [
      "将银耳与百合分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-163",
    "name": "生姜红枣茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "ginger",
      "jujube"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "生姜 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将生姜与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-164",
    "name": "陈皮大米小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "chenpi",
      "rice"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "陈皮 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将陈皮与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-165",
    "name": "茯苓小米养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "poria",
      "millet"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "茯苓 适量",
      "小米 适量",
      "清水适量"
    ],
    "steps": [
      "将茯苓与小米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-166",
    "name": "黄芪鸡肉润养汤",
    "nature": "凉",
    "syndromes": [
      "阴虚内热"
    ],
    "foodIds": [
      "astragalus",
      "chicken"
    ],
    "subtitle": "养阴清润",
    "ingredients": [
      "黄芪 适量",
      "鸡肉 适量",
      "清水适量"
    ],
    "steps": [
      "将黄芪与鸡肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“阴虚内热”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-167",
    "name": "莲藕猪肉健脾羹",
    "nature": "温",
    "syndromes": [
      "肾阳虚"
    ],
    "foodIds": [
      "lotus-root",
      "pork"
    ],
    "subtitle": "温补助阳",
    "ingredients": [
      "莲藕 适量",
      "猪肉 适量",
      "清水适量"
    ],
    "steps": [
      "将莲藕与猪肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-168",
    "name": "山楂麦芽调气饮",
    "nature": "平",
    "syndromes": [
      "血虚"
    ],
    "foodIds": [
      "hawthorn",
      "malt"
    ],
    "subtitle": "养血和中",
    "ingredients": [
      "山楂 适量",
      "麦芽 适量",
      "清水适量"
    ],
    "steps": [
      "将山楂与麦芽分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“血虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-169",
    "name": "雪梨银耳粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "pear",
      "white-fungus"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "雪梨 适量",
      "银耳 适量",
      "清水适量"
    ],
    "steps": [
      "将雪梨与银耳分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-170",
    "name": "牛肉山药汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "beef",
      "yam"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "牛肉 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将牛肉与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-171",
    "name": "南瓜大米羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "pumpkin",
      "rice"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "南瓜 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将南瓜与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-172",
    "name": "党参红枣饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "codonopsis",
      "jujube"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "党参 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将党参与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-173",
    "name": "薄荷雪梨盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "mint",
      "pear"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "薄荷 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将薄荷与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-174",
    "name": "佛手雪梨炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "bergamot",
      "pear"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "佛手 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将佛手与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-175",
    "name": "薏米茯苓蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "coix-seed",
      "poria"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "薏米 适量",
      "茯苓 适量",
      "清水适量"
    ],
    "steps": [
      "将薏米与茯苓分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-176",
    "name": "莲子红枣米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "lotus-seed",
      "jujube"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "莲子 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将莲子与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-177",
    "name": "豆腐莲藕茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "tofu",
      "lotus-root"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "豆腐 适量",
      "莲藕 适量",
      "清水适量"
    ],
    "steps": [
      "将豆腐与莲藕分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-178",
    "name": "苹果山药小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "apple",
      "yam"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "苹果 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将苹果与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-179",
    "name": "羊肉生姜养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "lamb",
      "ginger"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "羊肉 适量",
      "生姜 适量",
      "清水适量"
    ],
    "steps": [
      "将羊肉与生姜分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-180",
    "name": "菊花罗汉果润养汤",
    "nature": "凉",
    "syndromes": [
      "阴虚内热"
    ],
    "foodIds": [
      "chrysanthemum",
      "luo-han-guo"
    ],
    "subtitle": "养阴清润",
    "ingredients": [
      "菊花 适量",
      "罗汉果 适量",
      "清水适量"
    ],
    "steps": [
      "将菊花与罗汉果分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“阴虚内热”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-181",
    "name": "山药莲子健脾羹",
    "nature": "温",
    "syndromes": [
      "肾阳虚"
    ],
    "foodIds": [
      "yam",
      "lotus-seed"
    ],
    "subtitle": "温补助阳",
    "ingredients": [
      "山药 适量",
      "莲子 适量",
      "清水适量"
    ],
    "steps": [
      "将山药与莲子分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-182",
    "name": "银耳百合调气饮",
    "nature": "平",
    "syndromes": [
      "血虚"
    ],
    "foodIds": [
      "white-fungus",
      "lily-bulb"
    ],
    "subtitle": "养血和中",
    "ingredients": [
      "银耳 适量",
      "百合 适量",
      "清水适量"
    ],
    "steps": [
      "将银耳与百合分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“血虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-183",
    "name": "生姜红枣粥",
    "nature": "平",
    "syndromes": [
      "脾气虚"
    ],
    "foodIds": [
      "ginger",
      "jujube"
    ],
    "subtitle": "健脾益气",
    "ingredients": [
      "生姜 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将生姜与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-184",
    "name": "陈皮大米汤",
    "nature": "温",
    "syndromes": [
      "胃气虚"
    ],
    "foodIds": [
      "chenpi",
      "rice"
    ],
    "subtitle": "益气养胃",
    "ingredients": [
      "陈皮 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将陈皮与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃气虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-185",
    "name": "茯苓小米羹",
    "nature": "温",
    "syndromes": [
      "脾阳虚"
    ],
    "foodIds": [
      "poria",
      "millet"
    ],
    "subtitle": "温脾助运",
    "ingredients": [
      "茯苓 适量",
      "小米 适量",
      "清水适量"
    ],
    "steps": [
      "将茯苓与小米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾阳虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-186",
    "name": "黄芪鸡肉饮",
    "nature": "凉",
    "syndromes": [
      "胃阴虚"
    ],
    "foodIds": [
      "astragalus",
      "chicken"
    ],
    "subtitle": "养阴和胃",
    "ingredients": [
      "黄芪 适量",
      "鸡肉 适量",
      "清水适量"
    ],
    "steps": [
      "将黄芪与鸡肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“胃阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-187",
    "name": "莲藕猪肉盅",
    "nature": "平",
    "syndromes": [
      "脾不统血"
    ],
    "foodIds": [
      "lotus-root",
      "pork"
    ],
    "subtitle": "健脾摄血",
    "ingredients": [
      "莲藕 适量",
      "猪肉 适量",
      "清水适量"
    ],
    "steps": [
      "将莲藕与猪肉分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“脾不统血”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-188",
    "name": "山楂麦芽炖品",
    "nature": "温",
    "syndromes": [
      "中气下陷"
    ],
    "foodIds": [
      "hawthorn",
      "malt"
    ],
    "subtitle": "补中升提",
    "ingredients": [
      "山楂 适量",
      "麦芽 适量",
      "清水适量"
    ],
    "steps": [
      "将山楂与麦芽分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“中气下陷”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-189",
    "name": "雪梨银耳蒸碗",
    "nature": "平",
    "syndromes": [
      "气血两虚"
    ],
    "foodIds": [
      "pear",
      "white-fungus"
    ],
    "subtitle": "益气养血",
    "ingredients": [
      "雪梨 适量",
      "银耳 适量",
      "清水适量"
    ],
    "steps": [
      "将雪梨与银耳分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“气血两虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-190",
    "name": "牛肉山药米露",
    "nature": "凉",
    "syndromes": [
      "肺阴虚"
    ],
    "foodIds": [
      "beef",
      "yam"
    ],
    "subtitle": "润肺养阴",
    "ingredients": [
      "牛肉 适量",
      "山药 适量",
      "清水适量"
    ],
    "steps": [
      "将牛肉与山药分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肺阴虚”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-191",
    "name": "南瓜大米茶饮",
    "nature": "平",
    "syndromes": [
      "肝胃不和"
    ],
    "foodIds": [
      "pumpkin",
      "rice"
    ],
    "subtitle": "和胃理气",
    "ingredients": [
      "南瓜 适量",
      "大米 适量",
      "清水适量"
    ],
    "steps": [
      "将南瓜与大米分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“肝胃不和”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-192",
    "name": "党参红枣小羹",
    "nature": "平",
    "syndromes": [
      "痰湿困脾"
    ],
    "foodIds": [
      "codonopsis",
      "jujube"
    ],
    "subtitle": "健脾化湿",
    "ingredients": [
      "党参 适量",
      "红枣 适量",
      "清水适量"
    ],
    "steps": [
      "将党参与红枣分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“痰湿困脾”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  },
  {
    "id": "restored-recipe-193",
    "name": "薄荷雪梨养胃粥",
    "nature": "凉",
    "syndromes": [
      "湿热内蕴"
    ],
    "foodIds": [
      "mint",
      "pear"
    ],
    "subtitle": "清化湿热",
    "ingredients": [
      "薄荷 适量",
      "雪梨 适量",
      "清水适量"
    ],
    "steps": [
      "将薄荷与雪梨分别处理干净。",
      "加水同煮，按家常做法煮至熟软。",
      "温热食用，按个人耐受调整频率。"
    ],
    "note": "按“湿热内蕴”的日常食养思路整理，强调温和、规律、少量持续，不把食疗方当成处方替代。"
  }
];
RECIPES.push(...RESTORED_BULK_RECIPES);

const SYNDROME_RECIPE_EXPANSION_PACK = [
  recipe("biandou-yam-congee", "白扁豆山药粥", "平", ["脾气虚", "痰湿困脾"], ["yam", "soybean", "rice"], "健脾和中", ["山药 100 克", "白扁豆 30 克", "粳米 80 克"], ["白扁豆提前浸泡", "与山药、粳米同煮成粥"], "更适合食欲差、饭后困重、脾虚夹湿的清淡调养。"),
  recipe("lianzi-qianshi-millet", "莲子芡实小米粥", "平", ["脾气虚", "脾不统血"], ["lotus-seed", "millet", "rice"], "补脾固摄", ["莲子 20 克", "芡实 20 克", "小米 80 克"], ["莲子与芡实先煮 10 分钟", "再下小米慢煮成粥"], "适合久泻后、疲乏和需要做得更稳一点的脾虚场景。"),
  recipe("dangshen-baizhu-lean-soup", "党参白术瘦肉汤", "温", ["胃气虚", "脾气虚"], ["codonopsis", "pork"], "益气健脾", ["党参 10 克", "白术 8 克", "瘦肉 150 克"], ["瘦肉焯水", "与党参、白术同炖 45 分钟"], "更适合胃口弱、乏力、吃完容易腹胀的人。"),
  recipe("chaomi-shanzha-drink", "炒米山楂饮", "平", ["食积", "胃气虚"], ["hawthorn", "rice"], "消食和胃", ["炒米 20 克", "山楂 10 克", "清水 500 ml"], ["炒米略洗", "与山楂同煮 12 分钟后温饮"], "更适合油腻积滞、胃里发堵，但本身虚寒明显者不宜过量。"),
  recipe("pumpkin-biancong-soup", "南瓜白扁豆羹", "温", ["中气下陷", "脾气虚"], ["pumpkin", "soybean"], "补中助运", ["南瓜 200 克", "白扁豆 30 克"], ["白扁豆煮熟", "与蒸熟南瓜一同打成羹"], "适合恢复期、食欲差和中气不足的轻食场景。"),
  recipe("sharen-chenpi-fish", "砂仁陈皮鲫鱼汤", "温", ["肝胃不和", "胃气虚"], ["chenpi", "crucian-carp"], "和胃理气", ["鲫鱼 1 条", "砂仁 3 克", "陈皮 3 克"], ["鲫鱼煎至微黄", "与砂仁、陈皮同炖 30 分钟"], "更适合胃口差、嗳气、饭后胀满的人。"),
  recipe("danggui-huangqi-chicken", "当归黄芪鸡汤", "温", ["气血两虚", "血虚"], ["astragalus", "chicken", "jujube"], "补气养血", ["黄芪 12 克", "当归 6 克", "鸡肉 200 克", "红枣 6 枚"], ["鸡肉焯水", "与黄芪、当归、红枣同炖 50 分钟"], "适合久病体虚、面色少华、乏力明显的日常调养。"),
  recipe("longan-goji-steamed-egg", "桂圆枸杞蒸蛋", "温", ["血虚", "气血两虚"], ["longan-dried", "egg"], "养血安神", ["桂圆干 10 克", "枸杞 8 克", "鸡蛋 2 个"], ["鸡蛋打散调匀", "加桂圆、枸杞蒸熟"], "更适合劳倦后心烦、睡得浅、气血偏弱的人。"),
  recipe("redbean-jujube-congee", "红豆红枣糯米粥", "平", ["气血两虚", "血虚"], ["red-bean", "jujube", "glutinous-rice"], "养血和中", ["红豆 30 克", "红枣 8 枚", "糯米 60 克"], ["红豆先煮软", "再下糯米、红枣煮成粥"], "适合气血不足、食量偏小的人，痰湿偏重时不宜太黏太甜。"),
  recipe("black-chicken-danggui", "乌鸡当归汤", "温", ["血虚", "气血两虚"], ["chicken"], "养血调中", ["乌鸡 250 克", "当归 6 克", "生姜 2 片"], ["乌鸡焯水", "与当归、生姜小火慢炖"], "更适合血虚、产后恢复或体虚怕冷的人群。"),
  recipe("rose-chenpi-drink", "玫瑰陈皮饮", "温", ["理气", "肝郁气滞"], ["chenpi"], "疏肝理气", ["玫瑰花 6 克", "陈皮 3 克"], ["热水冲泡或小火煮 8 分钟"], "更适合情绪郁闷、胸胁不舒、饭量下降的轻度场景。"),
  recipe("foshou-maiya-drink", "佛手麦芽饮", "平", ["行气", "理气", "胃气虚"], ["bergamot", "malt"], "理气和胃", ["佛手 5 克", "炒麦芽 10 克"], ["加水煮 10 分钟后温饮"], "更适合肝胃不舒、食积轻、嗳气偏多的人。"),
  recipe("radish-beef-soup", "陈皮白萝卜牛肉汤", "温", ["降气", "理气"], ["white-radish", "chenpi", "beef"], "顺气和中", ["白萝卜 200 克", "牛肉 150 克", "陈皮 3 克"], ["牛肉焯水后先炖软", "再下白萝卜与陈皮"], "更适合气机不畅、吃后发胀的人。"),
  recipe("zisu-sharen-congee", "紫苏砂仁粥", "温", ["理气", "气虚"], ["rice"], "和胃醒脾", ["紫苏叶 6 克", "砂仁 3 克", "粳米 80 克"], ["紫苏与砂仁煎汁", "用药汁煮粳米成粥"], "适合胃口不开、恶心反胃、轻度气虚夹滞的人。"),
  recipe("huangqi-longan-millet", "黄芪桂圆小米粥", "温", ["气血两虚", "中气下陷"], ["astragalus", "longan-dried", "millet"], "补气养血", ["黄芪 10 克", "桂圆干 10 克", "小米 80 克"], ["黄芪先煮汁", "再与桂圆、小米同煮"], "更适合作为疲乏、面色差、久坐无力时的温和粥方。"),
  recipe("chuanbei-pear", "川贝炖梨", "凉", ["肺阴虚"], ["pear"], "润肺止咳", ["雪梨 1 个", "川贝粉 2 克"], ["梨去核留盅", "填入川贝粉后蒸熟"], "适合咽干、干咳、痰少而黏的场景。"),
  recipe("yuzhu-maidong-congee", "玉竹麦冬粥", "凉", ["肺阴虚", "胃阴虚"], ["rice"], "养阴润燥", ["玉竹 12 克", "麦冬 10 克", "粳米 80 克"], ["玉竹、麦冬先煎汁", "以药汁煮粥"], "更适合口干、咽燥、胃中燥热感较明显的人。"),
  recipe("almond-lily-soup", "南北杏百合汤", "平", ["肺气虚", "肺阴虚"], ["lily-bulb"], "润肺和中", ["南杏仁 10 克", "北杏仁 6 克", "百合 20 克"], ["加水同煮 25 分钟"], "更适合久咳后津液不足、咽部不适的人。"),
  recipe("whitefungus-loquat-drink", "银耳枇杷饮", "平", ["肺阴虚", "阴虚内热"], ["white-fungus"], "清润生津", ["银耳 10 克", "枇杷 2 个"], ["银耳先煮软", "下枇杷稍煮即可"], "适合燥热、咽干和天气干燥时作轻润饮。"),
  recipe("shashen-yuzhu-duck", "沙参玉竹老鸭汤", "平", ["肺阴虚", "胃阴虚"], ["duck"], "养阴润燥", ["沙参 12 克", "玉竹 12 克", "老鸭 250 克"], ["老鸭焯水", "与沙参、玉竹同炖 1 小时"], "更适合久咳、口干、虚热感和胃阴不足并见者。"),
  recipe("luohanguo-wuhuaguo", "罗汉果无花果汤", "凉", ["肺气虚", "肺阴虚"], ["luo-han-guo"], "润肺利咽", ["罗汉果 1/4 个", "无花果 3 个"], ["加水煮 15 分钟"], "适合说话多、咽干、燥咳或烟酒后咽部不适。"),
  recipe("yinchen-redbean-soup", "茵陈赤小豆汤", "凉", ["湿热内蕴"], ["red-bean"], "清利湿热", ["茵陈 10 克", "赤小豆 30 克"], ["赤小豆先煮 20 分钟", "再加茵陈同煮"], "更适合湿热偏重、口苦口黏、尿黄的饮食整理场景。"),
  recipe("coix-wintermelon-soup", "薏米冬瓜赤豆汤", "凉", ["湿热内蕴", "痰湿困脾"], ["coix-seed", "wax-gourd", "red-bean"], "清利湿滞", ["薏米 30 克", "冬瓜 200 克", "赤小豆 20 克"], ["赤小豆与薏米先煮", "后下冬瓜煮软"], "更适合暑湿困重、身体发沉、饮食偏腻后的调理。"),
  recipe("cornsilk-heye-drink", "玉米须荷叶饮", "凉", ["湿热内蕴"], ["corn"], "清利轻饮", ["玉米须 15 克", "荷叶 6 克"], ["加水煮 10 分钟后温饮"], "更适合湿热偏盛、口渴油腻、暑天困重时少量饮用。"),
  recipe("meigui-foshou-tea", "玫瑰佛手茶", "温", ["肝郁气滞"], ["bergamot"], "疏肝解郁", ["玫瑰花 6 克", "佛手 5 克"], ["热水冲泡 10 分钟"], "更适合情绪抑郁、胸闷、两胁不舒和食欲波动时。"),
  recipe("qingpi-chenpi-lean", "青皮陈皮炖瘦肉", "温", ["肝郁气滞", "理气"], ["chenpi", "pork"], "理气和中", ["青皮 4 克", "陈皮 3 克", "瘦肉 150 克"], ["瘦肉焯水", "与青皮、陈皮同炖 40 分钟"], "适合肝郁夹胃口差、胀满、嗳气的人。"),
  recipe("celery-mungbean-drink", "芹菜绿豆饮", "凉", ["湿热内蕴"], ["mung-bean"], "清利轻养", ["芹菜 100 克", "绿豆 20 克"], ["绿豆先煮开花", "再下芹菜稍煮"], "适合油腻辛辣后口苦、烦热、胃口不佳的时段。"),
  recipe("mumian-fuling-lean", "木棉花茯苓瘦肉汤", "平", ["湿热内蕴", "痰湿困脾"], ["poria", "pork"], "健脾祛湿", ["木棉花 10 克", "茯苓 15 克", "瘦肉 150 克"], ["瘦肉焯水", "与木棉花、茯苓同炖"], "更适合岭南潮湿天气里困重、纳差、便黏的人。"),
  recipe("jigucao-lean-soup", "鸡骨草瘦肉汤", "凉", ["湿热内蕴"], ["pork"], "清利湿热", ["鸡骨草 15 克", "瘦肉 150 克"], ["瘦肉焯水", "与鸡骨草同炖 45 分钟"], "适合湿热偏盛、口苦、食后腻滞感明显的人。"),
  recipe("xiakucao-chrysanthemum", "夏枯草菊花饮", "凉", ["肝郁气滞", "阴虚内热"], ["chrysanthemum"], "清舒头目", ["夏枯草 10 克", "菊花 6 克"], ["加水煮 10 分钟后温饮"], "更适合情绪郁滞夹头面烦热、目赤口干的人。")
];

RECIPES.push(...SYNDROME_RECIPE_EXPANSION_PACK);
/* END RESTORED BULK APP DATA */

const app = document.getElementById("app");
const toastEl = document.getElementById("toast");
const sheet = document.getElementById("detailSheet");
const sheetContent = document.getElementById("sheetContent");
const sheetBackdrop = document.getElementById("sheetBackdrop");
const closeSheet = document.getElementById("closeSheet");

const state = {
  view: "home",
  homeQuery: "",
  homeExploreType: "",
  homeExploreValue: "",
  homeLibraryFiltersOpen: false,
  libraryQuery: "",
  libraryNature: "全部",
  libraryCategory: "全部",
  libraryRegion: "ALL",
  libraryTopic: "",
  checkerQuery: "",
  checkerSelected: [],
  recipesQuery: "",
  recipesNature: "全部",
  recipesSyndrome: "全部",
  recipesUseFor: "全部",
  recipesAvoidFor: "全部",
  recipesTiming: "全部",
  recipesCooking: "全部",
  recipesCoreFood: "全部",
  recipesSeason: "全部",
  recipesBodyFeel: "全部",
  recipesTonify: "全部",
  recipesClear: "全部",
  profile: loadJson("foodwise-profile", {}),
  favorites: loadJson("foodwise-favorites", []),
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
  { name: "??", aliases: ["???"], pinyin: "hualuo", initials: "hl", regional: ["????"], english: ["babylon snail"] },
  { name: "???", aliases: ["??", "??"], pinyin: "qingkoubei", initials: "qkb", regional: ["????"], english: ["mussel"] },
  { name: "???", aliases: ["??"], pinyin: "hailuyu", initials: "hly", regional: ["????"], english: ["sea bass"] },
  { name: "???", aliases: [], pinyin: "wutouyu", initials: "wty", regional: ["????"], english: ["mullet"] },
  { name: "???", aliases: [], pinyin: "shibanyu", initials: "sby", regional: ["????"], english: ["grouper"] },
  { name: "???", aliases: [], pinyin: "haipengzi", initials: "hpz", regional: ["????"], english: ["samphire"] },
  { name: "???", aliases: [], pinyin: "yanjiaocao", initials: "yjc", regional: ["????"], english: ["seablite"] },
  { name: "???", aliases: [], pinyin: "huajiaoya", initials: "hjy", regional: ["?????"], english: ["pepper sprout"] },
  { name: "??", aliases: [], pinyin: "yesuan", initials: "ys", regional: ["????"], english: ["wild garlic"] },
  { name: "???", aliases: ["???"], pinyin: "suansunsi", initials: "sss", regional: ["????"], english: ["pickled bamboo shoot"] },
  { name: "???", aliases: [], pinyin: "suancaixin", initials: "scx", regional: ["????"], english: ["pickled greens heart"] },
  { name: "????", aliases: ["?????"], pinyin: "doubanlajiang", initials: "dblj", regional: ["????"], english: ["chili bean paste"] },
  { name: "???", aliases: [], pinyin: "paojiaojiang", initials: "pjj", regional: ["?????"], english: ["pickled chili sauce"] },
  { name: "???", aliases: [], pinyin: "jiemoyou", initials: "jmy", regional: ["?????"], english: ["mustard oil"] },
  { name: "???", aliases: [], pinyin: "zisuyan", initials: "zsy", regional: ["??????"], english: ["perilla salt"] }
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
  { id: "sea-bass-local", name: "???", en: "sea bass", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["hailuyu", "hly", "sea bass"], summary: "????????????????????", caution: "???????????????" },
  { id: "mullet", name: "???", en: "mullet", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["wutouyu", "wty", "mullet"], summary: "??????????????????", caution: "?????????????????" },
  { id: "red-grouper", name: "???", en: "grouper", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["shibanyu", "sby", "grouper"], summary: "???????????????", caution: "?????????????????" },
  { id: "moon-shell", name: "??", en: "babylon snail", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["hualuo", "hl", "babylon snail"], summary: "????????????????", caution: "?????????????????" },
  { id: "sea-clam", name: "???", en: "mussel", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["qingkoubei", "qkb", "mussel"], summary: "???????????????????", caution: "???????????????" },
  { id: "marsh-samphire", name: "???", en: "samphire", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["haipengzi", "hpz", "samphire"], summary: "?????????????????????", caution: "?????????????????????" },
  { id: "seablite", name: "???", en: "seablite", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["yanjiaocao", "yjc", "seablite"], summary: "???????????????", caution: "????????????????" },
  { id: "wild-pepper-leaf", name: "???", en: "pepper sprout", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["huajiaoya", "hjy", "pepper sprout"], summary: "???????????????????", caution: "??????????????????" },
  { id: "wild-garlic-leaf", name: "??", en: "wild garlic", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["yesuan", "ys", "wild garlic"], summary: "?????????????????", caution: "????????????????????" },
  { id: "pickled-bamboo-shoot", name: "???", en: "pickled bamboo shoot", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["suansunsi", "sss"], summary: "??????????????", caution: "?????????????????" },
  { id: "pickled-greens", name: "???", en: "pickled greens heart", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["suancaixin", "scx"], summary: "??????????????", caution: "???????????????" },
  { id: "fermented-chili-bean", name: "????", en: "chili bean paste", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["doubanlajiang", "dblj"], summary: "???????????????", caution: "????????????????????" },
  { id: "pickled-pepper-sauce", name: "???", en: "pickled chili sauce", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["paojiaojiang", "pjj"], summary: "???????????????", caution: "??????????????????" },
  { id: "mustard-oil", name: "???", en: "mustard oil", category: "??", nature: "?", effects: ["??"], regions: ["CN", "IN"], searchTerms: ["jiemoyou", "jmy", "mustard oil"], summary: "??????????????????", caution: "??????????????????" },
  { id: "perilla-salt", name: "???", en: "perilla salt", category: "??", nature: "?", effects: ["??"], regions: ["CN", "JP"], searchTerms: ["zisuyan", "zsy", "perilla salt"], summary: "?????????????", caution: "???????????" },
  { id: "devils-tongue-berry", name: "???", en: "raspberry berry", category: "??", nature: "?", effects: ["??"], regions: ["CN"], searchTerms: ["cipaoguo", "cpg"], summary: "????????????????????", caution: "???????????????????" }
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

const foods = dedupeFoods(normalizeFoods([...(Array.isArray(EXPANDED_FOODS) ? EXPANDED_FOODS : []), ...RUNTIME_FOOD_EXPANSION]));
const foodMap = new Map(foods.map((food) => [food.id, food]));
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

const recipes = RECIPES.map((item) => ({
  ...item,
  primarySyndrome: item.primarySyndrome || item.syndromes[0] || "",
  secondarySyndromes: (item.syndromes || []).slice(1),
  useFor: uniq((item.useFor || []).concat(RECIPE_SYNDROME_META[item.primarySyndrome || item.syndromes[0] || ""]?.useFor || [])),
  avoidFor: uniq((item.avoidFor || []).concat(RECIPE_SYNDROME_META[item.primarySyndrome || item.syndromes[0] || ""]?.avoidFor || [])),
  foods: item.foodIds.map((id) => foodMap.get(id)).filter(Boolean)
})).map((item) => ({
  ...item,
  ...inferRecipeStructure(item)
}));
const RECIPE_USE_FOR_OPTIONS = uniq(recipes.flatMap((item) => item.useFor || [])).slice(0, 18);
const RECIPE_AVOID_FOR_OPTIONS = uniq(recipes.flatMap((item) => item.avoidFor || [])).slice(0, 18);
const RECIPE_TIMING_OPTIONS = uniq(recipes.flatMap((item) => item.timing || [])).slice(0, 12);
const RECIPE_COOKING_OPTIONS = uniq(recipes.flatMap((item) => item.cooking || [])).slice(0, 12);
const RECIPE_CORE_FOOD_OPTIONS = uniq(recipes.flatMap((item) => item.coreFoods || [])).slice(0, 18);
const RECIPE_SEASON_OPTIONS = uniq(recipes.flatMap((item) => item.season || [])).slice(0, 8);
const RECIPE_BODY_FEEL_OPTIONS = uniq(recipes.flatMap((item) => item.bodyFeel || [])).slice(0, 12);
const RECIPE_TONIFY_OPTIONS = uniq(recipes.map((item) => item.tonify).filter(Boolean)).slice(0, 4);
const RECIPE_CLEAR_OPTIONS = uniq(recipes.map((item) => item.clear).filter(Boolean)).slice(0, 4);
const OFFICIAL_COUNT = foods.filter((food) => food.officialFoodMedicine).length;
const TEA_COUNT = foods.filter((food) => food.category === "茶饮").length;

const CATEGORY_COUNTS = countBy(foods, (food) => food.category);
const NATURE_COUNTS = countBy(foods, (food) => food.nature);
const REGION_COUNTS = countBy(
  foods.flatMap((food) => food.regions.map((region) => ({ region }))),
  (item) => item.region
);

boot();

function boot() {
  bindShellEvents();
  applyUrlState();
  state.isNavigating = !document.startViewTransition;
  render();
  setTimeout(() => {
    state.isNavigating = false;
    const appContainer = document.getElementById("app");
    if (appContainer) {
      appContainer.classList.remove("ios-navigation-active");
    }
  }, 420);
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
  document.addEventListener("click", handleDelegatedActionClick);
  document.addEventListener("keydown", handleDelegatedActionKeydown);
}

function openLibraryFromHome() {
  triggerHapticFeedback();
  navigate("library");
}

function handleDelegatedActionClick(event) {
  const filterTrigger = event.target.closest("[data-open-filters]");
  if (filterTrigger) {
    event.preventDefault();
    event.stopPropagation();
    openFilterSheet(filterTrigger.dataset.openFilters);
    return;
  }

  const homeFilterTrigger = event.target.closest("[data-home-library-toggle]");
  if (homeFilterTrigger) {
    event.preventDefault();
    event.stopPropagation();
    openLibraryFromHome();
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
    showSheet(renderFeedbackForm());
    return;
  }

  const favoriteTrigger = event.target.closest("[data-toggle-favorite]");
  if (favoriteTrigger) {
    event.preventDefault();
    event.stopPropagation();
    triggerHapticFeedback();
    toggleFavorite(favoriteTrigger.dataset.toggleFavorite);
  }
}

function handleDelegatedActionKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  const homeFilterTrigger = event.target.closest("[data-home-library-toggle]");
  if (homeFilterTrigger) {
    event.preventDefault();
    openLibraryFromHome();
    return;
  }

  const recipeTrigger = event.target.closest("[data-open-recipe]");
  if (!recipeTrigger) return;
  event.preventDefault();
  openRecipeDetail(recipeTrigger.dataset.openRecipe);
}

function applyUrlState() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view");
  if (view && ["home", "library", "checker", "recipes", "profile"].includes(view)) {
    state.view = view;
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

  const foodId = params.get("food");
  const recipeId = params.get("recipe");
  const pair = params.get("pair");

  if (pair) {
    state.view = "checker";
    state.checkerSelected = pair.split(",").filter((id) => foodMap.has(id)).slice(0, 4);
  }

  if (foodId && foodMap.has(foodId)) {
    state.sheet = { type: "food", id: foodId };
  }

  if (recipeId && recipes.find((item) => item.id === recipeId)) {
    state.view = "recipes";
    state.sheet = { type: "recipe", id: recipeId };
  }
}

function normalizeFoods(items) {
  return items.map((food) => {
    const enrichment = FOOD_DETAIL_ENRICHMENTS[food.id] || FOOD_DETAIL_ENRICHMENTS[food.name] || {};
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
      category: cleanString(food.category),
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
      aliases,
      regions: (food.regions || []).filter((region) => REGION_LABELS[region]),
      effects: uniq((food.effects || []).map(cleanString).filter(Boolean)),
      benefits: uniq([...(food.benefits || []), ...(enrichment.benefits || [])].map(cleanString).filter(Boolean)),
      suitableFor: uniq([...(food.suitableFor || []), ...(enrichment.suitableFor || [])].map(cleanString).filter(Boolean)),
      avoidFor: uniq([...(food.avoidFor || []), ...(enrichment.avoidFor || [])].map(cleanString).filter(Boolean)),
      contraindications: uniq([...(food.contraindications || []), ...(enrichment.contraindications || [])].map(cleanString).filter(Boolean)),
      cautionTags: uniq([...(food.cautionTags || []), ...(enrichment.cautionTags || [])].map(cleanString).filter(Boolean)),
      searchTerms,
      searchBlob: uniq(searchTerms).join(" ").toLowerCase()
    };
  });
}

function dedupeFoods(items) {
  const merged = new Map();

  items.forEach((food) => {
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
  ].filter(Boolean).length + (food.officialFoodMedicine ? 20 : 0);
}

function cleanNature(value) {
  const normalized = cleanString(value);
  return ["寒", "凉", "平", "温", "热", "复合"].includes(normalized) ? normalized : "复合";
}

function cleanString(value) {
  return String(value || "")
    .replace(/\uFFFD/g, "")
    .replace(/\s+/g, " ")
    .trim();
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

  state.view = view;
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
  }
  syncUrl();
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
        const value = button.dataset.quickTerm;
        const isSame = state.homeExploreType === "topic" && state.homeExploreValue === value;
        state.homeExploreType = isSame ? "" : "topic";
        state.homeExploreValue = isSame ? "" : value;
        rerenderCurrent();
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
        const value = button.dataset.libraryNatureLink;
        const isSame = state.homeExploreType === "nature" && state.homeExploreValue === value;
        state.homeExploreType = isSame ? "" : "nature";
        state.homeExploreValue = isSame ? "" : value;
        rerenderCurrent();
        return;
      }
      state.libraryNature = button.dataset.libraryNatureLink;
      state.libraryQuery = "";
      navigate("library");
    });
  });

  app.querySelectorAll("[data-home-expand-close]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.homeExploreType = "";
      state.homeExploreValue = "";
      rerenderCurrent();
    });
  });

  app.querySelectorAll("[data-home-expand-library]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      const type = button.dataset.homeExpandLibrary;
      const value = button.dataset.value || "";
      if (type === "nature") {
        state.libraryNature = value;
        state.libraryTopic = "";
        state.libraryQuery = "";
      } else {
        state.libraryTopic = value;
        state.libraryNature = "全部";
        state.libraryQuery = "";
      }
      navigate("library");
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
  root.querySelectorAll("[data-library-nature]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryNature = button.dataset.libraryNature;
      if (state.view === "home") {
        state.homeLibraryFiltersOpen = false;
        navigate("library");
        return;
      }
      afterLibraryFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-library-category]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryCategory = button.dataset.libraryCategory;
      if (state.view === "home") {
        state.homeLibraryFiltersOpen = false;
        navigate("library");
        return;
      }
      afterLibraryFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-library-region]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryRegion = button.dataset.libraryRegion;
      if (state.view === "home") {
        state.homeLibraryFiltersOpen = false;
        navigate("library");
        return;
      }
      afterLibraryFilterChange({ scrollToResults: true });
    });
  });

  root.querySelectorAll("[data-library-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.libraryTopic = button.dataset.libraryTopic === state.libraryTopic ? "" : button.dataset.libraryTopic;
      if (state.view === "home") {
        state.homeLibraryFiltersOpen = false;
        navigate("library");
        return;
      }
      afterLibraryFilterChange({ scrollToResults: true });
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
        rerenderCurrent();
      }
    });
  });

  app.querySelectorAll("[data-remove-food]").forEach((button) => {
    button.addEventListener("click", () => {
      triggerHapticFeedback();
      state.checkerSelected = state.checkerSelected.filter((id) => id !== button.dataset.removeFood);
      rerenderCurrent();
    });
  });
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

  app.querySelectorAll("[data-toggle-favorite]").forEach((button) => {
    button.addEventListener("click", () => toggleFavorite(button.dataset.toggleFavorite));
  });
}

function rerenderCurrent(options = {}) {
  render();
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
  if (state.libraryNature !== "全部") count += 1;
  if (state.libraryTopic) count += 1;
  if (state.libraryCategory !== "全部") count += 1;
  if (state.libraryRegion !== "ALL") count += 1;
  return count;
}

function countRecipesAdvancedFilters() {
  let count = 0;
  if (state.recipesUseFor !== "全部") count += 1;
  if (state.recipesAvoidFor !== "全部") count += 1;
  if (state.recipesTiming !== "全部") count += 1;
  if (state.recipesCooking !== "全部") count += 1;
  if (state.recipesSeason !== "全部") count += 1;
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
  if (state.libraryNature !== "全部") parts.push(state.libraryNature);
  if (state.libraryTopic) parts.push(state.libraryTopic);
  if (state.libraryCategory !== "全部") parts.push(state.libraryCategory);
  if (state.libraryRegion !== "ALL") parts.push(REGION_LABELS[state.libraryRegion] || state.libraryRegion);
  return parts.length ? parts.join(" · ") : "全部食材";
}

function getRecipesFilterSummary() {
  const parts = [];
  if (state.recipesNature !== "全部") parts.push(state.recipesNature);
  if (state.recipesSyndrome !== "全部") parts.push(state.recipesSyndrome);
  if (state.recipesCoreFood !== "全部") parts.push(state.recipesCoreFood);
  if (state.recipesUseFor !== "全部") parts.push(state.recipesUseFor);
  if (state.recipesAvoidFor !== "全部") parts.push(state.recipesAvoidFor);
  if (state.recipesTiming !== "全部") parts.push(state.recipesTiming);
  if (state.recipesCooking !== "全部") parts.push(state.recipesCooking);
  if (state.recipesSeason !== "全部") parts.push(state.recipesSeason);
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
  state.libraryNature = "全部";
  state.libraryCategory = "全部";
  state.libraryRegion = "ALL";
  state.libraryTopic = "";
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
  return `
    <section class="filter-drawer">
      <div class="filter-drawer-head">
        <h2 class="filter-drawer-title">更多筛选</h2>
        <p class="filter-drawer-copy">安全提醒、时段、季节等进阶条件。</p>
      </div>
      <section class="filter-panel recipe-filter-panel filter-drawer-panel">
        <div class="filter-subsection">
          <div class="filter-label">安全提醒</div>
          <div class="filter-group filter-group-wrap recipe-syndrome-group">
            ${["全部", ...RECIPE_USE_FOR_OPTIONS].map((item) => chip(item, item, "data-recipes-usefor", state.recipesUseFor === item)).join("")}
          </div>
        </div>
        <div class="filter-subsection">
          <div class="filter-label">慎用提示</div>
          <div class="filter-group filter-group-wrap recipe-syndrome-group">
            ${["全部", ...RECIPE_AVOID_FOR_OPTIONS].map((item) => chip(item, item, "data-recipes-avoidfor", state.recipesAvoidFor === item)).join("")}
          </div>
        </div>
        <div class="filter-subsection">
          <div class="filter-label">建议时段</div>
          <div class="filter-group filter-group-wrap recipe-syndrome-group">
            ${["全部", ...RECIPE_TIMING_OPTIONS].map((item) => chip(item, item, "data-recipes-timing", state.recipesTiming === item)).join("")}
          </div>
        </div>
        <div class="filter-subsection">
          <div class="filter-label">烹调方式</div>
          <div class="filter-group filter-group-wrap recipe-syndrome-group">
            ${["全部", ...RECIPE_COOKING_OPTIONS].map((item) => chip(item, item, "data-recipes-cooking", state.recipesCooking === item)).join("")}
          </div>
        </div>
        <div class="filter-subsection">
          <div class="filter-label">适宜季节</div>
          <div class="filter-group filter-group-wrap recipe-syndrome-group">
            ${["全部", ...RECIPE_SEASON_OPTIONS].map((item) => chip(item, item, "data-recipes-season", state.recipesSeason === item)).join("")}
          </div>
        </div>
        <div class="filter-subsection">
          <div class="filter-label">身体感受</div>
          <div class="filter-group filter-group-wrap recipe-syndrome-group">
            ${["全部", ...RECIPE_BODY_FEEL_OPTIONS].map((item) => chip(item, item, "data-recipes-bodyfeel", state.recipesBodyFeel === item)).join("")}
          </div>
        </div>
        <div class="filter-subsection">
          <div class="filter-label">补神/益气</div>
          <div class="filter-group filter-group-wrap recipe-syndrome-group">
            ${["全部", ...RECIPE_TONIFY_OPTIONS].map((item) => chip(item, item, "data-recipes-tonify", state.recipesTonify === item)).join("")}
          </div>
        </div>
        <div class="filter-subsection">
          <div class="filter-label">清热/祛湿</div>
          <div class="filter-group filter-group-wrap recipe-syndrome-group">
            ${["全部", ...RECIPE_CLEAR_OPTIONS].map((item) => chip(item, item, "data-recipes-clear", state.recipesClear === item)).join("")}
          </div>
        </div>
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
  syncUrl();
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
  const teaTopics = ["茶", "绿茶", "白茶", "黄茶", "乌龙茶", "黑茶", "药食同源", "行气", "理气", "破气", "降气"];
  return `
    <section class="filter-panel filter-panel-library filter-drawer-panel">
      <div class="filter-subsection">
        <div class="filter-label">传统食性</div>
        <div class="filter-group filter-group-wrap">
          ${["全部", "寒", "凉", "平", "温", "热", "复合"].map((item) => chip(item, item, "data-library-nature", state.libraryNature === item)).join("")}
        </div>
      </div>
      <div class="filter-subsection">
        <div class="filter-label">气机与专题</div>
        <div class="filter-group filter-group-wrap">
          ${teaTopics.map((item) => chip(item, item, "data-library-topic", state.libraryTopic === item)).join("")}
        </div>
      </div>
      <div class="filter-subsection">
        <div class="filter-label">食材分类</div>
        <div class="filter-group filter-group-wrap">
          ${["全部", ...CATEGORY_ORDER.filter((category) => CATEGORY_COUNTS[category])].map((item) => chip(item, item, "data-library-category", state.libraryCategory === item)).join("")}
        </div>
      </div>
      <div class="filter-subsection">
        <div class="filter-label">地区来源</div>
        <div class="filter-group filter-group-wrap">
          ${chip("全部地区", "ALL", "data-library-region", state.libraryRegion === "ALL")}
          ${Object.entries(REGION_LABELS)
            .filter(([region]) => REGION_COUNTS[region])
            .map(([region, label]) => chip(label, region, "data-library-region", state.libraryRegion === region))
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderHomeLibraryFilterPanel() {
  return `
    <div class="home-library-filter-container ${state.homeLibraryFiltersOpen ? "open" : ""}" id="homeLibraryFilterContainer">
      <div class="home-library-filter-inner">
        <section class="home-library-filter-wrap">
          <div class="home-library-filter-head">
            <div>
              <p class="eyebrow">Filter Library</p>
              <h2>进一步筛选食材库</h2>
              <p>点选食性、专题、分类或地区后，带着条件进入食材库继续细看。</p>
            </div>
          </div>
          ${renderLibraryFilterSections()}
        </section>
      </div>
    </div>
  `;
}

function renderHomeV2() {
  const homeMatches = state.homeQuery ? searchFoods(state.homeQuery, { limit: 6 }) : [];
  const homeExplorePanel = renderHomeExplorePanel();
  const natureTiles = ["寒", "凉", "平", "温", "热"]
    .map((nature) => {
      const meta = NATURE_META[nature];
      return `
        <button class="nature-tile ${state.homeExploreType === "nature" && state.homeExploreValue === nature ? "active" : ""}" data-library-nature-link="${nature}" style="background:${meta.pale};border-color:${meta.tone}22">
          <strong style="color:${meta.tone}">${nature}</strong>
          <small>${NATURE_COUNTS[nature] || 0}种</small>
        </button>
      `;
    })
    .join("");

  return `
    <section class="hero">
      <p class="eyebrow">Food Nature Atlas</p>
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
                    <small>${[food.en, food.category, food.teaClass].filter(Boolean).join(" 路 ")}</small>
                  </div>
                  ${natureBadge(food.nature)}
                </button>
              `).join("")
              : `<div class="empty-inline">没搜到匹配食材，试试别名、拼音首字母或功效词。</div>`}
          </div>`
        : ""}
      <button class="hero-filter-trigger" type="button" data-home-library-toggle="true">
        <span>食材库</span>
      </button>
    </section>

    <section class="page-title">
      <p class="eyebrow">Traditional Nature</p>
      <h1>按传统食性浏览</h1>
      <p>食性不是食物温度，也不是医学诊断，用来帮助你组织日常饮食线索。</p>
    </section>

    <section class="nature-grid">${natureTiles}</section>

    ${state.homeExploreType === "nature" ? homeExplorePanel : ""}

    <section class="page-title">
      <p class="eyebrow">Qi Terms</p>
      <h1>传统气机术语</h1>
      <p>把行气、理气、破气、降气放在食材搜索里讲清楚，不把传统术语直接当成医疗结论。</p>
    </section>

    <div class="filter-group filter-group-wrap">
      ${["行气", "理气", "破气", "降气"].map((term) => chip(term, term, "data-quick-term", state.homeExploreType === "topic" && state.homeExploreValue === term)).join("")}
    </div>

    ${state.homeExploreType === "topic" ? homeExplorePanel : ""}

    <section class="notice gold">
      <strong>数据边界</strong>
      传统食养条目用于日常整理，不替代诊断、处方或疾病治疗；正在服药、孕期、慢病和持续不适者优先就医。
    </section>
  `;
}

function renderHome() {
  const homeMatches = state.homeQuery ? searchFoods(state.homeQuery, { limit: 6 }) : [];
  const homeExplorePanel = renderHomeExplorePanel();
  const homeLibraryFilterPanel = renderHomeLibraryFilterPanel();
  const natureTiles = ["寒", "凉", "平", "温", "热"]
    .map((nature) => {
      const meta = NATURE_META[nature];
      return `
        <button class="nature-tile ${state.homeExploreType === "nature" && state.homeExploreValue === nature ? "active" : ""}" data-library-nature-link="${nature}" style="background:${meta.pale};border-color:${meta.tone}22">
          <strong style="color:${meta.tone}">${nature}</strong>
          <small>${NATURE_COUNTS[nature] || 0}种</small>
        </button>
      `;
    })
    .join("");

  return `
    <section class="hero">
      <p class="eyebrow">Food Nature Atlas</p>
      <h1>查食性，也查真正需要留意的搭配</h1>
      <p>把传统食养属性、日常吃法、个人状态与现代安全提示放在同一处。</p>
      ${searchField({
        id: "homeSearch",
        placeholder: "搜食材、别名、功效或首字母，如：木姜子 / mjz",
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
                    <small>${[food.en, food.category, food.teaClass].filter(Boolean).join(" · ")}</small>
                  </div>
                  ${natureBadge(food.nature)}
                </button>
              `).join("")
              : `<div class="empty-inline">没搜到匹配食材，试试别名、拼音首字母或功效词。</div>`}
          </div>`
        : ""}
      <div class="filter-group filter-group-wrap">
        ${QUICK_TERMS.map((term) => chip(term, term, "data-quick-term", state.homeExploreType === "topic" && state.homeExploreValue === term)).join("")}
      </div>
    </section>

    <section class="page-title">
      <p class="eyebrow">Traditional Nature</p>
      <h1>按传统食性浏览</h1>
      <p>食性不是食物温度，也不是医学诊断，用来帮助你组织日常饮食线索。</p>
    </section>

    <section class="nature-grid">${natureTiles}</section>

    ${state.homeExploreType === "nature" ? homeExplorePanel : ""}

    <section class="page-title">
      <p class="eyebrow">Qi Terms</p>
      <h1>传统气机术语</h1>
      <p>把行气、理气、破气、降气放在食材搜索里讲清楚，不把传统术语直接当成医疗结论。</p>
    </section>

    <div class="filter-group filter-group-wrap">
      ${["行气", "理气", "破气", "降气"].map((term) => chip(term, term, "data-quick-term", state.homeExploreType === "topic" && state.homeExploreValue === term)).join("")}
    </div>

    ${state.homeExploreType === "topic" ? homeExplorePanel : ""}

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
      <p class="eyebrow">Ingredient Library</p>
      <h1>食材库</h1>
    </section>

    ${renderStickyBrowseToolbar({
      searchId: "libraryQuery",
      placeholder: "搜索食材、茶类、别名或首字母，如：木姜子 / mjz",
      queryValue: state.libraryQuery,
      filterScope: "library",
      summary: getLibraryFilterSummary(),
      activeFilterCount: countLibraryActiveFilters(),
      resultCount: items.length,
      resultUnit: "食材",
      resultMeta: `药食同源 ${OFFICIAL_COUNT} · 茶类 ${TEA_COUNT}`
    })}

    <section class="food-list">
      ${items.length ? items.map(foodRow).join("") : emptyState("暂时没有匹配项", "换个别名、功效词或地区试试。", true)}
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
      <p class="eyebrow">Pairing Checker</p>
      <h1>搭配检查</h1>
      <p>一次选择 2–4 种食材，查看传统搭配、现代安全提醒和常见“相克”迷思。</p>
    </section>

    <section>
      <h2 class="section-title">已选食材</h2>
      <p class="section-copy">不是安全认证，只提示已知的高优先级问题。</p>
      <div class="selected-tray">
        ${selectedFoods.length
          ? selectedFoods.map((food) => `
            <span class="selected-chip">
              ${food.name}
              <button data-remove-food="${food.id}" aria-label="移除 ${food.name}">×</button>
            </span>
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
                    <small>${food.en || food.category} · ${food.category}</small>
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

    <section class="detail-section">
      <h2 class="section-title">检查结果</h2>
      <p class="section-copy">优先级：药物与过敏 &gt; 营养与疾病状态 &gt; 传统食养。</p>
      ${result}
    </section>
  `;
}

function renderRecipes() {
  const items = filterRecipes();
  const syndromes = uniq(recipes.map((item) => item.primarySyndrome).filter(Boolean));
  const advancedCount = countRecipesAdvancedFilters();

  return `
    <section class="page-title page-title-compact">
      <p class="eyebrow">Food Therapy Recipes</p>
      <h1>食疗方</h1>
    </section>

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

  return `
    <section class="page-title">
      <p class="eyebrow">My Food Profile</p>
      <h1>我的食养档案</h1>
      <p>开启与你相关的状态后，食材详情和搭配检查会优先显示对应提醒。此档案只保存在当前浏览器。</p>
    </section>

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
      <h2 class="section-title">我的收藏</h2>
      <p class="section-copy">收藏常查食材，方便反复查看。</p>
      <div class="food-list">
        ${favorites.length ? favorites.map(foodRow).join("") : emptyState("还没有收藏", "在食材详情里点一下“收藏这个食材”。")}
      </div>
    </section>

    <section class="detail-section">
      <h2 class="section-title">数据说明</h2>
      <ul>
        <li>药食同源专题以可追溯条目方式持续补全，当前库内已整理 ${OFFICIAL_COUNT} 项。</li>
        <li>传统食性、气机术语、发物和证候提示属于整理性注释，不替代医疗判断。</li>
        <li>当前页面以中国、日本、韩国、美国、英国等常见日常食材为主，地区扩库会继续分批补充。</li>
        <li>经典依据优先整理自《本草拾遗》《黄帝内经》《神农本草经》《食疗本草》《千金要方·食治篇》《饮膳正要》《脾胃论》《本草纲目》《养老奉亲书》《齐民要术》《随园食单》等食养与本草文献。</li>
      </ul>
    </section>
  `;
}

function filterFoods() {
  return searchFoods(state.libraryQuery).filter((food) => {
    const byNature = state.libraryNature === "全部" || food.nature === state.libraryNature;
    const byCategory = state.libraryCategory === "全部" || food.category === state.libraryCategory;
    const byRegion = state.libraryRegion === "ALL" || food.regions.includes(state.libraryRegion);
    const byTopic = !state.libraryTopic || matchTopic(food, state.libraryTopic);
    return byNature && byCategory && byRegion && byTopic;
  });
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
  if (topic === "药食同源") return food.officialFoodMedicine;
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
    const byUseFor = state.recipesUseFor === "全部" || (item.useFor || []).includes(state.recipesUseFor);
    const byAvoidFor = state.recipesAvoidFor === "全部" || (item.avoidFor || []).includes(state.recipesAvoidFor);
    const byTiming = state.recipesTiming === "全部" || (item.timing || []).includes(state.recipesTiming);
    const byCooking = state.recipesCooking === "全部" || (item.cooking || []).includes(state.recipesCooking);
    const byCoreFood = state.recipesCoreFood === "全部" || (item.coreFoods || []).includes(state.recipesCoreFood);
    const bySeason = state.recipesSeason === "全部" || (item.season || []).includes(state.recipesSeason);
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
      ...(item.bodyFeel || []),
      item.tonify || "",
      item.clear || "",
      ...item.foods.map((food) => food.name)
    ].join(" ").toLowerCase();
    const byQuery = !query || blob.includes(query);
    return byNature && bySyndrome && byUseFor && byAvoidFor && byTiming && byCooking && byCoreFood && bySeason && byBodyFeel && byTonify && byClear && byQuery;
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
      notices.push(renderNotice(rule.level, rule.title, rule.text));
    }
  });

  const coldCount = selectedFoods.filter((food) => ["寒", "凉"].includes(food.nature)).length;
  const warmCount = selectedFoods.filter((food) => ["温", "热"].includes(food.nature)).length;

  if (coldCount >= 2) {
    notices.push(renderNotice("notice", "整体偏寒", "这一组里寒凉食材偏多。容易腹泻、怕冷、胃部敏感的人群，更适合减少生冷做法或与温性主食搭配。"));
  }

  if (warmCount >= 2) {
    notices.push(renderNotice("gold", "整体偏温热", "温热食材叠加时，更要留意辣度、油量和个体耐受。口干、便秘、反流或炎症期的人群别一次吃太重。"));
  }

  selectedFoods.forEach((food) => {
    const hitTags = food.cautionTags.filter((tag) => activeProfileTags.includes(tag));
    if (hitTags.length) {
      notices.push(renderNotice("caution", `${food.name} 与你的个人提醒有关`, `${food.name} 在当前档案下需要优先看安全提示：${hitTags.map(profileLabel).join("、")}。`));
    }
  });

  if (!notices.length) {
    notices.push(renderNotice("notice", "暂未命中高优先级风险", "这不代表“完全没问题”，只是当前没有命中已整理的重点提醒。仍要结合份量、烹调方式和个人耐受。"));
  }

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

  return notices.join("") + balance;
}

function renderNotice(level, title, text) {
  const className = level === "caution" ? "notice caution" : level === "gold" ? "notice gold" : "notice";
  return `<section class="${className}"><strong>${title}</strong>${text}</section>`;
}

function foodRow(food) {
  return `
    <button class="food-row" data-open-food="${food.id}">
      <div class="food-main">
        <strong>${food.name}</strong>
        <small>${[food.en, food.category, food.teaClass].filter(Boolean).join(" · ")}</small>
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



function chip(label, value, dataAttr, active = false) {
  const attr = dataAttr ? `${dataAttr}="${value}"` : "";
  return `<button class="chip ${active ? "active" : ""}" ${attr}>${label}</button>`;
}

function recipeRow(item) {
  const secondarySyndromes = Array.isArray(item.secondarySyndromes) ? item.secondarySyndromes : [];
  const syndromeLine = [
    item.primarySyndrome ? `主证：${item.primarySyndrome}` : "主证：未标注",
    secondarySyndromes.length ? `兼见：${secondarySyndromes.join(" / ")}` : ""
  ].filter(Boolean).join(" · ");

  return `
    <article class="recipe-row" data-open-recipe="${item.id}" role="button" tabindex="0">
      <div class="food-main">
        <strong>${item.name}</strong>
        <small>${[item.subtitle, syndromeLine].filter(Boolean).join(" · ")}</small>
      </div>
      ${natureBadge(item.nature)}
    </article>
  `;
}

function buildHomeExploreItems() {
  if (!state.homeExploreType || !state.homeExploreValue) return [];
  const items = foods.filter((food) => {
    if (state.homeExploreType === "nature") {
      return food.nature === state.homeExploreValue;
    }
    return matchTopic(food, state.homeExploreValue);
  });
  return items.slice(0, 8);
}

function renderHomeExplorePanel() {
  const items = buildHomeExploreItems();
  if (!state.homeExploreType || !state.homeExploreValue) return "";
  const title = state.homeExploreType === "nature"
    ? `先看${state.homeExploreValue}性食材`
    : `先看“${state.homeExploreValue}”相关食材`;
  const description = state.homeExploreType === "nature"
    ? "首页先给你一层代表性结果；需要更细分类、地区或茶类专题，再进入食材库继续筛。"
    : "先在首页看一层常见结果；如果要进一步按分类和地区收窄，再进入食材库。";

  return `
    <section class="home-explore-panel">
      <div class="home-explore-head">
        <div>
          <p class="eyebrow">Quick Explore</p>
          <h2>${title}</h2>
          <p>${description}</p>
        </div>
        <div class="home-explore-actions">
          <button class="chip" data-home-expand-close="true">收起</button>
          <button class="chip active" data-home-expand-library="${state.homeExploreType}" data-value="${escapeHtml(state.homeExploreValue)}">查看全部</button>
        </div>
      </div>
      <div class="list-block">
        ${items.length
          ? items.map((food) => foodRow(food)).join("")
          : `<div class="empty-inline">暂时还没有可展示的条目，稍后我们再继续往这组里补厚。</div>`}
      </div>
    </section>
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

  showToast(matches.length ? "已在首页展开候选结果，可直接点开食材。" : "没有搜到匹配食材，换个别名或拼音试试。");
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
}

function openFoodDetail(id) {
  state.sheet = { type: "food", id };
  showSheet(renderFoodDetail(foodMap.get(id)));
  syncUrl();
}

function openRecipeDetail(id) {
  const item = recipes.find((recipeItem) => recipeItem.id === id);
  if (!item) {
    showToast("这个食疗方暂时没加载完整，请刷新后再试。");
    return;
  }
  state.sheet = { type: "recipe", id };
  showSheet(renderRecipeDetail(item));
  syncUrl();
}

function closeDetailSheet() {
  const wasFilterSheet = state.sheet?.type === "filters";
  state.sheet = null;
  sheet.classList.remove("visible", "filter-sheet");
  sheetBackdrop.classList.remove("visible");
  setTimeout(() => {
    sheet.hidden = true;
    sheetBackdrop.hidden = true;
    sheetContent.innerHTML = "";
  }, 180);
  syncUrl();
  if (wasFilterSheet) {
    scrollToResultAnchor();
  }
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
  sheetContent.querySelectorAll("[data-toggle-favorite]").forEach((button) => {
    button.addEventListener("click", () => toggleFavorite(button.dataset.toggleFavorite));
  });

  const feedbackForm = sheetContent.querySelector("#feedbackForm");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", handleFeedbackSubmit);
  }
}

function renderFoodDetail(food) {
  const relatedRecipes = recipes.filter((item) => item.foodIds.includes(food.id));
  const classics = buildClassicNotes(food);
  const sources = Array.isArray(food.sources) ? food.sources : [];
  const favorite = state.favorites.includes(food.id);

  return `
    <section class="sheet-hero">
      <div class="sheet-hero-top">
        <div class="nature-seal" style="background:${(NATURE_META[food.nature] || NATURE_META.复合).pale};color:${(NATURE_META[food.nature] || NATURE_META.复合).tone}">${food.nature}</div>
        <div>
          <h2 class="sheet-title">${food.name}</h2>
          <p class="sheet-subtitle">${[food.en, food.category, food.teaClass].filter(Boolean).join(" · ")}</p>
        </div>
      </div>
      <div class="filter-group filter-group-wrap">
        <span class="pill-badge">${food.category}</span>
        ${food.officialFoodMedicine ? '<span class="pill-badge">药食同源</span>' : ""}
        ${food.effects.slice(0, 3).map((effect) => `<span class="pill-badge">${effect}</span>`).join("")}
      </div>
      <p class="sheet-summary">${food.summary || "暂无摘要。"}</p>
      <button class="plain-button cta-button" data-toggle-favorite="${food.id}">${favorite ? "已收藏" : "收藏这个食材"}</button>
    </section>

    <section class="detail-section">
      <h3>传统食养属性</h3>
      <div class="detail-grid">
        <div class="detail-block"><strong>食性</strong><p>${food.nature} · ${(NATURE_META[food.nature] || NATURE_META.复合).label}</p></div>
        <div class="detail-block"><strong>五味</strong><p>${food.flavor || "未标注"}</p></div>
        <div class="detail-block"><strong>地区来源</strong><p>${food.regions.map((region) => REGION_LABELS[region]).join("、") || "未标注"}</p></div>
        <div class="detail-block"><strong>传统关键词</strong><p>${food.effects.join("、") || "未标注"}</p></div>
      </div>
    </section>

    <section class="detail-section">
      <h3>食用建议</h3>
      <div class="detail-grid">
        <div class="detail-block"><strong>单独吃是否合适</strong><p>${food.alone || "少量、熟食、结合个人耐受来判断。"}</p></div>
        <div class="detail-block"><strong>更适合什么时候吃</strong><p>${food.timing || "优先放在规律正餐里，而不是靠极端做法放大寒热。"} </p></div>
        <div class="detail-block"><strong>如何搭配</strong><p>${food.pair || "与主食、蛋白质、蔬菜一起看整体结构。"} </p></div>
        <div class="detail-block"><strong>安全提示</strong><p>${food.caution || "结合剂量、加工方式和个人状态综合判断。"} </p></div>
      </div>
    </section>

    ${(food.faCategory || food.faNote || food.suitableFor.length || food.avoidFor.length || food.contraindications.length)
      ? `
      <section class="detail-section">
        <h3>宜食与忌食人群</h3>
        ${food.faCategory ? `<p><strong>发物分类：</strong>${food.faCategory}${food.faNote ? `；${food.faNote}` : ""}</p>` : ""}
        ${food.suitableFor.length ? `<p><strong>更适合：</strong>${food.suitableFor.join("、")}</p>` : ""}
        ${food.avoidFor.length ? `<p><strong>不太适合：</strong>${food.avoidFor.join("、")}</p>` : ""}
        ${food.contraindications.length ? `<p><strong>禁忌提示：</strong>${food.contraindications.join("、")}</p>` : ""}
      </section>` : ""}

    <section class="detail-section">
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

  return `
    <section class="sheet-hero">
      <div class="sheet-hero-top">
        <div class="nature-seal" style="background:${(NATURE_META[item.nature] || NATURE_META.复合).pale};color:${(NATURE_META[item.nature] || NATURE_META.复合).tone}">${item.nature}</div>
        <div>
          <h2 class="sheet-title">${item.name}</h2>
          <p class="sheet-subtitle">${item.subtitle}</p>
        </div>
      </div>
      <div class="filter-group filter-group-wrap">
        ${item.primarySyndrome ? `<span class="pill-badge">主证：${item.primarySyndrome}</span>` : ""}${secondarySyndromes.map((syndrome) => `<span class="pill-badge">兼见：${syndrome}</span>`).join("")}
      </div>
      <p class="sheet-summary">${item.note || "这是一条用于日常饮食整理的食疗方条目。"}</p>
    </section>

    <section class="detail-section">
      <h3>材料</h3>
      <ul>${ingredients.length ? ingredients.map((line) => `<li>${line}</li>`).join("") : "<li>材料信息还在继续补全。</li>"}</ul>
    </section>

    <section class="detail-section">
      <h3>适用场景与慎用提示</h3>
      ${useFor.length ? `<p><strong>更适合：</strong>${useFor.join("、")}</p>` : ""}
      ${avoidFor.length ? `<p><strong>谨慎参考：</strong>${avoidFor.join("、")}</p>` : ""}
      ${timing.length ? `<p><strong>进食时段：</strong>${timing.join("、")}</p>` : ""}
      ${cooking.length ? `<p><strong>烹调方式：</strong>${cooking.join("、")}</p>` : ""}
      ${coreFoods.length ? `<p><strong>核心食材：</strong>${coreFoods.join("、")}</p>` : ""}
      <p><strong>使用方式：</strong>更适合作为正餐结构、阶段性轻调养或恢复期饮食整理，不替代辨证处方。</p>
    </section>

    <section class="detail-section">
      <h3>做法</h3>
      <ol class="recipe-steps">${steps.length ? steps.map((line) => `<li>${line}</li>`).join("") : "<li>做法步骤还在继续补全。</li>"}</ol>
    </section>

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
  if (state.favorites.includes(foodId)) {
    state.favorites = state.favorites.filter((id) => id !== foodId);
    showToast("已取消收藏");
  } else {
    state.favorites = uniq([...state.favorites, foodId]);
    showToast("已加入收藏");
  }
  saveJson("foodwise-favorites", state.favorites);
  render();
}

function profileLabel(id) {
  return PROFILE_OPTIONS.find((option) => option.id === id)?.label || id;
}

function syncUrl() {
  const params = new URLSearchParams();
  if (state.view !== "home") params.set("view", state.view);
  if (state.view === "home" && state.homeQuery) params.set("q", state.homeQuery);
  if (state.view === "library" && state.libraryQuery) params.set("q", state.libraryQuery);
  if (state.view === "recipes" && state.recipesQuery) params.set("q", state.recipesQuery);
  if (state.view === "checker" && state.checkerQuery) params.set("q", state.checkerQuery);
  if (state.view === "checker" && state.checkerSelected.length) params.set("pair", state.checkerSelected.join(","));
  if (state.sheet?.type === "food") params.set("food", state.sheet.id);
  if (state.sheet?.type === "recipe") params.set("recipe", state.sheet.id);
  history.replaceState(null, "", `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`);
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toastEl.classList.remove("visible"), 1800);
}
