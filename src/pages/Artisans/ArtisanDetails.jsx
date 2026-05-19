import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getSingleArtisan } from "../../services/artisanService";

const ArtisanDetails = () => {

    const { id } = useParams();

    const [artisan, setArtisan] = useState(null);
    const [story, setStory] = useState(null);

    useEffect(() => {
        fetchArtisan();
        fetchStory();
    }, []);

    const fetchArtisan = async () => {
        try {

            const data = await getSingleArtisan(id);

            setArtisan(data.artisan);

        } catch (error) {
            console.log(error);
        }
    };

    const fetchStory = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/artisan-stories/${id}`
            );

            const data = await res.json();

            setStory(data);

        } catch (error) {
            console.log(error);
        }
    };

    if (!artisan) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-stone-950 text-white py-20">

            <div className="max-w-6xl mx-auto px-6">

                <div className="grid md:grid-cols-2 gap-14 items-center">

                    {/* IMAGE */}
                    <div>

                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/${artisan.image}`}
                            alt={artisan.name}
                            className="w-full h-[650px] object-cover rounded-3xl"
                        />

                    </div>

                    {/* CONTENT */}
                    <div>

                        <p className="uppercase tracking-[0.3em] text-orange-400 text-sm mb-4">
                            {artisan.craft}
                        </p>

                        <h1 className="text-5xl font-serif font-bold mb-6">
                            {artisan.name}
                        </h1>

                        <div className="space-y-4 text-stone-300 text-lg leading-relaxed">

                            <p>
                                {artisan.bio}
                            </p>

                            {story?.story && (
                                <div className="mt-8 bg-stone-900 border border-stone-800 rounded-3xl p-6">

                                    <h2 className="text-2xl font-serif font-bold text-orange-400 mb-4">
                                        Artisan Story
                                    </h2>

                                    <p className="text-stone-300 leading-8 whitespace-pre-line">
                                        {story.story}
                                    </p>

                                </div>
                            )}

                            <p>
                                <span className="text-white font-semibold">
                                    District:
                                </span>{" "}
                                {artisan.district}
                            </p>

                            <p>
                                <span className="text-white font-semibold">
                                    Experience:
                                </span>{" "}
                                {artisan.experience}
                            </p>

                        </div>

                        <blockquote className="mt-10 border-l-4 border-orange-500 pl-6 italic text-2xl text-stone-200">
                            “{artisan.quote}”
                        </blockquote>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default ArtisanDetails;