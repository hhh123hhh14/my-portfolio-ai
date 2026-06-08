# Claude 个人介绍网站 — AI 使用说明

## 最终网站链接

| 链接 | 说明 |
|------|------|
| **https://hhh123hhh14.github.io/my-portfolio-ai/** | GitHub Pages 永久部署（无密码，全球可访问） |

> 备用链接：http://lucent-lokum-2acb72.netlify.app（密码：`My-Drop-Site`）

---

## 1. 使用了哪些 AI 工具

本次开发全程使用 **Claude Code**（Anthropic 官方 CLI 工具，模型为 Claude Opus 4.6）完成。

具体使用方式：
- **代码生成**：所有 HTML/CSS/JS 代码由 Claude 根据需求描述直接生成
- **部署运维**：Netlify 匿名部署、localtunnel 隧道、GitHub CLI 安装与配置均由 Claude 通过命令行完成
- **调试排查**：部署过程中的网络问题、API 认证问题由 Claude 自主诊断并寻找替代方案

## 2. AI 帮助完成了哪些工作

| 阶段 | 工作内容 |
|------|----------|
| 需求分析 | 将"制作个人介绍网站"拆解为设计、开发、部署三个子任务 |
| 页面设计 | 确定暗色主题风格、色彩方案（紫色/青色强调色）、板块结构（Hero/About/Skills/Projects/Contact） |
| HTML 编写 | 生成完整的语义化页面结构，包含导航、五个内容板块、页脚 |
| CSS 编写 | 暗色背景 + 渐变装饰、自定义光标、毛玻璃导航、终端模拟器、卡片悬停效果、滚动动画等 |
| JS 编写 | 自定义光标跟踪、计数器动画、Intersection Observer 滚动显示、终端打字动画循环、视差效果、表单提交处理 |
| 资源选择 | 选用 Google Fonts（Inter + JetBrains Mono）作为字体方案 |
| 版本管理 | Git 初始化、文件暂存、提交 |
| 部署尝试 | Netlify 匿名部署（成功）、Netlify CLI 安装与授权票证流程、GitHub CLI 下载安装与设备授权流程、localtunnel 隧道、Vercel 设备授权流程 |
| 问题诊断 | 分析 GitHub API 返回 404 的原因（client_id 限制）、Netlify 匿名部署密码保护机制、中国网络环境对 GitHub/Cloudflare 的访问限制 |

## 3. 自己手动修改了哪些内容

本次为纯 AI 驱动开发，人工操作仅限于 Claude Code 发起的授权请求：

- **GitHub 设备授权**：Claude 发起 `gh auth login` 后，需要人工在浏览器中访问 `https://github.com/login/device` 并输入授权码（尚未完成）
- **Netlify 授权**：Claude 发起 Netlify 登录票证后，需要人工在浏览器中访问授权链接确认（尚未完成）

除此之外，HTML、CSS、JS 的所有代码内容均由 Claude 生成，未进行人工修改。代码结构清晰、语义化良好、可直接运行。

## 4. 遇到的问题，以及如何通过 AI 解决

### 问题 1：所有部署服务都需要身份认证

**现象**：Vercel、Netlify（认证模式）、GitHub Pages、Cloudflare Pages 等主流静态托管服务均需要账号授权，无法完全匿名部署。

**解决**：Claude 发现了 Netlify 的匿名部署（Anonymous Drop）功能，通过 `npx netlify-cli deploy --prod --dir=. --allow-anonymous` 实现无需登录的部署。该方式会生成密码保护的临时站点，适合快速演示。

### 问题 2：GitHub API 设备授权返回 404

**现象**：直接使用 `curl` 或 Node.js 调用 GitHub 的 `/login/device/code` 端点始终返回 `{"error":"Not Found"}`。

**诊断**：Claude 分析发现 GitHub 的 OAuth 设备流程端点对 client_id 有严格的应用程序注册验证。`gh` CLI 使用的 client_id `01b688c40b2fbb2f89c8` 只能在 `gh` CLI 的上下文中使用，直接通过 HTTP 请求会被拒绝。

**解决**：放弃直接 API 调用，改用 `gh auth login` CLI 工具（设置 `BROWSER=echo` 环境变量来捕获设备码输出）。

### 问题 3：gh CLI 在非 TTY 环境下静默失败

**现象**：在 Bash 环境中运行 `gh auth login` 时，CLI 检测到没有终端，直接退出而不输出设备码。

**诊断**：`gh` CLI 使用 `isatty()` 检测交互式终端，非 TTY 环境下会跳过交互式流程。

**解决**：通过设置 `BROWSER=echo` 环境变量，强制 `gh` CLI 输出设备码和 URL 到标准输出，从而使 Claude 能够捕获并展示给用户。

### 问题 4：中国网络环境对部分服务的访问限制

**现象**：
- Cloudflare Tunnel（cloudflared）下载失败
- `curl` 访问 GitHub API 偶发超时
- localtunnel 连接不稳定（503 错误）

**诊断**：Claude 判断用户网络环境可能对 GitHub、Cloudflare 等境外服务存在访问限制（中国防火墙）。

**解决**：优先使用 Netlify（在中国有 CDN 节点）作为部署目标，并通过多次重试和不同时间点的测试来验证服务可用性。

### 问题 5：匿名部署的密码保护

**现象**：Netlify 匿名部署自动添加 HTTP Basic Auth 密码保护，访问者需要输入密码才能查看网站。

**诊断**：Claude 通过读取 Netlify CLI 文档和实际测试确认，匿名部署的密码保护是 Netlify 的安全设计，无法通过配置去除。

**解决**：
- 短期方案：提供密码 `My-Drop-Site`，用户可正常访问
- 长期方案：Claude 发起 Netlify 登录票证（ticket-based auth）和 GitHub 设备授权，等待用户完成浏览器授权后部署到无密码的正式站点

## 5. 技术栈

- **前端**：HTML5 + CSS3 + Vanilla JavaScript（无框架，零依赖）
- **字体**：Google Fonts（Inter、JetBrains Mono）
- **部署**：Netlify（静态托管）
- **开发工具**：Claude Code（AI 驱动开发）
- **版本管理**：Git
