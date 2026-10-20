import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Truck } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { BUSINESS_CONFIG } from '../config/business';

export const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const currentCategory = CATEGORIES.find((c) => c.slug === categorySlug);

  if (!currentCategory || categorySlug === 'all') {
    return <Navigate to="/shop" replace />;
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === categorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <Link to="/shop" className="hover:text-[#063B25] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Products</span>
        </Link>
        <span>/</span>
        <span className="text-stone-900 font-medium">{currentCategory.name}</span>
      </div>

      {/* Category Hero */}
      <div className="bg-[#063B25] text-[#FFF9EC] rounded-2xl p-6 sm:p-10 border border-[#0B5836] relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
            <Truck className="w-3.5 h-3.5" />
            <span>{BUSINESS_CONFIG.deliveryNotice}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
            {currentCategory.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            {currentCategory.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        <div className="text-xs text-stone-600">
          Showing <strong className="font-mono text-stone-900">{categoryProducts.length}</strong> items in{' '}
          {currentCategory.name}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
