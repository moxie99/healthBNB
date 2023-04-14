"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType;
  name: string;
  selected?: boolean;
  onClick: (value: string) => void;
}
const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  name,
  selected,
  onClick,
}) => {
  return (
    <div onClick={() => onClick(name)} 
   
    className={
        `rounded-xl
         border-2 p-3
          flex flex-col gap-2 hover:border-black
        transition 
        cursor-pointer
     ${selected ? "border-black" : "border-slate-300"}
    `}>
      <Icon size={28}/>

      <div className="font-semibold">
        {name}
      </div>
    </div>
  );
};

export default CategoryInput;
