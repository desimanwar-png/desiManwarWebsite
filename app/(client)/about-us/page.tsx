import TeamMembers from '@/app/TeamMembers';
import Image from 'next/image';
import { Lightbulb, Gem, Handshake } from 'lucide-react'; // Example icons
import ValueCard from './ValueCard';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Continuously seeking new and efficient ways to serve our clients and enhance our product offerings.',
  },
  {
    icon: Gem,
    title: 'Quality',
    description: 'Unwavering commitment to sourcing and delivering only the highest quality agricultural commodities.',
  },
  {
    icon: Handshake,
    title: 'Integrity',
    description: 'Conducting all business with the utmost honesty, transparency, and ethical standards.',
  },
];

export default function AboutUsPage() {
  return (
    <div>
      {/* Header Section */}
      <section
        className="relative h-[300px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/about-us.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
          <p className="text-lg md:text-xl mt-2">
            Learn more about our journey and commitment.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/our-mission.jpg"
              alt="Our Mission"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Mission
            </h2>
            <p className="text-muted-foreground text-lg">
              Our mission is to bridge cultures through the trade of premium
              agricultural commodities. We are dedicated to delivering genuine,
              unadulterated products that reflect the rich heritage of India to
              the global market. We are committed to fostering sustainable
              practices, supporting local farmers, and ensuring every
              transaction is handled with integrity and transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Vision
            </h2>
            <p className="text-muted-foreground text-lg">
              We envision becoming a globally recognized leader in agricultural
              commodity trading, celebrated for our unwavering commitment to
              quality, ethical sourcing, and customer satisfaction. We aim to
              expand our reach, innovate our processes, and build lasting
              relationships that contribute to a healthier, more connected
              world through the power of authentic produce.
            </p>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg lg:order-2">
            <Image
              src="/images/about-us-2.jpg"
              alt="Our Vision"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} value={value} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <TeamMembers />
    </div>
  );
}
