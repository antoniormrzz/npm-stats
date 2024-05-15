import { UserSearchSuccessfulResponse } from "@/app/user/[name]/userSearchResponse.type";

function handleErrors(response: Response) {
  if (!response.ok) {
    if (response.status === 404) {
      throw "not-found";
    }
    throw Error(response.statusText);
  }
  return response;
}

export default async function getUserStats(name: string, period: string, page: number) {
  let totalPackageCount = 0;
  let totalPackages: UserSearchSuccessfulResponse["objects"] = [];
  let totalDownloads = 0;
  let userPackagesToShow: string[] = [];
  let allPages: number[] = [];
  
  const userSearchResponse = await fetch(
    `https://registry.npmjs.com/-/v1/search?text=maintainer:${name}&size=250&quality=0.0&maintenance=0.0&popularity=1.0&from=0`
    , { next: { revalidate: 600 } })
  const handledUserSearchResponse = handleErrors(userSearchResponse);
  const data: UserSearchSuccessfulResponse = await handledUserSearchResponse.json();


  if (data.total > 0) {
    totalPackages = [...data.objects];
    if (data.total > 250) {
      const pages = Math.ceil(data.total / 250);
      const urlArray: string[] = [];
      for (let i = 1; i < pages; i++) {
        urlArray.push(
          `https://registry.npmjs.com/-/v1/search?text=maintainer:${name}&size=250&quality=0.0&maintenance=0.0&popularity=1.0&from=${i * 250
          }`
        );
      }
      const handledUserSearchResponse = await Promise.all(urlArray.map(u => fetch(u, { next: { revalidate: 600 } })));
      const handledResponses = await Promise.all(handledUserSearchResponse.map(handleErrors));
      const packages = await Promise.all(handledResponses.map(res => res.json()));

      packages.forEach(p => {
        totalPackages = [...totalPackages, ...p.objects];
      });
    }
  }

  totalPackageCount = data.total;

  userPackagesToShow = totalPackages.map(e => e.package.name).slice((page - 1) * 10, page * 10);

  for (let i = 0; i < Math.ceil(totalPackageCount / 10); i++) {
    allPages.push(i + 1);
  }

  if (userPackagesToShow.length === 0 || page > allPages.length) {
    throw "not-found";
  }

  let unscopedpacks = totalPackages.filter(e => e.package.scope === 'unscoped');
  let queryNumber = Math.ceil(unscopedpacks.length / 128);
  let queryPackageGroups: string[][] = [];
  for (let i = 0; i < queryNumber; i++) {
    queryPackageGroups.push(
      unscopedpacks.map(e => e.package.name).slice(i * 128, (i + 1) * 128)
    );
  }
  const packageGroupDownloadResponses = await Promise.all(
    queryPackageGroups.map(u =>
      fetch(`https://api.npmjs.org/downloads/point/${period}/${u.join(',')}`, { next: { revalidate: 600 } })
    )
  )

  const handledPackageGroupDownloadResponses = await Promise.all(packageGroupDownloadResponses.map(handleErrors));
  const downloads = await Promise.all(handledPackageGroupDownloadResponses.map(res => res.json()));
  let downloadsSum = downloads
    .map(e => {
      return Object.values(e).reduce(function (accumulator, currentValue: any) {
        if (currentValue && currentValue.downloads) {
          return accumulator + currentValue.downloads;
        } else {
          return accumulator;
        }
      }, 0);
    })
    .reduce(function (accumulator, currentValue: any) {
      return accumulator + currentValue;
    }, 0);
  totalDownloads = (downloadsSum as number);

  return {
    totalPackageCount,
    totalPackages,
    totalDownloads,
    userPackagesToShow,
    allPages
  }
}