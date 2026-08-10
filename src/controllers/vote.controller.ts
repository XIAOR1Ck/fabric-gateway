import { Request, Response } from 'express';
import { voteService } from '../gateway';


export const createElection = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      electionId,
      name,
      description,
      startDate,
      endDate,
    } = req.body;

    if (
      !electionId ||
      !name ||
      !description ||
      !startDate ||
      !endDate
    ) {
      res.status(400).json({
        success: false,
        message: 'All election fields are required',
      });
      return;
    }

    await voteService.createElection(
      electionId,
      name,
      description,
      startDate,
      endDate,
    );

    res.status(201).json({
      success: true,
      message: 'Election created successfully',
    });
  } catch (error) {
    console.error('Create election error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create election',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const addCandidate = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      electionId,
      candidateId,
      name,
      affiliation,
    } = req.body;

    if (
      !electionId ||
      !candidateId ||
      !name ||
      !affiliation
    ) {
      res.status(400).json({
        success: false,
        message: 'All candidate fields are required',
      });
      return;
    }

    await voteService.addCandidate(
      electionId,
      candidateId,
      name,
      affiliation,
    );

    res.status(201).json({
      success: true,
      message: 'Candidate added successfully',
    });
  } catch (error) {
    console.error('Add candidate error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to add candidate',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getAllElections = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const elections = await voteService.getAllElections();

    res.status(200).json({
      success: true,
      data: elections,
    });
  } catch (error) {
    console.error('Get elections error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve elections',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getCandidates = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { electionId } = req.params;

    if (!electionId) {
      res.status(400).json({
        success: false,
        message: 'Election ID is required',
      });
      return;
    }

    const candidates = await voteService.getCandidates(electionId as string);

    res.status(200).json({
      success: true,
      data: candidates,
    });
  } catch (error) {
    console.error('Get candidates error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve candidates',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const castVote = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { electionId, candidateId, proof } = req.body;

    if (!electionId || !candidateId || !proof) {
      res.status(400).json({
        success: false,
        message: 'Election ID, candidate ID and proof are required',
      });
      return;
    }

    await voteService.castVote(
      electionId,
      candidateId,
      proof,
    );

    res.status(201).json({
      success: true,
      message: 'Vote cast successfully',
    });
  } catch (error) {
    console.error('Cast vote error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to cast vote',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getResults = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { electionId } = req.params;

    if (!electionId) {
      res.status(400).json({
        success: false,
        message: 'Election ID is required',
      });
      return;
    }

    const results = await voteService.getResults(electionId as string);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error('Get results error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve results',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
