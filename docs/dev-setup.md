# Developer Setup Guide

This guide will help you set up your development environment for the Directorium project on macOS.

## Prerequisites

### 1. macOS Homebrew

Homebrew is the package manager for macOS that will help us install the necessary development tools.

#### Installation

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After installation, add Homebrew to your PATH (if not automatically added):

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

#### Verify Installation

```bash
brew --version
```

### 2. Volta (Node.js Version Manager)

Volta is a hassle-free JavaScript tool manager that ensures you're using the right Node.js version for this project.

#### Installation

```bash
brew install volta
```

#### Setup

After installation, add Volta to your shell profile:

```bash
echo 'export VOLTA_HOME="$HOME/.volta"' >> ~/.zprofile
echo 'export PATH="$VOLTA_HOME/bin:$PATH"' >> ~/.zprofile
source ~/.zprofile
```

#### Install Node.js

```bash
volta install node@20
volta install npm
```

#### Verify Installation

```bash
volta --version
node --version
npm --version
```

### 3. pnpm Package Manager

pnpm is a fast, disk space efficient package manager that we use for this monorepo.

#### Installation

```bash
brew install pnpm
```

#### Alternative Installation (via npm)

```bash
npm install -g pnpm
```

#### Verify Installation

```bash
pnpm --version
```

## Development Tools

### VS Code

#### Installation

```bash
brew install --cask visual-studio-code
```

#### Required Extensions

Install these extensions for the best development experience:

##### Core Extensions

- **ESLint** (`dbaeumer.vscode-eslint`) - JavaScript/TypeScript linting
- **Prettier - Code formatter** (`esbenp.prettier-vscode`) - Code formatting
- **TypeScript Importer** (`pmneo.tsimporter`) - Auto import TypeScript modules

##### React/Next.js Extensions

- **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`) - React code snippets
- **Auto Rename Tag** (`formulahendry.auto-rename-tag`) - Automatically rename paired HTML/JSX tags
- **Bracket Pair Colorizer 2** (`coenraads.bracket-pair-colorizer-2`) - Colorize matching brackets

##### Git & Version Control

- **GitLens** (`eamodio.gitlens`) - Supercharge Git in VS Code
- **Git Graph** (`mhutchie.git-graph`) - View Git graph of repository

##### Workspace & Productivity

- **Turbo Console Log** (`chakrounanas.turbo-console-log`) - Automate console.log operations
- **Thunder Client** (`rangav.vscode-thunder-client`) - API testing (alternative to Postman)
- **Path Intellisense** (`christian-kohler.path-intellisense`) - Autocomplete filenames

##### Styling & CSS

- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) - Tailwind CSS class suggestions
- **CSS Peek** (`pranaygp.vscode-css-peek`) - Peek and go to CSS definitions

##### Optional but Recommended

- **Todo Tree** (`gruntfuggly.todo-tree`) - Show TODO, FIXME comments in tree view
- **Error Lens** (`usernamehw.errorlens`) - Improve highlighting of errors/warnings
- **Indent Rainbow** (`oderwat.indent-rainbow`) - Colorize indentation levels
- **Material Icon Theme** (`pkief.material-icon-theme`) - File icons

#### Quick Extension Installation

You can install all extensions at once using the VS Code command line:

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension pmneo.tsimporter
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension formulahendry.auto-rename-tag
code --install-extension coenraads.bracket-pair-colorizer-2
code --install-extension eamodio.gitlens
code --install-extension mhutchie.git-graph
code --install-extension chakrounanas.turbo-console-log
code --install-extension rangav.vscode-thunder-client
code --install-extension christian-kohler.path-intellisense
code --install-extension bradlc.vscode-tailwindcss
code --install-extension pranaygp.vscode-css-peek
code --install-extension gruntfuggly.todo-tree
code --install-extension usernamehw.errorlens
code --install-extension oderwat.indent-rainbow
code --install-extension pkief.material-icon-theme
```

## Project Setup

### 1. Clone the Repository

```bash
git clone [repository-url]
cd directorium
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Development Scripts

```bash
# Start all apps in development mode
pnpm dev

# Build all apps
pnpm build

# Run linting
pnpm lint

# Format code
pnpm format

# Type checking
pnpm type-check
```

## VS Code Workspace Settings

Create a `.vscode/settings.json` file in the project root with these recommended settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "eslint.workingDirectories": ["apps/web", "apps/cms"],
  "files.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true
  }
}
```

## Troubleshooting

### Node.js Version Issues

If you encounter Node.js version conflicts:

```bash
volta pin node@20
```

### pnpm Permission Issues

If you encounter permission issues with pnpm:

```bash
sudo chown -R $(whoami) ~/.pnpm
```

### VS Code Extension Issues

If extensions aren't working properly:

1. Reload VS Code window: `Cmd+Shift+P` → "Developer: Reload Window"
2. Check extension host: `Cmd+Shift+P` → "Developer: Show Running Extensions"

## Next Steps

After completing this setup:

1. Open the project in VS Code: `code .`
2. Install dependencies: `pnpm install`
3. Start development: `pnpm dev`
4. Open your browser to the development URLs shown in the terminal

You're now ready to start developing! 🚀
