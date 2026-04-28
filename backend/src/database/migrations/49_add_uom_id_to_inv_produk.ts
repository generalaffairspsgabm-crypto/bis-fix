import { DataTypes } from 'sequelize';
import type { MigrationFn } from 'umzug';

export const up: MigrationFn<any> = async ({ context: sequelize }) => {
    const qi = sequelize.getQueryInterface();
    await qi.addColumn('inv_produk', 'uom_id', {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'inv_uom', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    });
};

export const down: MigrationFn<any> = async ({ context: sequelize }) => {
    const qi = sequelize.getQueryInterface();
    await qi.removeColumn('inv_produk', 'uom_id');
};
