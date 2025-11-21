import { Shield, Truck, Globe, Leaf } from 'lucide-react'
import Image from 'next/image'

const features = [
  {
    icon: Shield,
    title: 'Authenticity and Purity',
    description:
      'We are committed to delivering genuine, unadulterated products that reflect the rich agricultural heritage of India.',
  },
  {
    icon: Truck,
    title: 'Direct Sourcing',
    description:
      'Our direct relationships with local farmers ensure the highest quality and authenticity of our products.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description:
      'We cater to diverse markets worldwide, ensuring the availability of authentic Indian agriculture products globally.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Practices',
    description:
      'Our sourcing and production methods are environmentally conscious, promoting sustainable farming and ethical practices.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Desi Manwar
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose us for authentic and high quality Indian agriculture products
            that showcase the diversity of Indian farming.
          </p>
        </div>

        {/* Two Column Layout: Image + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Side */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/why-us.jpg"
              alt="Why Choose Desi Manwar"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Features Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="p-6 rounded-lg hover:bg-muted transition-colors border border-border"
                >
                  <div className="flex justify-start mb-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
