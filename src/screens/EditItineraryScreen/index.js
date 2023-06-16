import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import DayItem from '../../components/DayItem';
import SortableListComponent from '../../components/SortableList';
import {colors, heightScreen, widthScreen} from '../../utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {AxiosContext} from '../../context/AxiosContext';
import {GenerateItiTest, UpdateItiTest} from '../../apis/itineraries';
import {useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import HotelItems from '../../components/HotelItems';
import {SearchLoca} from '../../apis/search';
import LottieView from 'lottie-react-native';

const dataHard = [
  {
    _id: '64742bec9a86f189a3bfe52a',
    name: 'Nhà Thờ Lê Văn Tộc',
    weekday_text: null,
    overview: null,
    formatted_address:
      '39 Văn Cận, Khuê Trung, Cẩm Lệ, Đà Nẵng 550000, Vietnam',
    latitude: 16.0357425,
    longitude: 108.2117757,
    photos: null,
    rating: null,
    reviews: null,
    types: ['church', 'place_of_worship'],
    user_ratings_total: null,
    cost: 0,
    stayTime: 60,
  },
  {
    _id: '64742bed9a86f189a3bfe52c',
    name: 'Ribo Coffee',
    weekday_text: [
      'Monday: 6:30 AM – 10:30 PM',
      'Tuesday: 6:30 AM – 10:30 PM',
      'Wednesday: 6:30 AM – 10:30 PM',
      'Thursday: 6:30 AM – 10:30 PM',
      'Friday: 6:30 AM – 10:30 PM',
      'Saturday: 6:30 AM – 10:30 PM',
      'Sunday: 6:30 AM – 10:30 PM',
    ],
    overview: null,
    formatted_address:
      '05 Thái Thị Bôi, Chính Gián, Thanh Khê, Đà Nẵng 550000, Vietnam',
    latitude: 16.0682715,
    longitude: 108.2011952,
    photos: [
      {
        photo_reference:
          'AZose0moPOlalx-fgomoR6ejQPRlnHwyR43waFWs7-bA27oGzblb2Su36MOiSfb3NokpWx3fwQEfJAJxggbR-WxpLUelp3TWx4BuouUT9nN7Ve5rU1vXeoxtIwNWqIRaQo9qkzld2S9zxl3-u0GtIhK5hGCcuThIJYg_HqjcX1pgRoueW63m',
      },
      {
        photo_reference:
          'AZose0m0k1y9BlrUlXQghppzSQKdCqL5zWfw5Wk7j1qziM8C7EiKu9P29fSrdxEHIAZgwyUcBKdOa7F3nRoCbgHaPakP8Vpio_hf64E5zODhjJWPuYTmgBTJS9xuxMLSOWZgC0UZg6Z4q_tjBDh3ZX9GqZVOjADL1ahDx_ojIQeaazxCGVTw',
      },
      {
        photo_reference:
          'AZose0kLbpT1RdximdplBvvJIRJVxIcCQ0t4w9Cc7yA9VTB1raiaKU7rw9SBBiFaZ7kN-UL7AXxYrA8dJ_RHqFGAa3nouc5elSCraw71q3WXjFCJc7lg6qSY0lOHrsl9ToK7y99anMU-dVXve4NPZLkHROsO25tvRymjsXRfahY884Lxm-jg',
      },
      {
        photo_reference:
          'AZose0msRp3GwgW8cpk7wPCmzV_243DAaMJEkcmLGLwBovBZLIBAzPNd6oyux7toskooeYw9AOPqnGtQz1bcCeVwrMtXRbL0BwmEzSavTpQ3Nk1okAvrEFM6vt4kFeinV88KyTD5L90pRdRhtK8f1-Bt6QqYRoGX6uaURsi99T8rusNntPqk',
      },
      {
        photo_reference:
          'AZose0kAzzcOaNTb8dtPftYIsdDmVrsEuoibMJWjbjUoNEE31eKBxFSqnRpesWsoO72N9hWWFeGSjSwnT2WLcLbzQLA-AHL1q62BaiKxDam7BcSnq68oDJHcdzNT6wWYVsLcmQ3Vszbf1EBBuxGVTmjmqX_LmjiwGNh5PlmJ3WKPsMFKNtHZ',
      },
      {
        photo_reference:
          'AZose0kbt7QZZKiK_MLEO2mhJuPWEkWZ-nMfxKOGxsw0DdAtN30Ekm1snzGwDso7Buf6hEMXd_ydSdQKxcdDhoCzPE6m5b1YAOndSQQnAz8cA2Uedhm_p_436fM3MSddgzNDv4Jh-W6c0JN52STx-TwqlzPsBc4KXRRq1p9BZK8xFO-NIjZn',
      },
      {
        photo_reference:
          'AZose0n1QGEWJfzZSTaQJg6JCoHEx-wqquyvYhyou5dI-fq9qKWPMJrxQZ9yiUrqptw7vJY-45oCdkQ0boAn95Zn3dn94QTcc4DzcCt-Xtcv0qs1N5TCR2zlKCGZYw7s47p8jAItopsE3SpZinNQYyaP74P1JO_lCNnvpT6-C4BINxIhsDlQ',
      },
      {
        photo_reference:
          'AZose0lLjAQx2KNezmC26ygyoWGoCvEe-3AULiO5GkT1e1wwjb-roE6l2bDbChCEShL8wvG8i4pv_cjaPde1u8hOTuxL-U2mmGHcqNJN2fmOPaE3WsMFi42Qp-t4JeBi8qSQWOxrUcMLeOiYQZpjeaLLaqWQgxNSwUKkZ5DLZWHugbM4wsOS',
      },
      {
        photo_reference:
          'AZose0lYOBn1fCvBGGS5k-l9dKnG85m6HIEQM5Z2sykKgPDciusm8Vqj5ZHVo1rZQ_zizIt8iMkibCMkXxc-vJSUzf4tzSe0po3jGbOpSIAqKfSNHUFbGDx0sHuQOG9ulaqvj6OLcfiQ4WYJqiKqZ3SxaVS_AZ9u1OkV9wkNCnBnU2SO9Xx5',
      },
      {
        photo_reference:
          'AZose0mvN_2I4AQrtSBG4GGEc-PthxszHjjfOXQ4G_wHQHBOZrdBItSjLd_dZViSrwu0i_fducVKdlFy9qcPMUaBxXbA_I6xqjvezmDjIjH24YMkTCMwVlP43hn1XbeCPY_eJr9idpAMS9trrFWbAn2KiOWsRADftuB4E4YdmUasGwaZjEsb',
      },
    ],
    rating: 4.1,
    reviews: [
      {
        author_name: 'Greg Sharpe',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMRYUi5XN3K4Qut70g5jIHOosw4gVQ14aCtGt1WfIwg=s128-c0x00000000-cc-rp-mo-ba7',
        rating: 4,
        text: 'Nice decor and good coffee. Some quiet spots upstairs, a koi pond and water sounds downstairs, and interesting art all around. The place to chill or chat!',
      },
      {
        author_name: 'Joshua Mayhew',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMRC9IFvzwMwpDfi--I_QdlWeMURuxqNq6HWkbX7J6U=s128-c0x00000000-cc-rp-mo-ba4',
        rating: 5,
        text: 'Nice, hidden gem. Lush green interior with koi pond and plentiful seating',
      },
      {
        author_name: 'Spiegel P',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a/AAcHTtcAalRvINHFwIY-Yn09icKXylDT5vG6cQb8mr1ca8k=s128-c0x00000000-cc-rp-mo-ba5',
        rating: 5,
        text: 'Love this place. Loads of water features and fish, free ice tea, great coffee, and cheap!',
      },
      {
        author_name: 'Tín Nguyễn Quang',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMT-XUFP8QeZzObgyyWJSP_E5_UwqwaLUoPWdouV8A=s128-c0x00000000-cc-rp-mo-ba3',
        rating: 5,
        text: 'The coffe have beautiful decor and beverages are good',
      },
      {
        author_name: 'KẾ TOÁN NGÂN VIỆT',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMTtyn_7aleDnvFDmQbfa25vcaA0PoCZuoVVPAh6vw=s128-c0x00000000-cc-rp-mo-ba4',
        rating: 5,
        text: 'Ok',
      },
    ],
    types: ['cafe', 'food'],
    user_ratings_total: 307,
    cost: 75000,
    stayTime: 90,
  },
  {
    _id: '64742bee9a86f189a3bfe52d',
    name: 'Mì Quảng Thi',
    weekday_text: [
      'Monday: 6:00 AM – 1:29 PM, 4:00 – 9:00 PM',
      'Tuesday: 6:00 AM – 1:29 PM, 4:00 – 9:00 PM',
      'Wednesday: 6:00 AM – 1:29 PM, 4:00 – 9:00 PM',
      'Thursday: 6:00 AM – 1:29 PM, 4:00 – 9:00 PM',
      'Friday: 6:00 AM – 1:29 PM, 4:00 – 9:00 PM',
      'Saturday: 6:00 AM – 1:29 PM, 4:00 – 9:00 PM',
      'Sunday: 6:00 AM – 1:29 PM, 4:00 – 9:00 PM',
    ],
    overview: null,
    formatted_address:
      '251 Hoàng Diệu, Nam Dương, Hải Châu, Đà Nẵng 550000, Vietnam',
    latitude: 16.0585457,
    longitude: 108.2172243,
    photos: [
      {
        photo_reference:
          'AZose0k1Qh-vUiEAWv33-RZUwshtuFLJNuiTKcVhfpX6xoMEJEsbw_nTvq-WF5OXUpBrL3pQq_jotmUAENU2p1jxqcWt53uRgrSVDvCnH0rP3B-qP1ZRUN4Tm85Y8NXCsnGr1uIhN6UUCWRZfD_QXOEgoY_JeltlOWzmIAhIq_y2aFzyIbeI',
      },
      {
        photo_reference:
          'AZose0lyGbizrfm131X3FBy5e8hOFBDOmp9vrEsmUo3I1KU2-ldOtI-WZpYbxKUkxgBZzNsEP3ECLKciotjgxGMsNWavGpfgGbnoLekadKacgS62iocNgv64CeyOK-MUrz81A17BwMAJvUAyuUsZ39E2gbeodlWpboWYq5CGPeD_8EwF_5Li',
      },
      {
        photo_reference:
          'AZose0l5ZbruK9KbzOgc25BE41Jbue3Anlmnl5rMrGMQIBzerIbzGERO3WijaEHredzDuGXpxhBR4GUKmmVg7Xa2tGxIkAbab0U0EWTMrw8k7VJilwgAUms2N0hB8mUOj8nOY6-8YLWk2RhDvSIymtKw0k576GFRGxT1PYJFh-87wTCXYQpx',
      },
      {
        photo_reference:
          'AZose0m-CnhoY36nSjuTDVs9ZnZ5jdE2WlttyRt3Ve5HReTbXWF1FCk7yqhBcAKLCMEfH1KbRuxgj_bz36pTGCF90cbntd9VzsBLX5fdF5SM4_b2MuB2_lnNEnDEvW4VCb8t5glZNBwJI20hFlmkMxxc3ZoptEknu0duu4oGm2NTCMv9X4MD',
      },
      {
        photo_reference:
          'AZose0nLNZ83zOBt-qYpeiQ4X8uWbwF2RcJ8UnL1YqvwroWCEaB2Vbvb0pIuZs5zy5FVhO0MOeI57kaV4i0mOxyVnAwIPdLL1LUfLmTI48UTwJHZ-MKopxZ2CS42nLIPQPkK5eFI8WzVMXrzPYql7aLxl84SCE5GiE5bXMaMJx6iAmLpKNIk',
      },
      {
        photo_reference:
          'AZose0nZC1V90cS7t755kv00gZS5nHGsrDTLuGuU7LoudDZfJcPzvHoVsdtBy1DXksrkH9U1BklYA9D-abOQ_bTamva-XpVQ4nk8y9PRUOkuZUGTFDemk6ii8j2HF52ygXXGm6oLdrD5TE0gm1xb2PmNZY_kANgCpPazOtEprasVjON7SX4c',
      },
      {
        photo_reference:
          'AZose0kqW9IuWeHLEg5bz2-YkL3NKue5pZTCXm-fRPitn8-vc3ua_tbRMRjTbkyebCmHD9LiqpQQUR9UP4GKQj9i_dWyu_DbsJziN_kIz6tKjP59UKR0oAH75rirurMja4QVKbekhP_EX6dKiCVhuYE-76uY9Ssj7_NPScTz8Pyo5dQVYrg4',
      },
      {
        photo_reference:
          'AZose0kWMeq7dUR9b1P8NGP8lDHM8ISLwBaqe0LTvu8VZglsi4jZjs-ODPT0p7znVBfgeCKtxsGgZ8swkFsRgbu5FKn6L66V4f_b-Nuv7U63HCr4E0kSn4-D7SYgkx7yYKgXjQFAp8L1kaafRq_iDGT6y5wq3PIWeyqA3XNTAtqqYZCNqG3V',
      },
      {
        photo_reference:
          'AZose0nkO9dIu2nqug0EvXUyueNt8tT6g5fOq208aRyT5VfwJ4znSt7yWeMtGS4nrMvLNNgDO9B6ppiBxH5l6Q4vCBWma-K9UJluKZeemHzXeht7RpJp1OzuucTYQWpxnoazovCLB637xzV6Uw8Al1c3SocHNWfwNJLER9otaHjygymJg5zY',
      },
      {
        photo_reference:
          'AZose0mx22kgTuFBqGmw5wLvbGOpKHz6yPAws19-wNNxfvYqWEqIDv0BEAGeg1zbt12TWNo-KMZbS3Om152_34HUOpN3rijKmaLBiUhU77q-KXBIs5NNul8VzdolwLjM_ZoisED2RK72pUENouxsPqqYKw4uWZSVLa2ZXPY3f_Y5RmTx-0OA',
      },
    ],
    rating: 4.3,
    reviews: [
      {
        author_name: 'abin joseph',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMS39T4U31XP3TF_KpyJ6j_5henZUAgTgi87CqM34A=s128-c0x00000000-cc-rp-mo-ba3',
        rating: 5,
        text: "Awesome food.  I'll rate 8/10.. I ordered Mi Quang Ga and it's just as I expected.  And costs are comparatively cheaper..30k VND is 10/10 for what I ordered.  Will definitely go there again.  :)",
      },
      {
        author_name: 'Lukas Rambousek',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a/AAcHTtcLialdayKWvqFqYA52p3xjTAXe5uN0Q_1pK4-G=s128-c0x00000000-cc-rp-mo-ba4',
        rating: 5,
        text: 'So happy to find this place. Had the one with pork and shrimp and also one with chicken. One bowl costs only 20k. That is super cheap for the portion you get. Bowl contains rice noodles, peanuts, quails eggs, super tasty broth, lettuce, herbs, banana blossom. Just squeeze little bit of lime juice in it and enjoy!!! Oh and don’t forget to order grilled rice paper to add some crunch to your meal. Can’t wait to go back!',
      },
      {
        author_name: 'Nguyen Truc',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMRdn_mnWEgrj0O5qARn1EFumh_fuvxKutsHejvf=s128-c0x00000000-cc-rp-mo-ba3',
        rating: 5,
        text: 'Great authentic Mỳ Quảng. 10/10 would recommend getting the Mixed one so you can try their whole menu',
      },
      {
        author_name: 'Mario Pham (Nhân)',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMQv3O7_gjsiORtULmqwN9__JigVjh4QJMcp3JDyRZM=s128-c0x00000000-cc-rp-mo-ba5',
        rating: 3,
        text: 'Not as expected, I can get a very nice bowl of Quang Noodles in hcmc\nCost me 55k for a bowl & 5k dong for pancake',
      },
      {
        author_name: 'Dennis G',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a/AAcHTtdqyyA6TvukbF4ZH39wnfEeBI1r7MHt2UiMAAuR=s128-c0x00000000-cc-rp-mo-ba3',
        rating: 5,
        text: 'Tasty, don‘t expect the owners to speak much english (menu is in english). Tasty Food and reasonable prices',
      },
    ],
    types: ['restaurant', 'food'],
    user_ratings_total: 311,
    cost: 50000,
    stayTime: 75,
  },
  {
    _id: '64742bee9a86f189a3bfe52e',
    name: 'Quán Ăn Cô Triều Đại Lộc',
    weekday_text: null,
    overview: null,
    formatted_address:
      '216 Âu Cơ, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng 550000, Vietnam',
    latitude: 16.0707348,
    longitude: 108.144132,
    photos: null,
    rating: 5,
    reviews: [
      {
        author_name: 'Văn Hưng Lê',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMTtcY6rRY6ROCJqCyOtlCKr1KJLricxJqFpGdDR=s128-c0x00000000-cc-rp-mo',
        rating: 5,
        text: '',
      },
    ],
    types: ['restaurant', 'food'],
    user_ratings_total: 1,
    cost: 100000,
    stayTime: 75,
  },
  {
    _id: '64742bee9a86f189a3bfe52f',
    name: 'Heo Quay Ông Tỵ',
    weekday_text: null,
    overview: null,
    formatted_address:
      '538 Trần Cao Vân, Xuân Hà, Thanh Khê, Đà Nẵng 550000, Vietnam',
    latitude: 16.0713129,
    longitude: 108.1943244,
    photos: [
      {
        photo_reference:
          'AZose0lbthfGQUujxcmP8hLtD99fswSy-LikJ0kWfyquEi1RxkzNHBGPBU5qkgMGYwuaR2R2DOgPng48_HWTSrtAms56Z_1Omaqpq16tfLIiL_F9hX0uUEcz34kJV_fJ8IHuBbWIOnVxnPEpfc87aXDpMAzIWvLz7gZgn4NwfSPg6QvoKR4p',
      },
    ],
    rating: 5,
    reviews: [
      {
        author_name: 'Ái Nguyễn',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMRC8kKxKWuzUVCDg74FU4o9ubc1ayuONKGaOXO1=s128-c0x00000000-cc-rp-mo',
        rating: 5,
        text: 'Delicious meat with characteristic marinated spices, delicious dipping sauce',
      },
      {
        author_name: 'Tuấn Nguyên Thanh',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMTG6n_6y6i9ouTM0ZVTRvaC3WCabffXsSLsyDXrXFA=s128-c0x00000000-cc-rp-mo',
        rating: 5,
        text: 'Delicious pork, crispy skin, cheap price',
      },
    ],
    types: ['food'],
    user_ratings_total: 2,
    cost: 150000,
    stayTime: 105,
  },
  {
    _id: '64742bee9a86f189a3bfe530',
    name: 'Cây Đa Ngàn Năm',
    weekday_text: null,
    overview: null,
    formatted_address: 'Bán đảo, Thọ Quang, Sơn Trà, Đà Nẵng, Vietnam',
    latitude: 16.12255,
    longitude: 108.3317036,
    photos: [
      {
        photo_reference:
          'AZose0ko50xlZhgK_6zw5sEBz76nYtcuYrRWRL_jSgbQSSvH_BjNGTTi7JzcapMskwWdH0Pg9HMMqCtzgi7JSruE-Z4Nu4WyD421fLMmhHkr5QLKkhoIV9eEHUWikJu4xRLLviddXqydlEMuLdi3OOnwfjY2q5V7ZfwtkLJTOQ1kPApyDiB0',
      },
      {
        photo_reference:
          'AZose0l8imQ5bVINpAq8PUdF3VPVj3j7ouC2l27RAkqagNDt1OmWBX_v5kyCRFPuYwcibHuzE_5wV6l5oolHu1dkzDef127e12qxp_dBPqobos9IbdvoF6SI0SM8MOarDn2zE4CaQAyRC8vvH8occcsXNI5XxM7yZY_dKWW1r5OqCUYIMI6L',
      },
      {
        photo_reference:
          'AZose0ng5lTAB53vD1XGqLh0vW60Dmp7NxqmIhN4LFnkPzk-MFcfXDI4dELJQTvYrz1GYlb-PEDCXQw3tJXftSmG54D_0GzEW6cjTf6LcduZQNatXXv48vXvyxIsoILqiI8ioP-7A_LGEQyaPsJ7TpMGpkvHw6Ms8nrtyrxM8ZV2x2utT8Gg',
      },
      {
        photo_reference:
          'AZose0mi5GERYmkmVO-R2HarXWoV6S_PhY3F6Fjp-Mb1Uf37lgZbez3RzYvnlfN37IuJ_kGf-KH594PDVjeEjmCgwAFkwFQXoSLmbCkbYQlyRTsNIk2_QWwwlO0eXVW143Z_EuoBUSaSDPR3st-7eW_LdJiSLlAGCUde4GbLLL6nnRZnub7_',
      },
      {
        photo_reference:
          'AZose0lfPBG4Px0_lA4iKtKUzV0jpfopPh0KFb4D-K4-X0WjdDOVlbb4jsB9CSVbOt-9RCraCxmuFHrMeXJBQNQDsNzCnpAyP53JHIm3J6283fMDS9KhPsuEycZJ66Qga1Tj9jlv9hjYQn0fFt0jwVc2sMqI4xolNZgQnF26wpQZoF2-yrTa',
      },
      {
        photo_reference:
          'AZose0kW44BeKFTWuThXgCXkFQMM1QTTOAR4mdgS5hxoocCFTJzZhJrdovdly8vmiEnuiS0Hp-3yzPFGWfyFYBq-gGOc0oOHN9FZABm7ML9TEo-ZcCxTGH38zqyKm1SIFf917q9BaEWNyD0i_LId7arT5cvFUQ1r5DaPRMG3VqDZlpGCfLhs',
      },
      {
        photo_reference:
          'AZose0mUfBxCzEtjaUULH9I3mfH2Pv4uk3WxM8K3XTk66e_BBqiz1IF3fsLhIdfiBzD-zDYfYTPKKXM8wORh2EOy6YTvEUsdvSLbXKr-QMvbRRQi7WD_VO37XtGBQDqD9HJ-OYfOPdXeCLiP3cRFrYc-fz4xm5Iu78h9FjPE8ASaIlXKsWWu',
      },
      {
        photo_reference:
          'AZose0kecfGa4EEXkRrEjGLPgzYNzRwv39rY5TjP5JGyIMOMyw-JC99zFRSLFd6R6D5odAW5KJvtuphGvZ-vqWyImx8ejOikH8D8D6rJ2tYu4bbhletqvFptdLrd1gi5h7tu6d-WAkak3TQwnxY64nZiQaO-EqcJ2Dsr2671iIyslfHw-_uq',
      },
      {
        photo_reference:
          'AZose0lHQ5sM7ctiPSR1NfSbDYdKO0xdn14hcFSGhXbF5v6vjV2CI8YZYm8bkk9FiYSZhI8e1h7cYLAhl_z4vBkhuuI8wGQnT9sLcQ7CjfaVLT7n_ncCNo3zeXGClUFYzafjIcnH9AVnAgrl949VHoNdWQR3iZ14B6_rVz8rhvPnxE1T__Xq',
      },
      {
        photo_reference:
          'AZose0ndGKR1ji6WenmlvbiIIhfzJz-7yAx4-2osKP_HIgJH6HGeqFPZX6efvZzhdPs8_RDHtewdb8DtzEDb4F96GtLPKRlCkxEL1EMhCIBIzgZtiOvcz_AMoV6kMZr8o2XxNBDNGGtSu1RRt20a1EWRsvM4LNHasIqNAr4cNNNwpMuJik5G',
      },
    ],
    rating: 4.7,
    reviews: [
      {
        author_name: 'Cronje',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMSizSxlrPSgFSGPnOkpueSabik8wye0ooFmuiQmag=s128-c0x00000000-cc-rp-mo-ba3',
        rating: 5,
        text: 'Grand old tree. The place is accessible by 7 seater cars, but keep in mind that the road is steep and narrow, you can only turn back at the end of it. Drive carefully!',
      },
      {
        author_name: 'Roy Kok',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMSeVmzWWH3y8QgJnkmGU_1MICyF7HCVE-4ZLpaW0A4=s128-c0x00000000-cc-rp-mo-ba5',
        rating: 5,
        text: "We have totally calories burnt 🥵\nFirstly, you have to pass through Son Tra Intercon after that ride further in to the small road on the right and going straight up. Please be cautious the road is rather stiff up by 17° gradient constantly about 1km, so it will be rather dangerous by going up and down hill for sure so that's riding skill and endurance is challenging to your maximum.\nNevertheless, you'll be rewarded by the amazing natural scene of Bayan heritage tree which existence with 800 years old, it's really worth to go once even though it's tough.\nGod blessed I still capable to take this challenge and experience it.\nTips:\n1. Going up by zigzag riding.\n2. Lower your saddle before going down hill.\n3. Winter is the best time to visit.\n4. More training before challenge it.",
      },
      {
        author_name: 'Trung Nguyen Thanh',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMRe3zeYinquFqz2uLXGuFxVAvv_LzoQTlD6ZmxXqw=s128-c0x00000000-cc-rp-mo-ba4',
        rating: 5,
        text: 'Majestic ! I have never seen it before.\nRespect for mother of nature.\nLove and peace.',
      },
      {
        author_name: 'Helen David',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMRMDtxG2G6ZUHDmYQI7MH36yJ6Qav8r4JPD2dQrsA=s128-c0x00000000-cc-rp-mo-ba3',
        rating: 5,
        text: 'The thousand-year-old banyan tree is located on the eastern edge of the Son Tra peninsula, belonging to the 63 reserve, 2.0 km from Nghe cape, 11 km from Linh Ung pagoda, the road is quite dangerous with winding slopes on one side of the mountain. immense rocks, one side is the immense sea. Therefore, the banyan tree has become an attractive tourist destination in Da Nang for backpackers who want to conquer this dangerous road.',
      },
      {
        author_name: 'Robert Kramreiter',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMRyt6-X1I4PCxu6nzCHqVHksKPGXKqnGSbdIef0yKk=s128-c0x00000000-cc-rp-mo-ba7',
        rating: 5,
        text: 'Wonderful place to stay and see the beautiful banyan tree. You can sit there and have some drinks but they dont serve beer.',
      },
    ],
    types: ['tourist_attraction'],
    user_ratings_total: 320,
    cost: 0,
    stayTime: 60,
  },
  {
    _id: '64742bee9a86f189a3bfe531',
    name: 'Cà Phê Amigo',
    weekday_text: null,
    overview: null,
    formatted_address:
      '23 Nguyễn Hữu Thọ, Hòa Thuận Nam, Hải Châu, Đà Nẵng 550000, Vietnam',
    latitude: 16.0554667,
    longitude: 108.2085937,
    photos: null,
    rating: 5,
    reviews: [
      {
        author_name: 'Viết Phước',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMQ6ogwAlXsh-v5KruyhObXz2CVFKdjtdVXtcRUqFg=s128-c0x00000000-cc-rp-mo-ba3',
        rating: 5,
        text: 'OK',
      },
    ],
    types: ['cafe', 'food'],
    user_ratings_total: 1,
    cost: 50000,
    stayTime: 60,
  },
  {
    _id: '64742bee9a86f189a3bfe532',
    name: 'Cà phê Phương Nguyên',
    weekday_text: [
      'Monday: Open 24 hours',
      'Tuesday: Open 24 hours',
      'Wednesday: Open 24 hours',
      'Thursday: Open 24 hours',
      'Friday: Open 24 hours',
      'Saturday: Open 24 hours',
      'Sunday: Open 24 hours',
    ],
    overview: null,
    formatted_address:
      'Lữ đoàn, 161 cảng tiên sa, Thọ Quang, TP, Đà Nẵng, Vietnam',
    latitude: 16.121721,
    longitude: 108.2193993,
    photos: [
      {
        photo_reference:
          'AZose0kTVCf6qUihOZbiWyfezzq-6nPXiE6mi4pWJj6Zv8oSd543OvqQ2Mey2c2ECLKvsnyswnDbZpbDF5zFljwOw0k2jYe_LQjVZNIFAsNblUIQFoDxx9PSrXelK7hwhmxsUMqXrtcCooXKGjItJrVDUC_EySGdjXB-_Xu1WlPBG_RrghAa',
      },
      {
        photo_reference:
          'AZose0kx3JbGzuTiJDagr2AGcU7b4Lgt2egVYnVIMKy_Fq3VrX2umNSRExFPizNJpzR4f63BOiyP0OxArjR5pfQbGCa8lLXzClT_Icl38zBUbC1AYDwkmbpFDfeGHVsPhkUoBsGsuo2DhStiNGgrVX8kw2YWZEi3CP4OKJbtZ0BsmzK67ky0',
      },
    ],
    rating: null,
    reviews: null,
    types: ['cafe', 'store', 'food'],
    user_ratings_total: null,
    cost: 50000,
    stayTime: 60,
  },
  {
    _id: '64742bee9a86f189a3bfe533',
    name: 'Chùa Linh Ứng',
    weekday_text: [
      'Monday: Open 24 hours',
      'Tuesday: Open 24 hours',
      'Wednesday: Open 24 hours',
      'Thursday: Open 24 hours',
      'Friday: Open 24 hours',
      'Saturday: Open 24 hours',
      'Sunday: Open 24 hours',
    ],
    overview: null,
    formatted_address:
      'Vườn Lâm Tỳ Ni, Hoàng Sa, Thọ Quang, Sơn Trà, Đà Nẵng, Vietnam',
    latitude: 16.1002615,
    longitude: 108.2777474,
    photos: [
      {
        photo_reference:
          'AZose0mYNr_zk9pkv5-L-fKKtcUF-w6i8L4mDUjXA7skab98IzGuxIWE2LW23bu4cVSj8QfcTL58gxf5oQatzdB8a88gSe3PGnQ-I14HRiAlvkXHt2XbTuQXzvxZCvLiBHu36xpC4p3xcNk46dYFXWgbvwc8X7Wj14gmKFdFBTC5ZHU6WO4m',
      },
      {
        photo_reference:
          'AZose0nxsOc_0xknyjRgW5NZT9W7L_-Eijhe0hOrDfVEasvXm5af17qvFeqUUnbq_REB_M3CRgmEvDUOLH50Lm9LdHGeFokW9PgIdfMbK_jXmTVTVH5byLDpvWhCf8mkyoNsBMvgsvNMbeRScVM0guDclVr8CYAz1xmRf2MrIO7XJ_LQbx_E',
      },
      {
        photo_reference:
          'AZose0nAEAxgN6MSMwu9NxEtvDr9sWnyPcf4-L1vGyxdqg3QlFf3Z1meQYvRukd56cRwX7Mg2lD9KMLgoGc-X-XPMH1uTdS52ocb5iTyhr7xguDTUKMuVa7V93r61bO_zdR1sEGb6PPmTO9OgDkaVSIaraw4egQpSLRsy1f7pIRtBeGDDrOc',
      },
      {
        photo_reference:
          'AZose0mZWTsbCcErMGSjZK23oB9k2kp4akxe8sIqmu0P2cJTndu5XcA3iDVSKjTFCPeC-qaAflM77_cf6pc7M_l92qIF__tWjuPyEOfltu2pMYQ2qBsXcWyAUqPCMfCEHp_it9Bz2IPfc67HdkFV_kxo2dVmPTgxd885AtKlw3ppeqYOKqxf',
      },
      {
        photo_reference:
          'AZose0m8Se-jX_KiCUGjIDm8Vu4dovGoirZU9N_7Ba_1fBUglRqmWylKEKSnDP-62TzlBzcjxGxR4UzjRVFm1_n9swrbSFuV06oEBDAIE80UWiRPTFR0iqPQvYXC-0l4IwGikbqAbiVT1-QFRx6gM2Nungctkpuv1r8kpXf2nUlWY7V7VB4O',
      },
      {
        photo_reference:
          'AZose0ku98jEUw3L19vYXu3NKmJQbQNGROi4W8ppj5uA-whSPepOgik8g4Y410-zD20ThCt2_I7N2FSPW9XWE08PKiK_s5ye5LukpQOgJzJd9SmihjYSiI2wbZVwXnn7_Hm0ew4rFKuHeGUMS_gAIuEWtwQLjwCYyrLX2SI8wCN_uWDA-5XK',
      },
      {
        photo_reference:
          'AZose0kuWZ3io6z5UE5izkIJQGhz8TXMP3TnQtaqE0mOZr81uu1BHCYSzgOWvKEBE1zhUKevhew801WpldtjCTn4fJjtmFWFCjFo7AYQR763X-W5X17kNFf-DKRtXFSSJHofh8fwirv38Mz79m1cn3Fq1a9RCB9mXPWBADRIghzrQgP4b0sk',
      },
      {
        photo_reference:
          'AZose0lh05LMXQFuGSoAGNcS4ltL83K6cUstaLwpn8v-ejvffYsdikN2NGeSelMICbZWaFbinat9SRFaaiUjNke4BbkFaUcCDVkETbRDXNj5iOT1y9opNv0Ab8jwEBs90bSa4CfcAMtCmxERDyeksiv8yEVJp7EhSVfAY7pdp0pE9jPPHwbh',
      },
      {
        photo_reference:
          'AZose0mmBiiz8aJt9nsxiq72LjLWKpW-c6Xon3q_XLhS5jNhbJbzDwfKHtsTgK5K8g4Q7oDiR36ehkE-qEI7BGXyPsskXSmEsl6l3G3iV_Z6L7OWrl9zsA27-Z4cNRY4maUebedc1ZCIZFfDqT9ePyErCuBy3TEBHAWH-Pv6VdFudCGBxDs',
      },
      {
        photo_reference:
          'AZose0nnBjMa4XNtplirqxP7l001KRcG9xr7x6CKfpxA7SR9-zG9GTOJULrf91EaIdALMkLJF3vc3zfTH6wFYGSxCrRqy63HqD7dybx6mKaHU58t0FG2mDc6lVLzC8N2cJqwVFVsWLK1iG3tJr_7yLi1nhzQQ0ABbPlk2wnG7pHly-gdQQE_',
      },
    ],
    rating: 4.7,
    reviews: [
      {
        author_name: 'David',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMTuQNrbUKLy-1zap_9qaC8xWKH4EN3XxIBg9PNWrg=s128-c0x00000000-cc-rp-mo-ba3',
        rating: 5,
        text: 'An extraordinary place. The big temples and statues are just amazing. A lot of unique trees, that are well maintained. There weren’t so many people there, no tickets needed to enter this place. And you can find cute monkeys running around near some trees, please don’t harass or disturb them.',
      },
      {
        author_name: 'Georg Michael Wolff',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMSWSVNAmwbHWYfJOhqnffnVchD2y9rzto8G-S5MFQ=s128-c0x00000000-cc-rp-mo-ba5',
        rating: 5,
        text: 'You have to see this great temple complex! Around the huge statue you will find a variety of places of worship and, above all, sculptures and plants. An incredible work of art combined with the peace and tranquility of a temple.',
      },
      {
        author_name: 'Michał Lazarek',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a/AAcHTte_5Vg8Msg9PJoR_Ozq6oJmPLJ479onKXvwP00t=s128-c0x00000000-cc-rp-mo-ba4',
        rating: 5,
        text: 'Very nice place with a stunning view to the city beach. Impressive size of pagoda, temples and monuments. Lady Budda kept white what makes it more fascinating and respectful.\nPlenty of bonsais makes feel like in different world.\nOne thing need to be aware of is that need to beware of wild monkeys',
      },
      {
        author_name: 'Don Dineo',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a/AAcHTteuMRJ2AKI0WC4aS4kr_uLugHtg6R6bO3-KGcmK=s128-c0x00000000-cc-rp-mo-ba6',
        rating: 5,
        text: "A big pagoda or temple separate to 2 parts, big standing Guan Yin Buddle statue as the signature here. Well maintained and lot bonsai planted here.\n\nThere's monkeys around and I believe they are harmless if no people disturbing them.\n\nCan have a good photos from here towards the city views.\n\nLots tourists come here to visit and like most of the tourism place here also need to buy a ticket.",
      },
      {
        author_name: 'Mei Lee',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMTtGXq4LkheEJpuUX7Z6JdRAR-_IM7SltDUVBkx=s128-c0x00000000-cc-rp-mo-ba6',
        rating: 5,
        text: "We spent a week in Da Nang and had to come to come here. You can see her statue from the beach. She is more beautiful in person.\n\nThe temple is well kept and very beautiful. Please make sure to leave a donation to help them maintain this temple. Parking is available on the bottom. There is a short walk upstairs. There is so much to see and it's very tranquil when there are not a lot of tourists. The drive up on the motorbike is also wonderful with a nice breeze and views of the ocean.\n\nAlso, be respectful and be aware when shoes need to be removed before entering. There are signs. We would just come here to sit and relax. It's a very tranquil and peaceful place to be. This is a must-see when in Da Nang.",
      },
    ],
    types: ['place_of_worship'],
    user_ratings_total: 1952,
    cost: 0,
    stayTime: 90,
  },
  {
    _id: '64742bee9a86f189a3bfe534',
    name: 'Mì Quảng Giao Thủy',
    weekday_text: [
      'Monday: 6:00 AM – 9:00 PM',
      'Tuesday: 6:00 AM – 9:00 PM',
      'Wednesday: 6:00 AM – 9:00 PM',
      'Thursday: 6:00 AM – 9:00 PM',
      'Friday: 6:00 AM – 9:00 PM',
      'Saturday: 6:00 AM – 9:00 PM',
      'Sunday: 6:00 AM – 9:00 PM',
    ],
    overview: null,
    formatted_address:
      '20 Lê Thanh Nghị, Hoà Cường Bắc, Hải Châu, Đà Nẵng 550000, Vietnam',
    latitude: 16.0436901,
    longitude: 108.2173205,
    photos: [
      {
        photo_reference:
          'AZose0lLLqwZKbgsFMhAc8fF4r6PRsKpCkwhQmVnDL9p19_U7s80B883g3_27EyNHQl2sqMa2xFy1erzWqxfP0bmGzneWT7NCJ4ue9EL9vrGUcyPr2FlWZntpw9YIuYDmaTXT-n802HmSyWBNSAKedQD5j2Waofqpke0qJOqWEE3Z1aGGi-y',
      },
      {
        photo_reference:
          'AZose0lrmoMKXNY6l6lJXqWJeJfIyQ-h9JOCd1RvAKOr_OW-uETMfL-ErqvhYdHC1dlNt0J-bZGm3RLl_Uehrn_a-xn3WKULz2Rf2HVLVGvl-6uiEo6m2kPHpSeQTA-vCKQ0gMbfqJOw7RGbIKaTcqjdGWTrjHWlQbsQJLnsTBYaNFMF0wWe',
      },
      {
        photo_reference:
          'AZose0mFt5HhrZFge4e9JI6bWVFygOW-fePMORy1c0NmeePFy4uLcJJXFVz-1ZFG3Hu6RQ-wnpYVOi4QZU_BlAiyaOJgxFs60FLHWPIFNcxQp1CY2XlUYruKaqUBCgb3dzwRXAW9rrJx7FNAxMir5rCMEZwAHKwxsg5FaACkPADYwkGxy1sD',
      },
      {
        photo_reference:
          'AZose0ntBzcVoo-qK1gRVemc0bg5wCx4U85I7LkbEpJ8WEppSrGn3PEWuhccQzXSIiXq1JLMKIxTrAp4flxrm61LZxkqceF-xQNFwh5ToyoawYZBpQmWop1en5x_LTNn5vRDUlBk3z-RdWgm7CoQBIRoasr5zfrS3VufqcpfefJmRI8WMH30',
      },
      {
        photo_reference:
          'AZose0kabdJinTR1FOZyLLytxYZv4cJpBUGhV5zxEYKPrGjWkmj5bEQrLLJv6cRzMpfiNCp9UU9blIswI3-1xkvrKziOsLkKavIigukP1sYRWyLLsvFTLPEFyIW6bXGnViqTvi1qz7LxdYD3Xai3VaDmeCQsCQjFcol0sATE2iZruqwx7cgv',
      },
      {
        photo_reference:
          'AZose0k26_KTiUJVNtLyd5GoXHkj1b-juIPFPq_fwnph0qvgPs1Is2RqRwmGRwS8ClljotFUkuBWxmJVMJvifG_x35wRv-NG6aJoshmDe8aM4G-wP1SfP0_IdG9FoPQyhxYsVzwe3S--u6U8qnSMCgyU16pMoNhdpZY-lItIikLISLpxxgbn',
      },
      {
        photo_reference:
          'AZose0mV40w954pBPLIHUmt_NwvqImEDnGIk5cz_4FBvYdU-DQj9Wnl6Vi5fQjqKyoqrpbvFwlbW9hSOcHDAfws6eHDPNqHnMOAKBZp0UAXrAADj5yzXw2LYwne9YC6SJFY9XulSWEwqYnzRAY9ksr36rut7EmTFUsk8ldv2lL-3qehCzxlN',
      },
      {
        photo_reference:
          'AZose0ksnFnh7YBhWuk-JyvDi9vnuSW18vtAEmnnuW_9ES98HVzqyekWFgs2uqawUUqInNhBq6BTJMpQVu_sAOr-53ohvFaKo0vqc-Fr7HAJnMEZoDAVdg66xoBrJAbIqjYnTV9lYb29CsM2Z_S95-_mfRMarVYxVzBHQF_pMQBn1o0MS0yG',
      },
      {
        photo_reference:
          'AZose0kwO9z3EyN9Pb98WLIHtDFugVqzCQ7osxGxN5pB-l6GqqngGOwSl7wqFdnMypreohnYjL8m9iGJ9oQ2wpA4uT2R38DOyotTxzyHgaa3hN5mFYi6ppXodAmOQjiRKo2oZFVpAHsQ8TBL-aHqc4bwnlJ2MBM88pvQ0lEBnoVtEup0pxfc',
      },
      {
        photo_reference:
          'AZose0kgmTKW_-OnpeSnFVgBe5A2Z5NNIMJP8nK_3xftvatsByH0TLTErp7TumMxPrYrc3uCRV-ZHB3S1TeDa3W3Z6mNzhVffWdKKgF7TkrCMGVlJTCz11lVph6ClRBpc9Znv8FllID4C_-mqnlMZFOSH7QIxY2P8whn5CuT-KGEOJ2rBiqR',
      },
    ],
    rating: 4,
    reviews: [
      {
        author_name: 'Sofia Palacios',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMSz6C6izhggDbZNqLxc0v3yc0O1TUz_gIfgGyJT0Q=s128-c0x00000000-cc-rp-mo-ba3',
        rating: 4,
        text: "Been there a few times. If you want homemade hearty soup, this is your place. It's delicious. I gave 4* due to the service and the portions. It seems like westerners get smaller ones. Still worth going again and again.",
      },
      {
        author_name: 'NGUYỄN Hoàng Dũng',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMS3LFq-r3P8nY6l5_05ia-0-8GOvSSg5Oi6zpQgdg=s128-c0x00000000-cc-rp-mo-ba3',
        rating: 4,
        text: 'Very good taste. The noodle is smooth.  Vegetable is fresh. The soupe is balanced.',
      },
      {
        author_name: 'Quỳnh Trang Lê',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a/AAcHTtcJsCCyDb_OtRg28jshtrYC_uOzSzmnggDHuZab=s128-c0x00000000-cc-rp-mo',
        rating: 5,
        text: 'Ok',
      },
      {
        author_name: 'Lluis Fandos',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a/AAcHTtfHrCis1xOcQd4Nl2GSX7NSEz7wW3lAf3kvOWxc=s128-c0x00000000-cc-rp-mo-ba5',
        rating: 5,
        text: 'Clean and tidy, taste food, good price. Very recommendable.',
      },
      {
        author_name: 'Chính Huế',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AD_cMMSO3EKU2ZdIkBgqYCJy5WE5-RcNaIuk1WyL9ongtg=s128-c0x00000000-cc-rp-mo-ba2',
        rating: 5,
        text: 'Good',
      },
    ],
    types: ['restaurant', 'food'],
    user_ratings_total: 103,
    cost: 70000,
    stayTime: 75,
  },
];

const EditItinerary = ({route}) => {
  const [day, setDay] = useState([1]);
  const [selectedItem, setSelectedItem] = useState(1);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [search, setSearch] = useState(null);
  const renderItem = ({item}) => (
    <DayItem
      item={item}
      selected={item === selectedItem}
      onSelect={setSelectedItem}
    />
  );
  const handleDays = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('data'));
    setDay(data?.days);
  };
  useEffect(() => {
    handleDays();
  }, []);
  useEffect(() => {
    setData(dataIti?.[selectedItem - 1]?.route);
  }, [selectedItem]);
  const {dataIti, Id} = route.params;
  console.log('Id', Id);
  const [dataDay, setDataDay] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [newArrayById, setNewArrayById] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [dataToSent, setDataToSent] = useState(null);
  const [dataToSentMap, setDataToSentMap] = useState(null);
  const [dataReturn, setDataReturn] = useState(null);
  const getDataDay = () => {
    const arrNew = dataDay.map(str => parseInt(str));
    console.log('arrNew', arrNew);
    setNewArray(arrNew);
  };
  const sortArrayByOrder = (arr1, arr2) => {
    const filteredArr2 = arr2.filter(item => item !== null);

    const sortedArr = [];
    for (const index of filteredArr2) {
      if (index >= 0 && index < arr1.length) {
        sortedArr.push(arr1[index]);
      }
    }
    return sortedArr;
  };
  const setFinalDT = async () => {
    await AsyncStorage.setItem('finalDT', JSON.stringify(finalData));
  };
  useEffect(() => {
    console.log('load lan dau');
    setFinalDT();
  }, []);
  useEffect(() => {
    setFinalDT();
  }, [finalData]);
  useEffect(() => {
    generateData();
  }, [newArray]);
  useEffect(() => {
    getDataDay();
  }, [dataDay]);

  useEffect(() => {
    handleDatatoSent(dataIti);
  }, []);
  const axiosContext = useContext(AxiosContext);
  const generateData = () => {
    const sortedArray = newArray.map(
      index => data[index]?.description?._id || null,
    );
    console.log('sortedArray', sortedArray);
    setNewArrayById(sortedArray);
    const sortArrByOrder = sortArrayByOrder(data, newArray);
    console.log('sortArrByOrder', sortArrByOrder);
    setFinalData(sortArrByOrder);
  };
  const handleDatatoSent = arr1 => {
    const arr2 = {routes: []};

    for (const obj of arr1) {
      const route = [];
      for (const routeObj of obj.route) {
        const newObj = {};
        if (!routeObj?.description._id) {
          newObj.latitude = routeObj?.description?.latitude;
          newObj.longitude = routeObj?.description?.longitude;
        } else {
          newObj._id = routeObj?.description._id;
        }
        route.push(newObj);
      }
      arr2.routes.push(route);
    }
    setDataToSent(arr2, null, 2);
    console.log(JSON.stringify(arr2, null, 2));
  };
  const isUser = useSelector(state => state.auth.login);
  const handleUpdateButton = status => {
    if (newArrayById.length !== 0) {
      dataToSent.routes[selectedItem - 1] = newArrayById.map(i =>
        i === null
          ? {
              latitude: 16.0683088,
              longitude: 108.1490164,
            }
          : i,
      );
    }
    const Reresult = dataToSent?.routes?.map(subArr =>
      subArr.map(item => {
        if (typeof item === 'string') {
          return {_id: item};
        }
        return item;
      }),
    );
    console.log('Reresult', Reresult);
    UpdateItiTest(Id, isUser?.data?.token, Reresult, status, setDataReturn);
  };
  const handleGenerateButton = () => {
    if (dataToSent && dataToSent.routes && newArrayById.length !== 0) {
      dataToSent.routes[selectedItem - 1] = newArrayById.map(i =>
        i === null
          ? {
              latitude: 16.0683088,
              longitude: 108.1490164,
            }
          : i,
      );
    }
    const Reresult = dataToSent?.routes?.map(subArr =>
      subArr?.map(item => {
        if (typeof item === 'string') {
          return {_id: item};
        }
        return item;
      }),
    );
    console.log('Reresult', Reresult);
    // axiosContext.GenerateNewIti(Id, Reresult);
    GenerateItiTest(Id, isUser?.data?.token, Reresult, setDataToSentMap);
  };
  useEffect(() => {
    if (dataToSentMap !== null) {
      navigation.navigate('ResultEdit', {
        data: dataToSentMap,
        Id: Id,
      });
    }
  }, [dataToSentMap]);
  useEffect(() => {
    if (dataReturn !== null) {
      console.log('dataReturn', dataReturn);
      if (dataReturn?.message === undefined) {
        Alert.alert('Success', 'Your itinerary has been saved successfully!', [
          {
            text: 'Go to Map',
            onPress: () =>
              navigation.navigate('ResultEdit', {
                data: dataReturn,
                Id: Id,
                type: 'update',
              }),
          },
        ]);
      } else {
        Alert.alert(
          'Warning',
          `Your trip requires careful attention due to some encountered issues: 
          ${dataReturn?.message}`,
          [
            {
              text: 'Cancel',
            },
            {
              text: 'Still save',
              onPress: () => handleUpdateButton(false),
            },
          ],
        );
      }
    }
  }, [dataReturn]);
  const refRBSheet = useRef();
  const [dataPlace, setDataPlace] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [dataAdd, setDataAdd] = useState([]);
  // const handleSearch = word => {
  //   Search(word, arrTypes.join(), 1, 10, setDataAdd, setIsLoading);
  // };
  // useEffect(() => {
  //   if (search !== '') {
  //     setIsLoading(true);
  //     SearchLoca(search, 1, 10, setDataAdd, setIsLoading);
  //   }
  // }, []);
  // const renderFooter = () => {
  //   return (
  //     <LottieView
  //       source={require('../../assets/animations/loading1.json')}
  //       autoPlay
  //       loop
  //       style={{
  //         height: widthScreen * 0.2,
  //         width: widthScreen * 0.2,
  //         alignSelf: 'center',
  //       }}
  //     />
  //   );
  // };
  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonBack}>
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Edit</Text>
        <View style={styles.viewSpace}></View>
      </View>
      <View style={styles.viewLists}>
        <FlatList
          data={day}
          renderItem={renderItem}
          keyExtractor={item => item.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          style={styles.listDays}
        />
      </View>
      <SortableListComponent
        dataIti={dataIti}
        selectedItem={selectedItem}
        setDataDay={setDataDay}
        finalData={finalData}
        dataPlace={dataPlace}
      />

      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.viewSave}
          onPress={() => {
            handleUpdateButton(true);
          }}>
          <Text style={styles.textDay}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewSave}
          onPress={() => {
            handleGenerateButton();
          }}>
          <Text style={styles.textDay}>Arrange</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.viewAdd}
        onPress={() => refRBSheet.current.open()}>
        <FontAwesome name="plus" size={24} color={colors.WHITE} />
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="slide"
        openDuration={400}
        height={heightScreen * 0.7}
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
        <View style={styles.viewSearch}>
          <TouchableOpacity onPress={() => handleSearch(search)}>
            <FontAwesome name="search" size={24} color={colors.STRONGGRAY} />
          </TouchableOpacity>
          <TextInput
            value={search}
            style={styles.input}
            placeholder="Search location where you want to add"
            onChangeText={txt => {
              setSearch(txt);
            }}
            autoFocus={true}></TextInput>
        </View>
        <View style={styles.viewResult}>
          <FlatList
            data={dataHard}
            renderItem={({item, index}) => (
              <View style={styles.viewHotelItem}>
                <HotelItems
                  item={item}
                  type="add"
                  setDataPlace={setDataPlace}
                  selectedItem={selectedItem}
                  dataToSent={dataToSent}
                  setDataToSent={setDataToSent}
                  setData={setData}
                />
              </View>
            )}
            numColumns={2}
            keyExtractor={item => item?._id}
            style={styles.result}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            // ListFooterComponent={renderFooter}
          />
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },
  viewLists: {
    height: heightScreen * 0.1,
    width: widthScreen * 0.9,
    justifyContent: 'center',
  },
  listDays: {
    alignSelf: 'center',
    marginTop: 13,
  },
  viewButton: {
    height: heightScreen * 0.1,
    width: widthScreen,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewSave: {
    height: heightScreen * 0.06,
    width: widthScreen * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.MAINCOLOR,
    borderRadius: 20,
  },
  textDay: {
    fontSize: 18,
    color: colors.WHITE,
    fontWeight: 600,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.BLACK,
  },
  viewSpace: {
    height: heightScreen * 0.05,
    width: widthScreen * 0.1,
    backgroundColor: colors.WHITE,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthScreen * 0.9,
    alignSelf: 'center',
    marginTop: heightScreen * 0.035,
    alignItems: 'center',
  },
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GRAY,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  viewAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.MAINCOLOR,
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    position: 'absolute',
    bottom: heightScreen * 0.1,
    right: widthScreen * 0.05,
  },
  viewSearch: {
    height: heightScreen * 0.065,
    width: widthScreen * 0.9,
    backgroundColor: colors.WHITE,
    borderRadius: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightScreen * 0.001,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignSelf: 'center',
    marginTop: heightScreen * 0.02,
    alignItems: 'center',
    paddingHorizontal: widthScreen * 0.07,
    flexDirection: 'row',
  },
  input: {
    marginLeft: widthScreen * 0.03,
  },
  viewResult: {
    width: widthScreen,
    height: heightScreen * 0.55,
    marginTop: heightScreen * 0.02,
    alignItems: 'center',
  },
  viewHotelItem: {
    marginBottom: heightScreen * 0.02,
  },
});

export default EditItinerary;
