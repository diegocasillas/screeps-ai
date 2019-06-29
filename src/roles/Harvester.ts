class Harvester {
  public creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public run() {
    const source: Source | null = this.creep.pos.findClosestByPath(FIND_SOURCES);
    const spawn: StructureSpawn | null = this.creep.pos.findClosestByPath(FIND_MY_SPAWNS);

    const carryCapacityFull = _.sum(this.creep.carry) === this.creep.carryCapacity;

    if (!carryCapacityFull) {
      if (source && this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(source);
      }
    } else {
      if (spawn && this.creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(spawn);
      }
    }
  }

  public get memory() {
    return this.creep.memory;
  }
}

export default Harvester;
