import * as migration_20241218_140409_base_version from './20241218_140409_base_version';

export const migrations = [
  {
    up: migration_20241218_140409_base_version.up,
    down: migration_20241218_140409_base_version.down,
    name: '20241218_140409_base_version'
  },
];
