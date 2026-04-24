import { useQuery } from '@tanstack/react-query';
import inventoryDashboardService from '../services/api/inventory-dashboard.service';

export const useInventoryStats = () => {
    return useQuery({
        queryKey: ['inventoryDashboard', 'stats'],
        queryFn: () => inventoryDashboardService.getStats(),
        refetchInterval: 60000,
    });
};

export const useStockByWarehouse = () => {
    return useQuery({
        queryKey: ['inventoryDashboard', 'stockByWarehouse'],
        queryFn: () => inventoryDashboardService.getStockByWarehouse(),
    });
};

export const useCategoryBreakdown = () => {
    return useQuery({
        queryKey: ['inventoryDashboard', 'categoryBreakdown'],
        queryFn: () => inventoryDashboardService.getCategoryBreakdown(),
    });
};

export const useRecentInventoryTransactions = (limit = 10) => {
    return useQuery({
        queryKey: ['inventoryDashboard', 'recentTransactions', limit],
        queryFn: () => inventoryDashboardService.getRecentTransactions(limit),
    });
};

export const useLowStockItems = (threshold = 5) => {
    return useQuery({
        queryKey: ['inventoryDashboard', 'lowStock', threshold],
        queryFn: () => inventoryDashboardService.getLowStockItems(threshold),
    });
};
