import { Button } from "@/components/ui/button";
import { format } from "timeago.js";
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
import { Link, useSearchParams } from "react-router-dom";
import { useFetchUsersQuery } from "@/api/services/user.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeleteUserBtn from "./_delete-user";
import { useEffect } from "react";
import Pagination from "@/components/shared/pagination/pagination";

function UsersContainer({ setTotalPropertiesCount, ...props }: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";

  const { isLoading, isError, data } = useFetchUsersQuery({
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
      <div className="h-[70vh] flex justify-center items-center">
        <Loader />
      </div>
    ); // Show loading indicator while fetching data
  }

  if (isError) {
    return (
      <div className=" h-[70vh] flex justify-center items-center">
        <div className="text-lg">Something went wrong please try again</div>
      </div>
    ); // Show error message if fetching data fails
  }

  if (!data || data.users.length === 0) {
    return (
      <div className="flex-1 w-full my-32 flex justify-center ">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-xl font-bold">Oops! No Properties</h2>
          <p className="text-md font-light leading-tight">
            You need to add at least <br />
            one user today
          </p>
          <CustomNavigate to="/account/add-new-user">
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
              <TableHead className="w-[400px]">Detail</TableHead>
              <TableHead className="flex-1">Role</TableHead>
              <TableHead>Join at</TableHead>
              <TableHead>Properties</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.users?.map((user) => (
              <TableRow key={user?._id}>
                <TableCell className="w-[400px] cursor-pointer">
                  <Link
                    to={"/properties/" + user._id}
                    className="flex gap-2 items-center"
                  >
                    <Avatar>
                      <AvatarFallback>{user.fullName?.at(0)}</AvatarFallback>
                      <AvatarImage src={user.avatar} />
                    </Avatar>

                    <div className="flex flex-col">
                      <h2 className="text-pretty line-clamp-1 font-bold text-lg  ">
                        {user.fullName}
                      </h2>
                      <p>{user.email}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell>{format(user?.createdAt as number)}</TableCell>
                <TableCell>{user.properties?.length || 0}</TableCell>
                <TableCell>No</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col gap-1">
                    <DeleteUserBtn userId={user._id} label="Delete" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>A List of all users</TableCaption>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center md:justify-end">
        {
          <Pagination
            currentPage={data.currentPage}
            onPageChange={onPageChange}
            totalPages={data.totalPages}
          />
        }
      </div>
    </div>
  );
}

export default UsersContainer;
