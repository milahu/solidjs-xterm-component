# solidjs-xterm-component

Terminal emulator for SolidJS

## Usage

```jsx
import { Xterm } from 'solidjs-xterm-component'
import { WebLinksAddon } from 'xterm-addon-web-links';

// FIXME not working?
import { FitAddon } from 'xterm-addon-fit';

// note: install local-echo from github
// pnpm i -D https://github.com/wavesoft/local-echo
// https://github.com/wavesoft/local-echo/issues/55
// TypeError: this.term.on is not a function
import LocalEchoController from 'local-echo';



export function App() {
  let terminal;

  function onTerminal(_terminal) {
    terminal = _terminal;

    // colors
    // TODO ubuntu theme https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
    /*
    terminal.options.theme = {
      background: "black",
      foreground: "white",
    };
    */

    // FIXME not working?
    // fit terminal to parent size
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    // clickable links
    /*
    function onLinkClick(_event, url) {
      console.log(`clicked link: ${url}`);
    }
    */
    //terminal.loadAddon(new WebLinksAddon(onLinkClick));
    // default handler: open the link
    terminal.loadAddon(new WebLinksAddon());

    // start writing to terminal

    // greeting
    //terminal.write('Welcome to nix-eval-js 0.0.1. Type :? for help.\r\n\r\n');
    terminal.write('Welcome to some-terminal 0.0.1' + '\r\n' + '\r\n');

    // simple link
    //terminal.writeln('click here: https://xtermjs.org/');

    // OSC 8 hyperlink escape codes
    // FIXME not working
    //terminal.writeln('click here: \x1b]8;;https://xtermjs.org\x07OSC 8 hyperlink text\x1b]8;;\x07');

    function evalLine(line) {
      // https://ansi.gabebanks.net/ # ANSI escape code generator
      const start = '\x1B[';
      const bold = '1';
      const red = '31';
      const redbold = `${start}${red};${bold}m`;
      const reset = '\x1B[0m';

      // eval javascript
      try {
        console.log(`user input: ${line}`);
        const result = JSON.stringify(eval(line), null, 2);
        console.log(`eval result:`, result);
        if (result === undefined) return '';
        //return String(result).replace(/\n/g, '\r\n'); // TODO implement custom toString
        return stringify(result).replace(/\n/g, '\r\n');
      }
      catch (error) {
        if (error instanceof EvalError) {
          return `${redbold}error:${reset} ${error.message}`;
        }
        else {
          // internal error
          console.log('FIXME internal error:');
          console.log(error);
          return `${redbold}FIXME${reset} internal error: ${error.name}: ${error.message}`;
        }
      }
    }



    // read lines
    const localEcho = new LocalEchoController();
    terminal.loadAddon(localEcho);
    const promptString = '> ';
    function readLine() {
      // Read a single line from the user
      localEcho.read(promptString)
        .then(line => {
          const result = evalLine(line);
          terminal.write(String(result) + '\r\n\r\n');
          readLine(); // read next line
        })
        .catch(error => console.log(`Error reading line: ${error}`))
      ;
    }
    readLine(); // start loop
  }

  return (
    <div>
      <Xterm
        onTerminal={onTerminal}
        style={{
          'flex-grow': 1, // full height
          'display': 'flex',
        }}
      />
    </div>
  );
}
```

## Docs

* https://xtermjs.org/docs/
* https://github.com/xtermjs/xterm.js/blob/master/typings/xterm.d.ts # interface ITerminalOptions
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
