/** Traditional regional dao-di taxonomy (chinadaodiyaocai.com yaocai ids). */
export const DAO_DI_SYSTEM_PAGES = [
  {
    id: "guanyao",
    name: "关药",
    siteYaocaiId: 13,
    region: "山海关以北、东北三省及内蒙古东部",
    provinces: ["辽宁", "吉林", "黑龙江", "内蒙古"],
    summary: "关药为东北道地药材区，人参、鹿茸、辽五味、关黄柏等为代表。"
  },
  {
    id: "beiyao",
    name: "北药",
    siteYaocaiId: 15,
    region: "河北、山东、山西及内蒙古中部",
    provinces: ["河北", "山东", "山西", "内蒙古"],
    summary: "北药为华北道地药材区，党参、酸枣仁、知母、黄芩、阿胶等为代表。"
  },
  {
    id: "huaiyao",
    name: "怀药",
    siteYaocaiId: 27,
    region: "河南焦作（古怀庆府）及周边",
    provinces: ["河南"],
    summary: "怀药以四大怀药（地黄、牛膝、山药、菊花）及河南道地品种为代表。"
  },
  {
    id: "zheyao",
    name: "浙药",
    siteYaocaiId: 28,
    region: "浙江及相邻江南地区",
    provinces: ["浙江"],
    summary: "浙药以浙八味（白术、白芍、浙贝母、杭菊花等）及温郁金、杭麦冬为代表。"
  },
  {
    id: "nanyao",
    name: "南药",
    siteYaocaiId: 29,
    region: "华南及岭南地区",
    provinces: ["广东", "广西", "海南", "福建"],
    summary: "南药为岭南道地药材区，槟榔、砂仁、益智、巴戟天等为代表。"
  },
  {
    id: "chuanyao",
    name: "川药",
    siteYaocaiId: 30,
    region: "四川及西南盆地",
    provinces: ["四川", "重庆"],
    summary: "川药为西南道地药材核心区，川芎、黄连、川贝母、附子、麦冬等为代表。"
  },
  {
    id: "yunyao",
    name: "云药",
    siteYaocaiId: 31,
    region: "云南",
    provinces: ["云南"],
    summary: "云药为云南道地药材区，三七、天麻、茯苓、木香、滇重楼等为代表。"
  },
  {
    id: "guiyao",
    name: "贵药",
    siteYaocaiId: 32,
    region: "贵州",
    provinces: ["贵州"],
    summary: "贵药为贵州道地药材区，杜仲、天麻、何首乌、朱砂等为代表。"
  },
  {
    id: "guangyao",
    name: "广药",
    siteYaocaiId: 33,
    region: "广东及港澳岭南一带",
    provinces: ["广东"],
    summary: "广药以陈皮、广藿香、化橘红、阳春砂、广金钱草等为代表。"
  },
  {
    id: "huaiyao-huai",
    name: "淮药",
    siteYaocaiId: 34,
    region: "淮河流域及苏北、皖北",
    provinces: ["江苏", "安徽", "山东"],
    summary: "淮药为淮河流域道地药材区，半夏、桔梗、白芍、牡丹皮等为代表。"
  },
  {
    id: "zangyao",
    name: "藏药",
    siteYaocaiId: 35,
    region: "青藏高原",
    provinces: ["西藏", "青海"],
    summary: "藏药为青藏高原民族医药体系，冬虫夏草、川贝母、大黄、红景天等为代表。"
  },
  {
    id: "qinyao",
    name: "秦药",
    siteYaocaiId: 36,
    region: "陕西、甘肃及西北黄土高原",
    provinces: ["陕西", "甘肃", "宁夏"],
    summary: "秦药为西北道地药材区，当归、大黄、黄芪、枸杞、秦艽等为代表。"
  },
  {
    id: "weiyao",
    name: "维药",
    siteYaocaiId: 37,
    region: "新疆",
    provinces: ["新疆"],
    summary: "维药为新疆民族医药体系，伊贝母、肉苁蓉、罗布麻、甘草等为代表。"
  },
  {
    id: "haiyao",
    name: "海药",
    siteYaocaiId: 38,
    region: "沿海及海洋药材",
    provinces: ["海南", "广东", "福建", "浙江"],
    summary: "海药为海洋及近海药用生物资源，海马、牡蛎、珍珠、昆布等为代表。"
  },
  {
    id: "mengyao",
    name: "蒙药",
    siteYaocaiId: 39,
    region: "内蒙古及蒙古高原",
    provinces: ["内蒙古"],
    summary: "蒙药为蒙古族医药体系，黄芪、甘草、肉苁蓉、沙棘、麻黄等为代表。"
  }
];

export const DAO_DI_SYSTEM_BY_NAME = Object.fromEntries(
  DAO_DI_SYSTEM_PAGES.map((row) => [row.name, row.id])
);
