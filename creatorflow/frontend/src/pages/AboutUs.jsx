import { Link } from "react-router";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  LayoutDashboard,
  Target,
  Users,
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight"
          >
            CREATORFLOW
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-sm font-medium">
            About CreatorFlow
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
            Manage your creator business
            <span className="text-blue-600"> in one place.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            CreatorFlow is built to help creators organize their promotions,
            track earnings, manage campaigns, and stay on top of important
            deadlines without relying on spreadsheets or scattered notes.
          </p>
        </section>

        {/* What we do */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Stay Organized
              </h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Keep your promotions, campaigns, deliverables, and deadlines
                organized in one dashboard.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Track Earnings
              </h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Monitor your earnings, pending payments, paid promotions,
                and revenue across different platforms.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Focus on Creating
              </h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Spend less time managing administrative work and more time
                creating content and growing your audience.
              </p>
            </div>

          </div>
        </section>

        {/* Mission */}
        <section className="bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">

            <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>

            <h2 className="mt-6 text-3xl font-bold">
              Built for modern creators
            </h2>

            <p className="mt-5 text-gray-600 dark:text-gray-400 leading-relaxed">
              CreatorFlow is designed around a simple idea: creators should
              have simple tools to manage the business side of their work.
              From tracking brand collaborations to monitoring payments,
              everything should be easy to understand and accessible from
              one place.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center">
            Everything in one flow
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">

            {[
              "Promotion management",
              "Campaign tracking",
              "Payment tracking",
              "Earnings overview",
              "Upcoming deadlines",
              "Creator dashboard",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium">
                  {feature}
                </span>
              </div>
            ))}

          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="rounded-2xl bg-gray-900 dark:bg-gray-800 text-white p-10 text-center">
            <h2 className="text-3xl font-bold">
              Ready to get organized?
            </h2>

            <p className="mt-3 text-gray-300">
              Create your CreatorFlow account and start managing your
              creator business.
            </p>

            <Link
              to="/register"
              className="inline-block mt-6 px-6 py-3 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;