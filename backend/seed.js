const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Conference = require("./models/Conference"); // Adjust path if needed
const Station = require("./models/Station");       // Adjust path if needed

// Load env vars
dotenv.config();

const seedData = [
  {
    name: "Central Nyanza Conference",
    stations: [
      { name: "Kisumu", trees: 1800 },
      { name: "Ahero", trees: 1500 },
      { name: "Thurgam", trees: 1200 },
      { name: "Olembo", trees: 900 },
      { name: "Siaya", trees: 1600 },
      { name: "Bondo", trees: 1700 },
      { name: "Maliara", trees: 1300 },
      { name: "Kagwa", trees: 1500 }
    ]
  },
  {
    name: "Greater Rift Valley",
    stations: [
      { name: "Moiben North", trees: 2100 },
      { name: "Moiben South", trees: 2000 },
      { name: "Moiben East", trees: 1900 },
      { name: "Moiben West", trees: 2200 }
    ]
  },
  {
    name: "Kenya Lake Conference",
    stations: [
      { name: "Gendia Central", trees: 2600 },
      { name: "Gendia East", trees: 2400 },
      { name: "Gendia West", trees: 2500 },
      { name: "Olare South", trees: 2600 },
      { name: "Olare West", trees: 2500 },
      { name: "Olare East", trees: 2700 }
    ]
  },
  {
    name: "Ranen Conference",
    stations: [
      { name: "Uriri", trees: 1400 },
      { name: "Awendo", trees: 1600 },
      { name: "Ranen", trees: 1500 },
      { name: "Rongo", trees: 1300 },
      { name: "Ngere", trees: 1100 },
      { name: "Sare", trees: 1200 },
      { name: "Kanyimach", trees: 1600 }
    ]
  },
  {
    name: "Western Kenya Conference",
    stations: [
      { name: "Chebwai", trees: 1900 },
      { name: "Webuye", trees: 1800 },
      { name: "Busia", trees: 2100 },
      { name: "Kakamega", trees: 2300 },
      { name: "Vihiga", trees: 2000 },
      { name: "Bungoma", trees: 2100 },
      { name: "Iwandet", trees: 1500 },
      { name: "Malaba", trees: 1200 }
    ]
  },
  {
    name: "Lake Victoria Field",
    stations: [
      { name: "Homabay", trees: 1500 },
      { name: "Sori", trees: 1300 },
      { name: "Obera", trees: 1100 },
      { name: "Rusinga", trees: 1400 },
      { name: "Rapedhi", trees: 1200 },
      { name: "Gwassi", trees: 1500 },
      { name: "Mfangano", trees: 1300 },
      { name: "Ruri", trees: 1200 },
      { name: "Got Kojowi", trees: 1400 }
    ]
  },
  {
    name: "North Rift Valley Field",
    stations: [
      { name: "Turkana", trees: 1200 },
      { name: "Kapenguria", trees: 1500 },
      { name: "Kitale", trees: 1600 },
      { name: "Mt. Elgon", trees: 1400 }
    ]
  },
  {
    name: "South East Nyanza Field",
    stations: [{ name: "Stations TBD", trees: 1000 }]
  },
  {
    name: "South West Nyanza Field",
    stations: [
      { name: "Migori", trees: 1600 },
      { name: "Nyamome", trees: 1300 },
      { name: "Kadika", trees: 1400 },
      { name: "Nyaduong", trees: 1200 },
      { name: "Magina", trees: 1300 },
      { name: "Sota", trees: 1100 },
      { name: "Nyandago", trees: 1400 }
    ]
  },
  {
    name: "Southern Kenya Lake Field",
    stations: [
      { name: "Wang’a Pala", trees: 1400 },
      { name: "Dudi", trees: 1200 },
      { name: "Wire", trees: 1300 },
      { name: "Oyugis", trees: 1500 },
      { name: "Kwoyo", trees: 1400 }
    ]
  },
  {
    name: "West Rift Valley Field",
    stations: [
      { name: "Kapsabet", trees: 1500 },
      { name: "Chepterit", trees: 1300 },
      { name: "Kaigat", trees: 1200 },
      { name: "Tinderet", trees: 1400 }
    ]
  },
  {
    name: "Central Kenya Conference",
    stations: [
      { name: "Central Nairobi", trees: 2000 },
      { name: "Mt. Kenya Central", trees: 1800 },
      { name: "Mt. Kenya South", trees: 1700 },
      { name: "North Nairobi", trees: 1600 },
      { name: "Thika", trees: 1500 },
      { name: "West Nairobi", trees: 1900 }
    ]
  },
  {
    name: "Central Rift Valley Conference",
    stations: [
      { name: "Baringo South", trees: 1500 },
      { name: "Laikipia", trees: 1300 },
      { name: "Molo", trees: 1400 },
      { name: "Naivasha", trees: 1500 },
      { name: "Nakuru East", trees: 1600 },
      { name: "Nakuru West", trees: 1500 },
      { name: "Narok", trees: 1300 },
      { name: "Njoro", trees: 1400 },
      { name: "Nyahururu", trees: 1500 },
      { name: "Nyandarua", trees: 1300 },
      { name: "Olenguruone", trees: 1200 },
      { name: "Rongai", trees: 1300 }
    ]
  },
  {
    name: "East Nairobi Field",
    stations: [
      { name: "Kitui", trees: 1400 },
      { name: "Lower Nairobi", trees: 1300 },
      { name: "Machakos", trees: 1500 },
      { name: "Mbooni", trees: 1200 },
      { name: "Upper Nairobi", trees: 1400 },
      { name: "Wote", trees: 1300 }
    ]
  },
  {
    name: "Kenya Coast Field",
    stations: [
      { name: "Galana", trees: 1200 },
      { name: "Kilifi", trees: 1400 },
      { name: "Lamu", trees: 1300 },
      { name: "Malindi", trees: 1500 },
      { name: "Mombasa", trees: 1600 },
      { name: "Mombasa West", trees: 1500 },
      { name: "Mtito Andei", trees: 1400 },
      { name: "North Eastern", trees: 1300 },
      { name: "South Coast", trees: 1400 },
      { name: "Taita Taveta", trees: 1500 }
    ]
  },
  {
    name: "North East Kenya Field",
    stations: [
      { name: "Meru", trees: 1500 },
      { name: "Mt. Kenya Central", trees: 1400 },
      { name: "Mt. Kenya East", trees: 1300 },
      { name: "North West", trees: 1200 },
      { name: "Nyambene", trees: 1400 },
      { name: "Tharaka", trees: 1300 }
    ]
  },
  {
    name: "Nyamira Conference",
    stations: [
      { name: "Gesura", trees: 1500 },
      { name: "Kebirigo", trees: 1300 },
      { name: "Manga", trees: 1400 },
      { name: "Matutu", trees: 1300 },
      { name: "Nyaigwa", trees: 1200 },
      { name: "Sironga", trees: 1500 },
      { name: "Tonga", trees: 1400 },
      { name: "Township", trees: 1500 }
    ]
  },
  {
    name: "Nyamira West Field",
    stations: [
      { name: "Kemera", trees: 1200 },
      { name: "Keroka", trees: 1400 },
      { name: "Nyagesenda", trees: 1300 },
      { name: "Rigoma", trees: 1200 },
      { name: "Riotero", trees: 1300 }
    ]
  },
  {
    name: "South East Kenya Field",
    stations: [
      { name: "Etago", trees: 1300 },
      { name: "Gotichaki", trees: 1200 },
      { name: "Kenyenya", trees: 1300 },
      { name: "Kilgoris", trees: 1500 },
      { name: "Lolgorian", trees: 1400 },
      { name: "Magenche", trees: 1300 },
      { name: "Mogenda", trees: 1200 },
      { name: "Nyacheki", trees: 1300 },
      { name: "Nyamache", trees: 1400 },
      { name: "Nyamonyo", trees: 1200 },
      { name: "Ogembo", trees: 1400 },
      { name: "Omosaria", trees: 1100 },
      { name: "Shartuka", trees: 1300 }
    ]
  },
  {
    name: "South Kenya Conference",
    stations: [
      { name: "Gesabakwa", trees: 1400 },
      { name: "Itumbe", trees: 1300 },
      { name: "Masimba", trees: 1400 },
      { name: "Nyanchwa", trees: 1500 },
      { name: "Riana", trees: 1300 },
      { name: "Riondong’a", trees: 1200 },
      { name: "Suneka", trees: 1300 }
    ]
  },
  {
    name: "South Nairobi Kajiado Field",
    stations: [
      { name: "Kajiado East", trees: 1300 },
      { name: "Kajiado North", trees: 1500 },
      { name: "Southern Nairobi", trees: 1600 }
    ]
  },
  {
    name: "South Rift Valley Field",
    stations: [
      { name: "Bomet", trees: 1500 },
      { name: "Bureti", trees: 1400 },
      { name: "Kericho Central", trees: 1300 },
      { name: "Kericho East", trees: 1300 },
      { name: "Kericho West", trees: 1400 }
    ]
  }
];

const seedDB = async () => {
  try {
    // 1. Connect to DB
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URL);
    console.log("✅ Connected to Database for seeding");

    // 2. Clear existing data (optional, but prevents duplicates)
    await Station.deleteMany({});
    await Conference.deleteMany({});
    console.log("🧹 Cleared existing Conferences and Stations");

    // 3. Loop through data and insert
    for (const data of seedData) {
      // Determine if it's a "Conference" or "Field" based on the name
      const regionType = data.name.includes("Field") ? "Field" : "Conference";

      // Create Conference
      const newConf = await Conference.create({
        name: data.name,
        regionType: regionType
      });

      // Prepare Stations with reference to the new Conference ID
      if (data.stations.length > 0) {
        const stationsWithId = data.stations.map(st => ({
          name: st.name,
          treesPlanted: st.trees,
          conference: newConf._id // Link to parent
        }));

        // Bulk insert stations
        await Station.insertMany(stationsWithId);
      }
      
      console.log(`✨ Added: ${data.name} with ${data.stations.length} stations`);
    }

    console.log("🚀 Database Seeded Successfully!");
    process.exit(0);

  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

seedDB();