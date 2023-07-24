import mongoose from "mongoose";
import app from "./app";
const port = 5000;
async function bootstrap() {
  try {
    await mongoose.connect("");

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });

    console.log(`Database connected success fully`);
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
