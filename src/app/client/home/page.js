import React from 'react'
import ClientNav from '../ClientNav'
import HeroSectionCarousel from './HeroSectionCarousel'

function HomePage() {
  return (
    <div className="">
      {/* <div className="px-4 lg:px-20"> */}
      <HeroSectionCarousel />
      <div className="h-[100vh]"></div>
    </div>
  )
}

export default HomePage
