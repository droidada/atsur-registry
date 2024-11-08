export type BundleType = {
  _id: string;
  createdAt: string;
  externalId: string;
  details: BundleDetailType[];
  name: string;
  unitPrice: number;
};

export type BundleDetailType = {
  _id: string;
  quantity: number;
  item: {
    name: string;
    unitPrice: number;
    externalId: string;
    description: string;
  };
};
