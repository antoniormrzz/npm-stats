"use client";

import { useLocalStorage } from "@/app/utils/useLocalStorage.hook";
import { useEffect, useMemo, useState } from "react";
import { InstallInstructionsFallback } from "./InstallInstructionsFallback";
import { Copy } from "@phosphor-icons/react/dist/ssr";
import toast from "react-hot-toast";

const packageManagers = {
  npm: "npm",
  yarn: "yarn",
  pnpm: "pnpm",
} as const;

type PackageManager = keyof typeof packageManagers;

const packageLocations = {
  dependency: "dependency",
  devDependency: "devDependency",
  global: "global",
} as const;

type PackageLocation = keyof typeof packageLocations;

type InstallInstructionsProps = {
  name: string;
};

export const InstallInstructions = ({ name }: InstallInstructionsProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [packageManager, setPackageManager] = useLocalStorage<PackageManager>(
    "packageManager",
    packageManagers.npm
  );
  const [packageLocation, setPackageLocation] = useState<PackageLocation>(
    packageLocations.dependency
  );
  const [remove, setRemove] = useState(false);
  const [workspace, setworkspace] = useState(false);
  const command = useMemo(() => {
    if (packageManager === packageManagers.npm) {
      return `npm ${remove ? "r" : "i"} ${
        packageLocation === packageLocations.devDependency && !remove
          ? "-D "
          : packageLocation === packageLocations.global
          ? "-g "
          : ""
      }${name}${workspace ? " --workspace=<workspace-name>" : ""}`;
    } else if (packageManager === packageManagers.yarn) {
      return `yarn ${workspace ? "workspace <workspace-name> " : ""}${
        packageLocation === packageLocations.global ? "global " : ""
      }${remove ? "remove" : "add"} ${name}${
        packageLocation === packageLocations.devDependency && !remove
          ? " -D"
          : ""
      }`;
    } else if (packageManager === packageManagers.pnpm) {
      return `pnpm ${remove ? "remove" : "add"}${
        packageLocation === packageLocations.devDependency && !remove
          ? " -D"
          : packageLocation === packageLocations.global
          ? " -g"
          : ""
      } ${name}${workspace ? " --filter <workspace-name>" : ""}`;
    }
  }, [packageManager, remove, name, packageLocation, workspace]);

  const handleCopy = () => {
    toast.success("Copied to clipboard!");
    navigator.clipboard.writeText(command ?? "");
  };

  useEffect(() => {
    if (packageLocation === packageLocations.global) {
      setworkspace(false);
    }
  }, [packageLocation]);

  return isClient ? (
    <div className="border border-gray-500 rounded-lg p-2 flex flex-col gap-1 w-full">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Package Manager</span>
        </div>
        <select
          value={packageManager}
          onChange={(e) => setPackageManager(e.target.value as PackageManager)}
          className="select select-bordered"
        >
          <option value={packageManagers.npm}>npm</option>
          <option value={packageManagers.yarn}>Yarn</option>
          <option value={packageManagers.pnpm}>pnpm</option>
        </select>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Package Location</span>
        </div>
        <select
          value={packageLocation}
          onChange={(e) =>
            setPackageLocation(e.target.value as PackageLocation)
          }
          className="select select-bordered"
        >
          <option value={packageLocations.dependency}>Dependency</option>
          <option value={packageLocations.devDependency}>Dev Dependency</option>
          <option value={packageLocations.global}>Global</option>
        </select>
      </label>
      <div className="form-control w-full">
        <label className="cursor-pointer label">
          <span className="label-text">Remove</span>
          <input
            checked={remove}
            onChange={(e) => setRemove(e.target.checked)}
            type="checkbox"
            className="toggle toggle-primary"
          />
        </label>
      </div>
      <div className="form-control w-full">
        <label className="cursor-pointer label">
          <span className="label-text">workspace</span>
          <input
            checked={workspace}
            disabled={packageLocation === packageLocations.global}
            onChange={(e) => setworkspace(e.target.checked)}
            type="checkbox"
            className="toggle toggle-primary"
          />
        </label>
      </div>
      <div className="flex gap-2 w-full">
        <pre className="flex-grow overflow-x-auto p-2 bg-gray-800 rounded-lg">
          <code>{`$ ${command}`}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="btn btn-primary"
        >
          <Copy />
        </button>
      </div>
    </div>
  ) : (
    <InstallInstructionsFallback name={name} />
  );
};
