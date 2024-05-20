export interface GetPostsQueryVariables {
  limit: number;
  spaceIds: string[];
}

export interface GetPostsQuery {
  posts: {
    totalCount: number;
    nodes: {
      id: string;
      title: string;
      publishedAt: Date;
      description: string;
      reactions: {
        reacted: boolean;
        count: number;
      }[];
      createdBy: {
        member: {
          name: string;
        };
      };
    }[];
  };
}

export interface GetPostVariables {
  id: string;
}

export interface GetPostQuery {
  post: {
    id: string;
    title: string;
    createdBy: {
      member: {
        name: string;
      };
    };
    reactions: {
      reacted: boolean;
      count: number;
    }[];
    publishedAt: Date;
    description: string;
  };
}
