'use client'

import { useEffect, useState } from 'react'
import { getAllCertificates } from '@/app/admin/certificates/actions'
import CertificateCard from './CertificateCard'
import Image from 'next/image'
import { X } from 'lucide-react'

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([])
  const [selectedCertificate, setSelectedCertificate] = useState<any | null>(
    null
  )

  useEffect(() => {
    async function fetchCertificates() {
      const { certificates } = await getAllCertificates()
      if (certificates) {
        setCertificates(certificates)
      }
    }
    fetchCertificates()
  }, [])

  const openFullScreen = (certificate: any) => {
    setSelectedCertificate(certificate)
  }

  const closeFullScreen = () => {
    setSelectedCertificate(null)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground">Our Certificates</h1>
        <p className="text-muted-foreground mt-2">
          We are committed to quality and transparency.
        </p>
      </div>

      {certificates && certificates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {certificates.map((certificate) => (
            <div
              key={certificate._id}
              onClick={() => openFullScreen(certificate)}
              className="cursor-pointer"
            >
              <CertificateCard certificate={certificate} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No certificates available at the moment.
          </p>
        </div>
      )}

      {selectedCertificate && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={closeFullScreen}
        >
          <div className="relative w-full h-full max-w-4xl max-h-4xl">
            <Image
              src={selectedCertificate.image}
              alt={selectedCertificate.name}
              height={1920}
              width={1920}
              className="object-contain"
            />
            <button
              onClick={closeFullScreen}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
