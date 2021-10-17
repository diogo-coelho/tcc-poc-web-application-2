import { apiClient } from '@/services/Conexao';

export default {
    report (params) {
        return apiClient.get('/report', params)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                if (err.response && err.response.status == 400) {
                    return { err_status: err.response.status, message: 'Parâmetros inválidos' };
                } else {
                    return { err_status: 500, message: err };
                }
            });
    }
}