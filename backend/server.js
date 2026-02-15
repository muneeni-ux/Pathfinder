const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const http = require("http");
const socketio = require("socket.io");
const connectdb = require("./config/db");
const Total = require("./models/Total");

dotenv.config();
connectdb();

const app = express();
app.set('trust proxy', 1);
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

// Make io globally available (for use in routes like mpesa callback)
app.set("io", io);

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://192.168.101.234:3000",
  "https://pathfinder-xg2o.onrender.com", // Added Render production URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', '*'],
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
// app.use(mongoSanitize());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
}));

// ROUTES
app.use("/api/gallery", require('./routes/GalleryRoute'));
app.use("/api/upload", require('./routes/UploadRoute'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use("/api/admin", require('./routes/AdminAuth'));
app.use("/api/visitors", require('./routes/VisitorRoutes'));
app.use("/api/subscribe", require('./routes/SubscriptionRoutes')); 

app.use("/api/honor-themes", require('./routes/honourThemeRoutes')); 
app.use("/api/tracker", require('./routes/trackerRoutes'));
app.use("/api/registrations", require('./routes/RegistrationRoutes'));
app.use("/api/donate", require('./routes/donationRoutes'));
app.use("/api/testimonials", require('./routes/TestimonialsRoutes'));
app.use("/api/resources", require('./routes/resourceRoutes'));
app.use("/api/posts", require('./routes/postRoutes'));
app.use("/api/leadership", require('./routes/LeadershipRoute'));

// SOCKET.IO
// let liveTotal = 0;


io.on("connection", async (socket) => {
  console.log("💡 New client connected");

  try {
    const totals = await Total.find({});
    const initialData = {};
    for (const t of totals) {
      initialData[t.purpose] = t.total;
    }
    socket.emit("initial-total", initialData);
  } catch (err) {
    console.error("Error loading initial totals:", err.message);
    socket.emit("initial-total", {}); // fallback
  }

  socket.on("reset-total", async () => {
    await Total.deleteMany({});
    io.emit("reset-done");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit(0);
});
process.on("SIGTERM", () => {
  console.log("Terminating server...");
  process.exit(0);
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
