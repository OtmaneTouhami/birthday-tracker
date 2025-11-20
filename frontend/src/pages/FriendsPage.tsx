import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { friendService } from "@/services/friendService";
import type { FriendResponse, FriendRequest } from "@/types/friend.types";
import { FriendCard } from "@/components/friends/FriendCard";
import { FriendForm } from "@/components/friends/FriendForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getMonth } from "date-fns";

const FriendsPage = () => {
  const [friends, setFriends] = useState<FriendResponse[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<FriendResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<FriendResponse | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState<string | null>(null);

  const months = [
    { value: "all", label: "All Months" },
    { value: "0", label: "January" },
    { value: "1", label: "February" },
    { value: "2", label: "March" },
    { value: "3", label: "April" },
    { value: "4", label: "May" },
    { value: "5", label: "June" },
    { value: "6", label: "July" },
    { value: "7", label: "August" },
    { value: "8", label: "September" },
    { value: "9", label: "October" },
    { value: "10", label: "November" },
    { value: "11", label: "December" },
  ];

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    let filtered = friends;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (f) =>
          f.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Month filter
    if (selectedMonth !== "all") {
      const monthNum = parseInt(selectedMonth);
      filtered = filtered.filter((f) => {
        const birthDate = new Date(f.birthDate);
        return getMonth(birthDate) === monthNum;
      });
    }

    setFilteredFriends(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedMonth, friends]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredFriends.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFriends = filteredFriends.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchFriends = async () => {
    try {
      const data = await friendService.getUpcomingBirthdays();
      setFriends(data);
      setFilteredFriends(data);
    } catch (error: any) {
      toast.error("Failed to load friends");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = () => {
    setSelectedFriend(null);
    setFormOpen(true);
  };

  const handleEditFriend = (friend: FriendResponse) => {
    setSelectedFriend(friend);
    setFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setFriendToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!friendToDelete) return;

    try {
      await friendService.deleteFriend(friendToDelete);
      toast.success("Friend deleted successfully");
      fetchFriends();
    } catch (error: any) {
      toast.error("Failed to delete friend");
    } finally {
      setDeleteDialogOpen(false);
      setFriendToDelete(null);
    }
  };

  const handleSubmit = async (data: FriendRequest) => {
    try {
      if (selectedFriend) {
        await friendService.updateFriend(selectedFriend.id, data);
        toast.success("Friend updated successfully");
      } else {
        await friendService.createFriend(data);
        toast.success("Friend added successfully");
      }
      fetchFriends();
    } catch (error: any) {
      // Handle validation errors
      if (error.errors && Object.keys(error.errors).length > 0) {
        const fieldNames: Record<string, string> = {
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
        // Handle business errors
        toast.error(error.message || "Failed to save friend");
      }
      throw error;
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
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 p-8 shadow-lg border border-purple-100 dark:border-purple-900/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
                Friends 🎉
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your friends and their birthdays
              </p>
            </div>
            <Button
              onClick={handleAddFriend}
              className="bg-linear-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-md"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Friend
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search friends by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-purple-100 dark:border-purple-900/30 shadow-md"
              />
            </div>
            <div className="flex gap-3 mt-1.5">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[180px] h-12 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-purple-100 dark:border-purple-900/30 shadow-md">
                  <SelectValue placeholder="Filter by month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[120px] h-12 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-purple-100 dark:border-purple-900/30 shadow-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 per page</SelectItem>
                  <SelectItem value="12">12 per page</SelectItem>
                  <SelectItem value="24">24 per page</SelectItem>
                  <SelectItem value="48">48 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Info */}
          {(searchQuery || selectedMonth !== "all") && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Showing {filteredFriends.length} of {friends.length} friends
              </span>
              {selectedMonth !== "all" && (
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md">
                  {months.find((m) => m.value === selectedMonth)?.label}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Friends List */}
        {filteredFriends.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-16">
            <Users className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No friends found</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {searchQuery || selectedMonth !== "all"
                ? "No friends match your filters"
                : "Start by adding your first friend"}
            </p>
            {!searchQuery && selectedMonth === "all" && (
              <Button onClick={handleAddFriend}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Friend
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedFriends.map((friend) => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  onEdit={handleEditFriend}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredFriends.length)} of{" "}
                  {filteredFriends.length} friends
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-9"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        // Show first, last, current, and pages around current
                        return (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        );
                      })
                      .map((page, index, array) => (
                        <div key={page} className="flex items-center">
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="px-2 text-muted-foreground">
                              ...
                            </span>
                          )}
                          <Button
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className={
                              currentPage === page
                                ? "bg-linear-to-r from-purple-500 to-blue-500 text-white"
                                : "h-9 w-9"
                            }
                          >
                            {page}
                          </Button>
                        </div>
                      ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-9"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Form Dialog */}
        <FriendForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSubmit}
          friend={selectedFriend}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this friend from your list. This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default FriendsPage;
