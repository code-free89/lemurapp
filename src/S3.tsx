import AWS from 'aws-sdk'

class S3 {
    constructor() {
    }

    listExamplesObjects(bucket:string, prefix:string) {
        return new Promise((accept, reject) => {
            const params = {
                Bucket: bucket,
                Prefix: prefix,
            };
    
            AWS.config.update({
                region: 'us-west-1',
            });
            const s3 = new AWS.S3();
            s3.makeUnauthenticatedRequest('listObjects', params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const contents = data.Contents;
                    const ret = [];
                    for (var i = 1; i < contents.length; i++) {
                        ret.push({
                            filename: contents[i].Key.replace(prefix, ''),
                            link: `https://${bucket}.s3.amazonaws.com/${contents[i].Key}`,
                        });
                    }
                    accept(ret);
                }
            });
        });
    }
}

export default S3;
