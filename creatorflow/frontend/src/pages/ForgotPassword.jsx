import { useState } from "react";
import { Link} from "react-router";

const ForgotPassword = () => {
    
  const [email, setEmail] = useState("");
  const [error,setError]=useState("");
  const[loading,setLoading]=useState(false);
  const[success,setSuccess]=useState(false);
  
   const handleChange=(e)=>{
    setEmail(
       e.target.value
    )
   }
  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log("Email:",email);

   setError("");
   setLoading(true);

   try {
    const response= await fetch("http://localhost:5002/api/v1/auth/forgot-password",
        {
            method:"POST",
            headers:{
                 "Content-Type":"application/json",
            },
            credentials:"include",
             body:JSON.stringify({email}),
        },
       
    
    );

    const data= await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || "forgot-password failed");
      }

      setSuccess(true);
     
      

   } catch (error) {
    setError(error.message)
   }
   finally{
    setLoading(false);
   }
  }
    

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 
    flex items-center justify-center px-4">
      {success && (
  <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4">
    <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl border border-gray-200 dark:border-gray-800">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40">
        <span className="text-xl text-green-600 dark:text-green-400">
          ✓
        </span>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
        Email Sent Successfully
      </h3>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        We've sent a password reset link to your email address.
      </p>

      <button
        onClick={() => setSuccess(false)}
        className="mt-6 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition"
      >
        Okay
      </button>

    </div>
  </div>
)}
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

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 border
         border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8">

          <h2 className="text-2xl font-semibold
           text-gray-900 dark:text-white">
            Forgot your password?
          </h2>

          <p className="mt-2 text-sm text-gray-500
           dark:text-gray-400 leading-relaxed">
            Enter the email address associated with your account and we'll
            send you a link to reset your password.
          </p>
                 {error && (
            <div className="mt-5 rounded-lg bg-red-50
             dark:bg-red-950/30 border border-red-200
              dark:border-red-900 px-4 py-3 text-sm text-red-600
               dark:text-red-400">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700
               dark:text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-gray-300
                 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3
                  text-gray-900 dark:text-white
                   placeholder-gray-400 outline-none focus:ring-2
                    focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600
               hover:bg-blue-700 text-white font-medium
                py-3 transition"
            >      {loading ? "Sending..." : "Send Reset Link"}
              
            </button>

          </form>

          {/* Back to login */}
          <p className="mt-6 text-center text-sm text-gray-500
           dark:text-gray-400">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600
               dark:text-blue-400 hover:underline"
            >
              Back to Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;