import React, { useState } from "react";
import axios from "axios";

const API_KEY = "AIzaSyDWkvd-O5HU7KdqaELqiCNu98Tz3MjsdPE";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

function ChatApp() {
    const geminifetch = async (prompt) => {
        try {
            const systemPrompt = `You are a highly specialized AI travel planner for Tamil Nadu tourism. 
You must only respond with Tamil Nadu-related travel plans, itineraries, attractions, food spots, cultural sites, and travel tips. 

If the user asks anything unrelated to Tamil Nadu tourism, politely decline to answer and remind them that you only provide Tamil Nadu travel guidance.

Your response should include:

- Day-wise itinerary (Morning, Afternoon, Evening)
- Duration at each location & Travel time
- Entry fees (if applicable)
- Nearby food recommendations
- Weather-based tips
- Alternative options for closures or crowded places
- Unique local experiences
- Estimated budget (transport, tickets, and food)
- Best Instagram-worthy photo spots
- Emergency contacts for safety

⚠️ **STRICT RULE**: If a user asks about a different state/country, reply:  
*"I specialize in Tamil Nadu tourism. Please ask about Tamil Nadu destinations."*

If the user requests responses in 'Tanglish' (Tamil + English), reply in an engaging, fun way using mixed language.

Now, please provide an accurate and well-structured travel response based on the user’s query.`;

            const requestBody = {
                contents: [
                    { role: "user", parts: [{ text: systemPrompt }] },
                    { role: "user", parts: [{ text: prompt }] }
                ]
            };

            const resp = await axios.post(GEMINI_API_URL, requestBody);
            let responseText = resp.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No relevant tourism data found.";
            responseText = responseText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*/g, "•").replace(/\n/g, "<br>");
            return responseText;
        } catch (e) {
            console.error("Error fetching response:", e.message);
            return "Error connecting to the AI server. Please try again.";
        }
    };

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { text: input, sender: "user" }]);
        setInput("");
        setLoading(true);

        const botTextResponse = await geminifetch(input);

        setMessages((prev) => [...prev, { text: botTextResponse, sender: "bot" }]);
        setLoading(false);
    };

    return (
        <div className="bg-[#18122B] w-full h-screen flex justify-center items-center">
            <div className="bg-[#1E1A36] flex flex-col p-4 rounded-lg shadow-lg w-full h-full">
                <div className="flex-1 overflow-y-auto border border-gray-700 p-4 rounded-lg bg-[#242036] space-y-2">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"}`}>
                                <div className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: msg.text }}></div>
                            </div>
                        </div>
                    ))}
                    {loading && <div className="flex justify-center items-center mt-4"><div className="w-10 h-10 border-4 border-t-4 border-purple-600 rounded-full animate-spin"></div></div>}
                </div>
                <div className="mt-4 flex">
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about Tamil Nadu Tourism..." className="flex-1 p-3 rounded-l-lg bg-[#2D2A4A] text-white placeholder-gray-400 focus:outline-none text-lg" />
                    <button onClick={sendMessage} className="px-5 py-3 bg-[#7B61FF] text-white font-semibold rounded-r-lg hover:bg-[#6A51E6] text-lg">Send</button>
                </div>
            </div>
        </div>
    );
}

export default ChatApp;
