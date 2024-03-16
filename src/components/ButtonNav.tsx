import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ButtonProps {
  title: string;
  to: string;
}

function ButtonNav({ title, to }: ButtonProps) {
  return (
    <Link to={to}>
      <button className="button w-max flex">
        {title}
        <ChevronRight strokeWidth={1} className="-mr-2" />
      </button>
    </Link>
  );
}

export default ButtonNav;
