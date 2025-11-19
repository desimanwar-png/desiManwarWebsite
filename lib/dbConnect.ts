import mongoose from 'mongoose'

interface IConnection {
  isConnected?: number
}

const connection: IConnection = {}

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    return
  }

  const DB_USER = process.env.MONGO_USER
  const DB_PASS = process.env.MONGO_PASS

  if (!DB_USER || !DB_PASS) {
    throw new Error('Missing DB_USER or DB_PASS environment variables')
  }

  try {
    const db = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@desimanwar.umotqqw.mongodb.net/desiManwar?retryWrites=true&w=majority&appName=DesiManwar`
    )

    connection.isConnected = db.connections[0].readyState

    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection failed:', error)
    throw error
  }
}

export default dbConnect
