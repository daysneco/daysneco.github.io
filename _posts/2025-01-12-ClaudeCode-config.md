---
title: Claude Code配置教程
categories: AI
---

# Claude Code配置教程

## 前置要求

在配置 Claude Code 之前，请确保您的系统已安装以下工具：

- **Node.js** - JavaScript 运行环境
- **npm** - Node.js 包管理器（随 Node.js 一起安装）
- **git** - 版本控制系统

## 步骤 1：安装前置工具

### 安装 Node.js 和 npm

#### Windows 系统

**方法一：使用官方安装包（推荐）**

1. 访问 Node.js 官网：https://nodejs.org/
2. 下载 LTS 版本（长期支持版）
3. 运行安装程序，按提示完成安装
4. 安装完成后，打开新的命令行窗口验证：

```bash
node --version
npm --version
```

**方法二：使用包管理器**

如果您使用 Chocolatey：

```bash
choco install nodejs-lts
```

如果您使用 Scoop：

```bash
scoop install nodejs-lts
```

#### macOS 系统

**方法一：使用官方安装包**

1. 访问 Node.js 官网：https://nodejs.org/
2. 下载 .pkg 安装包
3. 运行安装程序，按提示完成安装
4. 验证安装：

```bash
node --version
npm --version
```

**方法二：使用 Homebrew（推荐）**

```bash
brew install node
```

#### Linux 系统

**Ubuntu/Debian：**

```bash
# 使用 NodeSource 仓库安装最新 LTS 版本
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

**CentOS/RHEL：**

```bash
# 使用 NodeSource 仓库
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs

# 验证安装
node --version
npm --version
```

**Arch Linux：**

```bash
sudo pacman -S nodejs npm
```

---

### 安装 Git

#### Windows 系统

**方法一：使用官方安装包（推荐）**

1. 访问 Git 官网：https://git-scm.com/downloads
2. 下载 Windows 版本安装包
3. 运行安装程序，推荐设置：
   - 默认编辑器选择您习惯的（如 VS Code）
   - PATH 环境配置选择 "Git from the command line and also from 3rd-party software"
   - 行尾转换选择默认选项
   - 终端模拟器选择默认 MinTTY
4. 完成安装后验证：

```bash
git --version
```

**方法二：使用包管理器**

Chocolatey：

```bash
choco install git
```

Scoop：

```bash
scoop install git
```

#### macOS 系统

**方法一：使用 Homebrew（推荐）**

```bash
brew install git
```

**方法二：安装 Xcode Command Line Tools**

Git 随 Xcode Command Line Tools 一起安装：

```bash
xcode-select --install
```

#### Linux 系统

**Ubuntu/Debian：**

```bash
sudo apt update
sudo apt install git

# 验证安装
git --version
```

**CentOS/RHEL：**

```bash
sudo yum install git

# 验证安装
git --version
```

**Arch Linux：**

```bash
sudo pacman -S git
```

---

### 验证所有工具安装

打开终端或命令行，运行以下命令确认所有工具已正确安装：

```bash
node --version
npm --version
git --version
```

如果都能显示版本号，说明环境准备完成！

## 步骤 2：申请 API 密钥

访问 Claude Code 兼容的 API 服务提供商控制台申请密钥，这里用的openrouter上申请的免费ai，也可以使用其他的比如智谱等。

```
https://openrouter.ai/
```

注册/登录后，获取您的 API 密钥并妥善保管。

## 步骤 3：安装 Claude Code

使用 npm 全局安装 Claude Code：

```bash
npm install -g @anthropic-ai/claude-code
```

## 步骤 4：配置设置文件

### Windows 系统

设置环境变量，按 Win + R，输入cmd，然后弹出对话框中输入配置信息。
```
set ANTHROPIC_AUTH_TOKEN="your-api-key"
```

PS：这步第一次启动前一定要输入，之后就不需要了，猜测是第一次启动的时候不去加载setting.json导致的

在用户目录下创建配置文件：

```
%USERPROFILE%\.claude\settings.json
```

### macOS/Linux 系统

在终端中设置环境变量：

```bash
export ANTHROPIC_AUTH_TOKEN="your-api-key"
```

**为了使环境变量永久生效，可以将上述命令添加到 shell 配置文件中：**

- **macOS (zsh)**: 添加到 `~/.zshrc`
- **macOS (bash)**: 添加到 `~/.bash_profile`
- **Linux (bash)**: 添加到 `~/.bashrc`
- **Linux (zsh)**: 添加到 `~/.zshrc`

添加后运行以下命令使配置生效：

```bash
source ~/.zshrc  # 如果使用 zsh
# 或
source ~/.bashrc  # 如果使用 bash
```

在用户目录下创建配置文件：

```bash
~/.claude/settings.json
```

### 配置示例

#### 基础配置（环境变量方式）

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your-api-key",
    "ANTHROPIC_BASE_URL": "https://openrouter.ai/api",
    "API_TIMEOUT_MS": "3000000",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "z-ai/glm-4.5-air:free",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "z-ai/glm-4.5-air:free",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "z-ai/glm-4.5-air:free"
  }
}
```

**配置说明：**

- `ANTHROPIC_AUTH_TOKEN`: 替换为您的 API 密钥
- `ANTHROPIC_BASE_URL`: API 基础地址
- `API_TIMEOUT_MS`: 请求超时时间（毫秒）
- `ANTHROPIC_DEFAULT_HAIKU_MODEL`: 默认 Haiku 模型
- `ANTHROPIC_DEFAULT_SONNET_MODEL`: 默认 Sonnet 模型
- `ANTHROPIC_DEFAULT_OPUS_MODEL`: 默认 Opus 模型

## 步骤 5：验证配置

### 验证安装

首先验证 Claude Code 是否安装成功：

```bash
claude --version
```

如果显示版本号，说明安装成功。

### 验证配置文件

检查配置文件是否正确加载：

```bash
claude config show
```

这将显示当前生效的配置信息。

### 测试 Claude Code 功能

创建一个测试目录并进入：

```bash
mkdir test-claude
cd test-claude
```

启动 Claude Code 交互模式：

```bash
claude
```

在交互界面中输入简单的测试命令，例如：

```
你好，请帮我创建一个简单的 hello.py 文件
```

如果 Claude Code 能够正常响应并创建文件，说明配置成功。

退出 Claude Code：

```
exit
```

### 快速功能测试

也可以使用单命令模式测试：

```bash
claude "请帮我列出当前目录的文件"
```

## 常见问题

### 1. 配置文件位置

- **Windows**: `%USERPROFILE%\.claude\settings.json`
- **macOS/Linux**: `~/.claude/settings.json`

### 2. 模型选择

根据不同需求选择合适的模型：

- **Haiku 系列**: 快速响应，适合简单任务
- **Sonnet 系列**: 平衡性能，适合日常开发
- **Opus 系列**: 强大能力，适合复杂任务

### 3. 超时设置

如果遇到请求超时，可适当增加 `API_TIMEOUT_MS` 值（单位：毫秒）

## 注意事项

- 请勿将 API 密钥提交到版本控制系统
- 定期更新 API 密钥以保证安全性
- 根据实际使用情况选择合适的模型配置
