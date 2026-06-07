#!/usr/bin/env node
/**
 * Seed data/tcm/herbs-core.json — core TCM herbs aligned with 中国药典2025年版 naming.
 * Run: node scripts/seed-herbs-core.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "data", "tcm", "herbs-core.json");

const CHP = "《中华人民共和国药典》2025年版";

function h(
  id,
  name,
  {
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
  } = {}
) {
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
  h("rehmannia-raw", "生地黄", { aliases: ["生地", "干地黄"], nature: "寒", flavor: "甘、苦", meridians: ["心", "肝", "肾"], partUsed: "块根", effects: ["清热养阴", "生津"], pinyin: "shengdihuang", initials: "sdh", en: "Rehmannia glutinosa root", relatedForms: ["rehmannia-processed"], summary: "清热养阴、生津。生品偏寒凉，与熟地黄功效不同。" }),
  h("rehmannia-processed", "熟地黄", { aliases: ["熟地", "熟地黄"], nature: "温", flavor: "甘", meridians: ["肝", "肾"], partUsed: "块根", effects: ["补血滋阴", "益精填髓"], pinyin: "shudihuang", initials: "shdh", en: "processed Rehmannia root", relatedForms: ["rehmannia-raw"], summary: "补血滋阴、益精填髓。经酒蒸制，性转温补。" }),
  h("vaccaria-seeds", "王不留行", { aliases: ["王不留", "留行子", "王不留行籽"], nature: "平", flavor: "苦", meridians: ["肝", "胃"], partUsed: "种子", effects: ["活血通经", "下乳"], pinyin: "wangbuliuxing", initials: "wblx", en: "Vaccaria segetalis seed" }),
  h("lycopus-fruits", "路路通", { aliases: ["枫实", "九孔子"], nature: "平", flavor: "苦", meridians: ["肝", "胃"], partUsed: "成熟果实", effects: ["活血通经", "利水"], pinyin: "lulutong", initials: "llt", en: "Liquidambar formosana fruit" }),
  h("angelica-sinensis", "当归", { aliases: ["秦归", "云归"], nature: "温", flavor: "甘、辛", meridians: ["肝", "心", "脾"], partUsed: "根", effects: ["补血活血", "调经止痛"], pinyin: "danggui", initials: "dg", en: "Angelica sinensis", usageScope: "reference-only" }),
  h("astragalus-membranaceus", "黄芪", { aliases: ["北芪", "黄耆"], nature: "温", flavor: "甘", meridians: ["脾", "肺"], partUsed: "根", effects: ["补气升阳", "固表"], pinyin: "huangqi", initials: "hq", en: "Astragalus membranaceus", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy", summary: "补气升阳、固表止汗。药食同源目录品种。" }),
  h("codonopsis-pilosula", "党参", { aliases: ["潞党参", "上党参"], nature: "平", flavor: "甘", meridians: ["脾", "肺"], partUsed: "根", effects: ["补中益气", "健脾"], pinyin: "dangshen", initials: "ds", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("atractylodes-macrocephala", "白术", { aliases: ["于术", "浙术"], nature: "温", flavor: "甘、苦", meridians: ["脾", "胃"], partUsed: "根茎", effects: ["健脾益气", "燥湿"], pinyin: "baizhu", initials: "bz" }),
  h("poria-cocos", "茯苓", { aliases: ["白茯苓", "云苓"], nature: "平", flavor: "甘、淡", meridians: ["心", "脾", "肾"], partUsed: "菌核", effects: ["利水渗湿", "健脾"], pinyin: "fuling", initials: "fl", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("glycyrrhiza-uralensis", "甘草", { aliases: ["国老", "甜草"], nature: "平", flavor: "甘", meridians: ["心", "肺", "脾", "胃"], partUsed: "根及根茎", effects: ["补脾益气", "调和诸药"], pinyin: "gancao", initials: "gc", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("citrus-reticulata-peel", "陈皮", { aliases: ["广陈皮", "新会皮"], nature: "温", flavor: "辛、苦", meridians: ["脾", "肺"], partUsed: "成熟果皮", effects: ["理气健脾", "燥湿"], pinyin: "chenpi", initials: "cp", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("pinellia-ternata", "半夏", { aliases: ["地文", "水玉"], nature: "温", flavor: "辛", meridians: ["脾", "胃", "肺"], partUsed: "块茎", effects: ["燥湿化痰", "降逆"], pinyin: "banxia", initials: "bx", caution: "有毒，需炮制后入药；不可自行当作普通食材大量食用。" }),
  h("chuanxiong-rhizome", "川芎", { aliases: ["芎藭", "香果"], nature: "温", flavor: "辛", meridians: ["肝", "胆", "心包"], partUsed: "根茎", effects: ["活血行气", "祛风"], pinyin: "chuanxiong", initials: "cx" }),
  h("paeonia-lactiflora", "白芍", { aliases: ["杭白芍"], nature: "凉", flavor: "苦、酸", meridians: ["肝", "脾"], partUsed: "根", effects: ["养血调经", "敛阴"], pinyin: "baishao", initials: "bs" }),
  h("paeonia-veitchii", "赤芍", { aliases: ["赤芍药"], nature: "凉", flavor: "苦", meridians: ["肝"], partUsed: "根", effects: ["清热凉血", "散瘀"], pinyin: "chishao", initials: "cs" }),
  h("salvia-miltiorrhiza", "丹参", { aliases: ["紫丹参"], nature: "微寒", flavor: "苦", meridians: ["心", "肝"], partUsed: "根及根茎", effects: ["活血祛瘀", "凉血"], pinyin: "danshen", initials: "ds" }),
  h("carthamus-tinctorius", "红花", { aliases: ["红蓝花"], nature: "温", flavor: "辛", meridians: ["心", "肝"], partUsed: "花", effects: ["活血通经", "散瘀"], pinyin: "honghua", initials: "hh", caution: "孕妇忌用；非日常食材，仅作中药参考。" }),
  h("prunus-persica-seed", "桃仁", { aliases: ["桃核仁"], nature: "平", flavor: "苦、甘", meridians: ["心", "肝", "大肠"], partUsed: "种子", effects: ["活血祛瘀", "润肠通便"], pinyin: "taoren", initials: "tr" }),
  h("ligusticum-chuanxiong", "藁本", { aliases: [], nature: "温", flavor: "辛", meridians: ["膀胱"], partUsed: "根茎", effects: ["祛风散寒", "除湿"], pinyin: "gaoben", initials: "gb" }),
  h("notopterygium-incisum", "羌活", { aliases: ["西羌"], nature: "温", flavor: "辛、苦", meridians: ["膀胱", "肾"], partUsed: "根茎", effects: ["解表散寒", "祛风"], pinyin: "qianghuo", initials: "qh" }),
  h("angelica-pubescens", "独活", { aliases: [], nature: "微温", flavor: "辛、苦", meridians: ["肾", "膀胱"], partUsed: "根", effects: ["祛风除湿", "通痹"], pinyin: "duhuo", initials: "dh" }),
  h("saposhnikovia-divaricata", "防风", { aliases: ["关防风"], nature: "微温", flavor: "辛、甘", meridians: ["膀胱", "肝", "脾"], partUsed: "根", effects: ["祛风解表", "胜湿"], pinyin: "fangfeng", initials: "ff" }),
  h("schizonepeta-tenuifolia", "荆芥", { aliases: ["荆芥穗"], nature: "微温", flavor: "辛", meridians: ["肺", "肝"], partUsed: "地上部分", effects: ["解表散风", "透疹"], pinyin: "jingjie", initials: "jj" }),
  h("mentha-haplocalyx", "薄荷", { aliases: ["银丹叶"], nature: "凉", flavor: "辛", meridians: ["肺", "肝"], partUsed: "地上部分", effects: ["疏散风热", "清利头目"], pinyin: "bohe", initials: "bh", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("ephedra-sinica", "麻黄", { aliases: [], nature: "温", flavor: "辛、微苦", meridians: ["肺", "膀胱"], partUsed: "草质茎", effects: ["发汗解表", "宣肺"], pinyin: "mahuang", initials: "mh", caution: "含生物碱，高血压、失眠者慎用；非日常食材。" }),
  h("prunus-armeniaca-seed", "杏仁", { aliases: ["苦杏仁", "北杏"], nature: "温", flavor: "苦", meridians: ["肺", "大肠"], partUsed: "种子", effects: ["降气止咳", "润肠通便"], pinyin: "xingren", initials: "xr", caution: "苦杏仁有小毒，需炮制，不可生食大量。" }),
  h("platycodon-grandiflorus", "桔梗", { aliases: ["苦桔梗"], nature: "平", flavor: "苦、辛", meridians: ["肺"], partUsed: "根", effects: ["宣肺利咽", "祛痰"], pinyin: "jiegeng", initials: "jg" }),
  h("fritillaria-cirrhosa", "川贝母", { aliases: ["川贝", "松贝"], nature: "微寒", flavor: "苦、甘", meridians: ["肺", "心"], partUsed: "鳞茎", effects: ["清热润肺", "化痰"], pinyin: "chuanbeimu", initials: "cbm" }),
  h("fritillaria-thunbergii", "浙贝母", { aliases: ["浙贝", "象贝"], nature: "寒", flavor: "苦", meridians: ["肺", "心"], partUsed: "鳞茎", effects: ["清热化痰", "散结"], pinyin: "zhebeimu", initials: "zbm" }),
  h("scutellaria-baicalensis", "黄芩", { aliases: ["枯芩"], nature: "寒", flavor: "苦", meridians: ["肺", "胆", "胃", "大肠"], partUsed: "根", effects: ["清热燥湿", "泻火"], pinyin: "huangqin", initials: "hq" }),
  h("coptis-chinensis", "黄连", { aliases: ["川连", "味连"], nature: "寒", flavor: "苦", meridians: ["心", "脾", "胃", "肝", "胆", "大肠"], partUsed: "根茎", effects: ["清热燥湿", "泻火解毒"], pinyin: "huanglian", initials: "hl" }),
  h("phellodendron-chinense", "黄柏", { aliases: ["川黄柏"], nature: "寒", flavor: "苦", meridians: ["肾", "膀胱", "大肠"], partUsed: "树皮", effects: ["清热燥湿", "泻火"], pinyin: "huangbai", initials: "hb" }),
  h("gardenia-jasminoides", "栀子", { aliases: ["山栀子"], nature: "寒", flavor: "苦", meridians: ["心", "肺", "三焦"], partUsed: "果实", effects: ["泻火除烦", "清热"], pinyin: "zhizi", initials: "zz", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("forsythia-suspensa", "连翘", { aliases: ["青连翘"], nature: "微寒", flavor: "苦", meridians: ["肺", "心", "小肠"], partUsed: "果实", effects: ["清热解毒", "消肿"], pinyin: "lianqiao", initials: "lq" }),
  h("lonicera-japonica", "金银花", { aliases: ["忍冬花", "双花"], nature: "寒", flavor: "甘", meridians: ["肺", "心", "胃"], partUsed: "花蕾", effects: ["清热解毒", "疏散风热"], pinyin: "jinyinhua", initials: "jyh", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("taraxacum-mongolicum", "蒲公英", { aliases: ["黄花地丁"], nature: "寒", flavor: "苦、甘", meridians: ["肝", "胃"], partUsed: "全草", effects: ["清热解毒", "消肿"], pinyin: "pugongying", initials: "pgy", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("isatis-indigotica-root", "板蓝根", { aliases: [], nature: "寒", flavor: "苦", meridians: ["心", "胃"], partUsed: "根", effects: ["清热解毒", "凉血"], pinyin: "banlangen", initials: "blg" }),
  h("bupleurum-chinense", "柴胡", { aliases: ["北柴胡"], nature: "微寒", flavor: "苦、辛", meridians: ["肝", "胆"], partUsed: "根", effects: ["疏散退热", "疏肝"], pinyin: "chaihu", initials: "ch" }),
  h("pueraria-lobata", "葛根", { aliases: ["甘葛"], nature: "凉", flavor: "甘、辛", meridians: ["脾", "胃"], partUsed: "根", effects: ["解肌退热", "生津"], pinyin: "gegen", initials: "gg" }),
  h("trichosanthes-root", "天花粉", { aliases: ["栝楼根"], nature: "微寒", flavor: "甘、微苦", meridians: ["肺", "胃"], partUsed: "根", effects: ["清热泻火", "生津"], pinyin: "tianhuafen", initials: "thf" }),
  h("ophiopogon-japonicus", "麦冬", { aliases: ["麦门冬"], nature: "微寒", flavor: "甘、微苦", meridians: ["心", "肺", "胃"], partUsed: "块根", effects: ["养阴生津", "润肺"], pinyin: "maidong", initials: "md" }),
  h("ophiopogon-tuber", "天冬", { aliases: ["天门冬"], nature: "寒", flavor: "甘、苦", meridians: ["肺", "肾"], partUsed: "块根", effects: ["养阴润燥", "清肺"], pinyin: "tiandong", initials: "td" }),
  h("polygonatum-odoratum", "玉竹", { aliases: ["萎蕤"], nature: "微寒", flavor: "甘", meridians: ["肺", "胃"], partUsed: "根茎", effects: ["养阴润燥", "生津"], pinyin: "yuzhu", initials: "yz", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("lily-bulb", "百合", { aliases: ["白百合"], nature: "微寒", flavor: "甘", meridians: ["心", "肺"], partUsed: "鳞茎", effects: ["养阴润肺", "清心安神"], pinyin: "baihe", initials: "bh", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("dendrobium-nobile", "石斛", { aliases: ["铁皮石斛", "霍山石斛"], nature: "微寒", flavor: "甘", meridians: ["胃", "肾"], partUsed: "茎", effects: ["益胃生津", "滋阴"], pinyin: "shihu", initials: "sh", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("lycium-barbarum", "枸杞子", { aliases: ["枸杞", "宁夏枸杞"], nature: "平", flavor: "甘", meridians: ["肝", "肾"], partUsed: "成熟果实", effects: ["滋补肝肾", "益精"], pinyin: "gouqizi", initials: "gqz", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("ligustrum-lucidum", "女贞子", { aliases: ["冬青子"], nature: "平", flavor: "甘、苦", meridians: ["肝", "肾"], partUsed: "果实", effects: ["滋补肝肾", "明目"], pinyin: "nvzhenzi", initials: "nzz" }),
  h("eclipta-prostrata", "墨旱莲", { aliases: ["旱莲草"], nature: "寒", flavor: "甘、酸", meridians: ["肝", "肾"], partUsed: "地上部分", effects: ["滋补肝肾", "凉血"], pinyin: "mohanlian", initials: "mhl" }),
  h("morinda-officinalis", "巴戟天", { aliases: [], nature: "微温", flavor: "甘、辛", meridians: ["肾", "肝"], partUsed: "根", effects: ["补肾阳", "强筋骨"], pinyin: "bajitian", initials: "bjt" }),
  h("cistanche-deserticola", "肉苁蓉", { aliases: ["大芸", "苁蓉"], nature: "温", flavor: "甘、咸", meridians: ["肾", "大肠"], partUsed: "肉质茎", effects: ["补肾阳", "益精血"], pinyin: "roucongrong", initials: "rcr", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("cynomorium-songaricum", "锁阳", { aliases: [], nature: "温", flavor: "甘", meridians: ["肾", "肝", "大肠"], partUsed: "肉质茎", effects: ["补肾阳", "润肠通便"], pinyin: "suoyang", initials: "sy" }),
  h("epimedium-brevicornu", "淫羊藿", { aliases: ["仙灵脾"], nature: "温", flavor: "辛、甘", meridians: ["肝", "肾"], partUsed: "地上部分", effects: ["补肾阳", "强筋骨"], pinyin: "yinyanghuo", initials: "yyh" }),
  h("eucommia-ulmoides", "杜仲", { aliases: ["丝棉皮"], nature: "温", flavor: "甘", meridians: ["肝", "肾"], partUsed: "树皮", effects: ["补肝肾", "强筋骨"], pinyin: "duzhong", initials: "dz", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("cuscuta-chinensis", "菟丝子", { aliases: ["吐丝子"], nature: "温", flavor: "辛、甘", meridians: ["肝", "肾", "脾"], partUsed: "成熟种子", effects: ["补益肝肾", "固精"], pinyin: "tusizi", initials: "tsz" }),
  h("dipsacus-asper", "续断", { aliases: ["川续断"], nature: "微温", flavor: "苦、辛", meridians: ["肝", "肾"], partUsed: "根", effects: ["补肝肾", "强筋骨"], pinyin: "xuduan", initials: "xd" }),
  h("achyranthes-bidentata", "牛膝", { aliases: ["怀牛膝"], nature: "平", flavor: "苦、甘、酸", meridians: ["肝", "肾"], partUsed: "根", effects: ["逐瘀通经", "补肝肾"], pinyin: "niuxi", initials: "nx" }),
  h("cyathula-officinalis", "川牛膝", { aliases: [], nature: "平", flavor: "甘、微苦", meridians: ["肝", "肾"], partUsed: "根", effects: ["逐瘀通经", "通利关节"], pinyin: "chuan niuxi", initials: "cnx" }),
  h("leonurus-japonicus", "益母草", { aliases: ["坤草"], nature: "微寒", flavor: "苦、辛", meridians: ["肝", "心包", "膀胱"], partUsed: "地上部分", effects: ["活血调经", "利尿"], pinyin: "yimucao", initials: "ymc" }),
  h("motherwort-fruit", "茺蔚子", { aliases: ["益母子"], nature: "寒", flavor: "甘", meridians: ["肝", "心包"], partUsed: "成熟果实", effects: ["活血调经", "清肝"], pinyin: "chongweizi", initials: "cwz" }),
  h("lignum-aquilariae", "沉香", { aliases: ["沉水香"], nature: "温", flavor: "辛、苦", meridians: ["脾", "胃", "肾"], partUsed: "含有树脂的木材", effects: ["行气止痛", "温中止呕"], pinyin: "chenxiang", initials: "cx" }),
  h("aquilaria-sinensis", "降香", { aliases: ["降真香"], nature: "温", flavor: "辛", meridians: ["肝", "脾"], partUsed: "心材", effects: ["行气活血", "止痛"], pinyin: "jiangxiang", initials: "jx" }),
  h("cyperus-rotundus", "香附", { aliases: ["莎草根"], nature: "平", flavor: "辛、微苦", meridians: ["肝", "脾", "三焦"], partUsed: "根茎", effects: ["疏肝解郁", "理气"], pinyin: "xiangfu", initials: "xf" }),
  h("curcuma-aromatica", "郁金", { aliases: ["黄郁金"], nature: "寒", flavor: "辛、苦", meridians: ["肝", "心", "肺"], partUsed: "块根", effects: ["活血止痛", "行气解郁"], pinyin: "yujin", initials: "yj" }),
  h("arctium-lappa", "牛蒡子", { aliases: ["大力子"], nature: "寒", flavor: "辛、苦", meridians: ["肺", "胃"], partUsed: "成熟果实", effects: ["疏散风热", "宣肺"], pinyin: "niubangzi", initials: "nbz" }),
  h("fructus-arctii", "牛蒡", { aliases: ["牛蒡根"], nature: "凉", flavor: "苦", meridians: ["肺", "胃"], partUsed: "根", effects: ["疏散风热", "解毒"], pinyin: "niubang", initials: "nb", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("lophatherum-gracile", "淡竹叶", { aliases: ["竹叶"], nature: "寒", flavor: "甘、淡", meridians: ["心", "胃", "小肠"], partUsed: "茎叶", effects: ["清热除烦", "利尿"], pinyin: "danzhuye", initials: "dzy" }),
  h("imperata-cylindrica", "白茅根", { aliases: ["茅根"], nature: "寒", flavor: "甘", meridians: ["肺", "胃", "膀胱"], partUsed: "根茎", effects: ["凉血止血", "清热利尿"], pinyin: "baimaogen", initials: "bmg", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("plantago-asiatca-seed", "车前子", { aliases: [], nature: "寒", flavor: "甘", meridians: ["肾", "肝", "肺", "小肠"], partUsed: "成熟种子", effects: ["清热利尿", "渗湿"], pinyin: "cheqianzi", initials: "cqz" }),
  h("talcum", "滑石", { aliases: ["画石"], nature: "寒", flavor: "甘、淡", meridians: ["膀胱", "肺", "胃"], partUsed: "矿物", effects: ["利尿通淋", "清热"], pinyin: "huashi", initials: "hs", caution: "矿物药，非食材，仅作中药参考。" }),
  h("lysimachia-christinae", "金钱草", { aliases: ["过路黄"], nature: "微寒", flavor: "甘、咸", meridians: ["肝", "胆", "肾", "膀胱"], partUsed: "全草", effects: ["利湿退黄", "利尿"], pinyin: "jinqiancao", initials: "jqc" }),
  h("artemisia-capillaris", "茵陈", { aliases: ["绵茵陈"], nature: "微寒", flavor: "苦、辛", meridians: ["脾", "胃", "肝", "胆"], partUsed: "地上部分", effects: ["清利湿热", "退黄"], pinyin: "yinchen", initials: "yc" }),
  h("rhubarb", "大黄", { aliases: ["川军", "锦纹"], nature: "寒", flavor: "苦", meridians: ["脾", "胃", "大肠", "肝", "心包"], partUsed: "根及根茎", effects: ["泻下攻积", "清热"], pinyin: "dahuang", initials: "dh", caution: "泻下力强，孕妇、体弱者禁用；非日常食材。" }),
  h("mirabilitum", "芒硝", { aliases: ["朴硝"], nature: "寒", flavor: "咸、苦", meridians: ["胃", "大肠"], partUsed: "矿物", effects: ["泻下通便", "润燥"], pinyin: "mangxiao", initials: "mx", caution: "矿物泻下药，不可自行食用。" }),
  h("cassia-seed", "决明子", { aliases: ["草决明"], nature: "微寒", flavor: "甘、苦、咸", meridians: ["肝", "大肠"], partUsed: "成熟种子", effects: ["清热明目", "润肠通便"], pinyin: "juemingzi", initials: "jmz", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("chrysanthemum-morifolium", "菊花", { aliases: ["杭菊", "亳菊"], nature: "微寒", flavor: "甘、苦", meridians: ["肺", "肝"], partUsed: "头状花序", effects: ["散风清热", "平肝"], pinyin: "juhua", initials: "jh", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("mulberry-leaf", "桑叶", { aliases: [], nature: "寒", flavor: "甘、苦", meridians: ["肺", "肝"], partUsed: "叶", effects: ["疏散风热", "清肺"], pinyin: "sangye", initials: "sy", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("moutan-cortex", "牡丹皮", { aliases: ["丹皮"], nature: "微寒", flavor: "苦、辛", meridians: ["心", "肝", "肾"], partUsed: "根皮", effects: ["清热凉血", "活血"], pinyin: "mudanpi", initials: "mdp" })
];

// Remove placeholder if accidentally added
const cleaned = herbs.filter((item) => !item.name.includes("placeholder"));

// Add remaining herbs to reach ~120
const more = [
  h("atractylodes-lancea", "苍术", { aliases: ["茅术"], nature: "温", flavor: "辛、苦", meridians: ["脾", "胃", "肝"], partUsed: "根茎", effects: ["燥湿健脾", "祛风"], pinyin: "cangzhu", initials: "cz" }),
  h("magnolia-officinalis", "厚朴", { aliases: ["川厚朴"], nature: "温", flavor: "苦、辛", meridians: ["脾", "胃", "肺", "大肠"], partUsed: "干皮、根皮及枝皮", effects: ["燥湿消痰", "下气"], pinyin: "houpo", initials: "hp" }),
  h("amomi-fructus", "砂仁", { aliases: ["阳春砂"], nature: "温", flavor: "辛", meridians: ["脾", "胃", "肾"], partUsed: "成熟果实", effects: ["化湿开胃", "温脾"], pinyin: "sharen", initials: "sr", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("aucklandia-lappa", "木香", { aliases: ["广木香"], nature: "温", flavor: "辛、苦", meridians: ["脾", "胃", "大肠", "胆", "三焦"], partUsed: "根", effects: ["行气止痛", "健脾"], pinyin: "muxiang", initials: "mx" }),
  h("zizyphus-jujuba-seed", "酸枣仁", { aliases: ["枣仁"], nature: "平", flavor: "甘、酸", meridians: ["心", "肝", "胆"], partUsed: "成熟种子", effects: ["养心补肝", "安神"], pinyin: "suanzaoren", initials: "szr", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("polygala-tenuifolia", "远志", { aliases: ["细叶远志"], nature: "温", flavor: "苦、辛", meridians: ["心", "肾", "肺"], partUsed: "根", effects: ["安神益智", "祛痰"], pinyin: "yuanzhi", initials: "yz" }),
  h("polygonum-multiflorum-raw", "何首乌", { aliases: ["首乌"], nature: "微温", flavor: "苦、甘、涩", meridians: ["肝", "心", "肾"], partUsed: "块根", effects: ["解毒", "消痈"], pinyin: "heshouwu", initials: "hsw", relatedForms: ["polygonum-multiflorum-processed"], caution: "生首乌与制首乌功效不同，不可混用。" }),
  h("polygonum-multiflorum-processed", "制何首乌", { aliases: ["制首乌", "熟地首乌"], nature: "温", flavor: "甘、苦", meridians: ["肝", "肾"], partUsed: "块根", effects: ["补肝肾", "强筋骨"], pinyin: "zhiheshouwu", initials: "zhsw", relatedForms: ["polygonum-multiflorum-raw"] }),
  h("cornus-officinalis", "山茱萸", { aliases: ["山萸肉", "枣皮"], nature: "微温", flavor: "酸、涩", meridians: ["肝", "肾"], partUsed: "成熟果肉", effects: ["补益肝肾", "涩精"], pinyin: "shanzhuyu", initials: "szy" }),
  h("euonymus-alatus", "鬼箭羽", { aliases: [], nature: "寒", flavor: "苦", meridians: ["肝", "脾"], partUsed: "茎翅", effects: ["破血通经", "解毒"], pinyin: "guijianyu", initials: "gjy" }),
  h("schisandra-chinensis", "五味子", { aliases: ["北五味"], nature: "温", flavor: "酸、甘", meridians: ["肺", "心", "肾"], partUsed: "成熟果实", effects: ["收敛固涩", "益气"], pinyin: "wuweizi", initials: "wwz" }),
  h("mume-fructus", "乌梅", { aliases: [], nature: "平", flavor: "酸、涩", meridians: ["肝", "脾", "肺", "大肠"], partUsed: "近成熟果实", effects: ["敛肺", "涩肠"], pinyin: "wumei", initials: "wm", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("terminalia-chebula", "诃子", { aliases: ["诃子肉"], nature: "平", flavor: "苦、酸、涩", meridians: ["肺", "大肠"], partUsed: "成熟果实", effects: ["敛肺", "涩肠"], pinyin: "hezi", initials: "hz" }),
  h("myristica-fragrans", "肉豆蔻", { aliases: ["玉果"], nature: "温", flavor: "辛", meridians: ["脾", "胃", "大肠"], partUsed: "成熟种子", effects: ["温中行气", "涩肠"], pinyin: "roudoukou", initials: "rdk", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("amomum-kravanh", "豆蔻", { aliases: ["白豆蔻"], nature: "温", flavor: "辛", meridians: ["肺", "脾", "胃"], partUsed: "成熟果实", effects: ["化湿行气", "温中"], pinyin: "doukou", initials: "dk", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("ginkgo-biloba-seed", "白果", { aliases: ["银杏"], nature: "平", flavor: "甘、苦、涩", meridians: ["肺", "肾"], partUsed: "成熟种子", effects: ["敛肺定喘", "止带"], pinyin: "baiguo", initials: "bg", caution: "生品有毒，需熟制，不可大量生食。" }),
  h("gastrodia-elata", "天麻", { aliases: [], nature: "平", flavor: "甘", meridians: ["肝"], partUsed: "块茎", effects: ["息风止痉", "平抑肝阳"], pinyin: "tianma", initials: "tm", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("uncaria-rhynchophylla", "钩藤", { aliases: [], nature: "凉", flavor: "甘", meridians: ["肝", "心包"], partUsed: "带钩茎枝", effects: ["息风定惊", "清热"], pinyin: "gouteng", initials: "gt" }),
  h("os-draconis", "龙骨", { aliases: ["花龙骨"], nature: "平", flavor: "甘、涩", meridians: ["心", "肝", "肾"], partUsed: "骨骼化石", effects: ["镇惊安神", "平肝"], pinyin: "longgu", initials: "lg", caution: "矿物/化石类，非食材。" }),
  h("concha-ostreae", "牡蛎", { aliases: ["生牡蛎"], nature: "微寒", flavor: "咸", meridians: ["肝", "胆", "肾"], partUsed: "贝壳", effects: ["重镇安神", "潜阳"], pinyin: "muli", initials: "ml" }),
  h("pearl", "珍珠", { aliases: [], nature: "寒", flavor: "甘、咸", meridians: ["心", "肝"], partUsed: "贝壳类矿物", effects: ["安神定惊", "明目"], pinyin: "zhenzhu", initials: "zz", caution: "矿物类，非食材。" }),
  h("radix-ginseng", "人参", { aliases: ["园参", "吉林参"], nature: "微温", flavor: "甘、微苦", meridians: ["脾", "肺", "心", "肾"], partUsed: "根", effects: ["大补元气", "复脉"], pinyin: "renshen", initials: "rs", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "reference-only", caution: "虽入药食同源目录，仍应按个体与剂量谨慎使用，不宜长期大量自行进补。" }),
  h("panax-quinquefolius", "西洋参", { aliases: ["花旗参"], nature: "凉", flavor: "甘、微苦", meridians: ["心", "肺", "肾"], partUsed: "根", effects: ["补气养阴", "清热"], pinyin: "xiyangshen", initials: "xys", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("radix-aconiti-carmichaeli", "附子", { aliases: ["川附子", "黑顺片"], nature: "热", flavor: "辛、甘", meridians: ["心", "肾", "脾"], partUsed: "子根加工品", effects: ["回阳救逆", "补火"], pinyin: "fuzi", initials: "fz", caution: "有大毒，必须炮制，严禁自行作为食材使用。" }),
  h("cinnamon-bark", "肉桂", { aliases: ["桂皮", "官桂"], nature: "热", flavor: "辛、甘", meridians: ["肾", "脾", "心", "肝"], partUsed: "树皮", effects: ["补火助阳", "散寒"], pinyin: "rougui", initials: "rg", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("cinnamomum-twigs", "桂枝", { aliases: ["柳桂"], nature: "温", flavor: "辛、甘", meridians: ["心", "肺", "膀胱"], partUsed: "嫩枝", effects: ["发汗解肌", "温通"], pinyin: "guizhi", initials: "gz" }),
  h("dryobalanops-aromatica", "冰片", { aliases: ["龙脑香"], nature: "微寒", flavor: "辛、苦", meridians: ["心", "脾", "肺"], partUsed: "加工结晶", effects: ["开窍醒神", "清热"], pinyin: "bingpian", initials: "bp", caution: "芳香走窜，非食材。" }),
  h("borneol-synthetic", "合成冰片", { aliases: [], nature: "微寒", flavor: "辛", meridians: ["心", "脾", "肺"], partUsed: "合成品", effects: ["开窍醒神"], pinyin: "hecheng bingpian", initials: "hcbp" }),
  h("moschus", "麝香", { aliases: [], nature: "温", flavor: "辛", meridians: ["心", "脾"], partUsed: "雄兽香囊", effects: ["开窍醒神", "活血"], pinyin: "shexiang", initials: "sx", caution: "贵重且受保护，应用受严格限制，仅作文献参考。" }),
  h("bufonis-venenum", "蟾酥", { aliases: [], nature: "温", flavor: "辛", meridians: ["心"], partUsed: "分泌物", effects: ["解毒", "止痛"], pinyin: "chansu", initials: "cs", caution: "有毒，严禁自行使用。" }),
  h("radix-anthricae", "白前", { aliases: [], nature: "微温", flavor: "辛、苦", meridians: ["肺"], partUsed: "根茎", effects: ["降气", "消痰"], pinyin: "baiqian", initials: "bq" }),
  h("stemona-japonica", "百部", { aliases: [], nature: "微温", flavor: "甘、苦", meridians: ["肺"], partUsed: "块根", effects: ["润肺下气", "止咳"], pinyin: "baibu", initials: "bb" }),
  h("tussilago-farfara", "款冬花", { aliases: ["冬花"], nature: "温", flavor: "辛、微苦", meridians: ["肺"], partUsed: "花蕾", effects: ["润肺下气", "止咳"], pinyin: "kuandonghua", initials: "kdh" }),
  h("aster-tataricus", "紫菀", { aliases: [], nature: "温", flavor: "辛、苦", meridians: ["肺"], partUsed: "根及根茎", effects: ["润肺下气", "化痰"], pinyin: "ziwan", initials: "zw" }),
  h("peucedanum-praeruptorum", "前胡", { aliases: [], nature: "微寒", flavor: "苦、辛", meridians: ["肺"], partUsed: "根", effects: ["降气化痰", "散风"], pinyin: "qianhu", initials: "qh" }),
  h("glehnia-littoralis", "北沙参", { aliases: ["沙参"], nature: "微寒", flavor: "甘、微苦", meridians: ["肺", "胃"], partUsed: "根", effects: ["养阴清肺", "益胃"], pinyin: "beishashen", initials: "bss" }),
  h("adenophora-stricta", "南沙参", { aliases: ["泡沙参"], nature: "微寒", flavor: "甘", meridians: ["肺", "胃"], partUsed: "根", effects: ["养阴清肺", "化痰"], pinyin: "nanshashen", initials: "nss" }),
  h("glechoma-longituba", "连钱草", { aliases: ["活血丹"], nature: "微寒", flavor: "辛", meridians: ["肝", "胆", "肾", "膀胱"], partUsed: "全草", effects: ["利湿通淋", "解毒"], pinyin: "lianqiancao", initials: "lqc" }),
  h("plantago-asiatca-herb", "车前草", { aliases: [], nature: "寒", flavor: "甘", meridians: ["肝", "肾", "肺", "小肠"], partUsed: "全草", effects: ["清热利尿", "祛痰"], pinyin: "cheqiancao", initials: "cqc" }),
  h("houttuynia-cordata", "鱼腥草", { aliases: ["折耳根"], nature: "微寒", flavor: "辛", meridians: ["肺"], partUsed: "地上部分", effects: ["清热解毒", "消痈"], pinyin: "yuxingcao", initials: "yxc", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("patrinia-villosa", "败酱草", { aliases: [], nature: "微寒", flavor: "辛、苦", meridians: ["胃", "大肠", "肝"], partUsed: "全草", effects: ["清热解毒", "消痈"], pinyin: "baijiangcao", initials: "bjc" }),
  h("viola-yedoensis", "紫花地丁", { aliases: ["地丁"], nature: "寒", flavor: "苦、辛", meridians: ["心", "肝"], partUsed: "全草", effects: ["清热解毒", "凉血"], pinyin: "zihuadiding", initials: "zhdd" }),
  h("sophora-flavescens", "苦参", { aliases: [], nature: "寒", flavor: "苦", meridians: ["心", "肝", "胃", "大肠", "膀胱"], partUsed: "根", effects: ["清热燥湿", "杀虫"], pinyin: "kushen", initials: "ks" }),
  h("flos-sophorae", "槐花", { aliases: ["槐米"], nature: "微寒", flavor: "苦", meridians: ["肝", "大肠"], partUsed: "花蕾", effects: ["凉血止血", "清肝"], pinyin: "huaihua", initials: "hh" }),
  h("sanguisorba-officinalis", "地榆", { aliases: [], nature: "微寒", flavor: "苦、酸、涩", meridians: ["肝", "大肠"], partUsed: "根", effects: ["凉血止血", "解毒"], pinyin: "diyu", initials: "dy" }),
  h("rubia-cordifolia", "茜草", { aliases: [], nature: "寒", flavor: "苦", meridians: ["肝", "心包", "肺"], partUsed: "根及根茎", effects: ["凉血", "祛瘀"], pinyin: "qiancao", initials: "qc" }),
  h("lithospermum-erythrorhizon", "紫草", { aliases: [], nature: "寒", flavor: "甘、咸", meridians: ["心", "心包", "肝经"], partUsed: "根", effects: ["凉血活血", "解毒"], pinyin: "zicao", initials: "zc" }),
  h("sophora-tonkinensis", "山豆根", { aliases: [], nature: "寒", flavor: "苦", meridians: ["肺", "胃"], partUsed: "根及根茎", effects: ["清热解毒", "消肿"], pinyin: "shandougen", initials: "sdg", caution: "有一定毒性，不可长期大量自用。" }),
  h("isatis-leaf", "大青叶", { aliases: [], nature: "寒", flavor: "苦", meridians: ["心", "胃"], partUsed: "叶", effects: ["清热解毒", "凉血"], pinyin: "daqingye", initials: "dqy" }),
  h("andrographis-paniculata", "穿心莲", { aliases: [], nature: "寒", flavor: "苦", meridians: ["心", "肺", "大肠", "膀胱"], partUsed: "地上部分", effects: ["清热解毒", "凉血"], pinyin: "chuanxinlian", initials: "cxl" }),
  h("oldenlandia-diffusa", "白花蛇舌草", { aliases: [], nature: "微寒", flavor: "甘、淡", meridians: ["胃", "大肠", "小肠"], partUsed: "全草", effects: ["清热解毒", "利湿"], pinyin: "baihuasheshecao", initials: "bhssc" }),
  h("prunella-vulgaris", "夏枯草", { aliases: [], nature: "寒", flavor: "辛、苦", meridians: ["肝", "胆"], partUsed: "果穗", effects: ["清肝泻火", "明目"], pinyin: "xiakucao", initials: "xkc" }),
  h("cnidium-monnieri", "蛇床子", { aliases: [], nature: "温", flavor: "辛、苦", meridians: ["肾", "脾"], partUsed: "成熟果实", effects: ["燥湿", "祛风"], pinyin: "shechuangzi", initials: "scz" }),
  h("kochia-scoparia", "地肤子", { aliases: [], nature: "寒", flavor: "辛、苦", meridians: ["肾", "膀胱"], partUsed: "成熟果实", effects: ["清热利湿", "祛风"], pinyin: "difuzi", initials: "dfz" }),
  h("tribulus-terrestris", "蒺藜", { aliases: ["刺蒺藜"], nature: "平", flavor: "辛、苦", meridians: ["肝"], partUsed: "成熟果实", effects: ["平肝解郁", "活血"], pinyin: "jili", initials: "jl" }),
  h("eucommia-leaf", "杜仲叶", { aliases: [], nature: "温", flavor: "微辛", meridians: ["肝", "肾"], partUsed: "叶", effects: ["补肝肾", "强筋骨"], pinyin: "duzhongye", initials: "dzy", officialFoodMedicine: true, itemKind: "food-medicine", usageScope: "dietary-therapy" }),
  h("semen-celosiae", "青葙子", { aliases: [], nature: "微寒", flavor: "苦", meridians: ["肝"], partUsed: "成熟种子", effects: ["清热泻火", "明目"], pinyin: "qingxiangzi", initials: "qxz" }),
  h("cassia-tora", "决明子 alias", { aliases: [], nature: "平", flavor: "甘", meridians: [], partUsed: "", effects: [], summary: "dup skip" })
].filter((item) => !item.summary?.includes("dup skip"));

const all = [...cleaned, ...more];
const byId = new Map();
all.forEach((item) => byId.set(item.id, item));
const finalList = [...byId.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(finalList, null, 2), "utf8");
console.log(`Wrote ${finalList.length} herbs to ${outPath}`);
