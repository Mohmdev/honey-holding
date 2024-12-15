import * as migration_20241214_214723_0_initial from './20241214_214723_0_initial';
import * as migration_20241215_093540_1_test from './20241215_093540_1_test';
import * as migration_20241215_104312_2_test from './20241215_104312_2_test';
import * as migration_20241215_114725_support from './20241215_114725_support';

export const migrations = [
  {
    up: migration_20241214_214723_0_initial.up,
    down: migration_20241214_214723_0_initial.down,
    name: '20241214_214723_0_initial',
  },
  {
    up: migration_20241215_093540_1_test.up,
    down: migration_20241215_093540_1_test.down,
    name: '20241215_093540_1_test',
  },
  {
    up: migration_20241215_104312_2_test.up,
    down: migration_20241215_104312_2_test.down,
    name: '20241215_104312_2_test',
  },
  {
    up: migration_20241215_114725_support.up,
    down: migration_20241215_114725_support.down,
    name: '20241215_114725_support'
  },
];
