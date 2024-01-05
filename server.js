import express from "express";
import client from "./client.js";

const app = express();

app.get("/", async (req, res) => {
  const cachedData = await client.get("todos");

  if (cachedData) {
    console.log("Data retrieved from cache");
    res.json(JSON.parse(cachedData));
  } else {
    console.log("Fetching data from API");
    const response = await (await fetch('https://jsonplaceholder.typicode.com/todos')).json();
    
    // Store data in Redis cache with a timeout of 300 seconds (adjust as needed)
    client.setex("todos", 300, JSON.stringify(response));

    res.json(response);
  }
});

app.listen(3000, () => {
  console.log("Server connected");
});
