import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState(null);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "1e308f7a3ae9c751a6d670a7cd6648bd";

    // Fetch weather data from API
    const getWeatherInfo = async () => {
        try {
            setError(null); // Reset error state
            const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error("City not found! Please enter a valid city name.");
            }
            const jsonResponse = await response.json();

            // Map API response to required format
            const result = {
                city: jsonResponse.name, // Use API city name (case-corrected)
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };
            updateInfo(result); // Update parent component with weather data
        } catch (error) {
            console.error("Error fetching weather info:", error);
            setError(error.message); // Display error message
        }
    };

    // Handle input changes
    const handleChange = (event) => {
        setCity(event.target.value);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (city.trim() === "") {
            setError("Please enter a city name.");
            return;
        }
        await getWeatherInfo(); // Fetch weather info
        setCity(""); // Clear input field
    };

    return (
        <div className="SearchBox">
            <h2>Weather Widget: Search Any City</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="Search City"
                    variant="outlined"
                    style={{ marginRight: "10px" }}
                    value={city}
                    onChange={handleChange}
                    error={!!error} // Display error state in input
                    helperText={error} // Display error message
                    required
                />
                <Button size="large" variant="contained" type="submit">
                    Search
                </Button>
            </form>
        </div>
    );
}
