[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

# Webdriver downloader

## About The Project

Node.js library for automatic downloading latest or selected versions of opera/chrome/firefox drivers for selenium.

Currently supported drivers:

- Opera (operadriver)
- Firefox (geckodriver)
- Chrome/Chromium (chromedriver)

## Getting Started

```sh
npm i webdriver-downloader
```

## Usage

```typescript
import WebdriverDownloader from 'webdriver-downloader';

await WebdriverDownloader.firefox().download();
await WebdriverDownloader.chrome().download();
await WebdriverDownloader.opera().download();
```

You can also include parameters to set version of driver.

```typescript
await WebdriverDownloader.chrome({ version: '88.0.4324.27' }).download();
```

Or set path where driver will be downloaded.

```typescript
await WebdriverDownloader.chrome({ path: './drivers/' }).download();
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Jiri Fryc - [@frycjiri](https://www.linkedin.com/in/frycjiri/)

Project Link: [https://github.com/frycjiri/webdriver-downloader](https://github.com/frycjiri/webdriver-downloader)

[contributors-shield]: https://img.shields.io/github/contributors/frycjiri/webdriver-downloader.svg?style=for-the-badge
[contributors-url]: https://github.com/frycjiri/webdriver-downloader/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/frycjiri/webdriver-downloader.svg?style=for-the-badge
[forks-url]: https://github.com/frycjiri/webdriver-downloader/network/members
[stars-shield]: https://img.shields.io/github/stars/frycjiri/webdriver-downloader.svg?style=for-the-badge
[stars-url]: https://github.com/frycjiri/webdriver-downloader/stargazers
[issues-shield]: https://img.shields.io/github/issues/frycjiri/webdriver-downloader.svg?style=for-the-badge
[issues-url]: https://github.com/frycjiri/webdriver-downloader/issues
[license-shield]: https://img.shields.io/github/license/frycjiri/webdriver-downloader.svg?style=for-the-badge
[license-url]: https://github.com/frycjiri/webdriver-downloader/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/jirifryc/
