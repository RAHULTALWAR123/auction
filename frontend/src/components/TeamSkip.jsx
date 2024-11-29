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
  }, [user1.username]);

  // useEffect(() => {
  //   getSkippedUser(playerId);
  // },[ getSkippedUser, playerId ]);

  return (
    <div className={`border border-gray-600 flex items-center gap-4 bg-gradient-to-r ${bg} p-2`}>
      <img src={logo} alt={`${user1.username} logo`} className="h-10 w-10 rounded-full shadow-md" />
      {user1.username}
      <p className='relative left-28'>
      Squad : {user1.team.length}
      </p>
    </div>
  );
};

export default TeamSkip;
