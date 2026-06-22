import api from './api';

export const authService = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/api/auth/reset-password', { token, password }),
};

export const donationService = {
  createRazorpayOrder: (data) => api.post('/api/payments/razorpay/order', data),
  verifyRazorpayPayment: (data) => api.post('/api/payments/razorpay/verify', data),
  createPaypalOrder: (data) => api.post('/api/payments/paypal/order', data),
  capturePaypalOrder: (orderId) => api.post(`/api/payments/paypal/capture/${orderId}`),
  getDonations: (params) => api.get('/api/donations', { params }),
  getDonation: (id) => api.get(`/api/donations/${id}`),
};

export const initiativeService = {
  submitHospital: (data) => api.post('/api/initiatives/hospital', data),
  submitMarriage: (data) => api.post('/api/initiatives/marriage-support', data),
  submitEducation: (data) => api.post('/api/initiatives/education-bpl', data),
  submitFinancial: (data) => api.post('/api/initiatives/financial-help', data),
  submitWaterSpray: (data) => api.post('/api/initiatives/water-spray', data),
  submitSchoolAdoption: (data) => api.post('/api/initiatives/school-adoption', data),
};

export const adminService = {
  getDashboard: () => api.get('/api/admin/dashboard'),
  getApplications: (params) => api.get('/api/admin/applications', { params }),
  updateApplicationStatus: (id, status) => api.put(`/api/admin/applications/${id}/status`, { status }),
  getGallery: () => api.get('/api/admin/gallery'),
  deleteGalleryItem: (id) => api.delete(`/api/admin/gallery/${id}`),
  uploadGallery: (formData) => api.post('/api/admin/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getVolunteers: () => api.get('/api/admin/volunteers'),
  getContacts: () => api.get('/api/admin/contacts'),
  getUsers: () => api.get('/api/admin/users'),
  getDonations: () => api.get('/api/admin/donations'),
};

export const contactService = {
  submit: (data) => api.post('/api/contact', data),
};

export const volunteerService = {
  submit: (data) => api.post('/api/volunteers', data),
};

export const uploadService = {
  uploadFile: (formData) => api.post('/api/files/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  downloadFile: (id) => api.get(`/api/files/download/${id}`, { responseType: 'blob' }),
};
