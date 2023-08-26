import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <div className="divider divide-gray-200 dark:divide-gray-900"></div>
      {children}
    </main>
  );
};

export default layout;
