import * as migration_20241215_160757_initial from './20241215_160757_initial';

export const migrations = [
  {
    up: migration_20241215_160757_initial.up,
    down: migration_20241215_160757_initial.down,
    name: '20241215_160757_initial'
  },
];
