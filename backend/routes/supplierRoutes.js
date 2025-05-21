import express from 'express';
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplierController.js';

const router = express.Router();

router.post('/', createSupplier);       // Create
router.get('/', getSuppliers);          // Read All
router.get('/:id', getSupplierById);    // Read One
router.put('/:id', updateSupplier);     // Update
router.delete('/:id', deleteSupplier);  // Delete

export default router;
