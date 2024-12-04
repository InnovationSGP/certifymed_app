import { useState } from "react";
import { Eyeclose, EyeIcon } from "../common/Icons";

const PasswordInput = ({
  id,
  name,
  className,
  label = "Password",
  placeholder = "●●●●●●●●",
  required = false,
  value,
  updateValue,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`col-span-2 ${className}`}>
      <label className="font-medium text-dimGray text-lg" htmlFor={id}>
        {label}
      </label>
      <div className="relative mt-[6px]">
        <input
          id={id}
          name={name}
          className="input-style"
          type={showPassword ? "text" : "password"}
          required={required}
          placeholder={placeholder}
          style={{
            fontSize: showPassword ? "16px" : "30px",
            letterSpacing: showPassword ? "1px" : "-3px",
          }}
          value={value}
          onChange={(e) => updateValue(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          {showPassword ? <EyeIcon /> : <Eyeclose />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
