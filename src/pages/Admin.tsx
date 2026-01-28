import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  ArrowLeft,
  Image,
  MessageSquare,
  Calendar,
  Check,
  X,
  Star,
  LogOut,
} from "lucide-react";
import { format } from "date-fns";

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string | null;
  is_approved: boolean;
  created_at: string;
}

interface Review {
  id: string;
  author_name: string;
  content: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
}

interface Booking {
  id: string;
  guest_name: string;
  guest_email: string;
  booking_date: string;
  booking_time: string;
  package_type: string;
  status: string;
  total_amount: number | null;
  created_at: string;
}

export default function Admin() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }
    if (!loading && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    if (!loading && isAdmin) {
      fetchAllData();
    }
  }, [user, loading, isAdmin, navigate]);

  const fetchAllData = async () => {
    setLoadingData(true);
    await Promise.all([fetchGallery(), fetchReviews(), fetchBookings()]);
    setLoadingData(false);
  };

  const fetchGallery = async () => {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setGallery(data);
  };

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
  };

  const fetchBookings = async () => {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setBookings(data);
  };

  const toggleGalleryApproval = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("gallery")
      .update({ is_approved: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: currentStatus ? "Photo hidden" : "Photo approved",
        description: currentStatus
          ? "Photo removed from public gallery"
          : "Photo is now visible in the gallery",
      });
      fetchGallery();
    }
  };

  const toggleReviewApproval = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: currentStatus ? "Review hidden" : "Review approved",
        description: currentStatus
          ? "Review removed from public view"
          : "Review is now visible publicly",
      });
      fetchReviews();
    }
  };

  const deleteGalleryItem = async (id: string) => {
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Photo removed permanently" });
      fetchGallery();
    }
  };

  const deleteReview = async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Review removed permanently" });
      fetchReviews();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <header className="bg-epoch-espresso py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="text-epoch-cream hover:text-epoch-gold">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Site
            </Button>
          </Link>
          <h1 className="text-2xl font-serif text-epoch-cream">Admin Dashboard</h1>
          <Button
            variant="outline"
            className="border-epoch-gold text-epoch-gold hover:bg-epoch-gold hover:text-epoch-espresso"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Dashboard */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Photos
                </CardTitle>
                <Image className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{gallery.length}</div>
                <p className="text-xs text-muted-foreground">
                  {gallery.filter((g) => g.is_approved).length} approved
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Reviews
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reviews.length}</div>
                <p className="text-xs text-muted-foreground">
                  {reviews.filter((r) => r.is_approved).length} visible
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Bookings
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bookings.length}</div>
                <p className="text-xs text-muted-foreground">
                  {bookings.filter((b) => b.status === "confirmed").length} confirmed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Photos
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Reviews
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Bookings
              </TabsTrigger>
            </TabsList>

            {/* Gallery Tab */}
            <TabsContent value="gallery">
              <Card>
                <CardHeader>
                  <CardTitle>Photo Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  {gallery.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No photos submitted yet
                    </p>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {gallery.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="relative group rounded-lg overflow-hidden border border-border"
                        >
                          <img
                            src={item.image_url}
                            alt={item.caption || "Gallery photo"}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge
                              variant={item.is_approved ? "default" : "secondary"}
                            >
                              {item.is_approved ? "Approved" : "Pending"}
                            </Badge>
                          </div>
                          <div className="p-3 bg-card">
                            <p className="text-sm text-muted-foreground truncate">
                              {item.caption || "No caption"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(item.created_at), "MMM d, yyyy")}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Button
                                size="sm"
                                variant={item.is_approved ? "outline" : "default"}
                                onClick={() =>
                                  toggleGalleryApproval(item.id, item.is_approved)
                                }
                              >
                                {item.is_approved ? (
                                  <>
                                    <X className="h-3 w-3 mr-1" />
                                    Hide
                                  </>
                                ) : (
                                  <>
                                    <Check className="h-3 w-3 mr-1" />
                                    Approve
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteGalleryItem(item.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {reviews.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No reviews yet
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Author</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Content</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reviews.map((review) => (
                          <TableRow key={review.id}>
                            <TableCell className="font-medium">
                              {review.author_name}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "fill-epoch-gold text-epoch-gold"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {review.content}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={review.is_approved ? "default" : "secondary"}
                              >
                                {review.is_approved ? "Visible" : "Hidden"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {format(new Date(review.created_at), "MMM d, yyyy")}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant={review.is_approved ? "outline" : "default"}
                                  onClick={() =>
                                    toggleReviewApproval(review.id, review.is_approved)
                                  }
                                >
                                  {review.is_approved ? "Hide" : "Show"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteReview(review.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  {bookings.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No bookings yet
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Guest</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Package</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">
                              {booking.guest_name}
                            </TableCell>
                            <TableCell>{booking.guest_email}</TableCell>
                            <TableCell>
                              {format(new Date(booking.booking_date), "MMM d, yyyy")}
                            </TableCell>
                            <TableCell>{booking.booking_time}</TableCell>
                            <TableCell className="capitalize">
                              {booking.package_type}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  booking.status === "confirmed"
                                    ? "default"
                                    : booking.status === "pending"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {booking.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {booking.total_amount
                                ? `R${booking.total_amount}`
                                : "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
