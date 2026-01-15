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
  fNumber?: string; // f数
  iso?: string; // ISO 值
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

  // 解析 0th IFD (主要信息)
  const ifd0 = exifData['0th'] || {};

  // 相机信息
  if (ifd0[271]) info.make = ifd0[271];
  if (ifd0[272]) info.model = ifd0[272];
  if (ifd0[305]) info.software = ifd0[305];

  // 拍摄时间
  if (ifd0[306]) info.dateTime = ifd0[306];
  if (ifd0[274]) info.orientation = ifd0[274];
  if (ifd0[282]) info.xResolution = `${ifd0[282][0][0]}/${ifd0[282][0][1]}`;
  if (ifd0[283]) info.yResolution = `${ifd0[283][0][0]}/${ifd0[283][0][1]}`;

  // 解析 Exif IFD
  const exifIfd = exifData['Exif'] || {};

  if (exifIfd[36867]) info.dateTimeOriginal = exifIfd[36867];
  if (exifIfd[33434]) {
    const exposure = exifIfd[33434];
    info.exposureTime = `${exposure[0][0]}/${exposure[0][1]}`;
  }
  if (exifIfd[33437]) {
    const fNumber = exifIfd[33437];
    info.fNumber = `f/${(fNumber[0][0] / fNumber[0][1]).toFixed(1)}`;
  }
  if (exifIfd[34855]) info.iso = exifIfd[34855];
  if (exifIfd[37386]) {
    const focalLength = exifIfd[37386];
    info.focalLength = `${(focalLength[0][0] / focalLength[0][1]).toFixed(1)}mm`;
  }

  // 解析 GPS 信息
  const gpsIfd = exifData['GPS'] || {};
  if (gpsIfd[2] && gpsIfd[4]) {
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
      info.gpsAltitude = altitude[0][0] / altitude[0][1];
    }
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
        const data = reader.result as string;
        
        // 移除 Data URL 前缀以提取纯 Base64
        const base64String = data.split(',')[1] || data;
        
        // 使用 piexifjs 解析 EXIF 数据
        let exifData: any;
        try {
          exifData = piexifjs.load(base64String);
        } catch {
          // 如果直接加载失败，尝试用完整的 Data URL
          exifData = piexifjs.load(data);
        }
        
        const exifInfo = parseExifData(exifData);
        console.log('Extracted EXIF info:', exifInfo);
        
        resolve(exifInfo);
      } catch (error) {
        // 如果 EXIF 解析失败（例如，图片没有 EXIF 数据），返回空对象
        console.warn('EXIF parsing failed:', error);
        resolve({});
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * 使用 Canvas 清理图片（移除 EXIF 数据）
 */
export async function removeExifFromImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
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
