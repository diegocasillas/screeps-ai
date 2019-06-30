import Hauler from './Hauler';

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
    if (!this.memory.state.source) {
      const source: Source | null = this.creep.pos.findClosestByPath(
        FIND_SOURCES
      );

      if (source && source.id) {
        this.memory.state.source = source.id;
      }
    }

    const carryCapacityFull =
      _.sum(this.creep.carry) === this.creep.carryCapacity;

    if (!carryCapacityFull) {
      if (this.source && this.creep.harvest(this.source) === ERR_NOT_IN_RANGE) {
        this.moveToSource(this.source);
      }
    }
  }

  public get memory(): CreepMemory {
    return this.creep.memory;
  }

  public get source(): Source | null {
    const source: Source | null = this.memory.state.source
      ? Game.getObjectById(this.memory.state.source)
      : null;

    return source;
  }
}

export default Harvester;
