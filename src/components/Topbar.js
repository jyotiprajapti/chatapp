import { Text, View } from 'react-native'
import React from 'react'
import styles from '../utilities/StyleSheet'
import { moderateScale, verticalScale } from '../utilities/Metrics'

const Topbar = ({title}) => {
  return (
    <View style={{borderBottomWidth:1, marginVertical:verticalScale(15), padding:moderateScale(5) }} >
      <Text style={styles.title2} >{title}</Text>
    </View>
  )
}

export default Topbar