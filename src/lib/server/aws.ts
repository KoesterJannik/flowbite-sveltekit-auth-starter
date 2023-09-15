/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Upload } from '@aws-sdk/lib-storage';
import { DeleteObjectCommand, GetObjectCommand, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_KEY, AWS_REGION } from '$env/static/private';

function generateRandomString(length: number) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i += 1) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

enum BUCKET_NAME {
	PUBLIC = 'tf-kwspublic-bucket',
	PRIVATE = 'tf-kwspublic-private'
}

const s3 = new S3({
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_KEY
	},
	region: AWS_REGION
});

export async function uploadFileToAws({
	folderName,
	fileContent,
	fileName
}: {
	folderName: string;
	fileContent: Uint8Array;
	fileName: string;
}) {
	// Setting up S3 upload parameters
	const folderPath = folderName + '/';
	const fileNameExtension = fileName.split('.').pop();
	const randomFileName = generateRandomString(32) + '.' + fileNameExtension;

	const params = {
		Bucket: BUCKET_NAME.PUBLIC,
		Key: folderPath + randomFileName, // File name you want to save as in S3
		Body: fileContent
	};

	// Uploading files to the bucket
	try {
		const uploadResult = await new Upload({
			client: s3,
			params
		}).done();
		//@ts-ignore
		const pathLocation = uploadResult.Location;

		return {
			path: folderPath + randomFileName,
			fileName: randomFileName,
			fullUrl: pathLocation
		};
	} catch (error) {
		console.error('Error uploading file:', error);
	}
}
export async function deleteObjectFromAwsBucket(fileLocation: string) {
	const location = fileLocation;

	const params = {
		Bucket: BUCKET_NAME.PUBLIC,
		Key: location
	};

	try {
		const deleteResult = await s3.send(new DeleteObjectCommand(params));
		console.log('Object deleted successfully.', deleteResult.$metadata);
	} catch (error) {
		console.error('Error deleting object:', error);
	}
}

export async function generatePreSignedUrl({
	location,
	expirantioninMinutes
}: {
	location: string;
	expirantioninMinutes: number;
}) {
	try {
		const key = location;

		const params = {
			Bucket: BUCKET_NAME.PUBLIC,
			Key: key,
			Expires: expirantioninMinutes * 60
		};

		const command = new GetObjectCommand(params);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const url = await getSignedUrl(s3, command, {
			expiresIn: expirantioninMinutes * 60
		});

		return url;
	} catch (error) {
		console.error('Error generating presigned url:', error);
	}
}
