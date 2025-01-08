import React, { useContext } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageContext, LogMessage, AssistanceRequestMessage, AssistanceResponseMessage } from '../MessageContext';
import { MarkdownComponent } from './mardown-utils';

const Message = () => {
  const messageContext = useContext(MessageContext);
  console.log(messageContext);

  if (!messageContext) {
    throw new Error('Message must be used within a MessageProvider');
  }

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full">
      {messageContext.messages.map((message, i) => (
        <Card
          key={i}
          className={`shadow-lg ${message.type === 'agent' ? 
            'max-w-fit mr-auto bg-secondary text-secondary-foreground' : 
            'max-w-fit ml-auto bg-primary text-primary-foreground'
          }`}
        >
          <div className={`flex flex-col ${message.type === 'agent' ? 'justify-center' : 'justify-end'}`}>
            <CardContent className="p-2 px-4 break-words">
              {message.type === 'log' ? (
                <>
                  <p className="text-sm">
                    <strong>Component Name:</strong> {(message as LogMessage).componentName}
                  </p>
                  <p className="text-sm">
                    <strong>Event:</strong> {(message as LogMessage).event}
                  </p>
                  <p className="text-sm">
                    <strong>ID:</strong> {(message as LogMessage).id}
                  </p>
                  {(message as LogMessage).value && (
                    <p className="text-sm">
                      <strong>Value:</strong> {(message as LogMessage).value}
                    </p>
                  )}
                </>
              ) : message.type === 'agent' ? (
                <MarkdownComponent content={(message as AssistanceResponseMessage).content!} />
              ) : (
                <MarkdownComponent content={(message as AssistanceRequestMessage).content!} />
              )}
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Message;
