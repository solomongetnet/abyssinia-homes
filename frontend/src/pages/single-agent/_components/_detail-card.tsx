import { MdAlternateEmail, MdVerified } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
export const DetailCard = ({ data }: { data: any }) => {
  return (
    <div className="overflow-hidden px-4 py-4 flex max-md:flex-col gap-4  w-full rounded-md shadow-md border ">
      {/* left */}
      {data.avatar && (
        <div className="h-[250px] w-full md:w-[40%] flex justify-center items-center">
          <div className="w-full max-md:aspect-video md:h-full rounded-md relative overflow-hidden">
            <img className="size-full object-cover" src={data?.avatar} />
          </div>
        </div>
      )}

      {/* right */}
      <div className="max-md:pt-3 flex-1 flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col max-lg:hidden">
            <div className="flex items-center gap-1">
              <MdVerified className="text-lg text-facebook" />
              <h2 className="font-[700] text-lg">{data.fullName}</h2>
            </div>
            <p className="font-[100] text-sm">
              {data.properties.length || 0} Properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-row-3 gap-4">
            <div className="flex items-center gap-3 group cursor-pointer ">
              <span className="size-[40px] grid place-content-center bg-muted group-hover:bg-primary transition rounded-full ">
                <CiPhone className="text-xl group-hover:text-white " />
              </span>

              <div className="flex flex-col">
                <h2 className="text-sm font-bold">Phone</h2>
                <p className="text-sm">{data.phoneNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer ">
              <span className="size-[40px] grid place-content-center bg-muted group-hover:bg-primary transition rounded-full ">
                <CiPhone className="text-xl group-hover:text-white" />
              </span>

              <div className="flex flex-col">
                <h2 className="text-sm font-bold">Office</h2>
                <p className="text-sm">{data.officeNumber || "_"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer ">
              <span className="size-[40px] grid place-content-center bg-muted group-hover:bg-primary transition rounded-full ">
                <MdAlternateEmail className="text-xl group-hover:text-white" />
              </span>

              <div className="overflow-hidden w-full flex flex-col">
                <h2 className="text-sm font-bold">Email</h2>
                <p className="text-sm break-words whitespace-normal overflow-hidden">
                  {data.email}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h2 className="font-[100] text-muted-foreground text-sm">
              {data.company && `Working at ${data.company}`}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
