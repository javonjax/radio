import { initUsersDB } from './utils';

(async () => {
  await initUsersDB();
  process.exit(0);
})();
