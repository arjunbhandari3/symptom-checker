import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <div className="flex justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
              AI Health Assistant
            </h1>
          </div>
        </header>
        <main className="py-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
