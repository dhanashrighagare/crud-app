import axios from 'axios';

const BASE_URL = "https://crudcrud.com/api/9750621218e74a1e9b750fb632ccc7ee";

// Fetch all members
export const fetchMembers = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/members/`);
    return resp.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    return [];
  }
};

// Fetch a member by ID
export const fetchMemberById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/members/${id}`);
    console.log("Fetched member by ID:", response.data); // Log response data
    return response.data;
  } catch (error) {
    console.error("Error fetching member by ID:", error);
    throw error;
  }
};

// Create a new member
export const createMember = async (memberData) => {
  try {
    const response = await axios.post(`${BASE_URL}/members/`, memberData);
    return response.data;
  } catch (error) {
    console.error("Error creating member:", error);
    throw error;
  }
};

// Delete a member by ID
export const deleteMember = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/members/${id}`);
  } catch (error) {
    console.error("Error deleting member:", error);
  }
};

// Update a member by ID
export const updateMember = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/members/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating member:", error);
    throw error;
  }
};
