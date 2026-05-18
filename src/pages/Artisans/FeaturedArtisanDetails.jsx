// pages/featuredArtisans/FeaturedArtisanDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

const FeaturedArtisanDetails = () => {

  const { id } = useParams();

  const [story, setStory] =
    useState(null);

  useEffect(() => {
    fetchStory();
  }, []);

  const fetchStory = async () => {
    try {

      const { data } =
        await API.get(
          `/featured-artisans/${id}`
        );

      setStory(data.story);

    } catch (error) {
      console.log(error);
    }
  };

  if (!story) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-stone-950 text-white min-h-screen py-20">

      <div className="max-w-4xl mx-auto px-6">

        <img
          src={story.artisanId.image}
          alt={story.artisanId.name}
          className="w-full h-[500px] object-cover rounded-3xl mb-10"
        />

        <p className="text-orange-400 mb-2">
          {story.artisanId.craft}
        </p>

        <h1 className="text-5xl font-bold mb-4">
          {story.artisanId.name}
        </h1>

        <p className="text-stone-400 mb-10">
          {story.artisanId.district}, Odisha
        </p>

        <article className="text-lg leading-9 text-stone-300 whitespace-pre-line">
          {story.story}
        </article>

      </div>

    </section>
  );
};

export default FeaturedArtisanDetails;