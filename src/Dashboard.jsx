// Dashboard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Destion</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {["Dashboard", "Profile", "Settings"].map((tab) => (
              <li key={tab}>
                <Link
                  to={`/${tab.toLowerCase()}`}
                  className={`block px-4 py-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white ${activeTab === tab ? 'bg-blue-500 text-white' : ''}`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </Link>
              </li>
            ))}
            {/* Login and Register Links */}
            <li>
              <Link to="/login" className="block px-4 py-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="block px-4 py-2 text-gray-700 rounded hover:bg-blue-500 hover:text-white">Register</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">{activeTab}</h2>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-blue-500">Login</Link>
            <Link to="/signup" className="text-gray-600 hover:text-blue-500">Register</Link>
            <button className="ml-4 text-gray-600 hover:text-blue-500">Profile</button>
            <button className="ml-4 text-gray-600 hover:text-blue-500">Logout</button>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === "Dashboard" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Dashboard Content</h3>
              <p>This is the content for the Dashboard.</p>
            </div>
          )}
          {activeTab === "Profile" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Profile Content</h3>
              <p>This is the content for the Profile.</p>
            </div>
          )}
          {activeTab === "Settings" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Settings Content</h3>
              <p>This is the content for the Settings.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
