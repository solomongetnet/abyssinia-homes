import { FC } from "react";
import HeroSection from "./sections/hero.section";
import ExpolreCategoriesSection from "./sections/explore-categories.section";
import PropertiesLocation from "./sections/porperties-location.section";
import AgentSection from "./sections/agents.section";
import FeaturePropertySection from "./sections/feature-property.section";
import InfoSection from "./sections/info.section";
const HomePage: FC = () => (
  <>
    <HeroSection />
    <ExpolreCategoriesSection />
    <PropertiesLocation />
    <AgentSection />
    <FeaturePropertySection />
    <InfoSection />
  </>
);

export default HomePage;
