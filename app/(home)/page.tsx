import { BanknotesIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { search } from "./search.action";
import { period } from "../types/period";

export default function Home() {

  return (
    <div className="w-full flex flex-col pt-10 items-center">
      <Image
        priority
        src="/logo.png"
        alt="Explore npm download statistics, copy npm, Yarn, and pnpm installation instructions, and track popular npm packages."
        width={272}
        height={144}
        className="mt-4"
      />
      <h1 className="m-8 md:m-4 text-center">
        Get visual statistics of npm package downloads by user or package name.
      </h1>
      <form className="w-full px-2 flex flex-col sm:flex-row md:w-3/4 lg:w-1/2 gap-1" action={search}>
        <div className="grow">
          <label className="input input-bordered flex items-center gap-2 w-full">
            <input type="text" name="searchText" className="grow flex" placeholder="User/Package name" />
          </label>
        </div>
        <select className="select select-bordered sm:max-w-xs" name="searchType">
          <option value="user" defaultChecked>By User</option>
          <option value="package">By Package</option>
        </select>
        <select className="select select-bordered sm:max-w-xs" name="searchPeriod" defaultValue={period.monthly}>
          <option value={period.daily}>Daily</option>
          <option value={period.weekly}>Weekly</option>
          <option value={period.monthly}>Monthly</option>
          <option value={period.yearly}>Yearly</option>
        </select>
        <button type="submit" className="btn btn-primary sm:ml-2">
          Search
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </form>
      <br />
      <p className="m-8 md:m-4 text-center text-base-content">
        Visit <Link className="text-secondary" href="/sponsor"><BanknotesIcon className="w-4 h-4 inline" /> Sponsor Page</Link> to get your Business featured here!
      </p>
    </div>
  );
}
