"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import queryString from "query-string";
import { useCallback } from "react";
interface CategoryCardProps {
  icon: IconType;
  name: string;
  selected?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon: Icon,
  name,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: name,
    };

    if (params?.get("category") === name) {
      delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [name, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-slate-800
        transition
        cursor-pointer
        ${selected ? "border-b-slate-800" : "border-transparent"}
        ${selected ? "text-slate-800" : "text-slate-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{name}</div>
    </div>
  );
};

export default CategoryCard;
