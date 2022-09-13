import { onMount, onCleanup } from "solid-js";

import { Terminal } from 'xterm';
import "xterm/css/xterm.css";

export function Xterm(props) {

  let ref;
  let terminal;

  onMount(async () => {
    terminal = new Terminal(props.options);

    // setTimeout is a workaround for
    // Error: Terminal requires a parent element.
    // see solidjs issues #116 and #36
    if (false) {
      //console.log('Xterm.onMount.setTimeout: ref', ref);
      terminal.open(ref);
      if (props.onTerminal) props.onTerminal(terminal);
    } else {
      setTimeout(() => {
        //console.log('Xterm.onMount.setTimeout: ref', ref);
        terminal.open(ref);
        if (props.onTerminal) props.onTerminal(terminal);
      });
    }
  });

  onCleanup(() => {
    terminal.clear();
  });

  // style for the wrapper div
  // you probably want to set
  // either { height: '100%' } in a display:block container
  // or { 'flex-grow': 1 } in a display:flex container

  // FIXME make it work with xterm-addon-fit

  return <div style={props.style} ref={ref} />
}
