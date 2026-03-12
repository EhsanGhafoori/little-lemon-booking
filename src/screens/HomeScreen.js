import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { menuItems, categories } from '../data/menuItems';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hero: {
    backgroundColor: '#495E57',
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F4CE14',
  },
  heroSub: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
  },
  heroDesc: {
    fontSize: 14,
    color: '#fff',
    marginTop: 12,
    lineHeight: 20,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  searchIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 22,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBreakdown: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
  },
  categoryBtnActive: {
    backgroundColor: '#495E57',
  },
  categoryBtnText: {
    fontSize: 14,
    color: '#333',
  },
  categoryBtnTextActive: {
    color: '#fff',
  },
  menuList: {
    padding: 16,
    paddingBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemText: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItemDesc: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495E57',
    marginTop: 4,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 12,
  },
});

function MenuItemRow({ item }) {
  return (
    <View style={styles.menuItem}>
      <View style={styles.menuItemText}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDesc} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
    </View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('starters');

  const filteredItems = useMemo(() => {
    let list = menuItems.filter((i) => i.category === selectedCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedCategory, search]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>🍋 LITTLE LEMON</Text>
        </View>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={{ fontSize: 20 }}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Little Lemon</Text>
          <Text style={styles.heroSub}>Chicago</Text>
          <Text style={styles.heroDesc}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </Text>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Search menu"
              placeholderTextColor="#9ca3af"
            />
            <View style={styles.searchIcon}>
              <Text style={{ fontSize: 18 }}>🔍</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuBreakdown}>
          <Text style={styles.orderTitle}>ORDER FOR DELIVERY!</Text>
          <View style={styles.categoryRow}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.categoryBtn,
                  selectedCategory === cat.key && styles.categoryBtnActive,
                ]}
                onPress={() => setSelectedCategory(cat.key)}
              >
                <Text
                  style={[
                    styles.categoryBtnText,
                    selectedCategory === cat.key && styles.categoryBtnTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.menuList}>
          {filteredItems.map((item) => (
            <MenuItemRow key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
