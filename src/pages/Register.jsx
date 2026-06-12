import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-3xl w-[400px]"
      >
        <h1 className="text-4xl font-bold text-white mb-6">
          Register
        </h1>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-xl bg-slate-800 text-white"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-xl bg-slate-800 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-4 mb-6 rounded-xl bg-slate-800 text-white"
        />

        <button className="w-full bg-cyan-500 p-4 rounded-xl text-white">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;