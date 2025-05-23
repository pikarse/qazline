import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Copy } from 'lucide-react';

const PaymentPage: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const phoneNumber = '+7 778 613 4946';
  const amount = '24000';
  const courseName = 'Подготовка к СОР и СОЧ по казахскому языку';

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePaymentConfirm = () => {
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
          >
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-green-900 mb-2">
              Оплата прошла успешно!
            </h3>
            <p className="text-green-700">
              Ожидайте добавления в группу. Мы свяжемся с вами в ближайшее время.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Оплата курса
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {courseName}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 space-y-6"
        >
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Инструкция по оплате:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Откройте приложение Kaspi</li>
              <li>Перейдите в раздел "Переводы"</li>
              <li>Выберите "Перевод по номеру"</li>
              <li>Введите номер получателя</li>
              <li>Укажите сумму: {amount} ₸</li>
              <li>В комментарии укажите ваш желаемый курс</li>
              <li>Подтвердите перевод</li>
            </ol>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Номер Kaspi:</span>
              <button
                onClick={handleCopy}
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                {isCopied ? (
                  <span className="text-green-600">Скопировано!</span>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    <span>Копировать</span>
                  </>
                )}
              </button>
            </div>
            <div className="text-xl font-bold text-gray-900">{phoneNumber}</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-700 mb-1">Сумма к оплате:</div>
            <div className="text-2xl font-bold text-gray-900">{amount} ₸</div>
          </div>

          <button
            onClick={handlePaymentConfirm}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Я оплатил(а)
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage; 