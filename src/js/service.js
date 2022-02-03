import cloudinary from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dlqoivlg9', 
  api_key: '117699224757924', 
  api_secret: 'Wfd1Jyx70hdb_aCKQkgcHCM-zA4',
  secure: true
});

export async function uploadImage(file, presaleAddress){
  try {
    await cloudinary.v2.uploader.upload(file, {public_id: `presalelogimgs/}${presaleAddress}`});
  }catch(e) {
    console.log('Error occured in uploadImage service', e);
  }
}