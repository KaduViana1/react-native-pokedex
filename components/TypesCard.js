import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import InfosCard from './InfosCard';
import { getTypeIcon } from '../utils/getTypeIcon';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const screenWithPadding = screenWidth - 32;

function TypesCard({ data, title }) {
  const router = useRouter();

  return (
    <InfosCard fontSize={16} title={title} width={screenWithPadding / 2 - 2.5}>
      <View style={styles.gridContaienr}>
        {data?.map(item => (
          <TouchableOpacity
            key={item.name + title}
            onPress={() => router.push(`/type/${item.name}`)}
          >
            <Image style={styles.typeIcons} source={getTypeIcon(item.name)} />
          </TouchableOpacity>
        ))}
      </View>
    </InfosCard>
  );
}

const styles = StyleSheet.create({
  gridContaienr: {
    width: 114,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeIcons: {
    minWidth: 32,
    maxWidth: 32,
    height: 32,
    marginHorizontal: 3,
    marginBottom: 3,
  },
});
export default TypesCard;
