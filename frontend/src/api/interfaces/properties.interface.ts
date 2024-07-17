import { IProperty } from "@/interface/property.interface";

export interface IPropertiesRes {
  properties: IProperty[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export interface IPropertiesReq {
  page?: number;
  limit?: number;
  filtersQuery?: any;
}
