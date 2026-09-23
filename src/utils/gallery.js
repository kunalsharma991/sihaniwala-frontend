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

// Legacy/free-form category values that may already exist in the database,
// mapped onto the current canonical category values.
const categoryValueAliases = {
  education: 'education_support',
  water: 'water_community_support',
  health: 'healthcare_assistance',
  healthcare: 'healthcare_assistance',
};

const normalizeCategoryKey = (value) =>
  String(value).trim().toLowerCase().replace(/\s+/g, '_');

// Lookup keyed by normalized canonical values and human-readable labels so
// display labels, canonical values and 'Other'/'other' variants all resolve
// to the same stable internal value.
const categoryKeyToValue = galleryCategories.reduce((acc, option) => {
  acc[normalizeCategoryKey(option.value)] = option.value;
  acc[normalizeCategoryKey(option.label)] = option.value;
  return acc;
}, {});

export const normalizeGalleryCategory = (category) => {
  if (!category || typeof category !== 'string') return 'other';
  const key = normalizeCategoryKey(category);
  if (categoryKeyToValue[key]) return categoryKeyToValue[key];
  if (categoryValueAliases[key]) return categoryValueAliases[key];
  return 'other';
};

export const getGalleryCategoryLabel = (category) =>
  galleryCategories.find((option) => option.value === normalizeGalleryCategory(category))?.label || 'Other';

export const resolveGalleryImageUrl = (filePath) => {
  if (!filePath || typeof filePath !== 'string') return '';
  if (/^https?:\/\//i.test(filePath)) return filePath;

  const baseUrl = api.defaults.baseURL.replace(/\/$/, '');
  return `${baseUrl}/api/files/download?path=${encodeURIComponent(filePath)}`;
};

export const normalizeGalleryRecords = (records) => {
  if (!Array.isArray(records)) return [];

  return records
    .map((record, index) => {
      const category = normalizeGalleryCategory(record.category);
      return {
        ...record,
        id: record.id ?? `gallery-${index}`,
        src: resolveGalleryImageUrl(record.filePath),
        title: record.title || record.fileName || 'Gallery image',
        category,
        categoryLabel: getGalleryCategoryLabel(category),
        tall: index % 4 === 0,
      };
    })
    .filter((record) => record.src);
};