import { Router } from "express";
import movieRoutes from "./movie.routes.js"
import theatreRoutes from "./theatre.routes.js"
import showRoutes from './show.routes.js'
import { checkAdmin } from "../middleware/checkadmin.middleware.js";
import { getdetails } from "../controllers/admin.controller.js";
const router=Router();

router.get("/",(req,res)=>{
    res.send("welcome to admin route");
})
//All info such as all movies count, all shows count , all theatres count, total number of users.
router.get("/alldetails",checkAdmin,getdetails);
//movie routes
router.use("/movie",movieRoutes);

export default router;

//theatre routes
router.use("/theatre",theatreRoutes);

//show routes
router.use("/show",showRoutes);

