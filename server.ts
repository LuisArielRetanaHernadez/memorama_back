import app from './app'
import { connectDB } from './src/db/connect'

const PORT = 3333
app.listen(PORT, () => {
  connectDB().then(() => console.log('Database connected')).catch(console.error)
  console.log('Server is running on port 3333')
})
