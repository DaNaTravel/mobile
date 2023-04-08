import {useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import {colors, heightScreen, widthScreen} from '../../utility';
import RBSheet from 'react-native-raw-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Accordion from 'react-native-collapsible/Accordion';
import AccordionItem from '../../components/AccordionItem';
import AccordionItemWeather from '../../components/AccordionItemWeather';

const HomeScreen = () => {
  const refRBSheet = useRef();
  const [activeSection, setActiveSection] = useState([]);
  const SECTIONS = [
    {
      title: 'Place to visit',
      content: [1, 2, 3, 4, 5, 6, 7],
    },
    {
      title: 'Weather forecast',
      content: [1, 2, 3],
    },
  ];

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <FontAwesome name="angle-down" size={30} color="black" />
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };
  _renderContent = section => {
    return (
      <>
        {section.title === 'Weather forecast' ? (
          <SafeAreaView style={styles.contentWeather}>
            <FlatList
              data={section.content}
              renderItem={({item, index}) => (
                <AccordionItemWeather item={item} />
              )}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              horizontal
              scrollEnabled={true}
              keyExtractor={index => index}
            />
          </SafeAreaView>
        ) : (
          <SafeAreaView style={styles.content}>
            <FlatList
              data={section.content}
              renderItem={({item, index}) => <AccordionItem item={item} />}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              horizontal
              scrollEnabled={true}
              keyExtractor={index => index}
            />
            <TouchableOpacity
              style={styles.buttonSee}
              onPress={() => console.log('See itinerary detail!')}>
              <Text style={styles.textSee}>See details</Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}
      </>
    );
  };
  return (
    <View style={styles.viewParent}>
      <View style={styles.viewHeader}>
        <View style={styles.space}></View>
        <Text style={styles.textTitle}>Your trip</Text>
        <TouchableOpacity onPress={() => console.log('see more')}>
          <Feather name="more-horizontal" size={24} color={'#222222'} />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.map}
        source={require('../../assets/images/map.jpg')}
      />
      <TouchableOpacity
        style={styles.buttonBottom}
        onPress={() => refRBSheet.current.open()}>
        <Text style={styles.textButton}>Touch to see your itinerary</Text>
      </TouchableOpacity>
      <View style={styles.viewPopular}>
        <Text style={styles.textPopular}>Some popular places</Text>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={({item, index}) => <AccordionItem item={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          keyExtractor={index => index}
        />
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="slide"
        openDuration={400}
        height={heightScreen * 0.5}
        dragFromTopOnly={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderWidth: 1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}>
        <Accordion
          sections={SECTIONS}
          activeSections={activeSection}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={section => {
            setActiveSection(section);
          }}
          underlayColor={'transparent'}
          touchableComponent={TouchableOpacity}
        />
      </RBSheet>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  viewParent: {
    height: heightScreen,
    width: widthScreen,
  },
  viewHeader: {
    height: heightScreen * 0.08,
    width: widthScreen,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  space: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.05,
    backgroundColor: colors.WHITE,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  map: {
    height: heightScreen * 0.5,
    width: widthScreen,
    borderWidth: 0.5,
    borderColor: '#000',
  },
  header: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.85,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 600,
    color: '#000',
    marginLeft: widthScreen * 0.05,
  },
  contentWeather: {
    width: widthScreen * 0.85,
    height: heightScreen * 0.3,
    alignSelf: 'center',
  },
  content: {
    width: widthScreen * 0.85,
    height: heightScreen * 0.17,
    alignSelf: 'center',
  },
  buttonBottom: {
    height: heightScreen * 0.06,
    width: widthScreen * 0.5,
    borderRadius: 20,
    backgroundColor: '#2B688C',
    marginVertical: heightScreen * 0.03,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textButton: {
    fontSize: 13,
    fontWeight: 600,
    color: colors.WHITE,
    textAlign: 'center',
  },
  buttonSee: {
    alignSelf: 'flex-end',
  },
  textSee: {
    fontStyle: 'italic',
    color: colors.MAINCOLOR,
    fontWeight: 500,
  },
  textPopular: {
    fontSize: 18,
    fontWeight: 500,
    color: '#000',
  },
  viewPopular: {
    height: heightScreen * 0.3,
    width: widthScreen * 0.85,
    alignSelf: 'center',
  },
});
