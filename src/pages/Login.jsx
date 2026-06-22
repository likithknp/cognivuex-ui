import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import {
  Mail,
  Lock,
  Eye
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(form);

      if (response === "Login Successful") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", response);

        navigate("/upload");
      } else {
        alert(response);
      }
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-slate-100
      via-slate-50
      to-cyan-50
    "
    >
      <div
        className="
        w-[520px]
        bg-white/90
        backdrop-blur-lg
        rounded-[28px]
        shadow-xl
        border
        border-slate-200
        p-10
      "
      >
        {/* Logo */}

        <div className="flex justify-center mb-6">
          <div
            className="
            w-14
            h-14
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            flex
            items-center
            justify-center
            text-white
            text-2xl
            font-bold
          "
          >
            ✦
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-900">
          Welcome Back
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Sign in to access your health intelligence
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}

          <label className="text-sm text-slate-600">
            Email Address
          </label>

          <div className="relative mt-2 mb-5">
            <Mail
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="
              w-full
              pl-11
              pr-4
              py-3
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500
            "
            />
          </div>

          {/* Password */}

          <label className="text-sm text-slate-600">
            Password
          </label>

          <div className="relative mt-2">
            <Lock
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="
              w-full
              pl-11
              pr-12
              py-3
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500
            "
            />

            <Eye
              size={18}
              className="absolute right-4 top-3.5 text-slate-400"
            />
          </div>

          {/* Remember */}

          <div className="flex justify-between items-center mt-4 text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-cyan-600"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            mt-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            text-white
            font-semibold
            hover:opacity-90
            transition
          "
          >
            {loading ? "Logging In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-slate-200"></div>

          <span className="px-3 text-xs text-slate-400">
            Or continue with
          </span>

          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Social Buttons */}

        <div className="grid grid-cols-2 gap-3">
          <button
            className="
            border
            border-slate-200
            rounded-xl
            py-3
            flex
            justify-center
            items-center
            gap-2
          "
          >
            <span>G</span>
            Google
          </button>

          <button
            className="
            border
            border-slate-200
            rounded-xl
            py-3
            flex
            justify-center
            items-center
            gap-2
          "
          >
            <span></span>
            Apple
          </button>
        </div>

        {/* Signup */}

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}