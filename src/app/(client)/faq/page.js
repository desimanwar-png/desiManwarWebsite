import Link from 'next/link'
import React from 'react'

function FAQPage() {
  return (
    <div
      className="bg-no-repeat bg-cover bg-center bg-fixed text-secondary-base dark:text-primary-base font-medium tracking-wider"
      style={{ backgroundImage: "url('/images/faq.jpg')" }}
    >
      {/* Optional Hero section */}
      <div className="min-h-[50vh] flex items-center justify-center py-12 px-4 md:px-12 lg:px-20 bg-black/50">
        <h1 className="text-3xl md:text-5xl text-primary-base font-bold text-center">
          Frequently Asked Questions
        </h1>
      </div>

      {/* FAQ Content */}
      <div className="bg-secondary-dark bg-opacity-90 px-4 sm:px-6 lg:px-20 py-10 backdrop-blur-sm">
        {/* About Section */}
        <section className="mb-12 pb-4 border-b border-secondary-base/50">
          <h2 className="text-xl font-semibold mb-4 text-accent-base">
            About Desi Manwar
          </h2>
          <div className="space-y-4 text-sm sm:text-base">
            <div>
              <p className="font-medium text-secondary-base">
                1. What is Desi Manwar Private Limited?
              </p>
              <p>
                Desi Manwar is an India-based export-import company focused on
                delivering premium food commodities such as Indian Rice,
                Brazilian sugar (ICUMSA 45), Indian Spices (Whole & Ground),
                Edible Oils, and Specialty Blends...
              </p>
            </div>
            <div>
              <p className="font-medium text-secondary-base">
                2. What sets Desi Manwar apart from other exporters?
              </p>
              <p>
                We combine consistent product quality with responsive customer
                service, certified sourcing, transparent documentation...
              </p>
            </div>
            <div>
              <p className="font-medium text-secondary-base">
                3. How experienced is your company in international trade?
              </p>
              <p>
                Our leadership team brings extensive experience in global trade
                and supply chain management...
              </p>
            </div>
          </div>
        </section>

        {/* Product & Market Section */}
        <section className="mb-12 pb-4 border-b border-secondary-base/50">
          <h2 className="text-xl font-semibold mb-4 text-accent-base">
            Product & Market Information
          </h2>
          <div className="space-y-4 text-sm sm:text-base">
            <div>
              <p className="font-medium text-secondary-base">
                4. What products do you export, and what are your key markets?
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>Grains: Basmati & Non-Basmati Rice</li>
                <li>Spices: Red Chili Powder, Turmeric, Cumin, etc.</li>
                <li>Oils: Palm Oil, Mustard Oil</li>
                <li>Millets: Ragi, Fox Millet, Quinoa</li>
                <li>Custom spice blends</li>
                <li>Brazilian Sugar (ICUMSA 45)</li>
              </ul>
              <p>
                Markets: USA, UAE, Brazil, Europe, Africa, and parts of Asia.
              </p>
            </div>
          </div>
        </section>

        {/* Order & Payment */}
        <section className="mb-12 pb-4 border-b border-secondary-base/50">
          <h2 className="text-xl font-semibold mb-4 text-accent-base">
            Order & Payment
          </h2>
          <div className="space-y-4 text-sm sm:text-base">
            <div>
              <p className="font-medium text-secondary-base">
                5. What is your minimum order quantity (MOQ)?
              </p>
              <p>
                Standard MOQ is 1 FCL. Trial quantities from 1 kg are
                considered.
              </p>
            </div>
            <div>
              <p className="font-medium text-secondary-base">
                6. What payment methods do you accept?
              </p>
              <p>
                TT/Bank Transfer, LC (non-transferable), SBLC, PayPal (for
                samples).
              </p>
            </div>
          </div>
        </section>

        {/* Quality, Documentation & Compliance */}
        <section className="mb-12 pb-4 border-b border-secondary-base/50">
          <h2 className="text-xl font-semibold mb-4 text-accent-base">
            Quality, Documentation & Compliance
          </h2>
          <div className="space-y-4 text-sm sm:text-base">
            <div>
              <p className="font-medium text-secondary-base">
                7. How do you ensure product quality before shipment?
              </p>
              <p>
                Certified sourcing, in-house/third-party tests, compliance with
                FSSAI, APEDA, ISO, SGS inspection.
              </p>
            </div>
            <div>
              <p className="font-medium text-secondary-base">
                8. Do you handle customs documentation and taxes?
              </p>
              <p>
                Yes. We handle all export docs. Import taxes are buyer’s
                responsibility unless under DDP.
              </p>
            </div>
          </div>
        </section>

        {/* Shipping & Delivery */}
        <section className="mb-12 pb-4 border-b border-secondary-base/50">
          <h2 className="text-xl font-semibold mb-4 text-accent-base">
            Shipping & Delivery
          </h2>
          <div className="space-y-4 text-sm sm:text-base">
            <div>
              <p className="font-medium text-secondary-base">
                9. What are your shipping options and estimated delivery times?
              </p>
              <p>
                Sea, Air, Courier. USA/Europe: 18–25 days. Asia: 10–15 days.
                Samples: 5–7 days.
              </p>
            </div>
            <div>
              <p className="font-medium text-secondary-base">
                10. Can I request product samples? Are they free or paid?
              </p>
              <p>Yes, samples are generally paid. Buyer covers shipping.</p>
            </div>
          </div>
        </section>

        {/* Support & Contact */}
        <section className="mb-12 pb-4">
          <h2 className="text-xl font-semibold mb-4 text-accent-base">
            Support, Customization & Returns
          </h2>
          <div className="space-y-4 text-sm sm:text-base">
            <div>
              <p className="font-medium text-secondary-base">
                11. Do you offer private labeling or custom packaging?
              </p>
              <p>
                Yes, 1kg/5kg/10kg options available. We support your brand
                design.
              </p>
            </div>
            <div>
              <p className="font-medium text-secondary-base">
                12. How can I contact your sales team for bulk inquiries?
              </p>
              <p>
                Contact us via -
                <Link
                  href="/client/contact"
                  className="text-accent-base/80 underline px-2"
                >
                  Contact Us
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FAQPage
