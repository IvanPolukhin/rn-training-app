import React from 'react';
import { View, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useListTestScreen } from './useListTestScreen';

const ListTestScreen = () => {
  const {
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
  } = useListTestScreen();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Тест списков</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.controlButton,
            listType === 'flatlist' && styles.controlButtonActive,
          ]}
          onPress={() => setListType('flatlist')}
        >
          <Text
            style={[
              styles.controlButtonText,
              listType === 'flatlist' && styles.controlButtonTextActive,
            ]}
          >
            FlatList
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.controlButton,
            listType === 'flashlist' && styles.controlButtonActive,
          ]}
          onPress={() => setListType('flashlist')}
        >
          <Text
            style={[
              styles.controlButtonText,
              listType === 'flashlist' && styles.controlButtonTextActive,
            ]}
          >
            FlashList
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Используется: {listType === 'flatlist' ? 'FlatList' : 'FlashList'} •
          Элементов: {items.length} • Страница: {page}
        </Text>
      </View>

      <View style={styles.listContainer}>
        <ListComponent
          data={items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#007AFF']}
              tintColor="#007AFF"
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListTestScreen;
