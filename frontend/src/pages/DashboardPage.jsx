import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Calendar, Clock, Users, DollarSign } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function DashboardPage() {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8" data-testid="dashboard-page">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold font-['Playfair_Display'] mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage your catering reservations</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <Card className="text-center py-16" data-testid="no-bookings">
            <CardContent>
              <p className="text-xl text-muted-foreground mb-2">No bookings yet</p>
              <p className="text-sm text-muted-foreground">Start exploring providers to make your first booking</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4" data-testid="bookings-list">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid="booking-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">{booking.provider_name}</CardTitle>
                      <Badge className={getStatusColor(booking.status)} data-testid="booking-status">
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold">${booking.price}</div>
                      <div className="text-xs text-muted-foreground">total</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Date</div>
                        <div className="font-medium">{format(new Date(booking.date), 'MMM dd, yyyy')}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Time</div>
                        <div className="font-medium">{booking.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Guests</div>
                        <div className="font-medium">{booking.guests}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Event</div>
                        <div className="font-medium capitalize">{booking.event_type}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
