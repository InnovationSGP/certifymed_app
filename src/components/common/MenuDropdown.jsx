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
      const googleRevoke = 'https://accounts.google.com/o/oauth2/revoke';
      const accessToken = Cookies.get('accessToken');
      if (accessToken) {
        try {
          await fetch(`${googleRevoke}?token=${accessToken}`);
        } catch (e) {
          console.error('Error revoking Google token:', e);
        }
      }
  
      const logoutPromises = [
        axiosInstance.post("/auth/api/users/logout"),
        axiosInstance.get("/auth/logout")
      ];
  
      await Promise.allSettled(logoutPromises);
  
      const cookiesToClear = [
        'accessToken',
        'refreshToken',
        'userData',
        'userRole',
        'connect.sid',
        'jwt',
        'G_AUTHUSER_H', 
        'G_ENABLED_IDPS' 
      ];
  
      cookiesToClear.forEach(cookieName => {
        ['/auth', '/', ''].forEach(path => {
          Cookies.remove(cookieName, { path });
          Cookies.remove(cookieName, { path, domain: window.location.hostname });
          if (window.location.hostname === 'localhost') {
            Cookies.remove(cookieName, { path, domain: 'localhost' });
          }
        });
      });
  
      const localStorageKeysToRemove = [
        'accessToken',
        'refreshToken',
        'userData',
        'isLoggedIn',
        'firstName',
        'lastName',
        'googleUser'
      ];
  
      localStorageKeysToRemove.forEach(key => localStorage.removeItem(key));
      localStorage.clear(); 
  
      sessionStorage.clear();
  
      dispatch(clearUser());
  
      if (window.gapi?.auth2) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2) {
          try {
            await auth2.signOut();
          } catch (e) {
            console.error('Error signing out of Google Auth2:', e);
          }
        }
      }
  
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = 'https://accounts.google.com/logout';
      document.body.appendChild(iframe);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 3000);
  
      toast.success("Logged out successfully!");
  
      router.replace("/login");
  
    } catch (error) {
      console.error("Logout error:", error);
      
      cookiesToClear.forEach(cookieName => {
        ['/auth', '/', ''].forEach(path => {
          Cookies.remove(cookieName, { path });
          Cookies.remove(cookieName, { path, domain: window.location.hostname });
        });
      });
  
      localStorage.clear();
      sessionStorage.clear();
      dispatch(clearUser());
  
      toast.error(
        error.response?.data?.message ||
        "An error occurred during logout. You have been logged out locally."
      );
  
      router.replace("/login");
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
