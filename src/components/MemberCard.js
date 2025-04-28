import { Linkedin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function MemberCard({ member }) {
  return (
    <div className="aspect-[1/1] w-full p-0.5 bg-gradient-to-tr from-primary-dark to-accent-base rounded-lg group hover:scale-105 transition-all ease-in-out">
      <div className="h-full w-full text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark rounded-lg flex flex-col relative transition-all ease-in-out p-1">
        <div className="h-full w-full relative rounded-lg overflow-hidden">
          <Image
            src={member.image || '/images/member-image.jpg'}
            width={500}
            height={500}
            alt={member.name || 'Member'}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="absolute bottom-0 left-0 h-12 w-full flex flex-col justify-center bg-gradient-to-br from-secondary-dark/[0.54] to-accent-base/[0.54] backdrop-blur-lg rounded-bl-lg rounded-br-lg group-hover:h-36 transition-all ease-in-out p-4">
          <h1 className="text-xl font-semibold tracking-wide">{member.name}</h1>
          <div className="hidden group-hover:block transition-all ease-in-out">
            {member.designation}
            <div className="flex gap-2 pt-2">
              {/* Linkedin */}
              {member.linkedinURL && (
                <Link
                  href={member.linkedinURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-primary-base rounded-lg p-2 hover:scale-105 hover:text-secondary-base hover:border-secondary-base hover:bg-secondary-dark transition-all ease-in-out"
                >
                  <Linkedin />
                </Link>
              )}
              {/* Phone */}
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="border-2 border-primary-base rounded-lg p-2 hover:scale-105 hover:text-secondary-base hover:border-secondary-base hover:bg-secondary-dark transition-all ease-in-out"
                >
                  <Phone />
                </a>
              )}
              {/* Mail */}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="border-2 border-primary-base rounded-lg p-2 hover:scale-105 hover:text-secondary-base hover:border-secondary-base hover:bg-secondary-dark transition-all ease-in-out"
                >
                  <Mail />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberCard
