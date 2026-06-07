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
# 完整数据构建（含归一化、产地 ingest）
npm run build:data

# 仅产地 ingest + bundle
npm run ingest:origin

# 重新生成 raw 批次样例（开发用）
node scripts/build-origin-raw-batches.mjs
```

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

## 上线注意

数据或 `sw.js` 缓存版本变更后执行 `npm run build` 并部署 `dist/`。
