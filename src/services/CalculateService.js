import { apiClient } from '@/services/Conexao';

export default {
    getCalculateShipping (params) {
        return apiClient.get('/shippingcompany/calculateshipping', { 
                params: { ...params }
            })
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                if (err.response && err.response.status == 400) {
                    return { err_status: err.response.status, message: 'Parâmetros inválidos' };
                } 
                
                return { err_status: err.response.status, message: err };

            });
    }
}