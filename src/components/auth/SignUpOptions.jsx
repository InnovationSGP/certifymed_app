import Link from "next/link";
import { CertifyLogo } from "../common/AppIcons";

const SignUpOptions = () => {
  return (
    <section className="w-full max-w-[542px] mx-auto flex flex-col h-full">
      <div className="grow h-full">
        <div className="flex  items-center justify-center my-[50px]">
          <Link href="/">
            <CertifyLogo />
          </Link>
        </div>

        <p className=" text-center text-base md:text-xl font-semibold  mb-[55px]">
          Sign up now and embark on a journey towards accessible, efficient, and
          personalised healthcare.{" "}
        </p>
        <Link
          href="/sign-up/patient"
          className="primary-btn w-full h-[55px] xl:h-[60px] max-w-[220px] !px-7 md:max-w-[328px] mx-auto"
        >
          Sign up as a patient
        </Link>
        <div className="flex items-center justify-center">
          <Link
            href="/sign-up/doctor"
            className="w-full max-w-[220px] h-[52px] xl:h-[60px] md:max-w-[328px] flex justify-center items-center text-primary mt-5 py-[13px] bg-white border border-primary rounded-xl hover:bg-primary font-medium hover:text-white duration-300 ease-in-out transition-colors"
          >
            Sign up as a doctor
          </Link>
        </div>
      </div>
      <p className="text-center font-poppins font-medium mt-[105px]">
        Already have an account?{" "}
        <Link className="text-spandexGreen" href="/login">
          Log in
        </Link>
      </p>
    </section>
  );
};

export default SignUpOptions;
