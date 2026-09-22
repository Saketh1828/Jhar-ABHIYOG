import { speechService } from '../services/speechService.js';

export const transcribe = async (req, res, next) => {
  try {
    const { audio, language } = req.body;
    const result = await speechService.transcribeAudio(audio, language || 'hi');
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};
