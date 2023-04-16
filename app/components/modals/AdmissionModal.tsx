"use client";
import { useMemo, useState } from "react";
import useAdmissionModal from "@/app/hooks/useAdmissionModal";
import Modal from "./Modal";
import axios from "axios";
import Heading from "../Heading";
import { hospitalUnits } from "../navbar/Categories";
import CategoryInput from "../input/CategoryInput";
import SelectCountry from "../input/SelectCountry";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import Counter from "../Counter";
import ImageUpload from "../input/ImageUpload";
import Input from "../input/Input";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const AdmissionModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const admissionModal = useAdmissionModal();

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

  const [step, setStep] = useState(STEPS.CATEGORY);

  const onPrevious = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Facility Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        admissionModal.onClose();
      })
      .catch((error) => {
        toast.error("There seems to be an error, try agin later");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "CREATE";
    }

    return "NEXT";
  }, [step]);

  const category = watch("category");
  const location = watch("location");
  const bedCountPerRoom = watch("bedCountPerRoom");
  const wardCount = watch("wardCount");
  const unitCount = watch("unitCount");
  const imageSrc = watch("imageSrc");

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

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of the medical facility"
          subtitle="Show the world what the medical faility looks like"
        />

        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Medical facility Description"
          subtitle="How would you describe your medical facility?"
        />

        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <hr />

        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Price per session"
          subtitle="Please, set a price for a session"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="HealthBNB your health is priority"
      isOpen={admissionModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      onClose={admissionModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onPrevious}
      body={bodyContent}
    />
  );
};

export default AdmissionModal;
