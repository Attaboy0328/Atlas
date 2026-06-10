# 产地认证数据流水线

## 目录

| 路径 | 用途 |
|------|------|
| `data/cn/origin-products.seed.json` | 手工种子（MVP / 回退） |
| `data/raw/origin/registry-manifest.json` | 离线索引（常搜 GI 名录） |
| `data/raw/origin/incoming/` | 手工拖入的 JSON/CSV 批次 |
| `data/raw/origin/fetched-*.json` | 物化输出（由 manifest + incoming 生成） |
| `data/raw/origin/*-batch*.json` | 整理好的导入批次 |
| `data/cn/origin-products.json` | ingest 归一化输出（勿手改） |
| `data/tcm/dao-di-regions.json` | 道地产区映射（canonicalId → 产区） |
| `generated/origin-products.js` | 前端 bundle |
| `generated/dao-di-regions.js` | 前端 bundle |

## 命令

```bash
# 完整数据构建（含归一化、重名合并、产地物化、ingest）
npm run build:data

# 将 manifest + incoming 物化到 fetched-*.json（纯本地，无网络）
npm run materialize:origin

# 重名自动合并为 alias + hiddenFromLibrary
npm run consolidate:aliases

# 仅产地 ingest + bundle
npm run ingest:origin
```

## 扩库方式（无 API）

1. 编辑 `data/raw/origin/registry-manifest.json`，追加 `items`（含 `name`、`system`、`region`、`sourceId`，可选 `baseFoodId`）
2. 或将整理好的 JSON/CSV 放入 `data/raw/origin/incoming/`
3. 运行 `npm run materialize:origin` 生成 `fetched-*.json`
4. 再跑 `npm run ingest:origin` 或 `npm run build:data`

详见 [DATA-EXPANSION.md](./DATA-EXPANSION.md)。

## 导入格式

`data/raw/origin/*.json` 支持：

- 数组 `[{ id, name, provenance, ... }]`
- 对象 `{ items: [...] }`
- 单条对象

每条必须有 `provenance.source`（如 `cnipa` / `mara` / `provincial`）。

## 校验

`npm run validate-data` 会检查：

- `origin-products.json` 非空
- `generated/origin-products.js` 存在
- `baseFoodId` 是否在食材 catalog 中（警告）

## 全量 GI 抓取（截至 2026-06-09）

从国家知识产权局公告 PDF 解析 CNIPA 地理标志产品，并合并道地药材 stub、MARA 历史 AGI、PEOP 公告条目：

```bash
npm run sync:gi-full
npm run build:data
npm test
```

分项抓取：

```bash
npm run fetch:mara-agi   # 绿色食品中心 API，约 3510 条历史 AGI
npm run fetch:peop       # stycd 证书 + ycdoffice 公告，约 400+ 条 PEOP
```

输出：

| 文件 | 说明 |
|------|------|
| `data/raw/origin/cnipa-announcements/products-through-2026-06-09.json` | CNIPA PDF 解析结果（~2257） |
| `data/raw/origin/mara-agi/products-through-2026-06-09.json` | MARA 农产品地理标志（3510） |
| `data/raw/origin/peop-announcements/products-through-2026-06-09.json` | PEOP 生态原产地（~400+） |
| `data/raw/origin/dao-di-origin-stubs.json` | 363 道地药材产地卡 |
| `data/raw/origin/mara-agi-origin-stubs.json` | MARA 产地卡 stub |
| `data/raw/origin/peop-origin-stubs.json` | PEOP 产地卡 stub |
| `data/cn/origin-products.json` | 归一化输出（去重合并后 4400+ 条） |

## 产地产品食性推断

`ingest-origin-products.mjs` 对批量导入的 GI / PEOP / 道地条目自动推断食性，优先级：

1. **seed** — 手工整理种子数据（保留原值）
2. **catalog-id** — 已关联 `baseFoodId` 时继承主食材库/药典
3. **tcm-herb** — 道地药材按药典四气匹配
4. **catalog-name** — 名称/别名与子串匹配主库
5. **rule-name** — 酒→温、茶→凉、蟹→寒、羊肉→温 等规则
6. **category-default** — 按归一化类目兜底（无「待考证」留空）

重建后查看分布：`node scripts/ingest-origin-products.mjs` 日志中的 `nature distribution`。

## 道地交叉表

`data/cn/gi-dao-di-crosswalk.json` 在 ingest 时自动为 GI 条目补 `baseFoodId`、`daoDi`、`peop`。

## 月度自动补充

```bash
npm run sync:origin-monthly   # 本地：队列 → manifest + 道地抓取 + 物化
```

GitHub Actions `monthly-origin-daodi-sync.yml` 每月 1 日 UTC 05:00 自动运行，提交变更。

队列文件：`data/cn/gi-expansion-queue.json`（默认每轮 30 条）。

## 搜索审计

```bash
node scripts/audit-origin-search.mjs
```

已纳入 `npm test`。


`npm run consolidate:aliases` 会：

1. 扫描全库同名不同 id 的食材（排除产地认证条目与中药材/食材跨类）
2. 按来源优先级选出 canonical id
3. 写入 `data/cn/food-id-aliases.json`
4. 在 CN JSON 源里为重复项打 `hiddenFromLibrary: true`

已纳入 `npm run build:data` 流水线。

## 上线注意

数据或 `sw.js` 缓存版本变更后执行 `npm run build` 并部署 `dist/`。
