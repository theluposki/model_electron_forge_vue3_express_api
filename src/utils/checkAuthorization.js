import { api } from "../axios.js";
import { showNotification } from "../components/Layout/NotificationService.js";

const getPermissionsByPermission = async (permission) => {
  try {
    const response = await api.get(`/permissions/authorization/${permission}`);

    const result = response.data;
    if (result.error) {
      showNotification(result.error, "error");
      return;
    }
    return result;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      console.error(data);
      showNotification(error.response.data.error, "error");
    }
  }
};

export const checkAuthorization = async (permission, module) => {
  const permissionList = await getPermissionsByPermission(permission);
  const authoritations = JSON.parse(permissionList.authorizations);

  return authoritations.includes(module);
};
