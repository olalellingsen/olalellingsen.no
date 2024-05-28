import { ReactNode } from "react";
import { InView } from "react-intersection-observer";

interface SmoothInViewProps {
  children: ReactNode;
  index?: number;
  slow?: boolean;
}

function SmoothRender({ children, slow, index = 0 }: SmoothInViewProps) {
  let renderDelay = 100;

  if (slow && screen.width > 640) {
    renderDelay = 300;
  }

  const calculatedDelay = renderDelay * index;

  return (
    <InView>
      {({ inView, ref }) => (
        <div
          className={`transition-opacity duration-500 ease-in ${
            inView ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: `${calculatedDelay}ms` }}
          ref={ref}
        >
          {children}
        </div>
      )}
    </InView>
  );
}

export default SmoothRender;
