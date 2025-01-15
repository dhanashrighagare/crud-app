import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMemberById, updateMember } from "../api";
import { ToastContainer, toast } from "react-toastify";

const EditMember = () => {
  const [formData, setFormData] = useState({
    name: "",
    Email: "",
    age: "",
    parent_id: null, // Set initial parent_id as null
  });

  const { id } = useParams(); // Get member ID from URL parameters
  const navigate = useNavigate(); // Hook to handle navigation

  // Fetch member details based on ID when component mounts
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const member = await fetchMemberById(id);

        // Log the fetched data to ensure email is being returned
        console.log("Fetched member:", member);

        if (member) {
          // If member is found, set form data with the response
          setFormData({
            name: member.name || "",
            email: member.Email || "",
            age: member.age || "",
            parent_id: member.parent_id || null, // Set default value as null
          });
        } else {
          toast.error("Member not found.");
          navigate("/"); // Navigate away if member doesn't exist
        }
      } catch (error) {
        toast.error("Error fetching member data.");
        console.error("Error fetching member:", error); // Log error for debugging
      }
    };

    fetchMember();
  }, [id, navigate]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Update specific field in state
    }));
  };

  // Handle save/update member data
  const handleSave = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    // Validation check (optional)
    if (!formData.name || !formData.email || !formData.age || formData.parent_id === null) {
      toast.error("All fields are required!");
      return;
    }

    // Additional validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      // Log the data to check what we are sending to the API
      console.log("Sending data to update:", formData);

      // Call the API to update the member's data
      const updatedMember = await updateMember(id, formData); // Ensure email is included

      // Log the response from the API
      console.log("Updated member:", updatedMember);

      toast.success("Member updated successfully!");

      // Redirect to the list page after successful update
      navigate("/");

    } catch (error) {
      toast.error("Error updating member.");
      console.error("Error updating member:", error); // Log error for debugging
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    // Navigate back to the list page or wherever the user should be directed
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h3 className="mt-4 mb-4">Edit Member</h3>
      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="0" // Added a min attribute for better UX
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Parent ID</Form.Label>
          <Form.Control
            type="number"
            name="parent_id"
            value={formData.parent_id || ""}
            onChange={handleChange}
            required
            min="0" // Added a min attribute
          />
        </Form.Group>

        <div className="d-flex justify-content-center gap-3">
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
          <Button variant="secondary" type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default EditMember;