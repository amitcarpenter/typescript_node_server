import { Router } from 'express';
import {
  getAllSettings,
  getSetting,
  createSetting,
  updateSetting,
  deleteSetting,
} from '../controllers/settingsController';

const router = Router();

router.get('/', getAllSettings); // GET /api/settings
router.get('/:key', getSetting); // GET /api/settings/:key
router.post('/', createSetting); // POST /api/settings
router.put('/:key', updateSetting); // PUT /api/settings/:key
router.delete('/:key', deleteSetting); // DELETE /api/settings/:key

export default router;
