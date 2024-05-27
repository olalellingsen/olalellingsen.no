import { ClipLoader } from "react-spinners";

type Props = {
  isLoading?: boolean;
};

function Spinner({ isLoading = true }: Props) {
  return (
    <div className="flex justify-center pt-32">
      <ClipLoader loading={isLoading} size={100} />
    </div>
  );
}

export default Spinner;
