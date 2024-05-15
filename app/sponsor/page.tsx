import { BanknotesIcon } from "@heroicons/react/24/outline";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

export default function Sponsor() {
  return (
    <div className="flex-grow min-w-full p-4 prose">
      <h1>Support this project:</h1>
      <p>
        If you have an online product or service, related to software development, that you would like to promote, you can sponsor this project and have your brand on the website.
        The ad will be displayed on the home page, and will be visible to all visitors. <br />
        All kinds of businesses are welcome, as long as they are safe for work, and not harmful/illegal. <br />
        Depending on other sponsorships, the banner might be displayed for a shorter time or in a less prominent position. All such cases will be discussed with the sponsor beforehand. <br />
      </p>
      <p>
        You may contact me at{" "}
        <a href="mailto:sepehralizade@live.com">my email.</a> to discuss the details.
      </p>
      <p>
        Thank you for your support!
      </p>
    </div>
  );
}
