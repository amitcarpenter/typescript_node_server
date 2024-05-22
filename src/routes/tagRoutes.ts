import express from 'express';
import {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
  deleteMultipleTags ,
} from '../controllers/tagController';

const router = express.Router();

router.post('/', createTag);
router.get('/', getAllTags);
router.get('/:id', getTagById);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);
router.delete('/', deleteMultipleTags);

export default router;
