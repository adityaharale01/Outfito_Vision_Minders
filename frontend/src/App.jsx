import { useState } from "react";
import axios from "axios";

export default function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("gender", "male");
    formData.append("occasion", "party");
    formData.append("style", "formal");

    const res = await axios.post("http://127.0.0.1:8000/recommend", formData);
    setResult(res.data);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-6">
        AI Fashion Stylist 👔
      </h1>

      {/* UPLOAD SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4"
        />

        <button
          onClick={handleSubmit}
          className="bg-pink-500 text-white px-4 py-2 rounded w-full"
        >
          Get Recommendation
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="mt-10">

          {/* ANALYSIS */}
          <div className="text-center mb-6">
            <p>Face Shape: {result.analysis.face_shape}</p>
            <p>Skin Tone: {result.analysis.skin_tone}</p>
            <p>Skin Type: {result.analysis.skin_type}</p>
          </div>

          {/* FACEWASH */}
          <Section title="🧴 Facewash">
            {result.facewash.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </Section>

          {/* GOGGLES */}
          <Section title="🕶️ Goggles">
            {result.goggles.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </Section>

          {/* OUTFITS */}
          <Section title="👕 Outfit Combo">
            {result.outfits.map((item, i) => (
              <div key={i} className="flex gap-4">
                <Card item={item.shirt} />
                <Card item={item.pant} />
              </div>
            ))}
          </Section>

          {/* AI EXTRA (GROK STYLE) */}
          <div className="bg-white p-6 rounded-xl shadow mt-6">
            <h2 className="text-xl font-bold mb-2">
              🤖 Extra Outfit Suggestions (AI)
            </h2>
            <p className="whitespace-pre-line">
              {result.recommendation}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
}

function Card({ item }) {
  return (
    <div className="bg-white rounded-xl shadow hover:scale-105 transition p-3">
      <img
        src={`http://127.0.0.1:8000/${item.image_url}`}
        alt={item.name}
        className="h-40 w-full object-cover rounded"
      />
      <h3 className="font-semibold mt-2">{item.name}</h3>
      <p className="text-sm text-gray-500">{item.brand}</p>
      <p className="text-pink-500 font-bold">{item.price}</p>
    </div>
  );
}