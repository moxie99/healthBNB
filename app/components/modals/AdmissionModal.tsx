"use client";

import useAdmissionModal from "@/app/hooks/useAdmissionModal";
import Modal from "./Modal";
const AdmissionModal = () => {
  const admissionModal = useAdmissionModal();
  return (
    <Modal
      title="HealthBNB your health is priority"
      isOpen={admissionModal.isOpen}
      onSubmit={admissionModal.onClose}
      onClose={admissionModal.onClose}
      actionLabel="Submit"
    />
  );
};


export default AdmissionModal;