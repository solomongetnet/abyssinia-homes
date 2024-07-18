import CustomNavigate from "@/utils/navigate";
import { Button } from "@/components/ui/button";

const PublicActions = () => {
  return (
    <div className="flex items-center gap-2">
      <CustomNavigate to="/auth/login">
        <Button>Login</Button>
      </CustomNavigate>
      <CustomNavigate to="/auth/signup" className="max-sm:hidden">
        <Button variant={"outline"}>Register</Button>
      </CustomNavigate>
    </div>
  );
};

export default PublicActions;
