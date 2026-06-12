import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-3xl w-[400px]"
      >
        <h1 className="text-4xl font-bold text-white mb-6">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-4 mb-4 rounded-xl bg-slate-800 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-4 mb-6 rounded-xl bg-slate-800 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 p-4 rounded-xl text-white hover:bg-cyan-400 transition"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;