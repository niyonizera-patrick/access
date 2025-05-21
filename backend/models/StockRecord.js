import mongoose from 'mongoose';

const stockRecordSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier', // 🧍 Reference to Supplier
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // 📦 Reference to Category
    required: true,
  },
  lowStockAlert: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

const StockRecord = mongoose.model('StockRecord', stockRecordSchema);
export default StockRecord;
