import express from 'express';
import { getSupabase } from '../config/supabase.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication
router.use(auth);

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const { count: total } = await getSupabase()
      .from('applications')
      .select('*', { count: 'exact', head: true });

    const { count: pending } = await getSupabase()
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: approved } = await getSupabase()
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    const { count: rejected } = await getSupabase()
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'rejected');

    res.json({
      total,
      pending,
      approved,
      rejected
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get applications with pagination and filters
router.get('/applications', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const search = req.query.search;

    let query = getSupabase().from('applications').select('*', { count: 'exact' });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`fullName.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: applications, error, count } = await query
      .order('submittedAt', { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.json({
      applications,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status
router.patch('/applications/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'under_review', 'approved', 'rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const { data, error } = await getSupabase()
      .from('applications')
      .update({ status, updatedAt: new Date().toISOString() })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete application
router.delete('/applications/:id', async (req, res) => {
  try {
    const { error } = await getSupabase()
      .from('applications')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;