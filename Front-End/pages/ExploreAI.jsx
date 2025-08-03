import React, { useState } from "react";
import axios from "axios";

const API_KEY = "AIzaSyB5fbW1uGBuO9JUl72R6rTKQhfVNU2kOgQ";
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

If the user ask's to tell me the things in tanglish that time only you want to  responses in 'Tanglish' (Tamil + English), reply in an engaging, fun way using mixed language.

Now, please provide an accurate and well-structured travel response based on the user’s query.

if any user ask's to tell me about the Explore-TN app, reply:🗺️ 1️⃣ Discover Tourist Places
Explore famous spots, hidden gems, and local secrets.

Browse places by district, city, category (temples, waterfalls, hills, beaches, cultural sites, historical sites).

Get photos, descriptions, locations, and local tips for each place.

🧑‍🤝‍🧑 2️⃣ Connect with Local Guides
Find verified local guides for personalized tours.

View guide profiles, languages spoken, locations covered, bio & experience.

Filter guides by location and languages.

Book a guide directly through the platform.

🏨 3️⃣ Book Hotel Tamil Nadu (TTDC) Properties
Browse a curated list of Hotel Tamil Nadu (TTDC-managed) and partner hotels.

Filter by category: Government, Private tie-up.

View hotel details: location, amenities, contact info, room types, prices.

Get booking links (and booking will open in a new window).

💡 4️⃣ User Picks — Share Hidden Gems
Registered users can submit new hidden or lesser-known tourist places.

Upload photos, write details, and help others discover unique spots.

View all user-contributed picks in one place.

🤖 5️⃣ AI Trip Planner (Explore-TN AI)
Ask the AI for custom itineraries.

Example: “Plan a 3-day trip to Kodaikanal with waterfalls and budget hotels.”

Get personalized trip suggestions instantly.

Ask questions about places, hotels, guides, events, or how to travel.

The AI responds like a local expert!

🗂️ 6️⃣ Community & Reviews
See reviews and ratings for guides & places.

Rate your guide after a trip.

Leave feedback to help other travelers.

🔑 7️⃣ Secure Guide Profiles
Guides can create, edit, and manage their profiles.

Guides can upload a photo, write a bio, and highlight their expertise.

Each guide has a dedicated profile page.

This app is your one-stop solution for exploring Tamil Nadu like a local!`;

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
