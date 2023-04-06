import {useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {colors, heightScreen, widthScreen} from '../../utility';
import RBSheet from 'react-native-raw-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Accordion from 'react-native-collapsible/Accordion';
import AccordionItem from '../../components/AccordionItem';

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
      content: [0, 1, 2, 3],
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
      </SafeAreaView>
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
      <View style={styles.map}></View>
      <Button
        title="OPEN BOTTOM SHEET"
        onPress={() => refRBSheet.current.open()}
      />
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
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  space: {
    height: heightScreen * 0.08,
    width: widthScreen * 0.05,
    backgroundColor: '#fff',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  map: {
    backgroundColor: colors.MAINCOLOR,
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
  content: {
    width: widthScreen * 0.85,
    alignSelf: 'center',
  },
});
