import { MenuButton } from "@headlessui/react";

const CustomMenuButton = ({ children, className }) => {
  return <MenuButton className={` ${className}`}>{children}</MenuButton>;
};

export default CustomMenuButton;
