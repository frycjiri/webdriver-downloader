import got from 'got/dist/source';
import { JSDOM } from 'jsdom';
import unzipper from 'unzipper';
import path from 'path';
import fs from 'fs';
import { DriverManager, Arch, Platform } from './driver_manager';

export class OperaManager extends DriverManager {
  private baseurl: string = 'https://github.com/operasoftware/operachromiumdriver/releases/';
  private downloadurl: string = 'https://github.com/operasoftware/operachromiumdriver/releases/download/';

  private downloadLink(version: string): string {
    return this.downloadurl + version + '/operadriver';
  }
  private async download() {
    let version = this.options.version;
    if (version === 'latest' || version === '') {
      version = await got(this.baseurl + 'latest/').then((response) => {
        const dom = new JSDOM(response.body);
        const href = dom?.window?.document?.querySelector('.release-header .f1 a')?.getAttribute('href');
        let lastPart: string | undefined = href?.split('/')?.pop();
        if (lastPart === undefined) lastPart = 'latest';
        return lastPart;
      });
    }
    let url = '';
    if (this.arch === Arch.x64) {
      if (this.platform === Platform.Linux) url = this.downloadLink(version) + '_linux64.zip';
      else if (this.platform === Platform.Mac) url = this.downloadLink(version) + '_mac64.zip';
      else url = this.downloadLink(version) + '_win64.zip';
    } else {
      if (this.platform === Platform.Linux) url = this.downloadLink(version) + '_linux64.zip';
      else if (this.platform === Platform.Mac) url = this.downloadLink(version) + '_mac64.zip';
      else url = this.downloadLink(version) + '_win32.zip';
    }
    const location = this.options.path;
    got
      .stream(url)
      .pipe(unzipper.Parse())
      .on('entry', (entry) => {
        const fileName: string = entry.path;
        if (fileName.indexOf('operadriver.exe') >= 0) {
          entry.pipe(fs.createWriteStream(path.resolve(location, 'operadriver.exe')));
        } else {
          entry.autodrain();
        }
      });
  }
  public async setup() {
    if (this.options.download) await this.download();
  }
}
