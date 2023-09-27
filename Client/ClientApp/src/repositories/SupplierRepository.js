import React, { useState, useEffect } from 'react'
import { getAllSuppliers, create, update, remove } from '../apis/SupplierApi'
import SupplierList from '../components/suppliers/SupplierList';
import SupplierForm from '../components/suppliers/SupplierForm';

export default function SupplierRepositories() {
    const [suppliers, setSuppliers] = useState([]);
    const [editingSupplier, setEditingSupplier] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getAllSuppliers();
            setSuppliers(data);
        }
        catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const handleCreate = async (newSupplier) => {
        try {
            await create(newSupplier);
            fetchData();
        }
        catch (error) {
            console.error("Error create supplier", error);
        }
    };

    const handleEdit = (supplierGuid) => {
        setEditingSupplier(supplierGuid);
    };

    const handleInputChange = (supplierGuid, field, value) => {
        const updatedSuplliers = suppliers.map((supplier) => (supplier.guid === supplierGuid ? { ...supplier, [field]: value } : supplier))
        setSuppliers(updatedSuplliers);
    };

    const handleUpdate = async (updatedSupplier) => {
        try {
            await update(updatedSupplier);
            setEditingSupplier(null);
            fetchData();
        }
        catch (error) {
            console.error('Error editing supplier:', error);
        }
    }

    const handleDelete = async (supplierGuid) => {
        try {
            await remove(supplierGuid);
            fetchData();
        }
        catch (error) {
            console.error('Error deleting supplier:', error);
        }
    }

    return (
        <div className="container">
            <h1>Suppliers</h1>
            <SupplierList
                suppliers={suppliers}
                editingSupplier={editingSupplier}
                handleEdit={handleEdit}
                handleInputChange={handleInputChange}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
            />
            <SupplierForm handleCreate={handleCreate} />
        </div>
    );
}