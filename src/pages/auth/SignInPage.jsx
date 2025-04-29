

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Mail, Lock, Loader, Phone } from "lucide-react";
// import { useAuthStore } from "../../store/authStore";

// const SignInPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");

//   const { login, isLoading, error } = useAuthStore();
//   const navigate = useNavigate();

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     console.log("Attempting login with:", { email, password });
    
//     try {
//       await login(email, password,phone);
//       console.log("Login successful, redirecting...");
//       navigate("/home");
//     } catch (err) {
//       console.error("Login failed:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
//           Welcome Back
//         </h2>

//         <form onSubmit={handleSignIn}>
//           <div className="mb-4 relative">
//             <Phone
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
//             />
//             <input
//               type="text"
//               placeholder="Phone (e.g., 147871)"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <div className="mb-4 relative">
//             <Mail
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
//             />
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <div className="mb-4 relative">
//             <Lock
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <div className="flex justify-end mb-6">
//             <Link
//               to="/forgot-password"
//               className="text-sm text-green-400 hover:underline"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

//           <button
//             className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50"
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <Loader className="w-6 h-6 animate-spin mx-auto" />
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>

//         <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center mt-4">
//           <p className="text-sm text-gray-400">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-green-400 hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader, Phone } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const SignInPage = () => {
  const [activeTab, setActiveTab] = useState("phone"); // Track active form
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, signinEmail, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handlePhoneSignIn = async (e) => {
    e.preventDefault();
    try {
      await login(phone);
      navigate("/home");
    } catch (err) {
      console.error("Phone sign-in failed:", err);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signinEmail(email, password);
      navigate("/home");
    } catch (err) {
      console.error("Email sign-in failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 text-center text-sm font-medium ${
              activeTab === "phone"
                ? "border-b-2 border-green-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("phone")}
          >
            Sign in with Phone
          </button>
          <button
            className={`flex-1 py-2 text-center text-sm font-medium ${
              activeTab === "email"
                ? "border-b-2 border-green-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("email")}
          >
            Sign in with Email
          </button>
        </div>

        {/* Phone Sign-In Form */}
        {activeTab === "phone" && (
          <form onSubmit={handlePhoneSignIn}>
            <div className="mb-4 relative">
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              />
              <input
                type="text"
                placeholder="Phone (e.g., 147871)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading}
              />
            </div>

            {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

            <button
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        )}

        {/* Email Sign-In Form */}
        {activeTab === "email" && (
          <form onSubmit={handleEmailSignIn}>
            <div className="mb-4 relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading}
              />
            </div>

            <div className="mb-4 relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-end mb-6">
              <p
                className="text-sm text-green-400 hover:underline"
              >
                Forgot password?
              </p>
            </div>

            {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

            <button
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        )}

        {/* Sign Up Link */}
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center mt-4">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;