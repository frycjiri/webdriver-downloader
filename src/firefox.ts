import got from 'got/dist/source';
import { JSDOM } from 'jsdom';
import unzipper from 'unzipper';
import { DriverManager, Arch, Platform } from './driver_manager';

export class FirefoxManager extends DriverManager {
  private baseurl: string = 'https://github.com/mozilla/geckodriver/releases/';
  private downloadurl: string = 'https://github.com/mozilla/geckodriver/releases/download/';

  private downloadLink(version: string): string {
    return this.downloadurl + version + '/geckodriver-' + version;
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
      if (this.platform === Platform.Linux) url = this.downloadLink(version) + '-linux64.tar.gz';
      else if (this.platform === Platform.Mac) url = this.downloadLink(version) + '-macos.tar.gz';
      else url = this.downloadLink(version) + '-win64.zip';
    } else {
      if (this.platform === Platform.Linux) url = this.downloadLink(version) + '-linux32.tar.gz';
      else if (this.platform === Platform.Mac) url = this.downloadLink(version) + '-macos.tar.gz';
      else url = this.downloadLink(version) + '-win32.zip';
    }
    got.stream(url).pipe(unzipper.Extract({ path: this.options.path }));
  }
  public async setup() {
    if (this.options.download) await this.download();
  }
}
