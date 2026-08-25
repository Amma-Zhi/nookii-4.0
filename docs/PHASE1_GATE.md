# Phase 1 Gate

## Architecture / scope

- [x] 页面属于独立 React 工程
- [x] 使用 Three.js + React Three Fiber
- [x] 不连接数据库 / API
- [x] 没有窗户
- [x] 没有凳子
- [x] 没有建筑墙体
- [x] 中央桌子 + 无雕花缝纫机
- [x] 左模块开放柜为空
- [x] 右双抽爱心柜柜顶为空
- [x] 独立灵感板
- [x] 纸片般轻薄的宽椭圆基底
- [x] 正式材质尚未接入，当前保持 clay/white blockout

## Camera / interaction

- [x] HOME Camera preset 已建立
- [x] SEWING_MACHINE / LEFT_SHELF / RIGHT_CABINET / INSPIRATION_BOARD Camera preset 已建立
- [x] 点击缝纫机可进入平滑镜头目标
- [x] 点击基底可返回 HOME

## Build gate

- [x] GitHub Actions 可以安装依赖
- [x] `npm run build` PASS
- [x] 最新程序化缝纫机重建后再次 build PASS

## img2threejs reconstruction

- [x] 缝纫机 intake / component hierarchy 已记录
- [x] 缝纫机从 Box blockout 升级为 Shape + ExtrudeGeometry 连续 C 形机身
- [x] 飞轮、针杆、压脚、线轴、旋钮、线保持独立 animation-ready component
- [x] 用户要求的“无雕花”覆盖原参考图表面装饰

## Visual gate — 尚未通过

- [ ] 在实际浏览器/WebGL 中完整查看 HOME 构图
- [ ] 与锁定白膜正视图逐项对比比例、位置、留白
- [ ] 确认桌子 / 缝纫机 / 左柜 / 右柜 / 灵感板没有碰撞或穿模
- [ ] 确认初始 Camera 在 Desktop 下完整展示全场景
- [ ] 确认移动镜头时没有 clipping / 跳变

> **规则：Visual Gate 未人工确认前，不得宣布 Phase 1 完成，也不得开始正式粉白材质阶段。**
