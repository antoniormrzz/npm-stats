import { DownloadData, DownloadInfo } from "@/app/types/download";
import { PackageMetadata } from "@/app/types/package";

function handleErrors(response: Response) {
  if (!response.ok) {
    if (response.status === 404) {
      throw "not-found";
    }
    throw Error(response.statusText);
  }
  return response;
}

export default async function getPackageStats(name: string, period: string) {
  let totalDownloads = 0;
  let packageData = null;

  const packageDownloadsResponse = await fetch(
    `https://api.npmjs.org/downloads/range/${period}/${name}`,
    { next: { revalidate: 600 } }
  );
  const handledPackageDownloadsResponse = handleErrors(packageDownloadsResponse);
  const downloadData: DownloadData = await handledPackageDownloadsResponse.json();
  totalDownloads = downloadData.downloads.reduce(
    (accumulator: number, currentValue: DownloadInfo) => {
      return accumulator + currentValue.downloads;
    },
    0
  );
  packageData = downloadData;
  const packageMetadataResponse = await fetch(
    `https://registry.npmjs.org/${name}`,
    { next: { revalidate: 600 } }
  );
  const handledPackageMetadataResponse = handleErrors(packageMetadataResponse);
  const metadata: PackageMetadata = await handledPackageMetadataResponse.json();
  

  return {
    metadata,
    packageData,
    totalDownloads,
  };
}
