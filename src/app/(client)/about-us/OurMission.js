import React from 'react'

const missionContent = [
  {
    heading: 'Global Reach',
    subheading: 'Connecting Businesses Worldwide',
    description:
      'With a strong presence in international markets, we connect businesses worldwide. Our strategic sourcing and distribution network enable us to deliver efficiently, no matter where you are.',
  },
  {
    heading: 'Quality Assurance',
    subheading: 'Global Standards, Consistent Quality',
    description:
      'We follow strict quality control measures to ensure every product meets global standards. Our suppliers and manufacturing partners adhere to rigorous certification processes, ensuring consistency in every shipment.',
  },
  {
    heading: 'Customer-Centric Approach',
    subheading: 'Your success is our priority',
    description:
      'At Desi Manwar, we put our clients at the center of everything we do. Understanding your needs, providing customized solutions, and ensuring smooth transactions are our core strengths. We believe in long-term collaborations and are committed to supporting your business growth by offering competitive pricing, flexible payment terms, and reliable service.',
  },
]

function OurMission() {
  return (
    <section
      className="relative overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('/images/our-mission.jpg')" }}
    >
      <div className="absolute inset-0 bg-primary-dark/80 backdrop-blur-sm z-0"></div>

      <div className="relative z-[1] px-4 lg:px-20 py-16 flex flex-col items-center justify-center h-full text-center">
        <div className="relative">
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 text-transparent bg-clip-text">
            <span
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: "url('/images/our-mission.jpg')",
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Our Mission
            </span>
            <span className="invisible">Our Mission</span>
          </h2>
        </div>
        <p className="text-lg lg:text-xl max-w-2xl text-accent-base py-4">
          Empowering global trade with quality and integrity.
        </p>
        <p className="max-w-[90vw] lg:max-w-[70vw] lg:text-lg font-semibold text-justify">
          At Desi Manwar, we believe in building bridges between global markets.
          Our mission is to provide premium products with unmatched reliability
          and transparency. We aim to foster long-term partnerships by
          maintaining ethical business practices, ensuring quality at every
          step, and offering competitive pricing. Through continuous innovation
          and a customer-first approach, we are dedicated to making
          international trade smoother and more accessible.
        </p>
        <div className="pt-12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {missionContent.map((item, index) => (
            <div
              key={index}
              className="bg-primary-base p-6 rounded-xl shadow-md border-l-4 border-accent-base flex flex-col h-full"
            >
              <h3 className="text-2xl font-bold text-secondary-dark">
                {item.heading}
              </h3>
              {item.subheading && (
                <p className="text-secondary-dark/50 text-lg font-medium mt-1">
                  {item.subheading}
                </p>
              )}
              <p className="text-secondary-dark mt-3 text-justify flex-grow">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurMission
