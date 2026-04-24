import client from './client';

export interface InventoryStats {
    totalProduk: number;
    totalStok: number;
    lowStockCount: number;
    asetDipinjam: number;
    transaksiBulanIni: number;
}

export interface StockByWarehouse {
    gudang_id: number;
    gudang_nama: string;
    total_stok: number;
}

export interface CategoryBreakdown {
    type: string;
    total_stok: number;
}

const getStats = async (): Promise<{ status: string; data: InventoryStats }> => {
    const response = await client.get('/inventory/dashboard/stats');
    return response.data;
};

const getStockByWarehouse = async (): Promise<{ status: string; data: StockByWarehouse[] }> => {
    const response = await client.get('/inventory/dashboard/stock-by-warehouse');
    return response.data;
};

const getCategoryBreakdown = async (): Promise<{ status: string; data: CategoryBreakdown[] }> => {
    const response = await client.get('/inventory/dashboard/category-breakdown');
    return response.data;
};

const getRecentTransactions = async (limit = 10) => {
    const response = await client.get('/inventory/dashboard/recent-transactions', { params: { limit } });
    return response.data;
};

const getLowStockItems = async (threshold = 5) => {
    const response = await client.get('/inventory/dashboard/low-stock', { params: { threshold } });
    return response.data;
};

const exportStokExcel = async (filters?: any): Promise<Blob> => {
    const response = await client.get('/inventory/export/stok/excel', { params: filters, responseType: 'blob' });
    return response.data;
};

const exportStokPDF = async (filters?: any): Promise<Blob> => {
    const response = await client.get('/inventory/export/stok/pdf', { params: filters, responseType: 'blob' });
    return response.data;
};

const inventoryDashboardService = {
    getStats,
    getStockByWarehouse,
    getCategoryBreakdown,
    getRecentTransactions,
    getLowStockItems,
    exportStokExcel,
    exportStokPDF,
};

export default inventoryDashboardService;
