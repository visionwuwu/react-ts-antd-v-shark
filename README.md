# 欢迎使用V-Shark UI组件库

v-shark 是基于react + react hooks + TypeScript, 高仿antd的一个UI组件库。

## ✨特性

- 🌈 提炼自企业级中后台产品的交互语言和视觉风格。
- 📦 开箱即用的高质量 React 组件。
- 🧡 使用 TypeScript 开发，提供完整的类型定义文件。
- ⛑️ 使用 react-testing-library 完成单元测试
- 📚 使用 storybook 本地调试和生成文档页面
- 🎨 使用第三方库扩充组件-(react-fontawesome, react-transition-group)
- 🌹 样式（Sass）文件从零开始，掌握大型应用的 CSS 组织方法
- 🎉 涉及全部流程，包括最后的 npm publish，husky提交发布前验证，travis CI/CD 集成，发布文档站点等


### 版本

- 稳定版：<a href="https://www.npmjs.com/package/v-shark">npm v0.1.0</a>

<div className="subheading">安装</div>

#### 使用 npm 安装
``` sh
  npm install v-shark -S
```
#### 使用 yarn 安装
``` sh
  yarn add v-shark -S
```

#### 使用示例
``` tsx
// 引入样式
import "v-shark/dist/index.css"
// 引入组件
import { Button } from "v-shark"

ReactDOM.render(<Button btnType="primary">按钮</Button>, mountNode)
```

<div className="subheading">如何贡献</div>

1. Github：通过在Github上提交[Pull Request](https://github.com/visionwuwu/react-ts-antd-v-shark/pulls) 向我提出建议与BUG。
2. Email: 2021664244@qq.com 联系我。
3. 个人博客：[橙晨燕](http://visionwuwu.gitee.io/blog-ccy-gitee/)

### 未来计划
> 未来需要完成的组件如下

- 👊Alert 警告提示。用于展示需要关注的信息。支持，不同样式，添加描述，可关闭。
- 👊Tabs 选项卡切换组件。提供平级的区域将大块内容进行收纳和展现，保持界面整洁。选项卡样式，卡片式页签，带图标页签。
- 👊Select 下拉选择器。弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。支持多选，禁用选择。
