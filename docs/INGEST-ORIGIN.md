# 产地认证数据流水线

## 目录

| 路径 | 用途 |
|------|------|
| `data/cn/origin-products.seed.json` | 手工种子（MVP / 回退） |
| `data/raw/origin/*.json` | 公开库抓取或转换后的导入批次 |
| `data/cn/origin-products.json` | ingest 归一化输出（勿手改） |
| `data/tcm/dao-di-regions.json` | 道地产区映射（canonicalId → 产区） |
| `generated/origin-products.js` | 前端 bundle |
| `generated/dao-di-regions.js` | 前端 bundle |

## 命令

```bash
# 完整数据构建（含归一化、重名合并、离线抓取、产地 ingest）
npm run build:data

# 尝试联网抓取 + manifest + incoming 落盘
npm run fetch:origin

# 仅 manifest / incoming（无网络）
npm run fetch:origin:offline

# 重名自动合并为 alias + hiddenFromLibrary
npm run consolidate:aliases

# 仅产地 ingest + bundle
npm run ingest:origin
```

## 抓取配置

1. 编辑 `data/raw/origin/fetch-sources.json`，填入公开 JSON/CSV 导出 URL 并设 `enabled: true`
2. 或将下载文件放入 `data/raw/origin/incoming/`（`.json` / `.csv`）
3. 运行 `npm run fetch:origin` 生成 `data/raw/origin/fetched-*.json`
4. 再跑 `npm run ingest:origin` 或 `npm run build:data`

`registry-manifest.json` 为离线索引；联网失败时仍会物化到 `fetched-registry-manifest-*.json`。

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

## 重名自动合并

`npm run consolidate:aliases` 会：

1. 扫描全库同名不同 id 的食材（排除产地认证条目与中药材/食材跨类）
2. 按来源优先级选出 canonical id
3. 写入 `data/cn/food-id-aliases.json`
4. 在 CN JSON 源里为重复项打 `hiddenFromLibrary: true`

已纳入 `npm run build:data` 流水线。

## 上线注意

数据或 `sw.js` 缓存版本变更后执行 `npm run build` 并部署 `dist/`。
