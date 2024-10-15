import React from "react";
import Image from "next/image";
import Header from "../components/Header";
import UserInfo from "../components/UserInfo";
import backgroundImg from "../assets/gg.png"; // Ensure the path is correct

const ProfilePage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">

      
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
        />
      </div>
      
      {/* Header */}
      <Header logoOnly noPad noSeperator />
      
      
      
      {/* Content */}
      <div className=" relative z-10 w-full flex items-center justify-center mt-20">
        <UserInfo />
      </div>
    </div>
  );
};

export default ProfilePage;
