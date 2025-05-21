import React, { useState } from "react";
import "./PasswordInput.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({ placeholder, value, onChange, name, onPaste, id }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="passwordInput">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required
        name={name}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
        id={id}
      />
      <div className="iconx" onClick={togglePassword}>
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;