import { MessageCircle, Lightbulb, Flag, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * 帮助资源组件
 * 用于在HoverCard中展示帮助和资源选项
 * 参考设计图3
 */
export const HelpResources = (): JSX.Element => {
  const { t } = useTranslation();

  const handleCustomerService = () => {
    // TODO: 打开客服对话
    console.log('Open customer service');
  };

  const handleSendSuggestion = () => {
    // TODO: 打开建议反馈表单
    console.log('Send suggestion');
  };

  const handleReportContent = () => {
    // TODO: 打开内容举报表单
    console.log('Report content');
  };

  const handlePrivacyPolicy = () => {
    // TODO: 打开隐私政策页面
    console.log('Open privacy policy');
  };

  const helpItems = [
    {
      id: 'customer-service',
      icon: MessageCircle,
      label: t('userProfile.help.customerService') || 'Customer Service',
      action: handleCustomerService,
    },
    {
      id: 'suggestion',
      icon: Lightbulb,
      label: t('userProfile.help.suggestion') || 'Send Suggestion',
      action: handleSendSuggestion,
    },
    {
      id: 'report-content',
      icon: Flag,
      label: t('userProfile.help.reportContent') || 'Report Content',
      action: handleReportContent,
    },
    {
      id: 'privacy-policy',
      icon: Lock,
      label: t('userProfile.help.privacyPolicy') || 'Privacy Policy',
      action: handlePrivacyPolicy,
    },
  ];

  return (
    <div className="space-y-2 w-56">
      {helpItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={item.action}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <Icon size={20} className="text-gray-600 flex-shrink-0" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default HelpResources;
