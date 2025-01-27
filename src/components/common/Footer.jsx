import Link from "next/link";
import { footerLinks, socialLinks } from "./Helper";
import { LogoIcon } from "./Icons";
import { TransitionLink } from "@/utils/TransitionLink";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-[#eff0f6] ">
      <div className="flex lg:flex-row flex-col gap-12 justify-between pb-11 pt-16 xl:pt-[120px]  custom-container">
        <div className="flex flex-col max-w-[310px] space-y-[30px]">
          <LogoIcon />
          <p className="paragraph ">
            At CertifyMed, we&apos;ve redefined the traditional healthcare model
            by offering a seamless virtual experience that connects patients
            with top-tier healthcare professionals anytime, anywhere.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                className="group hover:scale-105 transition-transform ease-in-out"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="  gap-5 justify-start md:justify-between flex  flex-wrap w-full max-w-[821px] xl:gap-14">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg min-w-[113px] w-full font-semibold mb-7 !max-h-[23px]">
                {section.title}
              </h3>
              <ul className=" space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <TransitionLink
                      href={link.href}
                      className="paragraph group h-5 !max-h-6 gap-1.5 text-nowrap hover:text-primary  duration-300 ease-in-out transition-colors flex items-center"
                    >
                      {link.icon && <span>{link.icon}</span>}
                      {link.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="py-6 border-t gap-  border-[#D9DBE9] flex items-center justify-between flex-col-reverse lg:flex-row custom-container">
        <p className="paragraph">Copyright © {currentYear} CertifyMed</p>
        <div className="flex justify-center flex-wrap items-center gap-x-2  paragraph">
          <span>All Rights Reserved</span>
          <span>|</span>

          <TransitionLink
            href="#"
            className="underline text-primary hover:text-green-900 duration-300 ease-in transition-colors"
          >
            Terms and Conditions
          </TransitionLink>

          <TransitionLink
            href="#"
            className="underline text-primary hover:text-green-900 duration-300 ease-in transition-colors"
          >
            <span className="mr-2 !text-dimGray">|</span> Privacy Policy
          </TransitionLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
