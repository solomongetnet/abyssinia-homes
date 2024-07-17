import AvatarContainer from "./_components/avatar-container";
import InformationContainer from "./_components/information-container";
import SocialMediaContainer from "./_components/social-media-container";
import PasswordContainer from "./_components/password-container";
import EmailContainer from "./_components/email-container";
import useAuth from "@/hooks/use-auth";

const DashboardPage = () => {
  const { role } = useAuth();
  return (
    <div className="min-h-screen space-y-10">
      <header data-aos="fade-left">
        <h2 className="text-2xl font-semibold">Account Settings</h2>
      </header>

      <main
        className="space-y-4 h-fit w-full bg-background rounded-lg p-6 pb-6"
        data-aos="fade-up"
      >
        <div className="w-full space-y-10">
          {/* Avatar  */}
          <AvatarContainer />

          {/* Email  */}
          <EmailContainer />
          
          {/* Infomrmation */}
          {<InformationContainer />}

          {/* Social Media  */}
          {role === "agent" && <SocialMediaContainer />}

          {/* Password Setting */}
          <PasswordContainer />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
