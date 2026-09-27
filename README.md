# options-lab

期权入门交互课，从零讲起，用真实的 TSLA 期权报价和价格路径。

在线访问：https://luoy2.github.io/options-lab/

| 页面 | 内容 |
|---|---|
| [路线图](https://luoy2.github.io/options-lab/) | 20 个学习节点的课程地图，带分叉与依赖 |
| [1.1 远期价格](https://luoy2.github.io/options-lab/station-1-1-forward-price.html) | 期权是什么、损益图、定价的中心点 |
| [1.2 波动率](https://luoy2.github.io/options-lab/station-1-2-volatility.html) | 分布有多宽；股价模型的假设；/16 口诀；正态 vs 对数正态 |
| [2.1 delta](https://luoy2.github.io/options-lab/station-2-1-delta.html) | 第一个希腊字母，四种读法 |
| [2.2 gamma 与 theta](https://luoy2.github.io/options-lab/station-2-2-gamma-theta.html) | 时间换波动 |
| [2.3 vega 与 rho](https://luoy2.github.io/options-lab/station-2-3-vega-rho.html) | 波动率与利率的敏感度 |
| [2.4 组合希腊字母](https://luoy2.github.io/options-lab/station-2-4-portfolio-greeks.html) | 把多腿仓位压成四个数 |
| [4.1 动态对冲](https://luoy2.github.io/options-lab/station-4-1-dynamic-hedging.html) | 理论值是怎么被兑现的 |
| [3.1 价差家族](https://luoy2.github.io/options-lab/station-3-1-spreads.html) | 两条腿表达方向观点 |
| [4.2 gamma scalping](https://luoy2.github.io/options-lab/station-4-2-gamma-scalping.html) | 盈亏平衡波动率 |
| [3.2 波动率结构](https://luoy2.github.io/options-lab/station-3-2-vol-structures.html) | 教材里出现的全部组合 |
| [6 风险的动态演化](https://luoy2.github.io/options-lab/station-6-risk-dynamics.html) | 今天中性不等于明天中性 |
| [3.3 四象限与选择](https://luoy2.github.io/options-lab/station-3-3-four-quadrants.html) | 市场观点 → 该用哪一族 |
| [5.1 Synthetics](https://luoy2.github.io/options-lab/station-5-1-synthetics.html) | 合成关系与化简 |
| [5.2 parity 与 conversion](https://luoy2.github.io/options-lab/station-5-2-parity-conversion.html) | 把合成关系装上价格 |

每个页面都是单文件 HTML，没有构建步骤；左侧课程目录由共用的 `course-nav.js` 生成。

这个仓库里的文件是生成出来的，不要在这里直接改：源文件在另一个私有仓，由 `scripts/build_public.py` 生成到这里。
