"use client";
import Container from "../Container";
import {
  TbBeach,
  TbThermometer,
  TbTestPipe2,
  TbPills,
  TbBabyCarriage,
  TbHeartbeat,
  TbRun,
  TbLungs,
  TbBrain,
  TbVirus,
  TbEar,
  TbEye,
} from "react-icons/tb";

import { RiSurgicalMaskLine, RiMentalHealthFill } from "react-icons/ri";
import { FaXRay, FaBabyCarriage, FaWheelchair, FaFire } from "react-icons/fa";
import { GiKidneys, GiStomach } from "react-icons/gi";
import {
  MdOutlineBabyChangingStation,
  MdOutlinePregnantWoman,
  MdBloodtype,
  MdEmergency,
} from "react-icons/md";
import { GiCancer, GiBrain } from "react-icons/gi";
import CategoryCard from "../CategoryCard";
import { BiBone } from "react-icons/bi";
import { useSearchParams, usePathname } from "next/navigation";
export const hospitalUnits = [
  {
    name: "Emergency",
    description: "Department for immediate medical attention",
    icon: MdEmergency,
  },
  {
    name: "Operating Room",
    description: "Surgical room for operations",
    icon: RiSurgicalMaskLine,
  },
  {
    name: "ICU",
    description: "Intensive care unit for critically ill patients",
    icon: TbThermometer,
  },
  {
    name: "Lab",
    description: "Laboratory for medical testing and research",
    icon: TbTestPipe2,
  },
  {
    name: "Radiology",
    description: "Department for diagnostic imaging tests",
    icon: FaXRay,
  },
  {
    name: "Pharmacy",
    description: "Dispensary for medication",
    icon: TbPills,
  },
  {
    name: "Pediatrics",
    description: "Unit for medical care of infants, children, and adolescents",
    icon: MdOutlineBabyChangingStation,
  },
  {
    name: "Maternity",
    description: "Ward for childbirth and maternal care",
    icon: MdOutlinePregnantWoman,
  },
  {
    name: "NICU",
    description: "Intensive care unit for newborn babies",
    icon: FaBabyCarriage,
  },
  {
    name: "Cardiology",
    description: "Unit for diagnosis and treatment of heart diseases",
    icon: TbHeartbeat,
  },
  {
    name: "Oncology",
    description: "Unit for diagnosis and treatment of cancer",
    icon: GiCancer,
  },
  {
    name: "Psychiatry",
    description: "Unit for diagnosis and treatment of mental illness",
    icon: RiMentalHealthFill,
  },
  {
    name: "Rehab",
    description: "Unit for medical rehabilitation and physical therapy",
    icon: FaWheelchair,
  },
  {
    name: "Dialysis",
    description: "Unit for kidney dialysis treatment",
    icon: GiKidneys,
  },
  {
    name: "Endoscopy",
    description:
      "Unit for diagnostic and therapeutic procedures using an endoscope",
    icon: GiStomach,
  },
  {
    name: "PT",
    description: "Unit for physical therapy and rehabilitation",
    icon: TbRun,
  },
  {
    name: "Hematology",
    description: "Unit for diagnosis and treatment of blood disorders",
    icon: MdBloodtype,
  },
  {
    name: "Gastro",
    description:
      "Unit for diagnosis and treatment of digestive system diseases",
    icon: GiStomach,
  },
  {
    name: "Pulmonology",
    description: "Unit for diagnosis and treatment of lung diseases",
    icon: TbLungs,
  },
  {
    name: "Neurology",
    description: "Unit for diagnosis and treatment of nervous system disorders",
    icon: TbBrain,
  },
  {
    name: "ID",
    description: "Unit for diagnosis and treatment of infectious diseases",
    icon: TbVirus,
  },
  {
    name: "Burn",
    description: "Unit for treatment of burn injuries",
    icon: FaFire,
  },
];
const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row overflow-x-auto items-center justify-between">
        {hospitalUnits.map((item) => (
          <CategoryCard
            key={item.name}
            name={item.name}
            icon={item.icon}
            selected={category === item.name}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
