import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../App';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar } from '../components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Skeleton } from '../components/ui/skeleton';
import { Star, MapPin, Users } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { format } from 'date-fns';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function ProviderPage() {
  const { id } = useParams();
  const { user, token, setShowAuthModal } = useContext(AuthContext);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    date: null,
    time: '18:00',
    guests: [80],
    event_type: 'party'
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchProvider();
  }, [id]);

  const fetchProvider = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/providers/${id}`);
      setProvider(response.data);
    } catch (error) {
      console.error('Failed to fetch provider:', error);
      toast.error('Provider not found');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!bookingData.date) {
      toast.error('Please select a date');
      return;
    }

    setBookingLoading(true);
    try {
      const payload = {
        provider_id: provider.id,
        date: format(bookingData.date, 'yyyy-MM-dd'),
        time: bookingData.time,
        guests: bookingData.guests[0],
        event_type: bookingData.event_type
      };

      await axios.post(`${API}/bookings`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Booking request sent successfully!', {
        description: 'The provider will contact you soon.'
      });
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <Skeleton className="h-96 w-full rounded-xl mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Provider not found</p>
      </div>
    );
  }

  const totalPrice = provider.pricePerGuest * bookingData.guests[0];

  return (
    <div className="min-h-screen bg-background py-8" data-testid="provider-page">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        {/* Hero Image */}
        <div className="aspect-[21/9] bg-muted rounded-xl overflow-hidden mb-6">
          <img
            src={provider.images[0] || 'https://images.unsplash.com/photo-1671612451404-f4f8fc5fe25e?crop=entropy&cs=srgb&fm=jpg&q=85'}
            alt={provider.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Provider Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-semibold font-['Playfair_Display'] mb-2">
                    {provider.name}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{provider.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{provider.rating} rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{provider.minGuests}-{provider.maxGuests} guests</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap mb-4">
                {provider.cuisines.map((c, idx) => (
                  <Badge key={idx} variant="secondary">{c}</Badge>
                ))}
              </div>

              <p className="text-foreground/80">{provider.description}</p>
            </div>

            {/* Accordion Sections */}
            <Accordion type="single" collapsible className="w-full" defaultValue="specialties">
              <AccordionItem value="specialties">
                <AccordionTrigger>Specialties</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {provider.specialties.map((specialty, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[hsl(164_28%_38%)] rounded-full"></span>
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="menus">
                <AccordionTrigger>Menus & Options</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {provider.menus.map((menu, idx) => (
                      <div key={idx} className="p-3 bg-muted rounded-lg">
                        <p>{menu}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="events">
                <AccordionTrigger>Event Types</AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-2 flex-wrap">
                    {provider.eventTypes.map((event, idx) => (
                      <Badge key={idx}>{event}</Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Right Column - Booking Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="p-6 rounded-xl border bg-card space-y-4" data-testid="booking-panel">
              <div className="text-center pb-4 border-b">
                <div className="text-sm text-muted-foreground">Starting from</div>
                <div className="text-3xl font-semibold">${provider.pricePerGuest}/guest</div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={bookingData.date}
                    onSelect={(date) => setBookingData({ ...bookingData, date })}
                    className="rounded-md border"
                    data-testid="booking-date-calendar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Event Time</label>
                  <Select value={bookingData.time} onValueChange={(time) => setBookingData({ ...bookingData, time })}>
                    <SelectTrigger data-testid="booking-time-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM</SelectItem>
                      <SelectItem value="18:00">6:00 PM</SelectItem>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Guests: {bookingData.guests[0]}</label>
                  <Slider
                    value={bookingData.guests}
                    onValueChange={(guests) => setBookingData({ ...bookingData, guests })}
                    min={provider.minGuests}
                    max={provider.maxGuests}
                    step={10}
                    data-testid="booking-guests-slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Event Type</label>
                  <Select value={bookingData.event_type} onValueChange={(event_type) => setBookingData({ ...bookingData, event_type })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="party">Party</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Total</span>
                    <span className="font-semibold" data-testid="booking-price-summary">${totalPrice}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Final price may vary based on customizations
                  </p>
                </div>

                <Button
                  onClick={handleBook}
                  disabled={bookingLoading}
                  className="w-full bg-[hsl(164_28%_38%)] text-[hsl(45_33%_98%)] hover:bg-[hsl(164_28%_34%)]"
                  data-testid="profile-book-button"
                >
                  {bookingLoading ? 'Sending Request...' : 'Request Booking'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
