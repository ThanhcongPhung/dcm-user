// import api from './api';

export async function verify(token) {
  // const response = await api({
  //   method: 'GET',
  //   url: '/auths/verify',
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  return {
    status: 1,
    result: {
      accessToken: token,
      email: 'huongttt@vbee.vn',
      id: '610763ccb1504e39f7f2f2c5',
      name: 'Thu Hương',
      ssoUserId: 'd28bc305-6eb6-4f5a-b052-39d403101533',
      createdAt: '2021-08-09T02:35:34.409Z',
    },
  };
}

export async function logout() {
  // const signUpData = await api({
  //   method: 'GET',
  //   url: `${process.env.REACT_APP_SSO_URL}/api/v1/auths/logout`,
  // });
  return { status: true };
}
