import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://tranhai:tranhai123@cluster0.nbg0x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tranhai:tranhai123@cluster0.nbg0x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );

    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();
