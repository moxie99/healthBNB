"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import ProfileItem from "./ProfileItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useAdmissionModal from "@/app/hooks/useAdmissionModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const ProfileMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const admissionModal = useAdmissionModal();

  const onAdmission = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // open admission modal

     admissionModal.onOpen();
  }, [currentUser, loginModal, admission]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onAdmission}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-slate-100 transition cursor-pointer"
        >
          Health BNB Profile
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-slate-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <ProfileItem label="My trips" onClick={() => {}} />
                <ProfileItem label="My favourites" onClick={() => {}} />
                <ProfileItem label="My reservations" onClick={() => {}} />
                <ProfileItem label="My clinics" onClick={() => {}} />
                <ProfileItem label="Healthbnb Home" onClick={() => {}} />
                <hr />
                <ProfileItem label="Log Out" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <ProfileItem label="Sign In" onClick={loginModal.onOpen} />
                <ProfileItem label="Sign Up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
