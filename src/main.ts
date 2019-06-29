import { ErrorMapper } from 'utils/ErrorMapper';
import Harvester from './roles/Harvester';

const deleteMissingCreeps = () => {
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
};

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  deleteMissingCreeps();

  const spawn: StructureSpawn = Game.spawns.Spawn1;

  const harvesters = _.filter(Game.creeps, (creep: Creep) => creep.memory.role === 'HARVESTER').map(
    (creep: Creep) => new Harvester(creep)
  );
  const harvestersMinAmount = 3;

  if (harvesters.length < harvestersMinAmount) {
    spawn.spawnCreep([WORK, MOVE, CARRY], `harvester#${Game.time}`, {
      memory: { role: 'HARVESTER', room: spawn.room.name }
    });
  }

  harvesters.forEach((harvester: Harvester) => harvester.run());
});
