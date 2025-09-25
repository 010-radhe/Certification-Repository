import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCerts } from '../context/CertContext';
import CertificateForm from '../components/CertificateForm';
import { ToastProvider, useToast } from '../components/Toast';

/**
 * Add/Edit Certificate page
 */
const AddCertificateContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addCertificate, updateCertificate, allCertificates, isLoading } = useCerts();
  const [searchParams] = useSearchParams();
  const addToast = useToast()?.addToast;
  
  const editId = searchParams.get('edit');
  const isEditing = Boolean(editId);
  
  const [initialData, setInitialData] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Load certificate data for editing
  useEffect(() => {
    if (isEditing && editId) {
      const certificate = allCertificates.find(cert => cert.id === editId);
      if (certificate) {
        // Check if user owns this certificate
        if (certificate.author.id !== user?.id) {
          addToast?.({
            type: 'error',
            title: 'Access Denied',
            message: 'You can only edit your own certificates.'
          });
          navigate('/my');
          return;
        }
        setInitialData(certificate);
      } else {
        addToast?.({
          type: 'error',
          title: 'Certificate Not Found',
          message: 'The certificate you are trying to edit does not exist.'
        });
        navigate('/my');
      }
    }
  }, [isEditing, editId, allCertificates, user, navigate, addToast]);

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    
    try {
      if (isEditing) {
        const success = await updateCertificate(editId, formData);
        if (success) {
          addToast?.({
            type: 'success',
            title: 'Certificate Updated',
            message: 'Your certificate has been updated successfully.',
            action: {
              label: 'View Certificate',
              onClick: () => navigate(`/cert/${editId}`)
            }
          });
          navigate('/my');
        } else {
          throw new Error('Failed to update certificate');
        }
      } else {
        const success = await addCertificate(formData);
        if (success) {
          addToast?.({
            type: 'success',
            title: 'Certificate Added',
            message: 'Your certificate has been added successfully and is now visible to your colleagues.',
            action: {
              label: 'View My Certificates',
              onClick: () => navigate('/my')
            }
          });
          navigate('/my');
        } else {
          throw new Error('Failed to add certificate');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      addToast?.({
        type: 'error',
        title: 'Submission Failed',
        message: error.message || 'Failed to save certificate. Please try again.',
        duration: 6000
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/my');
  };

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-neutral-600 mb-6">
            Please sign in to add or edit certificates.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Show loading while fetching certificate data for editing
  if (isEditing && !initialData && !isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading certificate data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Certificates
        </button>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
            <Check className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">
            {isEditing ? 'Edit Certificate' : 'Add New Certificate'}
          </h1>
        </div>
        
        <p className="text-neutral-600">
          {isEditing 
            ? 'Update your certificate information and settings.'
            : 'Share your professional achievements with your colleagues.'
          }
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
            <span>Certificate Details</span>
          </div>
          <div className="flex-1 h-px bg-neutral-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neutral-300 rounded-full"></div>
            <span>Review & Publish</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl border border-neutral-200 p-8"
      >
        <CertificateForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={formLoading}
        />
      </motion.div>

      {/* Tips sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <h3 className="font-semibold text-blue-900 mb-3">💡 Tips for a Great Certificate Entry</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Use a clear, descriptive title that includes the certification name</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Add relevant tags to help colleagues discover your expertise</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Share your experience and tips in the remarks section</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Include links to course materials or additional resources</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Enable contacts if you're happy to help colleagues with similar goals</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

/**
 * Add Certificate page with toast provider
 */
const AddCertificate = () => {
  return (
    <ToastProvider>
      <AddCertificateContent />
    </ToastProvider>
  );
};

export default AddCertificate;

