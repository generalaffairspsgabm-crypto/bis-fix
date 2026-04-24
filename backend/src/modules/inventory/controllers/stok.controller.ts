import { Request, Response, NextFunction } from 'express';
import stokService from '../services/stok.service';

class StokController {
    async getStok(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await stokService.getStokList(req.query);
            res.json({ status: 'success', ...result });
        } catch (error) {
            next(error);
        }
    }

    async getSerialNumbers(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await stokService.getSerialNumberList(req.query);
            res.json({ status: 'success', ...result });
        } catch (error) {
            next(error);
        }
    }

    async createTransaksi(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.id;
            const result = await stokService.createTransaksi(req.body, userId);
            res.status(201).json({ status: 'success', data: result });
        } catch (error) {
            next(error);
        }
    }

    async getTransaksiList(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await stokService.getTransaksiList(req.query);
            res.json({ status: 'success', ...result });
        } catch (error) {
            next(error);
        }
    }

    async getTransaksiDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await stokService.getTransaksiDetail(Number(req.params.id));
            res.json({ status: 'success', data: result });
        } catch (error) {
            next(error);
        }
    }

    async getKartuStok(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await stokService.getKartuStok(req.query);
            res.json({ status: 'success', ...result });
        } catch (error) {
            next(error);
        }
    }
}

export default new StokController();
