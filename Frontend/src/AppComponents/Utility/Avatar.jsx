import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const Avatar = ({
  src,
  alt = "User Avatar",
  size = "40px",
  withDropdown = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    if (withDropdown) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (withDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [withDropdown]);

  return (
    <div className="relative" ref={withDropdown ? dropdownRef : null}>
      <button onClick={toggleMenu} className="focus:outline-none">
        <img
          src={
            src ||
            "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
          }
          alt={alt}
          className="rounded-full object-cover"
          style={{ width: size, height: size }}
        />
      </button>

      {withDropdown && isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
          <ul className="py-2 text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </li>
            <li
              onClick={() => dispatch(logout())}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.string,
  withDropdown: PropTypes.bool,
};

export default Avatar;
