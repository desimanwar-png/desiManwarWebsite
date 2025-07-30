'use client'

import React from 'react'

const services = [
  {
    title: 'Global Sourcing & Export',
    description:
      'We specialize in sourcing high-quality agricultural and food products from trusted suppliers in India and Brazil. Our product range includes sugar (ICUMSA 45), basmati rice, cumin, spices, and edible oils. We ensure competitive pricing, seamless logistics, and adherence to international quality standards.',
  },
  {
    title: 'Private Label & Custom Packaging',
    description:
      'We offer private labeling solutions for businesses looking to create their own brand. From custom packaging for rice and spices to branding options for wholesale buyers, we cater to bulk orders with tailored designs, ensuring a strong market presence for our clients.',
  },
  {
    title: 'Wholesale & Bulk Supply',
    description:
      'Our company provides wholesale and bulk supply solutions to importers, distributors, and food manufacturers. Whether you need a full container load (FCL) of rice, spices, or edible oil, we ensure timely delivery and efficient supply chain management.',
  },
  {
    title: 'Trade Consulting & Docs Support',
    description:
      'Navigating international trade regulations can be complex. We assist clients with payment terms (LC, SBLC), shipping documentation (CIF, FOB), and compliance requirements to ensure a smooth import-export process. Our expertise helps businesses expand into new markets with confidence.',
  },
]

function OurServicesPage() {
  return (
    <div className="px-4 lg:px-20 py-12">
      <h1 className="text4xl lg:text-5xl font-bold text-center text-primary-base mb-12">
        _ Our Services _
      </h1>

      <div className="grid gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 border-l-8 border-accent-base bg-primary-dark rounded-xl shadow-md"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-primary-base mb-2">
              {service.title}
            </h2>
            <p className="text-base lg:text-lg text-primary-base/80 font-semibold text-justify">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurServicesPage
