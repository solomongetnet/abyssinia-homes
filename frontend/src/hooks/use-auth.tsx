import { IUser } from "@/interface/user.interface";
import { useAppSelector } from "@/store/hooks/redux.hooks";
import { decodeToken } from "@/utils/decode-jwt-token";
import { useEffect, useState } from "react";

const useAuth = (): {
  isLoggedIn: boolean;
  user: IUser | null;
  token: string | null;
  role: "admin" | "user" | "agent" | null;
  isLoading: boolean;
  isFaild: boolean;
} => {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const role = decodeToken(token)?.role;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFaild, setIsFaild] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  const isLoggedIn: boolean = !!token;

  useEffect(() => {
    if (user.status == "loading") {
      setIsLoading(true);
    }
    if (user.status == "faild") {
      setIsFaild(true);
      setIsLoading(false);
    }
    if (user.status == "succeeded") {
      setIsLoading(false);
    }

    if (user.data) {
      setData(user.data);
    }
  }, [user]);

  return {
    isLoading,
    isLoggedIn,
    isFaild,
    user: data,
    token,
    role,
  };
};

export default useAuth;
