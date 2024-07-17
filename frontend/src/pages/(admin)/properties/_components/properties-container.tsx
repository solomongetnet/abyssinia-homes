import { useEffect } from "react";
import {
  useGetPropertiesQuery,
} from "@/api/services/property.service";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomNavigate from "@/utils/navigate";
import { format } from "date-fns";
import DeletePropertyBtn from "./_delete-property-btn";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/shared/pagination/pagination";
import { Link } from "react-router-dom";

function PropertiesContainer({ setTotalPropertiesCount, ...props }: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { isLoading, isError, data } = useGetPropertiesQuery({
    page: Number(page),
    limit: 10,
  });

  const onPageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  useEffect(() => {
    setTotalPropertiesCount(data?.totalCount);
  }, [data]);

  if (isLoading) {
    return (
      <div className="pb-[50vh] h-[100vh] w-full flex justify-center items-center ">
        <Loader />
      </div>
    ); // Show loading indicator while fetching data
  }

  if (isError) {
    return (
      <div className="flex-1 w-full mt-32 flex justify-center ">
        <div className="text-lg">Something went wrong please try again</div>
      </div>
    ); // Show error message if fetching data fails
  }

  if (!data || data.properties.length === 0) {
    return (
      <div className="flex-1 w-full my-32 flex justify-center ">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-xl font-bold">Oops! No Properties</h2>
          <p className="text-md font-light leading-tight">
            You need to add at least <br />
            one property today
          </p>
          <CustomNavigate to="/account/add-new-property">
            <Button className="rounded-full mt-4">Add new propery</Button>
          </CustomNavigate>
        </div>
      </div>
    ); // Show error message if fetching data fails
  }

  return (
    <div {...props} className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Title</TableHead>
              <TableHead className="flex-1">DATE PUBLISHED</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Feature</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.properties?.map((property) => (
              <TableRow key={property?._id}>
                <TableCell className="w-[500px] cursor-pointer">
                  <Link
                    to={"/properties/" + property._id}
                    className="flex gap-2 items-center"
                  >
                    <div className="h-[120px] min-w-[220px]  max-w-[220px] overflow-hidden rounded-lg">
                      <img
                        src={property.images[0]}
                        alt="Property Image"
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col">
                      <h2 className="text-pretty line-clamp-1 font-bold text-lg  ">
                        {property.title}
                      </h2>
                      <p>
                        {property.price?.amount} {property.price?.currency}
                      </p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  {format(property.createdAt!, "yyyy-MM-dd")}
                </TableCell>
                <TableCell>Published</TableCell>
                <TableCell>No</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col gap-1">
                    <CustomNavigate
                      to={`/account/edit-property/${property._id}`}
                      className="w-full"
                    >
                      <Button className="w-full" variant={"outline"}>
                        Edit
                      </Button>
                    </CustomNavigate>
                    {property.propertyStatus === "for rent" ? (
                      <Button variant={"outline"}>Rented</Button>
                    ) : (
                      <Button variant={"outline"}>Sold</Button>
                    )}
                    <DeletePropertyBtn
                      label="Delete"
                      propertyId={property._id}
                      variant={"outline"}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>A list of your properties</TableCaption>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center md:justify-end">
        <Pagination
          currentPage={data.currentPage}
          onPageChange={onPageChange}
          totalPages={data.totalPages}
        />
      </div>
    </div>
  );
}

export default PropertiesContainer;
