interface CreepMemory {
  role: string;
  room: string;
  working?: boolean;
}

interface Memory {
  uuid: number;
  log: any;
}

declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
