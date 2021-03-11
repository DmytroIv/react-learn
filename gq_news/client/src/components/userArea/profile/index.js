import React from 'react';
import UserAreaHoc from "../../hoc/userAreaHoc";
import EmailPass from "./emailPass";
import Stats from "./stats";

const Profile = (props) => {
  return (
    <UserAreaHoc>
      <div className="mb-5">
        <EmailPass {...props} />
        <hr/>
        <Stats {...props} />
      </div>
    </UserAreaHoc>
  );
};

export default Profile;