import React from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function Fancybox(props) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate || "[data-fancybox]";
    const options = {
        loop: true,
        animationEffect: 'fade',
        transitionEffect: 'zoom-in-out',
        buttons: [
          'slideShow',
          'fullScreen',
          'thumbs',
          'close'
        ]
    };

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return <div ref={containerRef} className="Fancybox">{props.children}</div>;
}

export default Fancybox;