import Card from '@/components/Card'
import { ArrowRight, Text } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function OurProducts() {
  return (
    <div className="px-4 lg:px-20 h-[100vh] lg:h-[85vh]">
      <div className="flex justify-center py-12">
        <h1 className="text-3xl lg:text-5xl font-semibold">_ Our Products _</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <Card
          title="Cummin Seeds"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet purus et nisi fermentum fermentum. Sed sit amet purus et nisi fermentum fermentum."
          icon={<Text size={100} />}
        />
        <Card />
        <Card />
      </div>
      <div className="w-full py-4 dark:text-secondary-base hover:text-secondary-base dark:hover:text-accent-base">
        <Link
          // TODO: Add href
          href="/"
          className="float-end flex gap-2 hover:scale-105 transition-all ease-in-out text-xl cursor-pointer mx-2"
        >
          See More <ArrowRight size={25} />
        </Link>
      </div>
    </div>
  )
}

export default OurProducts
