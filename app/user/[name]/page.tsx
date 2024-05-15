import { UserSearchSuccessfulResponse } from "@/app/user/[name]/userSearchResponse.type";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { ChartLineUp, Package, Stack } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { UserPackage } from "./UserPackage";
import getUserStats from "./getUserStats";
import { Period, period as periodConst } from "@/app/types/period";
import { Metadata, ResolvingMetadata } from "next/types";
import { urlDecodeText, urlEncodeText } from "@/app/utils/urlEncodeDecode";

type UserPageProps = {
  params: {
    name: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: UserPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const name = urlDecodeText(params.name);

  return {
    title: `${name}`,
    description:
      `See npm download statistics for user ${name}`,
    
  };
}

export default async function UserPage({
  params,
  searchParams,
}: UserPageProps) {
  const period = (searchParams?.period || "last-month") as Period;
  const page = +(searchParams?.page || "1");

  const name = urlDecodeText(params.name);

  let totalPackageCount = 0;
  let totalPackages: UserSearchSuccessfulResponse["objects"] = [];
  let totalDownloads = 0;
  let userPackagesToShow: string[] = [];
  let allPages: number[] = [];
  try {
    const userStats = await getUserStats(name, period, page);
    totalPackageCount = userStats.totalPackageCount;
    totalPackages = userStats.totalPackages;
    totalDownloads = userStats.totalDownloads;
    userPackagesToShow = userStats.userPackagesToShow;
    allPages = userStats.allPages;
  } catch (e) {
    if (e === "not-found") {
      return notFound();
    } else {
      return redirect("/error");
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-full w-full">
      <div className="lg:h-full lg:border-r-2 lg:border-r-base-300 lg:bg-base-200 lg:w-80 flex flex-col items-center p-4 lg:pt-8 gap-2">
        <div className="avatar">
          <div className="w-28 mask mask-squircle">
            <Image
              src={`https://api.dicebear.com/8.x/thumbs/png?seed=${name}`}
              quality={100}
              alt={name}
              width={112}
              height={112}
            />
          </div>
        </div>
        <h1>@{name}</h1>
        <a
          className="btn btn-error btn-sm rounded-full"
          href={`https://www.npmjs.com/~${name}`}
          target="_blank"
        >
          <Package className="w-5 h-5" />
          npm
        </a>
        <p className="flex items-center gap-1 text-sm">
          <Stack weight="bold" className="w-5 h-5 inline" />{" "}
          <span className="font-bold">Packages:</span> {totalPackageCount}
        </p>
        <div className="flex items-center gap-1 text-sm">
          <ChartLineUp weight="bold" className="w-5 h-5 inline" />
          <span className="font-bold">
            Downloads
            <div
              className="tooltip inline mx-1"
              data-tip="For unscoped packages that were published more than a day ago."
            >
              <QuestionMarkCircleIcon className="w-4 h-4 inline" />
            </div>
            :
          </span>
          {totalDownloads}
        </div>
      </div>
      <div className="flex-grow flex flex-col justify-between pb-2">
        <div className="w-full">
          <div role="tablist" className="tabs tabs-lifted mt-4 mx-2 md:w-1/2">
            <Link
              href={`/user/${urlEncodeText(name)}?period=${periodConst.daily}${page === 1 ? "" : `&page=${page}`}`}
              role="tab"
              className={`tab ${period === periodConst.daily && "tab-active"}`}
            >
              Daily
            </Link>
            <Link
              href={`/user/${urlEncodeText(name)}?period=${periodConst.weekly}${page === 1 ? "" : `&page=${page}`}`}
              role="tab"
              className={`tab ${period === periodConst.weekly && "tab-active"}`}
            >
              Weekly
            </Link>
            <Link
              href={`/user/${urlEncodeText(name)}?period=${periodConst.monthly}${page === 1 ? "" : `&page=${page}`}`}
              role="tab"
              className={`tab ${
                period === periodConst.monthly && "tab-active"
              }`}
            >
              Monthly
            </Link>
            <Link
              href={`/user/${urlEncodeText(name)}?period=${periodConst.yearly}${page === 1 ? "" : `&page=${page}`}`}
              role="tab"
              className={`tab ${period === periodConst.yearly && "tab-active"}`}
            >
              Yearly
            </Link>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 p-4 gap-2 mx-auto">
            {userPackagesToShow.map((pack, index) => (
              <UserPackage key={index} name={pack} period={period} />
            ))}
          </ul>
        </div>
        <div className="flex w-full justify-center justify-self-end">
          <div className="join">
            {page === 1 ? (
              <button className="join-item btn" disabled>
                «
              </button>
            ) : (
              <Link
                className="join-item btn"
                href={`/user/${urlEncodeText(name)}?period=${period}&page=${page - 1}`}
              >
                «
              </Link>
            )}
            <div className="join-item flex justify-center items-center px-2">Page {page}</div>
            {page === allPages.length ? (
              <button className="join-item btn" disabled>
                »
              </button>
            ) : (
              <Link
                className="join-item btn"
                href={`/user/${urlEncodeText(name)}?period=${period}&page=${page + 1}`}
              >
                »
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
