
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Promotions from "./pages/Promotions";

function App() {
  const[count,setCount] = useState(0)
  return (
    
   <>
   {/* <Dashboard/> */}
   <Promotions/>
   </>
  );
}

export default App;