# solidjs-xterm-component

Terminal emulator for SolidJS

## Usage

```jsx
import { Xterm } from 'solidjs-xterm-component'

// note: install local-echo from github
// pnpm i -D https://github.com/wavesoft/local-echo
// https://github.com/wavesoft/local-echo/issues/55
// TypeError: this.term.on is not a function
import LocalEchoController from 'local-echo';

export function App() {
  let terminal;

  function onLoadedXterm(_terminal) {
    terminal = _terminal;

    // colors
    terminal.setOption("theme", {
      background: "black",
      foreground: "white",
    });

    // events
    const localEcho = new LocalEchoController();
    terminal.loadAddon(localEcho);
    const promptString = '~ > ';
    function readLine() {
      // Read a single line from the user
      localEcho.read(promptString)
        .then(line => {
          // TODO do something with line
          console.log(`User entered line: ${line}`);
          readLine(); // read next line
        })
        .catch(error => console.log(`Error reading line: ${error}`))
      ;
    }
    readLine(); // start loop
  }

  return (
    <div>
      <Xterm onLoaded={onLoadedXterm} />
    </div>
  );
}
```

## Docs

* https://xtermjs.org/docs/
* https://github.com/wavesoft/local-echo
* https://github.com/xtermjs/xterm.js/blob/master/demo/client.ts

## Install

Not currently published to NPM, install from git for now by adding the following to your `dependencies` in `package.json`:

```json
	"dependencies": {
		"solidjs-xterm-component": "github:milahu/solidjs-xterm-component"
	}
```

or run

```sh
npm install "solidjs-xterm-component@github:milahu/solidjs-xterm-component"
```

If you fork the repo, you can replace `milahu` with your own GitHub username to
install the lib from your fork.

Note that the source file is a `.jsx` file. If you import it in a Vite project,
that will be fine because Vite will know how to compile it, but otherwise you
may need to configure your tool (f.e. [Webpack](https://webpack.js.org/) with
[Babel](https://babeljs.io/)) to compile JSX files in
`node_modules/solidjs-xterm-component` because those files are not
plain JavaScript.

## Demo

TODO

[Live Demo](https://milahu.github.io/solidjs-xterm-component/demo/dist/)

To run the demo locally

```sh
npm install
npm run demo
```
