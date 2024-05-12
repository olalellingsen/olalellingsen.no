import { ReactNode } from "react";
import { InView } from "react-intersection-observer";

interface SmoothInViewProps {
  children: ReactNode;
}

function SmoothRender({ children }: SmoothInViewProps) {
  return (
    <InView>
      {({ inView, ref }) => (
        <div
          className={`transition-opacity duration-500 ease-in-out ${
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
