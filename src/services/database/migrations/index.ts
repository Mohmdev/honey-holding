import * as migration_20241218_140409_base_version from './20241218_140409_base_version';
import * as migration_20241218_164428_globals from './20241218_164428_globals';

export const migrations = [
  {
    up: migration_20241218_140409_base_version.up,
    down: migration_20241218_140409_base_version.down,
    name: '20241218_140409_base_version',
  },
  {
    up: migration_20241218_164428_globals.up,
    down: migration_20241218_164428_globals.down,
    name: '20241218_164428_globals'
  },
];
