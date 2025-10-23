import dotenv from "dotenv";
import { app } from "./app";

if (process.env.NODE_ENV === "DEVELOPMENT") {
  dotenv.config({ path: ".env.development" });
} else {
  dotenv.config({ path: ".env.production" });
}

const port = process.env.PORT;
function server() {
  try {
    app.listen(port, () => {
      console.log(
        `server is running in ${process.env.NODE_ENV} mode on port: ${port}`
      );
    });
  } catch (error) {
    console.log("something went wrong while running server", error);
    process.exit(1);
  }
}

server();
