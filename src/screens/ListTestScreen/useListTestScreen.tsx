import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { ListItem } from './types';
import { colors } from './constants';
import React from 'react';
import { FlatList } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ListFooterComponent, ListItemComponent } from './components';

export const useListTestScreen = () => {
  const navigation = useNavigation();
  const [listType, setListType] = useState<'flatlist' | 'flashlist'>(
    'flatlist',
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [items, setItems] = useState<ListItem[]>([]);
  const [page, setPage] = useState(1);

  const generateItems = useCallback((pageNum: number, count: number = 20) => {
    const newItems: ListItem[] = [];

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
    ({ item }: { item: ListItem }) => <ListItemComponent item={item} />,
    [],
  );

  const renderFooter = useCallback(
    () => <ListFooterComponent isLoadingMore={isLoadingMore} />,
    [isLoadingMore],
  );

  const keyExtractor = useCallback((item: ListItem) => item.id, []);

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
