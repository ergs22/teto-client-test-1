import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Path `userId` is required."],
  },

  date: {
    type: String, // Store dates as strings in the format 'YYYY-MM-DD'
    required: [true, "Path `date` is required."],
  },
  messages: [
    {
      sender: {
        type: String,
        required: [true, "Path `sender` is required."],
      },
      message: {
        type: String,
        required: [true, "Path `message` is required."],
      },
      timestamp: {
        type: Date,
        required: [true, "Path `timestamp` is required."],
      },
    },
  ],
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
