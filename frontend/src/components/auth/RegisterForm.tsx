import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Cake, Loader2 } from "lucide-react";
import {
  validateEmail,
  validatePassword,
  getPasswordStrength,
} from "@/utils/validation";
import { Progress } from "@/components/ui/progress";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    birthDate: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.birthDate
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.errors[0]);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const birthDate = new Date(formData.birthDate);
    if (birthDate >= new Date()) {
      toast.error("Birth date must be in the past");
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authService.register(registerData);
      await login(response.token);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      // Handle validation errors
      if (error.errors && Object.keys(error.errors).length > 0) {
        // Display field-specific errors
        const fieldNames: Record<string, string> = {
          username: "Username",
          email: "Email",
          password: "Password",
          firstName: "First name",
          lastName: "Last name",
          birthDate: "Birth date",
        };

        // Show all validation errors
        Object.entries(error.errors).forEach(([field, message]) => {
          const readableField = fieldNames[field] || field;
          toast.error(`${readableField}: ${message}`);
        });
      } else {
        // Handle business errors (like "Username already exists")
        toast.error(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl">
      <div className="overflow-hidden rounded-3xl bg-white/80 shadow-2xl backdrop-blur-sm dark:bg-gray-900/80">
        <div className="grid lg:grid-cols-5">
          {/* Left side */}
          <div className="hidden lg:flex lg:col-span-2 flex-col justify-center p-12 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wIDhoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem00LTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wIDhoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem00LTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wIDhoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10\" />

            <div className="relative z-10">
              <div className="mb-8">
                <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm inline-flex">
                  <Cake className="h-12 w-12" />
                </div>
                <h2 className="text-3xl font-bold mt-4">
                  Join Birthday Tracker
                </h2>
                <p className="text-blue-100 mt-2">
                  Start celebrating life's special moments
                </p>
              </div>

              <div className="space-y-6 mt-12">
                <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="rounded-lg bg-white/20 p-3">
                    <Cake className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      Track Unlimited Birthdays
                    </h3>
                    <p className="text-sm text-pink-100">
                      Add all your loved ones in one place
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="rounded-lg bg-white/20 p-3">
                    <Loader2 className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Smart Reminders</h3>
                    <p className="text-sm text-pink-100">
                      Never miss an important celebration
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="rounded-lg bg-white/20 p-3">
                    <Cake className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      Beautiful Dashboard
                    </h3>
                    <p className="text-sm text-pink-100">
                      Elegant interface for all your dates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center justify-center p-8 lg:p-12 lg:col-span-3">
            <div className="w-full max-w-2xl space-y-6">
              <div className="text-center lg:text-left">
                <div className="mx-auto lg:mx-0 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-500 shadow-lg lg:hidden">
                  <Cake className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Create Your Account 🎊
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Join us and never miss a birthday again
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      disabled={loading}
                      className="h-11 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      disabled={loading}
                      className="h-11 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="johndoe"
                      disabled={loading}
                      className="h-11 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      disabled={loading}
                      className="h-11 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="birthDate"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Your Birth Date
                  </Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-11 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      disabled={loading}
                      className="h-11 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
                    />
                    {formData.password && (
                      <div className="space-y-1">
                        <Progress
                          value={passwordStrength.percentage}
                          className={`h-2 ${
                            passwordStrength.strength === "strong"
                              ? "[&>div]:bg-green-500"
                              : passwordStrength.strength === "medium"
                              ? "[&>div]:bg-yellow-500"
                              : "[&>div]:bg-red-500"
                          }`}
                        />
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Strength:{" "}
                          <span className="capitalize font-medium">
                            {passwordStrength.strength}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      disabled={loading}
                      className="h-11 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full bg-linear-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
