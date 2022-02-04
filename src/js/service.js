import axios from 'axios';

const url = 'https://api.cloudinary.com/v1_1/dlqoivlg9/image/upload';
const api_key = '117699224757924';
const upload_preset = 'x53j3un1';
// const config = { 
//   cloud_name: 'dlqoivlg9', 
//   api_key: '117699224757924', 
//   api_secret: 'Wfd1Jyx70hdb_aCKQkgcHCM-zA4',
//   secure: true
// };

export const uploadImage = async (file, name) => {
  try{
    if(!file || !name) return null;

    let data = new FormData();

    data.append('file', file);
    data.append('public_id', name);
    data.append('upload_preset', upload_preset);
    data.append('api_key', api_key);

    const result = await axios({
      method: 'post',
      url,
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log('image uploading result:', result);

    if(result.status === 200) return true;
    else return false;
  }catch(e) {
    console.log('Error in uploadImage', e);
    return null;
  }

}

export const getLogoURL = async (address, height = 300, width = 300) => {
  const url = `https://res.cloudinary.com/dlqoivlg9/image/upload/c_thumb,h_${height},w_${width}/olympuslaunchpad/logo/${address}.png`;
  
  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    if (img.complete) {
      resolve(img.src)
    } else {
      img.onload = () => {
        resolve(img.src)
      };
      
      img.onerror = () => {
        reject('error');
      };
    }
  });

  return promise;
}

  