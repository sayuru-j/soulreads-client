"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { User } from "../@types";
import { deleteUser, loadUser } from "../services/user";

const UserInfo = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const user: User = loadUser();
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <div className="max-w-md py-6 px-6 w-full bg-gray-200 dark:bg-slate-800 rounded-lg min-h-50 flex flex-col items-center gap-2 justify-center">
      <img
        className="w-20 h-20 rounded-full object-cover"
        src={
          user?.avatar ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
        }
        alt="DP"
      />
      <h2 className="text-xl font-semibold">{user?.name}</h2>
      <button
        type="button"
        onClick={() => {
          deleteUser();
          router.push("/");
        }}
        className="bg-[#da4363] rounded-sm px-4 py-2 text-sm font-semibold text-white"
      >
        Clear Data
      </button>
    </div>
  );
};

export default UserInfo;
