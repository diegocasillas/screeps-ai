interface CreepMemory {
  role: string;
  room: string;
  working?: boolean;
  state: {
    harvester?: string | null;
    hauler?: string | null;
    source?: string | null;
    target?: string | null;
  };
}

interface Memory {
  uuid: number;
  log: any;
}

declare namespace NodeJS {
  interface Global {
    log: any;
    roles: any;
  }
}
