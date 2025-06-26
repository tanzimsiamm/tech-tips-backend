
export type TPost = {
    _id? : string,
    title : string;
    category : string;
    votes?: number
    voters?: { 
      userId: string, 
      voteType: string 
    }[],
    description : string;
    images : string[];
    comments? :  TComment[];
    authorInfo : {
        name : string;
        email: string;
        image : string;
        role :string;
        authorId: string;
        authorEmail : string;
      },
    isPremium? : boolean;
    createdAt? : string,
    updatedAt? : string,
};

export type TComment = {
  comment : string,
  userInfo  : {
    name : string,
    email : string,
    image : string
  },
  createdAt? : string,
  updatedAt? : string,
 
}


export type TPostsQuery = {
      userEmail?: string,
      category?: string,
      sortByUpvote? : string;
      searchTerm?: string,
      skip? : string,
      limit? : string,
  }