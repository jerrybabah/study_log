import { Router, Request, Response } from 'express';
import Study, { IStudy } from '../models/study';
import Subject, { ISubject } from '../models/subject';

const router = Router();

interface hookQuery {
  userId: string,
  guid: string,
  notebookGuid: string,
  reason: string,
}

export const addOrUpdateStudies = async (req: Request, res: Response) => {
  const { userId, guid, notebookGuid, reason } = req.query as hookQuery;
  res.end();
};

router.get('/', addOrUpdateStudies);

export default router;