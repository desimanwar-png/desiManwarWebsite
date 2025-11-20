'use server'

import { revalidatePath } from 'next/cache'
import dbConnect from '@/lib/dbConnect'
import Newsletter, { INewsletter } from '@/models/NewsLetter'

export async function getAllSubscribers(): Promise<{
  success: boolean
  subscribers?: any[]
  message?: string
}> {
  try {
    await dbConnect()
    const subscribers = await Newsletter.find({}).sort({ _id: -1 }).lean()
    return {
      success: true,
      subscribers: JSON.parse(JSON.stringify(subscribers)),
    }
  } catch (error) {
    console.error('Get all subscribers error:', error)
    return {
      success: false,
      message: 'Failed to fetch subscribers',
    }
  }
}

export async function createSubscriber(
  email: string
): Promise<{
  success: boolean
  message: string
  subscriber?: any
}> {
  try {
    if (!email) {
      return { success: false, message: 'Email is required' }
    }

    await dbConnect()

    const existingSubscriber = await Newsletter.findOne({ email })
    if (existingSubscriber) {
      return { success: false, message: 'This email is already subscribed.' }
    }

    const newSubscriber = await Newsletter.create({ email })
    revalidatePath('/admin/newsletter')
    return {
      success: true,
      message: 'Subscriber added successfully',
      subscriber: JSON.parse(JSON.stringify(newSubscriber)),
    }
  } catch (error: any) {
    console.error('Create subscriber error:', error)
    return {
      success: false,
      message: error.message || 'An error occurred while adding the subscriber',
    }
  }
}

export async function deleteSubscriber(subscriberId: string): Promise<{
  success: boolean
  message: string
}> {
  try {
    await dbConnect()
    const deletedSubscriber = await Newsletter.findByIdAndDelete(subscriberId)
    if (!deletedSubscriber) {
      return {
        success: false,
        message: 'Subscriber not found',
      }
    }
    revalidatePath('/admin/newsletter')
    return {
      success: true,
      message: 'Subscriber deleted successfully',
    }
  } catch (error: any) {
    console.error('Delete subscriber error:', error)
    return {
      success: false,
      message: error.message || 'An error occurred while deleting the subscriber',
    }
  }
}
