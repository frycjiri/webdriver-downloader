import os from 'os';
import fs from 'fs';
import path from 'path';
import { DriverOptions } from './driver_options';
export enum Platform {
  Win,
  Linux,
  Mac,
}
export enum Arch {
  x32,
  x64,
}

export abstract class DriverManager {
  platform: Platform;
  arch: Arch;
  version: string;
  path: string;

  public constructor(options: DriverOptions) {
    if (options.path === null || options.path === undefined) {
      this.path = path.resolve(__dirname, 'drivers');
    } else {
      this.path = options.path;
    }
    if (options.version === null || options.version === undefined) {
      this.version = 'latest';
    } else {
      this.version = options.version;
    }
    switch (os.platform()) {
      case 'darwin':
        this.platform = Platform.Mac;
        break;
      case 'win32':
        this.platform = Platform.Win;
        break;
      default:
        this.platform = Platform.Linux;
        break;
    }
    switch (os.arch()) {
      default:
      case 'x32':
        this.arch = Arch.x32;
        break;
      case 'x64':
        this.arch = Arch.x64;
        break;
    }
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }
  }
  public abstract download(): Promise<void>;
}
