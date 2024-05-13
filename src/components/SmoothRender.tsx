import { ReactNode } from "react";
import { InView } from "react-intersection-observer";

interface SmoothInViewProps {
  children: ReactNode;
  delay?: number;
}

function SmoothRender({ children }: SmoothInViewProps) {
  return (
    <InView>
      {({ inView, ref }) => (
        <div
          className={`transition-opacity duration-1000 delay-500 ease-in ${
            inView ? "opacity-100" : "opacity-0"
          }`}
          ref={ref}
        >
          {children}
        </div>
      )}
    </InView>
  );
}

export default SmoothRender;
