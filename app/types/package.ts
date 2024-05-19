/** Represents npm package metadata */
export type PackageMetadata = {
  /** Unique identifier for the package */
  _id: string;
  /** Revision identifier for the package */
  _rev: string;
  /** Name of the package */
  name: string;
  /** Distribution tags for the package */
  'dist-tags': {
    /** Latest version tag, e.g., "1.0.0" */
    latest: string;
    /** Beta version tag, e.g., "1.0.0-beta" */
    beta?: string;
  };
  /** Version details for the package */
  versions: {
    [version: string]: {
      /** Name of the version */
      name: string;
      /** Description of the version */
      description: string;
      /** Version number, e.g., "1.0.0" */
      version: string;
      /** Author of the version */
      author: {
        /** Name of the author */
        name: string;
      };
      /** License of the version, e.g., "MIT" */
      license: string;
      /** Repository of the version */
      repository: {
        /** Type of the repository, e.g., "git" */
        type: string;
        /** URL of the repository, e.g., "https://github.com/user/repo.git" */
        url: string;
      };
      /** Keywords of the version */
      keywords: string[];
      /** Main entry point of the version, e.g., "index.js" */
      main: string;
      /** Types of the version, e.g., "index.d.ts" */
      types: string;
      /** Exports of the version */
      exports: {
        [key: string]: {
          types: string;
          import: string;
          require: string;
        };
      };
      /** Engines of the version */
      engines: {
        /** Node.js version required, e.g., ">=12.0.0" */
        node: string;
      };
      /** Scripts of the version */
      scripts: {
        [key: string]: string;
      };
      /** Husky hooks of the version */
      husky?: {
        hooks: {
          [key: string]: string;
        };
      };
      /** Prettier configuration of the version */
      prettier?: {
        printWidth: number;
        semi: boolean;
        singleQuote: boolean;
        arrowParens: string;
        trailingComma: string;
      };
      /** Size limit of the version */
      sizeLimit?: {
        path: string;
        limit: string;
      }[];
      /** Development dependencies of the version */
      devDependencies: {
        [key: string]: string;
      };
      /** Dependencies of the version */
      dependencies: {
        [key: string]: string;
      };
      /** Peer dependencies of the version */
      peerDependencies: {
        [key: string]: string;
      };
      /** Git head of the version, e.g., "abc123" */
      gitHead: string;
      /** Bugs of the version */
      bugs: {
        /** URL for reporting bugs, e.g., "https://github.com/user/repo/issues" */
        url: string;
      };
      /** Homepage of the version, e.g., "https://github.com/user/repo" */
      homepage: string;
      /** Unique identifier of the version */
      _id: string;
      /** Node version of the version, e.g., "12.0.0" */
      _nodeVersion: string;
      /** npm version of the version, e.g., "6.14.4" */
      _npmVersion: string;
      /** Distribution of the version */
      dist: {
        integrity: string;
        shasum: string;
        tarball: string;
        fileCount: number;
        unpackedSize: number;
        'npm-signature': string;
      };
      /** npm user of the version */
      _npmUser: {
        /** Name of the npm user */
        name: string;
        /** Email of the npm user, e.g., "user@example.com" */
        email: string;
      };
      /** Directories of the version */
      directories: {};
      /** Maintainers of the version */
      maintainers: {
        /** Name of the maintainer */
        name: string;
        /** Email of the maintainer, e.g., "maintainer@example.com" */
        email: string;
      }[];
      /** npm operational internal of the version */
      _npmOperationalInternal: {
        host: string;
        tmp: string;
      };
      /** Shrinkwrap of the version */
      _hasShrinkwrap: boolean;
      /** readme of the version */
      readme?: string;
    };
  };
  /** Timestamps for the package */
  time: {
    /** Creation timestamp, e.g., "2020-01-01T00:00:00Z" */
    created: string;
    [version: string]: string;
    /** Modification timestamp, e.g., "2020-01-01T00:00:00Z" */
    modified: string;
  };
  /** Maintainers of the package */
  maintainers: {
    /** Name of the maintainer */
    name: string;
    /** Email of the maintainer, e.g., "maintainer@example.com" */
    email: string;
  }[];
  /** Author of the package */
  author: {
    /** Name of the author */
    name: string;
  };
  /** License of the package, e.g., "MIT" */
  license: string;
  /** Contents of package Readme file */
  readme: string;
  /** Filename of the Readme file, e.g., "README.md" */
  readmeFilename: string;
  /** Description of the package */
  description: string;
  /** Homepage of the package, e.g., "https://github.com/user/repo" */
  homepage: string;
  /** Keywords for the package */
  keywords: string[];
  /** Repository details for the package */
  repository: {
    /** Type of the repository, e.g., "git" */
    type: string;
    /** URL of the repository, e.g., "https://github.com/user/repo.git" */
    url: string;
  };
  /** Bug reporting details for the package */
  bugs: {
    /** URL for reporting bugs, e.g., "https://github.com/user/repo/issues" */
    url: string;
  };
  /** Users of the package */
  users: {
    [username: string]: boolean;
  };
};