import { useState, useEffect } from 'react';
import '@/styles/topbar.css';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const callNow = () => {
    window.location.href = `tel:${9632587410}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("dropbtn")) {
        setDropdownVisible(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="container1">
      <form className="navbarForm" action="#">
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search..." />
          <i className="ri-search-line search-icon"></i>
        </div>
      </form>
      <div className="icons">
        <a className="qq"><i className="ri-notification-line not_icon "></i></a>
        <a className="qq"><i className="ri-settings-4-line not_icon "></i></a>
        <div className="dropdown">
          <img src="../../../img/user.jpg" onClick="myFunction()" className="img-fluid user1 drop1" /> <span className="user_name">John Doe</span>
          <div id="myDropdown" className="dropdown-content">

            <a href="#home">Profile</a>
            <a href="#about">Chat</a>
            <a href="#contact">Log Out</a>
          </div>
        </div>


      </div>

    </div>
  );
};

export default Navbar;
