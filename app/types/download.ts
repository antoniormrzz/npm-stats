export type DownloadInfo = {
  downloads: number;
  day: string;
};

/** Represents Download Data */
export type DownloadData = {
  /** download information for period. */
  downloads: DownloadInfo[];
  /** end date in string format */
  end: string;
  /** package name */
  package: string;
  /** start date in string format */
  start: string;
};