import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSupabase } from '../config/supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'));
    }
  }
});

// Submit application
router.post('/', upload.fields([
  { name: 'idPhoto', maxCount: 1 },
  { name: 'bankStatements', maxCount: 3 },
  { name: 'ssnPhoto', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      fullName,
      phone,
      address,
      email,
      employmentInfo,
      monthlyIncome,
      idealCar,
      downPayment,
      importantNotes
    } = req.body;

    // 1. Send to n8n Webhook (Priority)
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        // Dynamic import for node:fs to ensure compatibility
        const { openAsBlob } = await import('node:fs');
        const formData = new FormData();

        // Append text fields
        Object.entries(req.body).forEach(([key, value]) => {
          formData.append(key, value);
        });

        // Append files
        if (req.files) {
          for (const [fieldName, files] of Object.entries(req.files)) {
            for (const file of files) {
              const fileBlob = await openAsBlob(file.path);
              formData.append(fieldName, fileBlob, file.originalname);
            }
          }
        }

        const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          body: formData
        });

        if (!n8nResponse.ok) {
          console.error('Failed to send to n8n:', await n8nResponse.text());
        } else {
          console.log('Successfully sent to n8n');
        }
      } catch (n8nError) {
        console.error('Error sending to n8n:', n8nError);
      }
    }

    // 2. Save to Supabase (Secondary/Backup)
    let applicationId = null;
    try {
      const parseCurrency = (val) => {
        if (!val) return null;
        if (Array.isArray(val)) return parseInt(val[0]);
        return parseInt(val);
      };

      const applicationData = {
        fullName,
        phone,
        address,
        email,
        employmentInfo,
        monthlyIncome: parseCurrency(monthlyIncome),
        idealCar,
        downPayment: parseCurrency(downPayment),
        importantNotes,
        idPhoto: req.files.idPhoto ? req.files.idPhoto[0].path : null,
        bankStatements: req.files.bankStatements ? req.files.bankStatements.map(file => file.path) : [],
        ssnPhoto: req.files.ssnPhoto ? req.files.ssnPhoto[0].path : null,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Check if Supabase is configured before trying to insert
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const { data, error } = await getSupabase()
          .from('applications')
          .insert([applicationData])
          .select()
          .single();

        if (error) throw error;
        applicationId = data.id;
      }
    } catch (dbError) {
      console.error('Supabase error:', dbError);
    }

    res.status(201).json({
      message: 'Application submitted successfully',
      applicationId: applicationId || 'n8n-processed'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all applications (for admin)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await getSupabase()
      .from('applications')
      .select('*')
      .order('submittedAt', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single application
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await getSupabase()
      .from('applications')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
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

export default router;