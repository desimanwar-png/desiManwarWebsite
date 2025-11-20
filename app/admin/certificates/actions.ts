'use server'

import { revalidatePath } from 'next/cache'
import dbConnect from '@/lib/dbConnect'
import Certificate, { ICertificate } from '@/models/Certificates'

export async function getAllCertificates(): Promise<{
  success: boolean
  certificates?: any[]
  message?: string
}> {
  try {
    await dbConnect()
    const certificates = await Certificate.find({}).sort({ createdAt: -1 }).lean()
    return {
      success: true,
      certificates: JSON.parse(JSON.stringify(certificates)),
    }
  } catch (error) {
    console.error('Get all certificates error:', error)
    return {
      success: false,
      message: 'Failed to fetch certificates',
    }
  }
}

export async function createCertificate(
  data: Partial<ICertificate>
): Promise<{
  success: boolean
  message: string
  certificate?: any
}> {
  try {
    await dbConnect()
    const newCertificate = await Certificate.create(data)
    revalidatePath('/admin/certificates')
    return {
      success: true,
      message: 'Certificate created successfully',
      certificate: JSON.parse(JSON.stringify(newCertificate)),
    }
  } catch (error: any) {
    console.error('Create certificate error:', error)
    return {
      success: false,
      message: error.message || 'An error occurred while creating the certificate',
    }
  }
}

export async function updateCertificate(
  certificateId: string,
  data: Partial<ICertificate>
): Promise<{
  success: boolean
  message: string
  certificate?: any
}> {
  try {
    await dbConnect()
    delete data._id
    delete data.createdAt

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      certificateId,
      { $set: data },
      { new: true, runValidators: true }
    ).lean()

    if (!updatedCertificate) {
      return {
        success: false,
        message: 'Failed to update certificate',
      }
    }
    revalidatePath('/admin/certificates')
    return {
      success: true,
      message: 'Certificate updated successfully',
      certificate: JSON.parse(JSON.stringify(updatedCertificate)),
    }
  } catch (error: any) {
    console.error('Update certificate error:', error)
    return {
      success: false,
      message: error.message || 'An error occurred while updating the certificate',
    }
  }
}

export async function deleteCertificate(certificateId: string): Promise<{
  success: boolean
  message: string
}> {
  try {
    await dbConnect()
    const deletedCertificate = await Certificate.findByIdAndDelete(certificateId)
    if (!deletedCertificate) {
      return {
        success: false,
        message: 'Certificate not found',
      }
    }
    revalidatePath('/admin/certificates')
    return {
      success: true,
      message: 'Certificate deleted successfully',
    }
  } catch (error: any) {
    console.error('Delete certificate error:', error)
    return {
      success: false,
      message: error.message || 'An error occurred while deleting the certificate',
    }
  }
}
