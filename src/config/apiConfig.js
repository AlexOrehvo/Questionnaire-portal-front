const apiConfig = {};

apiConfig.BASE_URL = 'http://localhost:8080';

apiConfig.LOGIN_END_POINT = '/account/authenticate';
apiConfig.REGISTRATION_END_POINT = '/account/register';
apiConfig.FORGOT_PASSWORD_END_POINT = '/account/forgot-password';
apiConfig.CHANGE_PASSWORD_END_POINT = '/account/change-password';

apiConfig.PROFILE_END_POINT = '/account/';

apiConfig.FIELDS_END_POINT = '/api/fields';

apiConfig.RESPONSES_END_POINT = '/api/responses/';

export default apiConfig;

