import express, { Request, Response } from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

// Define the shape of the database
interface Hotel {
  id?: string; // Optional initially, we'll assign it dynamically
  name: string;
  description: string;
  price: number;
  location: string;
  address: string;
  facilities: Array<string>;
  roomStatus: string;
  googleMapsUrl: string;
  category: string;
  bedType: string;
  bookingStatus?: boolean;
  bookDetails?: Record<string, any>;
  rating?: number;
}

interface Data {
  hotels: Hotel[];
}

// Initialize LowDB with a default data structure
const adapter = new JSONFile<Data>("db.json");
const defaultData: Data = { hotels: [] };
const db = new Low(adapter, defaultData);

// Initialize Express
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Function to initialize database with dynamic IDs - If we add only hotel objects in DB.json, when initializing the DB, adding ids to those objects
const initializeDatabase = async () => {
  await db.read();

  const hotels = db.data?.hotels || [];
  const updatedHotels = hotels.map((hotel) => {
    if (!hotel.id) {
      hotel.id = uuidv4();
    }
    return hotel;
  });

  db.data = { hotels: updatedHotels };
  await db.write();
};

// Routes
// 1. GET - Return all hotels
app.get("/hotels", async (req: Request, res: Response) => {
  await db.read();
  const data = db.data?.hotels || [];
  res.json({
    data: data,
  });
});

// 2. GET - Return all booked hotels
app.get("/booked-hotels", async (req: Request, res: Response) => {
  await db.read();
  const data = db.data?.hotels || [];
  const bookedHotelsList = data.filter(hotel => {
    return hotel.bookingStatus === true;
  });
  res.json({
    data: bookedHotelsList,
  });
});

// 3. GET - Return a hotel by ID
app.get("/hotels/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.read();
  const hotel = db.data?.hotels.find((h) => h.id === id);
  if (hotel) {
    res.json({
      data: hotel,
    });
  } else {
    res.status(404).json({ error: "Hotel not found" });
  }
});

// 4. PUT - Update bookingStatus and bookDetails by ID
app.put("/hotels/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bookingStatus, bookDetails } = req.body;

  await db.read();
  const hotel = db.data?.hotels.find((h) => h.id === id);
  if (hotel) {
    hotel.bookingStatus = bookingStatus;
    hotel.bookDetails = bookDetails;

    await db.write();
    res.json({ message: "Hotel updated successfully", hotel });
  } else {
    res.status(404).json({ error: "Hotel not found" });
  }
});

// 5. Add a new hotel object to the DB 
app.post("/hotels", async (req: Request, res: Response) => {
  const newHotelObj = { ...req.body };

  const newHotel: Hotel = {
    id: uuidv4(),
    ...newHotelObj,
  };

  await db.read();
  db.data?.hotels.push(newHotel);
  await db.write();

  res.status(201).json(newHotel);
});

// Start the server
app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});
