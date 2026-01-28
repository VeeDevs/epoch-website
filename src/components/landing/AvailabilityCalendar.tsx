import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface Availability {
  id: string;
  date: string;
  is_available: boolean;
  max_bookings: number;
  current_bookings: number;
  notes: string | null;
}

export const AvailabilityCalendar = () => {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availabilityInfo, setAvailabilityInfo] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const { data, error } = await supabase
        .from("availability")
        .select("*")
        .gte("date", new Date().toISOString().split("T")[0]);

      if (error) throw error;
      if (data) setAvailability(data);
    } catch (error) {
      console.error("Error fetching availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateStr = date.toISOString().split("T")[0];
      const info = availability.find((a) => a.date === dateStr);
      setAvailabilityInfo(info || null);
    }
  };

  const isDateAvailable = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    const availInfo = availability.find((a) => a.date === dateStr);
    return availInfo?.is_available || false;
  };

  const isDateFull = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    const availInfo = availability.find((a) => a.date === dateStr);
    return (
      availInfo && availInfo.current_bookings >= availInfo.max_bookings && !availInfo.is_available
    );
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-epoch-cream to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-epoch-espresso mb-4 text-center">
            Check Availability
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            See our live availability calendar and book your perfect date
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Card className="border-2 border-epoch-gold/20">
              <CardContent className="pt-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => {
                    // Disable past dates and fully booked dates
                    return (
                      date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                      isDateFull(date)
                    );
                  }}
                  className="rounded-md"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Availability Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-6"
          >
            {selectedDate && (
              <>
                <Card className="border-2 border-epoch-gold/20">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {availabilityInfo ? (
                      <>
                        <div className="flex items-center gap-3">
                          {availabilityInfo.is_available ? (
                            <>
                              <CheckCircle className="w-6 h-6 text-green-600" />
                              <div>
                                <p className="font-semibold text-green-600">Available</p>
                                <p className="text-sm text-muted-foreground">
                                  {availabilityInfo.max_bookings - availabilityInfo.current_bookings}{" "}
                                  slot{availabilityInfo.max_bookings - availabilityInfo.current_bookings !== 1 ? "s" : ""} remaining
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-6 h-6 text-red-600" />
                              <div>
                                <p className="font-semibold text-red-600">Fully Booked</p>
                                <p className="text-sm text-muted-foreground">
                                  {availabilityInfo.current_bookings} / {availabilityInfo.max_bookings} bookings
                                </p>
                              </div>
                            </>
                          )}
                        </div>

                        {availabilityInfo.notes && (
                          <div className="p-4 bg-epoch-cream/50 rounded-lg border border-epoch-gold/20">
                            <p className="text-sm font-medium text-epoch-espresso">
                              📝 {availabilityInfo.notes}
                            </p>
                          </div>
                        )}

                        {availabilityInfo.is_available && (
                          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <p className="text-sm text-green-700">
                              ✓ This date is available for booking. Proceed to book your session!
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-2">
                          No availability data for this date
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Please check another date or contact us directly
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Legend */}
                <Card className="bg-gradient-to-br from-epoch-cream/30 to-transparent border-epoch-gold/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Legend</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">Fully Booked</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span className="text-sm">Past Dates</span>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
