# Little Lemon - Table Booking

A React web app for reserving a table at the Little Lemon restaurant. Built as the Front-End Capstone project (Coursera / Meta).

## Features

- **Booking form** – Date, time, number of guests, occasion, name, email, optional phone and special requests
- **Validation** – Required fields, email format, phone format, date (today or future), guests (1–10)
- **Accessibility** – Semantic HTML, ARIA attributes, labels, skip link, focus management, error announcements
- **Responsive layout** – Works on mobile and desktop
- **Unit tests** – Validation and form behaviour covered with Vitest and React Testing Library

## Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/EhsanGhafoori/little-lemon-booking.git
   cd little-lemon-booking
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start dev server (Vite)        |
| `npm run build`| Production build               |
| `npm run preview` | Preview production build    |
| `npm run test` | Run tests in watch mode        |
| `npm run test:run` | Run tests once             |

## Project structure

```
little-lemon-booking/
├── public/
├── src/
│   ├── components/     # Header, Footer, BookingForm
│   ├── utils/          # validation helpers
│   ├── test/           # test setup
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Validation rules

- **Date**: Required; must be today or a future date.
- **Time**: Required; valid time format.
- **Guests**: Required; between 1 and 10.
- **Occasion**: Required; must select an option.
- **Name**: Required; non-empty.
- **Email**: Required; valid email format.
- **Phone**: Optional; if provided, at least 10 digits.
- **Special requests**: Optional.

## License

MIT
