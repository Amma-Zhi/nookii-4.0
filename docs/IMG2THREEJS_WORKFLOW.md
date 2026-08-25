# img2threejs reconstruction notes

本项目参考 `img2threejs/img2threejs` 的 procedural reconstruction 思路：

1. 参考图先做结构观察与组件拆分。
2. 先 Blockout，确认整体 silhouette 与比例。
3. 再逐件替换为程序化 Three.js 模型。
4. 模型不是贴图平面；关键对象需要真实三维结构。
5. 缝纫机关键机械结构保持拆分，以便后续动画。
6. 每一轮优先修构图和 identity-defining silhouette，再增加微小细节。

## 当前 Phase 1 Quality Contract

必须保持：

- 开放空间，无墙、无房间盒子。
- 初始镜头完整看清全部场景。
- 中央工作桌/缝纫机为第一视觉中心。
- 左模块柜明显高于右矮柜。
- 灵感板为独立物件，不构成墙。
- 底板很薄，且四周有足够留白。
- 缝纫机无雕花。
- 白膜材质只帮助判断几何，暂不进入正式配色。
