import { Package, Link as LinkIcon } from "@phosphor-icons/react/dist/ssr";
import { UserPackageDetails } from "./UserPackageDetails";
import type { Period } from "@/app/types/period";
import Link from "next/link";
import { Suspense } from "react";
import { urlEncodeText } from "@/app/utils/urlEncodeDecode";

function truncate(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

type UserPackageProps = {
  name: string;
  period: Period;
};

export function UserPackage({ name, period }: UserPackageProps) {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className="flex">
        <div className="h-full flex justify-start">
          <Package className="ml-4 mt-2 w-24 h-24 text-error" />
        </div>
      </figure>
      <div className="card-body p-2 h-48">
        <Link href={`/package/${urlEncodeText(name)}?period=${period}`}>
          <h2 className="card-title">
            {truncate(name, 30)}
            <LinkIcon className="w-4 h-4" />
          </h2>
        </Link>
        <Suspense fallback={<div className="skeleton w-full h-full"></div>}>
          <UserPackageDetails name={name} period={period} />
        </Suspense>
      </div>
    </div>
  );
}
