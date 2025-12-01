import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1,
      },
      precio: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  estado: {
    type: String,
    enum: ["PENDIENTE", "EN_ENVIO", "ENTREGADO", "CANCELADO"],
    default: "PENDIENTE",
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Pedido = mongoose.model("Pedido", pedidoSchema);
export default Pedido;
