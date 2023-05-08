import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import RelatedPlace from '../../components/RelatedPlace';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselDetailItinerary, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from '../../components/CarouselDetailItinerary';
import data from '../../assets/data/dataCarouselBooking';
const DetailItineraryPlace = ({item}) => {
  const [see, setSee] = useState(false);
  const FirstRoute = () => (
    <View style={styles.viewDes}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.textDes} numberOfLines={see ? null : 6}>
          Mui Nghe is one of three mountains associated with the history of the
          formation of the Son Tra peninsula. The reason it is called Mui Nghe
          or Hon Nghe comes from the shape of the mountain like a sea lion lying
          with its head facing the rocky mountain, facing the sea. Mui Nghe Da
          Nang is famous as a beautiful sunrise spot and most ideal tourists
          should not miss when visiting Da Nang. It also has a very beautiful
          natural scenery, so it always attracts a large number of visitors to
          check-in every day...
        </Text>
        <TouchableOpacity
          style={styles.textSeemore}
          onPress={() => setSee(!see)}>
          <Text>{!see ? 'See more' : 'See less'}</Text>
        </TouchableOpacity>
      </ScrollView>
      <Text style={styles.textRelate}>Related Place</Text>
      <View style={styles.viewRelated}>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={({item, index}) => <RelatedPlace item={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          keyExtractor={index => index}
          horizontal
        />
      </View>
    </View>
  );
  const SecondRoute = () => (
    <View style={styles.viewComments}>
      <Text style={styles.textReview}>Review Summary</Text>
      <Image
        style={styles.viewSta}
        source={require('../../assets/images/thongke.png')}
        resizeMode="cover"
      />
      <Text style={styles.textReview}>All Reviews</Text>
      <View style={styles.viewReview}>
        <View style={styles.viewNameAvt}>
          <Image
            style={styles.imgAvt}
            source={require('../../assets/images/bana.jpg')}
            resizeMode="cover"
          />
          <View style={styles.viewNameStar}>
            <Text style={styles.textName}>Gracie</Text>
            <View style={styles.viewStarDay}>
              <View style={styles.star}>
                <FontAwesome name="star" size={17} color="#CFA332" />
                <FontAwesome name="star" size={17} color="#CFA332" />
                <FontAwesome name="star" size={17} color="#CFA332" />
                <FontAwesome name="star" size={17} color="#CFA332" />
                <FontAwesome name="star" size={17} color="#CFA332" />
              </View>
              <Text style={styles.textDay}>2 days ago</Text>
            </View>
          </View>
        </View>
        <Text style={styles.textComment}>Beautiful Smart Hello Em</Text>
      </View>
      <View style={styles.viewReview}>
        <View style={styles.viewNameAvt}>
          <Image
            style={styles.imgAvt}
            source={require('../../assets/images/bana.jpg')}
            resizeMode="cover"
          />
          <View style={styles.viewNameStar}>
            <Text style={styles.textName}>Gracie</Text>
            <View style={styles.viewStarDay}>
              <View style={styles.star}>
                <FontAwesome name="star" size={17} color="#CFA332" />
                <FontAwesome name="star" size={17} color="#CFA332" />
                <FontAwesome name="star" size={17} color="#CFA332" />
                <FontAwesome name="star" size={17} color="#CFA332" />
                <FontAwesome name="star" size={17} color="#CFA332" />
              </View>
              <Text style={styles.textDay}>2 days ago</Text>
            </View>
          </View>
        </View>
        <Text style={styles.textComment}>Beautiful Smart Hello Em</Text>
      </View>
    </View>
  );
  const renderScene = SceneMap({
    Description: FirstRoute,
    Comment: SecondRoute,
  });
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'Description', title: 'Description'},
    {key: 'Comment', title: 'Comment'},
  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            color: colors.BLACK,
            marginVertical: heightScreen * 0.01,
            fontSize: 20,
          }}>
          {route.title}
        </Text>
      )}
      indicatorStyle={{backgroundColor: colors.MAINCOLOR}}
      style={{backgroundColor: colors.WHITE}}
    />
  );
  const isCarousel = useRef(null);
  const [ind, setInd] = useState(0);
  return (
    <View style={styles.viewParent}>
      <View style={styles.viewCarousel}>
        <Carousel
          layout="stack"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          renderItem={CarouselDetailItinerary}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={1}
          useScrollView={true}
          onSnapToItem={ind => setInd(ind)}
          loop={true}
          activeAnimationType="spring"
        />
      </View>
      {/* <Image
        style={styles.img}
        source={require('../../assets/images/bana.jpg')}
        resizeMode="cover"
      /> */}
      <View style={styles.content}>
        <View style={styles.viewStar}>
          <Text style={styles.numberStar}>5</Text>
          <FontAwesome name="star" size={17} color="#CFA332" />
        </View>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={styles.viewDay}
        />
      </View>
    </View>
  );
};

export default DetailItineraryPlace;

const styles = StyleSheet.create({
  viewParent: {
    width: widthScreen,
    height: heightScreen,
  },
  img: {
    width: widthScreen,
    height: heightScreen * 0.3,
    backgroundColor: colors.WHITE,
    zIndex: 0,
  },
  content: {
    backgroundColor: colors.WHITE,
    width: widthScreen,
    height: heightScreen * 0.77,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: 'absolute',
    top: heightScreen * 0.23,
    zIndex: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.STRONGGRAY,
    paddingTop: 15,
    paddingHorizontal: 25,
  },
  viewStar: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.25,
    borderRadius: 20,
    backgroundColor: '#F6F1BD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthScreen * 0.07,
  },
  numberStar: {
    fontSize: 20,
    fontWeight: 600,
    color: '#CFA332',
  },
  viewDay: {
    flex: 1,
  },
  viewDes: {
    paddingVertical: heightScreen * 0.02,
  },
  textDes: {
    fontSize: 14,
    textAlign: 'justify',
    lineHeight: heightScreen * 0.033,
    color: colors.BLACK,
  },
  textRelate: {
    fontSize: 20,
    color: colors.BLACK,
    marginVertical: heightScreen * 0.02,
    fontWeight: 600,
  },
  textSeemore: {
    fontSize: 14,
    color: colors.STRONGGRAY,
  },
  viewComments: {
    paddingVertical: heightScreen * 0.02,
  },
  textReview: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.BLACK,
  },
  viewSta: {
    height: heightScreen * 0.15,
    width: widthScreen * 0.7,
    marginVertical: heightScreen * 0.015,
  },
  viewReview: {
    height: heightScreen * 0.12,
    width: widthScreen * 0.7,
    borderBottomWidth: 0.5,
    borderColor: colors.STRONGGRAY,
    marginTop: heightScreen * 0.02,
  },
  imgAvt: {
    height: 42,
    width: 42,
    borderRadius: 21,
  },
  viewNameAvt: {
    flexDirection: 'row',
  },
  viewNameStar: {
    marginLeft: widthScreen * 0.05,
    justifyContent: 'space-between',
  },
  textName: {
    fontSize: 18,
    fontWeight: 500,
    color: colors.BLACK,
  },
  star: {
    flexDirection: 'row',
    width: widthScreen * 0.25,
    justifyContent: 'space-between',
    marginRight: widthScreen * 0.03,
  },
  viewStarDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDay: {
    fontWeight: 400,
    fontSize: 14,
    color: colors.STRONGGRAY,
  },
  textComment: {
    marginTop: heightScreen * 0.015,
    fontSize: 14,
    color: colors.BLACK,
  },
  viewRelated: {
    height: heightScreen * 0.14,
  },
  scroll: {
    maxHeight: heightScreen * 0.32,
    width: widthScreen,
  },
  viewCarousel: {
    width: widthScreen,
    height: heightScreen * 0.3,
    zIndex: 0,
  },
});
