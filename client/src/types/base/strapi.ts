export interface StrapiResponse<T> {
  id?: string | number; // В зависимости от того, как хранится идентификатор, это может быть строкой или числом
  attributes: T;
}

export interface Response<T> {
  data: {
    data: StrapiResponse<T>;
  };
}

export interface ResponseArray<T> {
  data: {
    data: StrapiResponse<T>[];
  };
}

export type UploadedFiles = {
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  ext: string;
  formats: string | null;
  hash: string;
  height: string;
  id: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
};
