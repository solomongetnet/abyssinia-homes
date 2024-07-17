import agentOne from "@/assets/images/agent-2.webp";
import agentTwo from "@/assets/images/agent-3.webp";
import agentFour from "@/assets/images/agent-4.webp";
import agentThree from "@/assets/images/agent-5.webp";
import agentFive from "@/assets/images/agent-6.webp";
import agentSix from "@/assets/images/agent-7.webp";
interface TAgents {
  name: string;
  phone: string;
  properties: number;
  img: string;
} 

export const agents: TAgents[] = [
  {
    name: "Solomon Getnet",
    phone: "0911867911",
    properties: 1900,
    img: agentTwo,

  },
  {
    name: "Samueal Birhan",
    phone: "0944234824",
    properties: 340,
    img: agentThree,
  },
  {
    name: "Eyob Daniel",
    phone: "0975638319",
    properties: 970,
    img: agentThree,
  },
  {
    name: "Abigial Samson",
    phone: "0989867911",
    properties: 232,
    img: agentFour,
  },
  {
    name: "Mikiyas Amlaku",
    phone: "0930424242",
    properties: 120,
    img: agentFive,
  },
  {
    name: "Amanueal Mulubirhan",
    phone: "0910534976",
    properties: 233,
    img: agentSix,
  },
  {
    name: "Eleni Tamrat",
    phone: "0932233833",
    properties: 340,
    img: agentOne,
  },
  {
    name: "Noah Adana",
    phone: "0975638319",
    properties: 970,
    img: agentThree,
  },

];
