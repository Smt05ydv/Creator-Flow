import { useEffect, useState } from "react";
import {
  User,
  Mail,
  AtSign,
  ShieldCheck,
  Pencil,
  LockKeyhole,
  CheckCircle2,
  Megaphone,
  IndianRupee,
  Clock3,
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:5002/api/v1/auth/current-user",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      setUser(data.data.user);
    } catch (error) {
      console.error("Profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-red-500">Unable to load profile.</p>
      </div>
    );
  }

  const initials = (user.fullname || user.username || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="min-h-screen px-5 py-7 md:px-8 md:py-10">

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-blue-500">
              ACCOUNT
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              My Profile
            </h1>

            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Manage your CreatorFlow account and personal information.
            </p>
          </div>

          <button
            className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <Pencil size={17} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-black/5 dark:border-gray-800 dark:bg-[#111827] dark:shadow-black/20">

        {/* Profile Hero */}
        <div className="relative overflow-hidden px-6 py-8 md:px-10 md:py-10">

          {/* Background decoration */}
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute -bottom-32 left-20 h-56 w-56 rounded-full bg-purple-600/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">

            {/* Avatar */}
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-4xl font-bold text-white shadow-xl shadow-blue-600/20">
                {user.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              {user.isEmailVerified && (
                <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-green-500 text-white dark:border-[#111827]">
                  <CheckCircle2 size={15} />
                </div>
              )}
            </div>

            {/* User Info */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user.fullname || user.username}
                </h2>

                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500">
                  Creator
                </span>
              </div>

              <p className="mt-1 text-lg text-gray-500 dark:text-gray-400">
                @{user.username}
              </p>

              <div className="mt-3 flex items-center gap-2 text-sm">
                <ShieldCheck
                  size={17}
                  className={
                    user.isEmailVerified
                      ? "text-green-500"
                      : "text-yellow-500"
                  }
                />

                <span
                  className={
                    user.isEmailVerified
                      ? "text-green-500"
                      : "text-yellow-500"
                  }
                >
                  {user.isEmailVerified
                    ? "Email verified"
                    : "Email not verified"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800" />

        {/* Account Information */}
        <div className="px-6 py-8 md:px-10">

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Account Information
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your basic account details.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* Full Name */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/60">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <User size={17} />
                Full Name
              </div>

              <p className="font-semibold text-gray-900 dark:text-white">
                {user.fullname || "Not provided"}
              </p>
            </div>

            {/* Username */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/60">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <AtSign size={17} />
                Username
              </div>

              <p className="font-semibold text-gray-900 dark:text-white">
                @{user.username}
              </p>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/60">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <Mail size={17} />
                Email Address
              </div>

              <p className="break-all font-semibold text-gray-900 dark:text-white">
                {user.email}
              </p>
            </div>

            {/* Authentication */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/60">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <ShieldCheck size={17} />
                Login Method
              </div>

              <p className="font-semibold text-gray-900 dark:text-white">
                {user.authProvider === "google"
                  ? "Google"
                  : "Email & Password"}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-6 grid max-w-5xl gap-5 md:grid-cols-3">

        {/* Promotions */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111827]">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <Megaphone size={21} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              Promotions
            </span>
          </div>

          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            —
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Active campaigns
          </p>
        </div>

        {/* Earnings */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111827]">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
              <IndianRupee size={21} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              Earnings
            </span>
          </div>

          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            —
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Total earned
          </p>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111827]">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
              <LockKeyhole size={21} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              Security
            </span>
          </div>

          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {user.isEmailVerified ? "Protected" : "Action required"}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Account security status
          </p>
        </div>
      </div>

      {/* Security Section */}
      <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111827]">

        <div className="mb-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Account Security
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your password and account security.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">

          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <LockKeyhole size={19} />
            </div>

            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Password
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Keep your account secure with a strong password.
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 text-sm font-semibold text-blue-500 transition hover:text-blue-600">
            Change Password
            <Clock3 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;