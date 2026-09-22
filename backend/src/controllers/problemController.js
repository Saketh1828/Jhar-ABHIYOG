import { Problem } from '../models/Problem.js';
import { aiService } from '../services/aiService.js';

export const getProblems = async (req, res, next) => {
  try {
    const { district, category, priority, status } = req.query;
    const filter = {};
    if (district && district !== 'All') filter.district = district;
    if (category && category !== 'All') filter.category = category;
    if (priority && priority !== 'All') filter.priority = priority;
    if (status && status !== 'All') filter.status = status;

    const problems = await Problem.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: problems.length, data: problems });
  } catch (error) {
    next(error);
  }
};

export const getProblemById = async (req, res, next) => {
  try {
    const problem = await Problem.findOne({ id: req.params.id });
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }
    res.json({ success: true, data: problem });
  } catch (error) {
    next(error);
  }
};

export const createProblem = async (req, res, next) => {
  try {
    const problemData = req.body;
    const newId = `JH-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const aiResult = await aiService.analyzeProblem(problemData);

    const problem = await Problem.create({
      ...problemData,
      id: newId,
      aiSuggestedCategory: aiResult.category,
      aiConfidence: aiResult.aiConfidence || 94,
      recommendedReceiver: aiResult.recommendedReceiver,
      receiverType: aiResult.receiverType,
      whyReceiver: aiResult.whyReceiver,
      assignedUniversity: aiResult.assignedUniversity,
      history: [
        {
          date: new Date().toISOString().split('T')[0],
          step: 'Submitted',
          note: `Report registered by ${problemData.reportedBy || 'Citizen'}. AI Receiver: ${aiResult.recommendedReceiver}`
        }
      ]
    });

    res.status(201).json({ success: true, data: problem });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status, note, assignedTeam, solutionText } = req.body;
    const problem = await Problem.findOne({ id: req.params.id });

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    problem.status = status;
    if (assignedTeam) problem.assignedTeam = assignedTeam;
    if (solutionText) problem.solutionProposed = solutionText;

    if (status === 'Resolved') {
      problem.resolutionDate = new Date().toISOString().split('T')[0];
      problem.resolutionDescription = solutionText || note || 'Resolved successfully.';
    }

    problem.history.push({
      date: new Date().toISOString().split('T')[0],
      step: status,
      note: note || `Status updated to ${status}`
    });

    await problem.save();
    res.json({ success: true, data: problem });
  } catch (error) {
    next(error);
  }
};

export const toggleLike = async (req, res, next) => {
  try {
    const problem = await Problem.findOne({ id: req.params.id });
    if (!problem) return res.status(404).json({ success: false, message: 'Problem not found' });

    problem.supportersCount += 1;
    await problem.save();

    res.json({ success: true, supportersCount: problem.supportersCount });
  } catch (error) {
    next(error);
  }
};
