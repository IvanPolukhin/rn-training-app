import { PICSUM_PHOTOS_ID_URL, PICSUM_PHOTOS_LIST_URL } from '../constants';
import { Photo } from '../types/types';
import { PhotoListResponse } from './types';

export const photoService = {
  async getPhotos(page: number = 1, limit: number = 20): Promise<Photo[]> {
    try {
      const response = await fetch(
        `${PICSUM_PHOTOS_LIST_URL}?page=${page}&limit=${limit}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PhotoListResponse[] = await response.json();

      return data.map(photo => ({
        id: photo.id,
        author: photo.author,
        width: photo.width,
        height: photo.height,
        url: photo.url,
        download_url: photo.download_url,
      }));
    } catch (error) {
      console.error('Ошибка при загрузке фотографий:', error);
      throw error;
    }
  },

  async getPhotoById(id: string): Promise<Photo> {
    try {
      const response = await fetch(`${PICSUM_PHOTOS_ID_URL}/${id}/info`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PhotoListResponse = await response.json();

      return {
        id: data.id,
        author: data.author,
        width: data.width,
        height: data.height,
        url: data.url,
        download_url: data.download_url,
      };
    } catch (error) {
      console.error('Ошибка при загрузке фотографии:', error);
      throw error;
    }
  },
};
