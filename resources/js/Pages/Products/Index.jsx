import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductsTable from '@/Components/ProductsTable';
import AppLayout from '@/Layouts/AppLayout';

export default function ProductsIndex() {
  const products = useSelector((state) => state.entities.products);
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())), [products, query]);

  return (
    <AppLayout title="Products">
      <div className="mb-4 flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Vector search products" />
        <button className="rounded border px-3 py-2">Add Product</button>
      </div>
      <ProductsTable products={filtered} />
    </AppLayout>
  );
}
