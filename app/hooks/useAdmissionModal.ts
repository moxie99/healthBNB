 import { create } from "zustand";

  interface AdmissionModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }


  const useAdmissionModal = create<AdmissionModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
  }));


  export default useAdmissionModal;