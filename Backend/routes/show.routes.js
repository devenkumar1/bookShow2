import {Router} from 'express';
const router=Router();
import {addShow,updateShow,deleteShow, getAllShowsAvailable} from '../controllers/show.controllers.js';
import { checkAdmin } from '../middleware/checkadmin.middleware.js';
router.post('/add',checkAdmin,addShow);
router.put('/update/:id',checkAdmin,updateShow);
router.delete("/delete/:id",checkAdmin,deleteShow);

router.get('/allshows',getAllShowsAvailable);


export default router;