import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: any) => {
  try {
    const decoded: any = jwtDecode(token);
    return { role: decoded.role, userId: decoded.userId };
  } catch (error) {
    return null;
  }
};
