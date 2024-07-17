interface IProprtiesStatus {
  type: string;
  label: string;
}

export const propertiesStatusList: IProprtiesStatus[] = [
  {
    type: "for rent",
    label: "For rent",
  },
  {
    type: "for sale",
    label: "For sale",
  },
];
