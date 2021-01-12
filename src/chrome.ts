import got from 'got/dist/source';
import { JSDOM } from 'jsdom';
import unzipper from 'unzipper';
import { DriverManager, Arch, Platform } from './driver_manager';

export class ChromeManager extends DriverManager {
  private baseurl: string = 'https://chromedriver.storage.googleapis.com/';
  private async getLatestVersion(): Promise<string> {
    const version = await got(this.baseurl).then((response) => {
      const dom = new JSDOM(response.body);
      const href = dom.window.document.querySelectorAll('Key');
      let arr: string[] = [];
      href.forEach((v, k, p) => {
        const identifier = v?.textContent?.split('/')[0];
        if (identifier === null || identifier === undefined || !identifier.match(/\d+\.\d+\.\d+\.\d+/)) {
          return;
        }
        arr.push(identifier);
      });
      arr = arr.sort();
      return arr.pop();
    });
    if (version === undefined) return '88.0.4324.27';
    return version;
  }
  public async download() {
    let version = this.version;
    if (version === 'latest' || version === '') {
      version = await this.getLatestVersion();
    }
    let url = this.baseurl + version + '/chromedriver_';
    if (this.platform === Platform.Linux) url += 'linux64.zip';
    else if (this.platform === Platform.Mac) url += 'mac64.zip';
    else url += 'win32.zip';
    got.stream(url).pipe(unzipper.Extract({ path: this.path }));
  }
}
