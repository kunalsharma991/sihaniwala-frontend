import api from './api';

export const authService = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/api/auth/reset-password', { token, password }),
  changePassword: (data) => api.put('/api/auth/change-password', data),
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
  submitHospital: (data) => api.post('/api/initiatives/hospital', { formData: JSON.stringify(data) }),
  submitMarriage: (data) => api.post('/api/initiatives/marriage-support', { formData: JSON.stringify(data) }),
  submitEducation: (data) => api.post('/api/initiatives/education-bpl', { formData: JSON.stringify(data) }),
  submitFinancial: (data) => api.post('/api/initiatives/financial-help', { formData: JSON.stringify(data) }),
  submitWaterSpray: (data) => api.post('/api/initiatives/water-spray', { formData: JSON.stringify(data) }),
  submitSchoolAdoption: (data) => api.post('/api/initiatives/school-adoption', { formData: JSON.stringify(data) }),
};

export const galleryService = {
  getGallery: () => api.get('/api/gallery'),
};

export const adminService = {
  getDashboard: () => api.get('/api/admin/dashboard'),
  getApplications: (params) => api.get('/api/admin/applications', params ? { params } : {}),
  updateApplicationStatus: (id, status) => api.put(`/api/admin/applications/${id}/status`, { status }),
  getGallery: () => api.get('/api/admin/gallery'),
  deleteGalleryItem: (id) => api.delete(`/api/admin/gallery/${id}`),
  updateGallery: (id, formData) => api.put(`/api/admin/gallery/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  uploadGallery: (formData) => api.post('/api/admin/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getVolunteers: () => api.get('/api/admin/volunteers'),
  deleteVolunteer: (id) => api.delete(`/api/admin/volunteers/${id}`),
  getContacts: () => api.get('/api/admin/contacts'),
  deleteContact: (id) => api.delete(`/api/admin/contacts/${id}`),
  getUsers: () => api.get('/api/admin/users'),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
  getDonations: () => api.get('/api/admin/donations'),
  deleteDonation: (id) => api.delete(`/api/admin/donations/${id}`),
  getAdminProjects: () => api.get('/api/admin/projects'),
  createAdminProject: (data) => api.post('/api/admin/projects', data),
  updateAdminProject: (id, data) => api.put(`/api/admin/projects/${id}`, data),
  deleteAdminProject: (id) => api.delete(`/api/admin/projects/${id}`),
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
