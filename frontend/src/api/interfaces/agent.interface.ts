import { IUser } from "@/interface/user.interface";

export interface IAgentsRes {
  agents: IUser[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export interface IAgentsReq {
  page?: number;
  limit?: number;
  sort?: number;
  search?: string;
}
