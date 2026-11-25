
const express = require("express");
const cors = require("cors");
const path = require("path");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

const cars = [
    {
        id: 1,
        name: "Mahindra Thar",
        price: 1500000,
        category: "SUV",
        year: 2025,
        fuel: "Diesel",
        transmission: "Manual",
        colors: ["Black", "Red", "White"],
        image: "/images/cars/mahindra-thar/thar.jpg",
        description: "A powerful off-road SUV built for adventure."
    },
    {
        id: 2,
        name: "BMW 3 Series",
        price: 6500000,
        category: "Luxury Sedan",
        year: 2025,
        fuel: "Petrol",
        transmission: "Automatic",
        colors: ["Black", "Blue", "White"],
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900",
        description: "Sporty performance with premium comfort."
    },
    {
        id: 3,
        name: "Mercedes-Benz C-Class",
        price: 7000000,
        category: "Luxury Sedan",
        year: 2025,
        fuel: "Petrol",
        transmission: "Automatic",
        colors: ["Black", "Silver", "White"],
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900",
        colorImages: {
            Black: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900",
            Silver: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900",
            White: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900"
        },
        description: "Elegant design and advanced luxury."
    },
    {
        id: 4,
        name: "Audi Q5",
        price: 6800000,
        category: "Luxury SUV",
        year: 2025,
        fuel: "Petrol",
        transmission: "Automatic",
        colors: ["Black", "Grey", "White"],
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900",
        description: "A refined SUV with modern technology."
    },
    {
        id: 5,
        name: "Toyota Fortuner",
        price: 3500000,
        category: "SUV",
        year: 2025,
        fuel: "Diesel",
        transmission: "Automatic",
        colors: ["Black", "White", "Silver"],
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900",
        description: "A bold SUV designed for family adventures."
    },
    {
        id: 6,
        name: "Range Rover Sport",
        price: 14500000,
        category: "Luxury SUV",
        year: 2025,
        fuel: "Diesel",
        transmission: "Automatic",
        colors: ["Black", "White", "Grey"],
        image: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=900",
        description: "Premium comfort with impressive capability."
    },
    {
        id: 7,
        name: "Porsche 911",
        price: 19000000,
        category: "Sports Car",
        year: 2025,
        fuel: "Petrol",
        transmission: "Automatic",
        colors: ["Red", "Black", "Yellow"],
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900",
        description: "Iconic sports car with thrilling performance."
    },
    {
        id: 8,
        name: "Lamborghini Huracan",
        price: 35000000,
        category: "Supercar",
        year: 2025,
        fuel: "Petrol",
        transmission: "Automatic",
        colors: ["Yellow", "Black", "Orange"],
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=900",
        description: "A dramatic supercar built for excitement."
    },
    {
        id: 9,
        name: "Tesla Model 3",
        price: 6000000,
        category: "Electric Sedan",
        year: 2025,
        fuel: "Electric",
        transmission: "Automatic",
        colors: ["White", "Black", "Red"],
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=900",
        description: "Modern electric driving with smart technology."
    },
    {
        id: 10,
        name: "Jeep Wrangler",
        price: 6500000,
        category: "Off-road SUV",
        year: 2025,
        fuel: "Petrol",
        transmission: "Automatic",
        colors: ["Green", "Black", "White"],
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900",
        description: "Adventure-ready off-road performance."
    },
    {
        id: 11,
        name: "Lexus ES",
        price: 6500000,
        category: "Luxury Sedan",
        year: 2025,
        fuel: "Hybrid",
        transmission: "Automatic",
        colors: ["Silver", "Black", "White"],
        image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=900",
        description: "Quiet luxury and sophisticated comfort."
    },
    {
        id: 12,
        name: "Ford Mustang",
        price: 7500000,
        category: "Sports Car",
        year: 2025,
        fuel: "Petrol",
        transmission: "Automatic",
        colors: ["Red", "Blue", "Black"],
        image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=900",
        description: "Classic muscle-car character and power."
    }
];




app.get("/api/products", (req, res) => {
    res.json(cars);
});

app.get("/api/products/:id", (req, res) => {
    const car = cars.find(item => item.id === Number(req.params.id));

    if (!car) {
        return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
});

app.get("/api/health", (req, res) => {
    res.json({ status: "Sultan Ayun Showroom backend is running!" });
});

app.listen(5000, "0.0.0.0", () => {
    console.log("Sultan Ayun Showroom backend running on port 5000");
});

