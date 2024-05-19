import { Period, period as periodConst } from "@/app/types/period";
import { notFound, redirect } from "next/navigation";
import getPackageStats from "./getPackageStats";
import {
  ChartLineUp,
  Dog,
  GithubLogo,
  House,
  Package,
  Shield,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next/types";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
// @ts-ignore
import * as rehypeUrls from "rehype-urls";
import rehypeSlug from "rehype-slug";
import "github-markdown-css";
import "./page.css";
import { MarkdownNodeForURL, MarkdownUrl } from "@/app/types/url";
import rehypePrism from "rehype-prism-plus";
import { Suspense } from "react";
import { PackageDownloadStats } from "./PackageDownloadStats";
import { InstallInstructions } from "./InstallInstructions";
import { InstallInstructionsFallback } from "./InstallInstructionsFallback";
import { urlDecodeText, urlEncodeText } from "@/app/utils/urlEncodeDecode";

type PackagePageProps = {
  params: {
    name: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: PackagePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const name = urlDecodeText(params.name);

  let totalDownloads = 0;
  let metadata = null;
  let packageData = null;
  // fetch data
  try {
    const packageStats = await getPackageStats(name, periodConst.daily);
    totalDownloads = packageStats.totalDownloads;
    metadata = packageStats.metadata;
    packageData = packageStats.packageData;
  } catch (e) {
    totalDownloads = 0;
    metadata = null;
    packageData = null;
  }

  return {
    title: `${name} npm stats`,
    description:
      metadata?.description ||
      `See npm download statistics for the package ${name}`,
  };
}

export default async function PackagePage({
  params,
  searchParams,
}: PackagePageProps) {
  const period = (searchParams?.period || "last-month") as Period;

  const name = urlDecodeText(params.name);

  let totalDownloads = 0;
  let metadata = null;
  let packageData = null;
  try {
    const packageStats = await getPackageStats(name, period);
    totalDownloads = packageStats.totalDownloads;
    metadata = packageStats.metadata;
    packageData = packageStats.packageData;
  } catch (e) {
    if (e === "not-found") {
      return notFound();
    } else {
      return redirect("/error");
    }
  }

  const version = metadata["dist-tags"].latest || metadata["dist-tags"].beta;
  const versionData = metadata.versions[version as string];

  const repoAddress = (
    [
      (metadata.bugs?.url,
      metadata.repository?.url,
      versionData.bugs?.url,
      versionData.repository?.url),
    ].find((url: string) => url?.match(/github.com\/[^\/]+\/[^\/]+/)) || ""
  )
    .replace(/\.git$/, "")
    .replace(/^git:\/\//, "https://")
    .replace(/\/issues$/, "")
    .replace(/^git\+/, "");

  const otherVersions = Object.values(metadata["dist-tags"]).filter(
    (v) => v !== version
  );

  const homeAddress = metadata.homepage || versionData.homepage || "";

  let readme = metadata.readme || versionData.readme || "";
  // if no readme, search for .readme in other versions
  if (!readme) {
    for (const v of otherVersions) {
      if (metadata.versions[v].readme) {
        readme = metadata.versions[v].readme as string;
        break;
      }
    }
  }

  if (!readme) {
    // display a link to home address if exists
    if (homeAddress.includes("http")) {
      readme = `[Visit homepage](${homeAddress})`;
    } else {
      readme = "No readme available";
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-full w-full">
      <div className="lg:h-full lg:border-r-2 lg:border-r-base-300 lg:bg-base-200 lg:w-80 lg:min-w-80 flex flex-col items-center p-4 lg:pt-8 gap-2">
        <div className="avatar">
          <Package className="w-24 h-24 text-error" />
        </div>
        <h1>{name}</h1>
        <h2>{version}</h2>
        <h2>@{versionData._npmUser.name}</h2>
        <div className="flex flex-row flex-wrap justify-center gap-1">
          <a
            className="btn btn-error btn-sm rounded-full"
            href={`https://www.npmjs.com/package/${name}`}
            target="_blank"
          >
            <Package className="w-5 h-5" />
            npm
          </a>
          {homeAddress.includes("http") ? (
            <a
              className="btn bg-yellow-600 hover:bg-yellow-700 btn-sm rounded-full text-white"
              href={homeAddress}
              target="_blank"
            >
              <House className="w-5 h-5" />
              Home
            </a>
          ) : null}
          {repoAddress ? (
            <a
              className="btn bg-black hover:bg-gray-700 btn-sm rounded-full text-white"
              href={repoAddress}
              target="_blank"
            >
              <GithubLogo className="w-5 h-5" />
              Repo
            </a>
          ) : null}
          <a
            className="btn bg-violet-500 hover:bg-violet-600 btn-sm rounded-full text-white"
            href={`https://snyk.io/advisor/npm-package/${name}`}
            target="_blank"
          >
            <Dog className="w-5 h-5" />
            Snyk
          </a>
          <a
            className="btn bg-indigo-500 hover:bg-indigo-600 btn-sm rounded-full text-white"
            href={`https://socket.dev/npm/package/${name}`}
            target="_blank"
          >
            <Shield className="w-5 h-5" />
            Socket
          </a>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <ChartLineUp weight="bold" className="w-5 h-5 inline" />
          <span className="font-bold">Downloads:</span>
          {totalDownloads}
        </div>
        <Suspense fallback={<InstallInstructionsFallback name={name} />}>
          <InstallInstructions name={name} />
        </Suspense>
      </div>
      <div className="w-full lg:w-[calc(100%-20rem)] flex flex-col pb-2">
        <div className="w-full">
          <div role="tablist" className="tabs tabs-lifted mt-4 mx-2 md:w-1/2">
            <Link
              href={`/package/${urlEncodeText(name)}?period=${
                periodConst.daily
              }`}
              role="tab"
              className={`tab ${period === periodConst.daily && "tab-active"}`}
            >
              Daily
            </Link>
            <Link
              href={`/package/${urlEncodeText(name)}?period=${
                periodConst.weekly
              }`}
              role="tab"
              className={`tab ${period === periodConst.weekly && "tab-active"}`}
            >
              Weekly
            </Link>
            <Link
              href={`/package/${urlEncodeText(name)}?period=${
                periodConst.monthly
              }`}
              role="tab"
              className={`tab ${
                period === periodConst.monthly && "tab-active"
              }`}
            >
              Monthly
            </Link>
            <Link
              href={`/package/${urlEncodeText(name)}?period=${
                periodConst.yearly
              }`}
              role="tab"
              className={`tab ${period === periodConst.yearly && "tab-active"}`}
            >
              Yearly
            </Link>
          </div>
          {period === periodConst.daily ? null : (
            <Suspense
              fallback={<div className="skeleton w-full h-[200px]"></div>}
            >
              <div className="w-full h-[200px]">
                <PackageDownloadStats
                  name={name}
                  period={period}
                  downloads={packageData.downloads}
                />
              </div>
            </Suspense>
          )}
        </div>
        <div className="pl-12 pr-6 py-6 min-w-full max-w-full w-full markdown-body">
          <Markdown
            rehypePlugins={[
              rehypeRaw,
              rehypeUrls.bind(
                null,
                (url: MarkdownUrl, extras: MarkdownNodeForURL) => {
                  const urlPrepend =
                    "https://raw.githubusercontent.com/" +
                    metadata.repository?.url
                      ?.split(".com/")[1]
                      .split(".git")[0] +
                    "/HEAD/";
                  if (
                    extras.tagName === "img" &&
                    url.href.startsWith("media/")
                  ) {
                    url.pathname = `${urlPrepend}${url.pathname}`;
                  }
                  return url;
                }
              ),
              rehypeSlug,
              remarkGfm,
              rehypePrism.bind(null as any, {
                ignoreMissing: true,
              }),
            ]}
          >
            {readme}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
