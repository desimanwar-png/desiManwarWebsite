import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { BadgeCheck, DollarSign, Globe, Leaf, ShoppingCart } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: BadgeCheck,
    title: 'QUALITY',
    description: 'Brazilian ICUMSA 45 sets the global gold standard for refined sugar purity, backed by ISO-certified mills.',
  },
  {
    icon: ShoppingCart,
    title: 'VOLUME',
    description: 'Contract-based allocations from 12,500 MT upwards, sourced through our exclusive Brazilian network for stable, long-term supply.',
  },
  {
    icon: DollarSign,
    title: 'SPEED',
    description: 'Binding quotes in 24 hours, with pre-vetted suppliers and streamlined documentation for fast execution.',
  },
  {
    icon: Globe,
    title: 'EDGE',
    description: 'We leverage Brazil’s pricing cycles to secure your contract terms – whether fixed or index-linked.',
  },
  {
    icon: Leaf,
    title: 'CONTROL',
    description: 'Flexible CIF contracts with SGS-verified quality and real-time shipment tracking - no surprises.',
  },
];

export default function CommodityPage() {
  return (
    <div>
      {/* Header Section */}
      <section className="relative w-full h-[90vh] mb-8">
        <Image
          src="/images/commodity_sugar_mobile.jpg"
          alt="Commodity Header Mobile"
          fill
          className="object-cover lg:hidden"
        />
        <Image
          src="/images/commodity_sugar_pc.jpg"
          alt="Commodity Header Desktop"
          fill
          className="object-cover hidden lg:block"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-start justify-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-wide">
              Brazilian Sugar
            </h1>
            <p className="py-2 font-semibold text-white">
              THE GOLD STANDARD OF SUGAR{' '}
              <span className="text-amber-400">
                ICUMSA 45 Straight from Brazil
              </span>
            </p>
            <p>
              <Link href="/contact">
                <Button>Get a Quote</Button>
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section
        className="w-full h-[80vh] mt-16 bg-fixed bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/commodity_bg.png')" }}
      >
        <div className="w-full h-full bg-black/60 flex items-center justify-center"></div>
      </section>
    </div>
  );
}