export type TComment = {
  postId: string;
  comment: string;
  userInfo: {
    name: string;
    email: string;
    image: string;
  };
  createdAt?: string;
  updatedAt?: string;
};
