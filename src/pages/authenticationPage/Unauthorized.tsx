import { Link } from "react-router";
import { ShieldX } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center border border-red-100">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <ShieldX className="text-red-500 w-14 h-14" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-3">Access Denied</h1>

        <p className="text-gray-500 mb-8 leading-relaxed">
          Sorry, you are not authorized to access this page. Please go back to
          the homepage or login with the correct account.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md"
          >
            Go Home
          </Link>

          <Link
            to="/login"
            className="border border-gray-300 hover:border-red-400 hover:text-red-500 px-6 py-3 rounded-xl font-semibold transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
