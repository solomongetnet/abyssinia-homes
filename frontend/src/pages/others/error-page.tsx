import { Button } from "@/components/ui/button";
import CustomNavigate from "@/utils/navigate";
import { FC } from "react";

type FallbackProps = {
  error: { message?: string };
  resetErrorBoundary: (...args: any[]) => void;
};
const ErrorPage: FC<FallbackProps> = (error) => {
  return (
    <div className="w-full h-screen grid place-content-center">
      <h2>Some Error Occured Please Try Again</h2>
      <br />
      <div className="flex flex-col gap-2">
        <Button
          variant="destructive"
          onClick={() => error.resetErrorBoundary()}
        >
          Try Again
        </Button>
        <CustomNavigate to="/">
          <Button variant="link">Back to home</Button>
        </CustomNavigate>
      </div>
    </div>
  );
};

export default ErrorPage;
