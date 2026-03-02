# GitHub Copilot Instructions

## Project Overview

### React Components

Use functional components with PropTypes:

```typescript
import React from 'react';

export interface MyProps {
  propA: any,
  ...
}

export const MyComponent: React.FC<MyProps> = ({ prop }) => {
  return <div>{prop}</div>;
};
```

### Service Pattern
Use `getService()` for singleton services (legacy DI pattern):
```javascript
import { getService } from './getService';
const apiService = getService('ApiService');
```
## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
npm run start
```

## Best Practices

### When Creating Components
1. Prefer TypeScript (`.ts`, `.tsx`) over JavaScript
2. Follow BEVM naming for CSS classes
3. Include `.spec.js` files for test coverage
