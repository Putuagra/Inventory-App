import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';

export default function ProductForm({ handleCreate, suppliers, categories }) {
    const [newProduct, setNewProduct] = useState({ name: '', stock: '', price: '', description: '', categoryGuid: '', supplierGuid: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSupplierChange = (e) => {
        const selectedSupplierGuid = e.target.value;
        setNewProduct({
            ...newProduct,
            supplierGuid: selectedSupplierGuid,
            categoryGuid: '',
        });
    };

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
            <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleCreate(newProduct);
                        setNewProduct({ name: '', stock: '', price: '', description: '', categoryGuid: '', supplierGuid: '' });
                        }}
                    className="row g-3 needs-validation"
            >
                    <Input
                        name="name"
                        type="text"
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={handleChange}
                    />
                    <Select
                        name="supplierGuid"
                        label="Supplier"
                        value={newProduct.supplierGuid}
                        onChange={handleSupplierChange}
                        options={suppliers}
                    />
                    <Select
                        name="categoryGuid"
                        label="Category"
                        value={newProduct.categoryGuid}
                        onChange={handleChange}
                        options={categories.filter((category) => category.supplierGuid === newProduct.supplierGuid)}
                    />
                    <Input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        value={newProduct.stock}
                        onChange={handleChange}
                    />
                    <Input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={handleChange}
                    />
                    <Input
                        name="description"
                        type="text"
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={handleChange}
                    />
                    <Button
                        name="Add Product"
                    />
                </form>
            </div>
        </div>
    )
}