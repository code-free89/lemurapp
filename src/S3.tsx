import AWS from "aws-sdk";
import credentials from "./constants/credentials";

class S3 {
  constructor() {}

  listModels(bucket: string, modelType: string, categoryType?: string) {
    return new Promise((accept, reject) => {
      const params = {
        Bucket: bucket,
        Prefix: modelType,
      };

      const s3 = new AWS.S3({
        credentials: {
          accessKeyId: credentials.EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
          secretAccessKey: credentials.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY,
        },
        region: credentials.EXPO_PUBLIC_AWS_REGION,
      });

      s3.makeUnauthenticatedRequest("listObjects", params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const contents = data.Contents;
          const ret = [];
          for (var i = 1; i < contents.length; i++) {
            const presignedUrl = s3.getSignedUrl("getObject", {
              Bucket: bucket,
              Key: contents[i].Key,
            });
            let fileName = contents[i].Key.replace(modelType, "");
            if (categoryType === "all") {
              ret.push({
                filename: fileName,
                link: presignedUrl,
              });
            } else if (
              !!categoryType &&
              fileName.startsWith(categoryType) &&
              fileName != `${categoryType}/`
            ) {
              fileName = fileName.substring(categoryType.length + 1);
              ret.push({
                filename: fileName,
                link: presignedUrl,
              });
            } else if (
              !categoryType &&
              !fileName.substring(modelType.length).includes("/")
            ) {
              ret.push({
                filename: fileName,
                link: presignedUrl,
              });
            }
          }
          accept(ret);
        }
      });
    });
  }

  listVideos(bucket: string, modelType: string) {
    return new Promise((accept, reject) => {
      const params = {
        Bucket: bucket,
        Prefix: modelType,
      };

      const s3 = new AWS.S3({
        credentials: {
          accessKeyId: credentials.EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
          secretAccessKey: credentials.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY,
        },
        region: credentials.EXPO_PUBLIC_AWS_REGION,
      });

      s3.makeUnauthenticatedRequest("listObjects", params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const contents = data.Contents;
          const ret = [];
          for (var i = 1; i < contents.length; i++) {
            const presignedUrl = s3.getSignedUrl("getObject", {
              Bucket: bucket,
              Key: contents[i].Key,
            });
            let fileName = contents[i].Key.replace(modelType, "");
            ret.push({
              filename: fileName,
              link: presignedUrl,
            });
          }
          accept(ret);
        }
      });
    });
  }

  uploadModel(bucket: string, fileName: string, data: ArrayBuffer) {
    return new Promise((accept, reject) => {
      const params = {
        Bucket: bucket,
        Key: fileName,
        Body: data,
      };

      const s3 = new AWS.S3({
        credentials: {
          accessKeyId: credentials.EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
          secretAccessKey: credentials.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY,
        },
        region: credentials.EXPO_PUBLIC_AWS_REGION,
      });

      s3.putObject(params, function (err, data) {
        if (err) {
          reject({ result: "error", error: err });
        } else {
          accept({ result: "success" });
        }
      });
    });
  }

  getPreSignedUrl(bucket: string, key: string) {
    const s3 = new AWS.S3({
      credentials: {
        accessKeyId: credentials.EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: credentials.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY,
      },
      region: credentials.EXPO_PUBLIC_AWS_REGION,
    });

    const presignedUrl = s3.getSignedUrl("getObject", {
      Bucket: bucket,
      Key: key,
    });

    return presignedUrl;
  }
}

export default S3;
