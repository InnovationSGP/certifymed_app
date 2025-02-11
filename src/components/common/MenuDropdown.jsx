"use client";

import { Menu, MenuItem, MenuItems } from "@headlessui/react";
import { ThreeDots } from "./AppIcons";
import CustomMenuButton from "./CustomMenuButton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/slices/userSlice";
import { logout } from "@/utils/auth";
import toast from "react-hot-toast";

const MenuDropdown = ({ links, heading, buttonContent }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const result = await logout();

      // Clear Redux state
      dispatch(clearUser());

      if (result.success) {
        toast.success("Logged out successfully!");
      } else {
        toast.error("You have been logged out locally.");
      }

      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(clearUser());
      toast.error(
        "An error occurred during logout. You have been logged out locally."
      );
      router.replace("/login");
    }
  };

  return (
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
                onClick={handleLogout}
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
  );
};

export default MenuDropdown;
