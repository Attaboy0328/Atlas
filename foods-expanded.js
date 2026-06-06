const CAT_OFFICIAL = "\u98df\u836f\u7269\u8d28";
const CAT_GRAIN = "\u8c37\u7269";
const CAT_DRINK = "\u996e\u54c1";
const CAT_TEA = "\u8336\u996e";
const CAT_VEG = "\u852c\u83dc";
const CAT_WILD = "\u91ce\u83dc";
const CAT_FUNGI = "\u83cc\u83c7";
const CAT_FRUIT = "\u6c34\u679c";
const CAT_PROTEIN = "\u8089\u86cb\u5976";
const CAT_SEA = "\u6d77\u4ea7";
const CAT_CONDIMENT = "\u8c03\u6599";
const CAT_PICKLE = "\u814c\u83dc";
const CAT_TONIC = "\u6ecb\u8865\u98df\u6750";
const CAT_NUT = "\u575a\u679c\u79cd\u5b50";
const CAT_BEAN = "\u8c46\u7c7b";
const CAT_BEAN_PRODUCT = "\u8c46\u5236\u54c1";
const CAT_STARCH = "\u85af\u7c7b";
const CAT_FERMENTED = "\u53d1\u9175\u98df\u54c1";

const N_COLD = "\u5bd2";
const N_COOL = "\u51c9";
const N_NEUTRAL = "\u5e73";
const N_WARM = "\u6e29";
const N_HOT = "\u70ed";

const EXPANDED_FOODS = [
  f("yam", "\u5c71\u836f", N_NEUTRAL, CAT_OFFICIAL, ["huai shan"], ["\u5065\u813e", "\u548c\u4e2d"], ["CN"], {
    officialFoodMedicine: true,
    officialBatch: "2023",
    confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee",
    searchTerms: ["\u813e\u6c14\u865a", "\u80c3\u6c14\u865a"],
    summary: "\u5c71\u836f\u662f\u98df\u7597\u4e0e\u65e5\u5e38\u98df\u517b\u91cc\u90fd\u5f88\u6838\u5fc3\u7684\u98df\u6750\uff0c\u5e38\u88ab\u7528\u6765\u6574\u7406\u5065\u813e\u548c\u80c3\u3001\u76ca\u6c14\u517b\u9634\u8fd9\u7c7b\u573a\u666f\u3002",
    benefits: ["\u4f20\u7edf\u5e38\u4ece\u201c\u8865\u813e\u80c3\u3001\u76ca\u80ba\u80be\u201d\u53bb\u7406\u89e3\u5c71\u836f", "\u5728\u7ca5\u3001\u6c64\u3001\u7fb9\u548c\u6e29\u548c\u4e3b\u98df\u91cc\u90fd\u5e38\u7528"],
    alone: "\u5355\u72ec\u5403\u4e5f\u6bd4\u8f83\u5e73\u548c\uff0c\u66f4\u9002\u5408\u719f\u98df\uff0c\u80c3\u80a0\u654f\u611f\u65f6\u4f18\u5148\u505a\u6210\u7ca5\u3001\u7fb9\u6216\u84b8\u98df\u3002",
    timing: "\u66f4\u9002\u5408\u653e\u5728\u6b63\u9910\u6216\u6062\u590d\u671f\u7684\u89c4\u5f8b\u996e\u98df\u91cc\uff0c\u4e0d\u9700\u8981\u9760\u6781\u7aef\u5403\u6cd5\u53bb\u201c\u8865\u201d\u3002",
    pair: "\u5e38\u4e0e\u5927\u7c73\u3001\u5c0f\u7c73\u3001\u83b2\u5b50\u3001\u767e\u5408\u3001\u7626\u8089\u3001\u9e21\u8089\u642d\u914d\uff0c\u66f4\u50cf\u662f\u4e00\u79cd\u57fa\u5e95\u578b\u98df\u6750\u3002",
    suitableFor: ["\u98df\u6b32\u5dee\u3001\u8fde\u7eed\u75b2\u4e4f\u3001\u813e\u80c3\u504f\u865a\u7684\u65e5\u5e38\u8c03\u517b\u4eba\u7fa4"],
    avoidFor: ["\u660e\u663e\u80c0\u6ee1\u4e14\u79ef\u6ede\u672a\u5316\u65f6\u4e0d\u5b9c\u4e00\u6b21\u5403\u5f97\u592a\u591a"],
    sources: [
      { title: "\u300a\u795e\u519c\u672c\u8349\u7ecf\u300b", summary: "\u65e9\u671f\u672c\u8349\u4f20\u7edf\u4e2d\u5df2\u5c06\u5c71\u836f\u7eb3\u5165\u8865\u76ca\u8303\u7574\uff0c\u5f3a\u8c03\u5176\u5e73\u548c\u6301\u517b\u7684\u8def\u5f84\u3002" },
      { title: "\u300a\u672c\u8349\u7eb2\u76ee\u300b", summary: "\u5bf9\u5c71\u836f\u7684\u5065\u813e\u3001\u76ca\u80be\u3001\u52a9\u8fd0\u5316\u7b49\u7528\u6cd5\u6709\u66f4\u7cfb\u7edf\u7684\u6574\u7406\u3002" },
      { title: "\u300a\u996e\u81b3\u6b63\u8981\u300b", summary: "\u628a\u5c71\u836f\u653e\u56de\u5230\u996e\u98df\u573a\u666f\u91cc\uff0c\u5f3a\u8c03\u5b83\u80fd\u505a\u6210\u65e5\u5e38\u8c03\u517b\u4e4b\u54c1\u3002" }
    ],
    safetyNote: "\u73b0\u4ee3\u66f4\u5e94\u8be5\u628a\u5c71\u836f\u770b\u6210\u201c\u6e29\u548c\u53ef\u957f\u671f\u8fdb\u98df\u7684\u98df\u6750\u201d\uff0c\u800c\u4e0d\u662f\u9ad8\u5242\u91cf\u8fdb\u8865\u54c1\u3002"
  }),
  f("lotus-seed", "\u83b2\u5b50", N_NEUTRAL, CAT_OFFICIAL, ["lianzi"], ["\u8865\u813e", "\u517b\u5fc3"], ["CN"], {
    officialFoodMedicine: true,
    officialBatch: "2002",
    confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee",
    summary: "\u83b2\u5b50\u5728\u4f20\u7edf\u98df\u517b\u91cc\u5e38\u7528\u4e8e\u8865\u813e\u3001\u517b\u5fc3\u3001\u56fa\u6444\uff0c\u5728\u98df\u7597\u65b9\u91cc\u51fa\u573a\u9891\u7387\u5f88\u9ad8\u3002",
    benefits: ["\u5e38\u89c1\u573a\u666f\u662f\u813e\u80c3\u504f\u865a\u3001\u5fc3\u795e\u4e0d\u5b81\u6216\u9700\u8981\u505a\u5f97\u66f4\u5e73\u548c\u4e00\u70b9\u7684\u7ca5\u7fb9", "\u548c\u767e\u5408\u3001\u5c71\u836f\u3001\u7ea2\u67a3\u642d\u914d\u65f6\u6700\u5e38\u89c1"],
    pair: "\u5e38\u4e0e\u767e\u5408\u3001\u5c71\u836f\u3001\u7ea2\u67a3\u3001\u7ca5\u7c73\u540c\u7528\uff0c\u9002\u5408\u505a\u6210\u66f4\u6e29\u548c\u7684\u98df\u7597\u7ed3\u6784\u3002",
    sources: [
      { title: "\u300a\u672c\u8349\u7eb2\u76ee\u300b", summary: "\u5bf9\u83b2\u5b50\u7684\u8865\u813e\u3001\u517b\u5fc3\u3001\u56fa\u6444\u7b49\u7406\u89e3\u6bd4\u8f83\u96c6\u4e2d\u3002" },
      { title: "\u300a\u517b\u8001\u5949\u4eb2\u4e66\u300b", summary: "\u5728\u504f\u65e5\u5e38\u98df\u517b\u7684\u8bed\u5883\u91cc\uff0c\u83b2\u5b50\u88ab\u5f53\u4f5c\u8001\u5e74\u4e0e\u865a\u5f31\u8c03\u517b\u98df\u6750\u4e4b\u4e00\u3002" }
    ],
    safetyNote: "\u83b2\u5b50\u504f\u5e73\u548c\uff0c\u4f46\u4ecd\u8981\u7ed3\u5408\u6444\u5165\u91cf\u3001\u6d88\u5316\u72b6\u6001\u4e0e\u6574\u4f53\u996e\u98df\u7ed3\u6784\u6765\u770b\u3002"
  }),
  f("astragalus", "\u9ec4\u82aa", N_WARM, CAT_OFFICIAL, ["huangqi"], ["\u8865\u6c14"], ["CN"], {
    officialFoodMedicine: true,
    officialBatch: "2023",
    confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee",
    searchTerms: ["\u4e2d\u6c14\u4e0b\u9677"],
    cautionTags: ["medication"],
    summary: "\u9ec4\u82aa\u66f4\u50cf\u662f\u201c\u6709\u660e\u786e\u8c03\u517b\u65b9\u5411\u7684\u836f\u98df\u6750\u201d\uff0c\u5e38\u51fa\u73b0\u5728\u8865\u6c14\u3001\u56fa\u8868\u3001\u8865\u4e2d\u7c7b\u98df\u7597\u4e2d\u3002",
    benefits: ["\u5f88\u591a\u98df\u7597\u65b9\u662f\u501f\u7528\u201c\u8865\u6c14\u201d\u8fd9\u4e2a\u4e3b\u8f74\u6765\u7528\u9ec4\u82aa", "\u4e0d\u662f\u6240\u6709\u4eba\u90fd\u9700\u8981\u957f\u671f\u65e5\u5e38\u52a0\u5927\u91cf\u6444\u5165"],
    pair: "\u5e38\u4e0e\u515a\u53c2\u3001\u7ea2\u67a3\u3001\u7cb3\u7c73\u3001\u9e21\u8089\u3001\u5c71\u836f\u642d\u914d\uff0c\u7528\u6765\u628a\u8865\u6c14\u65b9\u5411\u505a\u5f97\u66f4\u5e73\u548c\u3002",
    sources: [
      { title: "\u300a\u795e\u519c\u672c\u8349\u7ecf\u300b", summary: "\u9ec4\u82aa\u5728\u65e9\u671f\u672c\u8349\u4f20\u7edf\u4e2d\u5df2\u88ab\u7eb3\u5165\u8865\u76ca\u4e0a\u54c1\u4e4b\u5217\u3002" },
      { title: "\u300a\u8102\u80c3\u8bba\u300b", summary: "\u5728\u8102\u80c3\u6c14\u865a\u3001\u4e2d\u6c14\u4e0d\u8db3\u7684\u8def\u5f84\u91cc\uff0c\u9ec4\u82aa\u662f\u975e\u5e38\u5178\u578b\u7684\u8865\u6c14\u6743\u91cd\u98df\u6750\u3002" },
      { title: "\u300a\u672c\u8349\u7eb2\u76ee\u300b", summary: "\u5bf9\u9ec4\u82aa\u7684\u8865\u6c14\u3001\u6258\u8868\u3001\u751f\u808c\u7b49\u4f20\u7edf\u7406\u89e3\u8fdb\u884c\u4e86\u7cfb\u7edf\u5f52\u7eb3\u3002" }
    ],
    safetyNote: "\u6b63\u5728\u670d\u836f\u3001\u517c\u6709\u514d\u75ab\u6216\u6162\u75c5\u7ba1\u7406\u9700\u6c42\u65f6\uff0c\u4e0d\u8981\u628a\u9ec4\u82aa\u5f53\u6210\u666e\u901a\u8c03\u5473\u98df\u6750\u968f\u610f\u957f\u671f\u53e0\u52a0\u3002"
  }),
  f("codonopsis", "\u515a\u53c2", N_NEUTRAL, CAT_OFFICIAL, ["dangshen"], ["\u8865\u6c14", "\u5065\u813e"], ["CN"], { officialFoodMedicine: true, officialBatch: "2023", confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee" }),
  f("poria", "\u832f\u82d3", N_NEUTRAL, CAT_OFFICIAL, ["fuling"], ["\u5065\u813e", "\u6e17\u6e7f"], ["CN"], { officialFoodMedicine: true, officialBatch: "2002", confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee" }),
  f("coix-seed", "\u858f\u7c73", N_COOL, CAT_OFFICIAL, ["coix seed"], ["\u6e17\u6e7f"], ["CN"], { officialFoodMedicine: true, officialBatch: "2002", confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee" }),
  f("lily-bulb", "\u767e\u5408", N_COOL, CAT_OFFICIAL, ["baihe"], ["\u517b\u9634", "\u6da6\u71e5"], ["CN"], {
    officialFoodMedicine: true,
    officialBatch: "2002",
    confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee",
    searchTerms: ["\u80c3\u9634\u865a", "\u80ba\u9634\u865a"],
    summary: "\u767e\u5408\u5728\u4f20\u7edf\u98df\u517b\u91cc\u5e38\u88ab\u7528\u6765\u505a\u6da6\u517b\u3001\u5b89\u795e\u3001\u7f13\u548c\u706b\u70ed\u611f\u7684\u996e\u98df\u7ed3\u6784\u3002",
    sources: [
      { title: "\u300a\u795e\u519c\u672c\u8349\u7ecf\u300b", summary: "\u767e\u5408\u5f88\u65e9\u5c31\u8fdb\u5165\u672c\u8349\u8bb0\u8f7d\uff0c\u5c5e\u4e8e\u80fd\u957f\u671f\u6574\u7406\u7684\u6ecb\u517b\u7c7b\u98df\u6750\u3002" },
      { title: "\u300a\u98df\u7597\u672c\u8349\u300b", summary: "\u767e\u5408\u5728\u996e\u98df\u5316\u573a\u666f\u91cc\u88ab\u53cd\u590d\u7528\u4e8e\u6da6\u517b\u4e0e\u6e29\u548c\u8c03\u517b\u3002" }
    ],
    safetyNote: "\u767e\u5408\u8d70\u7684\u662f\u201c\u6e05\u6da6\u201d\u8def\u5f84\uff0c\u8179\u6cfb\u6216\u660e\u663e\u865a\u5bd2\u65f6\u4e0d\u5b9c\u8fc7\u91cf\u8d70\u6e05\u6da6\u5403\u6cd5\u3002"
  }),
  f("white-fungus", "\u94f6\u8033", N_NEUTRAL, CAT_OFFICIAL, ["snow fungus"], ["\u6da6\u71e5"], ["CN"], {
    officialFoodMedicine: true,
    officialBatch: "2002",
    confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee",
    summary: "\u94f6\u8033\u662f\u5f88\u5178\u578b\u7684\u201c\u996e\u98df\u5316\u6da6\u517b\u98df\u6750\u201d\uff0c\u5e38\u7528\u6765\u505a\u6e29\u548c\u7684\u6da6\u80ba\u3001\u517b\u80c3\u3001\u751f\u6d25\u573a\u666f\u3002",
    sources: [
      { title: "\u300a\u672c\u8349\u62fe\u9057\u300b", summary: "\u540e\u4e16\u5bf9\u83cc\u800c\u53ef\u98df\u4e4b\u54c1\u7684\u7406\u89e3\u9010\u6b65\u4e30\u5bcc\uff0c\u94f6\u8033\u4e5f\u88ab\u653e\u5165\u6da6\u517b\u98df\u6750\u7684\u8bed\u5883\u91cc\u3002" },
      { title: "\u300a\u968f\u56ed\u98df\u5355\u300b", summary: "\u66f4\u504f\u996e\u98df\u5ba1\u7f8e\u4e0e\u65e5\u5e38\u70f9\u8c03\u8def\u7ebf\uff0c\u8fd9\u7c7b\u6da6\u54c1\u6700\u9002\u5408\u88ab\u653e\u8fdb\u6c64\u7fb9\u4e0e\u751c\u54c1\u7ed3\u6784\u91cc\u3002" }
    ],
    safetyNote: "\u73b0\u4ee3\u66f4\u9700\u8981\u6ce8\u610f\u7684\u662f\u6ce1\u53d1\u4e0e\u4fdd\u5b58\u536b\u751f\uff0c\u800c\u4e0d\u662f\u628a\u94f6\u8033\u7b80\u5355\u7406\u89e3\u6210\u201c\u8c01\u90fd\u8be5\u5927\u91cf\u8fdb\u8865\u201d\u3002"
  }),
  f("chenpi", "\u9648\u76ae", N_WARM, CAT_OFFICIAL, ["dried tangerine peel"], ["\u7406\u6c14", "\u548c\u80c3"], ["CN"], {
    officialFoodMedicine: true,
    officialBatch: "2002",
    confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee",
    searchTerms: ["\u7406\u6c14", "\u809d\u80c3\u4e0d\u548c"],
    summary: "\u9648\u76ae\u5728\u996e\u98df\u91cc\u6700\u5e38\u89c1\u7684\u4efb\u52a1\u662f\u7406\u6c14\u3001\u548c\u80c3\u3001\u53bb\u815b\uff0c\u5c24\u5176\u5e38\u7528\u4e8e\u996d\u540e\u80c0\u6ee1\u3001\u6cb9\u817b\u79ef\u6ede\u611f\u7684\u8c03\u6574\u3002",
    sources: [
      { title: "\u300a\u672c\u8349\u7eb2\u76ee\u300b", summary: "\u5bf9\u9648\u76ae\u7684\u7406\u6c14\u3001\u71e5\u6e7f\u3001\u548c\u4e2d\u7b49\u8def\u5f84\u6709\u8f83\u5b8c\u6574\u7684\u6a02\u7edc\u3002" },
      { title: "\u300a\u98df\u7597\u672c\u8349\u300b", summary: "\u9648\u76ae\u4e0d\u53ea\u662f\u836f\u6750\uff0c\u4e5f\u5e38\u88ab\u5f53\u6210\u65e5\u5e38\u996e\u98df\u8c03\u6c14\u7684\u8f85\u52a9\u6750\u6599\u3002" },
      { title: "\u300a\u8102\u80c3\u8bba\u300b", summary: "\u5728\u8102\u80c3\u6c14\u673a\u4e0d\u7545\u3001\u8fd0\u5316\u4e0d\u5229\u7684\u7cfb\u8def\u91cc\uff0c\u9648\u76ae\u975e\u5e38\u5e38\u89c1\u3002" }
    ],
    safetyNote: "\u9648\u76ae\u867d\u7136\u53ef\u5165\u996e\u98df\uff0c\u4f46\u8d70\u7684\u4ecd\u662f\u504f\u8c03\u6c14\u7684\u8def\u5f84\uff0c\u53cd\u6d41\u3001\u53e3\u5e72\u660e\u663e\u65f6\u4e0d\u5b9c\u6781\u7aef\u53e0\u52a0\u8f9b\u71e5\u5403\u6cd5\u3002"
  }),
  f("ginger", "\u751f\u59dc", N_WARM, CAT_OFFICIAL, ["ginger"], ["\u6e29\u4e2d", "\u6563\u5bd2"], ["CN"], { officialFoodMedicine: true, officialBatch: "2002", confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee" }),
  f("jujube", "\u7ea2\u67a3", N_WARM, CAT_OFFICIAL, ["jujube"], ["\u8865\u4e2d", "\u517b\u8840"], ["CN"], { officialFoodMedicine: true, officialBatch: "2002", confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee" }),
  f("hawthorn", "\u5c71\u6942", N_WARM, CAT_OFFICIAL, ["haw"], ["\u6d88\u98df"], ["CN"], { officialFoodMedicine: true, officialBatch: "2002", confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee" }),
  f("luo-han-guo", "\u7f57\u6c49\u679c", N_COOL, CAT_OFFICIAL, ["monk fruit"], ["\u751f\u6d25"], ["CN"], { officialFoodMedicine: true, officialBatch: "2002", confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee" }),
  f("mint", "\u8584\u8377", N_COOL, CAT_OFFICIAL, ["mint"], ["\u6e05\u5229"], ["CN"], { officialFoodMedicine: true, officialBatch: "2002", confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee" }),
  f("chrysanthemum", "\u83ca\u82b1", N_COOL, CAT_OFFICIAL, ["chrysanthemum"], ["\u6e05\u5229"], ["CN"], { officialFoodMedicine: true, officialBatch: "2002", confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee" }),
  f("bergamot", "\u4f5b\u624b", N_WARM, CAT_OFFICIAL, ["bergamot"], ["\u884c\u6c14", "\u548c\u4e2d"], ["CN"], { officialFoodMedicine: true, officialBatch: "2002", confidence: "\u836f\u98df\u540c\u6e90\u4e13\u9898\u6761\u76ee", searchTerms: ["\u884c\u6c14", "\u7406\u6c14"] }),

  f("rice", "\u5927\u7c73", N_NEUTRAL, CAT_GRAIN, ["rice"], ["\u548c\u4e2d"], ["CN", "JP", "KR", "SG", "MY", "TH"]),
  f("millet", "\u5c0f\u7c73", N_COOL, CAT_GRAIN, ["millet"], ["\u548c\u80c3"], ["CN"], { searchTerms: ["\u80c3\u6c14\u865a"] }),
  f("malt", "\u9ea6\u82bd", N_NEUTRAL, CAT_OFFICIAL, ["malt"], ["\u6d88\u98df", "\u548c\u4e2d"], ["CN"], { officialFoodMedicine: true, officialBatch: "2002", confidence: "\u98df\u7597\u4e0e\u65e5\u5e38\u6d88\u98df\u573a\u666f\u5e38\u89c1" }),
  f("glutinous-rice", "\u7cef\u7c73", N_WARM, CAT_GRAIN, ["sticky rice"], ["\u8865\u4e2d"], ["CN", "JP", "KR", "TH"]),
  f("oats", "\u71d5\u9ea6", N_NEUTRAL, CAT_GRAIN, ["oat"], ["\u548c\u4e2d"], ["CN", "US", "UK", "AU"]),
  f("corn", "\u7389\u7c73", N_NEUTRAL, CAT_GRAIN, ["corn"], ["\u548c\u4e2d"], ["CN", "US"]),
  f("buckwheat", "\u835e\u9ea6", N_COOL, CAT_GRAIN, ["buckwheat"], ["\u6e05\u5229"], ["CN", "RU"]),
  f("red-bean", "\u7ea2\u8c46", N_NEUTRAL, CAT_BEAN, ["adzuki bean"], ["\u5229\u6c34"], ["CN", "JP", "KR"], { searchTerms: ["\u8d64\u5c0f\u8c46"] }),
  f("mung-bean", "\u7eff\u8c46", N_COLD, CAT_BEAN, ["mung bean"], ["\u6e05\u5229"], ["CN", "TH", "SG", "MY"]),
  f("soybean", "\u9ec4\u8c46", N_NEUTRAL, CAT_BEAN, ["soybean"], ["\u8865\u76ca"], ["CN", "JP", "KR"]),
  f("black-bean", "\u9ed1\u8c46", N_NEUTRAL, CAT_BEAN, ["black soybean"], ["\u6ecb\u517b"], ["CN"]),

  f("soy-milk", "\u8c46\u6d46", N_NEUTRAL, CAT_DRINK, ["soy milk"], ["\u548c\u4e2d"], ["CN"], { searchTerms: ["dj"] }),
  f("milk", "\u725b\u5976", N_NEUTRAL, CAT_DRINK, ["milk"], ["\u6ecb\u517b"], ["CN", "US", "UK", "FR", "DE", "AU", "RU"], { cautionTags: ["diarrhea"] }),
  f("yogurt", "\u9178\u5976", N_NEUTRAL, CAT_DRINK, ["yogurt"], ["\u548c\u4e2d"], ["CN", "FR", "DE", "RU"], { cautionTags: ["diarrhea"] }),
  f("coffee", "\u5496\u5561", N_WARM, CAT_DRINK, ["coffee"], ["\u63d0\u795e"], ["CN", "US", "FR", "DE", "AU"], { cautionTags: ["reflux", "iron", "hypertension"] }),
  f("sour-plum-drink", "\u9178\u6885\u6c64", N_NEUTRAL, CAT_DRINK, ["plum drink"], ["\u751f\u6d25"], ["CN"]),
  f("herbal-cooling-tea", "\u51c9\u8336", N_COOL, CAT_DRINK, ["liangcha"], ["\u6e05\u5229"], ["CN"], { cautionTags: ["medication"] }),
  tea("green-tea", "\u7eff\u8336", N_COOL, "\u7eff\u8336", ["green tea"], ["\u6e05\u5229"], ["CN", "JP", "KR", "UK"]),
  tea("black-tea", "\u7ea2\u8336", N_WARM, "\u7ea2\u8336", ["black tea"], ["\u63d0\u795e"], ["CN", "UK"]),
  tea("white-tea", "\u767d\u8336", N_COOL, "\u767d\u8336", ["white tea"], ["\u6e05\u6da6"], ["CN"]),
  tea("yellow-tea", "\u9ec4\u8336", N_NEUTRAL, "\u9ec4\u8336", ["yellow tea"], ["\u63d0\u795e"], ["CN"]),
  tea("oolong-tea", "\u4e4c\u9f99\u8336", N_NEUTRAL, "\u4e4c\u9f99\u8336", ["oolong tea"], ["\u548c\u4e2d"], ["CN", "TH"]),
  tea("dark-tea", "\u9ed1\u8336", N_WARM, "\u9ed1\u8336", ["dark tea"], ["\u548c\u4e2d"], ["CN"]),

  f("tomato", "\u897f\u7ea2\u67ff", N_COOL, CAT_VEG, ["\u756a\u8304", "tomato"], ["\u751f\u6d25", "\u5065\u80c3"], ["CN", "JP", "KR", "US", "UK"], { searchTerms: ["\u5723\u5973\u679c"] }),
  f("water-spinach", "\u7a7a\u5fc3\u83dc", N_COLD, CAT_VEG, ["water spinach"], ["\u6e05\u5229"], ["CN", "TH", "SG", "MY"], { searchTerms: ["kxc"] }),
  f("bamboo-shoot", "\u7af9\u7b0b", N_COLD, CAT_VEG, ["bamboo shoot"], ["\u6e05\u5229"], ["CN", "JP"], { searchTerms: ["\u7b0b"] }),
  f("white-radish", "\u767d\u841d\u535c", N_COOL, CAT_VEG, ["radish"], ["\u7406\u6c14", "\u7834\u6c14", "\u964d\u6c14"], ["CN", "JP", "KR"], { searchTerms: ["\u7406\u6c14", "\u7834\u6c14", "\u964d\u6c14", "\u987a\u6c14"] }),
  f("bitter-melon", "\u82e6\u74dc", N_COLD, CAT_VEG, ["bitter gourd"], ["\u6e05\u5229"], ["CN", "TH", "SG", "MY"]),
  f("cucumber", "\u9ec4\u74dc", N_COOL, CAT_VEG, ["cucumber"], ["\u6e05\u5229"], ["CN", "JP", "KR"]),
  f("wax-gourd", "\u51ac\u74dc", N_COOL, CAT_VEG, ["winter melon"], ["\u6e05\u5229"], ["CN"]),
  f("pumpkin", "\u5357\u74dc", N_WARM, CAT_VEG, ["pumpkin"], ["\u548c\u4e2d"], ["CN", "US", "UK", "AU"]),
  f("baby-cabbage", "\u5a03\u5a03\u83dc", N_NEUTRAL, CAT_VEG, ["baby cabbage"], ["\u548c\u4e2d"], ["CN"]),
  f("xuelihong", "\u96ea\u91cc\u7ea2", N_WARM, CAT_PICKLE, ["mustard greens pickle"], ["\u5f00\u80c3"], ["CN"], { cautionTags: ["hypertension"] }),
  f("garlic-yellow", "\u849c\u9ec4", N_WARM, CAT_VEG, ["garlic yellow"], ["\u6e29\u4e2d"], ["CN"]),
  f("malabar-spinach", "\u6728\u8033\u83dc", N_COOL, CAT_VEG, ["malabar spinach"], ["\u6da6\u71e5"], ["CN", "SG", "MY"]),
  f("ercai", "\u513f\u83dc", N_COOL, CAT_VEG, ["ercai"], ["\u6e05\u5229"], ["CN"]),
  f("pea-shoot", "\u8c4c\u8c46\u5c16", N_NEUTRAL, CAT_VEG, ["pea shoot"], ["\u548c\u4e2d"], ["CN"]),
  f("purslane", "\u9a6c\u9f7f\u82cb", N_COLD, CAT_WILD, ["purslane"], ["\u6e05\u5229"], ["CN"]),
  f("bracken", "\u8568\u83dc", N_COLD, CAT_WILD, ["bracken"], ["\u6e05\u5229"], ["CN"], { cautionTags: ["diarrhea"], caution: "\u857e\u83dc\u4e0d\u5b9c\u957f\u671f\u5927\u91cf\u98df\u7528\uff0c\u91cd\u70b9\u5148\u770b\u5904\u7406\u65b9\u5f0f\u548c\u6444\u5165\u9891\u7387\u3002" }),
  f("konjac", "\u9b54\u828b", N_COOL, CAT_STARCH, ["konjac"], ["\u548c\u4e2d"], ["CN", "JP"], { cautionTags: ["diarrhea"], caution: "\u751f\u9b54\u828b\u4e0d\u80fd\u76f4\u63a5\u98df\u7528\uff0c\u52a1\u5fc5\u7ecf\u89c4\u8303\u52a0\u5de5\u3002" }),
  f("asparagus", "\u82a6\u7b0b", N_COOL, CAT_VEG, ["asparagus"], ["\u6e05\u5229"], ["CN", "US", "FR"]),
  f("lotus-root", "\u83b2\u85d5", N_NEUTRAL, CAT_VEG, ["lotus root"], ["\u548c\u4e2d", "\u517b\u8840"], ["CN", "JP"]),
  f("tofu", "\u8c46\u8150", N_COOL, CAT_BEAN_PRODUCT, ["tofu"], ["\u548c\u4e2d"], ["CN", "JP", "KR"]),

  f("lion-mane", "\u7334\u5934\u83c7", N_NEUTRAL, CAT_FUNGI, ["lion's mane"], ["\u548c\u4e2d"], ["CN"]),
  f("red-mushroom", "\u7ea2\u83c7", N_NEUTRAL, CAT_FUNGI, ["russula"], ["\u6ecb\u517b", "\u589e\u9c9c"], ["CN"], { searchTerms: ["hg"] }),
  f("jianshouqing", "\u89c1\u624b\u9752", N_WARM, CAT_FUNGI, ["boletus"], ["\u589e\u9c9c"], ["CN"], { searchTerms: ["jsq", "\u91ce\u751f\u83cc"], cautionTags: ["diarrhea"], caution: "\u5c5e\u4e8e\u9ad8\u98ce\u9669\u91ce\u751f\u83cc\uff0c\u5fc5\u987b\u719f\u900f\uff0c\u6765\u6e90\u4e0d\u660e\u4e0d\u8981\u5403\u3002" }),

  f("apple", "\u82f9\u679c", N_COOL, CAT_FRUIT, ["apple"], ["\u751f\u6d25"], ["CN", "US", "UK", "FR", "DE", "AU"]),
  f("pear", "\u68a8", N_COOL, CAT_FRUIT, ["pear"], ["\u6da6\u71e5"], ["CN", "JP", "KR", "FR"]),
  f("banana", "\u9999\u8549", N_COLD, CAT_FRUIT, ["banana"], ["\u6e05\u5229"], ["CN", "TH", "SG", "MY"]),
  f("watermelon", "\u897f\u74dc", N_COLD, CAT_FRUIT, ["watermelon"], ["\u751f\u6d25"], ["CN", "US", "AU"]),
  f("persimmon", "\u67ff\u5b50", N_COLD, CAT_FRUIT, ["persimmon"], ["\u6e05\u5229"], ["CN", "JP", "KR"]),
  f("orange", "\u6a59\u5b50", N_COOL, CAT_FRUIT, ["orange"], ["\u751f\u6d25"], ["CN", "US", "AU"], { varietyNote: "\u4e0d\u540c\u54c1\u79cd\u5728\u4f20\u7edf\u8d44\u6599\u91cc\u6709\u504f\u51c9\u4e0e\u504f\u6e29\u7684\u8bf4\u6cd5\u5dee\u5f02\uff0c\u9ed8\u8ba4\u6309\u504f\u51c9\u6574\u7406\u3002", searchTerms: ["\u67d1\u6a58"] }),
  f("citrus", "\u67d1\u6a58", N_WARM, CAT_FRUIT, ["mandarin"], ["\u751f\u6d25"], ["CN", "JP", "KR"]),
  f("longan-dried", "\u6842\u5706\u5e72", N_WARM, CAT_FRUIT, ["dried longan"], ["\u517b\u8840"], ["CN"]),
  f("cherry-tomato", "\u5723\u5973\u679c", N_COOL, CAT_FRUIT, ["cherry tomato"], ["\u751f\u6d25"], ["CN", "JP", "KR", "US", "UK"]),

  f("egg", "\u9e21\u86cb", N_NEUTRAL, CAT_PROTEIN, ["egg"], ["\u6ecb\u517b"], ["CN", "JP", "KR", "US", "UK"]),
  f("pork", "\u732a\u8089", N_NEUTRAL, CAT_PROTEIN, ["pork"], ["\u548c\u4e2d", "\u6ecb\u517b"], ["CN", "JP", "KR", "DE"]),
  f("duck-blood", "\u9e2d\u8840", N_NEUTRAL, CAT_PROTEIN, ["duck blood"], ["\u8865\u76ca"], ["CN"], { searchTerms: ["yx"] }),
  f("century-egg", "\u76ae\u86cb", N_COOL, CAT_PROTEIN, ["preserved egg"], ["\u548c\u4e2d"], ["CN"], { searchTerms: ["pd"] }),
  f("lamb", "\u7f8a\u8089", N_WARM, CAT_PROTEIN, ["lamb"], ["\u6e29\u4e2d"], ["CN", "UK", "DE", "AU"]),
  f("beef", "\u725b\u8089", N_NEUTRAL, CAT_PROTEIN, ["beef"], ["\u8865\u76ca"], ["CN", "US", "FR", "DE", "AU", "RU"]),
  f("chicken", "\u9e21\u8089", N_WARM, CAT_PROTEIN, ["chicken"], ["\u8865\u76ca"], ["CN", "US", "FR", "TH"]),
  f("quail", "\u9e4c\u9e51", N_NEUTRAL, CAT_PROTEIN, ["quail"], ["\u8865\u76ca"], ["CN", "FR"]),
  f("sea-cucumber", "\u6d77\u53c2", N_WARM, CAT_SEA, ["sea cucumber"], ["\u6ecb\u517b"], ["CN", "JP", "KR", "RU"]),
  f("river-snail", "\u7530\u87ba", N_COLD, CAT_SEA, ["snail"], ["\u6e05\u5229"], ["CN"], { searchTerms: ["tl"] }),
  f("crab", "\u87f9", N_COLD, CAT_SEA, ["crab"], ["\u6e05\u5229"], ["CN", "JP", "KR", "SG"]),
  f("swallow-nest", "\u71d5\u7a9d", N_NEUTRAL, CAT_TONIC, ["bird's nest"], ["\u6ecb\u517b"], ["CN", "SG", "MY"]),
  f("ice-cream", "\u51b0\u6dc7\u6dcb", N_COLD, CAT_DRINK, ["ice cream"], ["\u8c03\u5473"], ["CN", "US", "UK", "FR", "DE", "AU"], { cautionTags: ["diarrhea", "reflux"] }),

  f("wood-ginger-fruit", "\u6728\u59dc\u5b50", N_WARM, CAT_CONDIMENT, ["litsea cubeba"], ["\u884c\u6c14", "\u8c03\u5473"], ["CN"], { searchTerms: ["mjz", "\u82d7\u65cf", "\u4f97\u65cf", "\u571f\u5bb6\u65cf"] }),
  f("pandan-leaf", "\u9999\u5170\u53f6", N_NEUTRAL, CAT_CONDIMENT, ["pandan"], ["\u589e\u9999"], ["SG", "MY", "TH"], { searchTerms: ["xly"] }),
  f("kaya-spread", "\u5496\u6930\u9171", N_WARM, CAT_CONDIMENT, ["kaya"], ["\u8c03\u5473"], ["SG", "MY"], { searchTerms: ["kyj"] }),
  f("sambal-belacan", "\u53c2\u5df4\u9171", N_HOT, CAT_CONDIMENT, ["sambal"], ["\u8c03\u5473"], ["SG", "MY"], { searchTerms: ["cbj"], cautionTags: ["reflux", "hypertension"] }),
  f("gula-melaka", "\u9a6c\u516d\u7532\u6930\u7cd6", N_WARM, CAT_CONDIMENT, ["palm sugar"], ["\u8c03\u5473"], ["SG", "MY"], { searchTerms: ["mljyt"] }),
  f("tom-yum-paste", "\u51ac\u9634\u529f\u9171", N_HOT, CAT_CONDIMENT, ["tom yum paste"], ["\u8c03\u5473"], ["TH"], { searchTerms: ["dygj"], cautionTags: ["reflux", "hypertension"] }),
  f("galangal", "\u5357\u59dc", N_WARM, CAT_CONDIMENT, ["galangal"], ["\u6e29\u4e2d"], ["TH", "MY", "SG"], { searchTerms: ["nj"] }),
  f("kaffir-lime-leaf", "\u5361\u83f2\u5c14\u9178\u6a59\u53f6", N_NEUTRAL, CAT_CONDIMENT, ["makrut lime leaf"], ["\u589e\u9999"], ["TH"], { searchTerms: ["kfescy"] }),
  f("dijon-mustard", "\u7b2c\u620e\u82a5\u672b", N_WARM, CAT_CONDIMENT, ["Dijon mustard"], ["\u8c03\u5473"], ["FR"], { searchTerms: ["drjm"], cautionTags: ["reflux"] }),
  f("herbes-de-provence", "\u666e\u7f57\u65fa\u65af\u9999\u8349", N_NEUTRAL, CAT_CONDIMENT, ["herbes de Provence"], ["\u589e\u9999"], ["FR"], { searchTerms: ["plwsxc"] }),
  f("german-mustard", "\u5fb7\u56fd\u82a5\u672b\u9171", N_WARM, CAT_CONDIMENT, ["German mustard"], ["\u8c03\u5473"], ["DE"], { cautionTags: ["reflux"] }),
  f("sauerkraut-german", "\u5fb7\u5f0f\u9178\u83dc", N_NEUTRAL, CAT_FERMENTED, ["sauerkraut"], ["\u5f00\u80c3"], ["DE", "RU"], { cautionTags: ["hypertension"] }),
  f("macadamia", "\u6fb3\u6d32\u575a\u679c", N_WARM, CAT_NUT, ["macadamia nut"], ["\u6ecb\u517b"], ["AU"], { searchTerms: ["azjg"] }),
  f("finger-lime", "\u6307\u6a59", N_COOL, CAT_FRUIT, ["finger lime"], ["\u751f\u6d25"], ["AU"], { searchTerms: ["zc"] }),
  f("vegemite", "\u7ef4\u5409\u9ea6", N_WARM, CAT_CONDIMENT, ["Vegemite"], ["\u8c03\u5473"], ["AU"], { searchTerms: ["wjm"], cautionTags: ["hypertension"] }),
  f("smetana", "\u65af\u7f8e\u5854\u90a3\u9178\u5976\u6cb9", N_NEUTRAL, CAT_CONDIMENT, ["smetana", "sour cream"], ["\u8c03\u5473"], ["RU"], { searchTerms: ["smtn"] })
];

/* BEGIN RESTORED BULK FOODS */
const RESTORED_CATEGORY_MAP = {
  CAT_OFFICIAL,
  CAT_GRAIN,
  CAT_DRINK,
  CAT_TEA,
  CAT_VEG,
  CAT_WILD,
  CAT_FUNGI,
  CAT_FRUIT,
  CAT_PROTEIN,
  CAT_SEA,
  CAT_CONDIMENT,
  CAT_PICKLE,
  CAT_TONIC,
  CAT_NUT,
  CAT_BEAN,
  CAT_BEAN_PRODUCT,
  CAT_STARCH,
  CAT_FERMENTED
};

EXPANDED_FOODS.push(
  f("softshell-turtle", "甲鱼", N_NEUTRAL, CAT_SEA, ["鳖", "团鱼", "水鱼", "softshell turtle"], ["滋补", "和中"], ["CN", "湖北", "江浙", "两广"], {
    searchTerms: ["jiayu", "jy", "bie", "tuanyu", "shuiyu"],
    confidence: "中国地方水产扩充条目"
  }),
  f("tilapia", "罗非鱼", N_NEUTRAL, CAT_SEA, ["罗非", "非洲鲫鱼", "tilapia"], ["高蛋白", "和中"], ["CN", "海南", "广东", "广西"], {
    searchTerms: ["luofeiyu", "lfy", "luofei", "feizhoujiyu"],
    confidence: "中国地方水产扩充条目"
  }),
  f("snakehead-fish", "黑鱼", N_WARM, CAT_SEA, ["乌鳢", "财鱼", "生鱼", "snakehead"], ["高蛋白", "滋养"], ["CN", "湖北", "江苏", "广东"], {
    searchTerms: ["heiyu", "hy", "wuli", "caiyu", "shengyu"],
    confidence: "中国地方水产扩充条目"
  }),
  f("crucian-carp", "鲫鱼", N_NEUTRAL, CAT_SEA, ["鲫瓜子", "crucian carp"], ["和中", "滋养"], ["CN"], {
    searchTerms: ["jiyu", "jy", "jiguazi"],
    confidence: "中国家常淡水鱼扩充条目"
  }),
  f("carp", "鲤鱼", N_NEUTRAL, CAT_SEA, ["carp"], ["和中", "滋养"], ["CN"], {
    searchTerms: ["liyu", "ly"],
    confidence: "中国家常淡水鱼扩充条目"
  }),
  f("grass-carp", "草鱼", N_NEUTRAL, CAT_SEA, ["鲩鱼", "grass carp"], ["和中"], ["CN", "两广"], {
    searchTerms: ["caoyu", "cy", "huanyu"],
    confidence: "中国家常淡水鱼扩充条目"
  }),
  f("mandarin-fish", "鳜鱼", N_NEUTRAL, CAT_SEA, ["桂鱼", "季花鱼", "mandarin fish"], ["鲜补"], ["CN", "江浙沪", "湖北"], {
    searchTerms: ["guiyu", "gy", "guiyu-alt", "jihuayu"],
    confidence: "中国地方淡水鱼扩充条目"
  }),
  f("catfish", "鲶鱼", N_NEUTRAL, CAT_SEA, ["胡子鲶", "catfish"], ["高蛋白"], ["CN"], {
    searchTerms: ["nianyu", "ny", "huzinian"],
    confidence: "中国地方水产扩充条目"
  }),
  f("yellow-catfish", "黄骨鱼", N_NEUTRAL, CAT_SEA, ["黄颡鱼", "嘎鱼", "昂刺鱼", "yellow catfish"], ["和中"], ["CN", "湖北", "湖南", "江西"], {
    searchTerms: ["huangguyu", "hgy", "huangsangyu", "gayu", "angciyu"],
    confidence: "中国地方水产扩充条目"
  }),
  f("donkey-meat", "驴肉", N_WARM, CAT_PROTEIN, ["驴肉火烧料", "donkey meat"], ["补益"], ["CN", "河北", "山西", "河南"], {
    searchTerms: ["lvrou", "lr"],
    confidence: "中国地方肉类扩充条目"
  }),
  f("rabbit-meat", "兔肉", N_COOL, CAT_PROTEIN, ["rabbit"], ["高蛋白"], ["CN", "四川", "重庆", "福建"], {
    searchTerms: ["turou", "tr"],
    confidence: "中国地方肉类扩充条目"
  }),
  f("pigeon", "乳鸽", N_WARM, CAT_PROTEIN, ["鸽子", "young pigeon"], ["补益"], ["CN", "广东", "香港"], {
    searchTerms: ["ruge", "rg", "gezi"],
    confidence: "中国地方肉类扩充条目"
  }),
  f("button-mushroom", "白蘑菇", N_NEUTRAL, CAT_FUNGI, ["白蘑", "口蘑", "button mushroom"], ["和中", "增鲜"], ["CN", "内蒙古", "河北"], {
    searchTerms: ["baimogu", "bmg", "baimo", "koumo"],
    confidence: "中国常见菌菇扩充条目"
  }),
  f("straw-mushroom", "草菇", N_COOL, CAT_FUNGI, ["straw mushroom"], ["和中", "增鲜"], ["CN", "广东", "福建", "海南"], {
    searchTerms: ["caogu", "cg"],
    confidence: "中国常见菌菇扩充条目"
  }),
  f("termitomyces", "鸡枞", N_NEUTRAL, CAT_FUNGI, ["鸡枞菌", "termitomyces"], ["增鲜", "和中"], ["CN", "云南", "贵州"], {
    searchTerms: ["jizong", "jz", "jizongjun"],
    confidence: "中国地方菌菇扩充条目"
  }),
  f("matsutake", "松茸", N_WARM, CAT_FUNGI, ["matsutake"], ["增鲜", "滋养"], ["CN", "云南", "四川", "西藏"], {
    searchTerms: ["songrong", "sr"],
    confidence: "中国地方菌菇扩充条目"
  }),
  f("boletus", "牛肝菌", N_WARM, CAT_FUNGI, ["boletus"], ["增鲜"], ["CN", "云南", "四川"], {
    searchTerms: ["niuganjun", "ngj"],
    confidence: "中国地方菌菇扩充条目"
  }),
  f("caitai", "红菜苔", N_COOL, CAT_VEG, ["菜苔", "紫菜苔", "hongcaitai"], ["清利", "和中"], ["CN", "湖北", "武汉"], {
    searchTerms: ["hongcaitai", "hct", "caitai", "zicaitai"],
    confidence: "中国地方蔬菜扩充条目"
  }),
  f("night-blooming-flower", "夜香花", N_COOL, CAT_VEG, ["夜来香花", "夜香花蕾", "night blooming jasmine flower"], ["清润", "增香"], ["CN", "广东", "广西"], {
    searchTerms: ["yexianghua", "yxh", "yelaixianghua"],
    confidence: "岭南地方蔬菜扩充条目"
  }),
  f("gai-lan", "芥兰", N_COOL, CAT_VEG, ["广东芥兰", "gai lan", "Chinese broccoli"], ["清利"], ["CN", "广东", "广西", "香港", "澳门"], {
    searchTerms: ["jielan", "jl", "gailan", "chinesebroccoli"],
    confidence: "岭南地方蔬菜扩充条目"
  }),
  f("red-stem-gai-lan", "红脚芥兰", N_WARM, CAT_VEG, ["红梗芥兰", "hong jiao gai lan"], ["和中"], ["CN", "广东", "潮汕"], {
    searchTerms: ["hongjiaojielan", "hjjl", "honggengjielan"],
    confidence: "岭南地方蔬菜扩充条目"
  }),
  f("sesame-leaf", "麻叶", N_NEUTRAL, CAT_WILD, ["芝麻叶", "麻叶菜", "sesame leaf"], ["和中", "增香"], ["CN", "河南", "安徽", "湖北"], {
    searchTerms: ["maye", "my", "zhimaye", "mayecai"],
    confidence: "中原地方野菜扩充条目"
  }),
  f("fish-mint", "折耳根", N_COOL, CAT_WILD, ["鱼腥草", "折耳根菜", "houttuynia"], ["清利"], ["CN", "贵州", "云南", "四川"], {
    searchTerms: ["zheergen", "zeg", "yuxingcao"],
    confidence: "西南地方野菜扩充条目"
  }),
  f("celtuce", "莴笋", N_COOL, CAT_VEG, ["莴苣笋", "celtuce"], ["清利"], ["CN"], {
    searchTerms: ["wosun", "ws", "wojusun"],
    confidence: "中国常见蔬菜扩充条目"
  }),
  f("water-chestnut", "荸荠", N_COLD, CAT_VEG, ["马蹄", "地栗", "water chestnut"], ["清利", "生津"], ["CN", "广东", "广西", "江南"], {
    searchTerms: ["biqi", "bq", "mati", "dili"],
    confidence: "中国地方蔬菜扩充条目"
  }),
  f("water-shield", "莼菜", N_COOL, CAT_VEG, ["水葵", "water shield"], ["清润"], ["CN", "江苏", "浙江", "湖北"], {
    searchTerms: ["chuncai", "cc", "shuikui"],
    confidence: "江南地方蔬菜扩充条目"
  }),
  f("toon-bud", "香椿", N_WARM, CAT_WILD, ["香椿芽", "toon bud"], ["开胃", "增香"], ["CN", "华北", "山东", "陕西"], {
    searchTerms: ["xiangchun", "xc", "xiangchunya"],
    confidence: "中国地方野菜扩充条目"
  }),
  f("water-bamboo", "茭白", N_COOL, CAT_VEG, ["高笋", "water bamboo"], ["清利"], ["CN", "江南", "浙江", "上海"], {
    searchTerms: ["jiaobai", "jb", "gaosun"],
    confidence: "江南地方蔬菜扩充条目"
  }),
  f("sour-bamboo-shoot", "酸笋", N_WARM, CAT_PICKLE, ["发酵笋", "酸竹笋"], ["开胃"], ["CN", "广西", "贵州"], {
    searchTerms: ["suansun", "ss", "fajiaosun", "suanzhusun"],
    confidence: "西南地方发酵食材扩充条目"
  }),
  f("hami-melon", "哈密瓜", N_COOL, CAT_FRUIT, ["新疆哈密瓜", "hami melon"], ["生津"], ["CN", "新疆"], {
    searchTerms: ["hamigua", "hmg", "xinjianghamigua"],
    confidence: "中国地方水果扩充条目"
  }),
  f("wax-apple", "莲雾", N_COOL, CAT_FRUIT, ["洋蒲桃", "wax apple"], ["生津"], ["CN", "台湾", "海南"], {
    searchTerms: ["lianwu", "lw", "yangputao"],
    confidence: "中国地方水果扩充条目"
  }),
  f("pineapple-honey", "菠萝蜜", N_WARM, CAT_FRUIT, ["木菠萝", "jackfruit"], ["和中"], ["CN", "海南", "广西", "云南"], {
    searchTerms: ["boluomi", "blm", "muboluo", "jackfruit"],
    confidence: "热带地方水果扩充条目"
  }),
  f("bamboo-fungus", "竹荪", N_NEUTRAL, CAT_FUNGI, ["竹笙", "bamboo fungus"], ["和中", "增鲜"], ["CN", "云南", "贵州", "四川"], {
    searchTerms: ["zhusun", "zs", "zhusheng"],
    confidence: "西南地方菌菇扩充条目"
  }),
  f("termite-mushroom", "干巴菌", N_WARM, CAT_FUNGI, ["牛肝菌干巴菌类", "thelephora"], ["增鲜"], ["CN", "云南"], {
    searchTerms: ["ganbajun", "gbj"],
    confidence: "云南地方菌菇扩充条目"
  }),
  f("morel", "羊肚菌", N_WARM, CAT_FUNGI, ["morel"], ["增鲜", "滋养"], ["CN", "云南", "四川", "甘肃"], {
    searchTerms: ["yangdujun", "ydj"],
    confidence: "西南与西北菌菇扩充条目"
  }),
  f("wild-pepper-leaf", "木姜叶", N_WARM, CAT_WILD, ["山胡椒叶", "木姜菜"], ["行气", "增香"], ["CN", "贵州", "湖南", "土家族", "侗族"], {
    searchTerms: ["mujiangye", "mjy", "shanhujiaoye", "tujia", "dongzu"],
    confidence: "西南少数民族香料扩充条目"
  }),
  f("red-sour-soup", "红酸汤", N_WARM, CAT_CONDIMENT, ["凯里酸汤", "番茄酸汤"], ["调味", "开胃"], ["CN", "贵州", "苗族", "侗族"], {
    searchTerms: ["hongsuantang", "hst", "kailisuantang", "miaozu", "dongzu"],
    cautionTags: ["reflux"],
    confidence: "西南少数民族调味扩充条目"
  }),
  f("ciba-pepper", "糍粑辣椒", N_HOT, CAT_CONDIMENT, ["贵州糍粑海椒"], ["调味"], ["CN", "贵州", "苗族"], {
    searchTerms: ["cibalajiao", "cblj", "haijiao"],
    cautionTags: ["reflux", "hypertension"],
    confidence: "西南地方调味扩充条目"
  }),
  f("zhacai", "榨菜", N_WARM, CAT_PICKLE, ["涪陵榨菜"], ["开胃"], ["CN", "重庆"], {
    searchTerms: ["zhacai", "zc", "fulingzhacai"],
    cautionTags: ["hypertension"],
    confidence: "川渝腌菜扩充条目"
  }),
  f("yibin-yacai", "芽菜", N_WARM, CAT_PICKLE, ["宜宾芽菜", "碎米芽菜"], ["开胃", "调味"], ["CN", "四川"], {
    searchTerms: ["yacai", "yc", "yibinyacai", "suimiyacai"],
    cautionTags: ["hypertension"],
    confidence: "川菜腌菜扩充条目"
  }),
  f("pickled-chili", "泡椒", N_HOT, CAT_PICKLE, ["泡海椒"], ["调味"], ["CN", "四川", "重庆", "贵州"], {
    searchTerms: ["paojiao", "pj", "paohaijiao"],
    cautionTags: ["reflux", "hypertension"],
    confidence: "西南腌渍调味扩充条目"
  }),
  f("caixin", "菜心", N_COOL, CAT_VEG, ["广东菜心"], ["清利"], ["CN", "广东", "广西", "香港"], {
    searchTerms: ["caixin", "cx", "guangdongcaixin"],
    confidence: "两广常用蔬菜扩充条目"
  }),
  f("watercress", "西洋菜", N_COOL, CAT_VEG, ["豆瓣菜", "watercress"], ["清润"], ["CN", "广东", "香港", "澳门"], {
    searchTerms: ["xiyangcai", "xyc", "doubancai"],
    confidence: "粤港澳常用蔬菜扩充条目"
  }),
  f("wolfberry-leaf", "枸杞叶", N_COOL, CAT_VEG, ["枸杞苗"], ["清润"], ["CN", "广东", "广西", "客家"], {
    searchTerms: ["gouqiye", "gqy", "gouqimiao", "hakka"],
    confidence: "客家与岭南汤料蔬菜扩充条目"
  }),
  f("wuzhi-maotao", "五指毛桃", N_NEUTRAL, CAT_TONIC, ["南芪", "土黄芪"], ["和中", "煲汤"], ["CN", "广东", "广西", "客家"], {
    searchTerms: ["wuzhimaotao", "wzmt", "nanqi", "tuhuangqi", "hakka"],
    confidence: "两广汤料扩充条目"
  }),
  f("tufuling", "土茯苓", N_NEUTRAL, CAT_OFFICIAL, ["硬饭头", "土萆薢"], ["和中", "清利"], ["CN", "广东", "广西"], {
    officialFoodMedicine: false,
    searchTerms: ["tufuling", "tfl", "yingfantou", "tubixie"],
    confidence: "岭南汤料与中药材检索扩充条目"
  }),
  f("sand-ginger", "沙姜", N_WARM, CAT_CONDIMENT, ["山柰", "广西沙姜"], ["调味", "温中"], ["CN", "广东", "广西", "客家"], {
    searchTerms: ["shajiang", "sj", "shannai", "hakka"],
    confidence: "两广常用香料扩充条目"
  }),
  f("oyster", "生蚝", N_NEUTRAL, CAT_SEA, ["牡蛎", "蚝", "oyster"], ["高蛋白"], ["CN", "广东", "广西", "福建", "香港"], {
    searchTerms: ["shenghao", "sh", "muli", "hao"],
    cautionTags: ["allergy"],
    confidence: "沿海高频水产扩充条目"
  }),
  f("clam", "花甲", N_COOL, CAT_SEA, ["蛤蜊", "文蛤", "clams"], ["鲜补"], ["CN", "广东", "福建", "广西"], {
    searchTerms: ["huajia", "hj", "geli", "wenga"],
    cautionTags: ["allergy"],
    confidence: "沿海高频水产扩充条目"
  }),
  f("razor-clam", "蛏子", N_COOL, CAT_SEA, ["竹蛏", "razor clam"], ["鲜补"], ["CN", "福建", "浙江", "江苏"], {
    searchTerms: ["chengzi", "cz", "zhucheng"],
    cautionTags: ["allergy"],
    confidence: "沿海高频水产扩充条目"
  }),
  f("mud-snail", "泥螺", N_COLD, CAT_SEA, ["黄泥螺"], ["鲜补"], ["CN", "浙江", "上海", "江苏"], {
    searchTerms: ["niluo", "nl", "huangniluo"],
    cautionTags: ["allergy"],
    confidence: "江浙沪地方海产扩充条目"
  }),
  f("river-shrimp", "河虾", N_WARM, CAT_SEA, ["青虾"], ["高蛋白"], ["CN", "江浙沪"], {
    searchTerms: ["hexia", "hx", "qingxia"],
    cautionTags: ["allergy"],
    confidence: "江浙沪河鲜扩充条目"
  }),
  f("knife-fish", "刀鱼", N_WARM, CAT_SEA, ["长江刀鱼"], ["鲜补"], ["CN", "江苏", "上海"], {
    searchTerms: ["daoyu", "dy", "changjiangdaoyu"],
    cautionTags: ["allergy"],
    confidence: "江浙沪河鲜扩充条目"
  }),
  f("malantou", "马兰头", N_COOL, CAT_WILD, ["马兰", "鸡儿肠"], ["清利"], ["CN", "江浙沪"], {
    searchTerms: ["malantou", "mlt", "malan", "jierchang"],
    confidence: "江南野菜扩充条目"
  }),
  f("shepherds-purse", "荠菜", N_COOL, CAT_WILD, ["地菜", "shepherd's purse"], ["和中"], ["CN", "江浙沪", "华北"], {
    searchTerms: ["jicai", "jc", "dicai"],
    confidence: "江南与华北野菜扩充条目"
  }),
  f("loquat", "枇杷", N_COOL, CAT_FRUIT, ["loquat"], ["生津"], ["CN", "福建", "浙江", "江苏"], {
    searchTerms: ["pipa", "pp"],
    confidence: "江南水果扩充条目"
  }),
  f("red-yeast-rice", "红糟", N_WARM, CAT_CONDIMENT, ["福州红糟", "红曲糟"], ["调味"], ["CN", "福建", "福州"], {
    searchTerms: ["hongzao", "hz", "hongquzao", "fuzhouhongzao"],
    confidence: "闽菜地方调味扩充条目"
  }),
  f("perilla-nine-layer", "九层塔", N_WARM, CAT_CONDIMENT, ["罗勒", "台湾九层塔", "basil"], ["增香", "行气"], ["CN", "台湾", "福建"], {
    searchTerms: ["jiucengta", "jct", "luole", "taiwanjiucengta", "basil"],
    confidence: "闽台常用香草扩充条目"
  }),
  f("po-bu-zi", "破布子", N_NEUTRAL, CAT_PICKLE, ["树子", "破布果"], ["开胃", "调味"], ["CN", "台湾"], {
    searchTerms: ["pobuzi", "pbz", "shuzi", "pobuguo"],
    cautionTags: ["hypertension"],
    confidence: "台湾地方调味扩充条目"
  }),
  f("yam-bean", "沙葛", N_COOL, CAT_VEG, ["凉薯", "地瓜"], ["生津"], ["CN", "福建", "广东", "广西", "台湾"], {
    searchTerms: ["shage", "sg", "liangshu"],
    confidence: "闽粤台常见蔬菜扩充条目"
  }),
  f("hazel-mushroom", "榛蘑", N_WARM, CAT_FUNGI, ["hazel mushroom"], ["增鲜"], ["CN", "东北"], {
    searchTerms: ["zhenmo", "zm"],
    confidence: "东北山货菌菇扩充条目"
  }),
  f("yuanmo", "元蘑", N_NEUTRAL, CAT_FUNGI, ["黄蘑元蘑类"], ["增鲜"], ["CN", "东北"], {
    searchTerms: ["yuanmo", "ym"],
    confidence: "东北山货菌菇扩充条目"
  }),
  f("pine-nut-kernel", "松子仁", N_WARM, CAT_NUT, ["松仁"], ["滋养"], ["CN", "东北"], {
    searchTerms: ["songziren", "szr", "songren"],
    confidence: "东北山货坚果扩充条目"
  }),
  f("sour-cabbage", "酸菜", N_NEUTRAL, CAT_PICKLE, ["东北酸菜", "西北酸菜"], ["开胃"], ["CN", "东北", "西北"], {
    searchTerms: ["suancai", "sc", "dongbeisuancai", "xibeisuancai"],
    cautionTags: ["hypertension"],
    confidence: "东北西北腌菜扩充条目"
  }),
  f("sea-buckthorn-fruit", "沙棘果", N_WARM, CAT_FRUIT, ["沙棘"], ["生津"], ["CN", "西北", "内蒙古"], {
    searchTerms: ["shajiguo", "sjg", "shaji"],
    confidence: "西北山货水果扩充条目"
  }),
  f("seabuckthorn-juice", "沙棘汁", N_WARM, CAT_DRINK, ["沙棘饮"], ["生津"], ["CN", "西北"], {
    searchTerms: ["shajizhi", "sjz", "shajiyin"],
    confidence: "西北地方饮品扩充条目"
  }),
  f("naked-oats", "莜麦", N_WARM, CAT_GRAIN, ["燕麦面", "youmai"], ["和中"], ["CN", "山西", "内蒙古"], {
    searchTerms: ["youmai", "ym", "yanmaimian"],
    confidence: "华北西北主食扩充条目"
  }),
  f("buckwheat-noodle", "荞面", N_COOL, CAT_GRAIN, ["荞麦面"], ["和中"], ["CN", "山西", "陕西", "甘肃"], {
    searchTerms: ["qiaomian", "qm", "qiaomaimian"],
    confidence: "华北西北主食扩充条目"
  }),
  f("sorghum-rice", "高粱米", N_WARM, CAT_GRAIN, ["红高粱"], ["和中"], ["CN", "华北", "东北"], {
    searchTerms: ["gaoliangmi", "glm", "honggaoliang"],
    confidence: "华北东北粮食扩充条目"
  }),
  f("millet-noodle", "糜子", N_WARM, CAT_GRAIN, ["黄米"], ["和中"], ["CN", "陕北", "内蒙古", "宁夏"], {
    searchTerms: ["mizi", "mz", "huangmi"],
    confidence: "西北粮食扩充条目"
  }),
  f("daylily", "黄花菜", N_NEUTRAL, CAT_VEG, ["金针菜"], ["和中"], ["CN", "山西", "陕西", "湖南"], {
    searchTerms: ["huanghuacai", "hhc", "jinzhencai"],
    confidence: "华北西北常见菜扩充条目"
  }),
  f("wood-ginger-oil", "木姜油", N_WARM, CAT_CONDIMENT, ["木姜子油"], ["调味", "增香"], ["CN", "贵州", "云南", "苗族", "侗族"], {
    searchTerms: ["mujiangyou", "mjy", "mujiangziyou", "miaozu", "dongzu"],
    confidence: "西南少数民族香料扩充条目"
  }),
  f("green-sour-soup", "白酸汤", N_COOL, CAT_CONDIMENT, ["清酸汤", "米汤酸汤"], ["调味", "开胃"], ["CN", "贵州", "苗族", "侗族"], {
    searchTerms: ["baisuantang", "bst", "qingsuantang", "mitangsuantang"],
    confidence: "西南少数民族酸汤扩充条目"
  }),
  f("miao-dipping-water", "蘸水", N_HOT, CAT_CONDIMENT, ["贵州蘸水", "糊辣椒蘸水"], ["调味"], ["CN", "贵州", "云南", "苗族", "彝族"], {
    searchTerms: ["zhanshui", "zs", "hulajiaozhanshui", "miaozu", "yizu"],
    cautionTags: ["reflux", "hypertension"],
    confidence: "西南少数民族蘸水扩充条目"
  }),
  f("thorn-vine-pepper", "刺芫荽", N_WARM, CAT_WILD, ["大芫荽", "假香菜"], ["增香", "行气"], ["CN", "云南", "傣族", "景颇族"], {
    searchTerms: ["ciyuansui", "cys", "dayuansui", "jiaxiangcai", "daizu", "jingpozu"],
    confidence: "西南少数民族香草扩充条目"
  }),
  f("water-fern", "水蕨菜", N_COOL, CAT_WILD, ["水蕨"], ["清利"], ["CN", "云南", "贵州", "广西"], {
    searchTerms: ["shuijuecai", "sjc", "shuijue"],
    confidence: "西南山野菜扩充条目"
  }),
  f("fiddlehead", "蕨菜尖", N_COOL, CAT_WILD, ["拳头菜"], ["清利"], ["CN", "贵州", "云南", "东北"], {
    searchTerms: ["juecaijian", "jcj", "quantoucai"],
    confidence: "山野菜扩充条目"
  }),
  f("larou", "腊肉", N_WARM, CAT_PROTEIN, ["熏肉", "苗家腊肉", "川味腊肉"], ["温中"], ["CN", "四川", "重庆", "贵州", "湖南"], {
    searchTerms: ["larou", "lr", "xunrou", "miaojialarou", "chuanweilarou"],
    cautionTags: ["hypertension"],
    confidence: "西南腊味扩充条目"
  }),
  f("lapork-ribs", "腊排骨", N_WARM, CAT_PROTEIN, ["风干排骨"], ["温中"], ["CN", "云南", "纳西族"], {
    searchTerms: ["lapaigu", "lpg", "fengganpaigu", "naxizu"],
    cautionTags: ["hypertension"],
    confidence: "西南腊味扩充条目"
  }),
  f("la-bean-curd", "腊豆腐", N_WARM, CAT_BEAN_PRODUCT, ["烟熏豆腐"], ["和中"], ["CN", "贵州", "湖南", "湖北"], {
    searchTerms: ["ladoufu", "ldf", "yanxundoufu"],
    cautionTags: ["hypertension"],
    confidence: "西南腊味豆制品扩充条目"
  }),
  f("mesona", "凉粉草", N_COOL, CAT_OFFICIAL, ["仙草", "烧仙草原草"], ["清利"], ["CN", "广东", "广西", "客家"], {
    officialFoodMedicine: false,
    searchTerms: ["liangfencao", "lfc", "xiancao", "hakka"],
    confidence: "粤港澳桂凉茶原料扩充条目"
  }),
  f("kapok-flower", "木棉花", N_COOL, CAT_OFFICIAL, ["攀枝花"], ["清利"], ["CN", "广东", "广西"], {
    officialFoodMedicine: false,
    searchTerms: ["mumianhua", "mmh", "panzhihua"],
    confidence: "岭南凉茶药膳材料扩充条目"
  }),
  f("chikung-tea-herb", "鸡骨草", N_COOL, CAT_OFFICIAL, ["黄头草"], ["清利"], ["CN", "广东", "广西"], {
    officialFoodMedicine: false,
    searchTerms: ["jigucao", "jgc", "huangtoucao"],
    confidence: "岭南凉茶药膳材料扩充条目"
  }),
  f("selfheal-spike", "夏枯草", N_COLD, CAT_OFFICIAL, ["棒槌草"], ["清利"], ["CN", "广东", "广西", "香港"], {
    officialFoodMedicine: false,
    searchTerms: ["xiakucao", "xkc", "bangchuicao"],
    confidence: "粤港澳凉茶原料扩充条目"
  }),
  f("patchouli", "藿香", N_WARM, CAT_OFFICIAL, ["广藿香"], ["化湿", "和中"], ["CN", "广东", "海南"], {
    officialFoodMedicine: false,
    searchTerms: ["huoxiang", "hx", "guanghuoxiang"],
    confidence: "岭南药膳材料扩充条目"
  }),
  f("wormgrass-flower", "虫草花", N_NEUTRAL, CAT_FUNGI, ["蛹虫草"], ["滋养"], ["CN", "广东", "福建"], {
    searchTerms: ["chongcaohua", "cch", "yongchongcao"],
    confidence: "粤闽常用煲汤菌菇扩充条目"
  }),
  f("dried-scallop", "瑶柱", N_NEUTRAL, CAT_SEA, ["干贝", "江珧柱"], ["鲜补"], ["CN", "广东", "香港", "福建"], {
    searchTerms: ["yaozhu", "yz", "ganbei", "jiangyaozhu"],
    cautionTags: ["allergy"],
    confidence: "粤港澳汤料海产扩充条目"
  }),
  f("dried-oyster", "蚝豉", N_NEUTRAL, CAT_SEA, ["蚝干"], ["鲜补"], ["CN", "广东", "香港"], {
    searchTerms: ["haochi", "hc", "haogan"],
    cautionTags: ["allergy"],
    confidence: "粤港澳汤料海产扩充条目"
  }),
  f("water-spinach-stem", "通菜梗", N_COOL, CAT_VEG, ["空心菜梗"], ["清利"], ["CN", "广东", "香港"], {
    searchTerms: ["tongcaigeng", "tcg", "kongxincaigeng"],
    confidence: "粤菜常用蔬菜扩充条目"
  }),
  f("mustard-tuber", "大头菜", N_WARM, CAT_PICKLE, ["榨菜头", "客家大头菜"], ["开胃"], ["CN", "广东", "四川", "客家"], {
    searchTerms: ["datoucai", "dtc", "zhacaitou", "hakka"],
    cautionTags: ["hypertension"],
    confidence: "两广客家腌菜扩充条目"
  }),
  f("taro-stem", "芋荷梗", N_COOL, CAT_VEG, ["芋梗"], ["和中"], ["CN", "广东", "广西", "福建"], {
    searchTerms: ["yuhegeng", "yhg", "yugeng"],
    confidence: "两广闽菜常用蔬菜扩充条目"
  }),
  f("eel", "鳝鱼", N_WARM, CAT_SEA, ["黄鳝"], ["滋养"], ["CN", "江浙沪", "湖北", "福建"], {
    searchTerms: ["shanyu", "sy", "huangshan"],
    cautionTags: ["allergy"],
    confidence: "江南河鲜扩充条目"
  }),
  f("river-eel", "鳗鱼", N_WARM, CAT_SEA, ["白鳝", "河鳗"], ["滋养"], ["CN", "福建", "浙江", "上海"], {
    searchTerms: ["manyu", "my", "baishan", "heman"],
    cautionTags: ["allergy"],
    confidence: "闽浙河海鲜扩充条目"
  }),
  f("pomfret", "鲳鱼", N_NEUTRAL, CAT_SEA, ["平鱼", "银鲳"], ["鲜补"], ["CN", "浙江", "福建", "上海"], {
    searchTerms: ["changyu", "cy", "pingyu", "yinchang"],
    cautionTags: ["allergy"],
    confidence: "沿海高频海产扩充条目"
  }),
  f("hairtail", "带鱼", N_WARM, CAT_SEA, ["刀鱼带鱼类俗称"], ["鲜补"], ["CN", "浙江", "福建", "山东"], {
    searchTerms: ["daiyu", "dy", "hairtail"],
    cautionTags: ["allergy"],
    confidence: "沿海高频海产扩充条目"
  }),
  f("seaweed-greens", "海白菜", N_COOL, CAT_SEA, ["石莼"], ["清利"], ["CN", "福建", "浙江"], {
    searchTerms: ["haibaicai", "hbc", "shichun"],
    confidence: "沿海海藻扩充条目"
  }),
  f("laver", "紫菜", N_COOL, CAT_SEA, ["坛紫菜", "条斑紫菜"], ["清利"], ["CN", "福建", "浙江", "江苏"], {
    searchTerms: ["zicai", "zc", "tanzicai", "tiaobanzicai"],
    confidence: "沿海海藻扩充条目"
  }),
  f("fennel-shoot", "茴香苗", N_WARM, CAT_VEG, ["小茴香苗"], ["行气"], ["CN", "江浙沪", "华北"], {
    searchTerms: ["huixiangmiao", "hxm", "xiaohuixiangmiao"],
    confidence: "江南与华北时蔬扩充条目"
  }),
  f("wild-rice-stem", "茨菇", N_COOL, CAT_VEG, ["慈姑"], ["和中"], ["CN", "江浙沪", "福建"], {
    searchTerms: ["cigu", "cg", "cigu-alt"],
    confidence: "江南时蔬扩充条目"
  }),
  f("bergamot-fruit", "香橼", N_WARM, CAT_FRUIT, ["香圆"], ["行气"], ["CN", "浙江", "江苏"], {
    searchTerms: ["xiangyuan", "xy", "xiangyuan-fruit"],
    confidence: "江南地方果材扩充条目"
  }),
  f("fermented-rice-wine", "酒酿", N_WARM, CAT_FERMENTED, ["醪糟", "甜酒酿"], ["和中"], ["CN", "江浙沪", "福建", "四川"], {
    searchTerms: ["jiuniang", "jn", "laozao", "tianjiuniang"],
    confidence: "酿造发酵食品扩充条目"
  }),
  f("muscovy-duck", "番鸭", N_WARM, CAT_PROTEIN, ["麝香鸭"], ["补益"], ["CN", "福建", "台湾", "广东"], {
    searchTerms: ["fanya", "fy", "shexiangya"],
    confidence: "闽台粤禽类扩充条目"
  }),
  f("yam-leaf", "山药豆", N_NEUTRAL, CAT_STARCH, ["零余子"], ["和中"], ["CN", "华北", "河南", "山西"], {
    searchTerms: ["shanyaodou", "syd", "lingyuzi"],
    confidence: "华北地方主食植物扩充条目"
  }),
  f("cattail-pollen", "蒲黄", N_WARM, CAT_OFFICIAL, ["香蒲黄粉"], ["和中"], ["CN", "华北", "西北"], {
    officialFoodMedicine: false,
    searchTerms: ["puhuang", "ph", "xiangpuhuangfen"],
    confidence: "华北西北植物药材检索扩充条目"
  }),
  f("lily-root", "百合根", N_NEUTRAL, CAT_OFFICIAL, ["食用百合"], ["清润"], ["CN", "甘肃", "宁夏"], {
    officialFoodMedicine: false,
    searchTerms: ["baihegen", "bhg", "shiyongbaihe"],
    confidence: "西北地方植物食材扩充条目"
  }),
  f("sea-buckthorn-leaf", "沙棘叶", N_WARM, CAT_OFFICIAL, ["沙棘嫩叶"], ["生津"], ["CN", "西北"], {
    officialFoodMedicine: false,
    searchTerms: ["shajiye", "sjy", "shajinenye"],
    confidence: "西北地方植物扩充条目"
  }),
  f("wild-onion", "沙葱", N_WARM, CAT_WILD, ["蒙古韭"], ["增香", "行气"], ["CN", "内蒙古", "宁夏", "回族"], {
    searchTerms: ["shacong", "sc", "menggujiu", "huizu"],
    confidence: "西北少数民族野菜扩充条目"
  }),
  f("yellow-millet", "黄米", N_WARM, CAT_GRAIN, ["黍米"], ["和中"], ["CN", "华北", "东北", "陕北"], {
    searchTerms: ["huangmi", "hm", "shumi"],
    confidence: "华北东北粮食扩充条目"
  }),
  f("millet-paste", "炒米", N_WARM, CAT_GRAIN, ["内蒙古炒米", "蒙古炒米"], ["和中"], ["CN", "内蒙古", "蒙古族"], {
    searchTerms: ["chaomi", "cm", "mengguchaomi", "mengguzu"],
    confidence: "北方民族粮食扩充条目"
  }),
  f("blood-sausage", "血肠", N_WARM, CAT_PROTEIN, ["东北血肠"], ["补益"], ["CN", "东北"], {
    searchTerms: ["xuechang", "xc", "dongbeixuechang"],
    cautionTags: ["hypertension"],
    confidence: "东北地方肉类扩充条目"
  }),
  f("venison", "鹿肉", N_WARM, CAT_PROTEIN, ["梅花鹿肉"], ["温补"], ["CN", "东北", "满族"], {
    searchTerms: ["lurou", "lr", "meihualurou", "manzu"],
    confidence: "东北地方肉类扩充条目"
  }),
  f("hazelnut", "榛子", N_WARM, CAT_NUT, ["平榛"], ["滋养"], ["CN", "东北", "华北"], {
    searchTerms: ["zhenzi", "zz", "pingzhen"],
    confidence: "东北山货坚果扩充条目"
  }),
  f("goblet-mushroom", "猴头蘑", N_NEUTRAL, CAT_FUNGI, ["猴头菇北方山货"], ["和中"], ["CN", "东北", "华北"], {
    searchTerms: ["houtoumo", "htm"],
    confidence: "东北山货菌菇扩充条目"
  }),
  f("fern-root-starch", "厥麻", N_NEUTRAL, CAT_STARCH, ["人参果芋", "蕨麻米"], ["和中"], ["CN", "青海", "甘肃", "藏族"], {
    searchTerms: ["juema", "jm", "juemami", "zangzu"],
    confidence: "西北民族主食植物扩充条目"
  }),
  f("goat-milk", "羊奶", N_WARM, CAT_DRINK, ["山羊奶"], ["滋养"], ["CN", "西北", "宁夏", "陕西"], {
    searchTerms: ["yangnai", "yn", "shanyangnai"],
    confidence: "西北地方饮品扩充条目"
  })
);

const RESTORED_OFFICIAL_BULK = [
  {
    "id": "official-ginseng",
    "name": "人参",
    "nature": "温",
    "effects": [
      "补气",
      "扶正"
    ]
  },
  {
    "id": "official-american-ginseng",
    "name": "西洋参",
    "nature": "凉",
    "effects": [
      "益气",
      "生津"
    ]
  },
  {
    "id": "official-licorice",
    "name": "甘草",
    "nature": "平",
    "effects": [
      "和中",
      "调和"
    ]
  },
  {
    "id": "official-dried-ginger",
    "name": "干姜",
    "nature": "热",
    "effects": [
      "温中",
      "散寒"
    ]
  },
  {
    "id": "official-cinnamon",
    "name": "肉桂",
    "nature": "热",
    "effects": [
      "温阳",
      "散寒"
    ]
  },
  {
    "id": "official-fennel",
    "name": "小茴香",
    "nature": "温",
    "effects": [
      "温中",
      "理气"
    ]
  },
  {
    "id": "official-cardamom",
    "name": "白豆蔻",
    "nature": "温",
    "effects": [
      "化湿",
      "行气"
    ]
  },
  {
    "id": "official-amomum",
    "name": "砂仁",
    "nature": "温",
    "effects": [
      "行气",
      "和中"
    ]
  },
  {
    "id": "official-clove",
    "name": "丁香",
    "nature": "温",
    "effects": [
      "温中",
      "降逆"
    ]
  },
  {
    "id": "official-nutmeg",
    "name": "肉豆蔻",
    "nature": "温",
    "effects": [
      "温中",
      "涩肠"
    ]
  },
  {
    "id": "official-gardenia",
    "name": "栀子",
    "nature": "寒",
    "effects": [
      "清利",
      "除烦"
    ]
  },
  {
    "id": "official-cassia-seed",
    "name": "决明子",
    "nature": "凉",
    "effects": [
      "清利",
      "润肠"
    ]
  },
  {
    "id": "official-honeysuckle",
    "name": "金银花",
    "nature": "寒",
    "effects": [
      "清利",
      "解暑"
    ]
  },
  {
    "id": "official-dandelion",
    "name": "蒲公英",
    "nature": "寒",
    "effects": [
      "清利",
      "和中"
    ]
  },
  {
    "id": "official-houttuynia",
    "name": "鱼腥草",
    "nature": "寒",
    "effects": [
      "清利",
      "生津"
    ]
  },
  {
    "id": "official-reed-rhizome",
    "name": "芦根",
    "nature": "寒",
    "effects": [
      "生津",
      "清利"
    ]
  },
  {
    "id": "official-lotus-leaf",
    "name": "荷叶",
    "nature": "平",
    "effects": [
      "和中",
      "清暑"
    ]
  },
  {
    "id": "official-mulberry-leaf",
    "name": "桑叶",
    "nature": "凉",
    "effects": [
      "清利",
      "润燥"
    ]
  },
  {
    "id": "official-perilla-leaf",
    "name": "紫苏叶",
    "nature": "温",
    "effects": [
      "解表",
      "行气"
    ]
  },
  {
    "id": "official-perilla-seed",
    "name": "紫苏子",
    "nature": "温",
    "effects": [
      "降气",
      "润肠"
    ]
  },
  {
    "id": "official-plum",
    "name": "乌梅",
    "nature": "平",
    "effects": [
      "生津",
      "敛藏"
    ]
  },
  {
    "id": "official-sea-buckthorn",
    "name": "沙棘",
    "nature": "温",
    "effects": [
      "生津",
      "和中"
    ]
  },
  {
    "id": "official-goji-berry",
    "name": "枸杞子",
    "nature": "平",
    "effects": [
      "滋补",
      "养阴"
    ]
  },
  {
    "id": "official-morinda",
    "name": "巴戟天",
    "nature": "温",
    "effects": [
      "温补",
      "强筋"
    ]
  },
  {
    "id": "official-euryale",
    "name": "芡实",
    "nature": "平",
    "effects": [
      "补脾",
      "固摄"
    ]
  },
  {
    "id": "official-polygoni-odorati",
    "name": "玉竹",
    "nature": "平",
    "effects": [
      "养阴",
      "润燥"
    ]
  },
  {
    "id": "official-dendrobium",
    "name": "石斛",
    "nature": "凉",
    "effects": [
      "养阴",
      "生津"
    ]
  },
  {
    "id": "official-olive",
    "name": "橄榄",
    "nature": "平",
    "effects": [
      "生津",
      "利咽"
    ]
  },
  {
    "id": "official-sour-jujube-seed",
    "name": "酸枣仁",
    "nature": "平",
    "effects": [
      "养心",
      "安神"
    ]
  },
  {
    "id": "official-broomcorn",
    "name": "高良姜",
    "nature": "热",
    "effects": [
      "温中",
      "散寒"
    ]
  },
  {
    "id": "official-cyperus",
    "name": "香附",
    "nature": "平",
    "effects": [
      "理气",
      "解郁"
    ]
  },
  {
    "id": "official-angelica",
    "name": "当归",
    "nature": "温",
    "effects": [
      "养血",
      "活络"
    ]
  },
  {
    "id": "official-longan-pulp",
    "name": "桂圆肉",
    "nature": "温",
    "effects": [
      "养血",
      "安神"
    ]
  },
  {
    "id": "official-safflower",
    "name": "红花",
    "nature": "温",
    "effects": [
      "活络",
      "行散"
    ]
  },
  {
    "id": "official-peach-kernel",
    "name": "桃仁",
    "nature": "平",
    "effects": [
      "润肠",
      "活络"
    ]
  },
  {
    "id": "official-black-sesame",
    "name": "黑芝麻",
    "nature": "平",
    "effects": [
      "滋补",
      "润燥"
    ]
  },
  {
    "id": "official-walnut",
    "name": "核桃仁",
    "nature": "温",
    "effects": [
      "温补",
      "润肠"
    ]
  },
  {
    "id": "official-almond",
    "name": "杏仁",
    "nature": "温",
    "effects": [
      "降气",
      "润燥"
    ]
  },
  {
    "id": "official-pine-nut",
    "name": "松子仁",
    "nature": "温",
    "effects": [
      "润燥",
      "滋养"
    ]
  },
  {
    "id": "official-bitter-almond",
    "name": "苦杏仁",
    "nature": "温",
    "effects": [
      "降气",
      "润燥"
    ]
  },
  {
    "id": "official-chinese-olive",
    "name": "青果",
    "nature": "平",
    "effects": [
      "利咽",
      "生津"
    ]
  },
  {
    "id": "official-bamboo-leaf",
    "name": "淡竹叶",
    "nature": "寒",
    "effects": [
      "清利",
      "除烦"
    ]
  },
  {
    "id": "official-cordia-fruit",
    "name": "胖大海",
    "nature": "凉",
    "effects": [
      "利咽",
      "润燥"
    ]
  },
  {
    "id": "official-lotus-heart",
    "name": "莲子心",
    "nature": "寒",
    "effects": [
      "清利",
      "安神"
    ]
  },
  {
    "id": "official-gingko",
    "name": "银杏",
    "nature": "平",
    "effects": [
      "敛肺",
      "益气"
    ]
  },
  {
    "id": "official-turmeric",
    "name": "姜黄",
    "nature": "温",
    "effects": [
      "行气",
      "活络"
    ]
  },
  {
    "id": "official-galanga",
    "name": "良姜",
    "nature": "热",
    "effects": [
      "温中",
      "散寒"
    ]
  },
  {
    "id": "official-tsaoko",
    "name": "草果",
    "nature": "温",
    "effects": [
      "燥湿",
      "和中"
    ]
  },
  {
    "id": "official-kaempferia",
    "name": "山奈",
    "nature": "温",
    "effects": [
      "温中",
      "调香"
    ]
  },
  {
    "id": "official-lemongrass",
    "name": "香茅",
    "nature": "温",
    "effects": [
      "行气",
      "醒脾"
    ]
  },
  {
    "id": "official-citron",
    "name": "香橼",
    "nature": "温",
    "effects": [
      "理气",
      "和中"
    ]
  },
  {
    "id": "official-medlar-leaf",
    "name": "枸杞叶",
    "nature": "平",
    "effects": [
      "清补",
      "和中"
    ]
  },
  {
    "id": "official-mulberry",
    "name": "桑葚",
    "nature": "寒",
    "effects": [
      "养阴",
      "生津"
    ]
  },
  {
    "id": "official-fig",
    "name": "无花果",
    "nature": "平",
    "effects": [
      "润燥",
      "和中"
    ]
  },
  {
    "id": "official-date",
    "name": "大枣",
    "nature": "温",
    "effects": [
      "补中",
      "养血"
    ]
  },
  {
    "id": "official-dragon-eye",
    "name": "龙眼肉",
    "nature": "温",
    "effects": [
      "养心",
      "补血"
    ]
  },
  {
    "id": "official-chive-seed",
    "name": "韭菜子",
    "nature": "温",
    "effects": [
      "温补",
      "助阳"
    ]
  },
  {
    "id": "official-quince",
    "name": "木瓜",
    "nature": "温",
    "effects": [
      "和胃",
      "舒展"
    ]
  },
  {
    "id": "official-ophiopogon",
    "name": "麦冬",
    "nature": "凉",
    "effects": [
      "养阴",
      "生津"
    ]
  },
  {
    "id": "official-raspberry",
    "name": "覆盆子",
    "nature": "温",
    "effects": [
      "固摄",
      "补养"
    ]
  },
  {
    "id": "official-rehmannia",
    "name": "生地黄",
    "nature": "寒",
    "effects": [
      "养阴",
      "生津"
    ]
  },
  {
    "id": "official-solomon-seal",
    "name": "黄精",
    "nature": "平",
    "effects": [
      "滋补",
      "养阴"
    ]
  },
  {
    "id": "official-white-peony",
    "name": "白芍",
    "nature": "凉",
    "effects": [
      "养阴",
      "和营"
    ]
  },
  {
    "id": "official-imperata-root",
    "name": "白茅根",
    "nature": "寒",
    "effects": [
      "清利",
      "生津"
    ]
  },
  {
    "id": "official-bupleurum-tip",
    "name": "柴胡苗",
    "nature": "平",
    "effects": [
      "舒展",
      "理气"
    ]
  },
  {
    "id": "official-rose",
    "name": "玫瑰花",
    "nature": "温",
    "effects": [
      "理气",
      "和中"
    ]
  },
  {
    "id": "official-jasmine",
    "name": "茉莉花",
    "nature": "温",
    "effects": [
      "理气",
      "调香"
    ]
  },
  {
    "id": "official-osmanthus",
    "name": "桂花",
    "nature": "温",
    "effects": [
      "调香",
      "和中"
    ]
  },
  {
    "id": "official-kudzu",
    "name": "葛根",
    "nature": "凉",
    "effects": [
      "生津",
      "舒展"
    ]
  },
  {
    "id": "official-kudzu-flower",
    "name": "葛花",
    "nature": "平",
    "effects": [
      "和中",
      "醒脾"
    ]
  },
  {
    "id": "official-tangerine-white",
    "name": "橘络",
    "nature": "平",
    "effects": [
      "和络",
      "理气"
    ]
  },
  {
    "id": "official-tangerine-kernel",
    "name": "橘核",
    "nature": "温",
    "effects": [
      "理气",
      "散结"
    ]
  },
  {
    "id": "official-orange-blossom",
    "name": "橙花",
    "nature": "平",
    "effects": [
      "理气",
      "调香"
    ]
  },
  {
    "id": "official-burdock-seed",
    "name": "牛蒡子",
    "nature": "凉",
    "effects": [
      "疏利",
      "清爽"
    ]
  },
  {
    "id": "official-sweet-osmanthus",
    "name": "甜桂花",
    "nature": "温",
    "effects": [
      "调香",
      "和中"
    ]
  },
  {
    "id": "official-basil-seed",
    "name": "罗勒子",
    "nature": "平",
    "effects": [
      "和中",
      "调香"
    ]
  },
  {
    "id": "official-fragrant-leaf",
    "name": "香叶",
    "nature": "温",
    "effects": [
      "调香",
      "和中"
    ]
  },
  {
    "id": "official-lotus-plum",
    "name": "梅子",
    "nature": "平",
    "effects": [
      "生津",
      "开胃"
    ]
  },
  {
    "id": "official-sand-ginger",
    "name": "沙姜",
    "nature": "温",
    "effects": [
      "行气",
      "温中"
    ]
  },
  {
    "id": "official-bellflower",
    "name": "桔梗",
    "nature": "平",
    "effects": [
      "宣利",
      "和中"
    ]
  },
  {
    "id": "official-caper-spurge",
    "name": "霸王花",
    "nature": "凉",
    "effects": [
      "清润",
      "和中"
    ]
  },
  {
    "id": "official-red-bean",
    "name": "赤小豆",
    "nature": "平",
    "effects": [
      "利水",
      "和中"
    ]
  },
  {
    "id": "official-foxnut",
    "name": "鸡头米",
    "nature": "平",
    "effects": [
      "补脾",
      "固摄"
    ]
  },
  {
    "id": "official-pear-dry",
    "name": "雪梨干",
    "nature": "凉",
    "effects": [
      "生津",
      "润燥"
    ]
  },
  {
    "id": "official-loquat-leaf",
    "name": "枇杷叶",
    "nature": "平",
    "effects": [
      "和胃",
      "润燥"
    ]
  },
  {
    "id": "official-perilla-stem",
    "name": "苏梗",
    "nature": "温",
    "effects": [
      "理气",
      "和中"
    ]
  },
  {
    "id": "official-fermented-rice",
    "name": "醪糟",
    "nature": "温",
    "effects": [
      "和中",
      "调味"
    ]
  },
  {
    "id": "official-chinese-barley",
    "name": "大麦",
    "nature": "凉",
    "effects": [
      "和中",
      "助运"
    ]
  },
  {
    "id": "official-snow-lotus-fruit",
    "name": "皂角米",
    "nature": "平",
    "effects": [
      "润养",
      "和中"
    ]
  }
];
const RESTORED_EXTRA_BULK = [
  {
    "id": "cat-condiment-001",
    "name": "花椒",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-002",
    "name": "八角",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-003",
    "name": "桂皮",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-004",
    "name": "白胡椒",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-005",
    "name": "黑胡椒",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-006",
    "name": "辣椒",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-007",
    "name": "干辣椒",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-008",
    "name": "泡椒",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-009",
    "name": "豆瓣酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-010",
    "name": "黄豆酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-011",
    "name": "甜面酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-012",
    "name": "芝麻酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-013",
    "name": "花生酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-014",
    "name": "蒜蓉酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-015",
    "name": "虾酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-016",
    "name": "沙茶酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-017",
    "name": "腐乳",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-018",
    "name": "韭菜花",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-019",
    "name": "剁椒",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-020",
    "name": "糟卤",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-021",
    "name": "料酒",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-022",
    "name": "黄酒",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-023",
    "name": "米酒",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-024",
    "name": "陈醋",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-025",
    "name": "香醋",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-026",
    "name": "白醋",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-027",
    "name": "米醋",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-028",
    "name": "酱油",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-029",
    "name": "生抽",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-030",
    "name": "老抽",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-031",
    "name": "蚝油",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-032",
    "name": "鱼露",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-033",
    "name": "味噌",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-034",
    "name": "芥末",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-035",
    "name": "孜然",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-036",
    "name": "咖喱粉",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-037",
    "name": "五香粉",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-038",
    "name": "十三香",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-039",
    "name": "椒盐",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-040",
    "name": "黑糖",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-041",
    "name": "冰糖",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-042",
    "name": "红糖",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-043",
    "name": "蜂蜜",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-044",
    "name": "麦芽糖",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-045",
    "name": "枫糖浆",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-046",
    "name": "酸梅膏",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-047",
    "name": "花生碎",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-048",
    "name": "芝麻碎",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-049",
    "name": "葱油",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-050",
    "name": "花椒油",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-051",
    "name": "辣椒油",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-052",
    "name": "芝麻油",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-053",
    "name": "菜籽油",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-054",
    "name": "猪油",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-055",
    "name": "牛油",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-056",
    "name": "鸡油",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-057",
    "name": "黄油",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-058",
    "name": "奶油",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-059",
    "name": "炼乳",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-060",
    "name": "奶酪粉",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-061",
    "name": "番茄酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-062",
    "name": "蛋黄酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-063",
    "name": "沙拉酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-064",
    "name": "凯撒酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-065",
    "name": "塔塔酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-066",
    "name": "蒜香黄油",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-067",
    "name": "松露酱",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-068",
    "name": "香草荚",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-069",
    "name": "迷迭香",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-070",
    "name": "百里香",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-071",
    "name": "鼠尾草",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-072",
    "name": "牛至",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-073",
    "name": "罗勒",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-074",
    "name": "欧芹",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-075",
    "name": "月桂叶",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-076",
    "name": "芫荽籽",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-077",
    "name": "葛缕子",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-078",
    "name": "烟熏红椒粉",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-079",
    "name": "芥菜籽",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-080",
    "name": "椰浆粉",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-condiment-081",
    "name": "可可粉",
    "category": "CAT_CONDIMENT",
    "nature": "温",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-082",
    "name": "椰子水",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-083",
    "name": "柠檬水",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-084",
    "name": "蜂蜜水",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-085",
    "name": "苏打水",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-086",
    "name": "矿泉水",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-087",
    "name": "气泡水",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-088",
    "name": "果蔬汁",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-089",
    "name": "甘蔗汁",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-090",
    "name": "玉米汁",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-091",
    "name": "杏仁露",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-092",
    "name": "核桃露",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-093",
    "name": "酸奶饮",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-094",
    "name": "奶昔",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-095",
    "name": "米乳",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-096",
    "name": "豆乳",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-097",
    "name": "植物奶",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-098",
    "name": "牛乳",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-099",
    "name": "羊乳",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-100",
    "name": "马奶",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-101",
    "name": "拿铁",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-102",
    "name": "美式咖啡",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-103",
    "name": "可可",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-104",
    "name": "热巧克力",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-105",
    "name": "酸奶昔",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-106",
    "name": "奶茶",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-107",
    "name": "水果茶",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-108",
    "name": "花草茶",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-109",
    "name": "乌梅饮",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-110",
    "name": "雪梨汁",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-111",
    "name": "洛神花饮",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-112",
    "name": "菊花露",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-113",
    "name": "薄荷饮",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-114",
    "name": "柚子茶",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-115",
    "name": "姜茶",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-116",
    "name": "红糖姜饮",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-117",
    "name": "银耳饮",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-118",
    "name": "米汤",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-119",
    "name": "酸角汁",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-120",
    "name": "罗望子饮",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-121",
    "name": "椰奶",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-122",
    "name": "燕麦奶",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-123",
    "name": "抹茶拿铁",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-drink-124",
    "name": "康普茶",
    "category": "CAT_DRINK",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-125",
    "name": "黑米",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-126",
    "name": "紫米",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-127",
    "name": "高粱",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-128",
    "name": "青稞",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-129",
    "name": "藜麦",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-130",
    "name": "薏米饭",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-131",
    "name": "糙米",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-132",
    "name": "小麦",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-133",
    "name": "西米",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-134",
    "name": "粳米",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-135",
    "name": "籼米",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-136",
    "name": "黍米",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-137",
    "name": "糜子",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-138",
    "name": "燕麦片",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-139",
    "name": "玉米碴",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-140",
    "name": "米皮糖",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-141",
    "name": "米花",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-142",
    "name": "米线",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-143",
    "name": "米粉",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-144",
    "name": "河粉",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-145",
    "name": "粿条",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-146",
    "name": "年糕米",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-grain-147",
    "name": "粽米",
    "category": "CAT_GRAIN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-148",
    "name": "芸豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-149",
    "name": "眉豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-150",
    "name": "鹰嘴豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-151",
    "name": "扁豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-152",
    "name": "刀豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-153",
    "name": "豌豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-154",
    "name": "蚕豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-155",
    "name": "四季豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-156",
    "name": "荷兰豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-157",
    "name": "毛豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-158",
    "name": "菜豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-159",
    "name": "花豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-160",
    "name": "斑豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-161",
    "name": "白芸豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-162",
    "name": "青豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-163",
    "name": "黑眼豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-164",
    "name": "小扁豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-165",
    "name": "豆荚米",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-166",
    "name": "豆苗豆",
    "category": "CAT_BEAN",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-167",
    "name": "豆皮",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-168",
    "name": "腐竹",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-169",
    "name": "豆干",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-170",
    "name": "香干",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-171",
    "name": "千张",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-172",
    "name": "豆泡",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-173",
    "name": "豆花",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-174",
    "name": "豆乳皮",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-175",
    "name": "纳豆",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-176",
    "name": "豆豉",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-177",
    "name": "豆瓣",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-178",
    "name": "豆沙",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-179",
    "name": "豆泥",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-180",
    "name": "豆腐脑",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-181",
    "name": "豆腐丝",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-182",
    "name": "豆肠",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-183",
    "name": "油豆腐",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-184",
    "name": "冻豆腐",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-185",
    "name": "内酯豆腐",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-bean-product-186",
    "name": "老豆腐",
    "category": "CAT_BEAN_PRODUCT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-187",
    "name": "白菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-188",
    "name": "油菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-189",
    "name": "生菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-190",
    "name": "芹菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-191",
    "name": "韭菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-192",
    "name": "大葱",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-193",
    "name": "小葱",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-194",
    "name": "洋葱",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-195",
    "name": "大蒜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-196",
    "name": "蒜苗",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-197",
    "name": "青椒",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-198",
    "name": "彩椒",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-199",
    "name": "茄子",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-200",
    "name": "西葫芦",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-201",
    "name": "丝瓜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-202",
    "name": "苦菊",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-203",
    "name": "油麦菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-204",
    "name": "莴笋",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-205",
    "name": "芥蓝",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-206",
    "name": "菜心",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-207",
    "name": "上海青",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-208",
    "name": "苋菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-209",
    "name": "菠菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-210",
    "name": "茼蒿",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-211",
    "name": "苜蓿芽",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-212",
    "name": "包菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-213",
    "name": "紫甘蓝",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-214",
    "name": "花椰菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-215",
    "name": "西兰花",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-216",
    "name": "胡萝卜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-217",
    "name": "青萝卜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-218",
    "name": "樱桃萝卜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-219",
    "name": "萝卜缨",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-220",
    "name": "萝卜干",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-221",
    "name": "土豆",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-222",
    "name": "山药豆",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-223",
    "name": "芋头",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-224",
    "name": "芋苗",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-225",
    "name": "红薯",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-226",
    "name": "紫薯",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-227",
    "name": "木薯",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-228",
    "name": "莲藕带",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-229",
    "name": "茭白",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-230",
    "name": "慈菇",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-231",
    "name": "荸荠",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-232",
    "name": "芦笋尖",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-233",
    "name": "豇豆",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-234",
    "name": "豆角",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-235",
    "name": "秋葵",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-236",
    "name": "佛手瓜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-237",
    "name": "黄花菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-238",
    "name": "菜花",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-239",
    "name": "羽衣甘蓝",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-240",
    "name": "鸡毛菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-241",
    "name": "苕尖",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-242",
    "name": "苜蓿菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-243",
    "name": "空心菜梗",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-244",
    "name": "苤蓝",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-245",
    "name": "榨菜头",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-246",
    "name": "甜玉米",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-247",
    "name": "玉米笋",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-248",
    "name": "番薯叶",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-249",
    "name": "地瓜叶",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-250",
    "name": "南瓜花",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-251",
    "name": "西葫芦花",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-252",
    "name": "冬寒菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-253",
    "name": "萝卜苗",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-254",
    "name": "豆苗",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-255",
    "name": "青蒜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-256",
    "name": "蒜苔",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-257",
    "name": "马兰头",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-258",
    "name": "香椿头",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-259",
    "name": "龙须菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-260",
    "name": "白菜苔",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-261",
    "name": "芥菜头",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-262",
    "name": "油菜苔",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-263",
    "name": "枸杞头",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-264",
    "name": "枸杞芽",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-265",
    "name": "黄秋葵",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-266",
    "name": "豆瓣菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-267",
    "name": "朝鲜蓟",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-268",
    "name": "芜菁",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-269",
    "name": "球茎甘蓝",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-270",
    "name": "抱子甘蓝",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-271",
    "name": "洋姜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-272",
    "name": "牛蒡",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-273",
    "name": "蒿子秆",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-veg-274",
    "name": "菱角菜",
    "category": "CAT_VEG",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-275",
    "name": "荠菜",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-276",
    "name": "香椿",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-277",
    "name": "马兰头",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-278",
    "name": "灰灰菜",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-279",
    "name": "蒲公英叶",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-280",
    "name": "刺儿菜",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-281",
    "name": "苦菜",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-282",
    "name": "车前草",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-283",
    "name": "枸杞头",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-284",
    "name": "苜蓿",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-285",
    "name": "野芹菜",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-286",
    "name": "野韭菜",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-287",
    "name": "野葱",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-288",
    "name": "地皮菜",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-289",
    "name": "榆钱",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-290",
    "name": "槐花",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-291",
    "name": "洋槐花",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-292",
    "name": "蕨根",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-293",
    "name": "野蒜",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-294",
    "name": "折耳根",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-295",
    "name": "蕨根粉",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-296",
    "name": "观音菜",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-297",
    "name": "野苋菜",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-298",
    "name": "山野菜",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-wild-299",
    "name": "蕨麻",
    "category": "CAT_WILD",
    "nature": "凉",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-300",
    "name": "香菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-301",
    "name": "平菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-302",
    "name": "金针菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-303",
    "name": "杏鲍菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-304",
    "name": "鸡腿菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-305",
    "name": "口蘑",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-306",
    "name": "茶树菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-307",
    "name": "滑子菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-308",
    "name": "海鲜菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-309",
    "name": "姬菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-310",
    "name": "虫草花",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-311",
    "name": "羊肚菌",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-312",
    "name": "松茸",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-313",
    "name": "牛肝菌",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-314",
    "name": "鸡枞菌",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-315",
    "name": "竹荪",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-316",
    "name": "木耳",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-317",
    "name": "银耳花",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-318",
    "name": "蘑菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-319",
    "name": "白玉菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-320",
    "name": "蟹味菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-321",
    "name": "鹿茸菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-322",
    "name": "鹿肚菌",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-323",
    "name": "珊瑚菌",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-324",
    "name": "榛蘑",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-325",
    "name": "元蘑",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-326",
    "name": "真姬菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-327",
    "name": "秀珍菇",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-328",
    "name": "黑木耳",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-329",
    "name": "黄伞菌",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-330",
    "name": "黄牛肝菌",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-331",
    "name": "青头菌",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-332",
    "name": "铜绿菌",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-333",
    "name": "奶浆菌",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-334",
    "name": "扫把菌",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fungi-335",
    "name": "鸡油菌",
    "category": "CAT_FUNGI",
    "nature": "平",
    "regions": [
      "CN"
    ]
  },
  {
    "id": "cat-fruit-336",
    "name": "葡萄",
    "category": "CAT_FRUIT",
    "nature": "平",
    "regions": [
      "CN"
    ]
  }
];

EXPANDED_FOODS.push(
  ...RESTORED_OFFICIAL_BULK.map((item) => f(item.id, item.name, item.nature, CAT_OFFICIAL, [item.name], item.effects, ["CN"], {
    officialFoodMedicine: true,
    officialBatch: "2025",
    confidence: "药食同源目录补回条目"
  })),
  ...RESTORED_EXTRA_BULK.map((item) => f(item.id, item.name, item.nature, RESTORED_CATEGORY_MAP[item.category] || CAT_TONIC, [item.name], ["日常食养"], item.regions, {
    confidence: "中国地方食材与常见食物扩充条目"
  }))
);
/* END RESTORED BULK FOODS */

function f(id, name, nature, category, aliases, effects, regions, extra = {}) {
  return {
    id,
    name,
    en: aliases.find((alias) => /[a-z]/i.test(alias)) || name,
    jp: "",
    kr: "",
    aliases,
    effects,
    regions,
    category,
    nature,
    flavor: "\u672a\u6807\u6ce8",
    meridians: [],
    summary: extra.summary || `${name}\u662f\u5e38\u89c1${category}\u3002\u4f20\u7edf\u98df\u517b\u4e2d\u5e38\u89c1\u5173\u952e\u8bcd\u4e3a\u201c${effects.join("\u3001")}\u201d\uff0c\u5b9e\u9645\u5f71\u54cd\u66f4\u53d6\u51b3\u4e8e\u4efd\u91cf\u3001\u52a0\u5de5\u65b9\u5f0f\u548c\u4e2a\u4eba\u8010\u53d7\u3002`,
    benefits: extra.benefits || [`\u4f20\u7edf\u98df\u517b\u5e38\u89c1\u5173\u952e\u8bcd\uff1a${effects.join("\u3001")}`, "\u65e5\u5e38\u8425\u517b\u4ef7\u503c\u9700\u7ed3\u5408\u54c1\u79cd\u3001\u4efd\u91cf\u4e0e\u70f9\u8c03\u65b9\u5f0f\u8bc4\u4f30"],
    caution: extra.caution || "\u8bf7\u7ed3\u5408\u4efd\u91cf\u3001\u52a0\u5de5\u65b9\u5f0f\u4e0e\u4e2a\u4eba\u8010\u53d7\u7efc\u5408\u5224\u65ad\uff1b\u4f20\u7edf\u98df\u6027\u4e0d\u66ff\u4ee3\u73b0\u4ee3\u533b\u5b66\u7ed3\u8bba\u3002",
    cautionTags: extra.cautionTags || [],
    suitableFor: extra.suitableFor || [],
    avoidFor: extra.avoidFor || [],
    contraindications: extra.contraindications || [],
    officialFoodMedicine: Boolean(extra.officialFoodMedicine),
    officialBatch: extra.officialBatch || "",
    confidence: extra.confidence || "\u5e38\u89c1\u98df\u6750\uff1b\u4f20\u7edf\u5c5e\u6027\u5f85\u6301\u7eed\u590d\u6838",
    teaClass: extra.teaClass || "",
    teaNote: extra.teaNote || "",
    searchTerms: extra.searchTerms || [],
    alone: extra.alone || "",
    timing: extra.timing || "",
    pair: extra.pair || "",
    qiTerms: extra.qiTerms || [],
    qiTermNote: extra.qiTermNote || "",
    varietyNote: extra.varietyNote || "",
    faCategory: extra.faCategory || "",
    faNote: extra.faNote || "",
    regulatoryNote: extra.regulatoryNote || "",
    sources: extra.sources || [],
    safetyNote: extra.safetyNote || ""
  };
}

function tea(id, name, nature, teaClass, aliases, effects, regions) {
  return f(id, name, nature, CAT_TEA, aliases, effects, regions, {
    teaClass,
    teaNote: `${name}\u6309\u73b0\u884c\u8336\u7c7b\u5f52\u5c5e\u6574\u7406\uff0c\u4f20\u7edf\u98df\u6027\u4ec5\u4f5c\u65e5\u5e38\u53c2\u8003\u3002`,
    cautionTags: ["iron", "reflux"],
    searchTerms: ["\u8336", teaClass, CAT_TEA],
    confidence: "\u8336\u7c7b\u5f52\u5c5e\u6309\u73b0\u884c\u5206\u7c7b\u6574\u7406"
  });
}

EXPANDED_FOODS.push(
  f("cistanche-roucongrong", "肉苁蓉", N_WARM, CAT_OFFICIAL, ["苁蓉", "大芸", "甜苁蓉", "cistanche"], ["补肾", "润肠"], ["CN"], {
    confidence: "长尾药食材检索补全条目；目录身份需按最新版清单逐项核验",
    searchTerms: ["roucongrong", "rcr", "内蒙古苁蓉", "新疆大芸"],
    cautionTags: ["medication"],
    summary: "肉苁蓉多见于补肾、润肠类传统食养语境，不宜当作普通调味料长期随意叠加。"
  }),
  f("dendrobium-tiepi", "铁皮石斛", N_COOL, CAT_OFFICIAL, ["铁皮枫斗", "枫斗", "霍山石斛", "石斛", "dendrobium"], ["养阴", "生津"], ["CN"], {
    confidence: "石斛类细分可检索条目；不重复计入106项目录总数",
    searchTerms: ["tiepishihu", "tpsh", "霍斗", "浙石斛"],
    cautionTags: ["medication"],
    summary: "铁皮石斛是石斛类中常见的细分称呼，传统上多放在养阴、生津、清润的食养框架里。"
  }),
  f("baizhu", "白术", N_WARM, CAT_OFFICIAL, ["於术", "冬术", "浙术", "atractylodes"], ["健脾", "燥湿"], ["CN"], {
    confidence: "中药材检索补全条目；日常食用边界需谨慎",
    searchTerms: ["baizhu", "bz", "浙江白术"],
    cautionTags: ["medication"],
    summary: "白术多见于健脾、燥湿类方药语境，作为食养信息仅作辨识与搭配提醒，不建议自行长期食用。"
  }),
  f("crab", "螃蟹", N_COLD, CAT_SEA, ["蟹", "河蟹", "大闸蟹", "毛蟹", "crab"], ["清鲜", "高蛋白"], ["CN"], { searchTerms: ["pangxie", "px", "湖蟹", "清水蟹"], cautionTags: ["allergy"], confidence: "常见海鲜与水产条目" }),
  f("shrimp", "虾", N_WARM, CAT_SEA, ["鲜虾", "海虾", "河虾", "shrimp", "prawn"], ["高蛋白"], ["CN"], { searchTerms: ["xia", "x", "虾仁"], cautionTags: ["allergy"], confidence: "常见海鲜与水产条目" }),
  f("lobster", "龙虾", N_WARM, CAT_SEA, ["大龙虾", "澳龙", "波龙", "lobster"], ["高蛋白"], ["CN", "US"], { searchTerms: ["longxia", "lx", "澳洲龙虾", "波士顿龙虾"], cautionTags: ["allergy"], confidence: "常见海鲜与水产条目" }),
  f("black-tiger-shrimp", "黑虎虾", N_WARM, CAT_SEA, ["草虾", "斑节虾", "black tiger shrimp"], ["高蛋白"], ["CN", "TH"], { searchTerms: ["heihuxia", "hhx", "虎虾"], cautionTags: ["allergy"], confidence: "常见虾类细分条目" }),
  f("whiteleg-shrimp", "南美白对虾", N_WARM, CAT_SEA, ["白虾", "凡纳滨对虾", "whiteleg shrimp"], ["高蛋白"], ["CN", "US"], { searchTerms: ["nanmeibaiduixia", "nmbdx", "南美白虾"], cautionTags: ["allergy"], confidence: "常见虾类细分条目" }),
  f("kuruma-prawn", "竹节虾", N_WARM, CAT_SEA, ["竹节对虾", "九节虾", "kuruma prawn"], ["高蛋白"], ["CN", "JP"], { searchTerms: ["zhujiexia", "zjx", "花虾"], cautionTags: ["allergy"], confidence: "常见虾类细分条目" }),
  f("ming-prawn", "明虾", N_WARM, CAT_SEA, ["对虾", "大明虾", "prawn"], ["高蛋白"], ["CN"], { searchTerms: ["mingxia", "mx", "海捕明虾"], cautionTags: ["allergy"], confidence: "常见虾类细分条目" }),
  f("argentine-red-shrimp", "阿根廷红虾", N_WARM, CAT_SEA, ["红虾", "阿根廷甜虾", "argentine red shrimp"], ["高蛋白"], ["CN"], { searchTerms: ["agentinghongxia", "agthx", "船冻红虾"], cautionTags: ["allergy"], confidence: "常见进口虾类条目" }),
  f("greasyback-shrimp", "基围虾", N_WARM, CAT_SEA, ["基围", "沙虾", "greasyback shrimp"], ["高蛋白"], ["CN"], { searchTerms: ["jiweixia", "jwx", "广东基围虾"], cautionTags: ["allergy"], confidence: "常见虾类细分条目" }),
  f("fish-generic", "鱼", N_NEUTRAL, CAT_SEA, ["鲜鱼", "鱼肉", "淡水鱼", "海鱼", "fish"], ["高蛋白"], ["CN"], { searchTerms: ["yu", "y"], cautionTags: ["allergy"], confidence: "常见水产总类条目" }),
  f("pandan-leaf", "斑斓叶", N_NEUTRAL, CAT_CONDIMENT, ["班兰叶", "香兰叶", "香茅兰", "pandan", "pandan leaf"], ["芳香", "调味"], ["SG", "MY", "TH"], { searchTerms: ["banlanye", "bly", "新加坡班兰", "马来香兰叶"], confidence: "东南亚常见香草调味条目" }),
  f("peach", "桃", N_WARM, CAT_FRUIT, ["桃子", "水蜜桃", "毛桃", "peach"], ["生津"], ["CN"], { searchTerms: ["tao", "t", "奉化水蜜桃", "阳山水蜜桃"], confidence: "常见水果条目" }),
  f("durian", "榴莲", N_HOT, CAT_FRUIT, ["榴梿", "金枕榴莲", "猫山王", "durian"], ["温补"], ["TH", "MY"], { searchTerms: ["liulian", "ll", "泰国金枕", "马来猫山王"], confidence: "东南亚常见水果条目", cautionTags: ["reflux"] }),
  f("rice-mi", "米", N_NEUTRAL, CAT_GRAIN, ["大米", "粳米", "籼米", "rice"], ["主食"], ["CN"], { searchTerms: ["mi", "m", "柴米油盐酱醋茶"], confidence: "柴米油盐酱醋茶基础条目" }),
  f("cooking-oil", "油", N_NEUTRAL, CAT_CONDIMENT, ["食用油", "菜籽油", "花生油", "芝麻油", "cooking oil"], ["调味"], ["CN"], { searchTerms: ["you", "y", "柴米油盐酱醋茶"], confidence: "柴米油盐酱醋茶基础条目" }),
  f("salt", "盐", N_NEUTRAL, CAT_CONDIMENT, ["食盐", "海盐", "井盐", "salt"], ["调味"], ["CN"], { searchTerms: ["yan", "y", "柴米油盐酱醋茶"], confidence: "柴米油盐酱醋茶基础条目" }),
  f("sauce-jiang", "酱", N_NEUTRAL, CAT_CONDIMENT, ["酱油", "黄豆酱", "豆瓣酱", "甜面酱", "soy sauce", "sauce"], ["调味"], ["CN"], { searchTerms: ["jiang", "j", "柴米油盐酱醋茶"], confidence: "柴米油盐酱醋茶基础条目" }),
  f("vinegar-cu", "醋", N_WARM, CAT_CONDIMENT, ["米醋", "陈醋", "香醋", "镇江香醋", "vinegar"], ["调味"], ["CN"], { searchTerms: ["cu", "c", "柴米油盐酱醋茶"], confidence: "柴米油盐酱醋茶基础条目" })
);
