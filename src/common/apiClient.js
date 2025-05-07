import axios from 'axios';

const token = localStorage.getItem('token');

export const postApi = async (url, data, headers = {}) => {
  try {
    const isFormData = data instanceof FormData;
    const defaultHeaders = {
      ...headers,
      // Authorization: `Bearer ${token}`,
      ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' })
    };
    const response = await axios.post(url, data, { headers: defaultHeaders });
    return response?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'error fetching';
    console.error(errorMessage);
    throw error;
  }
};

export const getApi = async (url, params = {}, headers = {}) => {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
      // Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, {
      headers: defaultHeaders,
      params: params
    });
    return response?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'error fetching';
    console.error(errorMessage);
    throw error;
  }
};

export const updateApi = async (url, data, headers = {}) => {
  try {
    const isFormData = data instanceof FormData;
    const defaultHeaders = {
      ...headers,
      // Authorization: `Bearer ${token}`,
      ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' })
    };
    const response = await axios.put(url, data, { headers: defaultHeaders });
    return response?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message ||'error fetching';
    console.error(errorMessage);
    throw error;
  }
};

export const updateApiPatch = async (url, data, headers = {}) => {
  try {
    const isFormData = data instanceof FormData;
    const defaultHeaders = {
      ...headers,
      // Authorization: `Bearer ${token}`,
      ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' })
    };
    const response = await axios.patch(url, data, { headers: defaultHeaders });
    return response?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message ||'error fetching';
    console.error(errorMessage);
    throw error;
  }
};

export const deleteApi = async (url, headers = {}) => {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
      // Authorization: `Bearer ${token}`
    };
    const response = await axios.delete(url, { headers: defaultHeaders });
    return response?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'error fetching';
    console.error(errorMessage);
    throw error;
  }
};
