# solidjs-xterm-component

Terminal emulator for SolidJS

# Demo

TODO

[Live Demo](https://milahu.github.io/solidjs-xterm-component/demo/dist/).

To run the demo locally

```sh
npm install
npm run demo
```

# Install

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

# Usage

```jsx
import {Xterm} from 'solidjs-xterm-component'

export function App(props) {
	return (
		<Xterm/>
	)
}
```
