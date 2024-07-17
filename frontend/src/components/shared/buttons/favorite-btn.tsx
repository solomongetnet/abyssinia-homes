import {
  useAddPropertyToFavoriteMutation,
  useRemovePropertyFromFavoriteMutation,
} from "@/api/services/favorite.service";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const FavoriteBtn = ({ propertyId }: { propertyId: any }) => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [addToFovrite, { isLoading: isAdding }] =
    useAddPropertyToFavoriteMutation();
  const [removeToFavorite, { isLoading: isRemoving }] =
    useRemovePropertyFromFavoriteMutation();

  const handleRemoveFromFavorite = async () => {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }

    try {
      await removeToFavorite(propertyId).unwrap();
    } catch (error) {}
  };

  const handleAddToFavorite = async () => {
    // If user not login navigate to login page
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }

    try {
      await addToFovrite(propertyId).unwrap();
    } catch (error) {}
  };

  if (user?.favorites?.includes(propertyId)) {
    return (
      <Button
        size={"icon"}
        variant={"outline"}
        className="z-20 cursor-pointer"
        onClick={handleRemoveFromFavorite}
        disabled={isRemoving || isAdding}
      >
        {isRemoving || isAdding ? (
          <Loader2 className="animate-spin size-[20px] " />
        ) : (
          <IoHeart className="text-xl text-primary transition" />
        )}
      </Button>
    );
  }

  return (
    <Button
      size={"icon"}
      variant={"outline"}
      className="z-20 cursor-pointer"
      onClick={handleAddToFavorite}
      disabled={isRemoving || isAdding}
    >
      {isRemoving || isAdding ? (
        <Loader2 className="animate-spin size-[20px] " />
      ) : (
        <IoHeartOutline className="text-xl text-foreground transition" />
      )}
    </Button>
  );
};

export default FavoriteBtn;
