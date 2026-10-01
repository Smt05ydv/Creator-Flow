import { useState,useEffect} from "react";
import { Link,useNavigate, } from "react-router";




const Register = () => {

  const navigate=useNavigate();
  const [formData,setFormData] = useState({
    fullname:"",
    username:"",
    email:"",
    password:"",
  })

  const [error,setError]= useState("");
  const [loading,setLoading]= useState(false);

  
  
    const handleCredentialLogin= async(googleResponse)=>{
    try {
      setError("");
        setLoading(true);
        const res = await fetch("http://localhost:5002/api/v1/auth/google",
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
      const data = await res.json()
      if (!res.ok){
        throw new Error(data.message || "Google Login Failed") ;     }

        console.log("Google Login Successful",data);
        navigate("/")
        
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
        document.getElementById("googleSignUpDiv"),
        {theme:"outline", size:"large",width:"100%"}
      )
    },[])

const handleChange=(e)=>{
  setFormData({
    ...formData,
    [e.target.name]:e.target.value,
  });
};

const handleSubmit=async(e)=>{
  e.preventDefault();
  setError("")
    setLoading(true);
  


try {
 const response= await fetch(
    "http://localhost:5002/api/v1/auth/register",
    {
      method:"POST",
      headers:{
        "Content-Type" :"application/json",
        
      },
      credentials: "include",
      body:JSON.stringify(formData),
    }
 );
 

const data = await response.json();
 if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    console.log("Registration Successful",data);
    navigate("/")
    

} catch (error) {
  setError(error.message);
}
finally{
  setLoading(false);
}
}

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            CREATORFLOW
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Create your account and start managing your creator business.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8">

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Create an account
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started with CreatorFlow
           </p>
            {error && (
           <p className="mt-4 text-sm text-red-500">
              {error}
            </p>
               )}
          <form 
          onSubmit={handleSubmit}
          className="mt-6 space-y-5">

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Username
              </label>

              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
            
              className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
            >
               {loading ? "Creating Account..." : "Create Account"}
              
            </button>

            <div
            id="googleSignUpDiv"
            className="w-full flex justify-center"
            
            >

            </div>

          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;