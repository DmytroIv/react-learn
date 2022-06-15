import { Response } from 'express';
const asyncHandler = require('express-async-handler');

import User from '../models/userModel';
import Ticket from '../models/ticketModel';
import { IUser, TypedRequestUser } from '../interfaces/user.interface';

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
export const getTickets = asyncHandler(async (req: TypedRequestUser<IUser>, res: Response) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user?._id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user: req.user?._id });

  res.status(200).json(tickets);
});

// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private
export const getTicket = asyncHandler(async (req: TypedRequestUser<IUser>, res: Response) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user?._id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user?._id.toString()) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  res.status(200).json(ticket);
});

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
export const createTicket = asyncHandler(async (req: TypedRequestUser<IUser>, res: Response) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product and description');
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user?._id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user?._id,
    status: 'new',
  });

  res.status(201).json(ticket);
});

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
export const deleteTicket = asyncHandler(async (req: TypedRequestUser<IUser>, res: Response) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user?._id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user?._id.toString()) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
export const updateTicket = asyncHandler(async (req: TypedRequestUser<IUser>, res: Response) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user?._id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user?._id.toString()) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedTicket);
});
