// $FlowFixMe
import createS3Client from 'aws-s3-promisified'

export type S3Object = {
  Key: string,
  ETag: string,
}

export default async (): Promise<Array<S3Object>> => {
  const client = createS3Client()

  const objects = await client.listObjects(process.env.S3_BUCKET)
  return objects
    .Contents
    .filter(({ Key }) => /\.mp3$/.test(Key))
}
