import React from 'react';
import { render } from '@testing-library/react-native';
import { InfoSection } from '../../../components/auth/InfoSection';

describe('InfoSection', () => {
  it('renders basic info text', () => {
    const { getByText } = render(
      <InfoSection biometrySupported={false} biometryType={null} />,
    );

    expect(
      getByText('Для демонстрации введите любой email и пароль'),
    ).toBeTruthy();
  });

  it('shows biometry info when supported', () => {
    const { getByText } = render(
      <InfoSection biometrySupported={true} biometryType="FaceID" />,
    );

    expect(getByText('🔐 Биометрия доступна: Face ID')).toBeTruthy();
  });

  it('shows Touch ID when biometry type is TouchID', () => {
    const { getByText } = render(
      <InfoSection biometrySupported={true} biometryType="TouchID" />,
    );

    expect(getByText('🔐 Биометрия доступна: Touch ID')).toBeTruthy();
  });

  it('shows generic biometry text when type is unknown', () => {
    const { getByText } = render(
      <InfoSection biometrySupported={true} biometryType="UnknownType" />,
    );

    expect(getByText('🔐 Биометрия доступна: UnknownType')).toBeTruthy();
  });

  it('does not show biometry info when not supported', () => {
    const { queryByText } = render(
      <InfoSection biometrySupported={false} biometryType={null} />,
    );

    expect(queryByText(/Биометрия доступна/)).toBeNull();
  });
});
