import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { profileService } from "@/services/profileService";
import type {
  ProfileRequest,
  ChangePasswordRequest,
} from "@/types/profile.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, User, Lock, Trash2 } from "lucide-react";
import { formatDateForInput, formatDate } from "@/utils/dateUtils";
import { validatePassword } from "@/utils/validation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, refreshUser, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  const [profileData, setProfileData] = useState<ProfileRequest>({
    username: user?.username || "",
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    birthDate: user?.birthDate || "",
  });

  const [passwordData, setPasswordData] = useState<ChangePasswordRequest>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await profileService.updateProfile(profileData);
      await refreshUser();
      toast.success("Profile updated successfully");
      setEditing(false);
    } catch (error: any) {
      // Handle validation errors
      if (error.errors && Object.keys(error.errors).length > 0) {
        const fieldNames: Record<string, string> = {
          username: "Username",
          email: "Email",
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
        toast.error(error.message || "Failed to update profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validatePassword(passwordData.newPassword);
    if (!validation.isValid) {
      toast.error(validation.errors[0]);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await profileService.changePassword(passwordData);
      toast.success("Password changed successfully");
      setPasswordDialogOpen(false);
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error: any) {
      // Handle validation errors
      if (error.errors && Object.keys(error.errors).length > 0) {
        // Display all validation errors
        const fieldNames: Record<string, string> = {
          oldPassword: "Current password",
          newPassword: "New password",
          confirmNewPassword: "Password confirmation",
        };

        // Show the first error with readable field name
        const firstError = Object.entries(error.errors)[0];
        const [field, message] = firstError as [string, string];
        const readableField = fieldNames[field] || field;
        toast.error(`${readableField}: ${message}`);

        // If there are multiple errors, show them too
        const additionalErrors = Object.entries(error.errors).slice(1);
        additionalErrors.forEach(([field, message]) => {
          const readableField = fieldNames[field] || field;
          toast.error(`${readableField}: ${message}`);
        });
      } else {
        // Handle business errors (like "Invalid old password")
        toast.error(
          error.message || "Failed to change password. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await profileService.deleteProfile();
      toast.success("Account deleted successfully");
      logout();
      navigate("/login");
    } catch (error: any) {
      const errorMessage =
        error.message || "Failed to delete account. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 p-8 shadow-lg border border-purple-100 dark:border-purple-900/30">
          <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
            Profile Settings ⚙️
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account information
          </p>
        </div>

        {/* Profile Information */}
        <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-purple-100 dark:border-purple-900/30 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
                    <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </div>
              {!editing && (
                <Button
                  onClick={() => setEditing(true)}
                  className="bg-linear-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {editing ? (
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formatDateForInput(profileData.birthDate)}
                    onChange={handleProfileChange}
                    disabled={loading}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={loading}>
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditing(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">First Name</p>
                    <p className="font-medium">{user?.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Name</p>
                    <p className="font-medium">{user?.lastName}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="font-medium">{user?.username}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Birth Date</p>
                  <p className="font-medium">
                    {user?.birthDate && formatDate(user.birthDate)}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-purple-100 dark:border-purple-900/30 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
                <Lock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              Security
            </CardTitle>
            <CardDescription>
              Manage your password and security settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog
              open={passwordDialogOpen}
              onOpenChange={setPasswordDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    Enter your current password and choose a new one
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="oldPassword">Current Password</Label>
                    <Input
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmNewPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      type="password"
                      value={passwordData.confirmNewPassword}
                      onChange={handlePasswordChange}
                      disabled={loading}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPasswordDialogOpen(false)}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Change Password
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-red-200 dark:border-red-900/30 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2">
                <Trash2 className="h-5 w-5" />
              </div>
              Danger Zone
            </CardTitle>
            <CardDescription>
              Permanent actions that cannot be undone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove all your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive"
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
