import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // TODO: Replace with API call
      console.log("Register Data:", form);

      setTimeout(() => {
        alert("Registration Successful");
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error(error);
      alert("Registration Failed");
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
        w-[450px]
        bg-white/90
        backdrop-blur-lg
        rounded-[28px]
        shadow-xl
        border
        border-slate-200
        p-8
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
          Create Account
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Join CognivueX and unlock AI-powered health insights
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}

          <label className="text-sm text-slate-600">
            Full Name
          </label>

          <div className="relative mt-2 mb-5">
            <User
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={form.fullName}
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

          <div className="relative mt-2 mb-5">
            <Lock
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Create password"
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

          {/* Confirm Password */}

          <label className="text-sm text-slate-600">
            Confirm Password
          </label>

          <div className="relative mt-2">
            <Lock
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
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

          {/* Terms */}

          <div className="mt-4 text-sm text-slate-600">
            <label className="flex items-start gap-2">
              <input type="checkbox" required />
              <span>
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>
          </div>

          {/* Register Button */}

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
            {loading ? "Creating Account..." : "Create Account"}
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

        {/* Login Link */}

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}