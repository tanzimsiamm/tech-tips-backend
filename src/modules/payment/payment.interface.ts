export type TPayment = {
  email: string;
  cost: number;
  membersShip: {
    package: {
  name: string;
  features: string[];
};
    takenDate: string;
    exp: string;
  };
  transactionId: string;
};
