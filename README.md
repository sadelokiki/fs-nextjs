# Thinkific Multi-User Journal Assignment

## Getting Started

### 1. Get to know project tech stack

This simple project is a starting point for your take-home test. It is built with the following technologies:

- [React](https://reactjs.org/), a JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/), a frontend framework for server-side rendering, easy routing, serverless RESTful API
- [Prisma](https://www.prisma.io/), a database ORM for Node.js
  - Scaffolding is set up for SQLite
  - You are free to use other databases of your choice

### 2. Install npm dependencies

```
yarn
```

### 3. Create .env file

```
cp .env.example .env
```

### 4. Prepare DB

Create a local SQLite database and run migrations.

```
npx prisma migrate dev --name init
```

### 5. Start the app

```
yarn dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.


✅ Test Plan
Functional

- Anonymous user can create a journal entry

- Entry appears instantly (optimistic UI)

- Entries persist after reload

- Clicking username opens user profile page

- Profile lists that user’s posts (newest first)

Validation

- Empty message shows “Message cannot be empty”

- (Optional) Message length limited to 1000 chars

- Network failure shows “Something went wrong while posting”

Accessibility

- Textarea labeled with aria-label

- Error messages use role="alert"

- Keyboard shortcut (/ or n) focuses textarea

Responsiveness

- Layout adapts across mobile and desktop


## Submission

Update this README file by answering the questions below.

### Date Or Reflection

October 7 2025

### Location of deployed application (not necessary for Junior Engineers)

Please provide the url where we can find and interact with your running application.

### Instructions to run assignment locally

Same as above

### Time spent

5.5 hours

### Assumptions made

Anonymous visitors must still have persistent “guest” accounts tied to a UUID cookie.
SQLite is sufficient for local persistence (no external DB setup).
A simple Bootstrap UI meets the “mobile-ready & accessible” criteria.
One “show-off” feature (Optimistic UI) satisfies the optional advanced task.

### Shortcuts/Compromises made

Used Bootstrap instead of Tailwind to save setup time and ensure consistent responsiveness.
Form validation focuses on required and empty checks
Manual test plan provided instead of automated unit tests due to time scope.

### Assume your application will go into production...

#### 1) What would be your approach to ensuring the application is ready for production (testing)?

Add unit & integration tests using Jest + React Testing Library.
Add API route tests using Vitest or Supertest.
Add end-to-end tests with Playwright or Cypress for posting, navigation, and guest cookie flow.
Continuous Integration (GitHub Actions) running tests + lint + type check.

#### 2) How would you ensure a smooth user experience as 1000’s of users start using your app simultaneously?
Replace SQLite with PostgreSQL on Supabase or RDS.
Add caching (Redis) for frequently read posts.
Implement pagination / infinite scroll to reduce payload size.
Use server-side rendering (SSR) with Next.js for better perceived performance.
Add rate-limiting on API routes (middleware).

#### 3) What key steps would you take to ensure application security?
Keep guest cookies HTTP-only + secure.
Sanitize all user input before saving to DB.
Enable Helmet / CSP headers in Next.js.
Add CSRF protection for form submissions.
Monitor vulnerabilities via Dependabot & npm audit.

### What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.

### Other information about your submission that you feel it's important that we know if applicable.

### Your feedback on this technical challenge
The instructions were clear and realistic.
Overall, an enjoyable challenge that balances backend and frontend work well.
