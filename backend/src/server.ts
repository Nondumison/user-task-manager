import app from "./app";
import { initializeDatabase } from "./config/database";
import { PORT } from "./config/index";

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
    process.exit(1);
  });
