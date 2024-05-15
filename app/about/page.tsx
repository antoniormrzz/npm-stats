import { BanknotesIcon } from "@heroicons/react/24/outline";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

export default function About() {
  return (
    <div className="flex-grow min-w-full p-4 prose">
      <h1>About</h1>
      <p>
        This website is the second iteration of a project I started in 2020 to
        be able to see all of my packages and their download statistics in one
        place. The first version was a single page React Ionic app that used the
        npm API to get the data. This one should be more convenient and faster.
        Years later, it still seems to be the only user statistics provider for npm.         
        I would like to thank the npm developers (no, literally, the team behind
        npm) for their help on twitter around the time I started the first
        version.
      </p>
      <p>
        The source code is available on{" "}
        <a href="https://github.com/antoniormrzz/npm-stats" target="_blank">
          GitHub <GithubLogo className="w-4 h-4 inline" />
        </a>
      </p>
      <p>
        If you would like to sponsor this project, and have your ad on the website, you can do so on{" "}
        <a href="/sponsor">
          the sponsor page <BanknotesIcon className="w-4 h-4 inline" />
        </a>
      </p>
      <p>
        I{"'"}m usually available for hire, you can see my work on{" "}
        <a href="https://github.com/antoniormrzz/npm-stats" target="_blank">
          GitHub <GithubLogo className="w-4 h-4 inline" />
        </a>
        , and{" "}
        <a
          href="https://www.upwork.com/freelancers/~01202edf6c9ad06f4a"
          target="_blank"
        >
          Upwork
        </a>
        . <br />
        You can also contact me at{" "}
        <a href="mailto:sepehralizade@live.com">my email.</a>
      </p>
    </div>
  );
}
