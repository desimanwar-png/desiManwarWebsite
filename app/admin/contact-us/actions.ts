'use server'

import { revalidatePath } from 'next/cache'
import dbConnect from '@/lib/dbConnect'
import ContactUs, { IContactUs } from '@/models/ContactUs'

export async function getAllContactSubmissions(): Promise<{
  success: boolean
  submissions?: any[]
  message?: string
}> {
  try {
    await dbConnect()
    const submissions = await ContactUs.find({}).sort({ date: -1 }).lean()
    return {
      success: true,
      submissions: JSON.parse(JSON.stringify(submissions)),
    }
  } catch (error) {
    console.error('Get all contact submissions error:', error)
    return {
      success: false,
      message: 'Failed to fetch contact submissions',
    }
  }
}

export async function getContactSubmissionById(submissionId: string): Promise<{
  success: boolean
  submission?: any
  message?: string
}> {
  try {
    await dbConnect()
    const submission = await ContactUs.findById(submissionId).lean()
    if (!submission) {
      return { success: false, message: 'Submission not found' }
    }
    return {
      success: true,
      submission: JSON.parse(JSON.stringify(submission)),
    }
  } catch (error) {
    console.error('Get submission by id error:', error)
    return { success: false, message: 'Failed to fetch submission' }
  }
}

export async function createContactSubmission(
  data: Partial<IContactUs>
): Promise<{
  success: boolean
  message: string
  submission?: any
}> {
  try {
    await dbConnect()
    const newSubmission = await ContactUs.create(data)
    revalidatePath('/admin/contact-us')
    return {
      success: true,
      message: 'Submission created successfully',
      submission: JSON.parse(JSON.stringify(newSubmission)),
    }
  } catch (error: any) {
    console.error('Create submission error:', error)
    return {
      success: false,
      message: error.message || 'An error occurred while creating the submission',
    }
  }
}

export async function updateContactSubmission(
  submissionId: string,
  data: Partial<IContactUs>
): Promise<{
  success: boolean
  message: string
  submission?: any
}> {
  try {
    await dbConnect()
    delete data._id
    delete data.date

    const updatedSubmission = await ContactUs.findByIdAndUpdate(
      submissionId,
      { $set: data },
      { new: true, runValidators: true }
    ).lean()

    if (!updatedSubmission) {
      return {
        success: false,
        message: 'Failed to update submission',
      }
    }
    revalidatePath('/admin/contact-us')
    return {
      success: true,
      message: 'Submission updated successfully',
      submission: JSON.parse(JSON.stringify(updatedSubmission)),
    }
  } catch (error: any) {
    console.error('Update submission error:', error)
    return {
      success: false,
      message: error.message || 'An error occurred while updating the submission',
    }
  }
}

export async function deleteContactSubmission(submissionId: string): Promise<{
  success: boolean
  message: string
}> {
  try {
    await dbConnect()
    const deletedSubmission = await ContactUs.findByIdAndDelete(submissionId)
    if (!deletedSubmission) {
      return {
        success: false,
        message: 'Submission not found',
      }
    }
    revalidatePath('/admin/contact-us')
    return {
      success: true,
      message: 'Submission deleted successfully',
    }
  } catch (error: any) {
    console.error('Delete submission error:', error)
    return {
      success: false,
      message: error.message || 'An error occurred while deleting the submission',
    }
  }
}
