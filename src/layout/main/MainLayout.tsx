import { Outlet, useNavigate } from "react-router-dom";
import userAVatar from "../../assets/pngtree-user-vector-avatar-png-image_1541962.jpg";
import { sidebarItems } from "./data/SidebarData";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { BiBell, BiMenu, BiUser } from "react-icons/bi";
import { CiMail } from "react-icons/ci";

const MainLayout = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(false);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };
  const handleToggleSideBar = () => {
    setToggleSideBar(!toggleSideBar);
  };

  return (
    <div className="flex">
      {/* Side bar */}
      <div
        className={`bg-[#192B3F] text-[#d5d5d5] h-screen overflow-y-auto ${
          toggleSideBar ? "w-[5%]" : "w-[16%]"
        }`}
      >
        <div className="flex justify-center gap-5 flex-wrap items-center p-4 bg-[#204162]">
          <img
            src={user?.profile?.url ?? userAVatar}
            alt="profile"
            className="block w-[38px] h-[38px] rounded-full object-cover"
          />
          <div className="text-center">
            <h4 className="text-sm">{user?.username.split(" ")[0]}</h4>
            <p className="text-green-500 text-sm flex items-center gap-1 capitalize">
              {" "}
              <BiUser />
              {role}
            </p>
          </div>
        </div>
        <div className="py-6">
          <header className="text-base px-2">General</header>
          <div className="h-[2px] w-full bg-[#69413F] my-6"></div>
          <nav className="flex flex-col space-y-1">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(item.route);
                  handleItemClick(index);
                }}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  activeIndex === index
                    ? "bg-gray-700 text-blue-400"
                    : "hover:bg-gray-700 text-white"
                }`}
              >
                <div
                  className={`mr-4 transition-colors ${
                    activeIndex === index ? "text-blue-400" : "text-white"
                  }`}
                >
                  {item.icon}
                </div>
                {!toggleSideBar && <span>{item.label}</span>}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main page */}
      <main
        className="bg-slate-200 flex-1 h-screen transition-all overflow-y-auto"
      >
        <header className="bg-[#16283C] flex justify-between items-center h-[70px]">
          <div className="flex items-center gap-4 text-white">
            <div className="bg-[#FE5722] p-6 cursor-pointer">
              <BiMenu size={24} onClick={handleToggleSideBar} />
            </div>
            <h5>Admin</h5>
          </div>
          <div className="flex justify-center gap-6 items-center">
            <div className="relative">
              <BiBell size={24} color="#DAE0E5" />
              <div className="flex items-center justify-center w-5 h-5 bg-[#FE5722] text-white rounded-full font-semibold text-[12px] absolute top-[-10px] left-3">
                1
              </div>
            </div>
            <div className="relative">
              <CiMail size={24} color="#DAE0E5" />
              <div className="flex items-center justify-center w-5 h-5 bg-[#FE5722] text-white rounded-full font-semibold text-[12px] absolute top-[-10px] left-4">
                5
              </div>
            </div>
            <div className="flex justify-center gap-5 items-center py-4 h-[70px] px-6 bg-[#782d16]">
              <img
                src={user?.profile?.url ?? userAVatar}
                alt="profile"
                className="block w-[38px] h-[38px] rounded-full object-cover"
              />
              <div className="text-center">
                <h4 className="text-[#eeebeb]">
                  {user?.username.split(" ")[0]}
                </h4>
              </div>
            </div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
