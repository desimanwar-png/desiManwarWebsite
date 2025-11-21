import { Globe, Package, Users, FileText } from 'lucide-react';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: Globe,
    title: 'Global Sourcing & Export',
    description:
      'Our extensive network allows us to source high-quality agricultural products directly from farms across India. We manage the entire export process, ensuring that our products reach you fresh and on time, no matter where you are in the world.',
  },
  {
    icon: Package,
    title: 'Private Label & Custom Packaging',
    description:
      'We offer customizable private labeling and packaging solutions to meet your branding needs. Our team works with you to create packaging that reflects your brand identity while ensuring product safety and quality.',
  },
  {
    icon: Users,
    title: 'Wholesale & Bulk Supply',
    description:
      'We specialize in wholesale and bulk supply of a wide range of agricultural commodities. Our efficient supply chain and large-volume capacity enable us to offer competitive pricing and reliable delivery for your business.',
  },
  {
    icon: FileText,
    title: 'Trade Consulting & Docs Support',
    description:
      'Our experienced team provides expert trade consulting and documentation support to facilitate smooth and hassle-free international transactions. We guide you through the complexities of trade regulations, compliance, and logistics.',
  },
];

export default function OurServicesPage() {
  return (
    <div>
      {/* Header Section */}
      <section
        className="relative h-[300px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/our-products.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>
          <p className="text-lg md:text-xl mt-2">
            Providing comprehensive solutions for your agricultural commodity needs.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
