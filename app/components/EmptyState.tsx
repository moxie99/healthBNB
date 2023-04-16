"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";
interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  btnLabel?: string;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try another option please",
  showReset,
  btnLabel,
}) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-3 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />

      <div className="w-48">
        {showReset && (
          <Button
            outline
            label={btnLabel || "Remove all filters"}
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
