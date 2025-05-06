'use client'

import { createQuote } from '@/app/admin/userQuotes/actions'
import { toast } from '@/hooks/use-toast'
import React, { useState } from 'react'

function GetAQuotePage() {
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = async (formData) => {
    const result = await createQuote(formData)

    if (result.status === 'success') {
      setShowModal(true)

      toast({
        title: 'Success',
        description: result.message,
      })
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <div
      className="bg-fixed bg-cover bg-no-repeat font-medium tracking-wider"
      style={{ backgroundImage: "url('/images/get_a_quote.jpg')" }}
    >
      <div className="min-h-screen bg-secondary-dark/90 px-4 py-12 lg:px-20">
        <h1 className="text-3xl lg:text-4xl font-bold text-secondary-base dark:text-primary-base mb-8">
          Get a Quote
        </h1>

        <form
          className="space-y-10"
          action={async (formData) => handleSubmit(formData)}
        >
          {/* 1. Contact Information */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-accent-base">
              1. Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-secondary-base">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g., John Doe"
                  className="w-full p-2 rounded bg-primary-base/90 text-secondary-dark"
                />
              </div>
              <div>
                <label className="block text-secondary-base">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  className="w-full p-2 rounded bg-primary-base/90 text-secondary-dark"
                />
              </div>
              <div>
                <label className="block text-secondary-base">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 rounded bg-primary-base/90 text-secondary-dark"
                />
              </div>
              <div>
                <label className="block text-secondary-base">
                  Phone Number (with Country Code)
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="w-full p-2 rounded bg-primary-base/90 text-secondary-dark"
                />
              </div>
            </div>
          </section>

          {/* 2. Inquiry Details */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-accent-base">
              2. Inquiry Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-secondary-base ">
                  Product(s) Interested In
                </label>
                <input
                  type="text"
                  name="productsInterested"
                  placeholder="e.g., Basmati Rice, Cumin, Red Chili Powder"
                  className="w-full p-2 rounded bg-primary-base/90 text-secondary-dark"
                />
              </div>
              <div>
                <label className="block text-secondary-base">
                  Quantity Required
                </label>
                <input
                  type="text"
                  name="quantityRequired"
                  placeholder="e.g., 1 kg, 100 kg, 1 FCL"
                  className="w-full p-2 rounded bg-primary-base/90 text-secondary-dark"
                />
              </div>
              <div>
                <label className="block text-secondary-base">
                  Destination Country
                </label>
                <input
                  type="text"
                  name="destinationCountry"
                  className="w-full p-2 rounded bg-primary-base/90 text-secondary-dark"
                />
              </div>
            </div>
          </section>

          {/* 3. Commercial Details */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-accent-base">
              3. Basic Commercial Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-secondary-base">
                  Preferred Payment Terms
                </label>
                <select
                  name="paymentTerms"
                  className="w-full p-2 rounded bg-primary-base/90 text-secondary-dark"
                >
                  <option value="">Select </option>
                  <option
                    value="
                  TT (Telegraphic Transfer / Wire Transfer)"
                  >
                    TT (Telegraphic Transfer / Wire Transfer)
                  </option>
                  <option value="LC (Letter of Credit)">
                    LC (Letter of Credit)
                  </option>
                  <option value="SBLC (Standby Letter of Credit)">
                    SBLC (Standby Letter of Credit)
                  </option>
                  <option value="Advance Payment (100%)">
                    Advance Payment (100%)
                  </option>
                  <option value="Part Advance, Part LC">
                    Part Advance, Part LC
                  </option>
                  <option value="Other (please specify in message)">
                    Other (please specify in message)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-secondary-base">
                  Preferred Shipping Terms
                </label>
                <select
                  name="shippingTerms"
                  className="w-full p-2 rounded bg-primary-base/90 text-secondary-dark"
                >
                  <option value="">Select</option>
                  <option value="FOB">FOB (Free on Board)</option>
                  <option value="CIF">
                    CIF (Cost, Insurance, and Freight)
                  </option>
                  <option value="CFR">CFR (Cost and Freight)</option>
                  <option value="DDP">DDP (Delivered Duty Paid)</option>
                  <option value="DAP">DAP (Delivered at Place)</option>
                  <option value="EXW">EXW (Ex Works)</option>
                  <option value="FCA">FCA (Free Carrier)</option>
                  <option value="Other">
                    Other (please specify in message)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-secondary-base">
                  Required Delivery Timeline
                </label>
                <input
                  type="text"
                  name="deliveryTimeline"
                  placeholder="e.g., within 30 days"
                  className="w-full p-2 rounded bg-primary-base/90 text-secondary-dark"
                />
              </div>
            </div>
          </section>

          {/* 4. Additional Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-accent-base">
              4. Additional Information
            </h2>
            <label className="block text-secondary-base">
              Specific Requirements or Message
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder="Share any special packaging, certifications, or standards needed."
              className="w-full p-2 rounded bg-primary-base/90 text-secondary-dark"
            ></textarea>
          </section>

          {/* 5. Submit */}
          <section>
            <button
              type="submit"
              className="bg-accent-base text-secondary-dark font-semibold px-6 py-3 rounded hover:bg-accent-base/90 transition"
            >
              Request My Quote
            </button>
          </section>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-secondary-dark/60 flex items-center justify-center z-50">
          <div className="bg-primary-base text-secondary-dark dark:text-primary-base dark:bg-secondary-dark border-2 border-accent-base max-w-md w-full p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6">
              Thank you for reaching out to Desi Manwar!
            </h2>
            <p className="text-sm">
              Our team is reviewing your inquiry and will send a customized
              quote within 24–48 hours. For urgent needs, please WhatsApp or
              call us at <strong>+91-8290445443</strong>.
            </p>
            <div className="mt-4 text-right">
              <button
                className="text-sm bg-accent-base text-secondary-dark font-medium px-4 py-2 rounded hover:bg-accent-base/90"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GetAQuotePage
