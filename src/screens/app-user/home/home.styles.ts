import { StyleSheet } from 'react-native';
import { createStyles } from 'shared/theme/createStyles';

export const useStyles = createStyles(({ theme, scale }: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.palette.cream },
    map: { ...StyleSheet.absoluteFill },
    topOverlay: { position: 'absolute', left: scale(16), right: scale(16) },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.palette.card,
      borderRadius: scale(16),
      paddingHorizontal: scale(14),
      height: scale(52),
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 4,
    },
    searchIcon: {
      fontSize: scale(18),
      color: theme.palette.muted,
      marginRight: scale(8),
    },
    searchInput: { flex: 1, fontSize: scale(16), color: theme.palette.text },
    chipsRow: {
      gap: scale(8),
      paddingVertical: scale(12),
      paddingRight: scale(16),
    },
    chip: {
      backgroundColor: theme.palette.card,
      borderRadius: scale(20),
      paddingHorizontal: scale(16),
      paddingVertical: scale(8),
      borderWidth: scale(1),
      borderColor: theme.palette.border,
    },
    chipActive: {
      backgroundColor: theme.palette.forest,
      borderColor: theme.palette.forest,
    },
    chipText: {
      fontSize: scale(14),
      fontWeight: '600',
      color: theme.palette.text,
    },
    chipTextActive: { color: '#FFFFFF' },
    fab: {
      position: 'absolute',
      right: scale(20),
      width: scale(60),
      height: scale(60),
      borderRadius: scale(30),
      backgroundColor: theme.palette.forest,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: scale(8),
      shadowOffset: { width: 0, height: 4 },
      elevation: 6,
    },
    fabIcon: { fontSize: scale(30), color: '#FFFFFF', lineHeight: scale(34) },
  }),
);
