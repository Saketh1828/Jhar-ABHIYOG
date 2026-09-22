import express from 'express';
import { transcribe } from '../controllers/voiceController.js';

const router = express.Router();

router.post('/transcribe', transcribe);

export default router;
