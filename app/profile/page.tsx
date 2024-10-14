'use client';
import React, { useEffect, useState } from "react";
import { deleteUser, loadUser } from "../services/user";
import { useRouter } from "next/navigation";
import { AvatarGenerator } from 'random-avatar-generator';
import Image from "next/image";
import backgroundImg from '../assets/gg.png';
import { randomName } from '../utils/name'; 
import Header from "../components/Header";

const ProfilePage = () => {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState<string>('');
  const [userName, setUserName] = useState<string>(''); 
  const generator = new AvatarGenerator(); // Create an instance of AvatarGenerator

  useEffect(() => {
    const user = loadUser();
    if (user) {
      // Use the user's name if available
      const name = user.name || randomName(); // Use randomName if no name
      setUserName(name);
      
      // Use the user's avatar if available, else generate a random avatar
      const avatar = user.avatar || generator.generateRandomAvatar(); // Generate random avatar if not available
      setProfilePic(avatar);
    } else {
      // Generate a random name and avatar if no user is loaded
      setUserName(randomName());
      setProfilePic(generator.generateRandomAvatar());
    }
  }, []);

  return (
    
    
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-screen h-screen overflow-auto md:overflow-hidden text-black dark:text-white/80">
      <Header logoOnly noPad noSeperator />
    </div>
      
      <div className="absolute inset-0">
        <Image
          src={backgroundImg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
        />
      </div>

      <div className="bg-white shadow-xl rounded-lg p-8 text-center z-10 relative items-center flex-col flex">
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
