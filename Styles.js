import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const scaleFont = (size) => size * PixelRatio.getFontScale();

// Dynamic spacing
const dynamicSpacing = {
  small: height * 0.01, // Small screens
  medium: height * 0.015, // Medium screens
  large: height * 0.02, // Large screens
};

const styles = StyleSheet.create({
  /*General Styles */
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05, 
    backgroundColor: '#EBEAFF', 
  },
  label: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    marginBottom: dynamicSpacing.small,
    color: '#000000', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#EAECEF',
    padding: height * 0.015,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    fontSize: scaleFont(16),
    marginBottom: height * 0.02,
    color: '#5C677D',
    shadowColor: '#EAECEF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
  },

  /* Buttons */
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.02,
    
  },
  button: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.08,
    borderRadius: 12,
    backgroundColor: '#7FA1C3', 
    alignItems: 'center',
    flex: 1, 
    marginHorizontal: width * 0.02,
    shadowColor: '#7FA1C3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
    marginVertical : height * 0.02,
  },
  buttonText: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#DFD3C3',
  },

  /*Category Section */
  categoryContainer: {
    marginVertical: height * 0.015,
    backgroundColor: '#FFFFFF',
    padding: height * 0.02,
    borderRadius: 12,
  },
  categoryHeader: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#000000',
  },

  /*Timer Card */
  timerCard: {
    padding: height * 0.02,
    backgroundColor: '#FFFFFF',
    marginVertical: height * 0.01,
    borderRadius: 12,
    shadowColor: '#EAECEF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,borderBlockColor: '#000000',
    borderWidth : 1,
  },
  timerText: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: '#03346E',
  },
  percentageText: {
    textAlign: 'center',
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    marginTop: height * 0.005,
    color: '#DDBEA9', 
  },

  /*Bulk Actions */
  bulkButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: height * 0.02,
  },
  bulkButton: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 10,
    backgroundColor: '#7FA1C3',
    flex: 1,
    marginHorizontal: width * 0.02,
  },
  bulkButtonText: {
    fontSize: scaleFont(14),
    color: '#FFFFFF',
    textAlign: 'center',
  },

  /* Modal Styles */
  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: height * 0.03,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#EAECEF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  modalText: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    color: '#5C677D',
  },

  /*Switch (For Halfway Alert) */
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: height * 0.015,
  },

  /*History Screen */
  historyHeader: {
    fontSize: scaleFont(22),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.02,
    color: '#5C677D',
  },
  noHistory: {
    textAlign: 'center',
    fontSize: scaleFont(16),
    color: '#8A94A6',
  },
  historyItem: {
    padding: height * 0.02,
    backgroundColor: '#FFFFFF',
    marginVertical: height * 0.01,
    borderRadius: 12,
    borderLeftWidth: 6,
    borderLeftColor: '#DDBEA9',
  },
  completedAt: {
    fontSize: scaleFont(14),
    color: '#8A94A6',
  },

  /*Progress Bar Colors */
  progressBarRunning: {
    color: '#DDBEA9',
  },
  progressBarPaused: {
    color: '#8A94A6',
  },

  /*Delete Button */
  deleteButton: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 10,
    backgroundColor: '#E4C1F9',
  },
  deleteButtonText: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default styles;
