export interface IUserDashboardRes {
  propertiesCount: number;
  favoritesCount: number;
  reviewsCount: number;
  pendingPropertiesCount: number;
}

export interface IUserPropertiesAnalysisRes {
  propertyTypeDistribution: any;
  locationDistribution: any;
  propertyStatusDistribution: any;
  priceDistribution: any;
  propertiesByMonth: any;
}
