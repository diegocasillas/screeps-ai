import { ErrorMapper } from 'utils/ErrorMapper';
import Harvester from './roles/Harvester';
import Upgrader from './roles/Upgrader';

const deleteMissingCreeps = (): void => {
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
};

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  deleteMissingCreeps();

  const spawn = Game.spawns.Spawn1;

  const harvesters = _.filter(
    Game.creeps,
    (creep: Creep) => creep.memory.role === 'HARVESTER'
  ).map((creep: Creep) => new Harvester(creep));
  const harvestersMinAmount = 3;

  const upgraders = _.filter(
    Game.creeps,
    (creep: Creep) => creep.memory.role === 'UPGRADER'
  ).map((creep: Creep) => new Upgrader(creep));
  const upgradersMinAmount = 3;

  if (harvesters.length < harvestersMinAmount) {
    spawn.spawnCreep([WORK, MOVE, CARRY], `harvester#${Game.time}`, {
      memory: { role: 'HARVESTER', room: spawn.room.name }
    });
  }

  if (upgraders.length < upgradersMinAmount) {
    spawn.spawnCreep([WORK, MOVE, CARRY], `upgrader#${Game.time}`, {
      memory: { role: 'UPGRADER', room: spawn.room.name }
    });
  }

  harvesters.forEach((harvester: Harvester) => harvester.run());
  upgraders.forEach((upgrader: Upgrader) => upgrader.run());
});
