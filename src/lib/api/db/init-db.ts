import { initUsersDB, initFavoritesDB } from './utils';

(async () => {
  await initUsersDB();
  await initFavoritesDB();
  process.exit(0);
})();
