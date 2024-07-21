const CompanyDetailCard = ({ company }: { company: string }) => {
  return (
    <div className="py-8 px-4 sm:px-8 w-full h-fit bg-background rounded-lg shadow-md border-2">
      <div className="w-full flex flex-col gap-6">
        <h2 className="text-lg font-bold">Company</h2>
      </div>
      <h2>{company}</h2>
    </div>
  );
};

export default CompanyDetailCard;
