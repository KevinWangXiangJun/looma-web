import { useState } from 'react';
import { Wand2, RefreshCw, ArrowRight, Download, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FileUpload } from '@/components/common/FileUpload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

interface FileItem {
  id: string;
  file: File;
  previewUrl: string;
  originalName: string;
  newName: string;
  status: 'pending' | 'processing' | 'done';
}

// 模拟 AI 识别的关键词库
const MOCK_AI_KEYWORDS = [
  'sunset-beach', 'mountain-view', 'city-night', 'cat-portrait', 
  'dog-playing', 'tasty-food', 'office-meeting', 'coding-screen'
];

export function BatchRenamer(): JSX.Element {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [mode, setMode] = useState<'ai' | 'pattern' | 'replace'>('ai');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (newFiles: File[]) => {
    const newItems = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
      originalName: file.name,
      newName: file.name,
      status: 'pending' as const
    }));
    setFiles(prev => [...prev, ...newItems]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  const generateAINames = async () => {
    setIsProcessing(true);
    
    // 模拟逐个处理文件的过程
    const procesFiles = [...files];
    
    for (let i = 0; i < procesFiles.length; i++) {
        // 模拟网络请求延迟
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const item = procesFiles[i];
        // 简单的模拟算法：根据文件大小取一个关键词，或者随机
        // 实际对接时这里会调用 Vision API
        const keyword = MOCK_AI_KEYWORDS[item.file.size % MOCK_AI_KEYWORDS.length];
        const ext = item.originalName.split('.').pop();
        
        // 为了避免重名，加个随机后缀
        const uniqueSuffix = Math.floor(Math.random() * 1000);
        
        const newItem = {
            ...item,
            newName: `${keyword}-${uniqueSuffix}.${ext}`,
            status: 'done' as const
        };
        
        procesFiles[i] = newItem;
        // 实时更新状态
        setFiles([...procesFiles]);
    }
    
    setIsProcessing(false);
  };

  const handleApplyRename = () => {
    if (mode === 'ai') {
      generateAINames();
    }
    // TODO: 实现其他模式
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Wand2 className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI 智能重命名</h1>
            <p className="text-sm text-gray-500">
               上传图片，自动识别内容并生成简洁文件名
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
           {files.length > 0 && (
             <Button variant="outline" onClick={handleClearAll} className="text-red-500 hover:bg-red-50 hover:text-red-600">
               <Trash2 className="w-4 h-4 mr-2" />
               清空列表
             </Button>
           )}
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* 左侧：文件列表 */}
        <div className="flex-1 flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {files.length === 0 ? (
            <div className="flex-1 p-8">
              <FileUpload 
                onFileSelect={handleFileSelect} 
                multiple 
                accept="image/*"
                title="点击或拖拽上传图片"
                description="支持 batch 上传，我们将使用 AI 识别图片内容"
                className="h-full border-dashed"
              />
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center text-sm font-medium text-gray-500">
                <span className="w-[40%] pl-2">原始文件</span>
                <span className="w-8"></span>
                <span className="w-[40%]">新文件名预览</span>
                <span className="w-10"></span>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                 {files.map((item) => (
                   <div key={item.id} className="flex items-center bg-white border border-gray-100 p-2 rounded-lg hover:shadow-sm transition-shadow group">
                     {/* 原始 */}
                     <div className="w-[40%] flex items-center gap-3 min-w-0">
                        <img src={item.previewUrl} alt="" className="w-10 h-10 rounded object-cover bg-gray-100 flex-shrink-0" />
                        <span className="truncate text-sm text-gray-700" title={item.originalName}>{item.originalName}</span>
                     </div>
                     
                     {/* 箭头 */}
                     <div className="w-8 flex justify-center">
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                     </div>

                     {/* 新名 */}
                     <div className="w-[40%] min-w-0">
                        {item.status === 'done' ? (
                            <span className="text-sm font-medium text-green-600 truncate block" title={item.newName}>
                                {item.newName}
                            </span>
                        ) : (
                            <span className="text-sm text-gray-400 italic">待生成...</span>
                        )}
                     </div>
                     
                     {/* 操作 */}
                     <div className="w-10 flex justify-end">
                        <button 
                            onClick={() => handleRemoveFile(item.id)}
                            className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                     </div>
                   </div>
                 ))}
                 
                <div className="mt-4 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-indigo-300 transition-colors text-center cursor-pointer">
                    <label className="cursor-pointer block w-full h-full">
                        <span className="text-sm text-indigo-600 font-medium">+ 添加更多图片</span>
                        <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFileSelect(Array.from(e.target.files))} />
                    </label>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 右侧：控制面板 */}
        <div className="w-80 bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col h-fit">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                重命名设置
            </h3>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">命名模式</label>
                    <Select value={mode} onValueChange={(v: any) => setMode(v)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ai">✨ AI 智能内容识别 (推荐)</SelectItem>
                            <SelectItem value="pattern">📝 序列号模式 (img_01)</SelectItem>
                            <SelectItem value="replace">🔍 查找替换</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {mode === 'ai' && (
                    <div className="bg-indigo-50 p-3 rounded-md text-xs text-indigo-700 leading-relaxed border border-indigo-100">
                        AI 模式将分析图片画面内容（如风景、人物、食物等），生成易读的英文描述性文件名。
                    </div>
                )}

                <div className="pt-4 border-t border-gray-100">
                    <Button 
                        className="w-full" 
                        size="lg" 
                        onClick={handleApplyRename}
                        disabled={files.length === 0 || isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                正在分析生成中...
                            </>
                        ) : (
                            <>
                                <Wand2 className="w-4 h-4 mr-2" />
                                开始智能重命名
                            </>
                        )}
                    </Button>
                </div>
                
                {mode === 'ai' && files.some(f => f.status === 'done') && (
                     <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        下载重命名后的文件
                     </Button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default BatchRenamer;
