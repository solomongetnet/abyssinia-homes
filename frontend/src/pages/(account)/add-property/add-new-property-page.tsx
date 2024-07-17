import BasicStep from "./_components/basic-step";
import { useEffect } from "react";
import AddressStep from "./_components/location-step";
import StepTabs from "./_components/common/_step-tabs";
import AdditionalStep from "./_components/additional-step";
import MediaStep from "./_components/media-step";
import { useSearchParams } from "react-router-dom";

const AddNewPropertyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = parseInt(searchParams.get("step") || "1");

  useEffect(() => {
    scrollTo(0, 0);
    if (currentStep > 4) {
      setSearchParams({ step: "1" });
    }
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep >= 5) return;
    setSearchParams({ step: (currentStep + 1).toString() });
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setSearchParams({ step: (currentStep - 1).toString() });
    }
  };

  return (
    <div className="min-h-screen space-y-10">
      <header className="" data-aos="fade-left">
        <h2 className="text-2xl font-semibold">Add Property</h2>
      </header>

      <main
        className="h-fit flex flex-col gap-8 w-full bg-background rounded-lg p-3 pb-6"
        data-aos="fade-up"
      >
        <StepTabs currentStep={currentStep} />

        <div className="flex-1 w-full h-fit">
          {currentStep === 1 && (
            <BasicStep
              nextStep={handleNextStep}
              prevStep={handlePreviousStep}
            />
          )}
          {currentStep === 2 && (
            <AddressStep
              nextStep={handleNextStep}
              prevStep={handlePreviousStep}
            />
          )}
          {currentStep === 3 && (
            <AdditionalStep
              nextStep={handleNextStep}
              prevStep={handlePreviousStep}
            />
          )}
          {/* Property will submit here in this step / last step */}
          {currentStep === 4 && <MediaStep prevStep={handlePreviousStep} />}
        </div>
      </main>
    </div>
  );
};

export default AddNewPropertyPage;
