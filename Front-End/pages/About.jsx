import React from "react";

const About = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen py-12 px-6 md:px-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-blue-700">About Explore TN</h1>

        <p className="text-lg leading-relaxed">
          Explore TN is a next-generation travel platform designed to revolutionize tourism in Tamil Nadu. It brings together the power of artificial intelligence, modern web technologies, and a strong community focus to deliver a seamless and personalized travel experience. Whether you're a local adventurer or an international explorer, Explore TN offers a smarter way to discover the cultural and natural treasures of Tamil Nadu.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600">Our Mission</h2>
          <p>
            Our mission is to enhance how people explore Tamil Nadu by providing intelligent trip planning, community-driven insights, and access to authentic local experiences. We aim to bridge the gap between traditional tourism and digital innovation.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>AI-powered personalized trip planner based on user preferences</li>
            <li>Event listings, cultural festivals, and destination highlights</li>
            <li>Community section for sharing experiences, tips, and stories</li>
            <li>Seamless hotel and transport booking integration</li>
            <li>Connect with verified local guides for authentic tours</li>
            <li>Secure authentication with Google and email sign-in</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600">Technology Stack</h2>
          <p>
            Explore TN is built using a modern and scalable technology stack:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li><strong>Frontend:</strong> React.js with TailwindCSS for responsive and elegant UI</li>
            <li><strong>Backend:</strong> Node.js with Express.js</li>
            <li><strong>Database:</strong> MongoDB / PostgreSQL</li>
            <li><strong>AI Services:</strong> OpenAI API, Gemini API</li>
            <li><strong>Authentication:</strong> JWT and OAuth (Google Sign-In)</li>
            <li><strong>Location Features:</strong> Static maps for visualizing destinations</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600">Looking Ahead</h2>
          <p>
            Explore TN is more than just a travel platform—it's a movement toward smarter, more connected, and culturally immersive tourism. By integrating technology with the timeless beauty and heritage of Tamil Nadu, we aim to empower travelers with the tools to plan, experience, and share meaningful journeys.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
