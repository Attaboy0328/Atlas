#!/usr/bin/env node
/**
 * Phase-2 TCM herbs — common ChP 2025 entries (batch supplement).
 * Run: node scripts/seed-herbs-phase2.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "data", "tcm", "herbs-phase2.json");

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
  h("paris-polyphylla", "重楼", { aliases: ["七叶一枝花", "蚤休", "重楼根"], nature: "微寒", flavor: "苦", meridians: ["肝"], partUsed: "根状茎", effects: ["清热解毒", "消肿止痛", "凉肝定惊"], pinyin: "chonglou", initials: "cl", en: "Paris polyphylla rhizome", caution: "有小毒，不可自行大量食用；孕妇慎用。" }),
  h("panax-notoginseng", "三七", { aliases: ["田七", "参三七", "三七粉"], nature: "温", flavor: "甘、微苦", meridians: ["肝", "胃"], partUsed: "根及根茎", effects: ["散瘀止血", "消肿定痛"], pinyin: "sanqi", initials: "sq", en: "Panax notoginseng" }),
  h("ganoderma-lucidum", "灵芝", { aliases: ["赤芝", "紫芝"], nature: "平", flavor: "甘、苦", meridians: ["心", "肺", "肝", "肾"], partUsed: "子实体", effects: ["补气安神", "止咳平喘"], pinyin: "lingzhi", initials: "lz", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("cordyceps-sinensis", "冬虫夏草", { aliases: ["虫草", "冬虫草"], nature: "平", flavor: "甘", meridians: ["肺", "肾"], partUsed: "子座及幼虫尸体", effects: ["补肾益肺", "止血化痰"], pinyin: "dongchongxiacao", initials: "dcxc", caution: "贵重药材，应用受资源与法规限制，仅作信息参考。" }),
  h("smilax-glabra", "土茯苓", { aliases: ["冷饭团", "硬饭头"], nature: "平", flavor: "甘、淡", meridians: ["肝", "胃"], partUsed: "根茎", effects: ["解毒", "除湿", "通利关节"], pinyin: "tufuling", initials: "tfl" }),
  h("bletilla-striata", "白及", { aliases: ["白芨"], nature: "微寒", flavor: "苦、甘、涩", meridians: ["肺", "肝", "胃"], partUsed: "块茎", effects: ["收敛止血", "消肿生肌"], pinyin: "baiji", initials: "bj" }),
  h("belamcanda-chinensis", "射干", { aliases: ["乌扇"], nature: "寒", flavor: "苦", meridians: ["肺"], partUsed: "根茎", effects: ["清热解毒", "消痰", "利咽"], pinyin: "shegan", initials: "sg" }),
  h("clematis-chinensis", "威灵仙", { aliases: ["铁线莲"], nature: "温", flavor: "辛、咸", meridians: ["膀胱"], partUsed: "干燥根及根茎", effects: ["祛风除湿", "通络"], pinyin: "weilingxian", initials: "wlx" }),
  h("cynanchum-paniculatum", "徐长卿", { aliases: ["蓼刁竹", "逍遥竹"], nature: "温", flavor: "辛", meridians: ["肝", "胃"], partUsed: "根及根茎", effects: ["祛风", "化湿", "止痛"], pinyin: "xuchangqing", initials: "xcq" }),
  h("scutellaria-barbata", "半枝莲", { aliases: ["狭叶韩信草"], nature: "寒", flavor: "辛、苦", meridians: ["肺", "肝", "肾"], partUsed: "全草", effects: ["清热解毒", "化瘀利尿"], pinyin: "banzhilian", initials: "bzl" }),
  h("lobelia-chinensis", "半边莲", { aliases: [], nature: "寒", flavor: "辛", meridians: ["心", "小肠", "肺"], partUsed: "全草", effects: ["清热解毒", "利尿消肿"], pinyin: "banbianlian", initials: "bbl" }),
  h("sparganium-stoloniferum", "三棱", { aliases: ["黑三棱", "荆三棱"], nature: "平", flavor: "辛、苦", meridians: ["肝", "脾"], partUsed: "块茎", effects: ["破血行气", "消积"], pinyin: "sanleng", initials: "sl", caution: "破血力强，孕妇禁用；非日常食材。" }),
  h("curcuma-phaeocaulis", "莪术", { aliases: ["蓬莪术"], nature: "温", flavor: "辛、苦", meridians: ["肝", "脾"], partUsed: "根茎", effects: ["行气破血", "消积"], pinyin: "ezhu", initials: "ez", caution: "破血行气，孕妇禁用。" }),
  h("curcuma-kwangsiensis", "广西莪术", { aliases: [], nature: "温", flavor: "辛、苦", meridians: ["肝", "脾"], partUsed: "根茎", effects: ["行气破血", "消积"], pinyin: "guangxi ezhu", initials: "gxez" }),
  h("alisma-orientalis", "泽泻", { aliases: [], nature: "寒", flavor: "甘、淡", meridians: ["肾", "膀胱"], partUsed: "块茎", effects: ["利水渗湿", "泄热"], pinyin: "zexie", initials: "zx" }),
  h("polyporus-umbellatus", "猪苓", { aliases: [], nature: "平", flavor: "甘、淡", meridians: ["肾", "膀胱"], partUsed: "菌核", effects: ["利水渗湿"], pinyin: "zhuling", initials: "zl" }),
  h("gallus-domesticus-membrane", "鸡内金", { aliases: ["鸡肫内黄皮"], nature: "平", flavor: "甘", meridians: ["脾", "胃", "小肠", "膀胱"], partUsed: "砂囊内壁", effects: ["健胃消食", "涩精止遗"], pinyin: "jineijin", initials: "jnj" }),
  h("crataegus-pinnatifida", "山楂", { aliases: ["山里红", "红果"], nature: "微温", flavor: "酸、甘", meridians: ["脾", "胃", "肝"], partUsed: "成熟果实", effects: ["消食健胃", "行气散瘀"], pinyin: "shanzha", initials: "sz", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("massa-medicata-fermentata", "神曲", { aliases: ["六神曲"], nature: "温", flavor: "甘、辛", meridians: ["脾", "胃"], partUsed: "发酵加工品", effects: ["消食和胃"], pinyin: "shenqu", initials: "sq" }),
  h("hordeum-vulgare-sprout", "麦芽", { aliases: ["大麦芽"], nature: "平", flavor: "甘", meridians: ["脾", "胃", "肝"], partUsed: "成熟果实经发芽干燥", effects: ["行气消食", "健脾开胃"], pinyin: "maiya", initials: "my" }),
  h("oryza-sativa-sprout", "谷芽", { aliases: ["稻芽"], nature: "温", flavor: "甘", meridians: ["脾", "胃"], partUsed: "成熟果实经发芽干燥", effects: ["消食和中", "健脾开胃"], pinyin: "guya", initials: "gy" }),
  h("raphanus-sativus-seed", "莱菔子", { aliases: ["萝卜子"], nature: "平", flavor: "辛、甘", meridians: ["肺", "脾", "胃"], partUsed: "成熟种子", effects: ["消食除胀", "降气化痰"], pinyin: "laifuzi", initials: "lfz" }),
  h("sappan-wood", "苏木", { aliases: [], nature: "平", flavor: "甘、咸", meridians: ["心", "肝", "脾"], partUsed: "心材", effects: ["活血祛瘀", "消肿止痛"], pinyin: "sumu", initials: "sm" }),
  h("pollen-typhae", "蒲黄", { aliases: [], nature: "平", flavor: "甘", meridians: ["肝", "心"], partUsed: "花粉", effects: ["止血", "化瘀", "通淋"], pinyin: "puhuang", initials: "ph" }),
  h("lotus-rhizome-node", "藕节", { aliases: ["藕节炭"], nature: "平", flavor: "甘、涩", meridians: ["肝", "肺", "胃"], partUsed: "根茎节部", effects: ["收敛止血", "化瘀"], pinyin: "oujie", initials: "oj" }),
  h("artemisia-argyi", "艾叶", { aliases: ["艾蒿", "灸草"], nature: "温", flavor: "辛、苦", meridians: ["肝", "脾", "肾"], partUsed: "叶", effects: ["温经止血", "散寒止痛"], pinyin: "aiye", initials: "ay" }),
  h("platycladus-leaf", "侧柏叶", { aliases: ["柏叶"], nature: "寒", flavor: "苦、涩", meridians: ["肺", "肝", "大肠"], partUsed: "枝梢及叶", effects: ["凉血止血", "化痰止咳"], pinyin: "cebanye", initials: "cby" }),
  h("lonicera-stem", "忍冬藤", { aliases: ["金银藤"], nature: "寒", flavor: "甘", meridians: ["肺", "胃"], partUsed: "干燥茎枝", effects: ["清热解毒", "通络"], pinyin: "rendongteng", initials: "rdt" }),
  h("trachelospermum-jasminoides", "络石藤", { aliases: [], nature: "微寒", flavor: "苦", meridians: ["心", "肝", "肾"], partUsed: "干燥带叶茎藤", effects: ["祛风通络", "凉血消肿"], pinyin: "luoshiteng", initials: "lst" }),
  h("taxillus-chinensis", "桑寄生", { aliases: [], nature: "平", flavor: "苦、甘", meridians: ["肝", "肾"], partUsed: "带叶茎枝", effects: ["祛风湿", "补肝肾", "强筋骨"], pinyin: "sangjisheng", initials: "sjs" }),
  h("viscum-coloratum", "槲寄生", { aliases: [], nature: "平", flavor: "苦", meridians: ["肝", "肾"], partUsed: "带叶茎枝", effects: ["祛风湿", "补肝肾", "强筋骨"], pinyin: "hujisheng", initials: "hjs" }),
  h("homalomena-rhizome", "千年健", { aliases: [], nature: "温", flavor: "苦、辛", meridians: ["肝", "肾"], partUsed: "根茎", effects: ["祛风湿", "强筋骨"], pinyin: "qiannianjian", initials: "qnj" }),
  h("lycopodium-clavatum", "伸筋草", { aliases: ["石松"], nature: "温", flavor: "微苦、辛", meridians: ["肝", "脾", "肾"], partUsed: "干燥全草", effects: ["祛风除湿", "舒筋活络"], pinyin: "shenjincao", initials: "sjc" }),
  h("luffa-fasciculus", "丝瓜络", { aliases: [], nature: "平", flavor: "甘", meridians: ["肺", "胃", "肝"], partUsed: "成熟果实维管束", effects: ["通经活络", "凉血解毒"], pinyin: "sigualuo", initials: "sgl" }),
  h("drynaria-fortunei", "骨碎补", { aliases: ["猴姜", "毛姜"], nature: "温", flavor: "苦", meridians: ["肝", "肾"], partUsed: "根茎", effects: ["疗伤止痛", "强筋骨", "消瘀"], pinyin: "gusuibu", initials: "gsb" }),
  h("pyrola-herb", "鹿衔草", { aliases: ["肺筋草"], nature: "温", flavor: "甘、苦", meridians: ["肝", "肾"], partUsed: "全草", effects: ["祛风湿", "强筋骨", "止血"], pinyin: "luxiancao", initials: "lxc" }),
  h("gentiana-macrophylla", "秦艽", { aliases: ["秦胶"], nature: "平", flavor: "辛、苦", meridians: ["胃", "肝", "胆"], partUsed: "根", effects: ["祛风湿", "清湿热", "止痹痛"], pinyin: "qinjiao", initials: "qj" }),
  h("stephania-tetrandra", "防己", { aliases: ["粉防己"], nature: "寒", flavor: "苦", meridians: ["膀胱", "肺"], partUsed: "根", effects: ["祛风止痛", "利水消肿"], pinyin: "fangji", initials: "fj" }),
  h("polygonatum-sibiricum", "黄精", { aliases: ["鸡头黄精"], nature: "平", flavor: "甘", meridians: ["脾", "肺", "肾"], partUsed: "根茎", effects: ["补气养阴", "健脾", "润肺", "益肾"], pinyin: "huangjing", initials: "hj", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("dioscorea-hypoglauca", "粉萆薢", { aliases: ["萆薢"], nature: "平", flavor: "苦", meridians: ["肾", "胃", "膀胱"], partUsed: "根茎", effects: ["利湿去浊", "祛风"], pinyin: "fenbixie", initials: "fbx" }),
  h("smilax-china", "菝葜", { aliases: ["金刚藤"], nature: "平", flavor: "甘、微苦、涩", meridians: ["肝", "胃", "肾"], partUsed: "根茎", effects: ["祛风利湿", "解毒"], pinyin: "bajie", initials: "bq" }),
  h("lonicera-bud", "山银花", { aliases: ["土银花"], nature: "寒", flavor: "甘", meridians: ["肺", "心", "胃"], partUsed: "花蕾或初开的花", effects: ["清热解毒", "疏散风热"], pinyin: "shanyinhua", initials: "syh" }),
  h("artemisia-annua", "青蒿", { aliases: ["黄花蒿"], nature: "寒", flavor: "苦、辛", meridians: ["肝", "胆"], partUsed: "地上部分", effects: ["清虚热", "除骨蒸", "解暑"], pinyin: "qinghao", initials: "qh" }),
  h("lycium-root-bark", "地骨皮", { aliases: ["枸杞根皮"], nature: "寒", flavor: "甘", meridians: ["肺", "肝", "肾"], partUsed: "根皮", effects: ["凉血除蒸", "清肺降火"], pinyin: "digupi", initials: "dgp" }),
  h("lophatherum-gracile-stem", "淡竹茹", { aliases: ["竹茹"], nature: "微寒", flavor: "甘", meridians: ["肺", "胃"], partUsed: "茎的中间层", effects: ["清热化痰", "除烦止呕"], pinyin: "danzhuru", initials: "dzr" }),
  h("inula-japonica", "旋覆花", { aliases: ["金佛草"], nature: "温", flavor: "苦、辛、咸", meridians: ["肺", "脾", "胃", "大肠"], partUsed: "头状花序", effects: ["降气", "消痰", "行水"], pinyin: "xuanfuhua", initials: "xfh" }),
  h("arisaema-erubescens", "天南星", { aliases: ["南星"], nature: "温", flavor: "苦、辛", meridians: ["肺", "肝", "脾"], partUsed: "块茎", effects: ["燥湿化痰", "祛风止痉"], pinyin: "tiannanxing", initials: "tnx", caution: "有毒，需炮制后入药，不可生食。" }),
  h("typhonium-giganteum", "白附子", { aliases: ["禹白附"], nature: "温", flavor: "辛", meridians: ["胃", "肝"], partUsed: "块茎", effects: ["祛风痰", "定惊搐", "解毒"], pinyin: "baifuzi", initials: "bfz", caution: "有毒，需炮制，不可自行食用。" }),
  h("pinellia-prep", "姜半夏", { aliases: ["制半夏", "法半夏"], nature: "温", flavor: "辛", meridians: ["脾", "胃", "肺"], partUsed: "块茎（姜制）", effects: ["燥湿化痰", "降逆止呕"], pinyin: "jiangbanxia", initials: "jbx", relatedForms: ["pinellia-ternata"], caution: "炮制品种，仍须按医嘱使用。" }),
  h("talc-granule", "青黛", { aliases: [], nature: "寒", flavor: "咸", meridians: ["肺", "肝", "胃"], partUsed: "叶或茎叶加工品", effects: ["清热解毒", "凉血消斑"], pinyin: "qingdai", initials: "qd" }),
  h("areca-seed", "槟榔", { aliases: ["大腹子"], nature: "温", flavor: "苦、辛", meridians: ["胃", "大肠"], partUsed: "成熟种子", effects: ["杀虫", "消积", "行气", "利水"], pinyin: "binglang", initials: "bl", caution: "不宜长期大量嚼食；部分人群慎用。" }),
  h("torreya-seed", "榧子", { aliases: ["香榧"], nature: "平", flavor: "甘", meridians: ["肺", "胃", "大肠"], partUsed: "成熟种子", effects: ["杀虫消积", "润燥通便"], pinyin: "feizi", initials: "fz" }),
  h("carpesium-abrotanoides", "鹤虱", { aliases: [], nature: "平", flavor: "苦、涩", meridians: ["脾", "胃"], partUsed: "成熟果实", effects: ["杀虫消积"], pinyin: "heshi", initials: "hs" }),
  h("cucurbita-pepo-seed", "南瓜子", { aliases: [], nature: "平", flavor: "甘", meridians: ["胃", "大肠"], partUsed: "成熟种子", effects: ["杀虫", "消积"], pinyin: "nanguazi", initials: "ngz" }),
  h("cyrtomium-fortunei", "贯众", { aliases: ["绵马贯众"], nature: "微寒", flavor: "苦", meridians: ["肝", "胃"], partUsed: "根茎及叶柄残基", effects: ["清热解毒", "驱虫"], pinyin: "guanzhong", initials: "gz" }),
  h("pulsatilla-chinensis", "白头翁", { aliases: [], nature: "寒", flavor: "苦", meridians: ["胃", "大肠"], partUsed: "根", effects: ["清热解毒", "凉血止痢"], pinyin: "baitouweng", initials: "btww" }),
  h("phellodendron-amurense", "关黄柏", { aliases: ["黄柏"], nature: "寒", flavor: "苦", meridians: ["肾", "膀胱", "大肠"], partUsed: "树皮", effects: ["清热燥湿", "泻火除蒸"], pinyin: "guanhuangbai", initials: "ghb", relatedForms: ["phellodendron-chinense"] }),
  h("aconitum-carmichaelii-mother", "川乌", { aliases: ["乌头"], nature: "热", flavor: "辛、苦", meridians: ["心", "肝", "肾", "脾"], partUsed: "母根", effects: ["祛风除湿", "温经止痛"], pinyin: "chuanwu", initials: "cw", caution: "有大毒，必须炮制，严禁自行使用。" }),
  h("aconitum-kusnezoffii", "草乌", { aliases: [], nature: "热", flavor: "辛、苦", meridians: ["心", "肝", "肾", "脾"], partUsed: "块根", effects: ["祛风除湿", "温经止痛"], pinyin: "caowu", initials: "cw", caution: "有大毒，必须炮制，严禁自行使用。" }),
  h("lateral-root-aconiti", "附子", { aliases: ["黑顺片", "白附片"], nature: "热", flavor: "辛、甘", meridians: ["心", "肾", "脾"], partUsed: "子根加工品", effects: ["回阳救逆", "补火助阳"], pinyin: "fuzi", initials: "fz", caution: "有大毒，必须炮制，严禁自行作为食材使用。" }),
  h("bamboo-sap", "竹沥", { aliases: [], nature: "寒", flavor: "甘", meridians: ["心", "肝", "肺"], partUsed: "火烤沥出液", effects: ["清热滑痰", "定惊"], pinyin: "zhuli", initials: "zl" }),
  h("trichosanthes-fruit", "瓜蒌", { aliases: ["全瓜蒌"], nature: "寒", flavor: "甘、微苦", meridians: ["肺", "胃", "大肠"], partUsed: "成熟果实", effects: ["清热涤痰", "宽胸散结"], pinyin: "gualou", initials: "gl", relatedForms: ["trichosanthus-root"] }),
  h("trichosanthes-seed", "瓜蒌子", { aliases: ["瓜蒌仁"], nature: "寒", flavor: "甘", meridians: ["肺", "胃", "大肠"], partUsed: "成熟种子", effects: ["润肺化痰", "滑肠通便"], pinyin: "gualouzi", initials: "glz" }),
  h("trichosanthes-peel", "瓜蒌皮", { aliases: [], nature: "寒", flavor: "甘", meridians: ["肺", "胃"], partUsed: "成熟果皮", effects: ["清热化痰", "宽胸散结"], pinyin: "gualoupi", initials: "glp" }),
  h("psoralea-corylifolia", "补骨脂", { aliases: ["破故纸"], nature: "温", flavor: "辛、苦", meridians: ["肾", "脾"], partUsed: "成熟果实", effects: ["温肾助阳", "纳气平喘"], pinyin: "buguzhi", initials: "bgz" }),
  h("rubus-chingii", "覆盆子", { aliases: [], nature: "温", flavor: "甘、酸", meridians: ["肝", "肾", "膀胱"], partUsed: "果实", effects: ["益肾", "固精", "缩尿"], pinyin: "fupenzi", initials: "fpz" }),
  h("rosa-laevigata", "金樱子", { aliases: [], nature: "平", flavor: "酸、甘、涩", meridians: ["肾", "膀胱", "大肠"], partUsed: "成熟果实", effects: ["固精缩尿", "涩肠止泻"], pinyin: "jinyingzi", initials: "jyz" }),
  h("euryale-seed", "芡实", { aliases: ["鸡头米"], nature: "平", flavor: "甘、涩", meridians: ["脾", "肾"], partUsed: "成熟种仁", effects: ["益肾固精", "补脾止泻"], pinyin: "qianshi", initials: "qs", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("lophatherum-seed", "沙苑子", { aliases: ["沙苑蒺藜"], nature: "温", flavor: "甘", meridians: ["肝", "肾"], partUsed: "成熟种子", effects: ["补肾助阳", "固精", "养肝明目"], pinyin: "shayuanzi", initials: "syz" }),
  h("lignum-dracontomelon", "龙血竭", { aliases: ["血竭"], nature: "平", flavor: "甘、咸", meridians: ["心", "肝"], partUsed: "树脂", effects: ["活血定痛", "化瘀止血"], pinyin: "longxuejie", initials: "lxj" }),
  h("pteropus", "夜明砂", { aliases: [], nature: "寒", flavor: "辛", meridians: ["肝"], partUsed: "粪便", effects: ["清肝明目", "散瘀"], pinyin: "yemingsha", initials: "yms" }),
  h("earthworm", "地龙", { aliases: ["广地龙"], nature: "寒", flavor: "咸", meridians: ["肝", "脾", "膀胱"], partUsed: "干燥体", effects: ["清热定惊", "通络"], pinyin: "dilong", initials: "dl", caution: "动物药，非食材，仅作中药参考。" }),
  h("scorpion", "全蝎", { aliases: [], nature: "平", flavor: "辛", meridians: ["肝"], partUsed: "干燥体", effects: ["息风镇痉", "通络止痛"], pinyin: "quanxie", initials: "qx", caution: "有小毒，非食材。" }),
  h("leech", "水蛭", { aliases: ["蚂蟥"], nature: "平", flavor: "咸、苦", meridians: ["肝"], partUsed: "干燥体", effects: ["破血通经", "逐瘀消癥"], pinyin: "shuizhi", initials: "sz", caution: "破血力强，孕妇禁用；非食材。" }),
  h("silkworm", "僵蚕", { aliases: ["白僵蚕"], nature: "平", flavor: "咸、辛", meridians: ["肝", "肺"], partUsed: "死虫体", effects: ["息风止痉", "祛风止痛"], pinyin: "jiangcan", initials: "jc" }),
  h("centipede", "蜈蚣", { aliases: [], nature: "温", flavor: "辛", meridians: ["肝"], partUsed: "干燥体", effects: ["息风镇痉", "通络止痛"], pinyin: "wugong", initials: "wg", caution: "有毒，非食材。" }),
  h("eupolyphaga", "土鳖虫", { aliases: ["地鳖虫", "䗪虫"], nature: "寒", flavor: "咸", meridians: ["肝"], partUsed: "雌虫干燥体", effects: ["破血逐瘀", "续筋接骨"], pinyin: "tubiechong", initials: "tbc", caution: "破血药，孕妇禁用。" }),
  h("margarita", "珍珠母", { aliases: [], nature: "寒", flavor: "咸", meridians: ["肝", "心"], partUsed: "贝壳", effects: ["平肝潜阳", "安神"], pinyin: "zhenzhumu", initials: "zzm" }),
  h("haematite", "赭石", { aliases: [], nature: "寒", flavor: "苦", meridians: ["肝", "心"], partUsed: "矿物", effects: ["平肝潜阳", "降逆", "止血"], pinyin: "zheshi", initials: "zs", caution: "矿物药，非食材。" }),
  h("magnetite", "磁石", { aliases: [], nature: "寒", flavor: "咸", meridians: ["心", "肝", "肾"], partUsed: "矿物", effects: ["镇惊安神", "平肝潜阳"], pinyin: "cishi", initials: "cs", caution: "矿物药，非食材。" }),
  h("amber", "琥珀", { aliases: [], nature: "平", flavor: "甘", meridians: ["心", "肝", "膀胱"], partUsed: "树脂化石", effects: ["镇惊安神", "活血散瘀"], pinyin: "hupo", initials: "hp" }),
  h("fluorite", "紫石英", { aliases: [], nature: "温", flavor: "甘", meridians: ["心", "肾"], partUsed: "矿物", effects: ["温肺肾", "安心神"], pinyin: "zishiying", initials: "zsy", caution: "矿物药，非食材。" }),
  h("gypsum", "石膏", { aliases: ["生石膏"], nature: "大寒", flavor: "辛、甘", meridians: ["肺", "胃"], partUsed: "矿物", effects: ["清热泻火", "除烦止渴"], pinyin: "shigao", initials: "sg", caution: "矿物药，非食材。" }),
  h("mirabilite-prep", "玄明粉", { aliases: ["元明粉"], nature: "寒", flavor: "咸、苦", meridians: ["胃", "大肠"], partUsed: "芒硝加工品", effects: ["泻下", "润燥", "软坚"], pinyin: "xuanmingfen", initials: "xmf", caution: "泻下药，不可自行食用。" }),
  h("realgar", "雄黄", { aliases: [], nature: "温", flavor: "辛", meridians: ["肝", "大肠"], partUsed: "矿物", effects: ["解毒", "杀虫"], pinyin: "xionghuang", initials: "xh", caution: "有毒矿物，严禁自行使用。" }),
  h("cinnabar", "朱砂", { aliases: [], nature: "微寒", flavor: "甘", meridians: ["心"], partUsed: "矿物", effects: ["清心镇惊", "安神"], pinyin: "zhusha", initials: "zs", caution: "含汞，有毒，严禁自行使用。" }),
  h("calamine", "炉甘石", { aliases: [], nature: "平", flavor: "甘", meridians: ["肝"], partUsed: "矿物", effects: ["解毒明目", "收湿止痒"], pinyin: "luganshi", initials: "lgs", caution: "矿物药，外用为主，非食材。" }),
  h("pumice", "海浮石", { aliases: [], nature: "寒", flavor: "咸", meridians: ["肺"], partUsed: "火山玻璃", effects: ["清热化痰", "软坚"], pinyin: "haifushi", initials: "hfs" }),
  h("arc-shell", "瓦楞子", { aliases: [], nature: "平", flavor: "咸", meridians: ["肺", "胃", "肝"], partUsed: "贝壳", effects: ["消痰化瘀", "软坚散结"], pinyin: "walengzi", initials: "wlz" }),
  h("clam-shell", "海蛤壳", { aliases: [], nature: "寒", flavor: "苦、咸", meridians: ["肺", "肾"], partUsed: "贝壳", effects: ["清热化痰", "软坚"], pinyin: "hageke", initials: "hgk" }),
  h("ostrea-calcined", "煅牡蛎", { aliases: [], nature: "微寒", flavor: "咸", meridians: ["肝", "胆", "肾"], partUsed: "煅制贝壳", effects: ["重镇安神", "敛阴"], pinyin: "duanmuli", initials: "dml", relatedForms: ["concha-ostreae"] }),
  h("dragon-bone-calcined", "煅龙骨", { aliases: [], nature: "平", flavor: "甘、涩", meridians: ["心", "肝", "肾"], partUsed: "煅制骨骼化石", effects: ["镇惊安神", "收敛固涩"], pinyin: "duanlonggu", initials: "dlg", relatedForms: ["os-draconis"] }),
  h("radix-gentianae", "龙胆", { aliases: ["龙胆草"], nature: "寒", flavor: "苦", meridians: ["胆", "肝"], partUsed: "根及根茎", effects: ["清热燥湿", "泻肝胆火"], pinyin: "longdan", initials: "ld" })
];

const byId = new Map();
herbs.forEach((item) => {
  if (item.summary?.includes("dup skip")) return;
  byId.set(item.id, item);
});
const finalList = [...byId.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(finalList, null, 2), "utf8");
console.log(`Wrote ${finalList.length} phase-2 herbs to ${outPath}`);
