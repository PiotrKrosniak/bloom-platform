import { request } from "@strapi/helper-plugin";

const STRAPI_ADMIN_API_TOKEN = process.env.STRAPI_ADMIN_API_TOKEN;

const userRequests = {
  getAllUsers: async () => {
    return await request("/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${STRAPI_ADMIN_API_TOKEN}`,
      },
    });
  },

  editUser: async (id, data) => {
    return await request(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${STRAPI_ADMIN_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: (data),
    });
  },

  deleteUser: async (id) => {
    return await request(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${STRAPI_ADMIN_API_TOKEN}`,
      },
    });
  },
};

export default userRequests;
