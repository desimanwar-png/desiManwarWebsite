import MemberCard from '@/components/MemberCard'
import React from 'react'

const members = [
  {
    _id: '1',
    name: 'John Doe',
    role: 'Event Organizer',
    image: '',
  },
  {
    _id: '2',
    name: 'Jane Smith',
    role: 'Community Outreach',
    image: '',
  },
  {
    _id: '3',
    name: 'Mike Brown',
    role: 'Volunteer Coordinator',
    image: '',
  },
]

function OurMembers() {
  return (
    <div className="px-4 lg:px-20 pt-12 lg:pt-6">
      <div className="py-20">
        <h1 className="text-4xl lg:text-6xl flex justify-center text-secondary-dark dark:text-secondary-base tracking-wide font-bold">
          _ Meet Our
          <span className="text-accent-base pl-2 lg:pl-4"> Members _</span>
        </h1>
        <div className="pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>
        <div className="flex justify-end text-secondary-dark dark:text-secondary-base hover:text-accent-base font-semibold tracking-wide">
          <h1 className="hover:scale-105 transition-all ease-in-out text-xl cursor-pointer mx-2">
            Show More
          </h1>
        </div>
      </div>
    </div>
  )
}

export default OurMembers
