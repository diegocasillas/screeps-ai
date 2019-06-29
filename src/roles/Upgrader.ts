class Upgrader {
  public creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public run() {
    const controller: StructureController | undefined = this.creep.room.controller;
    const source: Source | null = controller
      ? controller.pos.findClosestByPath(FIND_SOURCES)
      : this.creep.pos.findClosestByPath(FIND_SOURCES);

    const carryCapacityFull = _.sum(this.creep.carry) === this.creep.carryCapacity;
    if (!carryCapacityFull && !this.creep.memory.working) {
      if (source && this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else {
      if (controller && this.creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(controller);
      } else {
        this.creep.memory.working = !!this.creep.carry.energy;
      }
    }
  }

  public get memory() {
    return this.creep.memory;
  }
}

export default Upgrader;
