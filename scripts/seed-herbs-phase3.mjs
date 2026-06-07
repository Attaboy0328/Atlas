#!/usr/bin/env node
/**
 * Phase-3 TCM herbs — ChP 2025 supplement (batch 3).
 * Run: node scripts/seed-herbs-phase3.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "data", "tcm", "herbs-phase3.json");

const CHP = "《中华人民共和国药典》2025年版";

function h(id, name, opts = {}) {
  const {
    aliases = [],
    nature = "平",
    flavor = "甘",
    meridians = [],
    partUsed = "",
    effects = [],
    itemKind = "tcm-herb",
    usageScope = "reference-only",
    officialFoodMedicine = false,
    pinyin = "",
    initials = "",
    en = "",
    relatedForms = [],
    caution = "非药食同源条目仅作中药信息参考，不替代诊断、处方或药典医嘱；自行配膳前请咨询专业人士。",
    summary = "",
    sources = []
  } = opts;
  return {
    id,
    name,
    aliases,
    en,
    pinyin,
    initials,
    itemKind,
    usageScope,
    officialFoodMedicine,
    category: itemKind === "food-medicine" ? "食药物质" : "中药材",
    nature,
    flavor,
    meridians,
    partUsed,
    effects,
    relatedForms,
    pharmacopoeiaEdition: "2025",
    summary: summary || `${name}为《中国药典》2025年版收载品种，传统整理常作${effects.slice(0, 2).join("、") || "调护"}方向参考。`,
    caution,
    sources: sources.length ? sources : [{ title: CHP, summary: `收载于${CHP}，正名「${name}」。` }],
    regions: ["CN"],
    searchTerms: [pinyin, initials, ...aliases].filter(Boolean)
  };
}

const herbs = [
  h("ampelopsis-japonica", "白蔹", { aliases: ["白根"], nature: "微寒", flavor: "苦、辛", meridians: ["心", "胃"], partUsed: "块根", effects: ["清热解毒", "消痈散结"], pinyin: "bailian", initials: "bl" }),
  h("cynanchum-atratum", "白薇", { aliases: ["白幕"], nature: "寒", flavor: "苦、咸", meridians: ["胃", "肝", "肾"], partUsed: "根及根茎", effects: ["清热凉血", "利尿"], pinyin: "baiwei", initials: "bw" }),
  h("dictamnus-dasycarpus", "白鲜皮", { aliases: ["白膻"], nature: "寒", flavor: "苦", meridians: ["脾", "胃", "膀胱"], partUsed: "根皮", effects: ["清热燥湿", "祛风"], pinyin: "baixianpi", initials: "bxp" }),
  h("angelica-dahurica", "白芷", { aliases: ["杭白芷", "川白芷"], nature: "温", flavor: "辛", meridians: ["胃", "大肠", "肺"], partUsed: "根", effects: ["解表散寒", "祛风止痛"], pinyin: "baizhi", initials: "bz" }),
  h("asarum-heterotropoides", "北细辛", { aliases: ["细辛", "辽细辛"], nature: "温", flavor: "辛", meridians: ["心", "肺", "肾"], partUsed: "根及根茎", effects: ["祛风散寒", "通窍"], pinyin: "beixixin", initials: "bxx", caution: "有小毒，不可过量；非日常食材。" }),
  h("magnolia-biondii", "辛夷", { aliases: ["木笔花"], nature: "温", flavor: "辛", meridians: ["肺", "胃"], partUsed: "花蕾", effects: ["散风寒", "通鼻窍"], pinyin: "xinyi", initials: "xy" }),
  h("xanthium-sibiricum", "苍耳子", { aliases: ["苍耳"], nature: "温", flavor: "辛、苦", meridians: ["肺"], partUsed: "成熟果实", effects: ["散风寒", "通鼻窍", "祛风湿"], pinyin: "cangerzi", initials: "cez", caution: "有小毒，不宜大量久服。" }),
  h("vitex-rotundifolia", "蔓荆子", { aliases: [], nature: "微寒", flavor: "辛、苦", meridians: ["膀胱", "肝", "胃"], partUsed: "成熟果实", effects: ["疏散风热", "清利头目"], pinyin: "manjingzi", initials: "mjz" }),
  h("eriocaulon-buergerianum", "谷精草", { aliases: [], nature: "温", flavor: "辛、甘", meridians: ["肝", "肺"], partUsed: "头状花序", effects: ["疏散风热", "明目"], pinyin: "gujingcao", initials: "gjc" }),
  h("buddleja-officinalis", "密蒙花", { aliases: [], nature: "微寒", flavor: "甘", meridians: ["肝"], partUsed: "花蕾", effects: ["清热泻火", "养肝明目"], pinyin: "mimenghua", initials: "mmh" }),
  h("fraxinus-rhynchophylla", "秦皮", { aliases: ["梣皮"], nature: "寒", flavor: "苦、涩", meridians: ["肝", "胆", "大肠"], partUsed: "枝皮或干皮", effects: ["清热燥湿", "收涩止痢"], pinyin: "qinpi", initials: "qp" }),
  h("clerodendrum-trichotomum", "臭梧桐叶", { aliases: ["臭梧桐"], nature: "凉", flavor: "辛、苦", meridians: ["肝", "胆"], partUsed: "叶", effects: ["祛风湿", "平肝"], pinyin: "chouwu tongye", initials: "cwty" }),
  h("sigesbeckia-herb", "豨莶草", { aliases: ["豨签草"], nature: "寒", flavor: "辛、苦", meridians: ["肝", "肾"], partUsed: "地上部分", effects: ["祛风湿", "利关节"], pinyin: "xixiancao", initials: "xxc" }),
  h("lygodium-japonicum", "海金沙", { aliases: ["海金砂"], nature: "寒", flavor: "甘、咸", meridians: ["膀胱", "小肠"], partUsed: "成熟孢子", effects: ["清利湿热", "通淋"], pinyin: "haijinsha", initials: "hjs" }),
  h("pyrrosia-sheareri", "石韦", { aliases: [], nature: "凉", flavor: "甘、苦", meridians: ["肺", "膀胱"], partUsed: "叶", effects: ["利尿通淋", "清肺止咳"], pinyin: "shiwei", initials: "sw" }),
  h("polygonum-aviculare", "萹蓄", { aliases: ["萹竹"], nature: "微寒", flavor: "苦", meridians: ["膀胱"], partUsed: "地上部分", effects: ["利尿通淋", "杀虫"], pinyin: "bianxu", initials: "bx" }),
  h("dianthus-superbus", "瞿麦", { aliases: [], nature: "寒", flavor: "苦", meridians: ["心", "小肠"], partUsed: "地上部分", effects: ["利尿通淋", "活血"], pinyin: "qumai", initials: "qm", caution: "孕妇慎用。" }),
  h("akebia-quinata", "木通", { aliases: ["白木通", "通草"], nature: "寒", flavor: "苦", meridians: ["心", "小肠", "膀胱"], partUsed: "茎", effects: ["利尿通淋", "清心"], pinyin: "mutong", initials: "mt", caution: "关木通等混淆品有毒，须按药典正名辨识。" }),
  h("clematis-mandshurica", "川木通", { aliases: [], nature: "寒", flavor: "苦", meridians: ["心", "小肠", "膀胱"], partUsed: "茎", effects: ["利尿通淋", "通经"], pinyin: "chuanmutong", initials: "cmt" }),
  h("tetrapanax-papyrifer", "通草", { aliases: ["通脱木"], nature: "微寒", flavor: "甘、淡", meridians: ["肺", "胃"], partUsed: "茎髓", effects: ["清热利尿", "通气下乳"], pinyin: "tongcao", initials: "tc" }),
  h("juncus-effusus", "灯心草", { aliases: ["灯芯草"], nature: "微寒", flavor: "甘、淡", meridians: ["心", "肺", "小肠"], partUsed: "茎髓", effects: ["清心火", "利小便"], pinyin: "dengxincao", initials: "dxc" }),
  h("polygonum-cuspidatum", "虎杖", { aliases: ["大虫杖", "酸汤杆"], nature: "微寒", flavor: "微苦", meridians: ["肝", "胆", "肺"], partUsed: "根茎及根", effects: ["利湿退黄", "清热解毒"], pinyin: "huzhang", initials: "hz" }),
  h("polygonum-bistorta", "拳参", { aliases: [], nature: "微寒", flavor: "苦、涩", meridians: ["肝", "大肠", "肺"], partUsed: "根茎", effects: ["清热解毒", "消肿"], pinyin: "quanshen", initials: "qs" }),
  h("pyrite", "自然铜", { aliases: [], nature: "平", flavor: "辛", meridians: ["肝"], partUsed: "矿物", effects: ["散瘀止痛", "续筋接骨"], pinyin: "zirantong", initials: "zrt", caution: "矿物药，非食材。" }),
  h("halloysitum-rubrum", "赤石脂", { aliases: [], nature: "温", flavor: "甘、酸、涩", meridians: ["大肠", "胃"], partUsed: "矿物", effects: ["涩肠", "止血"], pinyin: "chishizhi", initials: "csz", caution: "矿物药，非食材。" }),
  h("limonite", "代赭石", { aliases: [], nature: "寒", flavor: "苦", meridians: ["肝", "心"], partUsed: "矿物", effects: ["平肝潜阳", "降逆", "止血"], pinyin: "daizheshi", initials: "dzs", caution: "矿物药，非食材。" }),
  h("dried-ginger", "干姜", { aliases: ["炮姜"], nature: "热", flavor: "辛", meridians: ["脾", "胃", "肾", "心", "肺"], partUsed: "根茎", effects: ["温中散寒", "回阳"], pinyin: "ganjiang", initials: "gj" }),
  h("galangal-officinarum", "高良姜", { aliases: [], nature: "热", flavor: "辛", meridians: ["脾", "胃"], partUsed: "根茎", effects: ["温胃止呕", "散寒"], pinyin: "gaoliangjiang", initials: "glj" }),
  h("alpinia-katsumadai", "草豆蔻", { aliases: [], nature: "温", flavor: "辛", meridians: ["脾", "胃"], partUsed: "近成熟种子", effects: ["燥湿行气", "温中"], pinyin: "caodoukou", initials: "cdk" }),
  h("amomi-tsao-ko", "草果", { aliases: [], nature: "温", flavor: "辛", meridians: ["脾", "胃"], partUsed: "成熟果实", effects: ["燥湿温中", "除痰截疟"], pinyin: "caoguo", initials: "cg" }),
  h("citri-exocarpium-rubrum", "化橘红", { aliases: ["化州橘红"], nature: "温", flavor: "辛、苦", meridians: ["脾", "肺"], partUsed: "未成熟或近成熟果皮", effects: ["理气宽中", "燥湿化痰"], pinyin: "huajuhong", initials: "hjh" }),
  h("citri-exocarpium", "橘红", { aliases: ["橘皮"], nature: "温", flavor: "辛、苦", meridians: ["脾", "肺"], partUsed: "成熟果皮", effects: ["理气宽中", "燥湿化痰"], pinyin: "juhong", initials: "jh", relatedForms: ["citrus-reticulata-peel"] }),
  h("citron-fruit", "香橼", { aliases: ["香圆"], nature: "温", flavor: "辛、苦、酸", meridians: ["肝", "脾", "肺"], partUsed: "成熟果实", effects: ["疏肝理气", "宽中"], pinyin: "xiangyuan", initials: "xy" }),
  h("finger-citron", "佛手", { aliases: ["佛手柑"], nature: "温", flavor: "辛、苦、酸", meridians: ["肝", "脾", "胃", "肺"], partUsed: "成熟果实", effects: ["疏肝理气", "和胃"], pinyin: "foshou", initials: "fs" }),
  h("fructus-auranti", "枳壳", { aliases: [], nature: "微寒", flavor: "苦、辛、酸", meridians: ["脾", "胃"], partUsed: "未成熟果实", effects: ["理气宽中", "行滞"], pinyin: "zhiqiao", initials: "zq" }),
  h("fructus-aurantii-immaturus", "枳实", { aliases: [], nature: "微寒", flavor: "苦、辛、酸", meridians: ["脾", "胃"], partUsed: "未成熟果实", effects: ["破气消积", "化痰"], pinyin: "zhishi", initials: "zs", relatedForms: ["fructus-auranti"] }),
  h("magnolia-flower", "厚朴花", { aliases: [], nature: "温", flavor: "苦", meridians: ["脾", "胃"], partUsed: "花蕾", effects: ["理气", "化湿"], pinyin: "houbohua", initials: "hbh", relatedForms: ["magnolia-officinalis"] }),
  h("rosa-rugosa", "玫瑰花", { aliases: [], nature: "温", flavor: "甘、微苦", meridians: ["肝", "脾"], partUsed: "花蕾", effects: ["行气解郁", "和血"], pinyin: "meiguihua", initials: "mgh" }),
  h("campsis-flos", "凌霄花", { aliases: [], nature: "微寒", flavor: "辛", meridians: ["肝", "心包"], partUsed: "花", effects: ["活血通经", "凉血"], pinyin: "lingxiaohua", initials: "lxh", caution: "孕妇慎用。" }),
  h("rosa-chinensis", "月季花", { aliases: [], nature: "温", flavor: "甘", meridians: ["肝"], partUsed: "花", effects: ["活血调经"], pinyin: "yuejihua", initials: "yjh" }),
  h("albizia-bark", "合欢皮", { aliases: [], nature: "平", flavor: "甘", meridians: ["心", "肝", "肺"], partUsed: "树皮", effects: ["解郁安神", "活血"], pinyin: "hehuanpi", initials: "hhp" }),
  h("albizia-flower", "合欢花", { aliases: [], nature: "平", flavor: "甘", meridians: ["心", "肝", "肺"], partUsed: "花序", effects: ["解郁安神", "理气"], pinyin: "hehuanhua", initials: "hhh" }),
  h("polygonum-multiflorum-stem", "首乌藤", { aliases: ["夜交藤"], nature: "平", flavor: "甘", meridians: ["心", "肝经"], partUsed: "藤茎", effects: ["养血安神", "祛风"], pinyin: "shouwuteng", initials: "swt", relatedForms: ["polygonum-multiflorum-raw", "polygonum-multiflorum-processed"] }),
  h("mulberry-branch", "桑枝", { aliases: [], nature: "平", flavor: "微苦", meridians: ["肝"], partUsed: "嫩枝", effects: ["利关节", "通络"], pinyin: "sangzhi", initials: "sz" }),
  h("mulberry-root-bark", "桑白皮", { aliases: [], nature: "寒", flavor: "甘", meridians: ["肺"], partUsed: "根皮", effects: ["泻肺平喘", "利水"], pinyin: "sangbaipi", initials: "sbp" }),
  h("mulberry-fruit", "桑椹", { aliases: ["桑葚", "桑甚"], nature: "寒", flavor: "甘、酸", meridians: ["心", "肝", "肾"], partUsed: "果穗", effects: ["滋阴补血", "生津"], pinyin: "sangshen", initials: "ss", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("picrorhiza-kurrooa", "胡黄连", { aliases: [], nature: "寒", flavor: "苦", meridians: ["肝", "胃", "大肠"], partUsed: "根茎", effects: ["退虚热", "除疳热"], pinyin: "huhuanglian", initials: "hhl" }),
  h("stellaria-dichotoma", "银柴胡", { aliases: [], nature: "微寒", flavor: "甘", meridians: ["肝", "胃"], partUsed: "根", effects: ["清虚热", "除疳热"], pinyin: "yinchaihu", initials: "ych", relatedForms: ["bupleurum-chinense"] }),
  h("scrophularia-nodosa", "玄参", { aliases: ["元参"], nature: "微寒", flavor: "甘、苦、咸", meridians: ["肺", "胃", "肾"], partUsed: "根", effects: ["清热凉血", "滋阴"], pinyin: "xuanshen", initials: "xs" }),
  h("fritillaria-ussuriensis", "平贝母", { aliases: ["平贝"], nature: "微寒", flavor: "苦", meridians: ["肺", "心"], partUsed: "鳞茎", effects: ["清热化痰", "开郁"], pinyin: "pingbeimu", initials: "pbm", relatedForms: ["fritillaria-cirrhosa", "fritillaria-thunbergii"] }),
  h("fritillaria-pallidiflora", "伊贝母", { aliases: [], nature: "微寒", flavor: "苦", meridians: ["肺", "心"], partUsed: "鳞茎", effects: ["清肺化痰", "散结"], pinyin: "yibeimu", initials: "ybm" }),
  h("fritillaria-hupehensis", "湖北贝母", { aliases: [], nature: "微寒", flavor: "微苦", meridians: ["肺", "心"], partUsed: "鳞茎", effects: ["清热化痰", "散结"], pinyin: "hubeibeimu", initials: "hbbm" }),
  h("bolbostemma-paniculatum", "土贝母", { aliases: [], nature: "凉", flavor: "苦", meridians: ["肺", "脾"], partUsed: "块茎", effects: ["解毒", "散结"], pinyin: "tubeimu", initials: "tbm" }),
  h("tripterygium-wilfordii", "雷公藤", { aliases: ["黄藤根"], nature: "寒", flavor: "苦", meridians: ["肝", "肾"], partUsed: "根及根茎", effects: ["祛风除湿", "活血"], pinyin: "leigongteng", initials: "lgt", caution: "有大毒，严禁自行使用；仅作中药信息参考。" }),
  h("erysibe-obtusifolia", "丁公藤", { aliases: [], nature: "温", flavor: "辛", meridians: ["肝", "脾", "胃"], partUsed: "藤茎", effects: ["祛风除湿", "消肿"], pinyin: "dinggongteng", initials: "dgt", caution: "有一定毒性，不可自行使用。" }),
  h("sinomenium-acutum", "青风藤", { aliases: [], nature: "温", flavor: "苦、辛", meridians: ["肝", "脾"], partUsed: "藤茎", effects: ["祛风湿", "通经络"], pinyin: "qingfengteng", initials: "qft" }),
  h("piper-kadsura", "海风藤", { aliases: [], nature: "微温", flavor: "辛、苦", meridians: ["肝"], partUsed: "藤茎", effects: ["祛风湿", "通经络"], pinyin: "haifengteng", initials: "hft" }),
  h("pinus-tabulaeformis", "油松节", { aliases: ["松节"], nature: "温", flavor: "苦、温", meridians: ["肝", "肾"], partUsed: "枝节", effects: ["祛风湿", "通络"], pinyin: "yousongjie", initials: "ysj" }),
  h("acanthopanax-gracilistylus", "五加皮", { aliases: ["南五加皮"], nature: "温", flavor: "辛、苦", meridians: ["肝", "肾"], partUsed: "根皮", effects: ["祛风湿", "补肝肾"], pinyin: "wujiapi", initials: "wjp" }),
  h("eleutherococcus-nodiflorus", "刺五加", { aliases: [], nature: "温", flavor: "辛、微苦", meridians: ["脾", "肾", "心"], partUsed: "根及根茎", effects: ["益气健脾", "补肾安神"], pinyin: "ciwujia", initials: "cwj", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("curculigo-orchioides", "仙茅", { aliases: [], nature: "热", flavor: "辛", meridians: ["肾", "肝", "脾"], partUsed: "根茎", effects: ["补肾阳", "强筋骨"], pinyin: "xianmao", initials: "xm", caution: "性热有毒倾向，不宜自行长期进补。" }),
  h("trigonella-foenum", "胡芦巴", { aliases: ["芦巴"], nature: "温", flavor: "苦", meridians: ["肾"], partUsed: "成熟种子", effects: ["温肾助阳", "散寒止痛"], pinyin: "huluba", initials: "hlb" }),
  h("hippocampus", "海马", { aliases: [], nature: "温", flavor: "甘", meridians: ["肝", "肾"], partUsed: "干燥体", effects: ["补肾壮阳", "活血"], pinyin: "haima", initials: "hm", caution: "海洋保护动物，资源受保护；仅作中药信息参考。" }),
  h("syngnathus", "海龙", { aliases: [], nature: "温", flavor: "甘、咸", meridians: ["肝", "肾"], partUsed: "干燥体", effects: ["补肾壮阳", "散结"], pinyin: "hailong", initials: "hl", caution: "海洋动物，资源受保护；仅作信息参考。" }),
  h("gecko", "蛤蚧", { aliases: [], nature: "平", flavor: "咸", meridians: ["肺", "肾"], partUsed: "干燥体", effects: ["补肺益肾", "纳气定喘"], pinyin: "gejie", initials: "gj", caution: "保护动物，应用受法规限制。" }),
  h("testudinis-plastrum", "龟板", { aliases: ["龟甲"], nature: "微寒", flavor: "甘、咸", meridians: ["肝", "肾", "心"], partUsed: "背甲及腹甲", effects: ["滋阴潜阳", "益肾"], pinyin: "guiban", initials: "gb", caution: "动物药，资源受保护；仅作信息参考。" }),
  h("trionyx-shell", "鳖甲", { aliases: [], nature: "微寒", flavor: "咸", meridians: ["肝", "肾"], partUsed: "背甲", effects: ["滋阴潜阳", "软坚"], pinyin: "biejia", initials: "bj" }),
  h("colla-corii-asini", "阿胶", { aliases: ["驴皮胶"], nature: "平", flavor: "甘", meridians: ["肺", "肝", "肾"], partUsed: "加工胶块", effects: ["补血滋阴", "润燥"], pinyin: "ejiao", initials: "ej" }),
  h("mantidis-ootheca", "桑螵蛸", { aliases: [], nature: "平", flavor: "甘、咸", meridians: ["肝", "肾"], partUsed: "卵鞘", effects: ["固精缩尿", "补肾"], pinyin: "sangpiaoxiao", initials: "spx" }),
  h("sepia-bone", "海螵蛸", { aliases: ["乌贼骨"], nature: "温", flavor: "咸、涩", meridians: ["脾", "肾"], partUsed: "内壳", effects: ["收敛止血", "涩精"], pinyin: "haipiaoxiao", initials: "hpx" }),
  h("celosia-cristata", "鸡冠花", { aliases: [], nature: "凉", flavor: "甘、涩", meridians: ["肝", "大肠"], partUsed: "花序", effects: ["收敛止血", "止带"], pinyin: "jiguanhua", initials: "jgh" }),
  h("lotus-stamen", "莲须", { aliases: ["莲蕊"], nature: "平", flavor: "甘、涩", meridians: ["心", "肾"], partUsed: "雄蕊", effects: ["固精", "清心"], pinyin: "lianxu", initials: "lx" }),
  h("lotus-receptacle", "莲房", { aliases: [], nature: "温", flavor: "苦、涩", meridians: ["肝"], partUsed: "花托", effects: ["化瘀止血", "除湿"], pinyin: "lianfang", initials: "lf" }),
  h("lotus-plumule", "莲子心", { aliases: ["莲心"], nature: "寒", flavor: "苦", meridians: ["心", "肾"], partUsed: "胚根", effects: ["清心安神", "交通心肾"], pinyin: "lianzixin", initials: "lzx" }),
  h("galla-chinensis", "五倍子", { aliases: ["倍子"], nature: "寒", flavor: "酸、涩", meridians: ["肺", "大肠", "肾"], partUsed: "虫瘿", effects: ["敛肺", "涩肠", "止汗"], pinyin: "wubeizi", initials: "wbz" }),
  h("carpesium-macrocarpum", "鹤草芽", { aliases: [], nature: "平", flavor: "苦", meridians: ["大肠", "肝"], partUsed: "地下部分", effects: ["杀虫"], pinyin: "hecaoya", initials: "hcy", caution: "有毒，不可自行使用。" }),
  h("quisqualis-seed", "使君子", { aliases: ["留求子"], nature: "温", flavor: "甘", meridians: ["脾", "胃"], partUsed: "成熟种子", effects: ["杀虫消积", "健脾"], pinyin: "shijunzi", initials: "sjz" }),
  h("canavalia-gladiata", "刀豆", { aliases: [], nature: "温", flavor: "甘", meridians: ["胃", "肾"], partUsed: "成熟种子", effects: ["温中下气", "补肾"], pinyin: "daodou", initials: "dd" }),
  h("hippophae-fruit", "沙棘", { aliases: [], nature: "温", flavor: "酸、涩", meridians: ["脾", "胃", "肺", "心"], partUsed: "成熟果实", effects: ["健脾消食", "止咳"], pinyin: "shaji", initials: "sj", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("dendrobium-officinale", "铁皮石斛", { aliases: ["铁皮枫斗"], nature: "微寒", flavor: "甘", meridians: ["胃", "肾"], partUsed: "茎", effects: ["益胃生津", "滋阴"], pinyin: "tiepishihu", initials: "tpsh", relatedForms: ["dendrobium-nobile"], officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("radix-notoginseng-flower", "三七花", { aliases: ["田七花"], nature: "凉", flavor: "甘", meridians: ["肝", "胃"], partUsed: "花序", effects: ["清热生津", "平肝"], pinyin: "sanqihua", initials: "sqh", relatedForms: ["panax-notoginseng"] }),
  h("anemarrhena-asphodeloides", "知母", { aliases: ["连母"], nature: "寒", flavor: "苦、甘", meridians: ["肺", "胃", "肾"], partUsed: "根茎", effects: ["清热泻火", "滋阴润燥"], pinyin: "zhimu", initials: "zm" }),
  h("radix-ophiopogonis", "天冬", { aliases: ["天门冬"], nature: "寒", flavor: "甘、苦", meridians: ["肺", "肾"], partUsed: "块根", effects: ["养阴润燥", "清肺"], pinyin: "tiandong", initials: "td" }),
  h("herba-dendrobii-huoshanense", "霍山石斛", { aliases: ["米斛"], nature: "微寒", flavor: "甘", meridians: ["胃", "肾"], partUsed: "茎", effects: ["益胃生津", "滋阴"], pinyin: "huoshanshihu", initials: "hssh", relatedForms: ["dendrobium-nobile", "dendrobium-officinale"] }),
  h("semen-allii-tuberosi", "韭菜子", { aliases: ["韭子"], nature: "温", flavor: "辛、甘", meridians: ["肝", "肾"], partUsed: "成熟种子", effects: ["温补肝肾", "壮阳"], pinyin: "jiucaizi", initials: "jcz" }),
  h("fructus-evodiae", "吴茱萸", { aliases: ["吴萸"], nature: "热", flavor: "辛、苦", meridians: ["肝", "脾", "胃", "肾"], partUsed: "近成熟果实", effects: ["散寒止痛", "降逆"], pinyin: "wuzhuyu", initials: "wzy", caution: "有小毒，不可自行大量食用。" }),
  h("fructus-foeniculi", "小茴香", { aliases: ["茴香"], nature: "温", flavor: "辛", meridians: ["肝", "肾", "脾", "胃"], partUsed: "成熟果实", effects: ["散寒止痛", "理气和胃"], pinyin: "xiaohuixiang", initials: "xhx", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("fructus-piperis-longi", "荜茇", { aliases: ["荜拨"], nature: "热", flavor: "辛", meridians: ["胃", "大肠"], partUsed: "近成熟或成熟果穗", effects: ["温中散寒", "下气"], pinyin: "biba", initials: "bb" }),
  h("fructus-piperis", "胡椒", { aliases: [], nature: "热", flavor: "辛", meridians: ["胃", "大肠"], partUsed: "成熟果实", effects: ["温中散寒", "下气"], pinyin: "hujiao", initials: "hj", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("ophiopogon-root-tuber", "山麦冬", { aliases: ["湖北麦冬"], nature: "微寒", flavor: "甘、微苦", meridians: ["心", "肺", "胃"], partUsed: "块根", effects: ["养阴生津", "润肺"], pinyin: "shanmaidong", initials: "smd" }),
  h("semen-coicis", "薏苡仁", { aliases: ["薏米"], nature: "凉", flavor: "甘、淡", meridians: ["脾", "胃", "肺"], partUsed: "成熟种仁", effects: ["利水渗湿", "健脾"], pinyin: "yiyiren", initials: "yyr", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" })
];

const byId = new Map();
herbs.forEach((item) => {
  if (item.summary?.includes("dup skip")) return;
  byId.set(item.id, item);
});
const finalList = [...byId.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(finalList, null, 2), "utf8");
console.log(`Wrote ${finalList.length} phase-3 herbs to ${outPath}`);
