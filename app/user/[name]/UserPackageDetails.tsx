"use client";

import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { type Period, period as periodConst } from "@/app/types/period";
import { DownloadData, DownloadInfo } from "@/app/types/download";

function handleErrors(response: Response) {
  if (!response.ok) {
    if (response.status === 404) {
      throw "not-found";
    }
    throw Error(response.statusText);
  }
  return response;
}

type UserPackageDetailsProps = {
  name: string;
  period: Period;
};

export const UserPackageDetails = ({
  name,
  period,
}: UserPackageDetailsProps) => {
  const [loaded, setLoaded] = useState(false);
  const [packageData, setPackageData] = useState<DownloadData | null>();
  const [totalDownloads, setTotalDownloads] = useState(0);

  useEffect(() => {
    fetch(`https://api.npmjs.org/downloads/range/${period}/${name}`)
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPackageData(data);
        setTotalDownloads(
          data.downloads.reduce(
            (accumulator: number, currentValue: DownloadInfo) => {
              return accumulator + currentValue.downloads;
            },
            0
          )
        );
        setLoaded(true);
      })
      .catch((e) => {
        toast.error("Error fetching package data for " + name);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [name, period]);

  return (
    <>
      {packageData && loaded ? (
        <h3 className="">Total downloads: {totalDownloads}</h3>
      ) : null}
      {packageData && loaded ? (
        period !== periodConst.daily ? (
          <Box sx={{ flexGrow: 1 }}>
            <SparkLineChart
              data={packageData.downloads.map((d) => +d.downloads)}
              xAxis={{
                scaleType: "time",
                data: packageData.downloads.map((d) => new Date(d.day)),
                valueFormatter: (value) => value.toISOString().slice(0, 10),
              }}
              height={100}
              showTooltip
              showHighlight
            />
          </Box>
        ) : null
      ) : (
        <div className="skeleton w-full h-full"></div>
      )}
    </>
  );
};
