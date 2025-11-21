import { getTopMembers } from './admin/members/actions'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Linkedin, User } from 'lucide-react'

export default async function TeamMembers() {
  const result = await getTopMembers()

  const members = result.success && result.members ? result.members : []

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Meet Our Members
          </h2>
          <p className="text-muted-foreground">The team behind our success</p>
        </div>

        {/* Members Grid - Centered */}
        {members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full mx-auto">
            {members.map((member: any) => (
              <div
                key={member._id}
                className="relative h-[450px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Full Card Background Image */}
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    <User className="w-24 h-24 text-muted-foreground/50" />
                  </div>
                )}

                {/* Gradient Overlay - Always Visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 h-24 w-full flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm rounded-bl-lg rounded-br-lg group-hover:h-40 transition-all ease-in-out p-6">
                  {/* Name - Always Visible */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {member.name}
                  </h3>

                  {/* Designation and Socials - Appear on Hover */}
                  <div className="hidden group-hover:block transition-all ease-in-out">
                    {member.designation && (
                      <p className="text-sm text-primary-foreground/90 font-bold mb-4 uppercase tracking-wider shadow-sm">
                        {member.designation}
                      </p>
                    )}

                    {/* Social Links */}
                    {(member.fbURL ||
                      member.instaURL ||
                      member.twitterURL ||
                      member.linkedinURL) && (
                      <div className="flex gap-3">
                        {member.fbURL && (
                          <a
                            href={member.fbURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-primary hover:scale-110 transition-all duration-200"
                            aria-label="Facebook"
                          >
                            <Facebook className="w-4 h-4" />
                          </a>
                        )}
                        {member.instaURL && (
                          <a
                            href={member.instaURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-primary hover:scale-110 transition-all duration-200"
                            aria-label="Instagram"
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}
                        {member.twitterURL && (
                          <a
                            href={member.twitterURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-primary hover:scale-110 transition-all duration-200"
                            aria-label="Twitter"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                        {member.linkedinURL && (
                          <a
                            href={member.linkedinURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-primary hover:scale-110 transition-all duration-200"
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No members found</p>
        )}
      </div>
    </section>
  )
}
