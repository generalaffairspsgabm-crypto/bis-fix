import InvKategori from './Kategori';
import InvSubKategori from './SubKategori';
import InvBrand from './Brand';
import InvProduk from './Produk';
import InvGudang from './Gudang';
import Employee from '../../hr/models/Employee';
import Department from '../../hr/models/Department';

// Kategori -> SubKategori
InvKategori.hasMany(InvSubKategori, { foreignKey: 'kategori_id', as: 'sub_kategori' });
InvSubKategori.belongsTo(InvKategori, { foreignKey: 'kategori_id', as: 'kategori' });

// SubKategori -> Brand
InvSubKategori.hasMany(InvBrand, { foreignKey: 'sub_kategori_id', as: 'brands' });
InvBrand.belongsTo(InvSubKategori, { foreignKey: 'sub_kategori_id', as: 'sub_kategori' });

// Brand -> Produk
InvBrand.hasMany(InvProduk, { foreignKey: 'brand_id', as: 'produk' });
InvProduk.belongsTo(InvBrand, { foreignKey: 'brand_id', as: 'brand' });

// Gudang -> Employee (penanggung jawab)
InvGudang.belongsTo(Employee, { foreignKey: 'penanggung_jawab_id', as: 'penanggung_jawab' });
Employee.hasMany(InvGudang, { foreignKey: 'penanggung_jawab_id', as: 'gudang_tanggung_jawab' });

// Gudang -> Department
InvGudang.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Department.hasMany(InvGudang, { foreignKey: 'department_id', as: 'gudang' });
