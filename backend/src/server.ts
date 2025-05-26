import app from "./app";
import { initializeDatabase } from "./config/database";
import { PORT } from "./config/index";

initializeDatabase()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on http://localhost: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
    process.exit(1);
  });
