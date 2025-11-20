import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Cake, Loader2, Sparkles, Gift } from "lucide-react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login({ username, password });
      await login(response.token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.message || "Invalid username or password. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="overflow-hidden rounded-3xl bg-white/80 shadow-2xl backdrop-blur-sm dark:bg-gray-900/80">
        <div className="grid lg:grid-cols-2">
          {/* Left side */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-linear-to-br from-purple-500 via-indigo-500 to-blue-500 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wIDhoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem00LTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wIDhoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem00LTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wIDhoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />

            <div className="relative z-10">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
                  <Cake className="h-12 w-12" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Birthday Tracker</h2>
                  <p className="text-purple-100">Never miss a celebration</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Track Birthdays Easily</h3>
                    <p className="text-sm text-purple-100">
                      Keep all your friends' and family's birthdays in one place
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Gift className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Get Reminders</h3>
                    <p className="text-sm text-purple-100">
                      Receive notifications for upcoming celebrations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Cake className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Celebrate Together</h3>
                    <p className="text-sm text-purple-100">
                      Make every birthday special and memorable
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <p className="italic text-purple-50">
                  "The best way to remember important dates is to have them all
                  in one beautiful place!"
                </p>
                <p className="mt-2 text-sm text-purple-200">— Happy Users</p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 to-blue-500 shadow-lg lg:hidden">
                  <Cake className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome Back! 🎉
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Sign in to continue celebrating
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    disabled={loading}
                    className="h-12 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={loading}
                    className="h-12 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full bg-linear-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    Sign up for free
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
