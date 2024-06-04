import { ReactNode, useState } from "react";
import { InView } from "react-intersection-observer";

interface SmoothInViewProps {
  children: ReactNode;
  index?: number;
  delay?: number;
}

function SmoothRender({ children, delay, index = 0 }: SmoothInViewProps) {
  var renderDelay = 10;

  if (delay && index) {
    renderDelay = delay * index;
  }
  if (delay && !index) {
    renderDelay = delay;
  }

  const [hasBeenInView, setHasBeenInView] = useState(false);

  return (
    <InView
      onChange={(inView) => {
        if (inView && !hasBeenInView) {
          setHasBeenInView(true);
        }
      }}
    >
      {({ inView, ref }) => (
        <div
          className={`transition-opacity duration-500 ease-in ${
            inView || hasBeenInView ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: `${renderDelay}ms` }}
          ref={ref}
        >
          {children}
        </div>
      )}
    </InView>
  );
}

export default SmoothRender;
