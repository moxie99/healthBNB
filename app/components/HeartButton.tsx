"use client";

import useFavorite from "../hooks/useFavourite";
import { SafeUser } from "../types";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    currentUser,
    listingId,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={28}
        className={hasFavorited ? "fill-green-700" : "fill-slate-500/70"}
      />
    </div>
  );
};

export default HeartButton;
