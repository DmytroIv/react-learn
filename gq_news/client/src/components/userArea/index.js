import React from 'react';
import UserAreaHoc from "../hoc/userAreaHoc";


const UserArea = () => {
  return (
    <UserAreaHoc>
      <div className="mt-3">
        <h2>Welcome to your user area</h2>
      </div>
    </UserAreaHoc>
  );
};

export default UserArea;