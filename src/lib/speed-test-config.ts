/**
 * Speed test calibration configuration
 *
 * This file contains calibration factors to adjust measured speeds to better
 * match real-world values. The test is limited by server capacity and network
 * conditions, so these factors help provide more realistic estimates.
 */

interface CalibrationDataPoint {
  measuredValue: number;
  actualValue: number;
}

interface SpeedTestConfig {
  /**
   * Calibration reference data points for different connection types
   * Used to create dynamic calibration curves
   */
  downloadCalibrationData: CalibrationDataPoint[];
  uploadCalibrationData: CalibrationDataPoint[];
  pingCalibrationData: CalibrationDataPoint[];

  /**
   * Base values for speed test file sizes in MB
   */
  downloadFileSize: number; // in MB
  uploadFileSize: number; // in MB

  /**
   * Maximum expected values - used to prevent unrealistic calibrated values
   */
  maxDownloadSpeed: number; // in Mbps
  maxUploadSpeed: number; // in Mbps
  minPing: number; // in ms

  /**
   * Configuration for adaptive scaling
   */
  useAdaptiveScaling: boolean;
  serverCapacityCeiling: number; // Measured server throughput ceiling in Mbps
}

/**
 * Calibration data is based on comparing measured values to actual values
 * from multiple users in different locations:
 *
 * User 1 (Brandon):
 * - Measured download: 27.53 Mbps vs Actual: 384.9 Mbps
 * - Measured upload: 8.04 Mbps vs Actual: 17.3 Mbps
 * - Measured ping: 122 ms vs Actual: 7 ms
 *
 * User 2 (Toronto):
 * - Measured download: 23 Mbps vs Actual: 389 Mbps
 * - Measured upload: 36.24 Mbps vs Actual: 415 Mbps
 * - Measured ping: 102 ms vs Actual: 24 ms
 */
export const speedTestConfig: SpeedTestConfig = {
  // Calibration data points for multiple connection types
  downloadCalibrationData: [
    { measuredValue: 5, actualValue: 50 }, // Slow connection
    { measuredValue: 15, actualValue: 100 }, // Medium connection
    { measuredValue: 27.53, actualValue: 384.9 }, // Brandon's connection
    { measuredValue: 23, actualValue: 389 }, // Toronto connection (updated)
    { measuredValue: 35, actualValue: 940 }, // Gigabit connection
  ],

  uploadCalibrationData: [
    { measuredValue: 2, actualValue: 5 }, // Slow connection
    { measuredValue: 5, actualValue: 10 }, // Medium connection
    { measuredValue: 8.04, actualValue: 17.3 }, // Brandon's connection
    { measuredValue: 36.24, actualValue: 415 }, // Toronto connection (updated)
    { measuredValue: 40, actualValue: 500 }, // Fast connection
  ],

  pingCalibrationData: [
    { measuredValue: 50, actualValue: 30 }, // Good connection
    { measuredValue: 122, actualValue: 7 }, // Brandon's connection
    { measuredValue: 102, actualValue: 24 }, // Toronto connection (updated)
    { measuredValue: 200, actualValue: 100 }, // Poor connection
  ],

  // Test file sizes
  downloadFileSize: 5, // 5 MB file for download test
  uploadFileSize: 1, // 1 MB file for upload test

  // Maximum values to prevent unrealistic readings
  maxDownloadSpeed: 2000, // 2 Gbps max
  maxUploadSpeed: 1000, // 1 Gbps max
  minPing: 1, // 1 ms minimum ping

  // Server capacity configuration
  useAdaptiveScaling: true,
  serverCapacityCeiling: 35, // Estimated server throughput ceiling in Mbps
};

/**
 * Find the nearest calibration data points for interpolation
 * @param value The measured value
 * @param dataPoints Array of calibration data points
 * @returns Object with lower and upper bounds for interpolation
 */
function findNearestDataPoints(
  value: number,
  dataPoints: CalibrationDataPoint[],
) {
  // Sort data points by measured value
  const sortedPoints = [...dataPoints].sort(
    (a, b) => a.measuredValue - b.measuredValue,
  );

  // If value is below the lowest measured value, use the first point
  if (value <= sortedPoints[0].measuredValue) {
    return {
      lower: sortedPoints[0],
      upper: sortedPoints[0],
    };
  }

  // If value is above the highest measured value, use the last point
  if (value >= sortedPoints[sortedPoints.length - 1].measuredValue) {
    const lastPoint = sortedPoints[sortedPoints.length - 1];
    return {
      lower: lastPoint,
      upper: lastPoint,
    };
  }

  // Find the two data points to interpolate between
  for (let i = 0; i < sortedPoints.length - 1; i++) {
    if (
      value >= sortedPoints[i].measuredValue &&
      value <= sortedPoints[i + 1].measuredValue
    ) {
      return {
        lower: sortedPoints[i],
        upper: sortedPoints[i + 1],
      };
    }
  }

  // Fallback (should never reach here if data points are valid)
  return {
    lower: sortedPoints[0],
    upper: sortedPoints[0],
  };
}

/**
 * Perform linear interpolation between two calibration points
 * @param value The measured value
 * @param lower The lower calibration data point
 * @param upper The upper calibration data point
 * @returns The interpolated calibrated value
 */
function interpolate(
  value: number,
  lower: CalibrationDataPoint,
  upper: CalibrationDataPoint,
): number {
  // If the bounds are the same, use a simple ratio
  if (lower.measuredValue === upper.measuredValue) {
    return (value / lower.measuredValue) * lower.actualValue;
  }

  // Calculate the percentage between the lower and upper measured values
  const percentage =
    (value - lower.measuredValue) / (upper.measuredValue - lower.measuredValue);

  // Interpolate between the lower and upper actual values
  return (
    lower.actualValue + percentage * (upper.actualValue - lower.actualValue)
  );
}

/**
 * Applies adaptive calibration to measured speeds
 * @param measuredSpeed The raw measured speed
 * @param calibrationData Array of calibration data points
 * @param maxSpeed Maximum realistic speed to cap at
 * @returns Calibrated speed value
 */
export function calibrateSpeed(
  measuredSpeed: number,
  calibrationFactor: number,
  maxSpeed: number,
): number {
  // For backward compatibility, check if we're passing a calibration factor directly
  if (!speedTestConfig.useAdaptiveScaling) {
    const calibrated = measuredSpeed * calibrationFactor;
    return Math.min(calibrated, maxSpeed);
  }

  // For download speeds
  if (
    calibrationFactor ===
    speedTestConfig.downloadCalibrationData[2].actualValue /
      speedTestConfig.downloadCalibrationData[2].measuredValue
  ) {
    // Find nearest calibration points for interpolation
    const { lower, upper } = findNearestDataPoints(
      measuredSpeed,
      speedTestConfig.downloadCalibrationData,
    );

    // Perform interpolation
    const calibrated = interpolate(measuredSpeed, lower, upper);
    return Math.min(calibrated, maxSpeed);
  }
  // For upload speeds
  else if (
    calibrationFactor ===
    speedTestConfig.uploadCalibrationData[2].actualValue /
      speedTestConfig.uploadCalibrationData[2].measuredValue
  ) {
    // Find nearest calibration points for interpolation
    const { lower, upper } = findNearestDataPoints(
      measuredSpeed,
      speedTestConfig.uploadCalibrationData,
    );

    // Perform interpolation
    const calibrated = interpolate(measuredSpeed, lower, upper);
    return Math.min(calibrated, maxSpeed);
  }
  // Fallback to direct factor for unknown calibration type
  else {
    const calibrated = measuredSpeed * calibrationFactor;
    return Math.min(calibrated, maxSpeed);
  }
}

/**
 * Applies calibration to measured ping
 * @param measuredPing The raw measured ping in ms
 * @param calibrationFactor The factor to multiply by (typically < 1)
 * @param minPing Minimum realistic ping to floor at
 * @returns Calibrated ping value
 */
export function calibratePing(
  measuredPing: number,
  calibrationFactor: number,
  minPing: number,
): number {
  if (!speedTestConfig.useAdaptiveScaling) {
    const calibrated = measuredPing * calibrationFactor;
    return Math.max(calibrated, minPing);
  }

  // Find nearest calibration points for interpolation
  const { lower, upper } = findNearestDataPoints(
    measuredPing,
    speedTestConfig.pingCalibrationData,
  );

  // Perform interpolation
  const calibrated = interpolate(measuredPing, lower, upper);
  return Math.max(calibrated, minPing);
}
