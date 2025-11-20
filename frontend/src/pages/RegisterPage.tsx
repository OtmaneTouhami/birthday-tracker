import { RegisterForm } from "@/components/auth/RegisterForm";
import { Cake, Gift, PartyPopper, Sparkles } from "lucide-react";

const RegisterPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-purple-50 via-slate-50 to-blue-50 dark:from-gray-950 dark:via-slate-950/20 dark:to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-20 h-72 w-72 animate-pulse rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-500/10" />
        <div className="absolute -right-4 top-40 h-96 w-96 animate-pulse rounded-full bg-slate-200/30 blur-3xl delay-1000 dark:bg-slate-500/10" />
        <div className="absolute bottom-20 left-1/3 h-80 w-80 animate-pulse rounded-full bg-blue-200/30 blur-3xl delay-500 dark:bg-blue-500/10" />
      </div>

      {/* Floating birthday icons */}
      <div className="absolute inset-0 overflow-hidden">
        <Cake className="absolute left-[10%] top-[15%] h-8 w-8 animate-bounce text-purple-300/40 delay-300 dark:text-purple-400/20" />
        <Gift className="absolute right-[15%] top-[25%] h-10 w-10 animate-bounce text-slate-300/40 delay-700 dark:text-slate-400/20" />
        <PartyPopper className="absolute left-[20%] bottom-[20%] h-9 w-9 animate-bounce text-blue-300/40 delay-500 dark:text-blue-400/20" />
        <Sparkles className="absolute right-[10%] bottom-[30%] h-7 w-7 animate-bounce text-purple-300/40 delay-1000 dark:text-purple-400/20" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
