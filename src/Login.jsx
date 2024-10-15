import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const { signInUser, error, loading } = useContext(AuthContext);
  const [success, setSuccess] = useState('');
  const [loginError, setLoginError] = useState('');// Define loginError state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await signInUser(email, password);

    // Set success message if no error is present
    if (!error) {
      setSuccess('Login successful!');
      setLoginError(''); // Clear any previous login errors
      e.target.reset();
      navigate("/")
    } else {
      setSuccess('');
      setLoginError(error); // Set login error message from context
    }
  };

  return (
    <div className="">
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input type="email" id="email" name="email" placeholder="Email address" className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          </div>
          <div className="form-control">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          </div>
                  {success && <p className="text-green-600 text-center mt-4">{success}</p>}
                  {loginError && <p className="text-red-600 text-center mt-4">{loginError}</p>}
          <div className="form-control">
          <a href="#" className="text-sm text-blue-600">Forgot Password?</a>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"> Login</button>
          </div>
        </form>

        {loginError && <p className="text-red-600 text-center mt-4">{loginError}</p>}
        {success && <p className="text-green-600 text-center mt-4">{success}</p>}

        <p className="text-center text-gray-600 mt-6">
          Don't have an account? <Link to="/signup" className="text-blue-500 font-medium hover:underline">Register</Link>
        </p> 
      </div>
    </div>
    </div>
  );
};

export default Login;


