# Web Calculator

React interface for a small [Flask arithmetic API](https://github.com/daleloncosky/calculator-backend). The project demonstrates controlled form inputs, HTTP requests, loading state, and error recovery across a frontend and backend.

## Run locally

Use Node.js 22.12 or newer; `.nvmrc` selects Node 24.

```sh
npm ci
cp .env.example .env
npm start
```

Open `http://localhost:3000` and start the backend on port 5001. `VITE_API_BASE_URL` selects the API and is embedded at build time. Without an override, development uses localhost and production retains the original `https://calculator2.hypsster.com` API address. That historical deployment's availability has not been verified.

## Features

- Addition, subtraction, multiplication, division, modulo, and integer powers.
- Decimal inputs, explicit service errors, and a visible pending state.
- Accessible labels, keyboard form submission, and live result announcements.
- Previous results are cleared before another request, so a failed request cannot leave a stale answer visible.

The backend uses floating-point arithmetic, limits operands to a magnitude of 1e12, and accepts power exponents from -1000 to 1000. This is an arithmetic demo rather than an arbitrary-precision calculator.

## Tests and build

```sh
npm test
npm run build
npm audit
```

Tests exercise the rendered form and request utility, including decimal inputs, stale-result removal, invalid inputs, and malformed service responses. The API is mocked. Production assets go to `build/`, preserving the existing hosting output directory. `npm run preview` serves that output locally.

## Structure

`src/App.jsx` contains the form; `src/utils/handleCalculate.js` validates inputs and calls the API. Vite builds from `index.html`, and Vitest runs the tests. The project no longer depends on a missing pre-minified source file or a separate manual minification step.
