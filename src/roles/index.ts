import Harvester from './Harvester';
import Hauler from './Hauler';
import Upgrader from './Upgrader';

export const roleList: any = {
  HARVESTER: {
    model: Harvester,
    min: 6,
    spawnProperties: {
      body: [WORK, CARRY, MOVE],
      name: 'harvester',
      role: 'HARVESTER',
      state: { hauler: null }
    }
  },
  HAULER: {
    model: Hauler,
    min: 6,
    spawnProperties: {
      body: [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
      name: 'hauler',
      role: 'HAULER',
      state: { harvester: null }
    }
  },
  UPGRADER: {
    model: Upgrader,
    min: 10,
    spawnProperties: {
      body: [WORK, CARRY, MOVE],
      name: 'upgrader',
      role: 'UPGRADER',
      state: {}
    }
  }
};
