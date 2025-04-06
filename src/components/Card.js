import Image from 'next/image'
import React from 'react'

function Card({
  title,
  content,
  icon,
  imageBase64,
  className = '',
  glow = true,
}) {
  return (
    <div
      className={`w-full p-0.5 bg-gradient-to-tr from-primary-dark to-accent-base rounded-lg ${
        glow
          ? 'relative before:absolute before:inset-0 before:bg-gradient-to-bl before:from-secondary-base before:to-primary-dark before:blur-[300px] before:-z-10'
          : ''
      } ${className}`}
    >
      <div className="h-full w-full bg-primary-base dark:bg-secondary-dark text-secondary-dark dark:text-primary-base rounded-lg p-4 flex flex-col">
        <div className="flex justify-center p-8 rounded-lg">
          {imageBase64 ? (
            <Image
              src={imageBase64 || '/images/dummyImage.jpg'}
              alt={title}
              className="w-64 object-contain rounded-lg"
              width={100}
              height={100}
            />
          ) : (
            <div className="text-secondary-dark dark:text-primary-base">
              {icon}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-bl from-primary-dark to-accent-base bg-clip-text text-transparent flex items-center justify-center text-3xl font-extrabold">
          {title}
        </div>

        <div className="flex h-full items-center justify-center p-4 text-justify  tracking-wider">
          {content}
        </div>
      </div>
    </div>
  )
}

export default Card
