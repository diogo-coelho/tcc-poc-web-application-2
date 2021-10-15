import { apiClient } from '@/services/Conexao';

export default {
    getObjectsTracking (params) {
        return apiClient.get('/shippingcompany/objectstracking', { 
                params: { ...params }
            })
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                return { err_status: err.response.status, message: err.response.message };
            });
    },
    getObjectTrackingById (id) {
        return apiClient.get('/shippingcompany/objectstracking?tracking_code=' + id)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                return { err_status: err.response.status, message: err.response.message };
            });
    }
}