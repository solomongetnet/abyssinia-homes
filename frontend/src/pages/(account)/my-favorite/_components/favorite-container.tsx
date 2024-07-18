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
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/shared/pagination/pagination";
import { useFetchFavoritePropertiesQuery } from "@/api/services/favorite.service";
import { useEffect } from "react";
import RemoveFromFavBtn from "./_remove-from-fav-btn";
import { Link } from "react-router-dom";

function FavoritesContainer({ setTotalFavoritesCount, ...props }: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { isLoading, isError, data } = useFetchFavoritePropertiesQuery({
    page: Number(page),
    limit: 7,
  });

  useEffect(() => {
    setTotalFavoritesCount(data?.totalCount);
  }, [data?.totalCount]);

  const onPageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (isLoading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <Loader />
      </div>
    ); // Show loading indicator while fetching data
  }

  if (isError) {
    return (
      <div className="flex-1 w-full h-[70vh] flex justify-center items-center ">
        <div className="text-lg">Something went wrong please try again</div>
      </div>
    ); // Show error message if fetching data fails
  }

  if (!data || data.favorites.length === 0) {
    return (
      <div className="flex-1 w-full h-[70vh] flex justify-center items-center ">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-xl font-bold">Oops! No Favorite Properties</h2>
          <p className="text-md font-light leading-tight">
            You need to add at least <br />
            one property today
          </p>
          <CustomNavigate to="/properties">
            <Button className="rounded-full mt-4">Explore properties</Button>
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
            {data?.favorites?.map((property: any) => (
              <TableRow key={property?._id}>
                <TableCell className="w-[500px]">
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
                  <div className="flex flex-col ">
                    <RemoveFromFavBtn propertyId={property._id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>A list of your favorites favorites</TableCaption>
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

export default FavoritesContainer;
