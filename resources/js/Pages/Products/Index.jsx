import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ProductsTable from '@/Components/ProductsTable';

export default function ProductsIndex() {
  return (
    <AppLayout title="Products">
      <div className="mb-4 rounded border bg-white p-4 text-sm text-slate-600">
        Product CRUD and vector search UX entry points are scaffolded.
      </div>
      <ProductsTable products={[]} />
    </AppLayout>
  );
}
