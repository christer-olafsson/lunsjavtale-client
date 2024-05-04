import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIA4MTWOF3J3NOCSZNB',
    secretAccessKey: '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'
  }
});

export const fileDelete = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: "lunsjavtale",
    Key: key
  });

  try {
    const response = await client.send(command);
    console.log('response', response);
  } catch (err) {
    console.error('deleteErr:', err);
  }
};




















// import ReactS3Client from "react-aws-s3-typescript";


// export const fileDelete = async (filepath) => {
//   const config = {
//     bucketName: 'lunsjavtale',
//     region: 'ap-south-1',
//     accessKeyId: 'AKIA4MTWOF3J3NOCSZNB',
//     secretAccessKey: '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',
//     s3Url: 'https://lunsjavtale.s3.ap-south-1.amazonaws.com'
//   }
//   const S3 = new ReactS3Client(config);
//   try {
//     await S3.deleteFile('stage/staff/noo1WHjVqYpJTFwPoDT7vU.png');
//     console.log('File deleted');
//   } catch (exception) {
//     console.log(exception);
//     /* handle the exception */
//   }
//   // return new Promise((resolve, reject) => {
//   //   S3.deleteFile(filepath)
//   //     .then(data => resolve(data))
//   //     .catch(err => reject(console.log('deleteErr:', err)))
//   // })
// }