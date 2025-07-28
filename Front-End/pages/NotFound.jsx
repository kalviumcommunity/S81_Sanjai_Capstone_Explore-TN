import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-700">
          Oops! Page not found.
        </h2>
        <p className="mt-2 text-gray-500">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
      <div className="mt-10">
        <img
          src="https://illustrations.popsy.co/gray/error.svg"
          alt="Page not found illustration"
          className="w-full max-w-sm mx-auto"
        />
      </div>
    </div>
  );
}
