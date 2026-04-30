import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacityProps 
} from 'react-native';
import { theme } from '../constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  variant?: 'primary' | 'ghost';
}

export function Button({ title, isLoading, variant = 'primary', style, ...rest }: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isDisabled = isLoading || rest.disabled;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.ghost,
        isDisabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
      disabled={isDisabled}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={isPrimary ? theme.colors.text : theme.colors.accent} />
      ) : (
        <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textGhost]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primary: {
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 12,
  },
  ghost: {
    backgroundColor: 'transparent',
    marginTop: 8,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 18,
  },
  textPrimary: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
  },
  textGhost: {
    fontFamily: theme.fonts.medium,
    color: theme.colors.accent,
    fontSize: 16,
  },
});