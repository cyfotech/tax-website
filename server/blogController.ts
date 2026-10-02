/**
 * Blog CMS Controller
 * Create, edit, publish, schedule, and delete articles
 */

import { Response } from 'express';
import { storage } from './storage.ts';
import { securityEngine } from './securityEngine.ts';
import { AuthenticatedRequest } from './authController.ts';

export const blogController = {
  async listPosts(req: AuthenticatedRequest, res: Response): Promise<void> {
    res.json({ posts: storage.getAllBlogPosts() });
  },

  async savePost(req: AuthenticatedRequest, res: Response): Promise<void> {
    const postData = req.body;
    const actor = req.adminSession?.username || 'Admin';

    if (!postData.title || !postData.slug) {
      res.status(400).json({ error: 'Title and Slug are required.' });
      return;
    }

    if (!postData.id) {
      postData.id = `post_${Date.now()}`;
      postData.createdAt = new Date().toISOString();
      postData.author = postData.author || actor;
    }

    postData.lastModified = new Date().toISOString();
    const saved = storage.saveBlogPost(postData);

    securityEngine.logEvent({
      actorId: req.adminSession?.userId,
      actorName: actor,
      role: req.adminSession?.role,
      action: 'blog_post_saved',
      resource: `blog:${postData.slug}`,
      ip: req.ip || '127.0.0.1',
      result: 'success',
      riskLevel: 'INFO',
    });

    res.json({ success: true, post: saved });
  },

  async deletePost(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const actor = req.adminSession?.username || 'Admin';

    storage.deleteBlogPost(id);

    securityEngine.logEvent({
      actorId: req.adminSession?.userId,
      actorName: actor,
      role: req.adminSession?.role,
      action: 'blog_post_deleted',
      resource: `blog:${id}`,
      ip: req.ip || '127.0.0.1',
      result: 'success',
      riskLevel: 'LOW',
    });

    res.json({ success: true });
  },
};
