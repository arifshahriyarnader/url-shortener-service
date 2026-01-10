import { useState } from "react";
import { authService } from "../auth";
import { useNavigate } from "react-router";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [honeypot, setHoneypot] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "honeypot") {
      setHoneypot(e.target.value);
      return;
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    if (honeypot) {
      console.log("Bot detected!");
      return;
    }
    if (!formData.email || !formData.password) {
      alert("Email and password are required");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    try {
      await authService.signupService(payload);
      alert("Signup successful! Please log in.");
      setTimeout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error("Signup error:", error);
      alert("SIgnup failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <input
          type="text"
          name="honeypot"
          value={honeypot}
          onChange={handleChange}
          className="hidden"
          autoComplete="off"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
