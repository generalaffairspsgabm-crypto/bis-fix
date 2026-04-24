import { Router } from 'express';
import { validateInventoryMasterData } from '../../../shared/middleware/validateInventoryMasterData';
import masterDataController from '../controllers/master-data.controller';
import { checkPermission } from '../../../shared/middleware/permission.middleware';
import { authenticate } from '../../../shared/middleware/auth.middleware';
import { RESOURCES, ACTIONS } from '../../../shared/constants/permissions';
import { cacheMiddleware } from '../../../shared/middleware/cache.middleware';
import { auditLogger } from '../../../shared/middleware/auditLog.middleware';

const router = Router();

router.use(authenticate);

const dynamicAuditLogger = (req: any, res: any, next: any) => {
    return auditLogger(`inv_${req.params.model}`)(req, res, next);
};

router.get(
    '/master/:model',
    checkPermission(RESOURCES.INVENTORY_MASTER_DATA, ACTIONS.READ),
    cacheMiddleware(3600),
    (req, res, next) => masterDataController.getAll(req, res, next)
);

router.get(
    '/master/:model/:id',
    checkPermission(RESOURCES.INVENTORY_MASTER_DATA, ACTIONS.READ),
    (req, res, next) => masterDataController.getOne(req, res, next)
);

router.post(
    '/master/:model',
    checkPermission(RESOURCES.INVENTORY_MASTER_DATA, ACTIONS.CREATE),
    validateInventoryMasterData,
    dynamicAuditLogger,
    (req, res, next) => masterDataController.create(req, res, next)
);

router.put(
    '/master/:model/:id',
    checkPermission(RESOURCES.INVENTORY_MASTER_DATA, ACTIONS.UPDATE),
    validateInventoryMasterData,
    dynamicAuditLogger,
    (req, res, next) => masterDataController.update(req, res, next)
);

router.delete(
    '/master/:model/:id',
    checkPermission(RESOURCES.INVENTORY_MASTER_DATA, ACTIONS.DELETE),
    dynamicAuditLogger,
    (req, res, next) => masterDataController.delete(req, res, next)
);

router.post(
    '/master/:model/:id/restore',
    checkPermission(RESOURCES.INVENTORY_MASTER_DATA, ACTIONS.DELETE),
    dynamicAuditLogger,
    (req, res, next) => masterDataController.restore(req, res, next)
);

export default router;
