import { ReactNode } from "react";
import { InView } from "react-intersection-observer";

interface SmoothInViewProps {
  children: ReactNode;
  index?: number;
  delay?: number;
}

function SmoothRender({ children, delay, index = 0 }: SmoothInViewProps) {
  var renderDelay = 10;

  if (delay) {
    renderDelay = delay * index;
  }

  return (
    <InView>
      {({ inView, ref }) => (
        <div
          className={`transition-opacity duration-500 ease-in ${
            inView ? "opacity-100" : "opacity-0"
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
