type Package = {
  name: string;
  version: string;
  description: string;
  keywords: string[];
  scope: string;
  date: string;
  links: {
    npm: string;
    homepage: string;
    repository: string;
    bugs: string;
  };
  publisher: {
    username: string;
    email: string;
  };
  maintainers: {
    username: string;
    email: string;
  }[];
};

type Score = {
  final: number;
  detail: {
    quality: number;
    popularity: number;
    maintenance: number;
  };
};

type ObjectType = {
  package: Package;
  score: Score;
  searchScore: number;
};

export type UserSearchSuccessfulResponse = {
  objects: ObjectType[];
  total: number;
  time: string;
};