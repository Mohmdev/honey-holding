import * as migration_20241215_160757_initial from './20241215_160757_initial';
import * as migration_20241215_170033_sasas from './20241215_170033_sasas';

export const migrations = [
  {
    up: migration_20241215_160757_initial.up,
    down: migration_20241215_160757_initial.down,
    name: '20241215_160757_initial',
  },
  {
    up: migration_20241215_170033_sasas.up,
    down: migration_20241215_170033_sasas.down,
    name: '20241215_170033_sasas'
  },
];
