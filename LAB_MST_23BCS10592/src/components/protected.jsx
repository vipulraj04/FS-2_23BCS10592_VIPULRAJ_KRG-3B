import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext/isAuthenticated";

const Protected = ({children})=>{
  const {isAuthenticated} =useAuth();

  if (!isAuthenticated){
    return <Navigate to="/login"/>;
  }
  return children;
};
export default Protected;