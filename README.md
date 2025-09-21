# GitCub

A simple GitHub clone built with React + TypeScript.

## Tech Stack

- React 19
- React Router
- Vite
- TypeScript
- Sass
- ESLint + Prettier
- Husky

## Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun dev

# Build the project
bun build

# Preview the production build
bun preview
```

## Committing

This project uses husky + lint-staged. On each commit, code is automatically checked and formatted:

- ESLint fixes issues in .js/.ts/.tsx/.jsx files
- Prettier formats everything else

```
git add .
git commit -m "your message"
```
