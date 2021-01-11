# Webdriver manager

> Work in progress

Node.js library for automatic downloading of selected versions (or latest) for opera/chrome/firefox drivers.

## How to use

```javascript
await WebdriverManager.firefox().setup();
await WebdriverManager.chrome().setup();
await WebdriverManager.opera().setup();
```

### How to change downloaded version of driver

```javascript
var options = new DriverOptions();
options.version = '88.0.4324.27';
await WebdriverManager.chrome(options).setup();
```
