import os from 'os';
import fs from 'fs';
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
  options: DriverOptions;
  public constructor(options: DriverOptions) {
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
    this.options = options;
    if (!fs.existsSync(this.options.path)) {
      fs.mkdirSync(this.options.path);
    }
  }
  public abstract setup(): Promise<void>;
}
