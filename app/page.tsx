import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div className="flex flex-row justify-center items-center h-full w-full">
        <h1 className="text-green-700">Welcome to HealthBNB</h1>
      </div>
    </div>
  );
}
