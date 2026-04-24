import client from './client';

const getProductQR = async (produkId: number) => {
    const response = await client.get(`/inventory/label/produk/${produkId}/qr`);
    return response.data;
};

const getSerialNumberQR = async (snId: number) => {
    const response = await client.get(`/inventory/label/serial-number/${snId}/qr`);
    return response.data;
};

const printLabels = async (items: Array<{ type: 'produk' | 'serial_number'; id: number }>): Promise<Blob> => {
    const response = await client.post('/inventory/label/print', { items }, { responseType: 'blob' });
    return response.data;
};

const lookupQR = async (code: string) => {
    const response = await client.get('/inventory/label/lookup', { params: { code } });
    return response.data;
};

const inventoryLabelService = { getProductQR, getSerialNumberQR, printLabels, lookupQR };
export default inventoryLabelService;
