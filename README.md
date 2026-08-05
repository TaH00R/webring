# IIITG Index

A minimal directory of student portfolios and GitHub profiles from IIIT Guwahati.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8)

---

## Features

- Live search
- Year-wise filtering
- Automatic GitHub avatars
- Portfolio with GitHub fallback
- Responsive layout
- Minimal dark UI

---

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Lucide React
- React Icons

---

## Running Locally

Clone the repository.

```bash
git clone https://github.com/<your-username>/iiitg-index.git
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Open http://localhost:3000

---

## Project Structure

```text
src/
├── app/
├── components/
├── data/
│   └── members.json
├── types/
└── lib/
```

---

## Adding Yourself

Open

```text
src/data/members.json
```

Add your information.

```json
{
  "name": "John Doe",
  "year": 2025,
  "github": "johndoe",
  "portfolio": "https://john.dev"
}
```

The GitHub avatar is fetched automatically.

Create a Pull Request once you're done.

---

## Contributing

1. Fork this repository.
2. Create a new branch.

```bash
git checkout -b add-my-profile
```

3. Add yourself to `src/data/members.json`.
4. Commit your changes.

```bash
git commit -m "feat: add John Doe"
```

5. Push your branch.

```bash
git push origin add-my-profile
```

6. Open a Pull Request.

---
