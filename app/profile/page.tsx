'use client';
import React, { useEffect, useState } from "react";
import { deleteUser, loadUser } from "../services/user";
import { useRouter } from "next/navigation";
import { AvatarGenerator } from 'random-avatar-generator';
import Image from "next/image";
import backgroundImg from '../assets/gg.png';
import { randomName } from '../utils/name'; 


const ProfilePage = () => {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState<string>('');
  const [userName, setUserName] = useState<string>(''); 
  

  useEffect(() => {
    
const user = loadUser()
    if (user){
      // Set the random username
    const name = user.name;
    setUserName(name);
    const avatar = user.avatar;
    setProfilePic(avatar);
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute inset-0">
        <Image
          src={backgroundImg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
        />
      </div>

      <div className="bg-white shadow-xl rounded-lg p-8 text-center z-10 relative">
        <img
          src={profilePic}
          alt="Profile"
          className="w-40 h-40 rounded-full mb-4 object-cover"
        />
        
        {/* Display the random name */}
        <h1 className="text-3xl font-semibold mb-2">{userName}'s Profile</h1>

        

        <button
          type="button"
          onClick={() => {
            deleteUser();
            router.push("/");
          }}
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
