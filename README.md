# hero-plugins

Plugins made to be used with [Ulixee Hero](https://github.com/ulixee/hero).

## Usage

### Install

Currently there is no npm version yet, to install use a built from a github `-js-branch`. 
Add this in package.json, using a commit from a javascript built branch.
```
"hero-plugins": "https://github.com/OTA-Insight/hero-plugins.git#commit=dc2e3266bd7ccca1f2c92dd740552f33e8faddef",
```

### Usage

Every plugin can be enabled separately in Hero using this code:

```
hero.use(require.resolve('hero-plugins/lib/Animations'));
```

For everything to work in typescript a bare import is needed, importing directly can also be done but then typings won't work across packages, so it is not recommended.

```
import 'hero-plugins/lib/Animations';
```

For plugin specific functionality see the interfaces folder.

### Development

We are using yarn V3, not make everything work with your editor use:

```
yarn dlx @yarnpkg/sdks vscode
yarn dlx @yarnpkg/sdks ...
```

## Plugins

### Animations

Plugin that can be used to pause animations, mainly useful for taking screenshots. The way chrome takes screenshots, triggers animations again which could result in inconsistent images when taking screenshots without this plugin.

> WARNING: The current implementation is detectable by the webpage if they are looking at DOM changes.

### SessionDb

Plugin that can be used to easily use and reuse a sessionDb attached to and within a Hero instance (session).
The returned SessionDb is fully typed and allows you to access read-only data from the sessionDb,
such as the fetched resources and socket information.

Example usage:

```typescript
const sessionDb = await hero.readSessionDb();

const socketRecords = sessionDb.sockets.all();
// ... e.g. can be used to store the relevant info from the sockets as TCP connections

const resources = sessionDb.resources.all();
// ... e.g. can be used to store the relevant info from the sockets as Http Requests
```

## Testing

Currently there are no tests implemented. As this library grows/matures tests will be added.

## Contributing

Contributions are welcome. Please, see [the CONTRIBUTING document](./CONTRIBUTING.md) for details.

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms. See [Contributor Code of Conduct](./CONTRIBUTING.md#contributor-code-of-conduct) for more information.
