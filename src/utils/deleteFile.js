import axios from "axios";
import { SHA256 } from "crypto-js";

const API_KEY = '289763653877376'
const API_SECRET = 'LKYhf0tHMs5qh07rUNkSs-QQBDo'
const CLOUD_NAME = 'dj0bdzype'

const generateSignature = (publicId, apiSecret) => {
  const timestamp = new Date().getTime();
  const signatureData = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  return SHA256(signatureData).toString();
};

export const deleteFile = async (publicId) => {
  const timestamp = new Date().getTime();
  const signature = generateSignature(publicId, API_SECRET);
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`;

  try {
    const response = await axios.post(url, {
      public_id: publicId,
      signature: signature,
      timestamp: timestamp,
      api_key: API_KEY,
    });
    return(response);
  } catch (error) {
    console.error(error);
  }
};


// export const deleteMultiFile = async (publicIds) => {
//   const timestamp = new Date().getTime();
//   const signatures = publicIds.map(publicId => generateSignature(publicId, API_SECRET));
//   const urls = publicIds.map(publicId => `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`);
  
//   try {
//     const responses = await Promise.all(publicIds.map((publicId, index) => {
//       return axios.post(urls[index], {
//         public_id: publicId,
//         signature: signatures[index],
//         timestamp: timestamp,
//         api_key: API_KEY,
//       });
//     }));
//     return responses;
//   } catch (error) {
//     console.error(error);
//     throw new Error('An error occurred while deleting files.');
//   }
// };


