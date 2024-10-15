import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

const Signup = () => {
  const { createUser } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Password validation function
  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    return '';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = e.target.elements;

    // Validate passwords
    const passwordError = validatePassword(password.value);
    if (passwordError) {
      setRegisterError(passwordError);
      return;
    }
    if (password.value !== confirmPassword.value) {
      setRegisterError("Passwords do not match");
      return;
    }

    setRegisterError('');
    setSuccess('');

    try {
      await createUser(email.value, password.value);
      setSuccess('Successfully created User');
      toast.success('Successfully registered!');
      e.target.reset();
    } catch (error) {
      console.error('Registration Error:', error);
      setRegisterError(error.message);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Username</label>
              <input type="text" id="username" name="username" placeholder="Username" className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
            </div>
            <div className="form-control">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
              <input type="email" id="email" name="email" placeholder="Email address" className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
            </div>
            <div className="form-control">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
              <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-sm text-blue-600 mt-1">{showPassword ? "Hide Password" : "Show Password"}</button>
            </div>
            <div className="form-control">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">Confirm Password</label>
              <input type={showPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
            </div>

            {success && <p className="text-green-600 text-center mt-4">{success}</p>}
            {registerError && <p className="text-red-600 text-center mt-4">{registerError}</p>}
            
            <div className="form-control">
              <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"> Sign Up </button>
            </div>
          </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account? <Link to="/login" className="text-blue-500 font-medium hover:underline">Login</Link>
        </p>  
        </div>
      </div>
    </div>
  );
};

export default Signup;
