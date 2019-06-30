import { ErrorMapper } from 'utils/ErrorMapper';
import { roleList } from './roles';

const setup = (): void => {
  global.roles = {};

  for (const role in roleList) {
    global.roles[role] = [];
  }
};

const deleteMissingCreeps = (): void => {
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
};

const createSmartCreeps = (): void => {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    const role = creep.memory.role;
    global.roles[role].push(new roleList[role].model(creep));
  }
};

const spawnCreeps = (): void => {
  const spawn = Game.spawns.Spawn1;

  for (const role in roleList) {
    if (global.roles[role].length < roleList[role].min) {
      spawn.spawnCreep(
        roleList[role].spawnProperties.body,
        `${roleList[role].spawnProperties.name}#${Game.time}`,
        {
          memory: {
            role: roleList[role].spawnProperties.role,
            room: spawn.room.name,
            state: roleList[role].spawnProperties.state
          }
        }
      );
    }
  }
};

const run = (): void => {
  for (const role in global.roles) {
    global.roles[role].forEach((creep: any) => creep.run());
  }
};

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  setup();
  deleteMissingCreeps();
  createSmartCreeps();
  spawnCreeps();
  run();
});
