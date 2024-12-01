/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { useUserStore } from "../stores/useUserStore";
// import { useUserStore } from "../stores/useUserStore";

const TeamSkip = ({ user1 }) => {

  // const {getSkippedUser} = useUserStore();
  const [logo, setLogo] = useState("none");


  const bg = (() => {

    if (user1.username === "RCB") {
      return "from-black to-red-600";
    } else if (user1.username === "MI") {
      return "from-yellow-500 to-blue-600";
    } else if (user1.username === "CSK") {
      return "from-yellow-500 to-yellow-800";
    } else if (user1.username === "RR") {
      return "from-pink-500 to-blue-500";
    }

    return "black"; // Default background
  })();

  useEffect(() => {
    if (user1.username === "RCB") {
      setLogo("/RCB.webp");
    } else if (user1.username === "MI") {
      setLogo("/MI.webp");
    } else if (user1.username === "CSK") {
      setLogo("/CSK.webp");
    } else if (user1.username === "RR") {
      setLogo("/RR.webp");
    }
    else if (user1.username === "DC") {
      setLogo("/DC.webp");
    }
    else if (user1.username === "KKR") {
      setLogo("/KKR.webp");
    }
    else if (user1.username === "SRH") {
      setLogo("/SRH.webp");
    }
    else if (user1.username === "PBKS") {
      setLogo("/PBKS.webp");
    }
  }, [user1.username]);

  // useEffect(() => {
  //   getSkippedUser(playerId);
  // },[ getSkippedUser, playerId ]);

  return (
<div className={`flex items-center gap-2 sm:gap-4 p-2 bg-gradient-to-r ${bg} rounded-md`}>
  <img src={logo} alt={`${user1.username} logo`} className="h-8 w-8 sm:h-10 sm:w-10 rounded-full shadow-md" />
  <div className="text-sm sm:text-base font-bold">{user1.username}</div>
  <p className="ml-auto text-xs sm:text-sm">Squad: {user1.team.length}</p>
</div>

  );
};

export default TeamSkip;

