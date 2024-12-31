import React, { useState } from 'react';
import { createMember } from '../api';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateMember = ({ setMembers }) => {
  const [formData, setFormData] = useState({
    name: '',
    Email: '',
    age: 0,
    parent_id: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMember = await createMember(formData);
      setMembers((prevMembers) => [...prevMembers, newMember]);
      toast.success("Member created successfully!", {
        position: toast.POSITION.TOP_CENTER, 
        autoClose: 50, 
      });

      navigate('/'); 

      setFormData({ name: '', Email: '', age: 0, parent_id: 0 });
    } catch (error) {
      toast.error("Error creating member.");
    }
  };

  return (
    <div className="my-4">
      <h3 className="text-center">Create New Member</h3>
      <Form onSubmit={handleSubmit} className="p-4 shadow-sm rounded" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Parent ID</Form.Label>
          <Form.Control
            type="number"
            name="parent_id"
            value={formData.parent_id}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Create Member
          </Button>
        </div>
      </Form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateMember;
