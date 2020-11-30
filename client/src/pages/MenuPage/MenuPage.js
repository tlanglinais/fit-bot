import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../utils/api";

const MenuPage = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserDetails()
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return <div className="">MenuPage</div>;
};

export default MenuPage;
