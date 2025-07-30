'use client'

import { createContactedPerson } from '@/app/admin/contactedPerson/actions'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'
import React from 'react'

function ContactPage() {
  const handleSubmit = async (formData) => {
    const result = await createContactedPerson(formData)

    if (result.status === 'success') {
      toast({
        title: 'Sent Successfully!',
        description: 'We will get back to you soon!',
        status: 'success',
      })
    } else {
      toast({
        title: 'Error!',
        description: 'Failed to send message. Please try again.',
        status: 'error',
      })
    }
  }

  return (
    // <div className="px-4 lg:px-20">
    <div className="relative">
      <div>
        <Image
          src="/images/contact-us.jpg"
          alt="contact-us-image"
          width={1920}
          height={1080}
          className="w-full aspect-video object-fill"
        />
        <div className="absolute w-full aspect-video top-0 bg-gradient-to-l from-secondary-dark to-transparent"></div>
      </div>
      <div className="px-4 lg:px-20 h-[185vh] lg:h-screen py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full lg:gap-4">
          <div className="bg-primary-dark flex flex-col content-center justify-center px-8 rounded-lg">
            <div>
              <h1 className="text-primary-base text-4xl font-bold pb-4">
                Contact Us <span className="text-accent-base">_</span>
              </h1>
              <p className="pb-12 font-semibold text-md tracking-wide">
                We would love to hear from you! Whether you have questions,
                feedback, or need assistance, we are here to help!
              </p>
            </div>
            <div>
              <form
                action={async (formData) => handleSubmit(formData)}
                className="w-full rounded-lg space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-primary-base"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      className="w-full p-3 border text-secondary-dark border-secondary-dark rounded focus:outline-none focus:ring-2 focus:ring-accent-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-primary-base"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full p-3 border text-secondary-dark border-secondary-dark rounded focus:outline-none focus:ring-2 focus:ring-accent-base"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-primary-base"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    className="w-full p-3 border text-secondary-dark border-secondary-dark rounded focus:outline-none focus:ring-2 focus:ring-accent-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-primary-base"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Write your message here..."
                    className="w-full p-3 border text-secondary-dark border-secondary-dark rounded focus:outline-none focus:ring-2 focus:ring-accent-base"
                  ></textarea>
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-accent-base text-secondary-dark px-6 py-3 rounded-lg font-semibold hover:bg-secondary-base hover:text-white transition-all"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className=" flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227749.05401565827!2d75.62540217203815!3d26.885114745307902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1734626879814!5m2!1sen!2sin"
                width="500"
                height="600"
                style={{
                  border: 0,
                  borderRadius: '1rem',
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-screen lg:w-auto aspect-square p-4 rounded-xl"
              ></iframe>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
