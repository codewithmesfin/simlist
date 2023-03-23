import React, { useEffect, useState } from "react";


const useAuthenticated = () => {
 
  const [authenticated, setAuthentiacted] = useState(false);



  return { authenticated };
};
export default useAuthenticated;
