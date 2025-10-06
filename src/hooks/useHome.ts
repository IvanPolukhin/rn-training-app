import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../features/auth/useAuth';

export const useHome = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return {
    navigation,
    user,
    handleLogout,
  };
};
