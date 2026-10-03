import { useState } from "react";
import { LockKeyhole, Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (formData.newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5002/api/v1/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password.");
      }

      setSuccess("Password changed successfully.");

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-5 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-2xl">

        {/* Back */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-500 dark:text-gray-400"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
            <LockKeyhole size={24} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Change Password
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Update your password to keep your CreatorFlow account secure.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111827] md:p-8">

          {/* Success */}
          {success && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-500">
              <CheckCircle2 size={18} />
              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Current Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Current Password
              </label>
             
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter your current password"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
                 

                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >

                  {showOldPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
                <Link to="/forgot-password" className="absolute right-4 py-15
                 text-blue-500 dark:text-blue-700 "> Forgot Password </Link>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showNewPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Use at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm New Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Changing Password..." : "Change Password"}
              </button>
            </div>

          </form>
        </div>

        {/* Security Note */}
        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400">
          <div className="flex gap-3">
            <LockKeyhole size={18} className="mt-0.5 shrink-0 text-blue-500" />
            <p>
              After changing your password, make sure you remember your new
              password. Never share your password with anyone.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChangePassword;