import mongoose from "mongoose"; 

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    rol: { type: String, enum: ["cliente", "admin"], default: "cliente" }
    },  {timestamps: true});

export default mongoose.model('User', UserSchema);