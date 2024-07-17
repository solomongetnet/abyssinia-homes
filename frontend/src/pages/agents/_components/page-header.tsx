import Breadcrumb from "@/components/shared/breadcrumb/breadcrumb";

const PageHeader = () => {

  return (
    <header className="w-full flex justify-between items-end">
      <div className="flex flex-col gap-2 ">
        <div className="">
          <h2 className="font-semibold text-3xl">Agents</h2>
        </div>
        <Breadcrumb />
      </div>

    </header>
  );
};

export default PageHeader;
