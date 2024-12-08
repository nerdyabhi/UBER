import { useState } from "react";


const ChatComponent = ()=>{
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { text: message, sender: 'driver' }]);
            setMessage('');
        }
    };

    return (
        <div className="w-full z-10 absolute border-2 border-red-500 bottom-0 bg-white py-12 px-8 rounded-t-3xl shadow-2xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Chat</h2>
                <p className="text-gray-600 mt-2">Message your passenger</p>
            </div>

            <div className="h-64 overflow-y-auto mb-4 border rounded-lg p-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.sender === 'driver' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded-lg ${msg.sender === 'driver' ? 'bg-black text-white' : 'bg-gray-200'}`}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 border-2 border-gray-300 rounded-lg p-4 focus:border-blue-500 focus:outline-none"
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-black text-white px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatComponent;