'use server'

import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function getUsers() {
  await dbConnect()

  try {
    const users = await User.find({})

    const userWithoutPassword = users.map((user) => {
      const { password, _id, ...userWithoutPassword } = user.toObject()
      return userWithoutPassword
    })

    return { status: 'success', users: userWithoutPassword }
  } catch (err) {
    return { status: 'error', message: 'Internal server error' }
  }
}

export async function signup(formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  await dbConnect()

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return { status: 'error', message: 'User already exists' }
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    const accessToken = jwt.sign(
      { email: newUser.email, id: newUser._id.toString() },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    )

    return {
      status: 'success',
      user: { email: newUser.email, id: newUser._id.toString() },
      accessToken,
    }
  } catch (error) {
    console.error('Error during signup:', error)
    return { status: 'error', message: 'Internal server error' }
  }
}

export async function deleteUser(email) {
  await dbConnect()

  try {
    const user = await User.findOneAndDelete({ email })
    if (!user) {
      return { status: 'error', message: 'User not found' }
    }

    return { status: 'success', message: 'User deleted successfully' }
  } catch (error) {
    console.error('Error during delete:', error)
    return { status: 'error', message: 'Internal server error' }
  }
}
