# Todo List App!

## Running locally

Initial set up (also run when dependencies change):
- `npm install` - install backend dependencies
- `cd apps/to-do-list && npm install` - install frontend dependencies

General testing:
- `npm run dev` in one terminal to start backend
- `cd apps/to-do-list && npm run dev` in another terminal to start frontend. Then visit localhost:5173 in a browser to access the page

The frontend should auto-update, but will sometimes require you to refresh the page to fully see the latest changed.

The backend will not auto-update. You will need to ctrl-c to terminate the backend, then re-run `npm run dev` to see the latest changes. You don't need to refresh the frontend in order to see the latest changes from the backend, as they run independently (unless you're trying to test backend interactions that happen when the page loads).

To package up the whole app such that you could deploy it to a production environment, run `npm run build:prod`