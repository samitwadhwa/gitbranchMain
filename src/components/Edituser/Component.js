
import { useState } from 'react';
import Link from 'next/link';
import { useRef } from 'react';
// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// import "../../styles/component.css";
//note: css from adduser.css//


const Comment = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    if (value.length === 10) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      // Handle file upload here
    }
  };
  return (
    <>
      <div className='container-fluid'>
        <div className='row profile-my_flx_profile_up'>
          <div className='col-xl-12 col-lg-3 col-md-2  profile-pro1 profile-admin'>
            <Link href="/user"> <div className='profile-goBack'>
              <button className='profile-back'>
                <i className="ri-arrow-left-s-line profile-lefticon"></i>
              </button>
            </div>
            </Link>
          </div>
          <div className='container-fluid side_padd'>
      <div className='row my_flx_profile_up'>
        <div className='col-xl-4 col-lg-5 col-md-6 pro1'>
          <div className='my_form_signup_profile'>
            <center>
                <img src="../img/avtar.jpg" className='img-fluid avtar'/>
                <h3 className='h3_head'>Mr. Sumit Kumar</h3>
                {/* <p>Software Development Manager</p> */}
            
            </center>
            <hr className='line'/>
            <p className='basic'>Basic Info:-</p>
            <p className='info1'><b>Name:- </b> Mr. Sumit Kumar </p>
            <p className='info1'><b>User Id:- </b> Sumit8980</p>
            <p className='info1'><b>Email:- </b> Sumitk8980@gmail.com </p>
            <p className='info1'><b>Phone:- </b> +91 9098790876</p>
            {/* <p className='info1'><b>Experience:- </b> nill/sannata</p>
            <p className='info1'><b>Age:- </b> 78</p> */}
            

          </div>
        
        </div>
        <div className='col-xl-8 col-lg-7 col-md-6 '>
          <div className='my_profile'>
            <form action="#">
              <p className='login_head'>Profile</p>
              <div className="mb-3">
                <label htmlFor="username" className="form-label user_label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter Username"
                  
                  
                />
              </div>
              <div className="mb-3">
                <label htmlFor="user1" className="form-label user_label">User Id</label>
                <input
                  type="email"
                  className="form-control"
                  id="user1"
                  placeholder="Enter User Id"
                 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label user_label">Email Id</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label user_label">Phone No.</label>
                <div className="inputContainer">
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    maxLength={10}
                    className="form-control inputField"
                  />
                  
                </div>
              </div>
              
              <button type="submit" className="submit_bot1">Save</button>
            </form>
          </div>
        </div>
        {/* <div className='col-xl-2 col-lg-3 col-md-2 '></div> */}
      </div>
    </div>

        </div>
      </div>
    </>
  );
}

export default Comment;
