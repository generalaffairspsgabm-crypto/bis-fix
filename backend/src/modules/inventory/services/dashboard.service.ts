import { Sequelize, Op } from 'sequelize';
import InvProduk from '../models/Produk';
import InvStok from '../models/Stok';
import InvTransaksi from '../models/Transaksi';
import InvSerialNumber from '../models/SerialNumber';
import InvGudang from '../models/Gudang';
import InvKategori from '../models/Kategori';
import InvSubKategori from '../models/SubKategori';
import InvBrand from '../models/Brand';
import InvUom from '../models/Uom';
import Employee from '../../hr/models/Employee';
import User from '../../auth/models/User';

class InventoryDashboardService {
    async getStats() {
        const totalProduk = await InvProduk.count({ where: { status: 'Aktif' } });

        const totalStokResult = await InvStok.findOne({
            attributes: [[Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('jumlah')), 0), 'total']],
            raw: true,
        }) as any;
        const totalStok = parseInt(totalStokResult?.total || '0', 10);

        const lowStockCount = await InvStok.count({
            where: { jumlah: { [Op.lt]: 5 } },
        });

        const asetDipinjam = await InvSerialNumber.count({
            where: { karyawan_id: { [Op.ne]: null as any } },
        });

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const transaksiBulanIni = await InvTransaksi.count({
            where: { created_at: { [Op.gte]: startOfMonth } },
        });

        return { totalProduk, totalStok, lowStockCount, asetDipinjam, transaksiBulanIni };
    }

    async getStockByWarehouse() {
        const data = await InvStok.findAll({
            attributes: [
                'gudang_id',
                [Sequelize.fn('SUM', Sequelize.col('jumlah')), 'total_stok'],
            ],
            include: [{ model: InvGudang, as: 'gudang', attributes: ['id', 'nama'] }],
            group: ['gudang_id', 'gudang.id'],
            raw: true,
            nest: true,
        });

        return data.map((item: any) => ({
            gudang_id: item.gudang_id,
            gudang_nama: item.gudang?.nama || 'Unknown',
            total_stok: parseInt(item.total_stok, 10),
        }));
    }

    async getCategoryBreakdown() {
        const data = await InvStok.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('jumlah')), 'total_stok'],
            ],
            include: [{
                model: InvProduk,
                as: 'produk',
                attributes: [],
                include: [{
                    model: InvBrand,
                    as: 'brand',
                    attributes: [],
                    include: [{
                        model: InvSubKategori,
                        as: 'sub_kategori',
                        attributes: [],
                        include: [{
                            model: InvKategori,
                            as: 'kategori',
                            attributes: [],
                        }],
                    }],
                }],
            }],
            group: [Sequelize.col('produk.brand.sub_kategori.kategori.type')],
            raw: true,
        });

        return (data as any[]).map((item: any) => ({
            type: item['produk.brand.sub_kategori.kategori.type'] || 'Unknown',
            total_stok: parseInt(item.total_stok, 10),
        }));
    }

    async getRecentTransactions(limit = 10) {
        const transaksi = await InvTransaksi.findAll({
            include: [
                { model: InvGudang, as: 'gudang', attributes: ['id', 'code', 'nama'] },
                { model: InvGudang, as: 'gudang_tujuan', attributes: ['id', 'code', 'nama'] },
                { model: Employee, as: 'karyawan', attributes: ['id', 'nama_lengkap'] },
                { model: User, as: 'creator', attributes: ['id', 'nama'] },
            ],
            order: [['created_at', 'DESC']],
            limit,
        });

        return transaksi;
    }

    async getLowStockItems(threshold = 5) {
        const items = await InvStok.findAll({
            where: { jumlah: { [Op.lt]: threshold } },
            include: [
                { model: InvProduk, as: 'produk', attributes: ['id', 'code', 'nama'] },
                { model: InvGudang, as: 'gudang', attributes: ['id', 'code', 'nama'] },
                { model: InvUom, as: 'uom', attributes: ['id', 'nama'] },
            ],
            order: [['jumlah', 'ASC']],
            limit: 20,
        });

        return items;
    }
}

export default new InventoryDashboardService();
