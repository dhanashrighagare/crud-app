import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Row, Col, Pagination } from 'react-bootstrap';
import { deleteMember } from '../api';
import SweetAlert from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MemberList = ({ setMembers, members }) => {
  const [membersState, setMembersState] = useState(members);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  useEffect(() => {
    setMembersState(members); // Keep this updated whenever members change
  }, [members]);

  const handleDelete = async (id) => {
    const confirmed = await SweetAlert.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this member!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await deleteMember(id);
        setMembersState((prevMembers) =>
          prevMembers.filter((member) => member._id !== id)
        );
        toast.success("Member deleted successfully!", {
                position: "top-center", 
                autoClose: 5000, 
              });
        
      } catch (error) {
        toast.error("Error deleting member.", {
          position: "top-center", 
          autoClose: 5000, 
        });
      }
    }
  };

   // Pagination logic
   const indexOfLastMember = currentPage * pageSize;
   const indexOfFirstMember = indexOfLastMember - pageSize;
   const currentMembers = membersState.slice(indexOfFirstMember, indexOfLastMember);
 
   const totalPages = Math.ceil(membersState.length / pageSize);
 
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <h3 className="text-center">Member List</h3>

          <div className="mb-3 text-end">
            <Link to="/create">
              <Button variant="success">Add New Member</Button>
            </Link>
          </div>

          <Table striped bordered hover responsive="lg" style={{ fontSize: "14px" }}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>ID</th>
                <th style={{ width: "20%" }}>Name</th>
                <th style={{ width: "25%" }}>Email</th>
                <th style={{ width: "10%" }}>Age</th>
                <th style={{ width: "15%" }}>Parent ID</th>
                <th style={{ width: "15%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
            {currentMembers.length > 0 ? (
                currentMembers.map((member) => (
                  <tr key={member._id}>
                    <td>{member._id}</td>
                    <td>{member.name}</td>
                    <td>{member.Email}</td>
                    <td>{member.age}</td>
                    <td>{member.parent_id}</td>
                    <td>
                      <Link to={`/edit/${member._id}`}>
                        <Button variant="primary" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(member._id)}
                        size="sm"
                        className="ms-2"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

           {/* Pagination Component */}
           <Pagination className="justify-content-center">
            {[...Array(totalPages).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
          </Pagination>
          
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default MemberList;
