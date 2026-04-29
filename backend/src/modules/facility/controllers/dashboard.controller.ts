import { Request, Response, NextFunction } from 'express';
import FacilityBuilding from '../models/Building';
import FacilityRoom from '../models/Room';
import FacilityOccupant from '../models/Occupant';
import FacilityAsset from '../models/Asset';
import FacilityWorkOrder from '../models/WorkOrder';

class FacilityDashboardController {
    async getSummary(req: Request, res: Response, next: NextFunction) {
        try {
            const [
                totalBuildings,
                totalRooms,
                roomsTersedia,
                roomsPenuh,
                roomsMaintenance,
                totalOccupantsAktif,
                totalAssetsAktif,
                workOrdersOpen,
                workOrdersInProgress,
                workOrdersResolved,
            ] = await Promise.all([
                FacilityBuilding.count({ where: { status: 'Aktif' } }),
                FacilityRoom.count(),
                FacilityRoom.count({ where: { status: 'Tersedia' } }),
                FacilityRoom.count({ where: { status: 'Penuh' } }),
                FacilityRoom.count({ where: { status: 'Maintenance' } }),
                FacilityOccupant.count({ where: { status: 'Aktif' } }),
                FacilityAsset.count({ where: { status: 'Aktif' } }),
                FacilityWorkOrder.count({ where: { status: 'Open' } }),
                FacilityWorkOrder.count({ where: { status: 'In Progress' } }),
                FacilityWorkOrder.count({ where: { status: 'Resolved' } }),
            ]);

            res.json({
                status: 'success',
                data: {
                    buildings: { total: totalBuildings },
                    rooms: {
                        total: totalRooms,
                        tersedia: roomsTersedia,
                        penuh: roomsPenuh,
                        maintenance: roomsMaintenance,
                    },
                    occupants: { aktif: totalOccupantsAktif },
                    assets: { aktif: totalAssetsAktif },
                    workOrders: {
                        open: workOrdersOpen,
                        inProgress: workOrdersInProgress,
                        resolved: workOrdersResolved,
                    },
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new FacilityDashboardController();
