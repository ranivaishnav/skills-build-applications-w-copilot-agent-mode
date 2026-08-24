import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/database.js';
dotenv.config();
const PORT = Number(process.env.PORT) || 5000;
async function startServer() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
