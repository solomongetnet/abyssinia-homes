import { useState } from "react";
import FavoriteContainer from "./_components/favorite-container";

const MyFaovritePage = () => {
  const [totalFavoritesCount, setTotalFavoritesCount] = useState(0);
  
  return (
    <div className="space-y-10">
      <header
        className="flex items-center justify-between"
        data-aos="fade-left"
      >
        <h2 className="text-2xl font-semibold">My Favorites</h2>
        <p className="text-sm text-muted-foreground">
          {totalFavoritesCount} Favorites Found
        </p>
      </header>

      <main
        className="space-y-4 h-fit w-full bg-background rounded-lg p-3 pb-6"
        data-aos="fade-up"
      >
        <FavoriteContainer setTotalFavoritesCount={setTotalFavoritesCount} />
      </main>
    </div>
  );
};

export default MyFaovritePage;
