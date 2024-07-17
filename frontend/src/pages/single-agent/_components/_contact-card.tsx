import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactCard = () => {
  return (
    <div className="w-full h-fit p-4 flex flex-col gap-4 shadow-lg rounded-md border">
      <header>
        <h2 className="font-bold text-xl">Contact Agent</h2>
      </header>

      <form action="" className="w-full flex flex-col gap-2">
        <Input placeholder="Your full name" />
        <Input placeholder="Phone number" />
        <Input placeholder="Email address" />
        <Textarea className="h-[150px]" placeholder="Your message here" />
        <Button className="mt-2" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContactCard;
