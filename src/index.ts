import { DriverManager } from './driver_manager';
import { DriverOptions } from './driver_options';
import { FirefoxManager } from './firefox';
import { OperaManager } from './opera';
import { ChromeManager } from './chrome';

export default class WebdriverDownloader {
  public static firefox(options: DriverOptions = new DriverOptions()): DriverManager {
    return new FirefoxManager(options);
  }
  public static opera(options: DriverOptions = new DriverOptions()): DriverManager {
    return new OperaManager(options);
  }
  public static chrome(options: DriverOptions = new DriverOptions()): DriverManager {
    return new ChromeManager(options);
  }

  public static for(driverName: string, options: DriverOptions = new DriverOptions()): DriverManager {
    switch (driverName) {
      case 'firefox':
      default:
        return this.firefox(options);
      case 'chrome':
        return this.chrome(options);
      case 'opera':
        return this.opera(options);
    }
  }
}
