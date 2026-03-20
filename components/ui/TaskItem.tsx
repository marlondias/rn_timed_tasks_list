import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  title: string
  estimatedTimeInSeconds: number
  isRunning?: boolean
  onPaused?: () => boolean
  onResumed?: () => boolean
}

const getEstimatedTimeText = (timeInSeconds: number): string => {
  const MINUTE_IN_SECONDS = 60
  const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS

  if (!Number.isFinite(timeInSeconds) || timeInSeconds <= 0) {
    return '0s'
  }

  const hoursOnly = Math.floor(timeInSeconds / HOUR_IN_SECONDS)
  const minutesOnly = Math.floor(timeInSeconds % HOUR_IN_SECONDS) / MINUTE_IN_SECONDS
  const secondsOnly = timeInSeconds % MINUTE_IN_SECONDS

  return [
    hoursOnly > 0 ? `${hoursOnly}h` : '',
    minutesOnly > 0 ? `${minutesOnly}m` : '',
    secondsOnly > 0 ? `${secondsOnly}s` : '0s',
  ].join(' ')
}

export function TaskItem({ ...props }: Props) {
  const [isRunning, setIsRunning] = useState(props.isRunning ?? false)

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <View style={styles.innerRow}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>{props.title}</Text>
          <Text style={styles.subText}>
            Estimated time: {getEstimatedTimeText(props.estimatedTimeInSeconds)}
          </Text>
        </View>

        <View style={styles.controlsWrapper}>
          <TouchableOpacity
            style={styles.controlButton}
            activeOpacity={0.7}
            onPress={() => setIsRunning((prev) => !prev)}
          >
            <Text style={styles.controlIcon}>{isRunning ? '⏸️' : '▶️'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            activeOpacity={0.7}
            onPress={() => console.log('Options pressed')}
          >
            <Text style={styles.controlIcon}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#e1c885',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginVertical: 6,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: 'rgba(255,255,255,0.4)',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleWrapper: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  controlsWrapper: {
    width: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlIcon: {
    color: '#fff',
    fontSize: 20,
  },
})
