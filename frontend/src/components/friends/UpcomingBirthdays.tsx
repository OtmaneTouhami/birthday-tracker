import type { FriendResponse } from "@/types/friend.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cake, Calendar } from "lucide-react";
import { formatBirthday } from "@/utils/dateUtils";
import { Badge } from "@/components/ui/badge";

interface UpcomingBirthdaysProps {
  friends: FriendResponse[];
}

export const UpcomingBirthdays = ({ friends }: UpcomingBirthdaysProps) => {
  const upcomingFriends = friends.slice(0, 5);

  if (upcomingFriends.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-purple-100 dark:border-purple-900/30 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
              <Cake className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            Upcoming Birthdays
          </CardTitle>
          <CardDescription>Next birthdays to celebrate</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 dark:text-gray-400">
            No upcoming birthdays. Add some friends!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-purple-100 dark:border-purple-900/30 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
            <Cake className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          Upcoming Birthdays
        </CardTitle>
        <CardDescription>Next birthdays to celebrate</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between rounded-xl border border-purple-100 dark:border-purple-900/30 bg-white/50 dark:bg-gray-800/50 p-4 transition-all hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-purple-400 to-blue-400">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {friend.firstName} {friend.lastName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatBirthday(friend.birthDate)}
                  </p>
                </div>
              </div>

              {friend.isBirthdayToday ? (
                <Badge className="bg-linear-to-r from-purple-500 to-blue-500 text-white border-0 shadow-md">
                  Today! 🎉
                </Badge>
              ) : friend.daysUntilBirthday <= 7 ? (
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                >
                  {friend.daysUntilBirthday}{" "}
                  {friend.daysUntilBirthday === 1 ? "day" : "days"}
                </Badge>
              ) : (
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {friend.daysUntilBirthday} days
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
