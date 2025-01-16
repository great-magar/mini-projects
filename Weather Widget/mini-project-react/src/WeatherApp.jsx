import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";

export default function InfoBox({ info }) {
    // City and weather image mappings
    const cityImages = {
        paris: "https://images.unsplash.com/photo-1517430816045-d9c4b2c358ba?w=800&fit=crop&auto=format&dpr=2&q=60",
        "new york": "https://images.unsplash.com/photo-1518230267170-18e8e7169c62?w=800&fit=crop&auto=format&dpr=2&q=60",
        london: "https://images.unsplash.com/photo-1550462045-4c4ac03e5f34?w=800&fit=crop&auto=format&dpr=2&q=60",
        tokyo: "https://images.unsplash.com/photo-1551962029-4c902dc835f4?w=800&fit=crop&auto=format&dpr=2&q=60",
        kathmandu: "https://images.unsplash.com/photo-1601901674751-bdd49b016da0?w=800&fit=crop&auto=format&dpr=2&q=60",
    };

    const weatherImages = {
        "clear sky": "https://images.unsplash.com/photo-1470131631783-2db3817c2da6?w=800&fit=crop&auto=format&dpr=2&q=60",
        "few clouds": "https://images.unsplash.com/photo-1522172623732-f6ff865b7074?w=800&fit=crop&auto=format&dpr=2&q=60",
        "scattered clouds": "https://images.unsplash.com/photo-1565571463-24c9a1b6a8c1?w=800&fit=crop&auto=format&dpr=2&q=60",
        "broken clouds": "https://images.unsplash.com/photo-1564762218-c16da16c99b8?w=800&fit=crop&auto=format&dpr=2&q=60",
        rain: "https://images.unsplash.com/photo-1513156323644-18947e0f1d8b?w=800&fit=crop&auto=format&dpr=2&q=60",
        snow: "https://images.unsplash.com/photo-1543138651-213d0e42c8e8?w=800&fit=crop&auto=format&dpr=2&q=60",
    };

    // Determine the image to display
    const cityImage = cityImages[info.city.toLowerCase()] || null;
    const weatherImage = weatherImages[info.weather.toLowerCase()] || null;
    const imageToDisplay =
        weatherImage ||
        cityImage ||
        "https://via.placeholder.com/800x400.png?text=No+Image+Available";

    console.log("Image URL:", imageToDisplay); // Debugging

    return (
        <div className="InfoBox">
            <h2>Weather Info</h2>
            <div className="cardContainer">
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img" // Explicitly set as img tag
                        sx={{ height: 200 }}
                        image={imageToDisplay}
                        title={info.city}
                        onError={(e) => {
                            e.target.src =
                                "https://via.placeholder.com/800x400.png?text=Image+Not+Found"; // Fallback image
                        }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {info.city}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <p>Temperature: {info.temp}&deg;C</p>
                            <p>Humidity: {info.humidity}%</p>
                            <p>Min Temp: {info.tempMin}&deg;C</p>
                            <p>Max Temp: {info.tempMax}&deg;C</p>
                            <p>
                                Weather is {info.weather}, feels like{" "}
                                {info.feelsLike}&deg;C.
                            </p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
