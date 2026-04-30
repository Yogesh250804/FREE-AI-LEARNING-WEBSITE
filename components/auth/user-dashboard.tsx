"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, Mail, Calendar, Shield, BookOpen, Award, Clock, Loader2 } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MOCK_COURSES } from "@/lib/course-service";

export function UserDashboard() {
  const { user, logout, updateProfile } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [progressData, setProgressData] = useState<any[]>([]);
  const [isProgressLoading, setIsProgressLoading] = useState(true);

  // Fetch real progress from MongoDB
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch("/api/progress/me");
        if (res.ok) {
          const data = await res.json();
          setProgressData(data);
        }
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      } finally {
        setIsProgressLoading(false);
      }
    };

    if (user) {
      fetchProgress();
    }
  }, [user]);

  // Sync state when user data changes
  useEffect(() => {
    if (user) {
      setNewName(user.displayName || "");
      setNewEmail(user.email || "");
    }
  }, [user]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;
    
    setIsUpdating(true);
    try {
      await updateProfile({ displayName: newName, email: newEmail });
      toast.success("Profile updated successfully!");
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const getInitials = (name: string | null | undefined, email: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  const formatDate = (timestamp: string | undefined) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };



  const getCourseTitle = (courseId: string) => {
    const course = MOCK_COURSES.find(c => c.id === courseId);
    return course?.title || "Learning Course";
  };

  if (!user) return null;

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getInitials(user.displayName, user.email || "U")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-2xl">Welcome back, {user.displayName || 'User'}!</CardTitle>
                <CardDescription className="flex items-center justify-center gap-2 sm:justify-start">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Shield className="h-4 w-4" />
                    Profile Settings
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Update your personal information here.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleUpdateProfile} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Full Name</Label>
                      <Input
                        id="displayName"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isUpdating}>
                        {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="gap-2"
              >
                {isLoggingOut ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                {isLoggingOut ? "Logging out..." : "Log Out"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Status</p>
                <Badge variant="secondary" className="mt-1">
                  {user?.emailVerified ? "Verified" : "Verified (Local)"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">{formatDate(user?.metadata?.creationTime)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Sign In</p>
                <p className="font-medium">{formatDate(user?.metadata?.lastSignInTime)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              My Courses
            </CardTitle>
            <CardDescription>Continue learning where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isProgressLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : progressData.length > 0 ? (
                progressData.map((progress) => (
                  <div key={progress._id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{getCourseTitle(progress.courseId)}</p>
                      <p className="text-sm text-muted-foreground">Progress: {progress.percentComplete}%</p>
                    </div>
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-secondary">
                      <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ width: `${progress.percentComplete}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No courses started yet.</p>
                  <Button variant="link" asChild className="mt-2">
                    <a href="/firestore-courses">Explore Courses</a>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
            <CardDescription>Your learning milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={`flex items-center gap-3 rounded-lg border p-4 transition-all ${progressData.length > 0 ? "bg-amber-50/50 border-amber-200" : "opacity-50"}`}>
                <div className={`rounded-full p-2 ${progressData.length > 0 ? "bg-amber-100" : "bg-muted"}`}>
                  <Award className={`h-5 w-5 ${progressData.length > 0 ? "text-amber-600" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="font-medium">First Course Enrolled</p>
                  <p className="text-sm text-muted-foreground">
                    {progressData.length > 0 ? "Started your learning journey" : "Enroll in a course to unlock"}
                  </p>
                </div>
              </div>
              
              <div className={`flex items-center gap-3 rounded-lg border p-4 transition-all ${progressData.some(p => p.percentComplete > 20) ? "bg-emerald-50/50 border-emerald-200" : "opacity-50"}`}>
                <div className={`rounded-full p-2 ${progressData.some(p => p.percentComplete > 20) ? "bg-emerald-100" : "bg-muted"}`}>
                  <Award className={`h-5 w-5 ${progressData.some(p => p.percentComplete > 20) ? "text-emerald-600" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="font-medium">Quick Learner</p>
                  <p className="text-sm text-muted-foreground">
                    {progressData.some(p => p.percentComplete > 20) ? "Completed significant portion of a course" : "Reach 20% in any course"}
                  </p>
                </div>
              </div>

              <div className={`flex items-center gap-3 rounded-lg border p-4 transition-all ${progressData.some(p => p.percentComplete === 100) ? "bg-blue-50/50 border-blue-200" : "opacity-50"}`}>
                <div className={`rounded-full p-2 ${progressData.some(p => p.percentComplete === 100) ? "bg-blue-100" : "bg-muted"}`}>
                  <Award className={`h-5 w-5 ${progressData.some(p => p.percentComplete === 100) ? "text-blue-600" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="font-medium">Course Completer</p>
                  <p className="text-sm text-muted-foreground">
                    {progressData.some(p => p.percentComplete === 100) ? "Mastered your first subject!" : "Finish a course to 100%"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
