import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomRadioButton from "../components/CustomRadioButton";
import Loading from "../components/Loading";
import PageFrame from "../components/PageFrame";
import credentials from "../constants/credentials";
import { extractFileName } from "../helpers/format";
import S3 from "../S3";
import { RootStackParamList } from "../types/StackParams";

type ModelType = {
  filename: string;
  link: string;
};

type PageProps = NativeStackScreenProps<RootStackParamList, "ModelList">;

export default function ModelListScreen({ navigation }: PageProps) {
  const s3 = new S3();
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [models, setModels] = useState<ModelType[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const aws_bucket = credentials.EXPO_PUBLIC_AWS_BUCKET;

  const addSelectedModel = (newModel: string) => {
    if (!selectedModels.includes(newModel)) {
      setSelectedModels([...selectedModels, newModel]);
    } else {
      const newModels = selectedModels.filter((model) => model != newModel);
      setSelectedModels([...newModels]);
    }
  };

  const viewModels = () => {
    const models = selectedModels.map(
      (model) => "glb/" + JSON.parse(model).filename
    );
    navigation.push("ModelView", { category: "view_multiple", models: models });
  };

  useEffect(() => {
    s3.listModels(aws_bucket, "glb/", "all")
      .then((ret: any) => {
        setModels(ret);
        if (ret.length === 0) {
          Alert.alert(
            "No assets found",
            "There are no assets matched with selected category"
          );
        }
      })
      .catch((err) => {})
      .finally(() => setIsModelLoading(false));
  }, []);

  return (
    <PageFrame>
      {isModelLoading ? null : (
        <React.Fragment>
          <Text style={styles.title}>Select Models</Text>
          <FlatList
            data={models}
            renderItem={({ item }) =>
              !!extractFileName(item.filename) ? (
                <CustomRadioButton
                  label={extractFileName(item.filename)}
                  value={JSON.stringify(item)}
                  selectedValue={
                    selectedModels.includes(JSON.stringify(item))
                      ? JSON.stringify(item)
                      : ""
                  }
                  onPress={() => addSelectedModel(JSON.stringify(item))}
                />
              ) : null
            }
          />
          <CustomButton mode={"contained"} text={"View"} onPress={viewModels} />
        </React.Fragment>
      )}
    </PageFrame>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 8,
  },
});
