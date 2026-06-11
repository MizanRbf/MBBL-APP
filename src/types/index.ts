import { ImageSourcePropType } from 'react-native';

export interface Book {
  id: string;
  title: string;
  thumbnail: string;
  pdfUrl: string;
}

export interface Video {
  id: string;
  title: string;
  videoUrl: string;
}

export interface Contact {
  id: number;
  name: string;
  title: string;
  image: ImageSourcePropType;
  phone: string;
}
