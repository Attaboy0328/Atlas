# Atlas（食养知行）

静态 Web 应用：浏览传统食材食性、搭配提醒、食疗方与药食同源说明。

## 目录

- `index.html` — 应用壳与 PWA 入口
- `atlas-bootstrap.js` — 首屏懒加载与服务 worker 注册
- `app.js` — 搜索、筛选、详情与搭配检查
- `foods-expanded.js` — 食材主库
- `data/` — JSON 数据源（手搓方、经典方、搭配规则等）
- `scripts/` — 构建与校验脚本
- `generated/` — `npm run build:data` 产物（勿手改）

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开 Vite 提供的地址（默认 `http://localhost:3000`）。

也可用任意静态服务器直接托管根目录；生产构建输出在 `dist/`。

## 构建与校验

```bash
npm test              # validate-data + audit-data
npm run build:data    # 重新生成 generated/*.js
npm run build         # build:data + 拷贝到 dist/
```

## 部署

目标平台：**GitHub → Cloudflare Pages**（`wrangler.jsonc` 指向 `./dist`）。

1. `npm run build`
2. 将 `dist/` 作为 Pages 发布目录

也可用于 GitHub Pages、Netlify 等静态托管。

## 数据说明

- 手搓食疗方：`data/tcm/handcrafted-recipes.json`
- 经典/节气方：`data/tcm/classic-diet-recipes.json`、`solar-term-recipes.json`
- 搭配规则：`data/cn/pairing-rules-base.json` + 扩充批次
- 扩充食材 bulk：`data/cn/foods-{official,extra,regional,search}-*.json` → `generated/foods-expanded-bulk.js`
- 搭配页食材补充：`data/cn/foods-pairing-supplement.json`（原 pairing-aliases）
- 食药同源目录：`data/cn/food-medicine-catalog.json`
