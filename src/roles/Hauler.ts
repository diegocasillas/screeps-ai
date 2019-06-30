import Harvester from './Harvester';

class Hauler {
  public creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  private clearHarvester(): void {
    this.creep.memory.state.harvester = null;
  }

  private assignHarvester(): void {
    const harvester: Harvester | undefined = global.roles.HARVESTER.find(
      (h: Harvester) => h.creep.memory.state.hauler === null
    );

    if (harvester) {
      const harvesterCreep: Creep | null = Game.getObjectById(
        harvester.creep.id
      );
      if (harvesterCreep) {
        harvesterCreep.memory.state.hauler = this.creep.id;
        this.creep.memory.state.harvester = harvester.creep.id;
      }
    }
  }

  private getEnergyFromHarvester(harvester: Harvester): void {
    if (this.creep.pos.isNearTo(harvester.creep)) {
      harvester.creep.transfer(this.creep, RESOURCE_ENERGY);
    } else {
      this.creep.moveTo(harvester.creep, {
        visualizePathStyle: {
          stroke: '#ffffff'
        }
      });
    }
  }

  private getDroppedEnergy(): void {
    const droppedEnergy = this.creep.pos.findClosestByPath(
      FIND_DROPPED_RESOURCES
    );

    if (droppedEnergy) {
      if (this.creep.pos.isNearTo(droppedEnergy)) {
        this.creep.pickup(droppedEnergy);
      } else {
        this.creep.moveTo(droppedEnergy);
      }
    }
  }

  private moveEnergyToSpawn(): void {
    const energyToFill =
      Game.spawns.Spawn1.energyCapacity - Game.spawns.Spawn1.energy;
    const amountToTransfer =
      energyToFill > _.sum(this.creep.carry)
        ? _.sum(this.creep.carry)
        : energyToFill;

    if (this.creep.pos.isNearTo(Game.spawns.Spawn1)) {
      this.creep.transfer(
        Game.spawns.Spawn1,
        RESOURCE_ENERGY,
        amountToTransfer
      );
    } else {
      this.creep.moveTo(Game.spawns.Spawn1);
    }
  }

  public run(): void {
    if (
      this.creep.memory.state.harvester &&
      !Game.getObjectById(this.creep.memory.state.harvester)
    ) {
      this.clearHarvester();
    }

    if (!this.creep.memory.state.harvester) {
      this.assignHarvester();
    }

    if (!this.carryCapacityFull) {
      if (this.harvester) {
        this.getEnergyFromHarvester(this.harvester);
      } else {
        this.getDroppedEnergy();
      }
    } else {
      this.moveEnergyToSpawn();
    }
  }

  public get memory(): CreepMemory {
    return this.creep.memory;
  }

  public get carryCapacityFull(): boolean {
    return _.sum(this.creep.carry) === this.creep.carryCapacity;
  }

  public get harvester(): Harvester | null {
    const harvester = global.roles.HARVESTER.find(
      (h: Harvester) => h.creep.id === this.memory.state.harvester
    );

    return harvester ? harvester : null;
  }
}

export default Hauler;
