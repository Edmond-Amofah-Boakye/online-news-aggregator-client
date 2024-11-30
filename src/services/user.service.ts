import { axiosInstance } from "../api/interceptors";
import { convertToFormData } from "../utils";

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profile: any;
}

class AuthService {
  private _user: User | null = null;
  private _isAuthenticated: boolean = false;
  private _role: string | null = null;
  private _isLoading: boolean = false;

  constructor() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      this._user = parsedUser;
      this._isAuthenticated = true;
      this._role = parsedUser?.role;
    }
  }

  get getUser() {
    return this._user;
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  get userRole() {
    return this._role;
  }

  get isLoading() {
    return this._isLoading;
  }

  async signIn(data: Partial<User>) {
    try {
      this._isLoading = true;
      const response = await axiosInstance.post("/auth/login", data);

      if (response?.statusText == "OK") {
        const { details } = response.data;
        this._isAuthenticated = true;
        this._user = details;
        this._role = details?.role;

        localStorage.setItem("user", JSON.stringify(details));
        
        return response;
      } else {
        throw new Error("could not signin");
      }
    } catch (error) {
      console.log(error);
      throw error
    } finally {
      this._isLoading = false;
    }
  }

  async signUp(details: Partial<User>) {
    try {
      this._isLoading = true;
      const response = await axiosInstance.post("/user/create", details, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response
    } catch (error) {
      throw error
    } finally {
      this._isLoading = false;
    }
  }

  async signOut() {
    this._isAuthenticated = false;
    this._role = null;
    this._user = null;
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  async updateAccount(details: Partial<User>) {
    if (!this._user) {
      throw new Error("no user found");
    }

    try {
      this._isLoading = true;
      const updatedDetails = convertToFormData(details)
      const response = await axiosInstance.put(
        `/user/update-one/${this._user?._id}`,
        updatedDetails,{
          headers:{
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (response.status == 200 || response.status == 201) {
        this._isAuthenticated = true;
        this._role = response.data?.role;
        localStorage.setItem("user", JSON.stringify(response.data));
        return response
      } else {
        throw new Error("could not update user");
      }
    } catch (error) {
      console.log(error);
    } finally {
      this._isLoading = false;
    }
  }
}

export const authServiice = new AuthService();
