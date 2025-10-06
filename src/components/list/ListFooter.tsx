import React from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import { ListFooterProps } from '../../types/types';

export const ListFooter: React.FC<ListFooterProps> = ({ isLoadingMore }) => {
  if (!isLoadingMore) return null;

  return <LoadingSpinner text="Загрузка..." />;
};
