import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CommentItem = ({item}) => {
  const [see, setSee] = useState(false);
  return (
    <View style={styles.viewReview}>
      <View style={styles.viewNameAvt}>
        <Image
          style={styles.imgAvt}
          source={{uri: item?.profile_photo_url}}
          resizeMode="cover"
        />
        <View style={styles.viewNameStar}>
          <Text style={styles.textName}>{item?.author_name}</Text>
          <View style={styles.star}>
            <FontAwesome name="star" size={17} color={colors.YELLOW} />
            <FontAwesome name="star" size={17} color={colors.YELLOW} />
            <FontAwesome name="star" size={17} color={colors.YELLOW} />
            <FontAwesome name="star" size={17} color={colors.YELLOW} />
            <FontAwesome name="star" size={17} color={colors.YELLOW} />
          </View>
        </View>
      </View>
      <View style={styles.viewText}>
        <Text style={styles.textComment} numberOfLines={see ? 4 : 2}>
          {item?.text}
        </Text>
        <TouchableOpacity onPress={() => setSee(!see)}>
          <Text>{see ? 'See less' : 'See more'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  viewReview: {
    width: widthScreen * 0.8,
    borderBottomWidth: 0.5,
    borderColor: colors.STRONGGRAY,
    marginVertical: heightScreen * 0.01,
    marginLeft: widthScreen * 0.1,
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
    marginBottom: heightScreen * 0.015,
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
  textDay: {
    fontWeight: 400,
    fontSize: 14,
    color: colors.STRONGGRAY,
  },
  textComment: {
    fontSize: 14,
    color: colors.BLACK,
    textAlign: 'justify',
  },
  viewText: {
    justifyContent: 'center',
    width: widthScreen * 0.8,
  },
});
