import { getMembers } from '@/app/admin/members/actions'
import MemberCard from '@/components/MemberCard'
import React, { Suspense } from 'react'

async function fetchSortedMembers() {
  try {
    const response = await getMembers()
    if (response.status === 'success') {
      return response.data.sort((a, b) => a.priority - b.priority)
    }
    return []
  } catch (error) {
    console.error('Error fetching members:', error)
    return []
  }
}

async function OurMembers() {
  const members = await fetchSortedMembers()

  return (
    <div className="px-4 lg:px-20 pt-12 lg:pt-6">
      <div className="py-20">
        <h1 className="text-3xl lg:text-6xl flex justify-center text-secondary-dark dark:text-secondary-base tracking-wide font-bold">
          _ Meet Our
          <span className="text-accent-base pl-2 lg:pl-4"> Members _</span>
        </h1>

        <Suspense
          fallback={
            <p className="text-center text-gray-500">Loading members...</p>
          }
        >
          <div className="pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </Suspense>

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
