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
  ScrollView,
} from 'react-native';
import {colors, heightScreen, widthScreen} from '../../utility';
import RBSheet from 'react-native-raw-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Accordion from 'react-native-collapsible/Accordion';
import AccordionItem from '../../components/AccordionItem';
import AccordionItemWeather from '../../components/AccordionItemWeather';
import ItineraryPlace from '../../components/ItineraryPlace';

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
    <ScrollView style={styles.viewParent}>
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
        <Feather name="search" size={28} color={colors.WHITE} />
      </TouchableOpacity>
      <View style={styles.viewPopular}>
        <View style={styles.viewTour}>
          <Text style={styles.textTour}>Tour details</Text>
          <Text style={styles.priceTour}>$500</Text>
        </View>
        <View style={styles.viewDay}>
          <View style={styles.viewDay1}>
            <Text style={styles.textDay1}>Day 1</Text>
          </View>
          <View style={styles.viewDay2}>
            <Text style={styles.textDay2}>Day 2</Text>
          </View>
        </View>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={({item, index}) => <ItineraryPlace item={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
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
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 5,
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
    </ScrollView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  viewParent: {
    height: 2 * heightScreen,
    width: widthScreen,
    backgroundColor: colors.WHITE,
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
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: colors.MAINCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    bottom: heightScreen * 0.03,
  },
  buttonSee: {
    alignSelf: 'flex-end',
  },
  textSee: {
    fontStyle: 'italic',
    color: colors.MAINCOLOR,
    fontWeight: 500,
  },
  viewPopular: {
    width: widthScreen,
    alignItems: 'center',
    marginTop: heightScreen * -0.075,
    marginBottom: heightScreen * 0.1,
    padding: 15,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  viewTour: {
    width: widthScreen * 0.85,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textTour: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  priceTour: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.GREEN,
  },
  viewDay: {
    width: widthScreen * 0.38,
    flexDirection: 'row',
    marginVertical: heightScreen * 0.02,
    justifyContent: 'space-between',
  },
  viewDay1: {
    width: widthScreen * 0.13,
    borderBottomWidth: 2,
    borderColor: colors.MAINCOLOR,
  },
  viewDay2: {
    width: widthScreen * 0.13,
  },
  textDay1: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.MAINCOLOR,
  },
  textDay2: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.STRONGGRAY,
    textAlign: 'right',
  },
});
