"use client";
import { Menu, MenuItem, MenuItems } from "@headlessui/react";
import { ThreeDots } from "./AppIcons";
import CustomMenuButton from "./CustomMenuButton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { deleteUser } from "@/redux/slices/userSlice";

const MenuDropdown = ({ links, heading, buttonContent }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/api/users/logout");
      console.log("Logout response: ", response);

      // Clear tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Reset user state in Redux store
      dispatch(deleteUser());

      // Redirect to login page
      router.push("/login");

      // Show success message
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error("Logout error:", error);
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
