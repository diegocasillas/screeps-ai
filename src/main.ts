import { ErrorMapper } from 'utils/ErrorMapper';

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
});
