import { onMount, onCleanup } from "solid-js";

import { Terminal } from 'xterm';
import "xterm/css/xterm.css";

export function Xterm(props) {

  let ref;
  let terminal;

  onMount(async () => {
    terminal = new Terminal();
    terminal.open(ref);
    if (props.onLoaded) props.onLoaded(terminal);
  });

  onCleanup(() => {
    terminal.clear();
  });

  return <div ref={ref} />
}
