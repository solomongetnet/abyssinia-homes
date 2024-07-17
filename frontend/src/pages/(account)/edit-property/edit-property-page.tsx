import { useNavigate, useParams } from "react-router-dom";
import EditContainer from "./_components/edit-container";

const EditPropertyPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  if (!propertyId) {
    navigate("/");
    return;
  }

  return (
    <div className="min-h-screen space-y-10">
      <header className="" data-aos="fade-left">
        <h2 className="text-2xl font-semibold">Edit Property</h2>
      </header>

      <main
        className="min-h-[50vh] flex flex-col gap-8 w-full bg-background rounded-lg p-6"
        data-aos="fade-up"
      >
        <EditContainer propertyId={propertyId} />
      </main>
    </div>
  );
};

export default EditPropertyPage;
