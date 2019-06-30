import Hauler from './Hauler';

class Harvester {
  public creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  private findSource(): void {
    const source: Source | null = this.creep.pos.findClosestByPath(
      FIND_SOURCES
    );

    if (source && source.id) {
      this.memory.state.source = source.id;
    } else {
      this.memory.state.source = null;
    }
  }

  private moveToSource(): void {
    if (this.source) {
      this.creep.moveTo(this.source, {
        visualizePathStyle: {
          stroke: '#ffffff'
        }
      });
    }
  }

  public run(): void {
    if (!this.memory.state.source) {
      this.findSource();
    }

    if (!this.carryCapacityFull) {
      if (this.source && this.creep.pos.isNearTo(this.source)) {
        this.creep.harvest(this.source);
      } else {
        this.moveToSource();
      }
    } else {
      if (!this.hauler) {
        if (this.creep.pos.isNearTo(Game.spawns.Spawn1)) {
          this.creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY);
        } else {
          this.creep.moveTo(Game.spawns.Spawn1);
        }
      }
    }
  }

  public get memory(): CreepMemory {
    return this.creep.memory;
  }

  public get carryCapacityFull(): boolean {
    return _.sum(this.creep.carry) === this.creep.carryCapacity;
  }

  public get source(): Source | null {
    const source: Source | null = this.memory.state.source
      ? Game.getObjectById(this.memory.state.source)
      : null;

    return source;
  }

  public get hauler(): Hauler | null {
    const hauler = global.roles.HAULER.find(
      (h: Hauler) => h.creep.id === this.memory.state.hauler
    );

    return hauler ? hauler : null;
  }
}

export default Harvester;
