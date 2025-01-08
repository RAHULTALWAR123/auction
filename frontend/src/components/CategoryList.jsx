import { useEffect, useMemo } from "react";
import { usePlayerStore } from "../stores/usePlayerStore";
// import { useUserStore } from "../stores/useUserStore";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryPlayer from "./CategoryPlayer";

const CategoryList = () => {
  const { getPlayerCategory, marqueePlayers, batsmanPlayers, bowlerPlayers, allrounderPlayers } = usePlayerStore();
  const { category } = useParams();
  // const {users} = useUserStore();

  // Get the player list based on the current category
  const players = useMemo(() => {
    switch (category) {
      case "Marquee":
        return marqueePlayers;
      case "Batsman":
        return batsmanPlayers;
      case "Bowler":
        return bowlerPlayers;
      case "AllRounder":
        return allrounderPlayers;
      default:
        return [];
    }
  }, [category, marqueePlayers, batsmanPlayers, bowlerPlayers, allrounderPlayers]);

  // Determine the next category
  const nextCategory = useMemo(() => {
    switch (category) {
      case "Marquee":
        return "Batsman";
      case "Batsman":
        return "AllRounder";
      case "AllRounder":
        return "Bowler";// Optional: loop back to Marquee
      default:
        return "Bowler";
    }
  }, [category]);

  const prevCategory = useMemo(() => {
    switch (category) {
      case "Batsman":
        return "Marquee";
      case "AllRounder":
        return "Batsman";
      case "Bowler":
        return "AllRounder"; // Optional: loop back to Marquee
      default:
        return "Marquee";
    }
  }, [category]);

  useEffect(() => {
    getPlayerCategory(category);
  }, [getPlayerCategory, category]);

  const hasPlayersSold = players?.every((player) => player.isSold);

  // const playerIsUnsold = players?.every((player) => player.isSkippedBy.length === users.length && !player.isSold);

  return (
    <div className="min-h-screen relative overflow-hidden px-5 sm:px-10 lg:px-32 mb-5">
      <h1 className="text-center text-3xl sm:text-4xl font-extrabold">Auction Pool</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-left text-2xl sm:text-3xl font-bold mt-10 mb-10 text-white">{category}</h2>

        <div className='flex flex-col items-center gap-4'>
          {players.length > 0 ? (
            players.map((player,index) => <CategoryPlayer key={player._id} player={player} index={index} players={players} />)
          ) : (
            <p className="text-gray-500">No players available in this category.</p>
          )}
        </div>

        <div className="flex justify-center gap-5">
        <Link to={`/category/${prevCategory}`}>
          <button className="text-xl font-extrabold mt-5 py-2 px-5 rounded-xl text-black bg-gradient-to-t from-yellow-400 to-yellow-600"
        //   disabled={!hasPlayersSold}
          >
            Prev
          </button>
        </Link>
        <Link to={`/category/${nextCategory}`}>
          <button className="text-xl font-extrabold mt-5 py-2 px-5 rounded-xl text-black bg-gradient-to-t from-green-500 to-emerald-500"
          disabled={!hasPlayersSold}
          >
            Next
          </button>
        </Link>

        </div>
      </motion.div>
    </div>
  );
};

export default CategoryList;
