import { Navbar } from "./Navbar";
import { Cake, Gift, Sparkles } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-slate-50 to-blue-50 dark:from-gray-950 dark:via-slate-950/20 dark:to-gray-900 relative">
      {/* Subtle animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-4 top-20 h-96 w-96 animate-pulse rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-500/5" />
        <div className="absolute -right-4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-slate-200/20 blur-3xl delay-1000 dark:bg-slate-500/5" />
        <div className="absolute bottom-20 left-1/3 h-96 w-96 animate-pulse rounded-full bg-blue-200/20 blur-3xl delay-500 dark:bg-blue-500/5" />
      </div>

      {/* Subtle floating icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Cake className="absolute left-[5%] top-[20%] h-6 w-6 animate-pulse text-purple-300/20 delay-300 dark:text-purple-400/10" />
        <Gift className="absolute right-[8%] top-[40%] h-7 w-7 animate-pulse text-slate-300/20 delay-700 dark:text-slate-400/10" />
        <Sparkles className="absolute left-[15%] bottom-[25%] h-6 w-6 animate-pulse text-blue-300/20 delay-500 dark:text-blue-400/10" />
      </div>

      <Navbar />
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 relative z-10">
        {children}
      </main>
    </div>
  );
};
