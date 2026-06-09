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
