/**
 * EXIF 标签常量定义
 * 包含标准的 TIFF、EXIF 和 GPS 标签映射
 */

/**
 * 标准 TIFF 标签（0th IFD）映射
 * TIFF 标签用于存储基本的图像信息
 */
export const TIFF_TAGS: Record<number, string> = {
  254: 'NewSubfileType',
  256: 'ImageWidth',
  257: 'ImageLength',
  258: 'BitsPerSample',
  259: 'Compression',
  262: 'PhotometricInterpretation',
  270: 'ImageDescription',
  271: 'Make', // 相机品牌
  272: 'Model', // 相机型号
  273: 'StripOffsets',
  274: 'Orientation', // 图片方向
  277: 'SamplesPerPixel',
  278: 'RowsPerStrip',
  279: 'StripByteCounts',
  282: 'XResolution', // X 分辨率
  283: 'YResolution', // Y 分辨率
  284: 'PlanarConfiguration',
  296: 'ResolutionUnit',
  305: 'Software', // 软件版本
  306: 'DateTime', // 拍摄日期时间
  315: 'Artist',
  339: 'SampleFormat',
};

/**
 * 标准 Exif 标签映射
 * Exif 标签包含拍摄参数和设备信息
 */
export const EXIF_TAGS: Record<number, string> = {
  33434: 'ExposureTime', // 曝光时间
  33437: 'FNumber', // F 数值
  34665: 'ExifOffset',
  34855: 'ISOSpeedRatings', // ISO 感光度
  36867: 'DateTimeOriginal', // 原始拍摄时间
  36868: 'DateTimeDigitized',
  37121: 'ComponentsConfiguration',
  37122: 'CompressedBitsPerPixel',
  37377: 'ShutterSpeedValue',
  37378: 'ApertureValue',
  37379: 'BrightnessValue',
  37380: 'ExposureBiasValue',
  37381: 'MaxAperture',
  37382: 'MeteringMode',
  37383: 'LightSource',
  37384: 'Flash',
  37385: 'FocalLength', // 焦距
  37386: 'SubjectArea',
};

/**
 * GPS 标签映射
 */
export const GPS_TAGS: Record<number, string> = {
  0: 'GPSVersionID',
  1: 'GPSLatitudeRef', // 纬度方向
  2: 'GPSLatitude', // 纬度
  3: 'GPSLongitudeRef', // 经度方向
  4: 'GPSLongitude', // 经度
  5: 'GPSAltitudeRef', // 海拔方向
  6: 'GPSAltitude', // 海拔
  7: 'GPSTimeStamp',
  8: 'GPSSatellites',
  9: 'GPSStatus',
  10: 'GPSMeasureMode',
  11: 'GPSDOP',
  12: 'GPSSpeedRef',
  13: 'GPSSpeed',
  14: 'GPSTrackRef',
  15: 'GPSTrack',
  16: 'GPSImgDirectionRef',
  17: 'GPSImgDirection',
  18: 'GPSMapDatum',
  19: 'GPSDestLatitudeRef',
  20: 'GPSDestLatitude',
  21: 'GPSDestLongitudeRef',
  22: 'GPSDestLongitude',
  23: 'GPSDestBearingRef',
  24: 'GPSDestBearing',
  25: 'GPSDestDistanceRef',
  26: 'GPSDestDistance',
};
