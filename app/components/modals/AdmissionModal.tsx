"use client";
import { useMemo } from "react";
import useAdmissionModal from "@/app/hooks/useAdmissionModal";
import Modal from "./Modal";
import { useState } from "react";
import Heading from "../Heading";
import { hospitalUnits } from "../navbar/Categories";
import CategoryInput from "../input/CategoryInput";
import SelectCountry from "../input/SelectCountry";
import { useForm, FieldValues } from "react-hook-form";
import dynamic from "next/dynamic";
import Counter from "../Counter";
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const AdmissionModal = () => {
  const admissionModal = useAdmissionModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const onPrevious = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "CREATE";
    }

    return "NEXT";
  }, [step]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: "",
      bedCountPerRoom: 1,
      wardCount: 1,
      unitCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const bedCountPerRoom = watch("bedCountPerRoom");
  const wardCount = watch("wardCount")
  const unitCount = watch("unitCount")

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these speaks to your health needs"
        subtitle="Pick a  category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {hospitalUnits.map((item) => (
          <div key={item.name} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.name}
              name={item.name}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your medical facility located?"
          subtitle="Help pateints find you"
        />
        <SelectCountry
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics info about the medical facility"
          subtitle="What are the basic infrastructures in the medical faility"
        />
        <Counter
          title="Beds"
          subtitle="How many beds are in a rooms?"
          value={bedCountPerRoom}
          onChange={(value) => setCustomValue("bedCountPerRoom", value)}
        />
        <hr />
        <Counter
          title="Units"
          subtitle="How many units do you have?"
          value={unitCount}
          onChange={(value) => setCustomValue("unitCount", value)}
        />
        <hr />
        <Counter
          title="Wards"
          subtitle="How many wards do you have?"
          value={wardCount}
          onChange={(value) => setCustomValue("wardCount", value)}
        />
      </div>
    );
  }

  return (
    <Modal
      title="HealthBNB your health is priority"
      isOpen={admissionModal.isOpen}
      onSubmit={onNext}
      onClose={admissionModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onPrevious}
      body={bodyContent}
    />
  );
};

export default AdmissionModal;
