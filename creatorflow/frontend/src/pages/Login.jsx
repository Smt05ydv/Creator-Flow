import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  

 const handleCredentialLogin= async(googleResponse)=>{
    try {
      setError("");
        setLoading(true);
        const backendRes = await fetch("http://localhost:5002/api/v1/auth/google",
          {
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            credentials:"include",
            body:JSON.stringify({
              credential:googleResponse.credential,
            })
          }
        )
      const data = await backendRes.json()
      if (!backendRes.ok){
        throw new Error(data.message || "Google Login Failed") ;     }

        console.log("Google Login Successful",data);
        window.location.href = "/";
        
    } catch (error) {
      setError(error.message)
    }
      
    finally{
      setLoading(false)
    }  
    }

    
    useEffect(()=>{
      google.accounts.id.initialize({
        client_id:"26511365975-bki0v18hk1vbj7quq2tik7f2mlqn96di.apps.googleusercontent.com",
        callback: handleCredentialLogin
      })
  
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        {theme:"outline", size:"large",width:"350"}
      )
    },[])
 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5002/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login successful:", data);

       window.location.href = "/";
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            CREATORFLOW
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Manage your creator business with ease.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8">

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome back
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Login to your CreatorFlow account
          </p>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          <div
          id="googleSignInDiv"
          className="w-full flex justify-center"
          
          >

          </div>
          </form>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;