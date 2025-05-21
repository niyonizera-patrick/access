import StockRecord from '../models/StockRecord.js';

// Create
export const createStockRecord = async (req, res) => {
  try {
    const { itemName, quantity, supplier, category } = req.body;
    const lowStockAlert = quantity < 10; // 👀 auto-alert if low
    const record = new StockRecord({ itemName, quantity, supplier, category, lowStockAlert });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read All
export const getStockRecords = async (req, res) => {
  try {
    const records = await StockRecord.find()
      .populate('supplier') // 🔁 populate supplier data
      .populate('category'); // 🔁 populate category data
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read One
export const getStockRecordById = async (req, res) => {
  try {
    const record = await StockRecord.findById(req.params.id)
      .populate('supplier')
      .populate('category');
    if (!record) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateStockRecord = async (req, res) => {
  try {
    const { quantity } = req.body;
    const lowStockAlert = quantity < 10;
    const updated = await StockRecord.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lowStockAlert },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
export const deleteStockRecord = async (req, res) => {
  try {
    await StockRecord.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
