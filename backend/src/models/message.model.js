import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
    senderId: {
        type: mongoose.Schema.Types.ObjectId, // this tells mongo db that receiver id and sender id wil be referance to user 
        ref: "User",   // reference to user model
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type : String,
    },
    image: {
        type : String,
    },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;