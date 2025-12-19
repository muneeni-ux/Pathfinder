import React from "react";

const AdminCard = ({ children, title }) => (
  <div className="bg-white rounded-lg shadow p-4">
    {title && <div className="font-semibold mb-2">{title}</div>}
    <div>{children}</div>
  </div>
);

export default AdminCard;
