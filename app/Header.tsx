import Link from "next/link";
import Image from "next/image";
import { BanknotesIcon, CodeBracketIcon, HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";


export function Header() {
  return (
    <header className="navbar bg-base-100 sticky top-0 z-20">
      <div className="flex-1 ml-2">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="npm stats"
            width={68}
            height={36}
          />
        </Link>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <span className="md:flex hidden">
            <li>
              <Link
                href="/"
              >
                <MagnifyingGlassIcon className="w-4 h-4" />
                Search
              </Link>
            </li>
            <li>
              <Link
                href="/about"
              >
                <HeartIcon className="w-4 h-4" />
                About
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/antoniormrzz/npm-stats"
                target="_blank"
              >
                <GithubLogo className="w-4 h-4" />
                Repo
              </a>
            </li>
            <li>
              <Link
                href="/sponsor"
              >
                <BanknotesIcon className="w-4 h-4" />
                Sponsor
              </Link>
            </li>
          </span>
          <li className="md:hidden block">
            <details>
              <summary>
                more
              </summary>
              <ul className="p-2 bg-base-100 rounded-t-none right-1">
                <li>
                  <Link
                    href="/"
                  >
                    <MagnifyingGlassIcon className="w-4 h-4" />
                    Search
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                  >
                    <HeartIcon className="w-4 h-4" />
                    About
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/antoniormrzz/npm-stats"
                    target="_blank"
                  >
                    <GithubLogo className="w-4 h-4" />
                    Repo
                  </a>
                </li>
                <li>
                  <Link
                    href="/sponsor"
                  >
                    <BanknotesIcon className="w-4 h-4" />
                    Sponsor
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </header>
  );
}