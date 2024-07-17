import  { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";

const SearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQueryParam = searchParams.get("search") || "";

  const handleSearch = () => {
    if (searchQuery.length === 0 && searchQueryParam) {
      setSearchParams((prev: URLSearchParams) => {
        prev.delete("search");
        return prev;
      });
      return;
    }

    setSearchParams({ search: searchQuery });
  };

  return (
    <div className="flex flex-col gap-3 w-full h-fit bg-muted p-6 rounded-lg">
      <header className="md:text-center">
        <h2>Find Agent</h2>
      </header>

      <div className="w-full pt-4 flex flex-col gap-3">
        <Input
          defaultValue={searchQueryParam}
          placeholder="Enter Agent Name, Username or Email"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className="mt-1" onClick={handleSearch}>
          Search Agent
        </Button>
      </div>
    </div>
  );
};

export default SearchContainer;
