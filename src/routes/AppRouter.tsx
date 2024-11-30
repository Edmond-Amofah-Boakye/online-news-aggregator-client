import { Routes, Route } from "react-router-dom";
import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";
import MainLayout from "../layout/main/MainLayout";
import Users from "../pages/Users/Users";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProfileSettings from "../pages/Profile/ProfileSettings";
import Articles from "../pages/Articles/Articles";
import NewArticle from "../pages/Articles/NewArticle";
import Test from "../pages/Test/Test";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      {/* Testing route */}
      <Route path="/test" element={<Test />} />
      
      <Route path="dashboard" element={<MainLayout />}>
        <Route index element={<Dashboard />}/>
        <Route path="users" element={<Users />}/>
        <Route path="articles" element={<Articles />}/>
        <Route path="articles/new" element={<NewArticle />}/>
        <Route path="profile-settings" element={<ProfileSettings />}/>
      </Route>
    </Routes>
  );
};

export default AppRouter;
