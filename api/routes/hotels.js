// In routes/hotel.js

import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET
router.get("/find/:id", getHotel);

// GET ALL (with optional 'featured' filter)
router.get("/", getHotels);

// GET hotels count by city
router.get("/countByCity", countByCity);

// GET hotels count by type
router.get("/countByType", countByType);

// GET rooms of a hotel
router.get("/room/:id", getHotelRooms);

export default router;
