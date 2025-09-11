# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with React, TypeScript, and Vite. The main project files are located in the `personal-website/` directory. It uses Mantine UI library for components and includes 3D graphics with Three.js/React Three Fiber.

## Development Commands

All commands should be run from the `personal-website/` directory:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Linting (ESLint + Stylelint)
npm run lint

# Code formatting
npm run prettier        # check formatting
npm run prettier:write  # fix formatting

# Testing
npm run vitest         # run tests once
npm run vitest:watch   # run tests in watch mode

# Full test suite (type check + formatting + linting + tests + build)
npm run test

# Storybook
npm run storybook       # dev server on port 6006
npm run storybook:build # build storybook
```

## Architecture

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with React plugin and TypeScript paths
- **UI Library**: Mantine v7 with dark theme as default
- **Routing**: React Router v7 with browser router
- **3D Graphics**: Three.js with React Three Fiber
- **Testing**: Vitest with React Testing Library and jsdom
- **Linting**: ESLint with Mantine config, Stylelint for CSS
- **Package Manager**: Yarn v4

## Project Structure

```
src/
├── components/         # Reusable React components
│   ├── Header/
│   ├── Intro/
│   ├── Projects/
│   └── ...
├── pages/             # Route components
│   ├── Home.page.tsx
│   ├── Valentines.page.tsx
│   └── WorkingOnIt.page.tsx
├── App.tsx            # Main app with Mantine provider
├── Router.tsx         # Route configuration
├── theme.ts           # Mantine theme customization
└── main.tsx           # App entry point

test-utils/            # Custom testing utilities
public/assets/         # Static images and assets
```

## Key Features

- Personal portfolio with projects showcase
- Valentine's Day themed page with interactive content
- 3D graphics and animations using Three.js
- Responsive design with Mantine components
- Dark theme by default with color scheme toggle
- Pokemon pack opening simulation component

## Testing Setup

- Vitest configured with jsdom environment
- React Testing Library for component testing
- Custom test utilities in `test-utils/`
- Setup file: `vitest.setup.mjs`