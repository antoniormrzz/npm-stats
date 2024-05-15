import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full pt-24 w-full">
      <h1 className="text-4xl font-bold text-center">User Not Found!</h1>
      <p className="mt-4 text-lg text-center">The user you are looking for could not be found on the npm registry.</p>
      <div>
        <Link
          className="btn btn-primary mt-4"
          href="/"
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
          Search
        </Link>
      </div>
    </div>
  );
}