import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import { ChefHat, Users, Calendar, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden bg-[linear-gradient(135deg,hsl(156_32%_96%)_0%,hsl(38_60%_96%)_40%,hsl(45_33%_98%)_100%)]"
        data-testid="hero-section"
      >
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] font-semibold font-['Playfair_Display'] mb-4">
              Discover Your Perfect
              <br />
              <span className="text-[hsl(164_28%_38%)]">Catering Experience</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Book catering services, personal chefs, and bartenders for your special events
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background" data-testid="features-section">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <h2 className="text-3xl font-semibold text-center mb-12 font-['Playfair_Display']">
            Why Choose CaterHub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: ChefHat, title: 'Expert Chefs', desc: 'Top-rated culinary professionals' },
              { icon: Users, title: 'Any Event Size', desc: 'From intimate to grand events' },
              { icon: Calendar, title: 'Easy Booking', desc: 'Simple scheduling process' },
              { icon: Star, title: 'Verified Reviews', desc: 'Real feedback from clients' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(156_32%_94%)] mb-4">
                  <feature.icon className="w-8 h-8 text-[hsl(164_28%_38%)]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[hsl(156_32%_94%)]" data-testid="cta-section">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4 font-['Playfair_Display']">
            Ready to Find Your Perfect Caterer?
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Join thousands of satisfied clients who found their ideal catering service
          </p>
        </div>
      </section>
    </div>
  );
}
