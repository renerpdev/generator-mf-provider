# generator-mf-provider

> A Yeoman generator for creating React Microfrontend Provider projects with Module Federation, Rsbuild, and TypeScript

[![npm version](https://img.shields.io/npm/v/generator-mf-provider.svg)](https://www.npmjs.com/package/generator-mf-provider)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Generated Project Structure](#generated-project-structure)
- [Configuration](#configuration)
- [Module Federation](#module-federation)
- [Scripts](#scripts)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

`generator-mf-provider` is a Yeoman generator that scaffolds a complete React microfrontend provider application. It sets up a modern development environment with:

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Rsbuild** - Fast, Rust-based build tool
- **Module Federation** - Microfrontend architecture support
- **pnpm** - Fast, disk space efficient package manager

This generator is designed to quickly bootstrap microfrontend providers that can be consumed by a host application (shell) in a microfrontend architecture.

## ✨ Features

- 🚀 **Quick Setup** - Generate a complete microfrontend provider in seconds
- 📦 **Module Federation Ready** - Pre-configured with Module Federation plugin
- 🔧 **TypeScript Support** - Full TypeScript configuration out of the box
- ⚡ **Rsbuild Integration** - Fast builds with Rsbuild
- 🎨 **React 19** - Latest React features and improvements
- 🔌 **Hot Module Replacement** - Fast development experience
- 📝 **Type Safety** - TypeScript paths configured for Module Federation types
- 🎯 **Best Practices** - Follows microfrontend architecture best practices

## 📦 Prerequisites

Before using this generator, ensure you have the following installed:

- **Node.js** (v20 or higher recommended)
- **pnpm** (v8 or higher) - Install with `npm install -g pnpm`
- **Yeoman** - Install with `npm install -g yo`

## 🚀 Installation

Install the generator globally using npm or pnpm:

```bash
npm install -g generator-mf-provider
```

or

```bash
pnpm add -g generator-mf-provider
```

## 💻 Usage

### Basic Usage

Run the generator in your desired directory:

```bash
yo mf-provider
```

The generator will prompt you for:

1. **Microfrontend name**
   - Default: `mf-example`
   - This will be used as the project folder name and Module Federation name
   - Special characters will be sanitized to underscores

2. **Port to run the app**
   - Default: `3001`
   - This will be configured in the Rsbuild dev server

### Example

```bash
$ yo mf-provider

? Microfrontend name: my-provider
? Port to run the app: 3002

   create my-provider/package.json
   create my-provider/tsconfig.json
   create my-provider/rsbuild.config.ts
   create my-provider/module-federation.config.ts
   create my-provider/src/App.tsx
   create my-provider/src/bootstrap.tsx
   create my-provider/src/index.tsx
   create my-provider/src/App.css
   create my-provider/src/env.d.ts
   create my-provider/public/favicon.png
   create my-provider/README.md

   Running pnpm install...
```

After generation, navigate to the created directory and start development:

```bash
cd my-provider
pnpm dev
```

## 📁 Generated Project Structure

The generator creates the following project structure:

```
my-provider/
├── src/
│   ├── App.tsx          # Main React component
│   ├── App.css          # Component styles
│   ├── bootstrap.tsx    # Bootstrap file for Module Federation
│   ├── index.tsx        # Entry point
│   └── env.d.ts         # TypeScript environment declarations
├── public/
│   └── favicon.png      # Favicon
├── .gitignore           # Git ignore rules
├── .nvmrc               # Node version specification
├── module-federation.config.ts  # Module Federation configuration
├── package.json         # Project dependencies and scripts
├── pnpm-lock.yaml       # pnpm lock file
├── README.md            # Generated project README
├── rsbuild.config.ts    # Rsbuild configuration
└── tsconfig.json        # TypeScript configuration
```

## ⚙️ Configuration

### Module Federation Configuration

The generator creates a `module-federation.config.ts` file with the following default configuration:

```typescript
import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: '<appName>',
  exposes: {
    '.': './src/App.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router': { singleton: true },
  },
});
```

**Key Configuration Points:**

- **name**: Uses the sanitized app name you provided
- **exposes**: Exposes the main App component as the default export (`.`)
- **shared**: Shares React, React DOM, and React Router as singletons to avoid version conflicts

### Rsbuild Configuration

The `rsbuild.config.ts` file includes:

- React plugin configuration
- Module Federation plugin integration
- Development server port configuration
- Asset prefix set to `auto` for proper Module Federation asset loading

### TypeScript Configuration

The `tsconfig.json` includes:

- Modern ES2020 target and lib settings
- React JSX support
- Strict type checking enabled
- Path mapping for Module Federation types (`@mf-types/*`)
- Module resolution optimized for bundlers

## 🔗 Module Federation

### Exposed Modules

By default, the generator exposes:

- **`.`** → `./src/App.tsx` - The main React application component

### Shared Dependencies

The following dependencies are shared as singletons:

- `react` - React library
- `react-dom` - React DOM library
- `react-router` - React Router (if used)

This ensures that all microfrontends in your architecture use the same versions of these critical dependencies, preventing version conflicts and reducing bundle size.

### Consuming This Provider

To consume this provider in a host application (shell), add it to your Module Federation remotes configuration:

```typescript
remotes: {
  'my-provider': 'my-provider@http://localhost:3001/remoteEntry.js',
}
```

Then import it in your host application:

```typescript
const MyProvider = React.lazy(() => import('my-provider'));
```

## 📜 Scripts

The generated project includes the following npm/pnpm scripts:

| Command        | Description                                              |
| -------------- | -------------------------------------------------------- |
| `pnpm dev`     | Start the development server with hot module replacement |
| `pnpm build`   | Build the application for production                     |
| `pnpm preview` | Preview the production build locally                     |

## 🛠️ Development

### Local Development

To develop or modify this generator:

1. Clone the repository:

```bash
git clone https://github.com/renerpdev/generator-mf-provider.git
cd generator-mf-provider
```

2. Install dependencies:

```bash
pnpm install
```

3. Link the generator locally:

```bash
npm link
```

4. Test the generator:

```bash
yo mf-provider
```

### Generator Structure

```
generator-mf-provider/
├── generators/
│   └── app/
│       ├── index.js              # Generator logic
│       └── templates/            # Template files
│           ├── package.json.ejs
│           ├── tsconfig.json.ejs
│           ├── rsbuild.config.ts.ejs
│           ├── module-federation.config.ts.ejs
│           └── src/
│               └── ...
├── package.json
└── README.md
```

### Template Variables

The generator uses the following template variables:

- `<%= appName %>` - Sanitized application name
- `<%= port %>` - Development server port

## 📝 Changelog Management

This project uses [Keep a Changelog](https://keepachangelog.com/) format and automatically generates changelog entries from conventional commits.

### How It Works

- **Automatic Generation**: The changelog is automatically generated from your conventional commits (feat, fix, break, etc.) during the release process
- **Manual Editing**: You can manually add entries to the `[Unreleased]` section in `CHANGELOG.md` for changes that don't have commits yet
- **Release Integration**: When a release is created (manually or automatically), the changelog is updated and included in the GitHub release notes

### Available Scripts

```bash
# Generate changelog entries since the last tag
pnpm run changelog

# Generate complete changelog from all commits
pnpm run changelog:all
```

### Workflow

1. **During Development**: Add entries to `[Unreleased]` section if needed, or let conventional commits handle it automatically
2. **On Release**:
   - Manual dispatch: Select version bump type (major/minor/patch), changelog is generated automatically
   - Automatic: When `package.json` version is bumped, changelog is generated and release is created
3. **Changelog Format**: Entries are organized by type (Added, Changed, Deprecated, Removed, Fixed, Security)

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

- `feat:` - New features (minor version bump)
- `fix:` - Bug fixes (patch version bump)
- `break:` or `BREAKING CHANGE:` - Breaking changes (major version bump)
- `chore:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:` - Other changes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Yeoman](https://yeoman.io/)
- Uses [Rsbuild](https://rsbuild.dev/) for fast builds
- Powered by [Module Federation](https://module-federation.github.io/)
- React microfrontend architecture patterns

## 📞 Support

If you encounter any issues or have questions:

- Open an issue on [GitHub](https://github.com/renerpdev/generator-mf-provider/issues)
- Check the [documentation](https://github.com/renerpdev/generator-mf-provider#readme)

---

**Happy coding! 🚀**
