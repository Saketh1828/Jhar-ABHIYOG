import { translationService } from '../services/translationService.js';

export const translate = async (req, res, next) => {
  try {
    const { text, sourceLanguage, targetLanguage } = req.body;
    const result = await translationService.translate(text, sourceLanguage, targetLanguage);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};
