import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';  
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import './config/passport.config.js'; 
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(cors({ origin: `${process.env.FRONTEND_URI}`, credentials: true }));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("welcome to bookshow backend");
});

app.use("/auth", userRoutes);
app.use("/auth/admin", adminRoutes);
app.use("/api",paymentRoutes);

app.listen(PORT, () => {
    connectDb();
    console.log(`server started at http://localhost:${PORT}`);
});
