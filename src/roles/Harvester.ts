class Harvester {
  public creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public moveToSource(source: Source): void {
    this.creep.moveTo(source, {
      visualizePathStyle: {
        stroke: '#ffffff'
      }
    });
  }

  public run(): void {
    const source = this.creep.pos.findClosestByPath(FIND_SOURCES);

    const carryCapacityFull =
      _.sum(this.creep.carry) === this.creep.carryCapacity;

    if (!carryCapacityFull) {
      if (source && this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
        this.moveToSource(source);
      }
    }
  }

  public get memory(): CreepMemory {
    return this.creep.memory;
  }
}

export default Harvester;
