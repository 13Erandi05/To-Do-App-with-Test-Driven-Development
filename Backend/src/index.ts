import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todoRoutes";
import { AppDataSource } from "./data-source";

// Create and configure the Express application
const app = express();

app.use(cors()); // Enable CORS

app.use(bodyParser.json());

// Use the todoRoutes for handling routes under '/todos'
app.use("/todos", todoRoutes);

// Connect to the database and start the server
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.use("/todos", todoRoutes);

    // Start server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

// Export the app for testing purposes
export { app };
