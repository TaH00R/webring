# IIITG Index

A minimal directory of student portfolios and GitHub profiles from IIIT Guwahati.

google forms link - https://forms.gle/zp9j25Vc8pjD7zua9
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

https://iiitg-index.vercel.app/

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

If u don't have a portfolio, you can leave the field empty.
The default link would be to the GitHub profile.

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
