import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { friendService } from "@/services/friendService";
import type { FriendResponse } from "@/types/friend.types";
import { UpcomingBirthdays } from "@/components/friends/UpcomingBirthdays";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Cake, Calendar, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashboardPage = () => {
  const { user } = useAuth();
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<FriendResponse[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, thisMonth: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [upcoming, all] = await Promise.all([
        friendService.getUpcomingBirthdays(),
        friendService.getAllFriends(),
      ]);
      setUpcomingBirthdays(upcoming);

      const currentMonth = new Date().getMonth();
      const thisMonth = all.filter((f) => {
        const birthMonth = new Date(f.birthDate).getMonth();
        return birthMonth === currentMonth;
      }).length;

      setStats({ total: all.length, thisMonth });
    } catch (error: any) {
      toast.error(error.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 p-8 shadow-lg border border-purple-100 dark:border-purple-900/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Keep track of your friends' special days
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-purple-100 dark:border-purple-900/30 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Friends
              </CardTitle>
              <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {stats.total}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Friends added to your list
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-indigo-100 dark:border-indigo-900/30 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                This Month
              </CardTitle>
              <div className="rounded-lg bg-indigo-100 dark:bg-indigo-900/30 p-2">
                <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                {stats.thisMonth}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Birthdays this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-blue-100 dark:border-blue-900/30 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Coming Soon
              </CardTitle>
              <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                <Cake className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {
                  upcomingBirthdays.filter((f) => f.daysUntilBirthday <= 7)
                    .length
                }
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Next 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Birthdays and Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <UpcomingBirthdays friends={upcomingBirthdays} />
          </div>

          <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-purple-100 dark:border-purple-900/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => navigate("/friends")}
                className="w-full justify-start bg-linear-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-md"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Friend
              </Button>
              <Button
                onClick={() => navigate("/friends")}
                className="w-full justify-start border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                variant="outline"
              >
                <Users className="mr-2 h-4 w-4" />
                View All Friends
              </Button>
              <Button
                onClick={() => navigate("/profile")}
                className="w-full justify-start border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                variant="outline"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
