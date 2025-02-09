import express, {Router} from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/userModel.js';

const router : Router = express.Router();

// GET /users - Get all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users : User[] = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    const message : string = error instanceof Error ? error.message : '❌ Get all users failed';
    res.status(500).json({ message });
}
});

// GET /users/:id - Get a user by id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: '❌ User not found' });
    }
  } catch (error) {
    const message : string = error instanceof Error ? error.message : '❌ Get user by id failed';
    res.status(500).json({ message });
  }
});

// POST /users - Create a new user
router.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : '❌ Create new User failed' });
  }
});

// PUT /users/:id - Update a user by id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: '❌ Cannot update by ID, User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : '❌ Update user failed' });
  }
});

// DELETE /users/:id - Delete a user by id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: '❌ User ID not found. Cannot delete by ID at this time' });
    }
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : '❌ Unable to delete User by id' });
  }
});

export { router as userRouter };
