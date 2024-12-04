"use client";
import { Menu, MenuItem, MenuItems } from "@headlessui/react";
import { ThreeDots } from "./AppIcons";
import CustomMenuButton from "./CustomMenuButton";

const MenuDropdown = ({ links, heading, buttonContent }) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-right">
        <CustomMenuButton>{buttonContent || <ThreeDots />}</CustomMenuButton>
        <MenuItems
          anchor="bottom"
          className="bg-white p-3.5  shadow-custom z-40 rounded-lg"
        >
          <h5 className="text-shadesOn font-medium text-[13px]">{heading}</h5>
          {links.map((link) => (
            <MenuItem key={link.href} className="block ">
              <button
                // onClick={() => handleClick(link.label)}
                className="mt-3.5 text-left mb-2 w-[144px] hover:text-primary hover:underline underline-offset-2 duration-300 ease-in-out transition-all text-xs text-mainblack"
              >
                {link.label}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </>
  );
};

export default MenuDropdown;
