export type MarkdownUrl = {
  protocol: string;
  slashes: boolean;
  auth: null | string;
  host: string;
  port: null | string;
  hostname: string;
  hash: null | string;
  search: null | string;
  query: string | { [key: string]: string };
  pathname: string;
  path: string;
  href: string;
};

export type MarkdownNodeForURL = {
  type: string;
  tagName: string;
  properties: {
    href: string;
    title: null | string;
  };
  children: Array<{
    type: string;
    value: string;
    position: {
      start: { line: number; column: number; offset: number };
      end: { line: number; column: number; offset: number };
    };
  }>;
  position: {
    start: { line: number; column: number; offset: number };
    end: { line: number; column: number; offset: number };
  };
};