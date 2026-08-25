# Nookii 4.0 — 3D Home

Nookii 4.0 全新前端的第一个独立 3D 首页实验场。

## 当前阶段

- React + Vite
- Three.js
- React Three Fiber (`@react-three/fiber`)
- Drei (`@react-three/drei`)
- Phase 1：白膜首页场景
- 暂不连接 V2 数据库
- 暂不接 API / CloudBase
- 不复用或修改旧版 Nookii 前端

## 已锁定场景

- 中央北欧工作桌
- 简洁无雕花缝纫机
- 左侧圆角模块开放柜（空柜）
- 右侧双抽爱心柜（柜顶为空）
- 后方偏右独立灵感板
- 桌前自然垂落布料
- 大面积、纸片般轻薄的椭圆场景基底
- 无凳子、无窗户、无墙体、无房间盒子

## 架构原则

3D 首页不是一次性原生 HTML/Three.js 页面，而是从一开始就处于 React 架构内，方便后续 Nookii 4.0 继续扩展普通 2D React 页面和其他 3D 场景。

参考白膜图只用于构图与比例对照，不在运行时作为背景贴图。
