import { ReactNode } from "react";
import { InView } from "react-intersection-observer";

interface SmoothInViewProps {
  children: ReactNode;
  delay?: number;
  index?: number;
}

function SmoothRender({ children, delay = 500, index = 0 }: SmoothInViewProps) {
  const calculatedDelay = delay * index;
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
