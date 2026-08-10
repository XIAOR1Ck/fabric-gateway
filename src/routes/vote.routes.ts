import { Router } from 'express';

import {
  createElection,
  addCandidate,
  getAllElections,
  getCandidates,
  castVote,
  getResults,
} from '../controllers/vote.controller';

import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

// Everything under this router requires JWT
router.use(authenticateJWT);

router.post('/elections', createElection);

router.post('/candidates', addCandidate);

router.get('/elections', getAllElections);

router.get(
  '/elections/:electionId/candidates',
  getCandidates,
);

router.post('/votes', castVote);

router.get(
  '/elections/:electionId/results',
  getResults,
);

export default router;
