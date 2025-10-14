import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { Star, Users, MapPin } from 'lucide-react';

export default function ProviderCard({ provider }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      data-testid="results-provider-card"
    >
      <Card className="overflow-hidden rounded-xl border hover:shadow-lg transition-shadow duration-200">
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          <img
            src={provider.images[0] || 'https://images.unsplash.com/photo-1671612451404-f4f8fc5fe25e?crop=entropy&cs=srgb&fm=jpg&q=85'}
            alt={provider.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4 space-y-3">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg font-['Karla']">{provider.name}</h3>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{provider.rating}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{provider.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span>{provider.city}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {provider.cuisines.slice(0, 3).map((c, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">{c}</Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <div className="text-xs text-muted-foreground">from</div>
              <div className="font-semibold text-lg" data-testid="provider-price-text">
                ${provider.pricePerGuest}/guest
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{provider.minGuests}-{provider.maxGuests}</span>
            </div>
          </div>

          <Button
            onClick={() => navigate(`/provider/${provider.id}`)}
            className="w-full bg-[hsl(164_28%_38%)] text-[hsl(45_33%_98%)] hover:bg-[hsl(164_28%_34%)]"
            data-testid="view-profile-button"
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}