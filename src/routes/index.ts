import express from 'express';

const router = express.Router();

import {displayTheImage, deleteImage} from '../resize/imageFuncs';

router.get('/', displayTheImage);
router.use('/delete', deleteImage);

export default router;
