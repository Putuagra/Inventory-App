import React, { useState, useEffect } from 'react'
import { getAll, create, update, remove } from '../apis/CategoryApi'
import { getAllSuppliers } from '../apis/SupplierApi'
import CategoryList from '../components/categories/CategoryList';
import CategoryForm from '../components/categories/CategoryForm';

export default function CategoryRepository() {
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchData();
        fetchDataSuppliers();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getAll();
            setCategories(data);
        }
        catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const fetchDataSuppliers = async () => {
        try {
            const data = await getAllSuppliers();
            setSuppliers(data);
        }
        catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const handleCreate = async (newCategory) => {
        try {
            await create(newCategory);
            fetchData();
        }
        catch (error) {
            console.error("Error create category", error);
        }
    };

    const handleEdit = (categoryGuid) => {
        setEditingCategory(categoryGuid);
    };

    const handleInputChange = (categoryGuid, field, value) => {
        const updatedCategories = categories.map((category) => (category.guid === categoryGuid ? { ...category, [field]: value } : category))
        setCategories(updatedCategories);
    };

    const handleUpdate = async (updatedCategory) => {
        try {
            await update(updatedCategory);
            setEditingCategory(null);
            fetchData();
        }
        catch (error) {
            console.error('Error editing category:', error);
        }
    }

    const handleDelete = async (categoryGuid) => {
        try {
            await remove(categoryGuid);
            fetchData();
        }
        catch (error) {
            console.error('Error deleting category:', error);
        }
    }

    return (
        <div className="container">
            <h1>Categories</h1>
            <CategoryList
                categories={categories}
                suppliers={suppliers}
                editingCategory={editingCategory}
                handleEdit={handleEdit}
                handleInputChange={handleInputChange}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
            />
            <CategoryForm
                handleCreate={handleCreate}
                suppliers={suppliers}
            />
        </div>
    );
}