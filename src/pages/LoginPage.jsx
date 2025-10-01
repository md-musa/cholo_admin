import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";

function Login() {
  const { login, userData } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (userData) navigate("/schedules");
  }, [userData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login({ email, password });
    } catch (err) {
      console.error("Network or server error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-sm p-8 py-20 shadow-lg rounded-lg bg-white">
        {/* Website Name */}
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">Cholo Admin</h1>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="form-control mb-4 relative">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="input input-bordered px-4 text-md w-full"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-control mb-6 relative">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered px-4 w-full"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-5 cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className={`btn btn-primary w-full flex items-center justify-center gap-2 ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            <FaSignInAlt />
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
