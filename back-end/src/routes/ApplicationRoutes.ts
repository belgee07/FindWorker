import { Router } from 'express';
import { createApplication, updateApplicationStatus, getApplications } from '../../controllers';

const router = Router();


router.post('/create', createApplication);
router.put('/updateStatus/:id', updateApplicationStatus);
router.get('/', getApplications);

export default router;
