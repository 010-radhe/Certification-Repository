import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  X, 
  Plus, 
  FileText, 
  Image as ImageIcon,
  ExternalLink,
  Calendar,
  Building,
  Tag,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';
import { categories } from '../data/mockCerts';
import { useAuth } from '../context/AuthContext';
import { useMockFileUpload } from '../hooks/useMockApi';

/**
 * Certificate form component for adding/editing certificates
 */
const CertificateForm = ({ 
  initialData = null, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  const { user } = useAuth();
  const { uploadFile, isUploading, uploadProgress, resetUpload } = useMockFileUpload();
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || '',
    subcategory: initialData?.subcategory || '',
    issuer: initialData?.issuer || '',
    date: initialData?.date || '',
    file: null,
    fileUrl: initialData?.fileUrl || '',
    links: initialData?.links || [''],
    remarks: initialData?.remarks || '',
    tags: initialData?.tags || [],
    visibility: initialData?.visibility || 'public',
    contactsEnabled: initialData?.contactsEnabled !== false
  });

  const [errors, setErrors] = useState({});
  const [currentTag, setCurrentTag] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  // Get subcategories based on selected category
  const getSubcategories = () => {
    const subcategoryMap = {
      'Development': ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'Game Development'],
      'Cloud': ['Architecture', 'Security', 'DevOps', 'Data', 'AI/ML'],
      'Security': ['General', 'Network Security', 'Application Security', 'Compliance'],
      'Data Science': ['Analytics', 'Machine Learning', 'Statistics', 'Visualization'],
      'DevOps': ['CI/CD', 'Infrastructure', 'Monitoring', 'Container Orchestration'],
      'Business': ['Product', 'Marketing', 'Sales', 'Strategy'],
      'Design': ['User Experience', 'User Interface', 'Visual Design', 'Research'],
      'Management': ['Project Management', 'Team Leadership', 'Agile', 'Product Management']
    };
    return subcategoryMap[formData.category] || [];
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.issuer.trim()) {
      newErrors.issuer = 'Issuer is required';
    }

    if (!formData.date) {
      newErrors.date = 'Completion date is required';
    }

    if (!formData.file && !formData.fileUrl) {
      newErrors.file = 'Certificate file is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    try {
      const fileUrl = await uploadFile(file);
      setFormData(prev => ({
        ...prev,
        file,
        fileUrl
      }));

      // Create file preview
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setFilePreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim().toLowerCase()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, '']
    }));
  };

  const handleUpdateLink = (index, value) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map((link, i) => i === index ? value : link)
    }));
  };

  const handleRemoveLink = (index) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      links: formData.links.filter(link => link.trim()), // Remove empty links
      author: user
    };

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Certificate Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="e.g., AWS Solutions Architect Associate"
          className={`input-field ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-300' : ''}`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Category and Subcategory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => {
              handleInputChange('category', e.target.value);
              handleInputChange('subcategory', ''); // Reset subcategory
            }}
            className={`input-field ${errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-300' : ''}`}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Subcategory
          </label>
          <select
            value={formData.subcategory}
            onChange={(e) => handleInputChange('subcategory', e.target.value)}
            className="input-field"
            disabled={!formData.category}
          >
            <option value="">Select a subcategory</option>
            {getSubcategories().map(subcat => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Issuer and Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Issuer *
          </label>
          <input
            type="text"
            value={formData.issuer}
            onChange={(e) => handleInputChange('issuer', e.target.value)}
            placeholder="e.g., Amazon Web Services"
            className={`input-field ${errors.issuer ? 'border-red-300 focus:border-red-500 focus:ring-red-300' : ''}`}
          />
          {errors.issuer && (
            <p className="mt-1 text-sm text-red-600">{errors.issuer}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Completion Date *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className={`input-field ${errors.date ? 'border-red-300 focus:border-red-500 focus:ring-red-300' : ''}`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Certificate File *
        </label>
        
        {formData.fileUrl ? (
          <div className="border border-neutral-300 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {filePreview ? (
                  <img 
                    src={filePreview} 
                    alt="Certificate preview" 
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-neutral-100 rounded flex items-center justify-center">
                    <FileText className="w-6 h-6 text-neutral-400" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-neutral-900">
                    {formData.file?.name || 'Certificate file'}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {formData.file?.size ? `${Math.round(formData.file.size / 1024)} KB` : 'Uploaded'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, file: null, fileUrl: '' }));
                  setFilePreview(null);
                  resetUpload();
                }}
                className="p-1 text-neutral-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {isUploading && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm text-neutral-600 mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary-400 bg-primary-50' 
                : errors.file
                  ? 'border-red-300 bg-red-50'
                  : 'border-neutral-300 hover:border-neutral-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 mb-2">
              Drag and drop your certificate file here, or{' '}
              <label className="text-primary-600 hover:text-primary-700 cursor-pointer font-medium">
                browse
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                  className="sr-only"
                />
              </label>
            </p>
            <p className="text-sm text-neutral-500">
              PDF, JPG, or PNG up to 10MB
            </p>
          </div>
        )}
        
        {errors.file && (
          <p className="mt-1 text-sm text-red-600">{errors.file}</p>
        )}
      </div>

      {/* External Links */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          External Links
        </label>
        <div className="space-y-2">
          {formData.links.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-1 relative">
                <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="url"
                  value={link}
                  onChange={(e) => handleUpdateLink(index, e.target.value)}
                  placeholder="https://example.com"
                  className="input-field pl-10"
                />
              </div>
              {formData.links.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  className="p-2 text-neutral-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLink}
            className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
          >
            <Plus className="w-4 h-4" />
            Add another link
          </button>
        </div>
      </div>

      {/* Remarks */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Remarks & Notes
        </label>
        <textarea
          value={formData.remarks}
          onChange={(e) => handleInputChange('remarks', e.target.value)}
          placeholder="Share your experience, tips, or additional resources..."
          rows={4}
          className="input-field resize-none"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags.map(tag => (
            <span
              key={tag}
              className="badge badge-primary flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-primary-600 hover:text-primary-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Add a tag..."
              className="input-field pl-10"
            />
          </div>
          <button
            type="button"
            onClick={handleAddTag}
            disabled={!currentTag.trim()}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="border-t border-neutral-200 pt-6">
        <h3 className="font-medium text-neutral-900 mb-4">Settings</h3>
        
        <div className="space-y-4">
          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Visibility
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={formData.visibility === 'public'}
                  onChange={(e) => handleInputChange('visibility', e.target.value)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm">Public</span>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="internal"
                  checked={formData.visibility === 'internal'}
                  onChange={(e) => handleInputChange('visibility', e.target.value)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <div className="flex items-center gap-1">
                  <EyeOff className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm">Internal only</span>
                </div>
              </label>
            </div>
          </div>

          {/* Contact permission */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.contactsEnabled}
                onChange={(e) => handleInputChange('contactsEnabled', e.target.checked)}
                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">
                Allow colleagues to contact me about this certification
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading || isUploading}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          {initialData ? 'Update Certificate' : 'Add Certificate'}
        </button>
      </div>
    </form>
  );
};

export default CertificateForm;

