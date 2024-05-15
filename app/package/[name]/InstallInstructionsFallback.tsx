import { Copy } from "@phosphor-icons/react/dist/ssr";

type InstallInstructionsFallbackProps = {
  name: string;
};

export const InstallInstructionsFallback = ({ name }: InstallInstructionsFallbackProps) => {
  return (
    <div className="border border-gray-500 rounded-lg p-2 flex flex-col gap-1 w-full">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Package Manager</span>
        </div>
        <select className="select select-bordered">
          <option>npm</option>
          <option>Yarn</option>
          <option>pnpm</option>
        </select>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Package Location</span>
        </div>
        <select className="select select-bordered">
          <option>Dependency</option>
          <option>Dev Dependency</option>
          <option>Global</option>
        </select>
      </label>
      <div className="form-control w-full">
        <label className="cursor-pointer label">
          <span className="label-text">Remove</span>
          <input type="checkbox" className="toggle toggle-primary" />
        </label>
      </div>
      <div className="form-control w-full">
        <label className="cursor-pointer label">
          <span className="label-text">Workplace</span>
          <input type="checkbox" className="toggle toggle-primary" />
        </label>
      </div>
      <div className="flex gap-2 w-full">
        <pre className="flex-grow overflow-x-auto p-2 bg-gray-800 rounded-lg">
          <code>{`$ npm install ${name}`}</code>
        </pre>
        <button className="btn btn-primary"><Copy /></button>
      </div>
    </div>
  );
};
