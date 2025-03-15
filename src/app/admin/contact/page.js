'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Mail, 
  Search, 
  Filter,
  Clock,
  Send,
  Paperclip,
  Trash2,
  Archive
} from 'lucide-react';

// Import JSON data
import messagesData from '../../data/messages.json';
import contactFormData from '../../data/contactFormData.json';
const { translations } = contactFormData;

export default function Contact() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState(messagesData.messages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState('');
  const [filter, setFilter] = useState({
    status: 'all',
    category: 'all',
    priority: 'all',
    search: ''
  });

  const handleMessageClick = async (message) => {
    if (message.status === 'unread') {
      const updatedMessage = {
        ...message,
        status: 'read',
        readAt: new Date().toISOString()
      };

      setMessages(prev => 
        prev.map(m => m.id === message.id ? updatedMessage : m)
      );

      const updatedMessages = {
        ...messagesData,
        messages: messages.map(m => m.id === message.id ? updatedMessage : m)
      };

      try {
        localStorage.setItem('admin_messages', JSON.stringify(updatedMessages));
        
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedMessages),
        });
        
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error updating message status:', error);
      }
    }
    setSelectedMessage(message);
  };

  const handleReply = async () => {
    if (!reply.trim() || !selectedMessage) return;

    const updatedMessage = {
      ...selectedMessage,
      status: 'replied',
      reply: reply,
      repliedAt: new Date().toISOString()
    };

    setMessages(prev =>
      prev.map(m => m.id === selectedMessage.id ? updatedMessage : m)
    );

    const updatedMessages = {
      ...messagesData,
      messages: messages.map(m => m.id === selectedMessage.id ? updatedMessage : m)
    };

    try {
      localStorage.setItem('admin_messages', JSON.stringify(updatedMessages));
      
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMessages),
      });
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }
      
      setReply('');
      setSelectedMessage(updatedMessage);
    } catch (error) {
      console.error('Error saving reply:', error);
      alert(language === 'tr' ? 'Yanıt kaydedilirken bir hata oluştu: ' + error.message : 'Error saving reply: ' + error.message);
    }
  };

  const handleArchive = async (message) => {
    const updatedMessage = {
      ...message,
      status: 'archived'
    };

    setMessages(prev =>
      prev.map(m => m.id === message.id ? updatedMessage : m)
    );

    const updatedMessages = {
      ...messagesData,
      messages: messages.map(m => m.id === message.id ? updatedMessage : m)
    };

    try {
      localStorage.setItem('admin_messages', JSON.stringify(updatedMessages));
      
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMessages),
      });
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }
      
      if (selectedMessage?.id === message.id) {
        setSelectedMessage(updatedMessage);
      }
    } catch (error) {
      console.error('Error archiving message:', error);
      alert(language === 'tr' ? 'Mesaj arşivlenirken bir hata oluştu: ' + error.message : 'Error archiving message: ' + error.message);
    }
  };

  const filteredMessages = messages.filter(message => {
    if (filter.status !== 'all' && message.status !== filter.status) return false;
    if (filter.category !== 'all' && message.category !== filter.category) return false;
    if (filter.priority !== 'all' && message.priority !== filter.priority) return false;
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      return (
        message.name.toLowerCase().includes(searchTerm) ||
        message.email.toLowerCase().includes(searchTerm) ||
        message.subject.toLowerCase().includes(searchTerm) ||
        message.message.toLowerCase().includes(searchTerm)
      );
    }
    return true;
  });

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Messages List */}
      <div className="w-1/3 border-r bg-white">
        <div className="p-4 border-b">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder={translations.searchPlaceholder[language]}
              value={filter.search}
              onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex space-x-2">
            <select
              value={filter.status}
              onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{translations.filters.allStatuses[language]}</option>
              {contactFormData.statuses.map(status => (
                <option key={status.id} value={status.id}>
                  {status.name[language]}
                </option>
              ))}
            </select>

            <select
              value={filter.category}
              onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{translations.filters.allCategories[language]}</option>
              {contactFormData.categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name[language]}
                </option>
              ))}
            </select>

            <select
              value={filter.priority}
              onChange={(e) => setFilter(prev => ({ ...prev, priority: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{translations.filters.allPriorities[language]}</option>
              {contactFormData.priorities.map(priority => (
                <option key={priority.id} value={priority.id}>
                  {priority.name[language]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-129px)]">
          {filteredMessages.map(message => (
            <div
              key={message.id}
              onClick={() => handleMessageClick(message)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedMessage?.id === message.id ? 'bg-blue-50' : ''
              } ${message.status === 'unread' ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{message.name}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(message.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm font-medium mb-1">{message.subject}</p>
              <p className="text-sm text-gray-600 truncate">{message.message}</p>
              <div className="flex items-center mt-2 space-x-2">
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: contactFormData.statuses.find(s => s.id === message.status)?.color + '20',
                    color: contactFormData.statuses.find(s => s.id === message.status)?.color
                  }}
                >
                  {contactFormData.statuses.find(s => s.id === message.status)?.name[language]}
                </span>
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: contactFormData.priorities.find(p => p.id === message.priority)?.color + '20',
                    color: contactFormData.priorities.find(p => p.id === message.priority)?.color
                  }}
                >
                  {contactFormData.priorities.find(p => p.id === message.priority)?.name[language]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Detail */}
      <div className="flex-1 bg-gray-50">
        {selectedMessage ? (
          <div className="h-full flex flex-col">
            <div className="p-6 bg-white border-b">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{selectedMessage.subject}</h2>
                  <p className="text-gray-600">{selectedMessage.name} ({selectedMessage.email})</p>
                  <p className="text-gray-600">{selectedMessage.company}</p>
                  <p className="text-gray-600">{selectedMessage.phone}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleArchive(selectedMessage)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <Archive size={20} />
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
                {selectedMessage.attachments?.length > 0 && (
                  <div className="flex items-center">
                    <Paperclip size={16} className="mr-1" />
                    {selectedMessage.attachments.length} {translations.messageDetails.attachments[language]}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-white rounded-lg p-6 mb-6">
                <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                {selectedMessage.attachments?.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">
                      {translations.messageDetails.attachments[language]}
                    </h4>
                    <div className="space-y-2">
                      {selectedMessage.attachments.map((attachment, index) => (
                        <a
                          key={index}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 border rounded-lg hover:bg-gray-50"
                        >
                          <Paperclip size={16} className="mr-2" />
                          <span className="flex-1">{attachment.name}</span>
                          <span className="text-sm text-gray-500">
                            {(attachment.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedMessage.reply && (
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">
                      {translations.messageDetails.reply[language]}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {new Date(selectedMessage.repliedAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{selectedMessage.reply}</p>
                </div>
              )}
            </div>

            {selectedMessage.status !== 'archived' && (
              <div className="p-6 bg-white border-t">
                <div className="flex space-x-4">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder={translations.messageDetails.writeReply[language]}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                  <button
                    onClick={handleReply}
                    disabled={!reply.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Mail size={48} className="mx-auto mb-4" />
              <p>{translations.emptyState[language]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 