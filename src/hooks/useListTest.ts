import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ListItem, ListFooter } from '../components';

interface ListItemData {
  id: string;
  title: string;
  subtitle: string;
  value: number;
  color: string;
}

const colors = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E9',
];

export const useListTest = () => {
  const navigation = useNavigation();
  const [listType, setListType] = useState<'flatlist' | 'flashlist'>(
    'flatlist',
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [items, setItems] = useState<ListItemData[]>([]);
  const [page, setPage] = useState(1);

  const generateItems = useCallback((pageNum: number, count: number = 20) => {
    const newItems: ListItemData[] = [];

    for (let i = 0; i < count; i++) {
      const index = (pageNum - 1) * count + i;
      newItems.push({
        id: `item-${index}`,
        title: `Элемент ${index + 1}`,
        subtitle: `Описание элемента ${index + 1}`,
        value: Math.floor(Math.random() * 1000),
        color: colors[index % colors.length],
      });
    }

    return newItems;
  }, []);

  React.useEffect(() => {
    const initialItems = generateItems(1, 50);
    setItems(initialItems);
  }, [generateItems]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    const newItems = generateItems(1, 50);
    setItems(newItems);
    setPage(1);
    setIsRefreshing(false);
  }, [generateItems]);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    const newPage = page + 1;
    const newItems = generateItems(newPage, 20);
    setItems(prev => [...prev, ...newItems]);
    setPage(newPage);
    setIsLoadingMore(false);
  }, [isLoadingMore, page, generateItems]);

  const renderItem = useCallback(
    ({ item }: { item: ListItemData }) =>
      React.createElement(ListItem, { item }),
    [],
  );

  const renderFooter = useCallback(
    () => React.createElement(ListFooter, { isLoadingMore }),
    [isLoadingMore],
  );

  const keyExtractor = useCallback((item: ListItemData) => item.id, []);

  const ListComponent = useMemo(() => {
    return listType === 'flatlist' ? FlatList : FlashList;
  }, [listType]);

  return {
    navigation,
    listType,
    setListType,
    items,
    page,
    isRefreshing,
    handleRefresh,
    handleLoadMore,
    renderItem,
    keyExtractor,
    renderFooter,
    ListComponent,
  };
};
