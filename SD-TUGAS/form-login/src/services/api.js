/**
 * API SERVICE - Frontend React
 * Lokasi: src/services/api.js
 * Digunakan untuk connect ke backend
 */

const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Helper function untuk melakukan fetch dengan error handling
 */
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Jika ada token, tambahkan ke Authorization header
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    // Jika response tidak ok, throw error
    if (!response.ok) {
      throw new Error(data.error || data.message || 'API Error');
    }

    return data; // Langsung return data (atau data.data tergantung struktur backend)
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

/**
 * AUTH ENDPOINTS
 */
export const authAPI = {
  /**
   * Register user baru
   * Menerima items: email, password, name
   * Backend perlu: namaLengkap, email, password
   */
  register: (email, password, namaLengkap, nohandphone, role = 'murid') =>
    fetchAPI('/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, namaLengkap, nohandphone, role, username: email.split('@')[0] })
    }),

  /**
   * Login dan dapatkan token
   */
  login: (username, password) =>
    fetchAPI('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }),

  /**
   * Dapatkan profile user (protected)
   */
  getProfile: () =>
    fetchAPI('/auth/profile'),

  /**
   * Update password user
   */
  updatePassword: (oldPassword, newPassword) =>
    fetchAPI('/auth/update-password', {
      method: 'PUT',
      body: JSON.stringify({ oldPassword, newPassword })
    })
};

/**
 * ABSENSI ENDPOINTS
 */
export const absensiAPI = {
  /**
   * Submit absensi baru
   */
  submit: (date, status, keterangan = '') =>
    fetchAPI('/absensi/submit', {
      method: 'POST',
      body: JSON.stringify({ date, status, keterangan })
    }),

  /**
   * Dapatkan absensi user
   */
  getMyAbsensi: () =>
    fetchAPI('/absensi/my-absensi'),

  /**
   * Dapatkan history absensi (10 terbaru dari STACK)
   */
  getHistory: () =>
    fetchAPI('/absensi/history'),

  /**
   * Dapatkan statistik absensi user
   */
  getStatistik: () =>
    fetchAPI('/absensi/statistik'),

  /**
   * Dapatkan absensi berdasarkan tanggal
   */
  getByDate: (date) =>
    fetchAPI(`/absensi/by-date?date=${date}`),

  /**
   * Dapatkan rekap absensi bulan/tahun
   */
  getByMonthYear: (month, year) =>
    fetchAPI(`/absensi/by-month-year?month=${month}&year=${year}`),

  /**
   * Dapatkan semua absensi (admin only)
   */
  getAll: () =>
    fetchAPI('/absensi/all'),

  /**
   * Update absensi (admin only)
   */
  update: (id, status, keterangan) =>
    fetchAPI(`/absensi/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status, keterangan })
    }),

  /**
   * Hapus absensi (admin only)
   */
  delete: (id) =>
    fetchAPI(`/absensi/${id}`, { method: 'DELETE' })
};

/**
 * USER/SISWA ENDPOINTS
 */
export const userAPI = {
  /**
   * Dapatkan semua siswa dari LINKED LIST (admin only)
   */
  getAllSiswa: () =>
    fetchAPI('/user/all'),

  /**
   * Dapatkan data siswa berdasarkan ID
   */
  getSiswaById: (id) =>
    fetchAPI(`/user/${id}`),

  /**
   * Cari siswa berdasarkan keyword
   */
  searchSiswa: (keyword) =>
    fetchAPI(`/user/search?keyword=${keyword}`),

  /**
   * Tambah siswa baru (admin only)
   */
  addSiswa: (email, password, name) =>
    fetchAPI('/user/add', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    }),

  /**
   * Update data siswa
   */
  updateSiswa: (id, name, email) =>
    fetchAPI(`/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, email })
    }),

  /**
   * Hapus siswa (admin only)
   */
  deleteSiswa: (id) =>
    fetchAPI(`/user/${id}`, { method: 'DELETE' })
};

export default fetchAPI;
