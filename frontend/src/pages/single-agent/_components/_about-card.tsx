import { useLocation } from "react-router-dom";

const AboutCard = ({ description }: { description: string }) => {
  const location = useLocation();
  const fullName = location.search.split("=")[1].split("-").join(" "); // extracting fullName from query

  return (
    <div className="px-4 py-4 flex flex-col gap-4 w-full rounded-md shadow-md border">
      <header>
        <h2 className="font-bold text-xl">About {fullName}</h2>
      </header>
      <p>{description}</p>
    </div>
  );
};

export default AboutCard;
