const express = require('express');
const router = express.Router();
const { getTickets, getTicket, createTicket, deleteTicket, updateTicket } = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');

// Re-route into note router
import noteRouter from './noteRoutes';
router.use('/:ticketId/notes', noteRouter);

router.route('/').get(protect, getTickets).post(protect, createTicket);

router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket);

export default router;
