import { Router } from "express";
import {addStudent, deleteStudent, findStudent, updateStudent} from "../controller/studentController.js";

const router = Router();

router.post('/student', addStudent);
router.get('/student/:id', findStudent);
router.delete('/student/:id', deleteStudent);
router.patch('/student/:id', updateStudent);

export default router;