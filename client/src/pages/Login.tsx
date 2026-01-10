import { useState } from "react";
import type { LoginData } from "../auth/authTypes";
import { authService } from "../auth";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}
export const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", formData);
    const payload: LoginData = {
      type: "email",
      email: formData.email,
      password: formData.password,
    };
    try {
      const authUser = await authService.login(payload);
      alert("Login successful!");

      console.log("Logged in user:", authUser);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
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
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};
