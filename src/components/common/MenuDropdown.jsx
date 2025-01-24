"use client";
import { Menu, MenuItem, MenuItems } from "@headlessui/react";
import { ThreeDots } from "./AppIcons";
import CustomMenuButton from "./CustomMenuButton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { clearUser } from "@/redux/slices/userSlice";
import Cookies from "js-cookie";

const MenuDropdown = ({ links, heading, buttonContent }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Make API call to logout
      await axiosInstance.post("/auth/api/users/logout");

      // Clear all auth-related cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("userData");
      Cookies.remove("userRole");

      // Clear any auth-related localStorage items
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");

      // Clear the session storage if you're using it
      sessionStorage.clear();

      // Clear Redux store state
      dispatch(clearUser());

      // Show success message
      toast.success("Logged out successfully!");

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear everything even if the API call fails
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("userData");
      localStorage.clear();
      sessionStorage.clear();
      dispatch(clearUser());

      toast.error(
        error.response?.data?.message ||
          "An error occurred during logout. You have been logged out locally."
      );
      router.push("/login");
    }
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-right">
        <CustomMenuButton>{buttonContent || <ThreeDots />}</CustomMenuButton>
        <MenuItems
          anchor="bottom"
          className="bg-white p-3.5 shadow-custom z-40 rounded-lg"
        >
          <h5 className="text-shadesOn font-medium text-[13px]">{heading}</h5>
          {links.map((obj) => (
            <MenuItem key={obj.href} className="block">
              {obj.label === "Logout" ? (
                <button
                  onClick={handleLogout} // Call handleLogout on logout click
                  className="mt-3.5 text-left mb-2 w-[144px] hover:text-primary hover:underline underline-offset-2 duration-300 ease-in-out transition-all text-xs text-mainblack"
                >
                  {obj.label}
                </button>
              ) : (
                <button
                  onClick={() => router.push(obj.href)}
                  className="mt-3.5 text-left mb-2 w-[144px] hover:text-primary hover:underline underline-offset-2 duration-300 ease-in-out transition-all text-xs text-mainblack"
                >
                  {obj.label}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </>
  );
};

export default MenuDropdown;
