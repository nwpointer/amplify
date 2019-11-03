import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
export const ProgressBar = ({ progress }) => (<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4c669f', '#192f6a']} style={{ padding: 3, width: `${progress}%` }}>
</LinearGradient>);
