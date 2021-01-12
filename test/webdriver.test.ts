import WebdriverDownloader from '../src/index';
import { DriverOptions } from '../src/driver_options';
import path from 'path';
import fs from 'fs';

var options = new DriverOptions();
options.path = path.resolve(__dirname, 'drivers');

test('Firefox', async () => {
  await WebdriverDownloader.firefox(options).download();
  expect(fs.existsSync(path.resolve(options.path as string, 'geckodriver.exe'))).toBe(true); //TODO: This will work only on win environment.
});
test('Chrome', async () => {
  await WebdriverDownloader.chrome(options).download();
  expect(fs.existsSync(path.resolve(options.path as string, 'chromedriver.exe'))).toBe(true); //TODO: This will work only on win environment.
});
test('Opera', async () => {
  await WebdriverDownloader.opera(options).download();
  expect(fs.existsSync(path.resolve(options.path as string, 'operadriver.exe'))).toBe(true); //TODO: This will work only on win environment.
});
