#!/usr/bin/env node
/**
 * Expand herbs-chp2025.json with ChP 2025 entries missing from the 510-name baseline.
 * Run: node scripts/expand-chp2025-catalog.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "data", "tcm", "herbs-chp2025.json");
const CHP = "《中华人民共和国药典》2025年版";
const DEFAULT_CAUTION =
  "非药食同源条目仅作中药信息参考，不替代诊断、处方或药典医嘱；自行配膳前请咨询专业人士。";

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
    caution = DEFAULT_CAUTION,
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
    summary:
      summary ||
      `${name}为《中国药典》2025年版收载品种，传统整理常作${effects.slice(0, 2).join("、") || "调护"}方向参考。`,
    caution,
    sources: sources.length ? sources : [{ title: CHP, summary: `收载于${CHP}，正名「${name}」。` }],
    regions: ["CN"],
    searchTerms: [pinyin, initials, ...aliases].filter(Boolean)
  };
}

/** ~130 ChP 2025 herbs not present in the 510-name baseline (checked by 正名). */
const NEW_HERBS = [
  h("solidago-virgaurea", "一枝黄花", { nature: "温", flavor: "辛、苦", meridians: ["肺", "肝"], partUsed: "地上部分", effects: ["清热解毒", "疏散风热"], pinyin: "yizhihuanghua", initials: "yzhh" }),
  h("caryophylli-flos", "丁香", { nature: "温", flavor: "辛", meridians: ["脾", "胃", "肺", "肾"], partUsed: "花蕾", effects: ["温中降逆", "补肾助阳"], pinyin: "dingxiang", initials: "dx" }),
  h("saururus-chinensis", "三白草", { nature: "寒", flavor: "甘、辛", meridians: ["肺", "膀胱"], partUsed: "地上部分", effects: ["利尿消肿", "清热解毒"], pinyin: "sanbaicao", initials: "sbc" }),
  h("berberis-plants", "三颗针", { nature: "寒", flavor: "苦", meridians: ["胃", "肝", "大肠"], partUsed: "根及根茎", effects: ["清热燥湿", "泻火解毒"], pinyin: "sankezhen", initials: "skz" }),
  h("lindera-aggregata", "乌药", { nature: "温", flavor: "辛", meridians: ["肺", "脾", "肾", "膀胱"], partUsed: "块根", effects: ["行气止痛", "温肾散寒"], pinyin: "wuyao", initials: "wy" }),
  h("murraya-paniculata", "九里香", { nature: "温", flavor: "辛、苦", meridians: ["肝", "胃"], partUsed: "叶及带叶嫩枝", effects: ["行气活血", "止痛"], pinyin: "jiulixiang", initials: "jlx" }),
  h("coriolus-versicolor", "云芝", { nature: "平", flavor: "甘", meridians: ["心", "脾", "肝", "肾"], partUsed: "子实体", effects: ["健脾利湿", "解毒"], pinyin: "yunzhi", initials: "yz" }),
  h("panax-ginseng-leaf", "人参叶", { nature: "寒", flavor: "苦、甘", meridians: ["肺", "胃"], partUsed: "叶", effects: ["解暑", "生津"], pinyin: "renshenye", initials: "rsy" }),
  h("illicium-verum", "八角茴香", { aliases: ["大料"], nature: "温", flavor: "辛", meridians: ["肝", "肾", "脾", "胃"], partUsed: "成熟果实", effects: ["温阳散寒", "理气止痛"], pinyin: "bajiaohuixiang", initials: "bjhx", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("akebia-trifoliata", "八月札", { aliases: ["预知子"], nature: "寒", flavor: "苦", meridians: ["肝", "胃"], partUsed: "成熟果实", effects: ["疏肝理气", "活血止痛"], pinyin: "bayuezha", initials: "byz" }),
  h("torreya-pest", "芜荑", { nature: "温", flavor: "辛、苦", meridians: ["脾", "胃", "大肠"], partUsed: "成熟种子仁", effects: ["杀虫", "消积"], pinyin: "wuyi", initials: "wy" }),
  h("ziziphus-mongolica", "广枣", { nature: "平", flavor: "甘、酸", meridians: ["脾", "肝", "胆"], partUsed: "成熟果实", effects: ["行气活血", "养心安神"], pinyin: "guangzao", initials: "gz" }),
  h("cimicifuga-foetida", "广升麻", { nature: "微寒", flavor: "辛、微甘", meridians: ["肺", "脾", "胃", "大肠"], partUsed: "根茎", effects: ["发表透疹", "清热解毒"], pinyin: "guangshengma", initials: "gsm", relatedForms: ["cimicifuga-heracleifolia"] }),
  h("arisaema-prep", "制天南星", { nature: "温", flavor: "苦、辛", meridians: ["肺", "肝", "脾"], partUsed: "块茎（炮制）", effects: ["燥湿化痰", "祛风止痉"], pinyin: "zhitiannanxing", initials: "ztnx", relatedForms: ["arisaema-erubescens"], caution: "有毒，需炮制，不可自行食用。" }),
  h("entada-phaseoloides", "榼藤子", { nature: "平", flavor: "苦", meridians: ["肝", "胃"], partUsed: "成熟种子", effects: ["祛风除湿", "消肿"], pinyin: "ketengzi", initials: "ktz" }),
  h("trachycarpus-fortunei", "棕榈", { nature: "平", flavor: "苦、涩", meridians: ["肺", "肝", "大肠"], partUsed: "叶柄", effects: ["收敛止血"], pinyin: "zonglv", initials: "zl", relatedForms: ["petiolus-trachycarpi"] }),
  h("trachycarpus-fruit", "棕榈子", { nature: "平", flavor: "苦、涩", meridians: ["大肠", "肺"], partUsed: "成熟种子", effects: ["收敛止血", "涩肠"], pinyin: "zonglvzi", initials: "zlz" }),
  h("quercus-acorn", "橡实", { nature: "温", flavor: "涩", meridians: ["大肠"], partUsed: "成熟果实", effects: ["涩肠", "止血"], pinyin: "xiangshi", initials: "xs" }),
  h("vladimiria-souliei", "川木香", { nature: "温", flavor: "辛、苦", meridians: ["脾", "胃", "大肠", "胆"], partUsed: "根", effects: ["行气止痛", "健脾消食"], pinyin: "chuanmuxiang", initials: "cmx", relatedForms: ["aucklandia-lappa"] }),
  h("inula-helenium", "土木香", { nature: "温", flavor: "辛、苦", meridians: ["脾", "胃", "大肠", "胆"], partUsed: "根", effects: ["健脾和胃", "调气解郁"], pinyin: "tumuxiang", initials: "tmx" }),
  h("santalum-album", "檀香", { nature: "温", flavor: "辛", meridians: ["脾", "胃", "心", "肺"], partUsed: "心材", effects: ["行气止痛", "散寒"], pinyin: "tanxiang", initials: "tx" }),
  h("sargentodoxa-parviflora", "小血藤", { nature: "平", flavor: "苦", meridians: ["大肠", "肝"], partUsed: "藤茎", effects: ["清热解毒", "活血"], pinyin: "xiaoxueteng", initials: "xxt", relatedForms: ["sargentodoxa-cuneata"] }),
  h("tetrapanax-papyrifer-small", "小通草", { nature: "微寒", flavor: "淡", meridians: ["肺", "胃"], partUsed: "茎髓", effects: ["通乳", "利尿"], pinyin: "xiaotongcao", initials: "xtc", relatedForms: ["tetrapanax-papyrifer"] }),
  h("akebia-quinata-fruit", "预知子", { aliases: ["八月札"], nature: "寒", flavor: "苦", meridians: ["肝", "胃", "膀胱"], partUsed: "成熟果实", effects: ["疏肝理气", "活血止痛"], pinyin: "yuzhizi", initials: "yzz", relatedForms: ["akebia-trifoliata"] }),
  h("placenta-hominis", "紫河车", { nature: "温", flavor: "甘、咸", meridians: ["肺", "肝", "肾"], partUsed: "干燥胎盘", effects: ["温肾补精", "益气养血"], pinyin: "ziheche", initials: "zhc", caution: "特殊来源药材，应用受法规限制；仅作信息参考。" }),
  h("chinemys-reevesii", "龟甲", { aliases: ["龟板"], nature: "微寒", flavor: "甘、咸", meridians: ["肝", "肾", "心"], partUsed: "背甲及腹甲", effects: ["滋阴潜阳", "益肾健骨"], pinyin: "guijia", initials: "gj", relatedForms: ["testudo-membranacea"] }),
  h("ranunculus-ternatus", "猫爪草", { nature: "平", flavor: "甘、辛", meridians: ["肺", "肝"], partUsed: "块根", effects: ["化痰散结", "解毒消肿"], pinyin: "maozhuacao", initials: "mzc" }),
  h("bambusae-caulis-in-taeniam", "竹茹", { nature: "微寒", flavor: "甘", meridians: ["肺", "胃"], partUsed: "茎的中间层", effects: ["清热化痰", "除烦止呕"], pinyin: "zhuru", initials: "zr", relatedForms: ["lophatherum-gracile-stem"] }),
  h("bamboo-silicea", "天竺黄", { nature: "寒", flavor: "甘", meridians: ["心", "肝"], partUsed: "竹类分泌物干燥物", effects: ["清热豁痰", "清心定惊"], pinyin: "tianzhuhuang", initials: "tzh" }),
  h("chlorite-mineral", "礞石", { nature: "平", flavor: "甘、咸", meridians: ["肺", "心", "肝"], partUsed: "矿物", effects: ["坠痰", "平肝"], pinyin: "mengshi", initials: "ms", relatedForms: ["chlorite-gold"], caution: "矿物药，非食材。" }),
  h("microcos-paniculata", "布渣叶", { aliases: ["破布叶"], nature: "微寒", flavor: "酸", meridians: ["脾", "胃"], partUsed: "叶", effects: ["消食", "清热"], pinyin: "buzhaye", initials: "bzy" }),
  h("alum-explicit", "明矾", { aliases: ["白矾", "钾明矾"], nature: "寒", flavor: "酸、涩", meridians: ["肺", "脾", "肝", "大肠"], partUsed: "矿物", effects: ["外用解毒", "燥湿止痒"], pinyin: "mingfan", initials: "mf", relatedForms: ["alum"], caution: "矿物药，内服需医嘱，不可自行大量使用。" }),
  h("stellera-chamaejasme-radix", "华山参", { nature: "温", flavor: "甘、微苦", meridians: ["肺", "心"], partUsed: "根", effects: ["温肺平喘", "安神"], pinyin: "huashancan", initials: "hsc", caution: "有毒，不可自行使用。" }),
  h("isatis-indigotica-south", "南板蓝根", { nature: "寒", flavor: "苦", meridians: ["心", "胃"], partUsed: "根", effects: ["清热解毒", "凉血"], pinyin: "nanbanlangen", initials: "nblg", relatedForms: ["isatis-indigotica"] }),
  h("selaginella-tamariscina", "卷柏", { nature: "平", flavor: "辛", meridians: ["肝", "心"], partUsed: "全草", effects: ["活血通经", "止血"], pinyin: "juanbai", initials: "jb" }),
  h("mallotus-philippensis", "大叶紫珠", { nature: "平", flavor: "苦、涩", meridians: ["肝", "肺", "胃"], partUsed: "叶", effects: ["收敛止血", "解毒"], pinyin: "dayezizhu", initials: "dyzz" }),
  h("jujube-fruit-dried", "大枣", { nature: "温", flavor: "甘", meridians: ["脾", "胃"], partUsed: "成熟果实", effects: ["补中益气", "养血安神"], pinyin: "dazao", initials: "dz", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("garlic-bulb", "大蒜", { nature: "温", flavor: "辛", meridians: ["脾", "胃", "肺"], partUsed: "鳞茎", effects: ["解毒", "杀虫"], pinyin: "dasuan", initials: "ds", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("cirsium-japonicum", "大蓟", { nature: "凉", flavor: "甘、苦", meridians: ["心", "肝"], partUsed: "地上部分", effects: ["凉血止血", "散瘀解毒"], pinyin: "daji", initials: "dj" }),
  h("cirsium-japonicum-carbon", "大蓟炭", { nature: "凉", flavor: "甘、苦", meridians: ["心", "肝"], partUsed: "地上部分炭", effects: ["凉血止血"], pinyin: "dajitan", initials: "djt", relatedForms: ["cirsium-japonicum"] }),
  h("halite-blue", "大青盐", { nature: "寒", flavor: "咸", meridians: ["肾", "膀胱", "心", "肝"], partUsed: "矿物", effects: ["清热", "凉血", "明目"], pinyin: "daqingyan", initials: "dqy", caution: "矿物药，非食材。" }),
  h("hyoscyamus-niger", "天仙子", { nature: "大温", flavor: "苦、辛", meridians: ["心", "肝", "胃"], partUsed: "成熟种子", effects: ["解痉止痛", "平喘"], pinyin: "tianxianzi", initials: "txz", caution: "有大毒，严禁自行使用。" }),
  h("semiaquilegia-adoxoides", "天葵子", { nature: "寒", flavor: "甘、苦", meridians: ["肝", "肾"], partUsed: "块根", effects: ["清热解毒", "消肿散结"], pinyin: "tiankuizi", initials: "tkz" }),
  h("borneolum-natural", "天然冰片", { aliases: ["右旋龙脑"], nature: "微寒", flavor: "辛、苦", meridians: ["心", "脾", "肺"], partUsed: "结晶", effects: ["开窍醒神", "清热止痛"], pinyin: "tianranbingpian", initials: "trbp", relatedForms: ["borneolum-synthetic"] }),
  h("akebia-trifoliata-seed", "娑罗子", { nature: "温", flavor: "甘", meridians: ["胃", "肝"], partUsed: "成熟种子", effects: ["疏肝和胃", "理气"], pinyin: "suoluozi", initials: "slz" }),
  h("podophyllum-hexandrum", "小叶莲", { nature: "凉", flavor: "苦", meridians: ["肺", "肝"], partUsed: "成熟果实", effects: ["清热解毒", "活血"], pinyin: "xiaoyelian", initials: "xyl", caution: "有小毒，不可自行食用。" }),
  h("cirsium-setosum", "小蓟", { nature: "凉", flavor: "甘、苦", meridians: ["心", "肝"], partUsed: "地上部分", effects: ["凉血止血", "散瘀解毒"], pinyin: "xiaoji", initials: "xj" }),
  h("mussaenda-pubescens", "小驳骨", { nature: "平", flavor: "辛", meridians: ["肝", "肾"], partUsed: "全草", effects: ["祛瘀止痛", "续筋接骨"], pinyin: "xiaobogu", initials: "xbg" }),
  h("kaempferia-galanga", "山柰", { nature: "温", flavor: "辛", meridians: ["胃"], partUsed: "根茎", effects: ["温中化湿", "行气止痛"], pinyin: "shannai", initials: "sn" }),
  h("crataegus-pinnatifida-leaf", "山楂叶", { nature: "平", flavor: "酸", meridians: ["肝"], partUsed: "叶", effects: ["活血化瘀", "理气通脉"], pinyin: "shanzhaye", initials: "szy", relatedForms: ["crataegus-pinnatifida"] }),
  h("dioscorea-opposita", "山药", { aliases: ["薯蓣"], nature: "平", flavor: "甘", meridians: ["脾", "肺", "肾"], partUsed: "根茎", effects: ["补脾养胃", "生津益肺"], pinyin: "shanyao", initials: "sy", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("turpinia-neglecta", "山香圆叶", { nature: "寒", flavor: "苦", meridians: ["肺", "肝"], partUsed: "叶", effects: ["清热解毒", "利咽"], pinyin: "shanxiangyuanye", initials: "sxyy" }),
  h("belamcanda-chinensis-sichuan", "川射干", { nature: "寒", flavor: "苦", meridians: ["肺"], partUsed: "根茎", effects: ["清热解毒", "消痰", "利咽"], pinyin: "chuanshegan", initials: "csg", relatedForms: ["belamcanda-chinensis"] }),
  h("croton-powder", "巴豆霜", { nature: "热", flavor: "辛", meridians: ["胃", "大肠"], partUsed: "成熟果实加工霜", effects: ["峻下冷积", "逐水"], pinyin: "badoushuang", initials: "bds", relatedForms: ["croton-seed"], caution: "有大毒，严禁自行使用。" }),
  h("toxicodendron-vernicifluum", "干漆", { nature: "平", flavor: "辛", meridians: ["肝", "脾"], partUsed: "树脂", effects: ["破瘀通经", "杀虫"], pinyin: "ganqi", initials: "gq", caution: "有毒，不可自行内服。" }),
  h("callicarpa-guangdong", "广东紫珠", { nature: "平", flavor: "苦、涩", meridians: ["肝", "肺", "胃"], partUsed: "叶", effects: ["收敛止血", "解毒"], pinyin: "guangdongzizhu", initials: "gdzz" }),
  h("corydalis-yanhusuo", "延胡索", { aliases: ["元胡"], nature: "温", flavor: "辛、苦", meridians: ["肝", "心", "脾"], partUsed: "块茎", effects: ["活血", "行气", "止痛"], pinyin: "yanhusuo", initials: "yhs" }),
  h("acronychia-pedunculata", "救必应", { nature: "寒", flavor: "苦", meridians: ["肺", "胃", "大肠"], partUsed: "树皮", effects: ["清热解毒", "利湿"], pinyin: "jiubiying", initials: "jby" }),
  h("laminaria-japonica", "昆布", { nature: "寒", flavor: "咸", meridians: ["肝", "胃", "肾"], partUsed: "干燥叶状体", effects: ["消痰软坚", "利水消肿"], pinyin: "kunbu", initials: "kb" }),
  h("syneilesis-aconitifolia", "暴马子皮", { nature: "微寒", flavor: "苦", meridians: ["肺"], partUsed: "树皮", effects: ["清肺", "化痰"], pinyin: "baomazipi", initials: "bmzp" }),
  h("hibiscus-mutabilis-flower", "木棉花", { nature: "凉", flavor: "甘、淡", meridians: ["大肠", "胃"], partUsed: "花蕾", effects: ["清热利湿", "解毒"], pinyin: "mumianhua", initials: "mmh" }),
  h("hibiscus-mutabilis-leaf", "木芙蓉叶", { nature: "凉", flavor: "辛", meridians: ["肺", "肝"], partUsed: "叶", effects: ["清热解毒", "消肿"], pinyin: "mufurongye", initials: "mfry" }),
  h("momordica-cochinchinensis", "木鳖子", { nature: "凉", flavor: "苦、甘", meridians: ["肝", "脾", "胃"], partUsed: "成熟种子", effects: ["散结消肿", "攻毒"], pinyin: "mubiezi", initials: "mbz", caution: "有毒，不可自行内服。" }),
  h("cinnabaris-radix", "朱砂根", { nature: "微寒", flavor: "苦", meridians: ["肺", "肝", "肾"], partUsed: "根", effects: ["清热", "解毒", "活血"], pinyin: "zhushagen", initials: "zsg" }),
  h("pinus-massoniana-pollen", "松花粉", { nature: "温", flavor: "甘", meridians: ["肝", "脾"], partUsed: "花粉", effects: ["收敛止血", "燥湿"], pinyin: "songhuafen", initials: "shf" }),
  h("eriobotrya-japonica-leaf", "枇杷叶", { nature: "微寒", flavor: "苦", meridians: ["肺", "胃"], partUsed: "叶", effects: ["清肺止咳", "降逆止呕"], pinyin: "pipaye", initials: "ppy" }),
  h("ilex-rotunda-leaf", "枸骨叶", { nature: "凉", flavor: "苦", meridians: ["肝", "肾"], partUsed: "叶", effects: ["清热养阴", "平肝"], pinyin: "gouguye", initials: "ggy" }),
  h("diospyros-kaki-calyx", "柿蒂", { nature: "平", flavor: "苦、涩", meridians: ["胃"], partUsed: "宿萼", effects: ["降气止呃"], pinyin: "shidi", initials: "sd" }),
  h("juglans-regia-kernel", "核桃仁", { nature: "温", flavor: "甘", meridians: ["肾", "肺", "大肠"], partUsed: "成熟种子", effects: ["补肾温肺", "润肠通便"], pinyin: "hetaoren", initials: "htr", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("prunus-persica-branch", "桃枝", { nature: "平", flavor: "苦", meridians: ["心", "肝"], partUsed: "枝条", effects: ["活血通络", "解毒杀虫"], pinyin: "taozhi", initials: "tz" }),
  h("broussonetia-papyrifera-fruit", "楮实子", { nature: "寒", flavor: "甘", meridians: ["肝", "肾"], partUsed: "成熟果实", effects: ["补肾清肝", "明目"], pinyin: "chushizi", initials: "csz" }),
  h("sophora-japonica-fruit", "槐角", { nature: "寒", flavor: "苦", meridians: ["肝", "大肠"], partUsed: "成熟果实", effects: ["清热泻火", "凉血止血"], pinyin: "huaijiao", initials: "hj", relatedForms: ["sophora-japonica-flower"] }),
  h("caryophylli-flos-mother", "母丁香", { nature: "温", flavor: "辛", meridians: ["脾", "胃", "肺"], partUsed: "果实", effects: ["温中降逆", "补肾助阳"], pinyin: "mudingxiang", initials: "mdx", relatedForms: ["caryophylli-flos"] }),
  h("terminalia-chebula-villosa", "毛诃子", { nature: "平", flavor: "苦、甘", meridians: ["肺", "大肠"], partUsed: "成熟果实", effects: ["清热生津", "涩肠"], pinyin: "maohezi", initials: "mhz", relatedForms: ["terminalia-chebula"] }),
  h("silybum-marianum", "水飞蓟", { nature: "凉", flavor: "苦", meridians: ["肝", "胆"], partUsed: "成熟种子", effects: ["清热解毒", "疏肝利胆"], pinyin: "shuifeiji", initials: "sfj" }),
  h("datura-metel", "洋金花", { aliases: ["曼陀罗花"], nature: "温", flavor: "辛", meridians: ["肺", "肝"], partUsed: "花", effects: ["平喘止咳", "解痉"], pinyin: "yangjinhua", initials: "yjh", caution: "有大毒，严禁自行使用。" }),
  h("lemna-minor", "浮萍", { nature: "寒", flavor: "辛", meridians: ["肺", "膀胱"], partUsed: "全草", effects: ["宣散风热", "利水"], pinyin: "fuping", initials: "fp" }),
  h("sargassum-fusiforme", "海藻", { nature: "寒", flavor: "苦、咸", meridians: ["肝", "胃", "肾"], partUsed: "干燥藻体", effects: ["消痰软坚", "利水消肿"], pinyin: "haizao", initials: "hz" }),
  h("millettia-yunnanensis", "滇鸡血藤", { nature: "温", flavor: "苦、甘", meridians: ["肝", "肾"], partUsed: "藤茎", effects: ["活血补血", "调经"], pinyin: "dianjixueteng", initials: "djxt", relatedForms: ["millettia-stem"] }),
  h("erigeron-breviscapus", "灯盏细辛", { aliases: ["灯盏花"], nature: "温", flavor: "辛、微苦", meridians: ["心", "肝"], partUsed: "全草", effects: ["活血通络", "止痛"], pinyin: "dengzhanxixin", initials: "dzxx" }),
  h("trichosanthes-seed-stir", "炒瓜蒌子", { nature: "寒", flavor: "甘", meridians: ["肺", "胃", "大肠"], partUsed: "成熟种子（炒）", effects: ["润肺化痰", "滑肠"], pinyin: "chaogualouzi", initials: "cglz", relatedForms: ["trichosanthes-seed"] }),
  h("glycyrrhiza-prep-honey", "炙甘草", { nature: "平", flavor: "甘", meridians: ["心", "肺", "脾", "胃"], partUsed: "根及根茎（炙）", effects: ["补脾益气", "缓急止痛"], pinyin: "zhigancao", initials: "zgc", relatedForms: ["glycyrrhiza-uralensis"] }),
  h("hedysarum-prep", "炙红芪", { nature: "温", flavor: "甘", meridians: ["肺", "脾"], partUsed: "根（炙）", effects: ["补气升阳", "益卫固表"], pinyin: "zhihongqi", initials: "zhq", relatedForms: ["hedysarum-polybotrys"] }),
  h("astragalus-prep-honey", "炙黄芪", { nature: "微温", flavor: "甘", meridians: ["肺", "脾"], partUsed: "根（炙）", effects: ["补气升阳", "益卫固表"], pinyin: "zhihuangqi", initials: "zhq", relatedForms: ["astragalus-membranaceus"] }),
  h("gardenia-prep-char", "焦栀子", { nature: "寒", flavor: "苦", meridians: ["心", "肺", "三焦"], partUsed: "成熟果实（炒焦）", effects: ["泻火除烦", "凉血"], pinyin: "jiaozhizi", initials: "jzz", relatedForms: ["gardenia-jasminoides"] }),
  h("gypsum-calcined", "煅石膏", { nature: "大寒", flavor: "辛、甘", meridians: ["肺", "胃"], partUsed: "矿物（煅）", effects: ["收湿", "生肌", "敛疮"], pinyin: "duanshigao", initials: "dsg", relatedForms: ["gypsum-fibrosum"], caution: "矿物药，非食材。" }),
  h("curcuma-wenyujin-slice", "片姜黄", { nature: "温", flavor: "辛、苦", meridians: ["脾", "肝"], partUsed: "根茎", effects: ["行气破血", "通经止痛"], pinyin: "pianjianghuang", initials: "pjh", relatedForms: ["curcuma-longa"] }),
  h("gleditsia-sinensis-spine", "猪牙皂", { nature: "温", flavor: "辛、咸", meridians: ["肺", "大肠"], partUsed: "干燥不育果实", effects: ["祛痰", "开窍"], pinyin: "zhuyazao", initials: "zyz" }),
  h("adenophora-triphylla", "珠子参", { nature: "微寒", flavor: "苦、甘", meridians: ["肝", "肺", "胃"], partUsed: "根茎", effects: ["养阴清肺", "化瘀"], pinyin: "zhuzishen", initials: "zzs" }),
  h("polygala-japonica", "瓜子金", { nature: "温", flavor: "辛、苦", meridians: ["肺"], partUsed: "全草", effects: ["祛痰", "活血"], pinyin: "guazijin", initials: "gzj" }),
  h("sedum-sarmentosum", "瓦松", { nature: "酸", flavor: "酸、苦", meridians: ["肝", "大肠"], partUsed: "全草", effects: ["凉血", "止血", "解毒"], pinyin: "wasong", initials: "ws" }),
  h("nardostachys-jatamansi", "甘松", { nature: "温", flavor: "辛、甘", meridians: ["脾", "胃"], partUsed: "根及根茎", effects: ["理气止痛", "开郁"], pinyin: "gansong", initials: "gs" }),
  h("zingiber-officinale-fresh", "生姜", { nature: "微温", flavor: "辛", meridians: ["肺", "脾", "胃"], partUsed: "根茎", effects: ["解表散寒", "温中止呕"], pinyin: "shengjiang", initials: "sj", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("cassia-angustifolia", "番泻叶", { nature: "寒", flavor: "甘、苦", meridians: ["大肠"], partUsed: "小叶", effects: ["泻热通便", "利水"], pinyin: "fanxieye", initials: "fxy", caution: "泻下力强，不可长期自用。" }),
  h("alpinia-oxyphylla-fruit", "益智", { nature: "温", flavor: "辛", meridians: ["脾", "肾"], partUsed: "成熟果实", effects: ["暖肾固精", "温脾"], pinyin: "yizhi", initials: "yz", relatedForms: ["alpinia-oxyphylla"] }),
  h("acorus-tatarinowii", "石菖蒲", { nature: "温", flavor: "辛、苦", meridians: ["心", "胃"], partUsed: "根茎", effects: ["开窍豁痰", "醒神"], pinyin: "shichangpu", initials: "scp" }),
  h("smilax-china-loulu", "禹州漏芦", { nature: "寒", flavor: "苦", meridians: ["胃"], partUsed: "根", effects: ["清热解毒", "消痈"], pinyin: "yuzhouloulu", initials: "yzll", relatedForms: ["rhaponticum-uniflorum"] }),
  h("panax-japonicus-rhizome", "竹节参", { nature: "微温", flavor: "甘、微苦", meridians: ["肝", "脾", "肺"], partUsed: "根茎", effects: ["补虚", "祛痰", "止痛"], pinyin: "zhujieshen", initials: "zjs" }),
  h("pueraria-thomsonii", "粉葛", { nature: "凉", flavor: "甘、辛", meridians: ["脾", "胃"], partUsed: "根", effects: ["解肌退热", "生津"], pinyin: "fenge", initials: "fg", relatedForms: ["pueraria-lobata"] }),
  h("perilla-leaf", "紫苏叶", { nature: "温", flavor: "辛", meridians: ["肺", "脾"], partUsed: "叶", effects: ["发表散寒", "行气宽中"], pinyin: "zisuye", initials: "zsy", relatedForms: ["perilla-seed"] }),
  h("perilla-stem", "紫苏梗", { nature: "温", flavor: "辛", meridians: ["肺", "脾"], partUsed: "茎", effects: ["理气宽中", "止痛"], pinyin: "zisugeng", initials: "zsg" }),
  h("gentiana-rhodantha", "红花龙胆", { nature: "寒", flavor: "苦", meridians: ["肝", "胆"], partUsed: "全草", effects: ["清热", "利湿"], pinyin: "honghualongdan", initials: "hhld" }),
  h("asarum-xixin", "细辛", { nature: "温", flavor: "辛", meridians: ["心", "肺", "肾"], partUsed: "根及根茎", effects: ["祛风散寒", "通窍止痛"], pinyin: "xixin", initials: "xx", relatedForms: ["asarum-heterotropoides"], caution: "有小毒，不可过量自用。" }),
  h("dryopteris-crassirhizoma", "绵马贯众", { nature: "寒", flavor: "苦", meridians: ["肝", "胃"], partUsed: "根茎及叶柄残基", effects: ["清热解毒", "驱虫"], pinyin: "mianmaguanzhong", initials: "mmgz", relatedForms: ["cyrtomium-fortunei"] }),
  h("borneolum-ai", "艾片", { aliases: ["左旋龙脑"], nature: "微寒", flavor: "辛、苦", meridians: ["心", "脾", "肺"], partUsed: "结晶", effects: ["开窍醒神", "清热止痛"], pinyin: "aipian", initials: "ap", relatedForms: ["borneolum-synthetic"] }),
  h("brassica-juncea-seed", "芥子", { nature: "温", flavor: "辛", meridians: ["肺"], partUsed: "成熟种子", effects: ["温肺豁痰", "散结"], pinyin: "jiezi", initials: "jz", relatedForms: ["sinapis-alba"] }),
  h("phragmites-rhizoma", "芦根", { nature: "寒", flavor: "甘", meridians: ["肺", "胃"], partUsed: "根茎", effects: ["清热生津", "除烦止呕"], pinyin: "lugen", initials: "lg" }),
  h("aloe-vera", "芦荟", { nature: "寒", flavor: "苦", meridians: ["肝", "胃", "大肠"], partUsed: "汁液浓缩物", effects: ["泻下", "清肝"], pinyin: "luhui", initials: "lh", caution: "泻下力强，不可长期自用。" }),
  h("zanthoxylum-bungeanum-peel", "花椒", { nature: "温", flavor: "辛", meridians: ["脾", "胃", "肾"], partUsed: "成熟果皮", effects: ["温中止痛", "杀虫"], pinyin: "huajiao", initials: "hj", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("abutilon-theophrasti", "苘麻子", { nature: "平", flavor: "苦", meridians: ["大肠", "膀胱", "胃"], partUsed: "成熟种子", effects: ["清热利湿", "解毒"], pinyin: "qingmazi", initials: "qmz" }),
  h("corydalis-bungeana", "苦地丁", { nature: "寒", flavor: "苦", meridians: ["心", "肝", "大肠"], partUsed: "全草", effects: ["清热解毒", "消肿"], pinyin: "kudiding", initials: "kdd" }),
  h("poria-cortex", "茯苓皮", { nature: "平", flavor: "甘、淡", meridians: ["脾", "肺", "肾"], partUsed: "菌核外皮", effects: ["利水消肿"], pinyin: "fulingpi", initials: "flp", relatedForms: ["poria-cocos"] }),
  h("schizonepeta-spica", "荆芥穗", { nature: "微温", flavor: "辛", meridians: ["肺", "肝"], partUsed: "花序", effects: ["解表散风", "透疹"], pinyin: "jingjiesui", initials: "jjs", relatedForms: ["schizonepeta-tenuifolia"] }),
  h("aconitum-kusnezoffii-leaf", "草乌叶", { nature: "热", flavor: "辛", meridians: ["肝", "肾"], partUsed: "叶", effects: ["祛风", "止痛"], pinyin: "caowuye", initials: "cwy", relatedForms: ["aconitum-kusnezoffii"], caution: "有毒，不可自行使用。" }),
  h("nelumbo-leaf", "荷叶", { nature: "平", flavor: "苦", meridians: ["肝", "脾", "胃"], partUsed: "叶", effects: ["清热解暑", "升发清阳"], pinyin: "heye", initials: "hy" }),
  h("acorus-calamus", "藏菖蒲", { nature: "温", flavor: "辛、苦", meridians: ["心", "胃"], partUsed: "根茎", effects: ["开窍豁痰", "醒神"], pinyin: "cangchangpu", initials: "ccp" }),
  h("human-hair-carbon", "血余炭", { nature: "平", flavor: "苦", meridians: ["肝", "胃"], partUsed: "头发炭", effects: ["收敛止血", "化瘀"], pinyin: "xueyutan", initials: "xyt", caution: "加工品，非食材。" }),
  h("crocus-sativus", "西红花", { aliases: ["藏红花"], nature: "平", flavor: "甘", meridians: ["心", "肝"], partUsed: "柱头", effects: ["活血通经", "凉血解毒"], pinyin: "xihonghua", initials: "xhh", caution: "贵重药材，孕妇慎用。" }),
  h("vigna-angularis", "赤小豆", { nature: "平", flavor: "甘、酸", meridians: ["心", "小肠"], partUsed: "成熟种子", effects: ["利水消肿", "解毒"], pinyin: "chixiaodou", initials: "cxd", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("chrysanthemum-indicum", "野菊花", { nature: "微寒", flavor: "苦、辛", meridians: ["肝", "心"], partUsed: "头状花序", effects: ["清热解毒", "泻火"], pinyin: "yejuhua", initials: "yjh", relatedForms: ["chrysanthemum-morifolium"] }),
  h("chlorite-gold", "金礞石", { nature: "平", flavor: "甘、咸", meridians: ["肺", "心", "肝"], partUsed: "矿物", effects: ["坠痰", "平肝"], pinyin: "jinmengshi", initials: "jms", relatedForms: ["chlorite-schist"], caution: "矿物药，非食材。" }),
  h("fagopyrum-dibotrys", "金荞麦", { nature: "微寒", flavor: "微辛", meridians: ["肺", "肝"], partUsed: "根茎", effects: ["清热解毒", "排脓"], pinyin: "jinqiaomai", initials: "jqm" }),
  h("swertia-pubescens", "青叶胆", { nature: "寒", flavor: "苦", meridians: ["肝", "胆"], partUsed: "全草", effects: ["清热利湿", "退黄"], pinyin: "qingyedan", initials: "qyd" }),
  h("verbena-officinalis", "马鞭草", { nature: "微寒", flavor: "苦", meridians: ["肝", "脾"], partUsed: "地上部分", effects: ["活血散瘀", "解毒"], pinyin: "mabiancao", initials: "mbc" }),
  h("abrus-cantoniensis", "鸡骨草", { nature: "凉", flavor: "甘、微苦", meridians: ["肝", "胃"], partUsed: "全草", effects: ["利湿退黄", "清热解毒"], pinyin: "jigucao", initials: "jgc" }),
  h("sesamum-nigrum", "黑芝麻", { nature: "平", flavor: "甘", meridians: ["肝", "肾", "大肠"], partUsed: "成熟种子", effects: ["补肝肾", "润肠"], pinyin: "heizhima", initials: "hzm", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("glycine-max-black", "黑豆", { nature: "平", flavor: "甘", meridians: ["脾", "肾"], partUsed: "成熟种子", effects: ["益精明目", "利水"], pinyin: "heidou", initials: "hd", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("phyllanthus-emblica-leaf", "龙脷叶", { nature: "平", flavor: "甘、淡", meridians: ["肺", "胃"], partUsed: "叶", effects: ["润肺止咳", "化痰"], pinyin: "longliye", initials: "lly" }),
  h("chinemys-plastron-glue", "龟甲胶", { nature: "微寒", flavor: "甘、咸", meridians: ["肝", "肾", "心"], partUsed: "龟甲熬制的胶", effects: ["滋阴", "养血"], pinyin: "guijiajiao", initials: "gjj", relatedForms: ["chinemys-reevesii"] }),
  h("hematite-ochre", "代赭石", { nature: "寒", flavor: "苦", meridians: ["肝", "心"], partUsed: "矿物", effects: ["平肝潜阳", "降逆", "止血"], pinyin: "daizheshi", initials: "dzs", caution: "矿物药，非食材。" }),
  h("rehmannia-glutinosa-raw", "地黄", { nature: "寒", flavor: "甘、苦", meridians: ["心", "肝", "肾"], partUsed: "块根", effects: ["清热凉血", "养阴生津"], pinyin: "dihuang", initials: "dh", relatedForms: ["rehmannia-glutinosa", "rehmannia-prep"] }),
  h("cissampelos-pareira", "亚乎奴", { aliases: ["锡生藤"], nature: "温", flavor: "苦", meridians: ["肝", "肾"], partUsed: "全株", effects: ["活血", "止痛"], pinyin: "yahunu", initials: "yhn" }),
  h("illicium-difengpi", "地枫皮", { nature: "微温", flavor: "辛、涩", meridians: ["膀胱", "肾"], partUsed: "树皮", effects: ["祛风除湿", "行气止痛"], pinyin: "difengpi", initials: "dfp" }),
  h("adina-equitifolia", "当药", { nature: "寒", flavor: "苦", meridians: ["肝", "胆"], partUsed: "全草", effects: ["清湿热", "利胆"], pinyin: "dangyao", initials: "dy" }),
  h("panax-ginseng-red", "红参", { nature: "微温", flavor: "甘、微苦", meridians: ["脾", "肺", "心", "肾"], partUsed: "蒸制根", effects: ["大补元气", "益气摄血"], pinyin: "hongshen", initials: "hs", relatedForms: ["panax-ginseng"], caution: "补气力强，不宜自行大量服用。" }),
  h("sophora-albescens", "金龙胆草", { nature: "寒", flavor: "苦", meridians: ["肺", "肝", "胆"], partUsed: "全草", effects: ["清热", "利湿"], pinyin: "jinlongdancao", initials: "jldc" }),
  h("centipeda-minima", "鹅不食草", { nature: "温", flavor: "辛", meridians: ["肺"], partUsed: "全草", effects: ["发散风寒", "通鼻窍"], pinyin: "ebushicao", initials: "ebsc" }),
  h("nigella-sativa", "黑种草子", { nature: "温", flavor: "甘、辛", meridians: ["肺", "大肠"], partUsed: "成熟种子", effects: ["润肺", "化痰"], pinyin: "heizhongcaozi", initials: "hzcz" }),
  h("euphorbia-lathyris-powder", "千金子霜", { nature: "温", flavor: "辛", meridians: ["肝", "肾", "大肠"], partUsed: "成熟种子霜", effects: ["逐水消肿", "破血"], pinyin: "qianjinzishuang", initials: "qjzs", relatedForms: ["euphorbia-lathyris"], caution: "有毒，孕妇禁用。" }),
  h("angelica-pubescens-south", "北刘寄奴", { nature: "平", flavor: "苦", meridians: ["肝", "胆"], partUsed: "全草", effects: ["活血祛瘀", "通经"], pinyin: "beiliujinu", initials: "bljn" }),
  h("dendrobenthamia-capsule", "南鹤虱", { nature: "平", flavor: "苦", meridians: ["胃", "大肠"], partUsed: "成熟果实", effects: ["杀虫"], pinyin: "nanheshi", initials: "nhs" })
];

const cleanedNew = NEW_HERBS;

const existing = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const existingNames = new Set(existing.map((item) => item.name));
const existingIds = new Set(existing.map((item) => item.id));

let added = 0;
let skipped = 0;
const addedNames = [];

for (const herb of cleanedNew) {
  if (existingNames.has(herb.name)) {
    skipped++;
    continue;
  }
  if (existingIds.has(herb.id)) {
    throw new Error(`Duplicate id "${herb.id}" for new herb "${herb.name}"`);
  }
  existing.push(herb);
  existingNames.add(herb.name);
  existingIds.add(herb.id);
  addedNames.push(herb.name);
  added++;
}

const ids = existing.map((item) => item.id);
const uniqueIds = new Set(ids);
if (uniqueIds.size !== ids.length) {
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  throw new Error(`Duplicate ids after merge: ${[...new Set(dup)].join(", ")}`);
}

existing.sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
fs.writeFileSync(catalogPath, `${JSON.stringify(existing, null, 2)}\n`, "utf8");

console.log(`Catalog: ${existing.length} herbs (${added} added, ${skipped} skipped by name)`);
console.log(`Added sample: ${addedNames.slice(0, 10).join("、")}`);
if (addedNames.length > 10) {
  console.log(`…and ${addedNames.length - 10} more`);
}
