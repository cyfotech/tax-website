/**
 * Leads & Inquiries Manager Controller
 */

import { Response } from 'express';
import { storage } from './storage.ts';
import { securityEngine } from './securityEngine.ts';
import { AuthenticatedRequest } from './authController.ts';

export const leadsController = {
  async listLeads(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { type, status, search } = req.query;
    let leads = storage.getAllLeads();

    if (type && type !== 'all') {
      leads = leads.filter((l) => l.type === type);
    }
    if (status && status !== 'all') {
      leads = leads.filter((l) => l.status === status);
    }
    if (search) {
      const q = String(search).toLowerCase();
      leads = leads.filter(
        (l) =>
          l.fullName.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.companyName && l.companyName.toLowerCase().includes(q))
      );
    }

    res.json({ leads });
  },

  async updateLead(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { status, internalNotes } = req.body;

    const updated = storage.updateLead(id, { status, internalNotes });
    if (!updated) {
      res.status(404).json({ error: 'Lead not found.' });
      return;
    }

    securityEngine.logEvent({
      actorId: req.adminSession?.userId,
      actorName: req.adminSession?.username,
      role: req.adminSession?.role,
      action: 'lead_updated',
      resource: `lead:${id}`,
      ip: req.ip || '127.0.0.1',
      result: 'success',
      riskLevel: 'INFO',
      details: { status, hasNotes: Boolean(internalNotes) },
    });

    res.json({ success: true, lead: updated });
  },

  async deleteLead(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    storage.deleteLead(id);
    res.json({ success: true });
  },
};
