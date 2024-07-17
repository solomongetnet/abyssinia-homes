import { useRemovePropertyFromFavoriteMutation } from "@/api/services/favorite.service";
import { Button } from "@/components/ui/button";

const RemoveFromFavBtn = ({ propertyId }: { propertyId: any }) => {
  const [removeFromFav, { isLoading: isRemoving }] =
    useRemovePropertyFromFavoriteMutation();

  const handleRemoveFromFav = () => {
    removeFromFav(propertyId);
  };

  return (
    <Button
      className=""
      disabled={isRemoving}
      variant={"outline"}
      onClick={handleRemoveFromFav}
    >
      {isRemoving ? "loading..." : "Remove"}
    </Button>
  );
};

export default RemoveFromFavBtn;
