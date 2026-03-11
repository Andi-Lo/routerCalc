# <img src="./public/routerCalcLogo.png" alt="RouterCalc Logo" width="32" height="32" align="center" /> RouterCalc

> A woodworking / CNC calculator for router guide bushing (copy ring) setups.

**Live app:** https://andi-lo.github.io/routerCalc/

---

## Overview

When routing with a guide bushing and a template, the bushing introduces an offset between the template edge and the actual cut. **RouterCalc** takes your bit diameter, bushing diameter, and desired cut size and instantly tells you the correct template hole size and the resulting offset — catching the common error of using a bit that is too large for a given bushing.

---

## Core Concept

Two values are derived from the inputs:

| Value | Formula |
|---|---|
| **Template hole size** | `targetCutSize + (bushingDiameter − bitDiameter)` |
| **Offset** | `(bushingDiameter − bitDiameter) / 2` |

All measurements are in **millimetres (mm)**. An error is shown when `bitDiameter ≥ bushingDiameter`, since the bit would protrude beyond the bushing.

---

## Getting Started

**Prerequisites:** Node.js ≥ 22 and npm ≥ 10.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the codebase |
