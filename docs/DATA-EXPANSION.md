# 数据扩库操作清单

Atlas 采用**纯本地物化**扩库，不依赖公开 API 联网抓取。

## 1. 地理标志（GI）

**文件：** `data/raw/origin/registry-manifest.json`

每条 `items` 建议字段：

| 字段 | 说明 |
|------|------|
| `name` | 产品名称（必填） |
| `system` | `cnipa` / `mara` / `provincial` |
| `region` | 省份或产区 |
| `category` | 茶、水果、海产、谷物等 |
| `sourceId` | 稳定唯一 id（必填，用于 ingest） |
| `baseFoodId` | 可选，指向食材 catalog 基原 |
| `teaClass` | 茶饮可选：绿茶 / 乌龙茶 / 黑茶等 |

**流程：**

```bash
# 1. 编辑 registry-manifest.json
# 2. 物化 + 全量构建
npm run build:data
```

也可将外部整理 JSON 放入 `data/raw/origin/incoming/` 后执行 `npm run materialize:origin`。

## 2. 道地产区

**文件：** `data/tcm/dao-di-regions.json`

| 字段 | 说明 |
|------|------|
| `canonicalId` | 与 catalog / 药典 id 对齐（如 `poria-cocos`、`yam`） |
| `name` | 药材正名 |
| `daoDiRegions` | `{ place, province, county? }` 数组 |
| `sources` | 文献依据 |

构建后输出 `generated/dao-di-regions.js`，前端按 `resolveFoodId(canonicalId)` 匹配道地 badge。

## 3. 季节 / 河鲜搜词

**文件：** `data/cn/foods-seasonal-river.json`

用于补高频时令搜词（春笋、河虾、梭子蟹等）。`id` 宜与 `foods-ingredients.json` 对齐以便合并元数据。

## 4. 搭配规则

**文件：**

- `data/cn/pairing-rules-base.json` — 核心
- `data/cn/pairing-rules-extra.json`
- `data/cn/pairing-rules-extra-batch2.json`
- `data/cn/pairing-rules-extra-batch3.json`

每条需 `ids`、`title`、`level`、`category`、`text`。新增批次后确认 `scripts/build-data.mjs` 已纳入。

## 5. 重名合并

```bash
npm run audit:dupes          # 预览
npm run consolidate:aliases  # 写入 alias + hiddenFromLibrary
```

策略：产地认证条目（`*-origin` / GI id）**不**与基原合并；中药材与食材跨类不合并。

## 6. 验收

```bash
npm run build:data
npm test
```

关注 validate 输出：产地条数、道地映射数、alias 数、薄条目、模板句命中。

## 7. 部署

```bash
npm run build    # 生成 dist/
# 推送 main 后 GitHub Actions 部署 Cloudflare Pages
```

`sw.js` 缓存版本（`atlas-v*`）变更后必须重新 build 并部署。
