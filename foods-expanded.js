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


if (typeof EXPANDED_FOODS_BULK !== "undefined") {
  EXPANDED_FOODS.push(...EXPANDED_FOODS_BULK);
}
