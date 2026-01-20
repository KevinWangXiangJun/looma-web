/**
 * Mock 数据文件
 * 提供测试和开发使用的模拟数据
 */

/**
 * Mock 通知列表
 */
export const mockNotifications = [
  {
    id: '1',
    title: '新项目创建成功',
    message: '您的项目 "Summer Campaign" 已成功创建',
    timestamp: '2 分钟前',
    isRead: false,
  },
  {
    id: '2',
    title: '品牌审核通过',
    message: '品牌 "Nike Co." 已通过审核，现已发布',
    timestamp: '1 小时前',
    isRead: false,
  },
  {
    id: '3',
    title: '任务已完成',
    message: '内容规划任务 "Q1 Strategy" 已标记完成',
    timestamp: '3 小时前',
    isRead: true,
  },
  {
    id: '4',
    title: '新评论',
    message: '您的设计作品收到了一条新评论',
    timestamp: '1 天前',
    isRead: true,
  },
  {
    id: '5',
    title: '系统维护通知',
    message: '系统将于明日凌晨 2:00-4:00 进行维护',
    timestamp: '2 天前',
    isRead: true,
  },
];

/**
 * Mock 用户列表
 */
export const mockUsers = [
  {
    id: '1',
    username: '李明',
    phone: '13800138000',
    email: 'liming@example.com',
    avatar: '',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    username: 'user2',
    phone: '13800138001',
    email: 'user2@example.com',
    avatar: '',
    createdAt: '2024-01-02T00:00:00Z',
  },
];

/**
 * Mock 项目列表
 */
export const mockProjects = [
  {
    id: '1',
    name: '项目一',
    description: 'Looma 人工智能项目',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: '项目二',
    description: '数据分析项目',
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
  },
];

/**
 * Mock 任务列表
 */
export const mockTasks = [
  {
    id: '1',
    title: '任务一',
    description: '完成登录功能',
    status: 'in-progress',
    projectId: '1',
    assigneeId: '1',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: '任务二',
    description: '完成首页设计',
    status: 'pending',
    projectId: '1',
    assigneeId: '2',
    createdAt: '2024-01-02T00:00:00Z',
  },
];

/**
 * Mock 登录凭证
 */
export const mockCredentials = [
  {
    phone: '13800138000',
    password: 'password123',
  },
  {
    username: 'testuser',
    password: 'password123',
  },
];

/**
 * Mock 图库图片数据 - 使用本地项目图片
 */
import type { GalleryImage, ImageFormat } from '@/types/gallery';

// 本地图片配置 - 使用相对于 public 的路径
const LOCAL_IMAGES = [
  { path: 'src/assets/images/carousel-1.jfif', width: 1920, height: 1080 },
  { path: 'src/assets/images/carousel-2.jfif', width: 1920, height: 1440 },
  { path: 'src/assets/images/carousel-3.jfif', width: 1920, height: 1280 },
  { path: 'src/assets/images/carousel-4.jpg', width: 2000, height: 1200 },
  { path: 'src/assets/images/carousel-5.jpg', width: 2000, height: 1500 },
  { path: 'src/assets/images/carousel-6.jpg', width: 2000, height: 900 },
];

const generateMockGalleryImages = (count: number): GalleryImage[] => {
  const formats: ImageFormat[] = ['jpg', 'png', 'gif'];
  const tags = [
    ['nature', 'landscape'],
    ['architecture', 'building'],
    ['portrait', 'people'],
    ['food', 'photography'],
    ['abstract', 'art'],
    ['travel', 'adventure'],
    ['technology', 'digital'],
    ['sports', 'action'],
  ];

  const images: GalleryImage[] = [];
  // 使用当前时间戳作为基础，确保每次都不同
  const timestamp = Date.now();

  for (let i = 1; i <= count; i++) {
    const localImg = LOCAL_IMAGES[i % LOCAL_IMAGES.length];
    const formatIdx = i % formats.length;
    const tagIdx = i % tags.length;
    const format = formats[formatIdx];
    // 使用时间戳 + 索引生成绝对唯一的ID
    const uniqueId = `img-${timestamp}-${i}`;

    images.push({
      id: uniqueId,
      name: `本地照片 ${i}`,
      url: localImg.path,
      thumbnail: localImg.path,
      width: localImg.width,
      height: localImg.height,
      format,
      size: Math.floor(500000 + Math.random() * 2000000),
      uploadedAt: new Date(Date.now() - i * 86400000).toISOString(),
      tags: tags[tagIdx],
      resolution: `${localImg.width}×${localImg.height}`,
    });
  }

  return images;
};

export const mockGalleryImages = generateMockGalleryImages(100);
