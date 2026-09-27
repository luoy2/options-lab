# options-lab

期权入门交互课，从零讲起，用真实的 TSLA 期权报价和价格路径。

在线访问：https://luoy2.github.io/options-lab/

| 页面 | 内容 |
|---|---|
| [路线图](https://luoy2.github.io/options-lab/) | 20 个学习节点的课程地图，带分叉与依赖 |
| [1.1 远期价格](https://luoy2.github.io/options-lab/station-1-1-forward-price.html) | 期权是什么、损益图、定价的中心点 |
| [1.2 波动率](https://luoy2.github.io/options-lab/station-1-2-volatility.html) | 分布有多宽；股价模型的假设；/16 口诀；正态 vs 对数正态 |
| [2.1 delta](https://luoy2.github.io/options-lab/station-2-1-delta.html) | 第一个希腊字母，四种读法 |

每个页面都是单文件 HTML，没有构建步骤；左侧课程目录由共用的 `course-nav.js` 生成。

这个仓库里的文件是生成出来的，不要在这里直接改：源文件在另一个私有仓，由 `scripts/build_public.py` 生成到这里。
