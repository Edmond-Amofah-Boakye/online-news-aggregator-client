import {
  MdPerson,
  MdAccessTime,
  MdCloudDownload,
  MdChat,
} from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGooglePlusG,
} from "react-icons/fa";
import GeneralStatCard from "./components/GeneralStatCard";
import SocialMediaCard from "./components/SocialMediaCard";
import MainChart from "../../components/single/MainChart";

const Dashboard = () => {
  return (
    <div>
      <div className="text-black text-xl bg-white py-4 px-8 shadow-md">
        Dashboard
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {/* Top Row - General Stats */}
        <GeneralStatCard icon={<MdPerson />} value="2500" label="Welcome" />
        <GeneralStatCard
          icon={<MdAccessTime />}
          value="123.50"
          label="Average Time"
        />
        <GeneralStatCard
          icon={<MdCloudDownload />}
          value="1,805"
          label="Collections"
        />
        <GeneralStatCard 
          icon={<MdChat />} 
          value="54" 
          label="Comments" />

        {/* Bottom Row - Social Media Stats */}
        <SocialMediaCard
          icon={<FaFacebookF />}
          value="35k"
          label="Friends"
          bgColor="bg-blue-700"
          textColor="text-white"
          secondaryValue="128"
          secondaryLabel="Feeds"
        />
        <SocialMediaCard
          icon={<FaTwitter />}
          value="584k"
          label="Followers"
          bgColor="bg-blue-400"
          textColor="text-white"
          secondaryValue="978"
          secondaryLabel="Tweets"
        />
        <SocialMediaCard
          icon={<FaLinkedinIn />}
          value="758+"
          label="Contacts"
          bgColor="bg-blue-600"
          textColor="text-white"
          secondaryValue="365"
          secondaryLabel="Feeds"
        />
        <SocialMediaCard
          icon={<FaGooglePlusG />}
          value="450"
          label="Followers"
          bgColor="bg-red-600"
          textColor="text-white"
          secondaryValue="57"
          secondaryLabel="Circles"
        />
      </div>
      <div>
        <MainChart />
      </div>
    </div>
  );
};

export default Dashboard;
