"use client";

import { DownloadInfo } from "@/app/types/download";
import { Period } from "@/app/types/period";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

// function handleErrors(response: Response) {
//   if (!response.ok) {
//     if (response.status === 404) {
//       throw "not-found";
//     }
//     throw Error(response.statusText);
//   }
//   return response;
// }

type PackageDownloadStatsProps = {
  name: string;
  period: Period;
  downloads: DownloadInfo[];
};

export const PackageDownloadStats = ({
  name,
  period,
  downloads,
}: PackageDownloadStatsProps) => {
  // const [period, setPeriod] = useState(defaultPeriod);
  // const [downloads, setDownloads] = useState(defaultDownloads);
  // const [totalDownloads, setTotalDownloads] = useState(
  //   defaultDownloads.reduce(
  //     (accumulator: number, currentValue: DownloadInfo) => {
  //       return accumulator + currentValue.downloads;
  //     },
  //     0
  //   )
  // );

  // const isFirstRender = useRef(true);

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }
  //   fetch(`https://api.npmjs.org/downloads/range/${period}/${name}`)
  //     .then(handleErrors)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setDownloads(data.downloads);
  //     })
  //     .catch((e) => {
  //       toast.error("Error fetching package data for " + name);
  //     });
  // }, [name, period]);

  return (
      <SparkLineChart
        data={downloads.map((d) => +d.downloads)}
        title={`Downloads for ${name}`}
        xAxis={{
          scaleType: "time",
          data: downloads.map((d) => new Date(d.day)),
          valueFormatter: (value) => value.toISOString().slice(0, 10),
        }}
        height={200}
        showTooltip
        showHighlight
      />
  );
};
