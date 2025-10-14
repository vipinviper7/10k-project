import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Search } from 'lucide-react';

export default function SearchBar({ className = '' }) {
  const navigate = useNavigate();
  const [cuisine, setCuisine] = useState('');
  const [eventType, setEventType] = useState('');
  const [guests, setGuests] = useState([50]);
  const [city, setCity] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (cuisine) params.append('cuisine', cuisine);
    if (eventType) params.append('eventType', eventType);
    if (guests[0] > 0) params.append('minGuests', guests[0].toString());
    if (city) params.append('city', city);
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <label className="block text-sm font-medium">City</label>
          <Input
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            data-testid="city-input"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Cuisine</label>
          <Select value={cuisine} onValueChange={setCuisine}>
            <SelectTrigger data-testid="cuisine-select-trigger">
              <SelectValue placeholder="Select cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Italian">Italian</SelectItem>
              <SelectItem value="Indian">Indian</SelectItem>
              <SelectItem value="Japanese">Japanese</SelectItem>
              <SelectItem value="Mexican">Mexican</SelectItem>
              <SelectItem value="Chinese">Chinese</SelectItem>
              <SelectItem value="American">American</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Event Type</label>
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger data-testid="event-type-select-trigger">
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="party">Party</SelectItem>
              <SelectItem value="birthday">Birthday</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Guests: {guests[0]}</label>
          <Slider
            value={guests}
            onValueChange={setGuests}
            max={500}
            step={10}
            data-testid="guests-slider"
          />
        </div>
      </div>

      <Button
        onClick={handleSearch}
        className="w-full md:w-auto mt-4 bg-[hsl(164_28%_38%)] text-[hsl(45_33%_98%)] hover:bg-[hsl(164_28%_34%)] gap-2"
        data-testid="search-submit-button"
      >
        <Search className="h-4 w-4" />
        Search Providers
      </Button>
    </div>
  );
}