# 🇦🇺 Australian Citizenship Practice Quiz

A free, open-source practice quiz app to help people prepare for the Australian Citizenship Test, built with React, TypeScript, and SCSS.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Built with React](https://img.shields.io/badge/Built%20with-React%2018-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)

---

## ⚠️ Important Disclaimer

> **This project is an independent, unofficial practice tool. It is NOT affiliated with, endorsed by, or associated with the Australian Government, the Department of Home Affairs, or any official body.**
>
> - This app is provided **for practice and educational purposes only**
> - Questions and answers are based on the publicly available resource _Australian Citizenship: Our Common Bond_, but **may not be complete, current, or accurate**
> - **Do NOT rely solely on this app to prepare for your official citizenship test**
> - The official resource is available free at [immi.homeaffairs.gov.au](https://immi.homeaffairs.gov.au/citizenship/test-and-interview/our-common-bond)
> - The author(s) accept **no responsibility or liability** for any outcome related to your citizenship test, application, or process
> - Always refer to the **official Australian Government materials** as your primary study resource

---

## 📖 About

This app covers all four testable parts of the _Our Common Bond_ resource:

| Part       | Topic                                                |
| ---------- | ---------------------------------------------------- |
| **Part 1** | Australia and its People                             |
| **Part 2** | Australia's Democratic Beliefs, Rights and Liberties |
| **Part 3** | Government and the Law in Australia                  |
| **Part 4** | Australian Values                                    |

### Features

- 80 multiple choice practice questions across all 4 parts
- Instant feedback — correct answers highlighted green ✅, incorrect in red ❌
- Full quiz mode (all 80 questions) or practice by individual part
- Questions randomly shuffled on every new quiz
- Progress bar and live score tracking
- Detailed results page with per-part breakdown
- Review of all incorrect answers with correct answers shown
- Session persistence — resume where you left off after closing the browser
- Keyboard navigation — press `A`/`B`/`C`/`D` to select, `Enter` to advance
- Fully responsive — works on mobile, tablet, and desktop
- No login required, no data collected, no ads

---

## 🚀 Live Demo

> [https://citizenship-quiz-sigma.vercel.app/](https://citizenship-quiz-sigma.vercel.app/)

---

## 🛠️ Tech Stack

| Technology                                                     | Purpose                  |
| -------------------------------------------------------------- | ------------------------ |
| [React 19](https://react.dev)                                  | UI framework             |
| [TypeScript 5](https://www.typescriptlang.org)                 | Type safety              |
| [Vite 5](https://vitejs.dev)                                   | Build tool & dev server  |
| [React Router Dom v7](https://reactrouter.com)                 | Client-side routing      |
| [SCSS / Sass](https://sass-lang.com)                           | Styling with CSS modules |
| [ESLint](https://eslint.org) + [Prettier](https://prettier.io) | Code quality             |

---

## 📁 Project Structure

```
src/
├── assets/                  # Static assets
├── components/
│   └── ui/                  # Reusable UI components
│       ├── Badge/
│       ├── OptionButton/
│       └── ProgressBar/
├── data/                    # Questions and parts data
│   ├── questions.ts         # All 80 questions
│   ├── parts.ts             # Part metadata
│   └── index.ts
├── features/
│   └── quiz/
│       ├── components/      # Quiz-specific components
│       │   └── QuizCard/
│       ├── hooks/           # State management
│       │   ├── QuizContext.tsx
│       │   ├── quizReducer.ts
│       │   ├── useKeyboard.ts
│       │   └── useQuizPersistence.ts
│       └── types/           # TypeScript interfaces
│           └── quiz.types.ts
├── layouts/
│   └── AppLayout/           # Page shell with header/footer
├── pages/
│   ├── HomePage/
│   ├── QuizPage/
│   ├── ResultsPage/
│   └── NotFoundPage/
├── router/                  # Route definitions
├── styles/                  # Global SCSS design system
│   ├── abstracts/           # Variables, mixins, breakpoints
│   ├── base/                # Reset, typography, animations
│   └── main.scss
└── utils/                   # Pure helper functions
    └── quiz.utils.ts
```

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Eshaqi/citizenship-quiz.git

# Navigate into the project
cd citizenship-quiz

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

---

## 🚢 Deployment

This project is optimised for deployment on [Vercel](https://vercel.com) (recommended) or [Netlify](https://netlify.com).

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** and import your repository
4. Vercel auto-detects Vite — click **Deploy**

The included `vercel.json` handles client-side routing automatically.

### Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in with GitHub
3. Click **Add new site → Import an existing project**
4. Set build command: `npm run build` and publish directory: `dist`
5. Click **Deploy**

The included `public/_redirects` handles client-side routing automatically.

---

## 🤝 Contributing

Contributions are welcome! This is a community resource and improvements help everyone preparing for their citizenship test.

### Ways to contribute

- 🐛 **Bug fixes** — open an issue or submit a PR
- ❓ **Question accuracy** — if you spot an incorrect answer or outdated question, please open an issue with a reference to the official source
- ✨ **New features** — open an issue first to discuss before building
- 🌐 **Accessibility** — improvements to a11y are always welcome
- 📖 **Documentation** — improvements to this README or code comments

### How to contribute

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/Eshaqi/citizenship-quiz.git
cd citizenship-quiz
npm install

### Reporting incorrect questions

If you believe a question or answer is incorrect, please open a GitHub issue with: https://github.com/Eshaqi/citizenship-quiz/issues

1. The question text
2. What you believe the correct answer is
3. A link to the official source (preferably from [immi.homeaffairs.gov.au](https://immi.homeaffairs.gov.au/citizenship/test-and-interview/our-common-bond))

---

## 📋 Roadmap

Potential future improvements (PRs welcome!):

- [ ] Timer mode to simulate real test conditions
- [ ] Bookmark/favourite questions for later review
- [ ] Dark mode
- [ ] Animated progress between questions
- [ ] Share results via link
- [ ] PWA support for offline use
- [ ] Additional languages for accessibility

---

## 📜 Official Resources

These are the authoritative sources you should use for your citizenship test preparation:

- 🏛️ [Official Citizenship Test — Department of Home Affairs](https://www.homeaffairs.gov.au/)
- 📖 [Our Common Bond (PDF)](https://immi.homeaffairs.gov.au/citizenship-subsite/files/our-common-bond-testable.pdf)
- 📝 [Official Practice Test](https://immi.homeaffairs.gov.au/citizenship/test-and-interview/prepare-for-test/practice-test-new)
- ℹ️ [Australian Citizenship General Information](https://www.homeaffairs.gov.au/citizenship)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for full details.

In plain English:

- ✅ You can use, copy, modify, and distribute this project freely
- ✅ You can use it for personal or commercial purposes
- ✅ You can include it in your own projects
- ❌ The author provides no warranty of any kind
- ❌ The author is not liable for any damages or outcomes

---

## 🙏 Acknowledgements

- Question content based on _Australian Citizenship: Our Common Bond_ — © Commonwealth of Australia, Department of Home Affairs
- Built as an open-source learning project to help people on their journey to Australian citizenship

---

## ✉️ Contact

Found a bug or have a question? Please [open a GitHub issue](https://github.com/eshaqi/citizenship-quiz/issues) rather than contacting the author directly.

> **Remember:** For anything related to your actual citizenship application or test, always contact the [Department of Home Affairs](https://www.homeaffairs.gov.au) directly.
```
