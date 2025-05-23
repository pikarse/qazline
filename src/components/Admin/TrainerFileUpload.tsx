import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '../../lib/supabase';
import { FaUpload, FaTrash, FaFile, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface TrainerFileUploadProps {
  onFileUploaded: (url: string) => void;
  currentFile?: string;
}

const TrainerFileUpload: React.FC<TrainerFileUploadProps> = ({ onFileUploaded, currentFile }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);

      // Генерируем уникальное имя файла
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `trainers/${fileName}`;

      // Загружаем файл в Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('trainers')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Получаем публичный URL
      const { data: { publicUrl } } = supabase.storage
        .from('trainers')
        .getPublicUrl(filePath);

      onFileUploaded(filePath);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Ошибка при загрузке файла. Попробуйте еще раз.');
    } finally {
      setUploading(false);
    }
  }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  const handleDelete = async () => {
    if (!currentFile) return;

    try {
      setUploading(true);
      const { error } = await supabase.storage
        .from('trainers')
        .remove([currentFile]);

      if (error) throw error;
      onFileUploaded('');
    } catch (err) {
      console.error('Error deleting file:', err);
      setError('Ошибка при удалении файла');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <FaUpload className="text-3xl text-gray-400" />
          <p className="text-gray-600">
            {isDragActive
              ? 'Отпустите файл здесь'
              : 'Перетащите файл сюда или нажмите для выбора'}
          </p>
          <p className="text-sm text-gray-500">
            Поддерживаются PDF, DOC, DOCX (до 10MB)
          </p>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-600 p-3 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence>
        {currentFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaFile className="text-blue-500 text-xl" />
                <span className="text-gray-700 truncate">
                  {currentFile.split('/').pop()}
                </span>
              </div>
              <button
                onClick={handleDelete}
                disabled={uploading}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                {uploading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaTrash />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrainerFileUpload; 