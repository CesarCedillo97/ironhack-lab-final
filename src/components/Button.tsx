import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useMemo} from 'react';
import {MainColors} from '../utils/theme';

export type ButtonProps = {
  text: string;
  disabled?: boolean;
  onPress: () => void;
  size?: 'sm' | 'md' | 'full';
  isLoading?: boolean;
};

const Button = ({
  text,
  disabled,
  onPress,
  size,
  isLoading = false,
}: ButtonProps) => {
  const width = useMemo(() => {
    return size === 'sm' ? 120 : size === 'md' ? 180 : '90%';
  }, [size]);
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.disabledButton : styles.enabledButton,
        {width: width},
      ]}
      disabled={disabled || isLoading}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    marginHorizontal: '5%',
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  enabledButton: {
    backgroundColor: MainColors.primary,
  },
  disabledButton: {
    backgroundColor: MainColors.secondary,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
