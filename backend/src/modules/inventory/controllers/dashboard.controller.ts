import { Request, Response, NextFunction } from 'express';
import dashboardService from '../services/dashboard.service';

class DashboardController {
    async getStats(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await dashboardService.getStats();
            res.json({ status: 'success', data });
        } catch (error) {
            next(error);
        }
    }

    async getStockByWarehouse(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await dashboardService.getStockByWarehouse();
            res.json({ status: 'success', data });
        } catch (error) {
            next(error);
        }
    }

    async getCategoryBreakdown(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await dashboardService.getCategoryBreakdown();
            res.json({ status: 'success', data });
        } catch (error) {
            next(error);
        }
    }

    async getRecentTransactions(req: Request, res: Response, next: NextFunction) {
        try {
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const data = await dashboardService.getRecentTransactions(limit);
            res.json({ status: 'success', data });
        } catch (error) {
            next(error);
        }
    }

    async getLowStockItems(req: Request, res: Response, next: NextFunction) {
        try {
            const threshold = req.query.threshold ? Number(req.query.threshold) : 5;
            const data = await dashboardService.getLowStockItems(threshold);
            res.json({ status: 'success', data });
        } catch (error) {
            next(error);
        }
    }
}

export default new DashboardController();
