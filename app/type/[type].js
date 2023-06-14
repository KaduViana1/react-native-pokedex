import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import MainContainer from '../../components/MainContainer';
import { useEffect, useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import axios from 'axios';
import { getTypeIcon } from '../../utils/getTypeIcon';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import InfosDropdown from '../../components/InfosDropdown';
import InfosModal from '../../components/InfosModal';
import TypesCard from '../../components/TypesCard';

function typePage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalInfos, setModalInfos] = useState({});
  const type = usePathname().slice(6);
  const [typeData, setTypeData] = useState(null);
  const URL = `https://pokeapi.co/api/v2/type/${type}`;
  const router = useRouter();

  useEffect(() => {
    fetchTypeData();
  }, []);

  const fetchModalInfos = (url, modalType) => {
    axios
      .get(url)
      .then(response => {
        if (modalType === 'move') {
          setModalInfos({
            name: response.data.name,
            effect: response.data.effect_entries[0].short_effect.replace(
              ' $effect_chance%',
              ''
            ),
            damageClass: response.data.damage_class.name,
            moveType: response.data.type.name,
          });
        } else {
          setModalInfos({
            name: response.data.name,
            effect: response.data.effect_entries[1].short_effect.replace(
              ' $effect_chance%',
              ''
            ),
          });
        }
      })
      .catch(err => console.error(err));
    setModalIsOpen(true);
  };

  const resetModal = () => {
    setModalIsOpen(false);
    setModalInfos({});
  };

  const fetchTypeData = () => {
    axios
      .get(URL)
      .then(response => {
        setTypeData(response.data);
      })
      .catch(err => console.error(err));
  };

  return (
    <MainContainer>
      <InfosModal
        modalInfos={modalInfos}
        closeModal={resetModal}
        modalIsOpen={modalIsOpen}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Type: {type.toUpperCase()}</Text>
        <Image style={styles.mainTypeIcon} source={getTypeIcon(type)} />
        <View style={styles.rowContainer}>
          <TypesCard
            title={'Double damage from'}
            data={typeData?.damage_relations?.double_damage_from}
          />
          <TypesCard
            title={'Double damage to'}
            data={typeData?.damage_relations?.double_damage_to}
          />
        </View>
        <View style={styles.rowContainer}>
          <TypesCard
            title={'Half damage from'}
            data={typeData?.damage_relations?.half_damage_from}
          />
          <TypesCard
            title={'Half damage to'}
            data={typeData?.damage_relations?.half_damage_to}
          />
        </View>
        <View style={styles.rowContainer}>
          <TypesCard
            title={'No damage from'}
            data={typeData?.damage_relations?.no_damage_from}
          />
          <TypesCard
            title={'No damage to'}
            data={typeData?.damage_relations?.no_damage_to}
          />
        </View>
        <InfosDropdown title={'Moves'}>
          {typeData?.moves?.map(item => (
            <View
              key={item.name}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 18, marginVertical: 3 }}>
                {capitalizeFirstLetter(item.name)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  fetchModalInfos(item.url, 'move');
                }}
                style={{ marginLeft: 10 }}
              >
                <Octicons name="question" size={22} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </InfosDropdown>

        <InfosDropdown title="Pokemons">
          {typeData?.pokemon?.map(item => (
            <Pressable
              onPress={() => router.push(item.pokemon.name)}
              key={item.pokemon.name}
            >
              <Text style={{ fontSize: 20, color: 'black' }}>
                {capitalizeFirstLetter(item.pokemon.name)}
              </Text>
            </Pressable>
          ))}
        </InfosDropdown>
      </ScrollView>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
    paddingTop: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
  },
  mainTypeIcon: {
    width: 60,
    height: 60,
  },
  gridContaienr: {
    width: 114,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  typeIcons: {
    minWidth: 32,
    maxWidth: 32,
    height: 32,
    marginHorizontal: 3,
    marginBottom: 3,
  },
  typesFlatlist: {
    flexGrow: 0,
  },
});

export default typePage;
