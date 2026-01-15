/**
 * EXIF 数据处理工具函数
 * 用于提取、解析和清理照片的 EXIF 数据
 */

import piexifjs from 'piexifjs';

/**
 * GPS 坐标接口
 */
export interface GPSCoordinate {
  latitude: number;
  longitude: number;
  latitudeRef: string;
  longitudeRef: string;
  altitude?: number;
  altitudeRef?: string;
}

/**
 * EXIF 信息接口
 */
export interface ExifInfo {
  // 相机信息
  make?: string; // 相机制造商
  model?: string; // 相机型号
  software?: string; // 软件版本

  // 拍摄信息
  dateTime?: string; // 拍摄时间
  dateTimeOriginal?: string; // 原始拍摄时间
  exposureTime?: string; // 曝光时间
  fNumber?: string; // f 数值
  iso?: string; // ISO 感光度
  focalLength?: string; // 焦距

  // GPS 信息
  gps?: GPSCoordinate;
  gpsAltitude?: number;

  // 其他信息
  orientation?: number;
  xResolution?: string;
  yResolution?: string;
}

/**
 * 将 GPS 坐标分数转换为十进制度数
 */
function convertGPSToDecimal(gpsArray: any[]): number {
  const degrees = gpsArray[0][0] / gpsArray[0][1];
  const minutes = gpsArray[1][0] / gpsArray[1][1];
  const seconds = gpsArray[2][0] / gpsArray[2][1];
  return degrees + minutes / 60 + seconds / 3600;
}

/**
 * 解析 EXIF 数据
 */
export function parseExifData(exifData: any): ExifInfo {
  const info: ExifInfo = {};

  if (!exifData) return info;

  try {
    // 0th IFD (主图像信息)
    const ifd0 = exifData['0th'] || {};

    // 遍历 0th 中的所有条目
    for (const key in ifd0) {
      const keyNum = parseInt(key);
      const value = ifd0[key];

      // 标准标签
      if (keyNum === 271) info.make = String(value);
      if (keyNum === 272) info.model = String(value);
      if (keyNum === 274) info.orientation = value;
      if (keyNum === 305) info.software = String(value);
      if (keyNum === 306) info.dateTime = String(value);
      if (keyNum === 282) info.xResolution = String(value);
      if (keyNum === 283) info.yResolution = String(value);
      
      // 非标准标签 - 可能包含有用的信息
      if (keyNum === 34605 && !info.make) {
        // 如果没有标准品牌标签，尝试使用非标准的
        info.make = String(value);
      }
    }

    // Exif IFD (拍摄信息)
    const exifIfd = exifData['Exif'] || {};

    // 遍历 Exif 中的所有条目
    for (const key in exifIfd) {
      const keyNum = parseInt(key);
      const value = exifIfd[key];
      
      // 标准标签
      if (keyNum === 36867) info.dateTimeOriginal = String(value);
      if (keyNum === 33434) info.exposureTime = String(value);
      if (keyNum === 33437) info.fNumber = String(value);
      if (keyNum === 34855) info.iso = String(value);
      if (keyNum === 37386) info.focalLength = String(value);
    }

    // GPS IFD
    const gpsIfd = exifData['GPS'] || {};
    
    // 检查 GPS 是否有数据
    if (Object.keys(gpsIfd).length > 0) {
      // GPS 2 = Latitude, GPS 4 = Longitude
      if (gpsIfd[2] && gpsIfd[4]) {
        try {
          const latitude = convertGPSToDecimal(gpsIfd[2]);
          const longitude = convertGPSToDecimal(gpsIfd[4]);
          const latitudeRef = gpsIfd[1] || 'N';
          const longitudeRef = gpsIfd[3] || 'E';

          info.gps = {
            latitude: latitudeRef === 'S' ? -latitude : latitude,
            longitude: longitudeRef === 'W' ? -longitude : longitude,
            latitudeRef,
            longitudeRef,
          };

          if (gpsIfd[6]) {
            const altitude = gpsIfd[6];
            info.gpsAltitude = Array.isArray(altitude) && altitude[0]
              ? altitude[0][0] / altitude[0][1]
              : altitude;
          }
        } catch (err) {
          // GPS 解析失败，忽略
        }
      }
    }
  } catch (err) {
    // EXIF 解析失败，返回已有数据
  }

  return info;
}

/**
 * 提取图片中的 EXIF 数据
 */
export async function extractExifFromImage(file: File): Promise<ExifInfo> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const arrayBuffer = reader.result as ArrayBuffer;
        
        // 将 ArrayBuffer 转换为 Uint8Array，然后转换为二进制字符串
        const uint8Array = new Uint8Array(arrayBuffer);
        let binaryString = '';
        for (let i = 0; i < uint8Array.length; i++) {
          binaryString += String.fromCharCode(uint8Array[i]);
        }
        
        // 使用 piexifjs 解析 EXIF 数据
        let exifData: any;
        try {
          exifData = piexifjs.load(binaryString);
        } catch (parseError) {
          // 如果解析失败，返回空对象
          resolve({});
          return;
        }
        
        const exifInfo = parseExifData(exifData);
        resolve(exifInfo);
      } catch (error) {
        // 如果处理失败（例如，图片没有 EXIF 数据），返回空对象
        resolve({});
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    // 读取为 ArrayBuffer 而不是 DataURL
    reader.readAsArrayBuffer(file);
  });
}

/**
 * 使用 Canvas 清理图片（移除 EXIF 数据）
 */
export async function removeExifFromImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert canvas to blob'));
            }
          },
          file.type || 'image/jpeg',
          0.95
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = URL.createObjectURL(file);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * 下载清理后的图片
 */
export function downloadCleanedImage(blob: Blob, originalFileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;

  const fileName = originalFileName.replace(/^(.+?)(?:\.[^.]*)?$/, '$1_cleaned');
  const ext = originalFileName.split('.').pop();
  link.download = `${fileName}.${ext}`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 检查 EXIF 信息中是否包含隐私数据
 * 隐私数据包括：GPS 位置、设备信息、拍摄时间
 */
export function hasPrivacyData(exifInfo: ExifInfo | null): boolean {
  if (!exifInfo) return false;

  // 检查 GPS 数据
  if (exifInfo.gps) return true;

  // 检查设备信息
  if (exifInfo.make || exifInfo.model) return true;

  // 检查拍摄时间
  if (exifInfo.dateTimeOriginal || exifInfo.dateTime) return true;

  return false;
}
