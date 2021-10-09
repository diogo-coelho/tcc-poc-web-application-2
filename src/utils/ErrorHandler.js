export default {
    handler (error) {
        switch (error) {
            case 401:
                return "Não autorizado! Verifique suas credenciais";
                break;

            case 500:
                return "Erro de servidor";
                break;
        }
    }
}