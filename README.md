## <img src="./public/routerCalcLogo.png" alt="RouterCalc Logo" width="48" height="48" align="center" /> RouterCalc

https://andi-lo.github.io/routerCalc/

**RouterCalc** is a woodworking/CNC tool calculator. It helps users calculate the correct **template hole size** and **offset** when using a router guide bushing (copy ring) together with a router bit.


### Core Concept

- **Template Hole Size** = `targetCutSize + (bushingDiameter - bitDiameter)`
- **Offset** = `(bushingDiameter - bitDiameter) / 2`

All measurements are in **millimetres (mm)**. An error state is shown when the bit diameter is greater than or equal to the bushing diameter.

---

### Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To build the project run:
```bash
npm run build
```
