import Header from "../components/Header";
import UserInfo from "../components/UserInfo";

const ProfilePage = () => {
  return (
    <div className="w-screen h-screen px-6 overflow-hidden">
      <Header logoOnly noPad noSeperator />
      <div className="w-full flex items-center justify-center mt-20">
        <UserInfo />
      </div>
    </div>
  );
};

export default ProfilePage;
