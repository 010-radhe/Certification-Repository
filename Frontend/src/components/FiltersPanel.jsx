import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Tag, 
  Building2, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useCerts } from '../context/CertContext';

/**
 * Filters panel component for filtering certificates
 */
const FiltersPanel = () => {
  const {
    categories,
    popularTags,
    units,
    selectedCategories,
    setSelectedCategories,
    selectedTags,
    setSelectedTags,
    selectedUnits,
    setSelectedUnits,
    dateRange,
    setDateRange,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    clearFilters,
    totalCount
  } = useCerts();

  const [expandedSections, setExpandedSections] = React.useState({
    categories: true,
    tags: true,
    units: false,
    date: false,
    sort: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleUnitChange = (unit) => {
    if (selectedUnits.includes(unit)) {
      setSelectedUnits(selectedUnits.filter(u => u !== unit));
    } else {
      setSelectedUnits([...selectedUnits, unit]);
    }
  };

  const handleDateRangeChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const hasActiveFilters = 
    selectedCategories.length > 0 || 
    selectedTags.length > 0 || 
    selectedUnits.length > 0 || 
    dateRange.start || 
    dateRange.end;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 sticky top-24 max-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-neutral-600" />
          <h3 className="font-semibold text-neutral-900">Filters</h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="mb-6 p-3 bg-neutral-50 rounded-lg">
        <p className="text-sm text-neutral-600">
          <span className="font-medium text-neutral-900">{totalCount}</span> certificates found
        </p>
      </div>

      <div className="space-y-6">
        {/* Sort */}
        <FilterSection
          title="Sort By"
          icon={<SlidersHorizontal className="w-4 h-4" />}
          isExpanded={expandedSections.sort}
          onToggle={() => toggleSection('sort')}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full input-field text-sm"
              >
                <option value="date">Date</option>
                <option value="likes">Likes</option>
                <option value="views">Views</option>
                <option value="title">Title</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Order
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full input-field text-sm"
              >
                <option value="desc">Newest first</option>
                <option value="asc">Oldest first</option>
              </select>
            </div>
          </div>
        </FilterSection>

        {/* Categories */}
        <FilterSection
          title="Categories"
          icon={<Tag className="w-4 h-4" />}
          isExpanded={expandedSections.categories}
          onToggle={() => toggleSection('categories')}
          badge={selectedCategories.length > 0 ? selectedCategories.length : null}
        >
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => handleCategoryChange(category.value)}
                  className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
                />
                <span className="text-sm text-neutral-700 flex-1">
                  {category.label}
                </span>
                <span className="text-xs text-neutral-500">
                  {category.count}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Tags */}
        <FilterSection
          title="Popular Tags"
          icon={<Tag className="w-4 h-4" />}
          isExpanded={expandedSections.tags}
          onToggle={() => toggleSection('tags')}
          badge={selectedTags.length > 0 ? selectedTags.length : null}
        >
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-100 text-primary-700 border border-primary-300'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Units */}
        <FilterSection
          title="Units"
          icon={<Building2 className="w-4 h-4" />}
          isExpanded={expandedSections.units}
          onToggle={() => toggleSection('units')}
          badge={selectedUnits.length > 0 ? selectedUnits.length : null}
        >
          <div className="space-y-2">
            {units.map(unit => (
              <label key={unit} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedUnits.includes(unit)}
                  onChange={() => handleUnitChange(unit)}
                  className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
                />
                <span className="text-sm text-neutral-700">
                  {unit}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Date Range */}
        <FilterSection
          title="Date Range"
          icon={<Calendar className="w-4 h-4" />}
          isExpanded={expandedSections.date}
          onToggle={() => toggleSection('date')}
          badge={dateRange.start || dateRange.end ? 1 : null}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                From
              </label>
              <input
                type="date"
                value={dateRange.start || ''}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="w-full input-field text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                To
              </label>
              <input
                type="date"
                value={dateRange.end || ''}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="w-full input-field text-sm"
              />
            </div>
            
            {(dateRange.start || dateRange.end) && (
              <button
                onClick={() => setDateRange({ start: null, end: null })}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear date range
              </button>
            )}
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

/**
 * Reusable filter section component
 */
const FilterSection = ({ 
  title, 
  icon, 
  children, 
  isExpanded, 
  onToggle, 
  badge = null 
}) => {
  return (
    <div className="border-b border-neutral-100 pb-4 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left mb-3 hover:text-neutral-600 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <h4 className="font-medium text-neutral-900">{title}</h4>
          {badge && (
            <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-neutral-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        )}
      </button>
      
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        style={{ overflow: 'hidden' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default FiltersPanel;

