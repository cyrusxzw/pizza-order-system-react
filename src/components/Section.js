import React from 'react';

export default ({
    title,
    children,
}) => (
    <div className="section">
    <h2>{title}</h2>
    {children}
  </div>
);