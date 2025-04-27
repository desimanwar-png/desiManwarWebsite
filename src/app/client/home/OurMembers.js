'use client'

import { getMembersByPriority } from '@/app/admin/members/actions'
import MemberCard from '@/components/MemberCard'
import React, { useEffect, useState } from 'react'

function OurMembers() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    async function fetchData() {
      const resMembers = await getMembersByPriority()

      if (resMembers) {
        setMembers(resMembers.data)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="px-4 lg:px-20 pt-12 lg:pt-6">
      <div className="py-20">
        <h1 className="text-3xl lg:text-6xl flex justify-center text-secondary-dark dark:text-secondary-base tracking-wide font-bold">
          _ Meet Our
          <span className="text-accent-base pl-2 lg:pl-4"> Members _</span>
        </h1>

        <div className="pt-16 pb-8 flex items-center gap-8">
          {members.length > 0 ? (
            members.map((member) => (
              <MemberCard key={member._id} member={member} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No members found
            </p>
          )}
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
