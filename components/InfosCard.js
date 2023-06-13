import { View, Text, StyleSheet } from 'react-native';

function InfosCard({ children, title, flexDirection, width, fontSize }) {
  return (
    <View style={[styles.infoContainer, { width: width ?? null }]}>
      <View style={styles.infoContainerHeader}>
        <Text style={[styles.infoTitle, { fontSize: fontSize ?? 20 }]}>
          {title}
        </Text>
      </View>
      <View
        style={[
          styles.infoContainerBody,
          { flexDirection: flexDirection ?? 'column' },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    marginBottom: 15,
  },
  infoContainerHeader: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    backgroundColor: 'rgba(255, 255, 255, .6)',
  },
  infoTitle: {
    fontWeight: 500,
  },
  infoContainerBody: {
    padding: 5,
    alignItems: 'center',
  },
});

export default InfosCard;
