import api from '../services/api';

export const galleryCategories = [
  { value: 'healthcare_assistance', label: 'Healthcare Assistance' },
  { value: 'blood_donation_camp', label: 'Blood Donation Camp' },
  { value: 'food_distribution', label: 'Food Distribution' },
  { value: 'education_support', label: 'Education & Support' },
  { value: 'marriage_support', label: 'Marriage Support' },
  { value: 'water_community_support', label: 'Water & Community Support' },
  { value: 'community_outreach', label: 'Community Outreach' },
  { value: 'other', label: 'Other' },
];

export const getGalleryCategoryLabel = (category) =>
  galleryCategories.find((option) => option.value === category)?.label || category || 'Other';

export const resolveGalleryImageUrl = (filePath) => {
  if (!filePath || typeof filePath !== 'string') return '';
  if (/^https?:\/\//i.test(filePath)) return filePath;

  const baseUrl = api.defaults.baseURL.replace(/\/$/, '');
  return `${baseUrl}/api/files/download?path=${encodeURIComponent(filePath)}`;
};

export const normalizeGalleryRecords = (records) => {
  if (!Array.isArray(records)) return [];

  return records
    .map((record, index) => ({
      ...record,
      id: record.id ?? `gallery-${index}`,
      src: resolveGalleryImageUrl(record.filePath),
      title: record.title || record.fileName || 'Gallery image',
      category: record.category || 'Other',
      categoryLabel: getGalleryCategoryLabel(record.category),
      tall: index % 4 === 0,
    }))
    .filter((record) => record.src);
};