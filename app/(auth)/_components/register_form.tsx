"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema";
import { handleLogin } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SiGoogle } from "react-icons/si";

export default function LoginForm() {
  const router = useRouter();
  const [pending, setTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const submit = async (values: any) => {
    setServerError(null);

    setTransition(async () => {
      try {
        const response = await handleLogin(values);
        if (!response.success) {
          throw new Error(response.message);
        }
        // Redirect after successful login
        router.push("/user/dashboard");
      } catch (err: any) {
        setServerError(err.message || "Login failed");
      }
    });
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome Back!</h1>
      <p className="text-gray-500 mb-6 text-center">Login to continue</p>

      {serverError && <p className="text-red-500 text-sm mb-3">{serverError}</p>}

      <div className="w-full mb-4">
        <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
        )}
      </div>

      <div className="w-full mb-2">
        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="w-full flex justify-end mb-3">
        <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button
        onClick={handleSubmit(submit)}
        className="w-full py-2 mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-md transition-all disabled:opacity-60"
        disabled={isSubmitting || pending}
      >
        {isSubmitting || pending ? "Logging in..." : "Log In"}
      </button>

      <div className="flex items-center w-full my-3">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-400">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button
        type="button"
        className="w-full py-2 mb-4 rounded-xl border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
      >
        <SiGoogle className="text-red-500" /> Login with Google
      </button>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Don’t have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline font-semibold">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
