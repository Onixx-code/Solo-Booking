import React from 'react';
import { Hero } from '../components/Hero';
import { CuratedTours } from '../components/CuratedTours';
import { PricingCalculator } from '../components/PricingCalculator';
import { RouteSimulator } from '../components/RouteSimulator';
import { BuddyShowcase } from '../components/BuddyShowcase';
import { AbroadTravellerSection } from '../components/AbroadTravellerSection';
import { ExpansionRoadmap } from '../components/ExpansionRoadmap';
import { BecomeBuddySection } from '../components/BecomeBuddySection';
import { Testimonials } from '../components/Testimonials';
import { FaqSection } from '../components/FaqSection';

export function HomePage({ currentCurrency, onOpenBooking, onSelectTour }) {
  return (
    <>
      <Hero
        onOpenBooking={onOpenBooking}
        onSelectTour={onSelectTour}
      />
      <PricingCalculator
        currentCurrency={currentCurrency}
        onOpenBooking={onOpenBooking}
      />
      <RouteSimulator
        onOpenBooking={onOpenBooking}
      />
      <CuratedTours
        currentCurrency={currentCurrency}
        onOpenBooking={onOpenBooking}
      />
      <BuddyShowcase
        onOpenBooking={onOpenBooking}
      />
      <AbroadTravellerSection
        onOpenBooking={onOpenBooking}
      />
      <ExpansionRoadmap />
      <BecomeBuddySection />
      <Testimonials />
      <FaqSection />
    </>
  );
}
