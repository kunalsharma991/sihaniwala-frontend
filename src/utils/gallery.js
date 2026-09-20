import api from '../services/api';

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
      tall: index % 4 === 0,
    }))
    .filter((record) => record.src);
};