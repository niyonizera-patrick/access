import express from 'express';
import {
  createStockRecord,
  getStockRecords,
  getStockRecordById,
  updateStockRecord,
  deleteStockRecord,
} from '../controllers/stockController.js';

const router = express.Router();

router.post('/', createStockRecord);
router.get('/', getStockRecords);
router.get('/:id', getStockRecordById);
router.put('/:id', updateStockRecord);
router.delete('/:id', deleteStockRecord);

export default router;
