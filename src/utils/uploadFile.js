const axios = require('axios');
import { UPLOAD_URL, UPLOAD_AUTH_KEY } from '../configs';
const uploadFile = async (filePath, destination, name) => {
  try {
    const reader = fs.createReadStream(filePath);
    const form = new FormData();
    if (destination) form.append('destination', destination);
    if (name) form.append('name', name);
    form.append('file', reader);

    const response = await axios({
      method: 'POST',
      url: `${ASR_URL}/api/v1/uploads/file`,
      data: form,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`,
        Authorization: `Bearer ${ASR_AUTH_KEY}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    return response.data;
  } catch (error) {
    return error.message;
    console.error('Upload file error:', error.message);
  }
};

module.exports = uploadFile;
