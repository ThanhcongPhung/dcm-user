import api from './api';

export async function verify(token) {
  try {
    const response = await api({
      method: 'GET',
      url: '/auths/verify',
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function logout() {
  // const signUpData = await api({
  //   method: 'GET',
  //   url: `${process.env.REACT_APP_SSO_URL}/api/v1/auths/logout`,
  // });
  return { status: true };
}
