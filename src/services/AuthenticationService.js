import { apiClient } from '@/services/Conexao';

export default {
    login (login) {
        return apiClient.post('/auth', login)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                if (err.response && err.response.status == 401) {
                    return { err_status: err.response.status, message: 'Não autorizado' };
                } else {
                    return { err_status: 503, message: err };
                }
            });
    }
}