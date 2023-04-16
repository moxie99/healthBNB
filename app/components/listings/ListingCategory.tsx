'use client';

import { IconType } from "react-icons";

interface CategoryViewProps {
  icon: IconType,
  name: string,
  description: string
}

const CategoryView: React.FC<CategoryViewProps> = ({ 
  icon: Icon,
  name,
  description
 }) => {
  return ( 
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-slate-600" />
        <div className="flex flex-col">
            <div 
              className="text-lg font-semibold"
            >
              {name}
            </div>
            <div 
              className="text-slate-500 font-light"
            >
              {description}
            </div>
        </div>
      </div>
    </div>
   );
}
 
export default CategoryView;