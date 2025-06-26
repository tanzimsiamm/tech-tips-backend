export type TPayment = {
  email: string;
  cost: number;
  membersShip: {
    package: object;
    takenDate: string;
    exp: string;
  };
  transactionId: string;
};
