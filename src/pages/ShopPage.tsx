import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Truck, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { BUSINESS_CONFIG } from '../config/business';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('search');
    if (cat) setSelectedCategory(cat);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#063B25] text-[#FFF9EC] rounded-2xl p-6 sm:p-10 border border-[#0B5836] relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
            <Truck className="w-3.5 h-3.5" />
            <span>{BUSINESS_CONFIG.deliveryNotice}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
            Complete Product Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            Authentic Assam CTC tea granules, whole leaf green tea varieties, traditional South Indian filter coffee blends, and natural health drink powders.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        {/* Category Tabs (Segmented Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#063B25] text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-stone-200">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, spice, or ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 focus:outline-none focus:border-[#063B25]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 whitespace-nowrap">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 pl-2.5 pr-8 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#063B25] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Info & Count */}
      <div className="flex items-center justify-between text-xs text-stone-600 px-1">
        <span>
          Showing <strong className="font-mono text-stone-900">{filteredProducts.length}</strong> of{' '}
          <strong className="font-mono text-stone-900">{PRODUCTS.length}</strong> products
        </span>
        {(selectedCategory !== 'all' || searchQuery) && (
          <button
            onClick={handleClearFilters}
            className="text-[#063B25] hover:underline font-medium flex items-center gap-1"
          >
            <span>Reset filters</span>
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-3">
          <p className="font-serif text-lg font-bold text-stone-800">
            No products matched your criteria
          </p>
          <p className="text-xs text-stone-500">
            Try adjusting your search query or choosing another category filter.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-2 px-4 py-2 bg-[#063B25] text-white text-xs font-semibold rounded-md hover:bg-[#0B5836]"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
