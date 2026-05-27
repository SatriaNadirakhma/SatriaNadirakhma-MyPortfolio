# Portfolio — Satria Rakhmadani

Personal portfolio website for **Satria Rakhmadani (Nadi Rakhma)**, a Visual Designer & Front-End Developer based in Malang, Indonesia.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React + React Icons
- **Smooth Scroll:** react-scroll
- **Linting:** ESLint 9 (flat config)
- **Formatting:** Prettier

## Project Structure

```
src/
├── assets/          # Static assets (images, PDFs, fonts)
├── components/      # Shared/reusable UI components
├── constants/       # App-wide constants and configuration
├── data/            # Static data (projects, experiences, skills)
├── hooks/           # Custom React hooks
├── sections/        # Page sections (Hero, About, Projects, etc.)
├── utils/           # Utility functions
├── App.jsx          # Root application component
├── main.jsx         # Application entry point
└── index.css        # Global styles and Tailwind imports
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

App runs at `http://localhost:5173`.

### Build

```bash
npm run build
npm run preview   # Preview production build locally
```

### Linting & Formatting

```bash
npm run lint          # Check for lint errors
npm run lint:fix      # Auto-fix lint errors
npm run format        # Format code with Prettier
npm run format:check  # Check formatting
```

### Clean

```bash
npm run clean   # Remove dist directory
```

## Path Aliases

The project uses path aliases configured in `jsconfig.json` and `vite.config.js`:

| Alias         | Directory        |
|---------------|------------------|
| `@/`          | `./src/`         |
| `@components/`| `./src/components/`|
| `@sections/`  | `./src/sections/`|
| `@data/`      | `./src/data/`    |
| `@hooks/`     | `./src/hooks/`   |
| `@utils/`     | `./src/utils/`   |
| `@constants/` | `./src/constants/`|
| `@assets/`    | `./src/assets/`  |

## Environment Variables

Copy `.env.example` to `.env` and configure as needed:

```bash
cp .env.example .env
```

## License

All rights reserved.
