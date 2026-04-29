import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useOccupantList, useCreateOccupant, useCheckoutOccupant } from '../../hooks/useFacilityOccupant';
import { useFacRoomList } from '../../hooks/useFacilityMasterData';
import { useEmployeeList } from '../../hooks/useEmployee';
import MasterDataTable, { Column } from '../../components/hr/MasterDataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Button from '../../components/common/Button';
import { FacOccupant, OccupantPayload } from '../../types/facility';

interface OccFormData { room_id: string; employee_id: string; tanggal_masuk: string; keterangan: string; }

const cls = 'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white';
const lbl = 'text-sm font-medium text-gray-700 dark:text-gray-300';

const OccupantForm = ({ onSubmit, onCancel, isLoading }: {
    onSubmit: (d: OccupantPayload) => void; onCancel: () => void; isLoading?: boolean;
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<OccFormData>({
        defaultValues: { room_id: '', employee_id: '', tanggal_masuk: new Date().toISOString().split('T')[0], keterangan: '' },
    });
    const { data: roomData } = useFacRoomList({ limit: 100 });
    const { data: empData } = useEmployeeList();
    const rooms = (roomData?.data || []) as any[];
    const employees = (empData?.data || []) as any[];

    const submit = (d: OccFormData) => onSubmit({
        room_id: Number(d.room_id), employee_id: Number(d.employee_id),
        tanggal_masuk: d.tanggal_masuk, keterangan: d.keterangan || null,
    });

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-5">
            <div className="flex flex-col gap-1.5">
                <label className={lbl}>Ruangan <span className="text-red-500">*</span></label>
                <select {...register('room_id', { required: 'Wajib dipilih' })} className={`${cls} ${errors.room_id ? 'border-red-500' : ''}`}>
                    <option value="">Pilih Ruangan</option>
                    {rooms.map((r: any) => <option key={r.id} value={r.id}>{r.nama}{r.building ? ` (${r.building.nama})` : ''}</option>)}
                </select>
            </div>
            <div className="flex flex-col gap-1.5">
                <label className={lbl}>Karyawan <span className="text-red-500">*</span></label>
                <select {...register('employee_id', { required: 'Wajib dipilih' })} className={`${cls} ${errors.employee_id ? 'border-red-500' : ''}`}>
                    <option value="">Pilih Karyawan</option>
                    {employees.map((e: any) => <option key={e.id} value={e.id}>{e.nama_lengkap}</option>)}
                </select>
            </div>
            <div className="flex flex-col gap-1.5">
                <label className={lbl}>Tanggal Masuk <span className="text-red-500">*</span></label>
                <input type="date" {...register('tanggal_masuk', { required: 'Wajib diisi' })} className={`${cls} ${errors.tanggal_masuk ? 'border-red-500' : ''}`} />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className={lbl}>Keterangan</label>
                <textarea {...register('keterangan')} className={cls} rows={2} />
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-6">
                <Button type="button" variant="secondary" className="flex-1" onClick={onCancel} disabled={isLoading}>Batal</Button>
                <Button type="submit" variant="primary" className="flex-1" isLoading={isLoading}>Simpan</Button>
            </div>
        </form>
    );
};

const OccupantPage = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Aktif');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<FacOccupant | null>(null);

    const { data, isLoading } = useOccupantList({ page, limit: 10, search, status: statusFilter as any });
    const createMutation = useCreateOccupant();
    const checkoutMutation = useCheckoutOccupant();

    const columns: Column<FacOccupant>[] = [
        { header: 'No', accessor: (_, i) => (page - 1) * 10 + i + 1, className: 'w-16' },
        { header: 'Karyawan', accessor: (item) => item.employee?.nama_lengkap || '-' },
        { header: 'NIK', accessor: (item) => item.employee?.nomor_induk_karyawan || '-' },
        { header: 'Ruangan', accessor: (item) => item.room?.nama || '-' },
        { header: 'Gedung', accessor: (item) => item.room?.building?.nama || '-' },
        { header: 'Tgl Masuk', accessor: (item) => item.tanggal_masuk ? new Date(item.tanggal_masuk).toLocaleDateString('id-ID') : '-' },
        { header: 'Tgl Keluar', accessor: (item) => item.tanggal_keluar ? new Date(item.tanggal_keluar).toLocaleDateString('id-ID') : '-' },
        { header: 'Status', accessor: (item) => (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {item.status}
            </span>
        )},
    ];

    const handleAdd = () => { setSelectedItem(null); setIsModalOpen(true); };
    const handleCheckout = (item: FacOccupant) => { setSelectedItem(item); setIsCheckoutOpen(true); };

    const onFormSubmit = (formData: OccupantPayload) => {
        createMutation.mutate(formData, {
            onSuccess: () => { setIsModalOpen(false); toast.success('Penghuni berhasil ditambahkan'); },
            onError: (err) => { toast.error(err.response?.data?.message || 'Gagal menambahkan penghuni'); },
        });
    };

    const onConfirmCheckout = () => {
        if (!selectedItem) return;
        checkoutMutation.mutate({ id: selectedItem.id }, {
            onSuccess: () => { setIsCheckoutOpen(false); setSelectedItem(null); toast.success('Penghuni berhasil di-checkout'); },
            onError: (err) => { toast.error(err.response?.data?.message || 'Gagal checkout penghuni'); },
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Penghuni</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola data penghuni ruangan</p>
                </div>
                <Button variant="primary" onClick={handleAdd}>
                    <span className="material-symbols-outlined text-sm mr-1">add</span> Tambah Penghuni
                </Button>
            </div>

            <div className="flex gap-3 items-center">
                <input type="text" placeholder="Cari penghuni..." value={search}
                    className="flex-1 px-3 py-2 border rounded-lg text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
                <select className="px-3 py-2 border rounded-lg text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
                    <option value="Aktif">Aktif</option>
                    <option value="Selesai">Selesai</option>
                </select>
            </div>

            <MasterDataTable columns={columns} data={data?.data || []} isLoading={isLoading}
                pagination={{ page: data?.pagination?.page || 1, totalPages: data?.pagination?.totalPages || 1, totalItems: data?.pagination?.total || 0, onPageChange: setPage }}
                onEdit={(item) => { if (item.status === 'Aktif') handleCheckout(item); }}
                onDelete={() => {}}
                transparent={true} />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Penghuni" size="lg">
                <OccupantForm onSubmit={onFormSubmit} isLoading={createMutation.isPending} onCancel={() => setIsModalOpen(false)} />
            </Modal>

            <ConfirmDialog isOpen={isCheckoutOpen} title="Checkout Penghuni"
                message={`Apakah Anda yakin ingin checkout ${selectedItem?.employee?.nama_lengkap || ''} dari ruangan ${selectedItem?.room?.nama || ''}?`}
                onConfirm={onConfirmCheckout} onCancel={() => setIsCheckoutOpen(false)} isLoading={checkoutMutation.isPending} />
        </div>
    );
};

export default OccupantPage;
