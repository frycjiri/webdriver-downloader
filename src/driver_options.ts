import path from 'path';
export class DriverOptions {
  public download: boolean = true;
  public path: string = path.resolve(__dirname, 'drivers');
  public version: string = 'latest';
}
