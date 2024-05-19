import type { MetadataRoute } from "next";
import { popularPackages } from "./utils/npmrank";
import { urlEncodeText } from "./utils/urlEncodeDecode";

export default function sitemap(): MetadataRoute.Sitemap {

  return [
    {
      url: "https://www.npmstats.info",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...popularPackages.map((name) => ({
      url: `https://www.npmstats.info/package/${urlEncodeText(name)}?period=last-month`,
      lastModified: new Date(),
      changeFrequency: "monthly" as any,
      priority: 0.8,
    })),
    {
      url: "https://www.npmstats.info/user/sindresorhus?period=last-month",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: "https://www.npmstats.info/user/antoniormrzz?period=last-month",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: "https://www.npmstats.info/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://www.npmstats.info/sponsor",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
