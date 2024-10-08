import { CategoryList } from "../constants/ModelList";

export type CategoryListType = (typeof CategoryList)[number];

export type RootStackParamList = {
  CategoryList: undefined;
  ModelView: { category: CategoryListType; models?: string[] } | undefined;
  VideoPlayer: undefined;
  ModelList: undefined;
  AquariumMode: undefined;
};
