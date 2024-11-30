import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { authServiice } from "../../services/user.service";

const ProfileSettings = () => {
  const { user } = useAuth();
  
  const [profile, setProfile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    role: user?.role || "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (!e.target.files[0].type.startsWith("image")) {
        return toast.error("Only images are allowed", {
          position: "bottom-right",
        });
      }
      setProfile(e.target.files[0]);
    }
  };

  const url = profile
    ? URL.createObjectURL(profile)
    : user?.profile?.url || "https://via.placeholder.com/80";


    const removedEmptyValues = (data: Record<string, any>) =>{
      return Object.fromEntries(
        Object.entries(data).filter(([_, item]) => (item !== "" || (item === "confirmPassword")))
      )
    }


  const handleSave = async(e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      return toast.error("Passwords do not match", {
        position: "bottom-right",
      });
    }
    const response = await authServiice.updateAccount(removedEmptyValues(formData))
    if(response?.statusText == "OK"){
      return toast.success("Profile sucessfully updated", {position: "bottom-right"})
    }else{
      return toast.error("Try again", {position: "bottom-right"})
    }
  };


  useEffect(() => {
    return () => {
      if(profile) {
        URL.revokeObjectURL(url);
      }
    };
  }, [profile]);

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-md space-y-10">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-gray-800 border-b pb-4 mb-6">
          Profile Settings
        </h2>

        {/* Profile Picture */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={url}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover shadow-sm border border-gray-200"
          />
          <div>
            <label
              htmlFor="file-upload"
              className="bg-blue-600 block hover:bg-blue-700 text-white px-5 py-2 cursor-pointer rounded-md font-medium transition duration-200"
            >
              Change Picture
            </label>
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              hidden
              onChange={handleSelectProfile}
              name="profile"
            />
            <p className="text-xs text-gray-500 mt-1">Max file size: 2MB</p>
          </div>
        </div>

        <form className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-medium text-gray-700">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <input
                  readOnly
                  type="text"
                  value={user?.username}
                  name="username"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email Address
                </label>
                <input
                  onChange={onChange}
                  value={formData.email}
                  name="email"
                  type="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email address"
                />
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div>
            <h3 className="text-xl font-medium text-gray-700">
              Account Settings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <input
                  onChange={onChange}
                  value={formData.username}
                  name="username"
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Role
                </label>
                <select
                  onChange={onChange}
                  name="role"
                  defaultValue={formData.role}
                  // value="{formData.role}"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            </div>
          </div>

          {/* Password Management */}
          <div>
            <h3 className="text-xl font-medium text-gray-700">
              Password Management
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  New Password
                </label>
                <input
                  type="password"
                  onChange={onChange}
                  name="password"
                  value={formData.password}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Confirm New Password
                </label>
                <input
                  onChange={onChange}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  type="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md font-semibold transition duration-200 shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
