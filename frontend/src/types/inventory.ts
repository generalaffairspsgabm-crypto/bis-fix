import { MasterData } from './hr';

export interface InvKategori extends MasterData {
    type: 'Fixed Asset' | 'Consumable';
}

export interface InvSubKategori extends MasterData {
    kategori_id: number;
    kategori?: InvKategori;
}

export interface InvBrand extends MasterData {
    sub_kategori_id: number;
    sub_kategori?: InvSubKategori;
}

export interface InvUom extends MasterData {}

export interface InvProduk extends MasterData {
    brand_id: number;
    has_serial_number: boolean;
    brand?: InvBrand;
}

export interface InvGudang extends MasterData {
    penanggung_jawab_id?: number | null;
    department_id?: number | null;
    lokasi?: string;
    penanggung_jawab?: { id: number; nama_lengkap: string };
    department?: { id: number; nama: string };
}
