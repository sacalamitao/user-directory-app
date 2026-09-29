# User Directory App

A React user directory backed by the [JSONPlaceholder users API](https://jsonplaceholder.typicode.com/users). It supports search, role filtering, sorting, selected-user details, and favorites.

## Setup

Install a current Node.js and npm version, clone this repository, then install dependencies from the lockfile:

```sh
npm ci
```

The app fetches users from JSONPlaceholder at runtime, so running the application requires access to that API. No API key or environment file is needed.

## Run the application

```sh
npm run dev
```

Open the local URL printed by Vite. For a production build, run `npm run build`; to serve that build locally, run `npm run preview`.

## Run tests

```sh
npm test
```

This runs the Vitest suite once. The tests mock the API response, so they do not need network access. They cover user loading, search, role filtering, selected-user details, and API errors. Run `npm run lint` for the ESLint check.

## Technology and library choices

- **React and TypeScript:** Component-based UI with typed API data and props.
- **Vite:** Development server and production build.
- **Tailwind CSS v4:** Utility classes for styling. The Vite plugin is configured in `vite.config.ts`, and `src/index.css` imports Tailwind; no Tailwind or PostCSS config file is needed for this setup.
- **TanStack Query:** Fetches and caches the users response, tracks loading and error states, and supports retrying a failed request.
- **Vitest, React Testing Library, and user-event:** Test behavior through rendered UI and user interactions.

## AI assistance

The AI coding assistant used for this project is Codex.

## Architecture

`src/main.tsx` wraps the app in the shared TanStack Query provider from `src/lib/queryClient.ts`. `src/app/App.tsx` renders the users feature. Within `src/features/users`, the service fetches and maps API data, `useUsers` owns the query, and the components render the directory. Search, role filtering, and sorting run through `utils/userUtils.ts`. `useDebouncedValue` delays search filtering by 300 ms. `useFavorites` stores favorite user IDs in browser `localStorage`.

```text
src/
├── app/App.tsx
├── features/users/
│   ├── components/      # Directory UI and behavior tests
│   ├── hooks/           # Query, debounce, and favorites hooks
│   ├── services/        # JSONPlaceholder request and role mapping
│   ├── types/           # API and UI user types
│   └── utils/           # Search, role filter, and sort helpers
├── lib/queryClient.ts
├── index.css
└── main.tsx
```

## Tradeoffs and shortcuts

- JSONPlaceholder has no role field. The service assigns a local mock role from Engineer, Designer, Product Manager, and QA Engineer using `roles[user.id % roles.length]`. The assignment is stable for a given ID, but it is not real API data or saved remotely.
- The API currently returns a small list, so search, role filtering, and sorting happen in the browser after fetching all users. Search does not make a new API request.
- Favorites persist only in `localStorage` on the same browser. They are not synchronized across devices or accounts.
- The API response is typed in TypeScript but is not validated at runtime.

## Improvements with more time

- Add runtime validation and clearer recovery for malformed API responses.
- Add tests for combined filters, sorting, favorites persistence, and retry after an API error.
- Add server-supported pagination, search, and role filtering if a suitable backend becomes available.
- Add account-backed favorite synchronization if favorites need to follow users across devices.

## 100,000+ users scalability

First is to determine where the bottleneck is coming, maybe we implemented best approaches to the frontend, but whats not performing well is the backend, we can use APM(app monitoring tools like sentry) if we see backend is performing well then some approaches might help, including pagination instead of loading the entire 100,000 users. Same goes with the search and filtering, do not load the entire table from the backend and filter them on the browser, but instead create search and filtering on the backend API enhanced by indexing and also implement debouncing on search so not every user input will create an API request, during pagination we can also take advantage of the caching provided by some libraries like tanstack, so if the user went back on the same page with the same records from the backend, it is cached and will be displayed immediately without an unecessary repeated query on the same endpoint 
