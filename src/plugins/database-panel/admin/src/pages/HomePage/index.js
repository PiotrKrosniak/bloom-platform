import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { IconButton, Modal, TextField, Button } from "@mui/material";
import { Pencil, Trash } from "@strapi/icons";
import { BaseHeaderLayout } from "@strapi/design-system";
import userRequests from "../../api/user";

function HomePage() {
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    provider: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await userRequests.getAllUsers();
      if (Array.isArray(response)) {
        const sortedData = response.sort((a, b) => a.id - b.id);
        setRecords(sortedData);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (row) => {
    setIsModalOpen(true);
    setFormData({
      id: row.id,
      username: row.username,
      email: row.email,
      provider: row.provider,
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({
      id: "",
      username: "",
      email: "",
      provider: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function editUser(id, data) {
    try {
      await userRequests.editUser(id, data);
      fetchData();
      handleModalClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  const handleUpdate = async () => {
    try {
      const data = {
        username: formData.username,
        email: formData.email,
        provider: formData.provider,
      };
      await editUser(formData.id, data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  async function deleteTodo(row) {
    try {
      await userRequests.deleteUser(row.id);
      await fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Provider",
      selector: (row) => row.provider,
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => new Date(row.updatedAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <IconButton onClick={() => handleEdit(row)}>
          <Pencil />
        </IconButton>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Delete",
      cell: (row) => (
        <IconButton onClick={() => deleteTodo(row)}> { }
          <Trash />
        </IconButton>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  return (
    <>
      <BaseHeaderLayout
        title="Database Panel"
        subtitle="Table: Users"
        as="h2"
      />
      <div style={{ display: "flex", justifyContent: "center", margin: "50px", marginTop: "10px" }}>
        <div style={{ width: "1200px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <DataTable
            columns={columns}
            data={records}
            selectableRows
            fixedHeader
            pagination
          />
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: 20,
            width: "500px",
            borderRadius: 8,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Edit User</h2>
          <TextField
            label="Name"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Provider"
            variant="outlined"
            name="provider"
            value={formData.provider}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <Button
              variant="outlined"
              onClick={handleModalClose}
              style={{
                marginRight: 8,
                color: "#4945ff",
                borderColor: "#4945ff",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdate}
              style={{ backgroundColor: "#4945ff", color: "#ffffff" }}
            >
              Update
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default HomePage;