import { Response } from 'express';
const asyncHandler = require('express-async-handler');
import { IUser, TypedRequestUser } from '../interfaces/user.interface';

import User from '../models/userModel';
import Note from '../models/noteModel';
import Ticket from '../models/ticketModel';

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
export const getNotes = asyncHandler(async (req: TypedRequestUser<IUser>, res: Response) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user?._id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user?._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
export const addNote = asyncHandler(async (req: TypedRequestUser<IUser>, res: Response) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user?._id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user?._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user?._id,
  });

  res.status(200).json(note);
});
