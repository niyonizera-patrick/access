import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
});

export default mongoose.model('Supplier', supplierSchema);
