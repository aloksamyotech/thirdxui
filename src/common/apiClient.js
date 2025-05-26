import axios from 'axios';
import { getToken } from 'utils/auth';

const getAuthHeaders = (isFormData = false, headers = {}) => {
  const token = getToken();

  return {
    ...headers,
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' })
  };
};

export const postApi = async (url, data, headers = {}) => {
  try {
    const isFormData = data instanceof FormData;
    const defaultHeaders = getAuthHeaders(isFormData, headers);

    const response = await axios.post(url, data, { headers: defaultHeaders });
    return response?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error fetching';
    console.error(errorMessage);
    throw error;
  }
};

export const getApi = async (url, params = {}, headers = {}) => {
  try {
    const defaultHeaders = getAuthHeaders(false, headers);

    const response = await axios.get(url, {
      headers: defaultHeaders,
      params: params
    });
    return response?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error fetching';
    console.error(errorMessage);
    throw error;
  }
};

export const updateApi = async (url, data, headers = {}) => {
  try {
    const isFormData = data instanceof FormData;
    const defaultHeaders = getAuthHeaders(isFormData, headers);

    const response = await axios.put(url, data, { headers: defaultHeaders });
    return response?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error fetching';
    console.error(errorMessage);
    throw error;
  }
};

export const updateApiPatch = async (url, data, headers = {}) => {
  try {
    const isFormData = data instanceof FormData;
    const defaultHeaders = getAuthHeaders(isFormData, headers);

    const response = await axios.patch(url, data, { headers: defaultHeaders });
    return response?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error fetching';
    console.error(errorMessage);
    throw error;
  }
};

export const deleteApi = async (url, headers = {}) => {
  try {
    const defaultHeaders = getAuthHeaders(false, headers);

    const response = await axios.delete(url, { headers: defaultHeaders });
    return response?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error fetching';
    console.error(errorMessage);
    throw error;
  }
};
