import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
  fullName?: string;
  username?: string;
}

const NavigateToAgentBtn: FC<IProps> = ({
  children,
  fullName,
  username,
  ...props
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/agents/${username}${fullName && `?fullName=${fullName}`}`);
  };
  
  return (
    <div {...props} className="cursor-pointer" onClick={handleNavigate}>
      {children}
    </div>
  );
};

export default NavigateToAgentBtn;