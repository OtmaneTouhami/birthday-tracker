import type { FriendResponse } from "@/types/friend.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Cake, Calendar } from "lucide-react";
import { formatBirthday, calculateAge } from "@/utils/dateUtils";
import { Badge } from "@/components/ui/badge";

interface FriendCardProps {
  friend: FriendResponse;
  onEdit: (friend: FriendResponse) => void;
  onDelete: (id: string) => void;
}

export const FriendCard = ({ friend, onEdit, onDelete }: FriendCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-xl bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-purple-100 dark:border-purple-900/30">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {friend.firstName} {friend.lastName}
              </h3>
              {friend.isBirthdayToday && (
                <Badge className="bg-linear-to-r from-purple-500 to-blue-500 text-white border-0 shadow-md animate-pulse">
                  <Cake className="mr-1 h-3 w-3" />
                  Today!
                </Badge>
              )}
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-1.5 mr-2">
                  <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span>{formatBirthday(friend.birthDate)}</span>
                <span className="mx-2">•</span>
                <span>Age {calculateAge(friend.birthDate)}</span>
              </div>

              <div className="flex items-center">
                {friend.isBirthdayToday ? (
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    🎉 Birthday is today!
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {friend.daysUntilBirthday === 1
                      ? "Birthday is tomorrow"
                      : `${friend.daysUntilBirthday} days until birthday`}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(friend)}
              className="h-8 w-8 hover:bg-purple-100 dark:hover:bg-purple-900/30"
            >
              <Pencil className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(friend.id)}
              className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
